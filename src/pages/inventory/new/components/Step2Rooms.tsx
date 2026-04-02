import { useState } from 'react';
import { DEFAULT_ROOMS } from '@/types';

interface RoomSelection {
  name: string;
  icon: string;
}

interface Props {
  selectedRooms: RoomSelection[];
  onChange: (rooms: RoomSelection[]) => void;
}

export default function Step2Rooms({ selectedRooms, onChange }: Props) {
  const [customRoom, setCustomRoom] = useState('');

  const isSelected = (name: string) => selectedRooms.some((r) => r.name === name);

  const toggle = (room: { name: string; icon: string }) => {
    if (isSelected(room.name)) {
      onChange(selectedRooms.filter((r) => r.name !== room.name));
    } else {
      onChange([...selectedRooms, room]);
    }
  };

  const addCustom = () => {
    const trimmed = customRoom.trim();
    if (!trimmed || isSelected(trimmed)) {
      setCustomRoom('');
      return;
    }
    onChange([...selectedRooms, { name: trimmed, icon: 'ri-home-3-line' }]);
    setCustomRoom('');
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Sélectionnez les pièces</h2>
        <p className="text-sm text-gray-500">Cochez toutes les pièces à inclure dans l&apos;inventaire.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {DEFAULT_ROOMS.map((room) => {
          const selected = isSelected(room.name);
          return (
            <button
              key={room.name}
              type="button"
              onClick={() => toggle(room)}
              className={`flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all cursor-pointer text-left ${
                selected
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                <i className={`${room.icon} text-lg`}></i>
              </div>
              <span className="text-xs font-semibold leading-tight">{room.name}</span>
              {selected && (
                <div className="ml-auto w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <i className="ri-check-line text-amber-500 text-sm"></i>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Custom room */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Ajouter une pièce personnalisée</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={customRoom}
            onChange={(e) => setCustomRoom(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCustom()}
            placeholder="Ex : Bureau, Grenier..."
            className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-gray-50"
          />
          <button
            type="button"
            onClick={addCustom}
            disabled={!customRoom.trim()}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            Ajouter
          </button>
        </div>
      </div>

      {selectedRooms.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-amber-700 mb-2">
            {selectedRooms.length} pièce{selectedRooms.length > 1 ? 's' : ''} sélectionnée{selectedRooms.length > 1 ? 's' : ''}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {selectedRooms.map((r) => (
              <span
                key={r.name}
                className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full"
              >
                <i className={`${r.icon} text-xs`}></i>
                {r.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
