import { useState } from "react";
import { Link } from "react-router-dom";

const FOOTER_LINKS = {
  Produit: ["Fonctionnalités", "Modèles", "Tarifs", "Nouveautés"],
  Ressources: ["Documentation", "Centre d'aide", "Blog", "API"],
  "À propos": ["L'équipe", "Politique de confidentialité", "CGU", "Contact"],
};

const FORM_URL = "https://readdy.ai/api/form/d75mr7dr5g02gnd69jl0";

export default function Footer() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
    setSubmitting(true);
    try {
      const res = await fetch(FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data.toString(),
      });
      if (res.ok) {
        form.reset();
        setSubmitted(true);
      }
    } catch {
      // silently fail
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-amber-50 border-t border-amber-100">
      {/* Newsletter CTA */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Prêt à simplifier vos inventaires ?
          </h3>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Rejoignez plus de 5 000 utilisateurs. Essai gratuit, sans carte bancaire.
          </p>
          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold text-sm">
              <i className="ri-checkbox-circle-line text-lg"></i>
              Merci ! Vous êtes inscrit(e) à la newsletter.
            </div>
          ) : (
            <form
              data-readdy-form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Votre adresse email"
                className="w-full sm:flex-1 px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap text-sm"
              >
                {submitting ? "Envoi..." : "S'inscrire"}
              </button>
            </form>
          )}
          <p className="mt-5 text-white/40 text-sm">
            Ou{" "}
            <Link to="/register" className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer">
              créez votre compte gratuitement →
            </Link>
          </p>
        </div>
      </div>

      {/* Footer Main */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://static.readdy.ai/image/dc8955edd8627dec29abe24996c656b1/6274751dbf87680aa10fdb80e9c5ec27.jpeg"
                alt="InventoPro logo"
                className="w-9 h-9 rounded-lg object-cover"
              />
              <span className="font-bold text-xl text-gray-900">
                Invento<span className="text-amber-500">Pro</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              La solution d'inventaire professionnelle pour conciergeries, propriétaires et agents immobiliers.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/_kenwa_2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-gray-200 text-gray-500 hover:text-amber-500 hover:border-amber-300 transition-colors cursor-pointer"
              >
                <i className="ri-instagram-line"></i>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-gray-900 text-sm mb-4">{category}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-amber-600 transition-colors cursor-pointer"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-amber-200 mt-12 pt-6">
          <p className="text-sm text-gray-400">
            &copy; 2025 InventoPro. Tous droits réservés. Hébergé en Europe, conforme RGPD.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            Tous les systèmes opérationnels
          </div>
        </div>
      </div>
    </footer>
  );
}
