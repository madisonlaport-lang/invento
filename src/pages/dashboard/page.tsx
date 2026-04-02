import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useInventory } from '@/contexts/InventoryContext';
import AppLayout from '@/components/feature/AppLayout';
import PropertyCard from './components/PropertyCard';

export default function DashboardPage() {
  const { user } = useAuth();
  const { properties, deleteProperty, isLoading } = useInventory();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = properties.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = properties.reduce((sum, p) => sum + p.rooms.reduce((s, r) => s + r.items.length, 0), 0);
  const completed = properties.filter((p) => p.status === 'completed').length;

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      deleteProperty(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const firstName = user?.name?.split(' ')[0] || 'là';

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Bonjour, {firstName} 👋
            </h1>
            <p className="text-gray-500 text-sm">
              Gérez vos inventaires et générez vos rapports PDF en quelques clics.
            </p>
          </div>
          <Link
            to="/inventory/new"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap self-start md:self-auto"
          >
            <i className="ri-add-line text-base"></i>
            Nouveau logement
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Logements', value: properties.length, icon: 'ri-home-3-line', color: 'text-amber-500 bg-amber-50' },
            { label: 'Inventaires terminés', value: completed, icon: 'ri-checkbox-circle-line', color: 'text-emerald-500 bg-emerald-50' },
            { label: 'Objets inventoriés', value: totalItems, icon: 'ri-archive-line', color: 'text-sky-500 bg-sky-50' },
            { label: 'Plan actuel', value: user?.plan === 'starter' ? 'Starter' : user?.plan === 'pro' ? 'Pro' : 'Agence', icon: 'ri-vip-crown-line', color: 'text-violet-500 bg-violet-50' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-100 rounded-xl p-4">
              <div className={`w-9 h-9 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                <i className={`${stat.icon} text-base`}></i>
              </div>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search + List */}
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="font-bold text-gray-900 text-lg">Mes logements</h2>
            {properties.length > 0 && (
              <div className="relative max-w-xs w-full">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-gray-400">
                  <i className="ri-search-line text-sm"></i>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-gray-50"
                />
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                <i className="ri-home-3-line text-4xl text-amber-400"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Aucun logement</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-xs">
                Créez votre premier inventaire en quelques minutes. Photos, objets, rapport PDF — tout est inclus.
              </p>
              <Link
                to="/inventory/new"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-add-line"></i>
                Créer mon premier inventaire
              </Link>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-sm">Aucun résultat pour &quot;{searchQuery}&quot;</p>
            </div>
          ) : (
            <>
              {deleteConfirm && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
                  <i className="ri-error-warning-line flex-shrink-0"></i>
                  <span>Cliquez à nouveau sur la corbeille pour confirmer la suppression.</span>
                  <button onClick={() => setDeleteConfirm(null)} className="ml-auto cursor-pointer">
                    <i className="ri-close-line"></i>
                  </button>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((property) => (
                  <PropertyCard key={property.id} property={property} onDelete={handleDelete} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Plan upgrade */}
        {user?.plan === 'starter' && properties.length >= 1 && (
          <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="ri-vip-crown-line text-white"></i>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Passez au plan Pro</p>
                <p className="text-xs text-gray-600 mt-0.5">Inventaires illimités, signature électronique, PDF professionnel — à partir de 29€/mois.</p>
              </div>
            </div>
            <Link
              to="/#tarifs"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap self-start md:self-auto"
            >
              Voir les offres
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
