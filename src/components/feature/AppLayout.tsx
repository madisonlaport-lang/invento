import { useState, useRef, useEffect, ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface Props {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-100 z-50 h-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-8 h-8 flex items-center justify-center">
              <img
                src="https://static.readdy.ai/image/dc8955edd8627dec29abe24996c656b1/6274751dbf87680aa10fdb80e9c5ec27.jpeg"
                alt="logo"
                className="w-8 h-8 rounded-lg object-cover"
              />
            </div>
            <span className="font-bold text-lg text-gray-900">
              Invento<span className="text-amber-500">Pro</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-sm text-gray-600 hover:text-amber-600 font-medium transition-colors"
            >
              Mes logements
            </Link>
            <Link
              to="/inventory/new"
              className="text-sm text-gray-600 hover:text-amber-600 font-medium transition-colors"
            >
              Nouvel inventaire
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/inventory/new"
              className="hidden md:inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line"></i>
              Nouveau
            </Link>

            <div ref={menuRef} className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="w-9 h-9 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {initials}
                </div>
                <div className="hidden md:flex items-center gap-1">
                  <span className="text-sm text-gray-700 font-medium max-w-28 truncate">{user?.name}</span>
                  <i className="ri-arrow-down-s-line text-gray-400 text-sm"></i>
                </div>
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-100 rounded-lg py-1 z-50"
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-xs text-gray-400 mb-0.5">Connecté en tant que</p>
                    <p className="text-sm font-medium text-gray-800 truncate">{user?.email}</p>
                    <span className="inline-block mt-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full capitalize">
                      Plan {user?.plan}
                    </span>
                  </div>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setMenuOpen(false)}
                  >
                    <i className="ri-home-3-line text-gray-400"></i>
                    Mes logements
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
                  >
                    <i className="ri-logout-box-line"></i>
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16 min-h-screen">{children}</main>
    </div>
  );
}
