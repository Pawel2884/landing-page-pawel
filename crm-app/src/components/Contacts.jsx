import { useState } from 'react';
import { Search, Plus, Phone, Mail, ChevronRight, Trash2, Edit2 } from 'lucide-react';
import ContactForm from './ContactForm';

export default function Contacts({ contacts, onAdd, onUpdate, onDelete, initialDetail }) {
  const [search, setSearch] = useState('');
  const [view, setView] = useState(initialDetail ? (initialDetail === 'new' ? 'new' : 'detail') : 'list');
  const [selectedId, setSelectedId] = useState(initialDetail !== 'new' ? initialDetail : null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const selected = contacts.find(c => c.id === selectedId);

  const filtered = contacts.filter(c =>
    [c.name, c.company, c.email, ...(c.tags || [])].some(f => f?.toLowerCase().includes(search.toLowerCase()))
  );

  const formatDate = (iso) => iso ? new Date(iso).toLocaleDateString('pl-PL') : '—';

  const handleAdd = (data) => { onAdd(data); setView('list'); };
  const handleUpdate = (data) => { onUpdate(selectedId, data); setView('list'); };
  const handleDelete = () => { onDelete(selectedId); setView('list'); setConfirmDelete(false); };

  if (view === 'new') return (
    <div>
      <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => setView('list')} className="text-blue-600 text-sm font-medium">‹ Cofnij</button>
        <h2 className="font-semibold text-slate-800">Nowy klient</h2>
      </div>
      <ContactForm onSave={handleAdd} onCancel={() => setView('list')} />
    </div>
  );

  if (view === 'edit' && selected) return (
    <div>
      <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => setView('detail')} className="text-blue-600 text-sm font-medium">‹ Cofnij</button>
        <h2 className="font-semibold text-slate-800">Edytuj klienta</h2>
      </div>
      <ContactForm contact={selected} onSave={handleUpdate} onCancel={() => setView('detail')} />
    </div>
  );

  if (view === 'detail' && selected) return (
    <div>
      <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setView('list')} className="text-blue-600 text-sm font-medium">‹ Klienci</button>
        <div className="flex gap-2">
          <button onClick={() => setView('edit')} className="p-2 text-slate-500 active:scale-90 transition-transform">
            <Edit2 size={17} />
          </button>
          <button onClick={() => setConfirmDelete(true)} className="p-2 text-red-400 active:scale-90 transition-transform">
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      {confirmDelete && (
        <div className="m-4 bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
          <p className="text-sm text-red-700 mb-3">Usunąć klienta <strong>{selected.name}</strong>?</p>
          <div className="flex gap-2 justify-center">
            <button onClick={() => setConfirmDelete(false)} className="px-4 py-2 text-sm border border-slate-200 rounded-xl text-slate-600">Anuluj</button>
            <button onClick={handleDelete} className="px-4 py-2 text-sm bg-red-500 text-white rounded-xl font-medium">Usuń</button>
          </div>
        </div>
      )}

      <div className="px-4 py-5 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-2xl font-bold">
            {selected.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{selected.name}</h2>
            {selected.position && <p className="text-sm text-slate-500">{selected.position}</p>}
            {selected.company && <p className="text-sm font-medium text-blue-600">{selected.company}</p>}
          </div>
        </div>

        {(selected.tags || []).length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {selected.tags.map(t => (
              <span key={t} className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">{t}</span>
            ))}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm divide-y divide-slate-50">
          {selected.email && (
            <a href={`mailto:${selected.email}`} className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                <Mail size={15} className="text-blue-500" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Email</div>
                <div className="text-sm text-slate-700">{selected.email}</div>
              </div>
            </a>
          )}
          {selected.phone && (
            <a href={`tel:${selected.phone}`} className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center">
                <Phone size={15} className="text-emerald-500" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Telefon</div>
                <div className="text-sm text-slate-700">{selected.phone}</div>
              </div>
            </a>
          )}
        </div>

        {selected.notes && (
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Notatki</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{selected.notes}</p>
          </div>
        )}

        <div className="text-xs text-slate-400 text-center">Dodano: {formatDate(selected.createdAt)}</div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="bg-white border-b border-slate-100 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-800 text-lg">Klienci</h2>
          <button onClick={() => setView('new')} className="flex items-center gap-1 bg-blue-600 text-white text-sm font-medium px-3 py-2 rounded-xl active:scale-95 transition-transform">
            <Plus size={16} /> Dodaj
          </button>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full bg-slate-100 rounded-xl pl-9 pr-3 py-2.5 text-sm outline-none"
            placeholder="Szukaj klientów..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="px-4 py-3">
        <p className="text-xs text-slate-400 mb-3">{filtered.length} klientów</p>
        {filtered.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-3xl mb-2">👥</div>
            <p className="text-slate-500 text-sm">{search ? 'Brak wyników' : 'Brak klientów'}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(c => (
              <button
                key={c.id}
                onClick={() => { setSelectedId(c.id); setView('detail'); }}
                className="w-full bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center gap-3 text-left active:scale-98 transition-transform"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white font-bold shrink-0">
                  {c.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-800 truncate">{c.name}</div>
                  <div className="text-xs text-slate-500 truncate">{c.company || c.email || '—'}</div>
                  {(c.tags || []).length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {c.tags.slice(0, 2).map(t => (
                        <span key={t} className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-md">{t}</span>
                      ))}
                      {c.tags.length > 2 && <span className="text-xs text-slate-400">+{c.tags.length - 2}</span>}
                    </div>
                  )}
                </div>
                <ChevronRight size={16} className="text-slate-300 shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
