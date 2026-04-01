import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Erreur de connexion.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=modern%20minimalist%20apartment%20interior%20with%20clean%20white%20walls%20warm%20wooden%20floors%20large%20windows%20with%20natural%20sunlight%20streaming%20in%20Scandinavian%20style%20luxury%20real%20estate%20photography%20professional%20high%20quality%20no%20people%20cozy%20elegant%20living%20room%20with%20neutral%20tones%20beige%20linen%20furniture%20indoor%20plants%20architectural&width=900&height=1080&seq=login-bg-001&orientation=portrait"
          alt="Appartement"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 to-gray-900/50" />
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center">
              <img
                src="https://static.readdy.ai/image/dc8955edd8627dec29abe24996c656b1/6274751dbf87680aa10fdb80e9c5ec27.jpeg"
                alt="logo"
                className="w-9 h-9 rounded-lg object-cover"
              />
            </div>
            <span className="font-bold text-xl text-white">
              Invento<span className="text-amber-400">Pro</span>
            </span>
          </Link>
          <div>
            <blockquote className="text-white/90 text-xl font-light leading-relaxed mb-6">
              "En moins de 10 minutes, mon état des lieux est complet, signé, et envoyé au locataire."
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                SC
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Sophie C.</p>
                <p className="text-white/60 text-xs">Gérante de 12 logements Airbnb</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-16 bg-white">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-10">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="https://static.readdy.ai/image/dc8955edd8627dec29abe24996c656b1/6274751dbf87680aa10fdb80e9c5ec27.jpeg"
                alt="logo"
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="font-bold text-lg text-gray-900">Invento<span className="text-amber-500">Pro</span></span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bon retour !</h1>
          <p className="text-gray-500 text-sm mb-8">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-amber-600 font-semibold hover:text-amber-700 cursor-pointer">
              S'inscrire gratuitement
            </Link>
          </p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-6">
              <i className="ri-error-warning-line flex-shrink-0"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Adresse email</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
                  <i className="ri-mail-line"></i>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all bg-gray-50"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                <Link to="/forgot-password" className="text-xs text-amber-600 hover:text-amber-700 cursor-pointer">
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
                  <i className="ri-lock-line"></i>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400 cursor-pointer"
                >
                  <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold py-3 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connexion...
                </>
              ) : (
                <>
                  <i className="ri-login-box-line"></i>
                  Se connecter
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              En vous connectant, vous acceptez nos{' '}
              <span className="text-gray-500 cursor-pointer hover:text-amber-600">CGU</span> et{' '}
              <span className="text-gray-500 cursor-pointer hover:text-amber-600">Politique de confidentialité</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
