const CLOUD_FEATURES = [
  {
    icon: "ri-history-line",
    title: "Historique complet",
    desc: "Retrouvez tous vos inventaires archivés, avec recherche et filtres avancés.",
  },
  {
    icon: "ri-building-line",
    title: "Multi-logements",
    desc: "Gérez plusieurs propriétés depuis un seul tableau de bord centralisé.",
  },
  {
    icon: "ri-share-line",
    title: "Partage instantané",
    desc: "Envoyez le rapport par email ou via un lien sécurisé en un seul clic.",
  },
  {
    icon: "ri-download-line",
    title: "Export multi-format",
    desc: "Téléchargez vos rapports en PDF, ou exportez les données en CSV.",
  },
  {
    icon: "ri-wifi-off-line",
    title: "Mode hors ligne",
    desc: "Travaillez sur le terrain sans connexion. Synchronisation automatique dès le retour en ligne.",
  },
  {
    icon: "ri-lock-2-line",
    title: "Stockage sécurisé",
    desc: "Données chiffrées et hébergées en Europe, conformes RGPD.",
  },
];

export default function CloudStorage() {
  return (
    <section className="py-24 bg-amber-50/40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-white text-amber-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider border border-amber-200">
            Stockage cloud & partage
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Vos données, <span className="text-amber-500">partout et en sécurité</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Accédez à tous vos inventaires depuis n'importe quel appareil. Partagez et exportez en quelques secondes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Device mockup */}
          <div className="relative">
            <img
              src="https://readdy.ai/api/search-image?query=multiple%20modern%20devices%20laptop%20tablet%20and%20smartphone%20displaying%20synchronized%20property%20management%20app%20interface%2C%20clean%20white%20studio%20background%2C%20premium%20tech%20product%20photography%2C%20professional%20flat%20lay%2C%20app%20showing%20property%20list%20and%20inventory%20data%2C%20minimalist%20design%2C%20ultra%20sharp&width=800&height=600&seq=cloud-devices-001&orientation=landscape"
              alt="Multi-appareils synchronisés"
              className="w-full h-[420px] object-cover object-top rounded-lg"
            />

            {/* Sync badge */}
            <div className="absolute top-4 left-4 bg-white rounded-lg px-4 py-3 border border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 flex items-center justify-center bg-emerald-100 rounded-lg">
                  <i className="ri-refresh-line text-emerald-600 text-sm"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Synchronisé</p>
                  <p className="text-xs text-gray-400">Il y a 2 secondes</p>
                </div>
              </div>
            </div>

            {/* Properties count */}
            <div className="absolute bottom-4 right-4 bg-gray-900 text-white rounded-lg px-4 py-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">24</div>
                <div className="text-xs text-white/60">logements gérés</div>
              </div>
            </div>
          </div>

          {/* Right: Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CLOUD_FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-lg p-5 border border-gray-100 hover:border-amber-200 transition-colors">
                <div className="w-9 h-9 flex items-center justify-center bg-amber-100 rounded-lg mb-3">
                  <i className={`${f.icon} text-amber-600 text-lg`}></i>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
