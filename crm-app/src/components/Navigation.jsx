import { LayoutDashboard, Users, FileText, TrendingUp } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Panel', icon: LayoutDashboard },
  { id: 'contacts', label: 'Klienci', icon: Users },
  { id: 'offers', label: 'Oferty', icon: FileText },
  { id: 'pipeline', label: 'Pipeline', icon: TrendingUp },
];

export default function Navigation({ active, onNavigate }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50">
      <div className="flex justify-around items-center h-16 px-2 pb-safe">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-colors active:scale-90 ${isActive ? 'text-blue-600' : 'text-slate-400'}`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
