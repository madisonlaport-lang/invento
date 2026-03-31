import { useState } from "react";
import ConciergeContactModal from "./ConciergeContactModal";

export default function ConciergeHero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=luxurious%20modern%20furnished%20apartment%20in%20Nantes%20France%20with%20panoramic%20city%20view%2C%20bright%20open%20living%20room%20with%20designer%20furniture%2C%20floor%20to%20ceiling%20windows%2C%20warm%20afternoon%20sunlight%2C%20high-end%20interior%20design%2C%20artful%20decor%2C%20linen%20curtains%2C%20parquet%20floors%2C%20elegant%20minimalist%20style%2C%20no%20people%2C%20ultra-sharp%20professional%20real%20estate%20photography%2C%208K%20quality&width=1920&height=1080&seq=conciergerie-hero-001&orientation=landscape"
            alt="Appartement moderne Nantes"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-gray-900/70 to-gray-800/75" />
        </div>

        {/* Floating badge */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Conciergerie à Nantes — Gestion locative complète
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl mb-6">
            Confiez votre logement,{" "}
            <span className="text-amber-400">on s'occupe de tout</span>
          </h1>

          <p className="text-lg md:text-xl text-white/75 max-w-2xl mb-10 leading-relaxed">
            Gestion complète de votre location courte durée à Nantes. Réservations, ménage, check-in, optimisation des revenus — nous gérons tout pendant que vous profitez.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-md transition-all cursor-pointer whitespace-nowrap text-base"
            >
              <i className="ri-phone-line text-lg"></i>
              Demander un appel
            </button>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-md transition-all cursor-pointer whitespace-nowrap text-base"
            >
              <i className="ri-arrow-down-line text-lg"></i>
              Découvrir nos services
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/20 pt-8">
            {[
              { value: "+30%", label: "De revenus en moyenne" },
              { value: "48h", label: "Pour commencer" },
              { value: "100%", label: "Gestion déléguée" },
              { value: "Nantes", label: "Zone d'intervention" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-amber-400 mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConciergeContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
