import { PropertyType, PROPERTY_TYPE_LABELS } from '@/types';

interface Props {
  data: { name: string; address: string; type: PropertyType };
  onChange: (d: Partial<{ name: string; address: string; type: PropertyType }>) => void;
}

const TYPES: Array<{ key: PropertyType; icon: string; color: string }> = [
  { key: 'airbnb', icon: 'ri-home-heart-line', color: 'border-pink-300 bg-pink-50 text-pink-600' },
  { key: 'meuble', icon: 'ri-building-line', color: 'border-sky-300 bg-sky-50 text-sky-600' },
  { key: 'etat_lieux', icon: 'ri-file-list-3-line', color: 'border-violet-300 bg-violet-50 text-violet-600' },
  { key: 'other', icon: 'ri-home-3-line', color: 'border-gray-300 bg-gray-50 text-gray-600' },
];

export default function Step1PropertyInfo({ data, onChange }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Type d&apos;inventaire</h2>
        <p className="text-sm text-gray-500">Sélectionnez le type de logement à inventorier.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {TYPES.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange({ type: t.key })}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
              data.type === t.key
                ? `${t.color} border-opacity-100`
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            }`}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <i className={`${t.icon} text-2xl`}></i>
            </div>
            <span className="text-xs font-semibold text-center leading-tight">
              {PROPERTY_TYPE_LABELS[t.key]}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Nom du logement <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder='Ex : Appartement T3 - Paris 11e'
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Adresse</label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder='Ex : 12 rue de la Paix, 75001 Paris'
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
}
