import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const NAV_LINKS = [
  { label: "Fonctionnalités", href: "#fonctionnalites" },
  { label: "Modèles", href: "#modeles" },
  { label: "Tarifs", href: "#tarifs" },
];

const NAV_PAGES = [
  { label: "Conciergerie", to: "/conciergerie" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white border-b border-gray-100 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src="https://static.readdy.ai/image/dc8955edd8627dec29abe24996c656b1/6274751dbf87680aa10fdb80e9c5ec27.jpeg"
              alt="InventoPro logo"
              className="w-12 h-12 rounded-lg object-cover"
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
          {NAV_LINKS.map((link) => (
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
          {NAV_PAGES.map((page) => (
            <Link
              key={page.to}
              to={page.to}
              className={`text-sm font-medium transition-colors cursor-pointer hover:text-amber-500 ${
                scrolled ? "text-gray-600" : "text-white/80"
              }`}
            >
              {page.label}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className={`text-xs font-medium px-4 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              scrolled ? "text-gray-700 hover:text-amber-600" : "text-white/90 hover:text-white"
            }`}
          >
            Se connecter
          </Link>
          <Link
            to="/register"
            className="text-sm font-semibold px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors cursor-pointer whitespace-nowrap"
          >
            Essai gratuit
          </Link>
        </div>

        {/* Mobile Hamburger */}
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
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-amber-500 cursor-pointer"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          {NAV_PAGES.map((page) => (
            <Link
              key={page.to}
              to={page.to}
              className="text-sm font-medium text-gray-700 hover:text-amber-500 cursor-pointer"
              onClick={() => setMobileOpen(false)}
            >
              {page.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-700 text-center py-2 cursor-pointer"
              onClick={() => setMobileOpen(false)}
            >
              Se connecter
            </Link>
            <Link
              to="/register"
              className="text-sm font-semibold px-5 py-2 bg-amber-500 text-white rounded-md text-center cursor-pointer whitespace-nowrap"
              onClick={() => setMobileOpen(false)}
            >
              Essai gratuit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
