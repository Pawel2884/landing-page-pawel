import { useState } from 'react';
import { X, Plus } from 'lucide-react';

const COMMON_TAGS = ['VIP', 'eCommerce', 'B2B', 'B2C', 'Startup', 'Agencja', 'Nowy', 'Aktywny'];

export default function ContactForm({ contact, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: contact?.name || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
    company: contact?.company || '',
    position: contact?.position || '',
    notes: contact?.notes || '',
    tags: contact?.tags || [],
  });
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const addTag = (tag) => {
    const t = tag.trim();
    if (t && !form.tags.includes(t)) setForm(f => ({ ...f, tags: [...f.tags, t] }));
    setTagInput('');
  };
  const removeTag = (tag) => setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Imię i nazwisko jest wymagane';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Niepoprawny email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSave(form);
  };

  const inputClass = (field) =>
    `w-full border rounded-xl px-3 py-2.5 text-sm outline-none transition-colors ${errors[field] ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white focus:border-blue-400'}`;

  return (
    <form onSubmit={handleSubmit} className="px-4 py-4 space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Imię i nazwisko *</label>
        <input className={inputClass('name')} value={form.name} onChange={set('name')} placeholder="np. Jan Kowalski" />
        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Email</label>
          <input className={inputClass('email')} type="email" value={form.email} onChange={set('email')} placeholder="jan@firma.pl" />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Telefon</label>
          <input className={inputClass('phone')} type="tel" value={form.phone} onChange={set('phone')} placeholder="+48 600 000 000" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Firma</label>
          <input className={inputClass('company')} value={form.company} onChange={set('company')} placeholder="Nazwa firmy" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Stanowisko</label>
          <input className={inputClass('position')} value={form.position} onChange={set('position')} placeholder="np. CEO" />
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Tagi</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {form.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">
              {tag}
              <button type="button" onClick={() => removeTag(tag)}><X size={10} /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag(tagInput))}
            placeholder="Dodaj tag..."
          />
          <button type="button" onClick={() => addTag(tagInput)} className="bg-slate-100 text-slate-600 px-3 py-2 rounded-xl text-sm">
            <Plus size={16} />
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {COMMON_TAGS.filter(t => !form.tags.includes(t)).map(tag => (
            <button key={tag} type="button" onClick={() => addTag(tag)} className="text-xs border border-slate-200 text-slate-500 px-2.5 py-1 rounded-full hover:border-blue-300 hover:text-blue-600 transition-colors">
              + {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Notatki</label>
        <textarea
          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 resize-none"
          value={form.notes}
          onChange={set('notes')}
          rows={3}
          placeholder="Dodatkowe informacje o kliencie..."
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 border border-slate-200 text-slate-600 font-medium py-3 rounded-xl text-sm active:scale-95 transition-transform">
          Anuluj
        </button>
        <button type="submit" className="flex-1 bg-blue-600 text-white font-medium py-3 rounded-xl text-sm active:scale-95 transition-transform shadow-sm">
          {contact ? 'Zapisz zmiany' : 'Dodaj klienta'}
        </button>
      </div>
    </form>
  );
}
