import { Link } from "react-router-dom";

const STATS = [
  { value: "8 500+", label: "Inventaires créés" },
  { value: "10 min", label: "Par inventaire" },
  { value: "98%", label: "Satisfaction client" },
  { value: "100%", label: "Valide légalement" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=bright%20modern%20Scandinavian%20apartment%20interior%20living%20room%20with%20large%20floor%20to%20ceiling%20windows%2C%20minimalist%20elegant%20design%2C%20warm%20natural%20light%2C%20white%20walls%2C%20oak%20wooden%20floors%2C%20linen%20sofa%2C%20green%20plants%2C%20architectural%20photography%2C%20professional%20real%20estate%20photography%2C%20luxury%20interior%2C%20no%20people%2C%20ultra%20sharp%208K%20quality&width=1920&height=1080&seq=hero-inventopro-001&orientation=landscape"
          alt="Appartement moderne"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/65 to-gray-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Remplacez les experts d'état des lieux
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-4xl mb-6">
          L'inventaire professionnel,{" "}
          <span className="text-amber-400">simplifié</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/75 max-w-2xl mb-10 leading-relaxed">
          Créez des rapports d'état des lieux juridiquement valables en moins de 10 minutes.
          Photos horodatées, signature électronique, PDF professionnel — sans expert, sans surcoût.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-md transition-all cursor-pointer whitespace-nowrap text-base"
          >
            <i className="ri-rocket-line text-lg"></i>
            Commencer gratuitement
          </Link>
          <a
            href="#fonctionnalites"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-md transition-all cursor-pointer whitespace-nowrap text-base"
          >
            <i className="ri-play-circle-line text-lg"></i>
            Voir comment ça marche
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center gap-5 mb-16">
          {[
            "ri-shield-check-line",
            "ri-file-pdf-line",
            "ri-camera-line",
            "ri-smartphone-line",
          ].map((icon, i) => {
            const labels = [
              "Valide juridiquement",
              "Export PDF professionnel",
              "Photos horodatées",
              "Mobile & Web",
            ];
            return (
              <div key={i} className="flex items-center gap-2 text-white/70 text-sm">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={`${icon} text-amber-400`}></i>
                </div>
                {labels[i]}
              </div>
            );
          })}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/20 pt-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">{stat.value}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
