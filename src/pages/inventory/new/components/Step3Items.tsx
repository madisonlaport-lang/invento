import { useState, useRef, ChangeEvent } from 'react';
import { Item, ItemCondition, CONDITION_LABELS, CONDITION_COLORS, Photo } from '@/types';
import { compressImage } from '@/utils/imageUtils';

interface RoomData {
  name: string;
  icon: string;
  items: Array<Omit<Item, 'id' | 'roomId'> & { tempId: string }>;
  photos: Array<Omit<Photo, 'id'>>;
}

interface Props {
  rooms: RoomData[];
  onChange: (rooms: RoomData[]) => void;
}

const CONDITIONS: ItemCondition[] = ['neuf', 'bon', 'use', 'endommage'];

interface NewItemForm {
  name: string;
  description: string;
  condition: ItemCondition;
  estimatedValue: string;
}

const emptyForm = (): NewItemForm => ({
  name: '',
  description: '',
  condition: 'bon',
  estimatedValue: '',
});

export default function Step3Items({ rooms, onChange }: Props) {
  const [activeRoom, setActiveRoom] = useState(0);
  const [form, setForm] = useState<NewItemForm>(emptyForm());
  const [adding, setAdding] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const photoRef = useRef<HTMLInputElement>(null);

  const room = rooms[activeRoom];

  const updateRoom = (idx: number, data: Partial<RoomData>) => {
    const updated = rooms.map((r, i) => (i === idx ? { ...r, ...data } : r));
    onChange(updated);
  };

  const addItem = () => {
    if (!form.name.trim()) return;
    const newItem = {
      tempId: crypto.randomUUID(),
      name: form.name.trim(),
      description: form.description.trim(),
      condition: form.condition,
      estimatedValue: form.estimatedValue ? parseFloat(form.estimatedValue) : undefined,
      photos: [],
    };
    updateRoom(activeRoom, { items: [...room.items, newItem] });
    setForm(emptyForm());
    setAdding(false);
  };

  const removeItem = (tempId: string) => {
    updateRoom(activeRoom, { items: room.items.filter((i) => i.tempId !== tempId) });
  };

  const handlePhotoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingPhoto(true);
    const photos = [...room.photos];
    for (const file of Array.from(files)) {
      try {
        const compressed = await compressImage(file);
        photos.push({ url: compressed, takenAt: new Date().toISOString(), linkedId: '', linkedType: 'room' });
      } catch {
        // skip failed
      }
    }
    updateRoom(activeRoom, { photos });
    setUploadingPhoto(false);
    if (photoRef.current) photoRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Inventaire par pièce</h2>
        <p className="text-sm text-gray-500">Ajoutez les objets présents dans chaque pièce.</p>
      </div>

      {/* Room tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {rooms.map((r, idx) => (
          <button
            key={r.name}
            type="button"
            onClick={() => { setActiveRoom(idx); setAdding(false); setForm(emptyForm()); }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all flex-shrink-0 ${
              activeRoom === idx
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <i className={`${r.icon} text-sm`}></i>
            {r.name}
            {r.items.length > 0 && (
              <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${activeRoom === idx ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {r.items.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Current room */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className={`${room.icon} text-amber-500`}></i>
            </div>
            <span className="font-semibold text-gray-800 text-sm">{room.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <input ref={photoRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} />
            <button
              type="button"
              onClick={() => photoRef.current?.click()}
              disabled={uploadingPhoto}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-amber-600 bg-white border border-gray-200 px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
            >
              <i className="ri-camera-line"></i>
              {uploadingPhoto ? 'Upload...' : `Photos (${room.photos.length})`}
            </button>
            <button
              type="button"
              onClick={() => setAdding(true)}
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
            >
              <i className="ri-add-line"></i>
              Objet
            </button>
          </div>
        </div>

        {/* Photo thumbnails */}
        {room.photos.length > 0 && (
          <div className="flex gap-2 p-3 border-b border-gray-100 overflow-x-auto">
            {room.photos.map((ph, idx) => (
              <img key={idx} src={ph.url} alt="photo" className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
            ))}
          </div>
        )}

        {/* Items list */}
        <div className="divide-y divide-gray-100">
          {room.items.length === 0 && !adding && (
            <div className="flex flex-col items-center justify-center py-8 text-center px-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <i className="ri-archive-line text-gray-400 text-xl"></i>
              </div>
              <p className="text-sm text-gray-500">Aucun objet ajouté</p>
              <p className="text-xs text-gray-400 mt-1">Cliquez sur &quot;Objet&quot; pour commencer</p>
            </div>
          )}
          {room.items.map((item) => (
            <div key={item.tempId} className="flex items-center gap-3 px-4 py-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CONDITION_COLORS[item.condition]}`}>
                    {CONDITION_LABELS[item.condition]}
                  </span>
                </div>
                {item.description && <p className="text-xs text-gray-500 mt-0.5 truncate">{item.description}</p>}
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.tempId)}
                className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 cursor-pointer transition-colors flex-shrink-0"
              >
                <i className="ri-delete-bin-line text-sm"></i>
              </button>
            </div>
          ))}

          {/* Add form */}
          {adding && (
            <div className="p-4 bg-amber-50/50 border-t border-amber-100">
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nom de l'objet (ex : Canapé, TV...)"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-white"
                  autoFocus
                />
                <div className="flex gap-2 flex-wrap">
                  {CONDITIONS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setForm({ ...form, condition: c })}
                      className={`text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer transition-all ${
                        form.condition === c ? CONDITION_COLORS[c] + ' ring-2 ring-offset-1 ring-current' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {CONDITION_LABELS[c]}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Description (optionnel)"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-white"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={addItem}
                    disabled={!form.name.trim()}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-semibold py-2 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
                  >
                    Ajouter
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAdding(false); setForm(emptyForm()); }}
                    className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
