import { Users, FileText, TrendingUp, DollarSign, Plus, ArrowRight } from 'lucide-react';

const STAGE_LABELS = { lead: 'Lead', proposal: 'Oferta', negotiation: 'Negocjacje', won: 'Wygrany', lost: 'Przegrany' };
const STATUS_COLORS = { draft: 'bg-gray-100 text-gray-600', sent: 'bg-blue-100 text-blue-700', accepted: 'bg-green-100 text-green-700', rejected: 'bg-red-100 text-red-600' };
const STATUS_LABELS = { draft: 'Szkic', sent: 'Wysłana', accepted: 'Zaakceptowana', rejected: 'Odrzucona' };

export default function Dashboard({ contacts, offers, deals, onNavigate }) {
  const totalRevenue = deals.filter(d => d.stage === 'won').reduce((s, d) => s + (d.value || 0), 0);
  const pipeline = deals.filter(d => !['won', 'lost'].includes(d.stage)).reduce((s, d) => s + (d.value || 0) * (d.probability || 0) / 100, 0);
  const sentOffers = offers.filter(o => o.status === 'sent').length;
  const acceptedOffers = offers.filter(o => o.status === 'accepted').length;

  const recentContacts = [...contacts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);
  const recentOffers = [...offers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);

  const getContact = (id) => contacts.find(c => c.id === id);

  const formatCurrency = (n) => new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 }).format(n);

  const stats = [
    { label: 'Klienci', value: contacts.length, icon: Users, color: 'bg-blue-500', light: 'bg-blue-50 text-blue-600' },
    { label: 'Oferty wysłane', value: sentOffers, icon: FileText, color: 'bg-violet-500', light: 'bg-violet-50 text-violet-600' },
    { label: 'Pipeline', value: formatCurrency(pipeline), icon: TrendingUp, color: 'bg-amber-500', light: 'bg-amber-50 text-amber-600' },
    { label: 'Zamknięte', value: formatCurrency(totalRevenue), icon: DollarSign, color: 'bg-emerald-500', light: 'bg-emerald-50 text-emerald-600' },
  ];

  return (
    <div className="px-4 py-4 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Panel CRM</h1>
          <p className="text-sm text-slate-500">Witaj! Masz {contacts.length} klientów.</p>
        </div>
        <button
          onClick={() => onNavigate('contacts', 'new')}
          className="flex items-center gap-1 bg-blue-600 text-white text-sm font-medium px-3 py-2 rounded-xl shadow-sm active:scale-95 transition-transform"
        >
          <Plus size={16} /> Klient
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ label, value, icon: Icon, color, light }) => (
          <div key={label} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl ${light} flex items-center justify-center mb-3`}>
              <Icon size={18} />
            </div>
            <div className="text-lg font-bold text-slate-800 leading-tight">{value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Pipeline stages */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-slate-700">Pipeline sprzedaży</h2>
          <button onClick={() => onNavigate('pipeline')} className="text-blue-600 text-xs flex items-center gap-1">
            Wszystkie <ArrowRight size={12} />
          </button>
        </div>
        <div className="space-y-2">
          {['lead', 'proposal', 'negotiation'].map(stage => {
            const stageDeals = deals.filter(d => d.stage === stage);
            const stageValue = stageDeals.reduce((s, d) => s + (d.value || 0), 0);
            return (
              <div key={stage} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${stage === 'lead' ? 'bg-slate-400' : stage === 'proposal' ? 'bg-blue-400' : 'bg-amber-400'}`} />
                  <span className="text-sm text-slate-700">{STAGE_LABELS[stage]}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-slate-700">{formatCurrency(stageValue)}</span>
                  <span className="text-xs text-slate-400 ml-1">({stageDeals.length})</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent contacts */}
      {recentContacts.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-slate-700">Ostatni klienci</h2>
            <button onClick={() => onNavigate('contacts')} className="text-blue-600 text-xs flex items-center gap-1">
              Wszyscy <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {recentContacts.map(c => (
              <button
                key={c.id}
                onClick={() => onNavigate('contacts', c.id)}
                className="flex items-center gap-3 w-full text-left active:scale-98 transition-transform"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {c.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-800 truncate">{c.name}</div>
                  <div className="text-xs text-slate-500 truncate">{c.company || c.email}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recent offers */}
      {recentOffers.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-slate-700">Ostatnie oferty</h2>
            <button onClick={() => onNavigate('offers')} className="text-blue-600 text-xs flex items-center gap-1">
              Wszystkie <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {recentOffers.map(o => {
              const contact = getContact(o.contactId);
              return (
                <button
                  key={o.id}
                  onClick={() => onNavigate('offers', o.id)}
                  className="flex items-center gap-3 w-full text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-800 truncate">{o.title}</div>
                    <div className="text-xs text-slate-500 truncate">{contact?.name || '—'}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-semibold text-slate-800">{formatCurrency(o.value || 0)}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[o.status] || STATUS_COLORS.draft}`}>
                      {STATUS_LABELS[o.status] || o.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {contacts.length === 0 && (
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          <div className="text-4xl mb-3">🚀</div>
          <h3 className="font-semibold text-slate-700 mb-1">Zacznij od dodania klienta</h3>
          <p className="text-sm text-slate-500 mb-4">Dodaj pierwszego klienta i stwórz spersonalizowaną ofertę.</p>
          <button
            onClick={() => onNavigate('contacts', 'new')}
            className="bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl active:scale-95 transition-transform"
          >
            Dodaj klienta
          </button>
        </div>
      )}
    </div>
  );
}
