import { useState, useRef, ChangeEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useInventory } from '@/contexts/InventoryContext';
import AppLayout from '@/components/feature/AppLayout';
import AddItemModal from './components/AddItemModal';
import { Item, CONDITION_LABELS, CONDITION_COLORS } from '@/types';
import { compressImage, formatDateShort } from '@/utils/imageUtils';

export default function InventoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProperty, addRoom, addItem, addPhotoToRoom, addPhotoToItem, deleteItem, deleteRoom } = useInventory();

  const property = getProperty(id!);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [showAddItem, setShowAddItem] = useState(false);
  const [addRoomName, setAddRoomName] = useState('');
  const [showAddRoom, setShowAddRoom] = useState(false);
  const photoRef = useRef<HTMLInputElement>(null);

  if (!property) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-500 mb-4">Logement introuvable.</p>
          <Link to="/dashboard" className="text-amber-600 font-semibold cursor-pointer">← Retour au tableau de bord</Link>
        </div>
      </AppLayout>
    );
  }

  const currentRoom = property.rooms.find((r) => r.id === (activeRoomId || property.rooms[0]?.id));
  const activeId = activeRoomId || property.rooms[0]?.id;

  const handleAddItem = (itemData: Omit<Item, 'id' | 'roomId' | 'photos'>, photos: Array<{ url: string; takenAt: string }>) => {
    if (!activeId) return;
    const newItem = addItem(property.id, activeId, itemData);
    for (const ph of photos) {
      addPhotoToItem(property.id, activeId, newItem.id, { ...ph, linkedId: newItem.id, linkedType: 'item' });
    }
    setShowAddItem(false);
  };

  const handleRoomPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!activeId || !e.target.files) return;
    for (const file of Array.from(e.target.files)) {
      const url = await compressImage(file);
      addPhotoToRoom(property.id, activeId, { url, takenAt: new Date().toISOString(), linkedId: activeId, linkedType: 'room' });
    }
    if (photoRef.current) photoRef.current.value = '';
  };

  const handleAddRoom = () => {
    if (!addRoomName.trim()) return;
    const room = addRoom(property.id, { name: addRoomName.trim(), icon: 'ri-home-3-line' });
    setActiveRoomId(room.id);
    setAddRoomName('');
    setShowAddRoom(false);
  };

  const totalItems = property.rooms.reduce((s, r) => s + r.items.length, 0);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700 cursor-pointer transition-colors">
              <i className="ri-arrow-left-line"></i>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{property.name}</h1>
              {property.address && <p className="text-xs text-gray-500">{property.address}</p>}
            </div>
          </div>
          <div className="flex gap-2">
            <span className="hidden md:inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
              <i className="ri-archive-line"></i> {totalItems} objets
            </span>
            <Link
              to={`/inventory/${id}/report`}
              className="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
            >
              <i className="ri-file-pdf-line"></i>
              Rapport PDF
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Room sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="text-sm font-bold text-gray-900">Pièces ({property.rooms.length})</span>
                <button
                  onClick={() => setShowAddRoom(!showAddRoom)}
                  className="w-7 h-7 flex items-center justify-center text-amber-500 hover:bg-amber-50 rounded-lg cursor-pointer transition-colors"
                >
                  <i className="ri-add-line"></i>
                </button>
              </div>
              {showAddRoom && (
                <div className="px-3 py-2 border-b border-gray-100 flex gap-2">
                  <input
                    type="text"
                    value={addRoomName}
                    onChange={(e) => setAddRoomName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddRoom()}
                    placeholder="Nom de la pièce"
                    className="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 bg-gray-50"
                    autoFocus
                  />
                  <button onClick={handleAddRoom} className="px-2.5 py-1.5 bg-amber-500 text-white text-xs rounded-lg cursor-pointer whitespace-nowrap">OK</button>
                </div>
              )}
              <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible">
                {property.rooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setActiveRoomId(room.id)}
                    className={`flex items-center gap-2.5 px-4 py-3 text-left cursor-pointer transition-colors flex-shrink-0 lg:flex-shrink-auto border-b border-gray-100 last:border-0 ${
                      room.id === activeId ? 'bg-amber-50 border-l-2 border-l-amber-500 text-amber-700' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <i className={`${room.icon} text-sm`}></i>
                    </div>
                    <span className="text-sm font-medium whitespace-nowrap flex-1">{room.name}</span>
                    <span className="text-xs text-gray-400">{room.items.length}</span>
                  </button>
                ))}
                {property.rooms.length === 0 && (
                  <p className="text-xs text-gray-400 px-4 py-4">Aucune pièce. Ajoutez-en une.</p>
                )}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {currentRoom ? (
              <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                {/* Room header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <i className={`${currentRoom.icon} text-amber-500 text-lg`}></i>
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900">{currentRoom.name}</h2>
                      <p className="text-xs text-gray-400">{currentRoom.items.length} objet{currentRoom.items.length !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input ref={photoRef} type="file" accept="image/*" multiple className="hidden" onChange={handleRoomPhoto} />
                    <button
                      onClick={() => photoRef.current?.click()}
                      className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 hover:border-amber-400 hover:text-amber-600 px-3 py-1.5 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
                    >
                      <i className="ri-camera-line"></i>
                      Photo ({currentRoom.photos.length})
                    </button>
                    <button
                      onClick={() => setShowAddItem(true)}
                      className="flex items-center gap-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
                    >
                      <i className="ri-add-line"></i>
                      Objet
                    </button>
                    <button
                      onClick={() => { deleteRoom(property.id, currentRoom.id); setActiveRoomId(null); }}
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <i className="ri-delete-bin-line text-sm"></i>
                    </button>
                  </div>
                </div>

                {/* Photos */}
                {currentRoom.photos.length > 0 && (
                  <div className="flex gap-2 px-5 py-3 border-b border-gray-100 overflow-x-auto">
                    {currentRoom.photos.map((ph) => (
                      <img key={ph.id} src={ph.url} alt="photo" className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                    ))}
                  </div>
                )}

                {/* Items */}
                {currentRoom.items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <i className="ri-archive-line text-gray-400 text-2xl"></i>
                    </div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Aucun objet dans cette pièce</p>
                    <p className="text-xs text-gray-400 mb-4">Cliquez sur &quot;Objet&quot; pour commencer l&apos;inventaire</p>
                    <button
                      onClick={() => setShowAddItem(true)}
                      className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
                    >
                      <i className="ri-add-line"></i>
                      Ajouter un objet
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {currentRoom.items.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 px-5 py-4">
                        {item.photos.length > 0 && (
                          <img src={item.photos[0].url} alt={item.name} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-semibold text-gray-900 text-sm">{item.name}</span>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CONDITION_COLORS[item.condition]}`}>
                              {CONDITION_LABELS[item.condition]}
                            </span>
                            {item.estimatedValue && (
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                ~{item.estimatedValue}€
                              </span>
                            )}
                          </div>
                          {item.description && <p className="text-xs text-gray-500">{item.description}</p>}
                          {item.photos.length > 1 && (
                            <p className="text-xs text-gray-400 mt-1">{item.photos.length} photos</p>
                          )}
                        </div>
                        <button
                          onClick={() => deleteItem(property.id, currentRoom.id, item.id)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 cursor-pointer transition-colors flex-shrink-0"
                        >
                          <i className="ri-delete-bin-line text-sm"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
                <p className="text-gray-400 text-sm">Sélectionnez une pièce ou créez-en une nouvelle.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddItem && activeId && (
        <AddItemModal
          roomId={activeId}
          onAdd={handleAddItem}
          onClose={() => setShowAddItem(false)}
        />
      )}
    </AppLayout>
  );
}
