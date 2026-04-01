const PDF_FEATURES = [
  "En-tête avec logo et coordonnées",
  "Inventaire détaillé par pièce",
  "Photos intégrées avec horodatage",
  "Valeur totale de l'inventaire",
  "Date, heure et lieu précis",
  "Signature électronique des parties",
  "Conformité légale (état des lieux)",
  "Format professionnel personnalisable",
];

export default function PDFReport() {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            Génération de rapport PDF
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Un rapport <span className="text-amber-400">professionnel</span> en un clic
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Générez instantanément un document PDF juridiquement valable, prêt à être signé et transmis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: PDF Preview */}
          <div className="relative">
            <img
              src="https://readdy.ai/api/search-image?query=professional%20real%20estate%20inventory%20report%20document%20printed%20on%20white%20paper%2C%20property%20photos%20embedded%20in%20document%2C%20formal%20business%20document%20layout%2C%20signature%20section%20at%20bottom%2C%20clean%20typographic%20design%2C%20on%20dark%20wooden%20desk%2C%20pen%20beside%20document%2C%20professional%20photography%2C%20top%20view%20flat%20lay%2C%20natural%20light&width=800&height=700&seq=pdf-report-001&orientation=portrait"
              alt="Rapport PDF professionnel"
              className="w-full h-[480px] object-cover object-top rounded-lg"
            />

            {/* Floating badge */}
            <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-2 rounded-lg">
              <i className="ri-file-pdf-line mr-1"></i>PDF généré
            </div>

            {/* Signature badge */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg px-4 py-3 border border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center bg-emerald-100 rounded-lg">
                  <i className="ri-pen-nib-line text-emerald-600"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Signé électroniquement</p>
                  <p className="text-xs text-gray-400">Propriétaire + Locataire</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Features */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">
              Tout ce qu'un rapport professionnel doit contenir
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {PDF_FEATURES.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3">
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <i className="ri-check-line text-amber-400 text-base"></i>
                  </div>
                  <span className="text-white/80 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 p-5 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-amber-300 font-bold mb-1">Signature électronique incluse</p>
              <p className="text-white/50 text-sm">
                Propriétaire et locataire peuvent signer directement depuis leur smartphone ou ordinateur.
              </p>
            </div>

            <a
              href="#tarifs"
              className="mt-6 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-7 py-3 rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-file-pdf-line"></i>
              Générer mon premier rapport
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
