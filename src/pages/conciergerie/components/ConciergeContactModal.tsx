import { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FORM_URL = "https://readdy.ai/api/form/d75p8gsbmgf2o8mm6qsg";

export default function ConciergeContactModal({ isOpen, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setTimeout(() => setSubmitted(false), 300);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

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
        setSubmitted(true);
        form.reset();
      }
    } catch {
      // silent
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg w-full max-w-md overflow-hidden">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <i className="ri-close-line text-lg"></i>
        </button>

        {submitted ? (
          /* Success state */
          <div className="p-10 text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-emerald-100 rounded-full mx-auto mb-5">
              <i className="ri-checkbox-circle-line text-3xl text-emerald-500"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Demande envoyée !</h3>
            <p className="text-gray-500 text-sm mb-6">
              Nous vous rappelons dans les <strong>24h ouvrées</strong>. Préparez vos questions, on a hâte d'échanger avec vous !
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-md text-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              Fermer
            </button>
          </div>
        ) : (
          /* Form */
          <>
            {/* Header */}
            <div className="bg-gray-950 px-7 py-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 flex items-center justify-center bg-amber-500/20 rounded-lg">
                  <i className="ri-phone-line text-amber-400 text-lg"></i>
                </div>
                <h3 className="text-lg font-bold text-white">Demander un appel</h3>
              </div>
              <p className="text-white/55 text-sm">
                Appel gratuit de 15 min — on étudie votre situation ensemble.
              </p>
            </div>

            <form
              data-readdy-form
              onSubmit={handleSubmit}
              className="px-7 py-6 flex flex-col gap-4"
            >
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Votre prénom *
                </label>
                <input
                  type="text"
                  name="prenom"
                  required
                  placeholder="Marie"
                  className="w-full px-4 py-2.5 rounded-md border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Votre numéro de téléphone *
                </label>
                <input
                  type="tel"
                  name="telephone"
                  required
                  placeholder="06 XX XX XX XX"
                  className="w-full px-4 py-2.5 rounded-md border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Email (optionnel)
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="marie@exemple.fr"
                  className="w-full px-4 py-2.5 rounded-md border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Votre logement (optionnel)
                </label>
                <textarea
                  name="message"
                  maxLength={500}
                  rows={3}
                  placeholder="Ex : T2 meublé, Île de Nantes, déjà sur Airbnb..."
                  className="w-full px-4 py-2.5 rounded-md border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-bold rounded-md text-sm transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <i className="ri-send-plane-line"></i>
                    Envoyer ma demande
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Réponse sous 24h ouvrées — sans engagement de votre part.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
