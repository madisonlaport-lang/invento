import { Link } from 'react-router-dom';
import { Property, PROPERTY_TYPE_LABELS } from '@/types';
import { formatDateShort } from '@/utils/imageUtils';

interface Props {
  property: Property;
  onDelete: (id: string) => void;
}

const TYPE_ICONS: Record<string, string> = {
  airbnb: 'ri-home-heart-line',
  meuble: 'ri-building-line',
  etat_lieux: 'ri-file-list-3-line',
  other: 'ri-home-3-line',
};

const TYPE_COLORS: Record<string, string> = {
  airbnb: 'bg-pink-50 text-pink-600',
  meuble: 'bg-sky-50 text-sky-600',
  etat_lieux: 'bg-violet-50 text-violet-600',
  other: 'bg-gray-100 text-gray-600',
};

export default function PropertyCard({ property, onDelete }: Props) {
  const totalItems = property.rooms.reduce((sum, r) => sum + r.items.length, 0);
  const totalPhotos = property.rooms.reduce(
    (sum, r) => sum + r.photos.length + r.items.reduce((s, i) => s + i.photos.length, 0),
    0
  );

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-amber-200 transition-all group">
      {/* Image header */}
      <div className="relative h-40 overflow-hidden bg-gray-100">
        <img
          src="https://readdy.ai/api/search-image?query=bright%20modern%20apartment%20interior%20living%20room%20Scandinavian%20style%20warm%20natural%20light%20white%20walls%20minimal%20decoration%20real%20estate%20photography%20professional%20high%20quality%20no%20people%20clean&width=400&height=200&seq=card-prop-001&orientation=landscape"
          alt={property.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <h3 className="text-white font-bold text-base leading-tight">{property.name}</h3>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
              property.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
            }`}
          >
            {property.status === 'completed' ? 'Terminé' : 'Brouillon'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${TYPE_COLORS[property.type]}`}>
            <i className={`${TYPE_ICONS[property.type]} text-xs`}></i>
            {PROPERTY_TYPE_LABELS[property.type]}
          </span>
        </div>

        {property.address && (
          <div className="flex items-start gap-1.5 mb-3">
            <div className="w-4 h-4 flex items-center justify-center mt-0.5 flex-shrink-0">
              <i className="ri-map-pin-2-line text-gray-400 text-xs"></i>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{property.address}</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-y border-gray-100">
          <div className="text-center">
            <p className="text-base font-bold text-gray-900">{property.rooms.length}</p>
            <p className="text-xs text-gray-400">pièce{property.rooms.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="text-center border-x border-gray-100">
            <p className="text-base font-bold text-gray-900">{totalItems}</p>
            <p className="text-xs text-gray-400">objet{totalItems !== 1 ? 's' : ''}</p>
          </div>
          <div className="text-center">
            <p className="text-base font-bold text-gray-900">{totalPhotos}</p>
            <p className="text-xs text-gray-400">photo{totalPhotos !== 1 ? 's' : ''}</p>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-4">
          Modifié le {formatDateShort(property.updatedAt)}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            to={`/inventory/${property.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-eye-line"></i>
            Voir
          </Link>
          <Link
            to={`/inventory/${property.id}/report`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-file-pdf-line"></i>
            Rapport
          </Link>
          <button
            onClick={() => onDelete(property.id)}
            className="w-9 h-9 flex items-center justify-center border border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-delete-bin-line text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
