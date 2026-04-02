const SERVICES = [
  {
    icon: "ri-calendar-check-line",
    title: "Gestion des réservations",
    description: "Synchronisation multi-plateformes (Airbnb, Booking, Abritel), gestion des disponibilités et tarification dynamique pour maximiser votre taux d'occupation.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: "ri-message-2-line",
    title: "Communication voyageurs",
    description: "Réponse rapide aux demandes, accueil personnalisé, gestion des avis et résolution des problèmes — vos voyageurs ont toujours quelqu'un à leur écoute.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: "ri-brush-line",
    title: "Ménage professionnel",
    description: "Équipe de ménage professionnelle et fiable. Linge de maison fourni, produits de qualité hôtelière. Votre logement toujours impeccable entre chaque séjour.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: "ri-camera-lens-line",
    title: "Photo professionnelle",
    description: "Shooting photo professionnel de votre logement pour maximiser l'attractivité de vos annonces sur Airbnb, Booking et Abritel. Des visuels qui font la différence.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: "ri-line-chart-line",
    title: "Optimisation des revenus",
    description: "Analyse du marché nantais, ajustement des prix en temps réel selon la demande, les événements et la saisonnalité pour maximiser vos revenus nets.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: "ri-shield-star-line",
    title: "Inventaire & protection",
    description: "État des lieux complets avec photos horodatées grâce à notre propre outil. Votre bien est protégé, documenté et suivi tout au long de chaque location.",
    color: "bg-amber-50 text-amber-600",
  },
];

export default function ConciergeServices() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Nos services
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Une gestion clé en main, de A à Z
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Nous prenons en charge chaque aspect de votre location courte durée à Nantes, pour que vous n'ayez plus à vous soucier de rien.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className="group bg-white border border-gray-100 rounded-lg p-7 hover:border-amber-200 hover:bg-amber-50/30 transition-all duration-300 cursor-default"
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${service.color} mb-5`}>
                <i className={`${service.icon} text-xl`}></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
