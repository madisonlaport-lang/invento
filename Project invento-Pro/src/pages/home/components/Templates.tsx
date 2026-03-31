import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { PropertyType, DEFAULT_ROOMS } from '@/types';

interface TemplateRoom {
  name: string;
  icon: string;
}

interface TemplateConfig {
  type: PropertyType;
  rooms: TemplateRoom[];
}

const TEMPLATES = [
  {
    icon: 'ri-home-smile-line',
    title: 'Location Airbnb',
    subtitle: 'Logement courte durée',
    desc: 'Parfait pour les conciergeries et propriétaires Airbnb. Inclut checklist ménage, inventaire mobilier et équipements.',
    rooms: ['Salon', 'Cuisine', 'Chambre', 'Salle de bain'],
    badge: 'Populaire',
    badgeColor: 'bg-amber-100 text-amber-700',
    items: 45,
    color: 'border-amber-200',
    accent: 'bg-amber-50',
    template: {
      type: 'airbnb' as PropertyType,
      rooms: [
        { name: 'Salon', icon: 'ri-sofa-line' },
        { name: 'Cuisine', icon: 'ri-restaurant-line' },
        { name: 'Chambre', icon: 'ri-hotel-bed-line' },
        { name: 'Salle de bain', icon: 'ri-drop-line' },
      ],
    } satisfies TemplateConfig,
  },
  {
    icon: 'ri-building-2-line',
    title: 'Logement meublé',
    subtitle: 'Location longue durée',
    desc: "Idéal pour les appartements et maisons meublés en location annuelle. Conforme à la loi Alur.",
    rooms: ['Entrée', 'Salon', 'Cuisine', 'Chambre', 'SDB', 'WC'],
    badge: 'Recommandé',
    badgeColor: 'bg-gray-100 text-gray-600',
    items: 62,
    color: 'border-gray-200',
    accent: 'bg-gray-50',
    template: {
      type: 'meuble' as PropertyType,
      rooms: [
        { name: 'Entrée', icon: 'ri-door-open-line' },
        { name: 'Salon', icon: 'ri-sofa-line' },
        { name: 'Cuisine', icon: 'ri-restaurant-line' },
        { name: 'Chambre', icon: 'ri-hotel-bed-line' },
        { name: 'Salle de bain', icon: 'ri-drop-line' },
        { name: 'WC', icon: 'ri-water-flash-line' },
      ],
    } satisfies TemplateConfig,
  },
  {
    icon: 'ri-exchange-line',
    title: 'État des lieux entrée / sortie',
    subtitle: 'Comparaison automatique',
    desc: "Comparez facilement l'état du logement entre l'entrée et la sortie. Détection automatique des changements.",
    rooms: ['Toutes les pièces', 'Relevés compteurs', 'Clés'],
    badge: 'Avancé',
    badgeColor: 'bg-rose-100 text-rose-600',
    items: 80,
    color: 'border-rose-200',
    accent: 'bg-rose-50/30',
    template: {
      type: 'etat_lieux' as PropertyType,
      rooms: DEFAULT_ROOMS.slice(0, 7),
    } satisfies TemplateConfig,
  },
];

export default function Templates() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleUseTemplate = (config: TemplateConfig) => {
    if (!user) {
      navigate('/register');
      return;
    }
    navigate('/inventory/new', {
      state: { template: config },
    });
  };

  return (
    <section id="modeles" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-50 text-amber-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            Modèles et pré-remplissages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Démarrez en <span className="text-amber-500">30 secondes</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Choisissez un modèle adapté à votre situation. Checklists pré-remplies, tout est prêt dès le début.
          </p>
        </div>

        {/* Template Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.title}
              className={`bg-white rounded-lg border-2 ${tmpl.color} overflow-hidden hover:border-amber-400 transition-colors group`}
            >
              <div className={`${tmpl.accent} px-6 py-8`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg border border-gray-100">
                    <i className={`${tmpl.icon} text-2xl text-amber-500`}></i>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${tmpl.badgeColor}`}>
                    {tmpl.badge}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-1">{tmpl.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{tmpl.subtitle}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{tmpl.desc}</p>
              </div>

              <div className="px-6 py-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2 mb-4">
                  {tmpl.rooms.map((room) => (
                    <span key={room} className="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                      {room}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{tmpl.items} éléments pré-remplis</span>
                  <button
                    onClick={() => handleUseTemplate(tmpl.template)}
                    className="text-amber-600 text-sm font-semibold flex items-center gap-1 cursor-pointer hover:text-amber-700 whitespace-nowrap transition-colors"
                  >
                    Utiliser
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-arrow-right-line text-sm"></i>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bonus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-amber-50 rounded-lg p-6 border border-amber-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 flex items-center justify-center bg-amber-500 rounded-lg">
                <i className="ri-git-merge-line text-white text-xl"></i>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Comparaison d&apos;inventaires</h4>
                <p className="text-xs text-gray-500">Détection automatique des changements</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Comparez deux inventaires et identifiez automatiquement les différences, dommages ou objets manquants.
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 flex items-center justify-center bg-orange-500 rounded-lg">
                <i className="ri-checkbox-multiple-line text-white text-xl"></i>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Checklist ménage intégrée</h4>
                <p className="text-xs text-gray-500">Pour conciergeries Airbnb</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Checklist automatique de remise en état incluse à chaque inventaire de sortie. Parfait pour les conciergeries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
