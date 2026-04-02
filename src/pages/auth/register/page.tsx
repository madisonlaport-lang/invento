import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    setLoading(true);
    const result = await register(email, password, name);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Erreur lors de l\'inscription.');
    }
  };

  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getPasswordStrength();
  const strengthLabel = ['', 'Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'][strength];
  const strengthColor = ['', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-emerald-400', 'bg-emerald-500'][strength];

  return (
    <div className="min-h-screen flex">
      {/* Left visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=stylish%20modern%20apartment%20kitchen%20interior%20bright%20white%20cabinets%20marble%20countertop%20minimalist%20design%20natural%20light%20professional%20real%20estate%20photography%20luxury%20contemporary%20home%20no%20people%20clean%20elegant%20Scandinavian%20Nordic%20style%20warm%20tones&width=900&height=1080&seq=register-bg-002&orientation=portrait"
          alt="Appartement"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 to-amber-900/40" />
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
          <div className="flex flex-col gap-4">
            {[
              { icon: 'ri-time-line', text: 'Inventaire complet en moins de 10 minutes' },
              { icon: 'ri-file-pdf-line', text: 'Rapport PDF professionnel généré automatiquement' },
              { icon: 'ri-shield-check-line', text: 'Juridiquement valable et opposable' },
              { icon: 'ri-camera-line', text: 'Photos horodatées et géolocalisées' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 bg-amber-500/30 rounded-lg flex items-center justify-center">
                  <i className={`${item.icon} text-amber-400`}></i>
                </div>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-16 bg-white overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
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

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Créez votre compte</h1>
          <p className="text-gray-500 text-sm mb-8">
            Déjà inscrit ?{' '}
            <Link to="/login" className="text-amber-600 font-semibold hover:text-amber-700 cursor-pointer">
              Se connecter
            </Link>
          </p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-6">
              <i className="ri-error-warning-line flex-shrink-0"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom complet</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
                  <i className="ri-user-line"></i>
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jean Dupont"
                  className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all bg-gray-50"
                />
              </div>
            </div>

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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
                  <i className="ri-lock-line"></i>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 caractères"
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
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">{strengthLabel}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirmer le mot de passe</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
                  <i className="ri-lock-2-line"></i>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Retapez le mot de passe"
                  className={`w-full pl-10 pr-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all bg-gray-50 ${
                    confirmPassword && confirmPassword !== password
                      ? 'border-red-300 focus:border-red-400'
                      : 'border-gray-200 focus:border-amber-500'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold py-3 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 text-sm mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Création du compte...
                </>
              ) : (
                <>
                  <i className="ri-user-add-line"></i>
                  Créer mon compte gratuit
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-xs text-gray-400 text-center">
            En créant un compte, vous acceptez nos{' '}
            <span className="text-gray-500 cursor-pointer hover:text-amber-600">CGU</span> et{' '}
            <span className="text-gray-500 cursor-pointer hover:text-amber-600">Politique de confidentialité</span>
          </p>
        </div>
      </div>
    </div>
  );
}
