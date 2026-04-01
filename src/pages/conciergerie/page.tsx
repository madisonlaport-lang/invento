import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ConciergeHero from "./components/ConciergeHero";
import ConciergeServices from "./components/ConciergeServices";
import ConciergeWhy from "./components/ConciergeWhy";
import ConciergeTestimonials from "./components/ConciergeTestimonials";
import ConciergeTech from "./components/ConciergeTech";
import ConciergeCTA from "./components/ConciergeCTA";
import ConciergeContactModal from "./components/ConciergeContactModal";

export default function ConciergeriePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white border-b border-gray-100 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 flex items-center justify-center">
              <img
                src="https://static.readdy.ai/image/dc8955edd8627dec29abe24996c656b1/6274751dbf87680aa10fdb80e9c5ec27.jpeg"
                alt="InventoPro logo"
                className="w-9 h-9 rounded-lg object-cover"
              />
            </div>
            <span
              className={`font-bold text-xl tracking-tight transition-colors ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
            >
              Invento<span className="text-amber-500">Pro</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Services", href: "#services" },
              { label: "Pourquoi nous", href: "#pourquoi" },
              { label: "Témoignages", href: "#temoignages" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors cursor-pointer hover:text-amber-500 ${
                  scrolled ? "text-gray-600" : "text-white/80"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/"
              className={`text-sm font-medium px-4 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                scrolled ? "text-gray-700 hover:text-amber-600" : "text-white/90 hover:text-white"
              }`}
            >
              ← Retour à l&apos;app
            </Link>
            <button
              onClick={() => setContactOpen(true)}
              className="text-sm font-semibold px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              Nous contacter
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden w-8 h-8 flex items-center justify-center cursor-pointer transition-colors ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <i className={`text-xl ${mobileOpen ? "ri-close-line" : "ri-menu-line"}`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
            {[
              { label: "Services", href: "#services" },
              { label: "Pourquoi nous", href: "#pourquoi" },
              { label: "Témoignages", href: "#temoignages" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-amber-500 cursor-pointer"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => { setContactOpen(true); setMobileOpen(false); }}
                className="text-sm font-semibold px-5 py-2 bg-amber-500 text-white rounded-md text-center cursor-pointer whitespace-nowrap"
              >
                Nous contacter
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Page sections */}
      <ConciergeHero />

      <div id="services">
        <ConciergeServices />
      </div>

      <div id="pourquoi">
        <ConciergeWhy />
      </div>

      <div id="temoignages">
        <ConciergeTestimonials />
      </div>

      <ConciergeTech />

      <ConciergeCTA />

      {/* Footer */}
      <footer className="bg-amber-50 border-t border-amber-100 py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="https://static.readdy.ai/image/dc8955edd8627dec29abe24996c656b1/6274751dbf87680aa10fdb80e9c5ec27.jpeg"
              alt="InventoPro"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="font-bold text-gray-900">
              Invento<span className="text-amber-500">Pro</span>{" "}
              <span className="text-gray-400 font-normal">Conciergerie</span>
            </span>
          </div>
          <p className="text-sm text-gray-400">
            &copy; 2025 InventoPro — Conciergerie à Nantes. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            Service disponible à Nantes
          </div>
        </div>
      </footer>

      {/* Global contact modal */}
      <ConciergeContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
