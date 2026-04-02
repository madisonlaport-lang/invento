import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { Property, Room, Item, Photo, PropertyType } from '@/types';
import { useAuth } from './AuthContext';

interface InventoryContextType {
  properties: Property[];
  isLoading: boolean;
  createProperty: (data: { name: string; address: string; type: PropertyType }) => Property;
  updateProperty: (id: string, data: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  getProperty: (id: string) => Property | undefined;
  addRoom: (propertyId: string, room: Omit<Room, 'id' | 'propertyId' | 'items' | 'photos'>) => Room;
  deleteRoom: (propertyId: string, roomId: string) => void;
  addItem: (propertyId: string, roomId: string, item: Omit<Item, 'id' | 'roomId' | 'photos'>) => Item;
  updateItem: (propertyId: string, roomId: string, itemId: string, data: Partial<Item>) => void;
  deleteItem: (propertyId: string, roomId: string, itemId: string) => void;
  addPhotoToRoom: (propertyId: string, roomId: string, photo: Omit<Photo, 'id'>) => void;
  addPhotoToItem: (propertyId: string, roomId: string, itemId: string, photo: Omit<Photo, 'id'>) => void;
  markCompleted: (propertyId: string) => void;
}

const InventoryContext = createContext<InventoryContextType | null>(null);
const PROPERTIES_KEY = 'inventopro_properties';

function loadAll(): Property[] {
  try {
    return JSON.parse(localStorage.getItem(PROPERTIES_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveAll(all: Property[]) {
  try {
    localStorage.setItem(PROPERTIES_KEY, JSON.stringify(all));
  } catch {
    // storage full
  }
}

export function InventoryProvider({ children }: { children: ReactNode }) {
  const { user, isLoading: authLoading } = useAuth();
  const [properties, setPropertiesState] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Ref always holds the latest properties — no stale closure bugs
  const propertiesRef = useRef<Property[]>([]);

  useEffect(() => {
    // Attendre que l'auth soit résolue avant de charger
    if (authLoading) return;

    if (user) {
      const all = loadAll();
      const userProps = all.filter((p) => p.userId === user.id);
      propertiesRef.current = userProps;
      setPropertiesState(userProps);
    } else {
      propertiesRef.current = [];
      setPropertiesState([]);
    }
    setIsLoading(false);
  }, [user, authLoading]);

  // ✅ persist updates the ref FIRST (sync), then React state (async)
  const persist = (updated: Property[]) => {
    if (!user) return;
    propertiesRef.current = updated; // sync update — no race condition
    const all = loadAll();
    const others = all.filter((p) => p.userId !== user.id);
    saveAll([...others, ...updated]);
    setPropertiesState([...updated]);
  };

  const createProperty = (data: { name: string; address: string; type: PropertyType }): Property => {
    const newProp: Property = {
      id: crypto.randomUUID(),
      userId: user!.id,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft',
      rooms: [],
    };
    persist([...propertiesRef.current, newProp]);
    return newProp;
  };

  const updateProperty = (id: string, data: Partial<Property>) => {
    persist(propertiesRef.current.map((p) => (p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p)));
  };

  const deleteProperty = (id: string) => {
    persist(propertiesRef.current.filter((p) => p.id !== id));
  };

  const getProperty = (id: string) => propertiesRef.current.find((p) => p.id === id);

  const addRoom = (propertyId: string, room: Omit<Room, 'id' | 'propertyId' | 'items' | 'photos'>): Room => {
    const newRoom: Room = { id: crypto.randomUUID(), propertyId, ...room, items: [], photos: [] };
    persist(
      propertiesRef.current.map((p) =>
        p.id === propertyId ? { ...p, rooms: [...p.rooms, newRoom], updatedAt: new Date().toISOString() } : p
      )
    );
    return newRoom;
  };

  const deleteRoom = (propertyId: string, roomId: string) => {
    persist(
      propertiesRef.current.map((p) =>
        p.id === propertyId
          ? { ...p, rooms: p.rooms.filter((r) => r.id !== roomId), updatedAt: new Date().toISOString() }
          : p
      )
    );
  };

  const addItem = (propertyId: string, roomId: string, item: Omit<Item, 'id' | 'roomId' | 'photos'>): Item => {
    const newItem: Item = { id: crypto.randomUUID(), roomId, ...item, photos: [] };
    persist(
      propertiesRef.current.map((p) =>
        p.id === propertyId
          ? {
              ...p,
              rooms: p.rooms.map((r) =>
                r.id === roomId ? { ...r, items: [...r.items, newItem] } : r
              ),
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
    return newItem;
  };

  const updateItem = (propertyId: string, roomId: string, itemId: string, data: Partial<Item>) => {
    persist(
      propertiesRef.current.map((p) =>
        p.id === propertyId
          ? {
              ...p,
              rooms: p.rooms.map((r) =>
                r.id === roomId
                  ? { ...r, items: r.items.map((i) => (i.id === itemId ? { ...i, ...data } : i)) }
                  : r
              ),
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  };

  const deleteItem = (propertyId: string, roomId: string, itemId: string) => {
    persist(
      propertiesRef.current.map((p) =>
        p.id === propertyId
          ? {
              ...p,
              rooms: p.rooms.map((r) =>
                r.id === roomId ? { ...r, items: r.items.filter((i) => i.id !== itemId) } : r
              ),
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  };

  const addPhotoToRoom = (propertyId: string, roomId: string, photoData: Omit<Photo, 'id'>) => {
    const newPhoto: Photo = { id: crypto.randomUUID(), ...photoData };
    persist(
      propertiesRef.current.map((p) =>
        p.id === propertyId
          ? {
              ...p,
              rooms: p.rooms.map((r) =>
                r.id === roomId ? { ...r, photos: [...r.photos, newPhoto] } : r
              ),
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  };

  const addPhotoToItem = (propertyId: string, roomId: string, itemId: string, photoData: Omit<Photo, 'id'>) => {
    const newPhoto: Photo = { id: crypto.randomUUID(), ...photoData };
    persist(
      propertiesRef.current.map((p) =>
        p.id === propertyId
          ? {
              ...p,
              rooms: p.rooms.map((r) =>
                r.id === roomId
                  ? {
                      ...r,
                      items: r.items.map((i) =>
                        i.id === itemId ? { ...i, photos: [...i.photos, newPhoto] } : i
                      ),
                    }
                  : r
              ),
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  };

  const markCompleted = (propertyId: string) => {
    persist(
      propertiesRef.current.map((p) =>
        p.id === propertyId ? { ...p, status: 'completed', updatedAt: new Date().toISOString() } : p
      )
    );
  };

  return (
    <InventoryContext.Provider
      value={{
        properties,
        isLoading,
        createProperty,
        updateProperty,
        deleteProperty,
        getProperty,
        addRoom,
        deleteRoom,
        addItem,
        updateItem,
        deleteItem,
        addPhotoToRoom,
        addPhotoToItem,
        markCompleted,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error('useInventory must be used within InventoryProvider');
  return ctx;
}
