const PHOTO_FEATURES = [
  {
    icon: "ri-time-line",
    title: "Horodatage automatique",
    desc: "Chaque photo est automatiquement datée et géolocalisée pour une preuve irréfutable.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: "ri-image-edit-line",
    title: "Compression optimisée",
    desc: "Les photos sont compressées intelligemment pour un stockage minimal sans perte de qualité.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: "ri-link-m",
    title: "Association automatique",
    desc: "Les photos sont liées directement à l'objet ou à la pièce photographiée.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: "ri-image-2-line",
    title: "Photos multiples",
    desc: "Ajoutez autant de photos que nécessaire par objet ou par pièce.",
    color: "bg-red-100 text-red-600",
  },
];

const PHOTO_SAMPLES = [
  {
    src: "https://readdy.ai/api/search-image?query=modern%20kitchen%20interior%20real%20estate%20photo%20with%20timestamp%20overlay%2C%20clean%20white%20kitchen%20cabinets%2C%20marble%20countertop%2C%20stainless%20appliances%2C%20professional%20photography&width=400&height=300&seq=photo-kitchen-001&orientation=landscape",
    label: "Cuisine — 14/03/2025 09:42",
    room: "Cuisine",
  },
  {
    src: "https://readdy.ai/api/search-image?query=modern%20living%20room%20sofa%20couch%20real%20estate%20interior%20photo%2C%20bright%20natural%20light%2C%20white%20linen%20sofa%2C%20wooden%20coffee%20table%2C%20clean%20minimal%20style%2C%20professional%20photography&width=400&height=300&seq=photo-living-001&orientation=landscape",
    label: "Canapé — 14/03/2025 09:51",
    room: "Salon",
  },
  {
    src: "https://readdy.ai/api/search-image?query=modern%20bedroom%20interior%20real%20estate%20photo%2C%20white%20bed%20linen%2C%20wooden%20headboard%2C%20nightstand%2C%20natural%20light%2C%20minimalist%20decor%2C%20professional%20photography%2C%20clean%20bright%20room&width=400&height=300&seq=photo-bedroom-001&orientation=landscape",
    label: "Chambre — 14/03/2025 10:03",
    room: "Chambre",
  },
];

export default function SmartPhotos() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-50 text-amber-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            Photos intelligentes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Des preuves visuelles <span className="text-amber-500">incontestables</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Chaque photo devient une preuve datée et organisée. Aucune ambiguïté possible en cas de litige.
          </p>
        </div>

        {/* Photo Gallery Mockup */}
        <div className="mb-16">
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 text-white/40 text-xs">InventoPro — Photos de l'inventaire</span>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PHOTO_SAMPLES.map((photo) => (
                <div key={photo.label} className="relative rounded-lg overflow-hidden group cursor-pointer">
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="text-white/50 text-xs block">{photo.room}</span>
                    <span className="text-white text-xs font-semibold">{photo.label}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                    <i className="ri-time-line mr-1"></i>Horodaté
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PHOTO_FEATURES.map((f) => (
            <div key={f.title} className="bg-white rounded-lg p-6 border border-gray-100 hover:border-amber-200 transition-colors">
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg mb-4 ${f.color}`}>
                <i className={`${f.icon} text-xl`}></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
