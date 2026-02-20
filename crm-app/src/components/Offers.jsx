import { useState } from 'react';
import { Plus, ChevronRight, Search, Trash2, Edit2, FileText, Share2 } from 'lucide-react';
import OfferForm from './OfferForm';

const STATUS_COLORS = {
  draft: 'bg-slate-100 text-slate-600',
  sent: 'bg-blue-100 text-blue-700',
  accepted: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-600',
};
const STATUS_LABELS = { draft: 'Szkic', sent: 'Wysłana', accepted: 'Zaakceptowana', rejected: 'Odrzucona' };

export default function Offers({ offers, contacts, onAdd, onUpdate, onDelete, initialDetail }) {
  const [search, setSearch] = useState('');
  const [view, setView] = useState(initialDetail ? (initialDetail === 'new' ? 'new' : 'detail') : 'list');
  const [selectedId, setSelectedId] = useState(initialDetail !== 'new' ? initialDetail : null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const selected = offers.find(o => o.id === selectedId);
  const getContact = (id) => contacts.find(c => c.id === id);

  const formatCurrency = (n) => new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 2 }).format(n || 0);
  const formatDate = (iso) => iso ? new Date(iso).toLocaleDateString('pl-PL') : '—';

  const filtered = offers.filter(o => {
    const contact = getContact(o.contactId);
    const matchSearch = [o.title, contact?.name, contact?.company].some(f => f?.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleAdd = (data) => { onAdd(data); setView('list'); };
  const handleUpdate = (data) => { onUpdate(selectedId, data); setView('list'); };
  const handleDelete = () => { onDelete(selectedId); setView('list'); setConfirmDelete(false); };

  const shareOffer = (o) => {
    const contact = getContact(o.contactId);
    const items = (o.items || []).map(i => `• ${i.name}: ${i.qty}x ${i.price} ${o.currency}`).join('\n');
    const text = `OFERTA: ${o.title}\nDla: ${contact?.name || '—'}\n\n${o.personalNote ? o.personalNote + '\n\n' : ''}${o.description || ''}\n\nPozycje:\n${items}\n\nSUMA: ${formatCurrency(o.value)}\nWażna do: ${formatDate(o.validUntil)}`;
    if (navigator.share) {
      navigator.share({ title: o.title, text });
    } else {
      navigator.clipboard?.writeText(text);
      alert('Oferta skopiowana do schowka!');
    }
  };

  if (view === 'new') return (
    <div>
      <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => setView('list')} className="text-blue-600 text-sm font-medium">‹ Cofnij</button>
        <h2 className="font-semibold text-slate-800">Nowa oferta</h2>
      </div>
      <OfferForm contacts={contacts} onSave={handleAdd} onCancel={() => setView('list')} />
    </div>
  );

  if (view === 'edit' && selected) return (
    <div>
      <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => setView('detail')} className="text-blue-600 text-sm font-medium">‹ Cofnij</button>
        <h2 className="font-semibold text-slate-800">Edytuj ofertę</h2>
      </div>
      <OfferForm offer={selected} contacts={contacts} onSave={handleUpdate} onCancel={() => setView('detail')} />
    </div>
  );

  if (view === 'detail' && selected) {
    const contact = getContact(selected.contactId);
    return (
      <div>
        <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setView('list')} className="text-blue-600 text-sm font-medium">‹ Oferty</button>
          <div className="flex gap-1">
            <button onClick={() => shareOffer(selected)} className="p-2 text-slate-500"><Share2 size={17} /></button>
            <button onClick={() => setView('edit')} className="p-2 text-slate-500"><Edit2 size={17} /></button>
            <button onClick={() => setConfirmDelete(true)} className="p-2 text-red-400"><Trash2 size={17} /></button>
          </div>
        </div>

        {confirmDelete && (
          <div className="m-4 bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
            <p className="text-sm text-red-700 mb-3">Usunąć ofertę <strong>{selected.title}</strong>?</p>
            <div className="flex gap-2 justify-center">
              <button onClick={() => setConfirmDelete(false)} className="px-4 py-2 text-sm border border-slate-200 rounded-xl text-slate-600">Anuluj</button>
              <button onClick={handleDelete} className="px-4 py-2 text-sm bg-red-500 text-white rounded-xl font-medium">Usuń</button>
            </div>
          </div>
        )}

        <div className="px-4 py-4 space-y-4">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h2 className="text-xl font-bold text-slate-800 leading-tight">{selected.title}</h2>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${STATUS_COLORS[selected.status]}`}>
                {STATUS_LABELS[selected.status]}
              </span>
            </div>
            {contact && (
              <p className="text-sm text-slate-500">Dla: <strong className="text-blue-600">{contact.name}</strong> {contact.company ? `· ${contact.company}` : ''}</p>
            )}
          </div>

          {selected.personalNote && (
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
              <p className="text-xs font-medium text-blue-600 mb-1">Wiadomość personalna</p>
              <p className="text-sm text-slate-700 italic leading-relaxed">{selected.personalNote}</p>
            </div>
          )}

          {selected.description && (
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Opis</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{selected.description}</p>
            </div>
          )}

          {(selected.items || []).length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-50">
                <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wide">Pozycje oferty</h3>
              </div>
              {selected.items.map((item, i) => (
                <div key={i} className="px-4 py-3 flex justify-between items-center border-b border-slate-50 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-slate-800">{item.name || '—'}</div>
                    <div className="text-xs text-slate-400">{item.qty} szt.</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-slate-800">{formatCurrency(item.qty * item.price)}</div>
                    <div className="text-xs text-slate-400">{formatCurrency(item.price)} / szt.</div>
                  </div>
                </div>
              ))}
              <div className="px-4 py-3 bg-slate-800 flex justify-between items-center">
                <span className="text-sm font-bold text-white">SUMA</span>
                <span className="text-lg font-bold text-white">{formatCurrency(selected.value)}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl shadow-sm p-3 text-center">
              <div className="text-xs text-slate-400 mb-1">Utworzona</div>
              <div className="text-sm font-medium text-slate-700">{formatDate(selected.createdAt)}</div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-3 text-center">
              <div className="text-xs text-slate-400 mb-1">Ważna do</div>
              <div className="text-sm font-medium text-slate-700">{formatDate(selected.validUntil)}</div>
            </div>
          </div>

          <button
            onClick={() => shareOffer(selected)}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Share2 size={16} /> Wyślij ofertę do klienta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white border-b border-slate-100 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-800 text-lg">Oferty</h2>
          <button onClick={() => setView('new')} className="flex items-center gap-1 bg-blue-600 text-white text-sm font-medium px-3 py-2 rounded-xl active:scale-95 transition-transform">
            <Plus size={16} /> Nowa
          </button>
        </div>
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full bg-slate-100 rounded-xl pl-9 pr-3 py-2.5 text-sm outline-none"
            placeholder="Szukaj ofert..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {['all', 'draft', 'sent', 'accepted', 'rejected'].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${filterStatus === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}
            >
              {s === 'all' ? 'Wszystkie' : STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-3">
        <p className="text-xs text-slate-400 mb-3">{filtered.length} ofert</p>
        {filtered.length === 0 ? (
          <div className="text-center py-10">
            <FileText size={40} className="mx-auto text-slate-200 mb-2" />
            <p className="text-slate-500 text-sm">{search ? 'Brak wyników' : 'Brak ofert'}</p>
            <button onClick={() => setView('new')} className="mt-3 text-blue-600 text-sm font-medium">+ Utwórz pierwszą ofertę</button>
          </div>
        ) : (
          <div className="space-y-2">
            {[...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(o => {
              const contact = getContact(o.contactId);
              return (
                <button
                  key={o.id}
                  onClick={() => { setSelectedId(o.id); setView('detail'); }}
                  className="w-full bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center gap-3 text-left active:scale-98 transition-transform"
                >
                  <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center shrink-0">
                    <FileText size={18} className="text-violet-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-800 truncate">{o.title}</div>
                    <div className="text-xs text-slate-500 truncate">{contact?.name || '—'}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[o.status]}`}>
                        {STATUS_LABELS[o.status]}
                      </span>
                      <span className="text-xs font-semibold text-slate-700">{formatCurrency(o.value)}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 shrink-0" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
