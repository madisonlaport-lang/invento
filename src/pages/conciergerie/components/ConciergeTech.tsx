import { Link } from "react-router-dom";

const TECH_POINTS = [
  {
    icon: "ri-camera-line",
    text: "Photos horodatées et géolocalisées à chaque inventaire",
  },
  {
    icon: "ri-file-pdf-line",
    text: "Rapport PDF professionnel juridiquement recevable",
  },
  {
    icon: "ri-shield-check-line",
    text: "Protection en cas de litige avec preuves incontestables",
  },
  {
    icon: "ri-database-2-line",
    text: "Historique complet de l'état du logement",
  },
];

export default function ConciergeTech() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: Image */}
          <div className="relative rounded-lg overflow-hidden">
            <div className="w-full h-[420px] md:h-[500px]">
              <img
                src="https://readdy.ai/api/search-image?query=modern%20digital%20inventory%20management%20interface%20shown%20on%20laptop%20and%20smartphone%20side%20by%20side%2C%20clean%20white%20desk%20workspace%2C%20professional%20property%20inspection%20app%20with%20photos%20and%20checklists%20visible%20on%20screens%2C%20soft%20neutral%20background%2C%20high-tech%20minimalist%20aesthetic%2C%20professional%20photography&width=800&height=600&seq=conciergerie-tech-001&orientation=landscape"
                alt="Outil d'inventaire InventoPro"
                className="w-full h-full object-cover object-top rounded-lg"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute bottom-5 left-5 bg-white rounded-lg px-4 py-3 border border-gray-100 flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center bg-amber-100 rounded-lg">
                <i className="ri-shield-star-fill text-amber-600 text-lg"></i>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Inventaire certifié</div>
                <div className="text-xs text-gray-500">Valide devant les assurances</div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <span className="inline-block text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">
              Une technologie unique
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
              Votre logement protégé par notre propre outil
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Nous utilisons notre propre outil d'inventaire professionnel pour protéger votre logement et éviter les litiges. Contrairement aux conciergeries classiques, chaque état des lieux est documenté avec des preuves solides, des photos horodatées et un rapport PDF complet — directement dans notre application.
            </p>

            {/* Points */}
            <ul className="flex flex-col gap-4 mb-8">
              {TECH_POINTS.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-amber-100 rounded-lg flex-shrink-0 mt-0.5">
                    <i className={`${point.icon} text-amber-600 text-sm`}></i>
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed">{point.text}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/register"
              className="inline-flex items-center gap-2 text-amber-600 font-semibold text-sm hover:text-amber-700 cursor-pointer transition-colors"
            >
              Essayer l&apos;outil gratuitement
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
