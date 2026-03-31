const REASONS = [
  {
    icon: "ri-time-line",
    stat: "0h",
    label: "De gestion de votre part",
    title: "Gain de temps total",
    description: "Fini les nuits à répondre aux voyageurs, les courses de dernière minute et les appels stressants. Vous déléguez, nous gérons. Vraiment tout.",
  },
  {
    icon: "ri-money-euro-circle-line",
    stat: "+30%",
    label: "De revenus en moyenne",
    title: "Revenus optimisés",
    description: "Notre expertise du marché nantais et notre tarification dynamique vous permettent d'obtenir un revenu net significativement plus élevé qu'en gestion personnelle.",
  },
  {
    icon: "ri-shield-check-line",
    stat: "100%",
    label: "Des séjours documentés",
    title: "Protection du bien",
    description: "Chaque entrée et sortie est documentée avec notre outil d'inventaire professionnel. En cas de litige, vous avez des preuves solides et incontestables.",
  },
  {
    icon: "ri-star-line",
    stat: "4.9/5",
    label: "Note moyenne voyageurs",
    title: "Expérience voyageurs premium",
    description: "Accueil soigné, logement impeccable, communication réactive. Vos voyageurs reviennent et laissent des avis 5 étoiles qui boostent votre visibilité.",
  },
];

export default function ConciergeWhy() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Pourquoi nous choisir
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            La conciergerie qui fait la différence
          </h2>
          <p className="text-white/55 text-lg leading-relaxed">
            Nous ne nous contentons pas de gérer — nous optimisons, protégeons et faisons grandir votre bien immobilier.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REASONS.map((reason, i) => (
            <div key={i} className="group bg-white/5 border border-white/10 rounded-lg p-8 hover:bg-white/8 hover:border-amber-500/30 transition-all duration-300">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-amber-500/15 rounded-lg">
                  <i className={`${reason.icon} text-2xl text-amber-400`}></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl font-bold text-amber-400">{reason.stat}</span>
                    <span className="text-sm text-white/40">{reason.label}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{reason.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{reason.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
