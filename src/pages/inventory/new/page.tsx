import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useInventory } from '@/contexts/InventoryContext';
import AppLayout from '@/components/feature/AppLayout';
import { PropertyType, Item, Photo } from '@/types';
import Step1PropertyInfo from './components/Step1PropertyInfo';
import Step2Rooms from './components/Step2Rooms';
import Step3Items from './components/Step3Items';
import Step4Summary from './components/Step4Summary';

interface RoomData {
  name: string;
  icon: string;
  items: Array<Omit<Item, 'id' | 'roomId'> & { tempId: string }>;
  photos: Array<Omit<Photo, 'id'>>;
}

const STEPS = [
  { label: 'Logement', icon: 'ri-home-3-line' },
  { label: 'Pièces', icon: 'ri-layout-3-line' },
  { label: 'Objets', icon: 'ri-archive-line' },
  { label: 'Récap', icon: 'ri-check-double-line' },
];

export default function NewInventoryPage() {
  const { createProperty, addRoom, addItem, addPhotoToRoom, markCompleted } = useInventory();
  const location = useLocation();

  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [savedPropertyId, setSavedPropertyId] = useState<string | undefined>();

  const [propertyData, setPropertyData] = useState<{
    name: string;
    address: string;
    type: PropertyType;
  }>({ name: '', address: '', type: 'airbnb' });

  const [selectedRooms, setSelectedRooms] = useState<Array<{ name: string; icon: string }>>([]);
  const [roomsWithItems, setRoomsWithItems] = useState<RoomData[]>([]);

  // Pre-fill from template state (passed via navigate)
  useEffect(() => {
    const state = location.state as {
      template?: { type: PropertyType; rooms: Array<{ name: string; icon: string }> };
    } | null;
    if (state?.template) {
      setPropertyData((prev) => ({ ...prev, type: state.template!.type }));
      setSelectedRooms(state.template!.rooms);
    }
  }, []);

  const goToStep = (next: number) => {
    if (next === 2 && step === 1) {
      setRoomsWithItems(
        selectedRooms.map((r) => ({
          ...r,
          items: [],
          photos: [],
        }))
      );
    }
    setStep(next);
  };

  const canProceed = () => {
    if (step === 0) return propertyData.name.trim().length > 0;
    if (step === 1) return selectedRooms.length > 0;
    return true;
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const property = createProperty(propertyData);
      for (const roomData of roomsWithItems) {
        const room = addRoom(property.id, { name: roomData.name, icon: roomData.icon });
        for (const itemData of roomData.items) {
          addItem(property.id, room.id, {
            name: itemData.name,
            description: itemData.description,
            condition: itemData.condition,
            estimatedValue: itemData.estimatedValue,
          });
        }
        for (const photo of roomData.photos) {
          addPhotoToRoom(property.id, room.id, {
            ...photo,
            linkedId: room.id,
            linkedType: 'room',
          });
        }
      }
      markCompleted(property.id);
      setSavedPropertyId(property.id);
      setStep(3);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link to="/dashboard" className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer transition-colors">
            <i className="ri-arrow-left-line"></i>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Nouvel inventaire</h1>
            <p className="text-xs text-gray-500">Étape {step + 1} sur {STEPS.length}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, idx) => (
            <div key={s.label} className="flex items-center gap-2 flex-1">
              <div className={`flex items-center gap-1.5 whitespace-nowrap ${idx <= step ? 'text-amber-600' : 'text-gray-400'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  idx < step ? 'bg-amber-500 text-white' :
                  idx === step ? 'bg-amber-100 text-amber-600 ring-2 ring-amber-400' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {idx < step ? <i className="ri-check-line text-sm"></i> : idx + 1}
                </div>
                <span className="text-xs font-medium hidden sm:block">{s.label}</span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 rounded-full ${idx < step ? 'bg-amber-400' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
          {step === 0 && (
            <Step1PropertyInfo
              data={propertyData}
              onChange={(d) => setPropertyData((prev) => ({ ...prev, ...d }))}
            />
          )}
          {step === 1 && (
            <Step2Rooms
              selectedRooms={selectedRooms}
              onChange={setSelectedRooms}
            />
          )}
          {step === 2 && (
            <Step3Items
              rooms={roomsWithItems}
              onChange={setRoomsWithItems}
            />
          )}
          {step === 3 && (
            <Step4Summary
              property={propertyData}
              rooms={roomsWithItems}
              savedPropertyId={savedPropertyId}
            />
          )}
        </div>

        {/* Navigation */}
        {step < 3 && (
          <div className="flex gap-3">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-3 border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold rounded-lg cursor-pointer transition-colors whitespace-nowrap"
              >
                <i className="ri-arrow-left-line mr-1"></i>
                Retour
              </button>
            )}
            {step < 2 ? (
              <button
                type="button"
                onClick={() => goToStep(step + 1)}
                disabled={!canProceed()}
                className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-semibold py-3 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
              >
                Continuer
                <i className="ri-arrow-right-line"></i>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white text-sm font-semibold py-3 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <i className="ri-save-line"></i>
                    Terminer et sauvegarder
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
