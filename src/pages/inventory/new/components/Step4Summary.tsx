import { Link } from 'react-router-dom';
import { PropertyType, PROPERTY_TYPE_LABELS, CONDITION_LABELS, CONDITION_COLORS } from '@/types';
import { Item } from '@/types';

interface RoomData {
  name: string;
  icon: string;
  items: Array<Omit<Item, 'id' | 'roomId'> & { tempId: string }>;
  photos: Array<{ url: string; takenAt: string }>;
}

interface Props {
  property: { name: string; address: string; ownerName?: string; type: PropertyType };
  rooms: RoomData[];
  savedPropertyId?: string;
}

export default function Step4Summary({ property, rooms, savedPropertyId }: Props) {
  const totalItems = rooms.reduce((sum, r) => sum + r.items.length, 0);
  const totalPhotos = rooms.reduce((sum, r) => sum + r.photos.length, 0);
  const totalValue = rooms.reduce(
    (sum, r) => sum + r.items.reduce((s, i) => s + (i.estimatedValue ?? 0), 0),
    0
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Récapitulatif</h2>
        <p className="text-sm text-gray-500">Votre inventaire est prêt. Voici un résumé avant de terminer.</p>
      </div>

      {/* Property info */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <i className="ri-home-3-line text-amber-500 text-lg"></i>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{property.name || 'Sans nom'}</h3>
            {property.ownerName && (
              <p className="text-sm text-gray-600 mt-0.5 flex items-center gap-1">
                <i className="ri-user-line text-gray-400 text-xs"></i>
                {property.ownerName}
              </p>
            )}
            {property.address && <p className="text-sm text-gray-500 mt-0.5">{property.address}</p>}
            <span className="inline-block mt-1.5 text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
              {PROPERTY_TYPE_LABELS[property.type]}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Pièces', value: rooms.length, icon: 'ri-layout-3-line', isText: false },
          { label: 'Objets', value: totalItems, icon: 'ri-archive-line', isText: false },
          { label: 'Photos', value: totalPhotos, icon: 'ri-camera-line', isText: false },
          {
            label: 'Valeur totale',
            value: totalValue,
            icon: 'ri-money-euro-circle-line',
            isText: true,
          },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-3 text-center">
            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center mx-auto mb-2">
              <i className={`${s.icon} text-amber-500`}></i>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {s.isText
                ? (s.value as number).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
                : s.value}
            </p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Rooms detail */}
      <div className="flex flex-col gap-3">
        {rooms.map((room) => (
          <div key={room.name} className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-200">
              <i className={`${room.icon} text-amber-500`}></i>
              <span className="font-semibold text-sm text-gray-800">{room.name}</span>
              <span className="ml-auto text-xs text-gray-400">{room.items.length} objet{room.items.length !== 1 ? 's' : ''}</span>
            </div>
            {room.items.length > 0 && (
              <div className="divide-y divide-gray-100">
                {room.items.map((item) => (
                  <div key={item.tempId} className="flex items-center justify-between px-4 py-2">
                    <span className="text-sm text-gray-700">{item.name}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CONDITION_COLORS[item.condition]}`}>
                      {CONDITION_LABELS[item.condition]}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {room.items.length === 0 && (
              <p className="text-xs text-gray-400 px-4 py-2">Aucun objet</p>
            )}
          </div>
        ))}
      </div>

      {savedPropertyId && (
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to={`/inventory/${savedPropertyId}`}
            className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm py-3 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
          >
            <i className="ri-eye-line"></i>
            Voir l&apos;inventaire complet
          </Link>
          <Link
            to={`/inventory/${savedPropertyId}/report`}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm py-3 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
          >
            <i className="ri-file-pdf-line"></i>
            Générer le rapport PDF
          </Link>
        </div>
      )}
    </div>
  );
}
