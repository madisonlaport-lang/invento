import { useState } from "react";
import ConciergeContactModal from "./ConciergeContactModal";

export default function ConciergeCTA() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=aerial%20view%20of%20Nantes%20France%20cityscape%20at%20golden%20hour%2C%20Loire%20river%20visible%2C%20beautiful%20warm%20sunset%20light%20reflecting%20on%20buildings%2C%20modern%20and%20historic%20architecture%20blend%2C%20luxurious%20real%20estate%20perspective%2C%20cinematic%20photography%2C%20no%20people%2C%20high%20resolution&width=1920&height=700&seq=conciergerie-cta-001&orientation=landscape"
            alt="Nantes vue aérienne"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-8 text-center">
          <span className="inline-block text-amber-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Prêt à vous lancer ?
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Confiez votre logement dès aujourd&apos;hui
          </h2>
          <p className="text-white/65 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Prenez rendez-vous pour un appel gratuit de 15 minutes. On étudie ensemble votre situation et on vous dit exactement ce qu'on peut faire pour vous.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 text-white font-bold px-10 py-4 rounded-md text-base transition-all cursor-pointer whitespace-nowrap mb-6"
          >
            <i className="ri-home-heart-line text-xl"></i>
            Confier mon logement
          </button>

          <div className="flex flex-wrap items-center justify-center gap-6 text-white/50 text-sm">
            {[
              { icon: "ri-phone-line", text: "Appel gratuit 15 min" },
              { icon: "ri-map-pin-line", text: "Service à Nantes et alentours" },
              { icon: "ri-thumb-up-line", text: "Sans engagement" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={`${item.icon} text-amber-400`}></i>
                </div>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConciergeContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
