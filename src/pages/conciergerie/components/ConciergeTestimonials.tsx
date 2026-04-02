const TESTIMONIALS = [
  {
    name: "Sophie Marchand",
    role: "Propriétaire — T3 Île de Nantes",
    avatar: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20smiling%2035%20year%20old%20French%20woman%20with%20short%20dark%20hair%2C%20warm%20confident%20expression%2C%20clean%20neutral%20background%2C%20natural%20lighting%2C%20high%20resolution%20portrait%20photography&width=80&height=80&seq=testimonial-sophie-001&orientation=squarish",
    quote: "En 3 mois, mes revenus ont augmenté de 34% par rapport à ce que je faisais seule. Et surtout, je n'ai plus rien à gérer. C'est libérateur.",
    highlight: "+34% de revenus",
    stars: 5,
  },
  {
    name: "Laurent Briand",
    role: "Propriétaire — Studio Centre-ville",
    avatar: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20smiling%2045%20year%20old%20French%20man%20with%20salt%20and%20pepper%20hair%2C%20trustworthy%20expression%2C%20neutral%20background%2C%20soft%20lighting%2C%20high%20resolution%20corporate%20portrait&width=80&height=80&seq=testimonial-laurent-001&orientation=squarish",
    quote: "Ce qui m'a convaincu, c'est l'inventaire. Mon dernier locataire avait causé des dégâts, et grâce aux photos horodatées, j'ai été remboursé intégralement. Sans ça, j'aurais tout payé.",
    highlight: "Litige résolu grâce à l'inventaire",
    stars: 5,
  },
  {
    name: "Camille Lefèvre",
    role: "Propriétaire — Appartement T4 Rezé",
    avatar: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20cheerful%2030%20year%20old%20French%20woman%20with%20curly%20brown%20hair%2C%20genuine%20smile%2C%20bright%20clean%20background%2C%20natural%20daylight%20portrait%20photography%2C%20high%20resolution&width=80&height=80&seq=testimonial-camille-001&orientation=squarish",
    quote: "Le taux d'occupation est passé de 62% à 91% en deux mois. L'équipe est réactive, professionnelle et mes voyageurs adorent leur accueil. Je recommande à tous les propriétaires nantais.",
    highlight: "91% de taux d'occupation",
    stars: 5,
  },
];

export default function ConciergeTestimonials() {
  return (
    <section className="py-24 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Ce que disent nos propriétaires
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Des propriétaires nantais qui nous ont fait confiance et ne le regrettent pas.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white rounded-lg p-7 border border-amber-100 flex flex-col gap-5">
              {/* Stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <i key={j} className="ri-star-fill text-amber-400 text-sm"></i>
                ))}
              </div>

              {/* Highlight badge */}
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full w-fit">
                <i className="ri-arrow-up-line text-xs"></i>
                {t.highlight}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 text-sm leading-relaxed italic flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
