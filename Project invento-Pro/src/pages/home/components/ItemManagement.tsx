const CONDITIONS = [
  { label: "Neuf", color: "bg-emerald-100 text-emerald-700" },
  { label: "Bon état", color: "bg-sky-100 text-sky-700" },
  { label: "Usé", color: "bg-amber-100 text-amber-700" },
  { label: "Endommagé", color: "bg-red-100 text-red-700" },
];

const SAMPLE_ITEMS = [
  { name: "Canapé 3 places", room: "Salon", condition: "Bon état", value: "450€", icon: "ri-sofa-line" },
  { name: "Table basse en chêne", room: "Salon", condition: "Neuf", value: "180€", icon: "ri-table-line" },
  { name: "Réfrigérateur Bosch", room: "Cuisine", condition: "Bon état", value: "320€", icon: "ri-fridge-line" },
  { name: "Lit double 160x200", room: "Chambre", condition: "Bon état", value: "520€", icon: "ri-hotel-bed-line" },
  { name: "Télévision 55\"", room: "Salon", condition: "Neuf", value: "650€", icon: "ri-tv-line" },
];

const FEATURES = [
  { icon: "ri-add-circle-line", title: "Ajout rapide", desc: "Nom, description, état et valeur en quelques secondes." },
  { icon: "ri-bar-chart-line", title: "Valeur estimée", desc: "Renseignez la valeur pour mieux vous protéger en cas de litige." },
  { icon: "ri-checkbox-multiple-line", title: "Checklist auto", desc: "Des objets pré-suggérés selon le type de pièce pour ne rien oublier." },
  { icon: "ri-pencil-line", title: "Notes libres", desc: "Ajoutez des observations personnalisées sur chaque élément." },
];

export default function ItemManagement() {
  return (
    <section className="py-24 bg-amber-50/40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-white text-amber-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider border border-amber-200">
            Gestion des objets
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Chaque objet, <span className="text-amber-500">parfaitement documenté</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Renseignez chaque élément avec son état, sa description et sa valeur. Simple, rapide, exhaustif.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-lg p-6 border border-gray-100">
                <div className="w-10 h-10 flex items-center justify-center bg-amber-100 rounded-lg mb-4">
                  <i className={`${f.icon} text-amber-600 text-xl`}></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}

            {/* Condition badges */}
            <div className="sm:col-span-2 bg-white rounded-lg p-6 border border-gray-100">
              <p className="font-semibold text-gray-700 text-sm mb-3">États disponibles</p>
              <div className="flex flex-wrap gap-2">
                {CONDITIONS.map((c) => (
                  <span key={c.label} className={`text-xs font-bold px-3 py-1.5 rounded-full ${c.color}`}>
                    {c.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Item list mockup */}
          <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 px-5 py-4 flex items-center justify-between">
              <span className="font-bold text-gray-900 text-sm">Inventaire — Appartement Riviera</span>
              <span className="text-xs text-gray-400">5 objets</span>
            </div>
            <div className="divide-y divide-gray-50">
              {SAMPLE_ITEMS.map((item) => (
                <div key={item.name} className="px-5 py-4 flex items-center gap-4 hover:bg-amber-50/30 transition-colors">
                  <div className="w-9 h-9 flex items-center justify-center bg-amber-100 rounded-lg flex-shrink-0">
                    <i className={`${item.icon} text-amber-600`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.room}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        item.condition === "Neuf"
                          ? "bg-emerald-100 text-emerald-700"
                          : item.condition === "Endommagé"
                          ? "bg-red-100 text-red-700"
                          : "bg-sky-100 text-sky-700"
                      }`}
                    >
                      {item.condition}
                    </span>
                    <span className="text-sm font-bold text-gray-700">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-dashed border-gray-200">
              <button className="w-full flex items-center justify-center gap-2 text-amber-600 text-sm font-semibold py-2 rounded-md hover:bg-amber-50 transition-colors cursor-pointer">
                <i className="ri-add-line"></i>
                Ajouter un objet
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
