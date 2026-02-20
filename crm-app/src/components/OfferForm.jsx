import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Szkic' },
  { value: 'sent', label: 'Wysłana' },
  { value: 'accepted', label: 'Zaakceptowana' },
  { value: 'rejected', label: 'Odrzucona' },
];

export default function OfferForm({ offer, contacts, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: offer?.title || '',
    contactId: offer?.contactId || '',
    description: offer?.description || '',
    validUntil: offer?.validUntil || '',
    status: offer?.status || 'draft',
    currency: offer?.currency || 'PLN',
    items: offer?.items || [{ name: '', qty: 1, price: 0 }],
    personalNote: offer?.personalNote || '',
  });
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const setItem = (idx, field) => (e) => {
    const items = form.items.map((item, i) => i === idx ? { ...item, [field]: field === 'name' ? e.target.value : Number(e.target.value) } : item);
    setForm(f => ({ ...f, items }));
  };

  const addItem = () => setForm(f => ({ ...f, items: [...f.items, { name: '', qty: 1, price: 0 }] }));
  const removeItem = (idx) => setForm(f => ({ ...f, items: f.items.filter((_, i) => i !== idx) }));

  const total = form.items.reduce((s, i) => s + (i.qty || 0) * (i.price || 0), 0);

  const formatCurrency = (n) => new Intl.NumberFormat('pl-PL', { style: 'currency', currency: form.currency, maximumFractionDigits: 2 }).format(n);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Tytuł jest wymagany';
    if (!form.contactId) e.contactId = 'Wybierz klienta';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSave({ ...form, value: total });
  };

  const inputClass = (field) =>
    `w-full border rounded-xl px-3 py-2.5 text-sm outline-none transition-colors ${errors[field] ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white focus:border-blue-400'}`;

  const contact = contacts.find(c => c.id === form.contactId);

  return (
    <form onSubmit={handleSubmit} className="px-4 py-4 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Tytuł oferty *</label>
        <input className={inputClass('title')} value={form.title} onChange={set('title')} placeholder="np. Kampania Social Media Q2" />
        {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Klient *</label>
        <select className={inputClass('contactId')} value={form.contactId} onChange={set('contactId')}>
          <option value="">-- Wybierz klienta --</option>
          {contacts.map(c => (
            <option key={c.id} value={c.id}>{c.name} {c.company ? `(${c.company})` : ''}</option>
          ))}
        </select>
        {errors.contactId && <p className="text-xs text-red-500">{errors.contactId}</p>}
      </div>

      {/* Personalized note */}
      {contact && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 space-y-2">
          <p className="text-xs font-medium text-blue-700">Spersonalizowana wiadomość dla {contact.name}</p>
          <textarea
            className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 resize-none"
            value={form.personalNote}
            onChange={set('personalNote')}
            rows={3}
            placeholder={`Drogi/a ${contact.name}, przygotowałem/am dla Ciebie dedykowaną ofertę...`}
          />
          {contact.notes && (
            <p className="text-xs text-blue-600 italic">Notatka o kliencie: {contact.notes}</p>
          )}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Opis oferty</label>
        <textarea
          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 resize-none"
          value={form.description}
          onChange={set('description')}
          rows={3}
          placeholder="Szczegółowy opis zakresu usług..."
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Status</label>
          <select className={inputClass('status')} value={form.status} onChange={set('status')}>
            {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Ważna do</label>
          <input className={inputClass('validUntil')} type="date" value={form.validUntil} onChange={set('validUntil')} />
        </div>
      </div>

      {/* Line items */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Pozycje oferty</label>
          <button type="button" onClick={addItem} className="flex items-center gap-1 text-xs text-blue-600 font-medium">
            <Plus size={13} /> Dodaj pozycję
          </button>
        </div>

        <div className="space-y-2">
          {form.items.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-3 space-y-2">
              <div className="flex gap-2 items-start">
                <input
                  className="flex-1 border border-slate-200 rounded-lg px-2.5 py-2 text-sm outline-none focus:border-blue-400"
                  value={item.name}
                  onChange={setItem(idx, 'name')}
                  placeholder="Nazwa usługi/produktu"
                />
                {form.items.length > 1 && (
                  <button type="button" onClick={() => removeItem(idx)} className="text-red-400 p-1 shrink-0">
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-400">Ilość:</span>
                  <input
                    className="flex-1 border border-slate-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-blue-400 text-center"
                    type="number" min="1" value={item.qty} onChange={setItem(idx, 'qty')}
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-400">Cena:</span>
                  <input
                    className="flex-1 border border-slate-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-blue-400 text-right"
                    type="number" min="0" value={item.price} onChange={setItem(idx, 'price')}
                  />
                </div>
              </div>
              <div className="text-right text-xs text-slate-500">
                Razem: <strong className="text-slate-700">{formatCurrency(item.qty * item.price)}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 text-white rounded-xl px-4 py-3 flex justify-between items-center">
          <span className="text-sm font-medium">SUMA OFERTY</span>
          <span className="text-lg font-bold">{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 border border-slate-200 text-slate-600 font-medium py-3 rounded-xl text-sm active:scale-95 transition-transform">
          Anuluj
        </button>
        <button type="submit" className="flex-1 bg-blue-600 text-white font-medium py-3 rounded-xl text-sm active:scale-95 transition-transform shadow-sm">
          {offer ? 'Zapisz ofertę' : 'Utwórz ofertę'}
        </button>
      </div>
    </form>
  );
}
