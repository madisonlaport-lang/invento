const ROOMS = [
  { icon: "ri-door-open-line", label: "Entrée" },
  { icon: "ri-sofa-line", label: "Salon" },
  { icon: "ri-restaurant-line", label: "Cuisine" },
  { icon: "ri-hotel-bed-line", label: "Chambre" },
  { icon: "ri-drop-line", label: "Salle de bain" },
  { icon: "ri-parking-box-line", label: "Garage" },
];

const STEPS = [
  {
    number: "01",
    title: "Choisissez votre logement",
    desc: "Sélectionnez ou créez un logement parmi vos propriétés enregistrées.",
  },
  {
    number: "02",
    title: "Suivez le parcours guidé",
    desc: "L'app vous guide pièce par pièce avec une checklist intelligente adaptée à chaque espace.",
  },
  {
    number: "03",
    title: "Documentez chaque pièce",
    desc: "Ajoutez des objets, photos et notes pour chaque pièce. Rapide et intuitif.",
  },
  {
    number: "04",
    title: "Générez votre rapport",
    desc: "Un PDF professionnel est généré automatiquement, prêt à signer et à partager.",
  },
];

export default function GuidedTour() {
  return (
    <section id="fonctionnalites" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-50 text-amber-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            Parcours guidé
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Visitez chaque pièce, <span className="text-amber-500">sans rien oublier</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            L'application vous guide pièce par pièce avec une checklist automatique. Fini les oublis, fini le stress.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Room visual */}
          <div className="relative">
            <img
              src="https://readdy.ai/api/search-image?query=person%20holding%20modern%20smartphone%20in%20doorway%20of%20elegant%20apartment%20hallway%2C%20showing%20inventory%20checklist%20app%20on%20screen%2C%20warm%20interior%20lighting%2C%20wooden%20floor%2C%20white%20walls%2C%20professional%20lifestyle%20photography%2C%20shallow%20depth%20of%20field%2C%20clean%20minimal%20style%2C%20natural%20light&width=800&height=700&seq=guided-tour-001&orientation=portrait"
              alt="Parcours guidé pièce par pièce"
              className="w-full h-[480px] object-cover object-top rounded-lg"
            />
            {/* Room chips overlay */}
            <div className="absolute -bottom-6 left-4 right-4 bg-white rounded-lg p-4 border border-gray-100">
              <p className="text-xs text-gray-500 font-semibold mb-3 uppercase tracking-wider">Pièces disponibles</p>
              <div className="flex flex-wrap gap-2">
                {ROOMS.map((room) => (
                  <div
                    key={room.label}
                    className="flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className={room.icon}></i>
                    </div>
                    {room.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Steps */}
          <div className="pt-6 lg:pt-0 mt-8 lg:mt-0">
            <div className="flex flex-col gap-8">
              {STEPS.map((step) => (
                <div key={step.number} className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-amber-500 text-white font-bold text-lg rounded-lg">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-4 bg-amber-50 rounded-lg border border-amber-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center text-amber-500">
                  <i className="ri-time-line text-xl"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Mode inspection rapide</p>
                  <p className="text-gray-500 text-xs">Complétez un inventaire photo en seulement 2 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
