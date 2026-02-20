import { useState } from 'react';
import { Plus, Trash2, ChevronRight } from 'lucide-react';

const STAGES = [
  { id: 'lead', label: 'Lead', color: 'bg-slate-400', light: 'bg-slate-50 border-slate-200', dot: 'bg-slate-400' },
  { id: 'proposal', label: 'Oferta', color: 'bg-blue-500', light: 'bg-blue-50 border-blue-200', dot: 'bg-blue-500' },
  { id: 'negotiation', label: 'Negocjacje', color: 'bg-amber-500', light: 'bg-amber-50 border-amber-200', dot: 'bg-amber-500' },
  { id: 'won', label: 'Wygrany', color: 'bg-emerald-500', light: 'bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500' },
  { id: 'lost', label: 'Przegrany', color: 'bg-red-400', light: 'bg-red-50 border-red-200', dot: 'bg-red-400' },
];

const PROBABILITY = { lead: 10, proposal: 30, negotiation: 60, won: 100, lost: 0 };

function DealForm({ deal, contacts, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: deal?.title || '',
    contactId: deal?.contactId || '',
    value: deal?.value || '',
    stage: deal?.stage || 'lead',
    probability: deal?.probability ?? (deal ? deal.probability : PROBABILITY[deal?.stage || 'lead']),
    notes: deal?.notes || '',
  });

  const set = (field) => (e) => {
    const val = e.target.value;
    setForm(f => ({
      ...f,
      [field]: val,
      ...(field === 'stage' ? { probability: PROBABILITY[val] } : {}),
    }));
  };

  const inputClass = 'w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 bg-white';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave({ ...form, value: Number(form.value) || 0, probability: Number(form.probability) || 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 py-4 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Nazwa dealu *</label>
        <input className={inputClass} value={form.title} onChange={set('title')} placeholder="np. Kampania Social Media Q2" />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Klient</label>
        <select className={inputClass} value={form.contactId} onChange={set('contactId')}>
          <option value="">-- Wybierz klienta --</option>
          {contacts.map(c => <option key={c.id} value={c.id}>{c.name} {c.company ? `(${c.company})` : ''}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Wartość (PLN)</label>
          <input className={inputClass} type="number" min="0" value={form.value} onChange={set('value')} placeholder="0" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Prawdopod. %</label>
          <input className={inputClass} type="number" min="0" max="100" value={form.probability} onChange={set('probability')} />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Etap</label>
        <div className="grid grid-cols-3 gap-2">
          {STAGES.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => setForm(f => ({ ...f, stage: s.id, probability: PROBABILITY[s.id] }))}
              className={`py-2 px-2 rounded-xl text-xs font-medium border-2 transition-all ${form.stage === s.id ? `${s.color} text-white border-transparent` : 'border-slate-200 text-slate-500'}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Notatki</label>
        <textarea className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 resize-none" value={form.notes} onChange={set('notes')} rows={2} />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 border border-slate-200 text-slate-600 font-medium py-3 rounded-xl text-sm">Anuluj</button>
        <button type="submit" className="flex-1 bg-blue-600 text-white font-medium py-3 rounded-xl text-sm">{deal ? 'Zapisz' : 'Dodaj deal'}</button>
      </div>
    </form>
  );
}

export default function Pipeline({ deals, contacts, onAdd, onUpdate, onDelete }) {
  const [view, setView] = useState('pipeline');
  const [editDeal, setEditDeal] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const getContact = (id) => contacts.find(c => c.id === id);
  const formatCurrency = (n) => new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 }).format(n || 0);

  const handleAdd = (data) => { onAdd(data); setView('pipeline'); };
  const handleUpdate = (data) => { onUpdate(editDeal.id, data); setEditDeal(null); setView('pipeline'); };
  const handleMove = (deal, newStage) => onUpdate(deal.id, { stage: newStage, probability: PROBABILITY[newStage] });

  const totalPipeline = deals
    .filter(d => !['won', 'lost'].includes(d.stage))
    .reduce((s, d) => s + (d.value || 0) * (d.probability || 0) / 100, 0);
  const totalWon = deals.filter(d => d.stage === 'won').reduce((s, d) => s + (d.value || 0), 0);

  if (view === 'new') return (
    <div>
      <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => setView('pipeline')} className="text-blue-600 text-sm font-medium">‹ Cofnij</button>
        <h2 className="font-semibold text-slate-800">Nowy deal</h2>
      </div>
      <DealForm contacts={contacts} onSave={handleAdd} onCancel={() => setView('pipeline')} />
    </div>
  );

  if (view === 'edit' && editDeal) return (
    <div>
      <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => { setEditDeal(null); setView('pipeline'); }} className="text-blue-600 text-sm font-medium">‹ Cofnij</button>
        <h2 className="font-semibold text-slate-800">Edytuj deal</h2>
      </div>
      <DealForm deal={editDeal} contacts={contacts} onSave={handleUpdate} onCancel={() => { setEditDeal(null); setView('pipeline'); }} />
    </div>
  );

  return (
    <div>
      <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <h2 className="font-bold text-slate-800 text-lg">Pipeline sprzedaży</h2>
        <button onClick={() => setView('new')} className="flex items-center gap-1 bg-blue-600 text-white text-sm font-medium px-3 py-2 rounded-xl active:scale-95 transition-transform">
          <Plus size={16} /> Deal
        </button>
      </div>

      <div className="px-4 py-3">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-2xl shadow-sm p-3 text-center">
            <div className="text-xs text-slate-400 mb-1">Oczekiwany przychód</div>
            <div className="text-base font-bold text-amber-600">{formatCurrency(totalPipeline)}</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-3 text-center">
            <div className="text-xs text-slate-400 mb-1">Zamknięte (wygrane)</div>
            <div className="text-base font-bold text-emerald-600">{formatCurrency(totalWon)}</div>
          </div>
        </div>

        {/* Kanban stages */}
        <div className="space-y-3">
          {STAGES.map(stage => {
            const stageDeals = deals.filter(d => d.stage === stage.id);
            const stageTotal = stageDeals.reduce((s, d) => s + (d.value || 0), 0);
            return (
              <div key={stage.id} className={`border rounded-2xl overflow-hidden ${stage.light}`}>
                <div className={`flex items-center justify-between px-4 py-2.5`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${stage.dot}`} />
                    <span className="text-sm font-semibold text-slate-700">{stage.label}</span>
                    <span className="text-xs bg-white/70 text-slate-500 px-2 py-0.5 rounded-full">{stageDeals.length}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-600">{formatCurrency(stageTotal)}</span>
                </div>

                {stageDeals.length > 0 && (
                  <div className="px-3 pb-3 space-y-2">
                    {stageDeals.map(deal => {
                      const contact = getContact(deal.contactId);
                      const nextStages = STAGES.filter(s => s.id !== deal.stage && !['won', 'lost'].includes(s.id) || s.id === 'won' || s.id === 'lost');
                      return (
                        <div key={deal.id} className="bg-white rounded-xl p-3 shadow-sm">
                          {confirmDelete === deal.id ? (
                            <div className="text-center py-1">
                              <p className="text-xs text-red-600 mb-2">Usunąć <strong>{deal.title}</strong>?</p>
                              <div className="flex gap-2 justify-center">
                                <button onClick={() => setConfirmDelete(null)} className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600">Anuluj</button>
                                <button onClick={() => { onDelete(deal.id); setConfirmDelete(null); }} className="text-xs px-3 py-1.5 bg-red-500 text-white rounded-lg font-medium">Usuń</button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <span className="text-sm font-medium text-slate-800 leading-tight">{deal.title}</span>
                                <div className="flex shrink-0">
                                  <button onClick={() => { setEditDeal(deal); setView('edit'); }} className="p-1 text-slate-400"><ChevronRight size={15} /></button>
                                  <button onClick={() => setConfirmDelete(deal.id)} className="p-1 text-slate-300"><Trash2 size={14} /></button>
                                </div>
                              </div>
                              {contact && <p className="text-xs text-slate-400 mb-2">{contact.name}{contact.company ? ` · ${contact.company}` : ''}</p>}
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-slate-800">{formatCurrency(deal.value)}</span>
                                <span className="text-xs text-slate-400">{deal.probability}% szans</span>
                              </div>
                              {/* Quick move buttons */}
                              <div className="flex gap-1 flex-wrap">
                                {STAGES.filter(s => s.id !== deal.stage).map(s => (
                                  <button
                                    key={s.id}
                                    onClick={() => handleMove(deal, s.id)}
                                    className={`text-xs px-2 py-1 rounded-lg font-medium transition-colors ${s.id === 'won' ? 'bg-emerald-100 text-emerald-700' : s.id === 'lost' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}
                                  >
                                    → {s.label}
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {stageDeals.length === 0 && (
                  <div className="px-4 pb-3 text-xs text-slate-400 text-center italic">Brak dealów na tym etapie</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
