import { useParams, Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useInventory } from '@/contexts/InventoryContext';
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/components/feature/AppLayout';
import { CONDITION_LABELS, CONDITION_COLORS, PROPERTY_TYPE_LABELS } from '@/types';
import { formatDate } from '@/utils/imageUtils';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ReportPage() {
  const { id } = useParams<{ id: string }>();
  const { getProperty } = useInventory();
  const { user } = useAuth();
  const reportRef = useRef<HTMLDivElement>(null);

  const [generating, setGenerating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const property = getProperty(id!);

  const handleGeneratePDF = async () => {
    if (!reportRef.current || !property) return;
    setGenerating(true);
    setError('');
    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const filename = `inventaire-${property.name.toLowerCase().replace(/\s+/g, '-')}-${new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')}.pdf`;
      pdf.save(filename);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error('Erreur génération PDF:', err);
      setError('Erreur lors de la génération du PDF. Veuillez réessayer.');
    } finally {
      setGenerating(false);
    }
  };

  const handlePrint = () => window.print();

  if (!property) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-file-warning-line text-red-400 text-2xl"></i>
          </div>
          <p className="text-gray-700 font-semibold mb-1">Logement introuvable</p>
          <p className="text-gray-400 text-sm mb-6">Cet inventaire n'existe pas ou a été supprimé.</p>
          <Link to="/dashboard" className="text-amber-600 font-semibold cursor-pointer hover:text-amber-700">
            ← Retour au tableau de bord
          </Link>
        </div>
      </AppLayout>
    );
  }

  const totalItems = property.rooms.reduce((s, r) => s + r.items.length, 0);
  const totalPhotos = property.rooms.reduce((s, r) => s + r.photos.length + r.items.reduce((ss, i) => ss + i.photos.length, 0), 0);
  const now = new Date().toISOString();

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-page { box-shadow: none !important; border: none !important; }
          body { background: white !important; }
        }
      `}</style>

      {/* Toolbar */}
      <div className="no-print">
        <AppLayout>
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Link
                  to={`/inventory/${id}`}
                  className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
                >
                  <i className="ri-arrow-left-line"></i>
                </Link>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Rapport d&apos;inventaire</h1>
                  <p className="text-xs text-gray-500">{property.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 text-sm font-medium px-4 py-2.5 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
                >
                  <i className="ri-printer-line"></i>
                  Imprimer
                </button>
                <button
                  onClick={handleGeneratePDF}
                  disabled={generating}
                  className={`inline-flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-lg cursor-pointer transition-colors whitespace-nowrap ${
                    success
                      ? 'bg-emerald-500 hover:bg-emerald-600'
                      : 'bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400'
                  }`}
                >
                  {generating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Génération...
                    </>
                  ) : success ? (
                    <>
                      <i className="ri-check-line"></i>
                      PDF téléchargé !
                    </>
                  ) : (
                    <>
                      <i className="ri-file-pdf-line"></i>
                      Télécharger PDF
                    </>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                <i className="ri-error-warning-line"></i>
                {error}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-lg mb-4">
                <i className="ri-checkbox-circle-line"></i>
                <strong>PDF généré avec succès !</strong>&nbsp;Le fichier a été téléchargé automatiquement.
              </div>
            )}
          </div>
        </AppLayout>
      </div>

      {/* Report content (captured by html2canvas) */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div ref={reportRef} className="print-page bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gray-900 text-white px-8 py-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img
                      src="https://static.readdy.ai/image/dc8955edd8627dec29abe24996c656b1/6274751dbf87680aa10fdb80e9c5ec27.jpeg"
                      alt="logo"
                      className="w-8 h-8 rounded-md object-cover"
                    />
                  </div>
                  <span className="font-bold text-lg">
                    Invento<span className="text-amber-400">Pro</span>
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-1">Rapport d&apos;inventaire</h2>
                <p className="text-white/70 text-sm">{PROPERTY_TYPE_LABELS[property.type]}</p>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-xs mb-1">Généré le</p>
                <p className="font-semibold text-sm">{formatDate(now)}</p>
                <p className="text-white/60 text-xs mt-3 mb-1">Référence</p>
                <p className="font-mono text-xs text-amber-400">{property.id.split('-')[0].toUpperCase()}</p>
              </div>
            </div>
          </div>

          {/* Property info */}
          <div className="px-8 py-6 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Logement</p>
                <p className="font-semibold text-gray-900">{property.name}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Adresse</p>
                <p className="text-gray-700 text-sm">{property.address || 'Non renseignée'}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Propriétaire</p>
                <p className="text-gray-700 text-sm">{user?.name}</p>
                <p className="text-gray-500 text-xs">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="px-8 py-5 border-b border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: 'Pièces', value: property.rooms.length },
                { label: 'Objets', value: totalItems },
                { label: 'Photos', value: totalPhotos },
              ].map((s) => (
                <div key={s.label} className="bg-amber-50 rounded-lg py-3">
                  <p className="text-2xl font-bold text-amber-600">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rooms */}
          <div className="px-8 py-6">
            <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <i className="ri-layout-3-line text-amber-500"></i>
              Inventaire détaillé
            </h3>
            <div className="flex flex-col gap-6">
              {property.rooms.map((room) => (
                <div key={room.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="flex items-center gap-2.5 px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <div className="w-7 h-7 flex items-center justify-center">
                      <i className={`${room.icon} text-amber-500`}></i>
                    </div>
                    <span className="font-bold text-gray-900">{room.name}</span>
                    <span className="ml-auto text-xs text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full">
                      {room.items.length} objet{room.items.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {room.photos.length > 0 && (
                    <div className="flex gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50/50 overflow-x-auto">
                      {room.photos.map((ph) => (
                        <div key={ph.id} className="flex-shrink-0">
                          <img src={ph.url} alt="photo pièce" className="w-24 h-24 object-cover rounded-lg" />
                          <p className="text-xs text-gray-400 mt-1 text-center">{formatDate(ph.takenAt).split(' à')[0]}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {room.items.length === 0 ? (
                    <p className="text-xs text-gray-400 italic px-4 py-3">Aucun objet inventorié dans cette pièce.</p>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-2.5">Objet</th>
                          <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-2.5">État</th>
                          <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-2.5 hidden md:table-cell">Description</th>
                          <th className="text-right text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-2.5">Valeur</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {room.items.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                {item.photos.length > 0 && (
                                  <img src={item.photos[0].url} alt={item.name} className="w-10 h-10 object-cover rounded-md flex-shrink-0" />
                                )}
                                <span className="text-sm font-medium text-gray-900">{item.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CONDITION_COLORS[item.condition]}`}>
                                {CONDITION_LABELS[item.condition]}
                              </span>
                            </td>
                            <td className="px-4 py-3 hidden md:table-cell">
                              <span className="text-xs text-gray-500">{item.description || '—'}</span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <span className="text-sm font-medium text-gray-700">
                                {item.estimatedValue ? `${item.estimatedValue}€` : '—'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}

              {property.rooms.length === 0 && (
                <p className="text-sm text-gray-400 italic text-center py-8">Aucune pièce dans cet inventaire.</p>
              )}
            </div>
          </div>

          {/* Signatures */}
          <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
            <h3 className="font-bold text-gray-900 mb-4">Signatures</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['Propriétaire / Mandataire', 'Locataire / Preneur'].map((label) => (
                <div key={label} className="bg-white border border-gray-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-1">{label}</p>
                  <p className="text-xs text-gray-400 mb-4">Nom, date et signature</p>
                  <div className="h-20 border-b-2 border-dashed border-gray-300" />
                  <p className="text-xs text-gray-400 mt-2">Lu et approuvé — {formatDate(now).split(' à')[0]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-900 text-center">
            <p className="text-xs text-white/50">
              Document généré par InventoPro · {formatDate(now)} · Ce document constitue un inventaire contradictoire.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
