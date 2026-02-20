import { useState, useCallback } from 'react';
import './index.css';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Contacts from './components/Contacts';
import Offers from './components/Offers';
import Pipeline from './components/Pipeline';
import {
  getContacts, addContact, updateContact, deleteContact,
  getOffers, addOffer, updateOffer, deleteOffer,
  getDeals, addDeal, updateDeal, deleteDeal,
  seedDemoData,
} from './utils/storage';

// Seed demo data on first load
seedDemoData();

function useData(getter) {
  const [data, setData] = useState(getter);
  const refresh = useCallback(() => setData(getter()), [getter]);
  return [data, refresh];
}

export default function App() {
  const [contacts, refreshContacts] = useData(getContacts);
  const [offers, refreshOffers] = useData(getOffers);
  const [deals, refreshDeals] = useData(getDeals);

  const [tab, setTab] = useState('dashboard');
  const [tabDetail, setTabDetail] = useState(null);

  const navigate = (newTab, detail = null) => {
    setTab(newTab);
    setTabDetail(detail);
  };

  // Contact operations
  const handleAddContact = (data) => { addContact(data); refreshContacts(); };
  const handleUpdateContact = (id, data) => { updateContact(id, data); refreshContacts(); };
  const handleDeleteContact = (id) => { deleteContact(id); refreshContacts(); };

  // Offer operations
  const handleAddOffer = (data) => { addOffer(data); refreshOffers(); };
  const handleUpdateOffer = (id, data) => { updateOffer(id, data); refreshOffers(); };
  const handleDeleteOffer = (id) => { deleteOffer(id); refreshOffers(); };

  // Deal operations
  const handleAddDeal = (data) => { addDeal(data); refreshDeals(); };
  const handleUpdateDeal = (id, data) => { updateDeal(id, data); refreshDeals(); };
  const handleDeleteDeal = (id) => { deleteDeal(id); refreshDeals(); };

  const renderTab = () => {
    switch (tab) {
      case 'dashboard':
        return <Dashboard contacts={contacts} offers={offers} deals={deals} onNavigate={navigate} />;
      case 'contacts':
        return (
          <Contacts
            contacts={contacts}
            onAdd={handleAddContact}
            onUpdate={handleUpdateContact}
            onDelete={handleDeleteContact}
            initialDetail={tabDetail}
          />
        );
      case 'offers':
        return (
          <Offers
            offers={offers}
            contacts={contacts}
            onAdd={handleAddOffer}
            onUpdate={handleUpdateOffer}
            onDelete={handleDeleteOffer}
            initialDetail={tabDetail}
          />
        );
      case 'pipeline':
        return (
          <Pipeline
            deals={deals}
            contacts={contacts}
            onAdd={handleAddDeal}
            onUpdate={handleUpdateDeal}
            onDelete={handleDeleteDeal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 max-w-md mx-auto relative">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">CRM</span>
          </div>
          <span className="font-bold text-slate-800 text-lg">MarketCRM</span>
          <span className="ml-auto text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Darmowy</span>
        </div>
      </header>

      {/* Main content */}
      <main className="pb-20">
        {renderTab()}
      </main>

      {/* Bottom navigation */}
      <Navigation active={tab} onNavigate={(t) => { setTabDetail(null); setTab(t); }} />
    </div>
  );
}
