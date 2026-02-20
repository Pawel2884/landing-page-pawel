const KEYS = {
  contacts: 'crm_contacts',
  offers: 'crm_offers',
  deals: 'crm_deals',
  activities: 'crm_activities',
};

function load(key, defaultValue = []) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// Contacts
export function getContacts() { return load(KEYS.contacts); }
export function saveContacts(contacts) { save(KEYS.contacts, contacts); }
export function addContact(contact) {
  const contacts = getContacts();
  const newContact = { ...contact, id: generateId(), createdAt: new Date().toISOString() };
  saveContacts([...contacts, newContact]);
  return newContact;
}
export function updateContact(id, updates) {
  const contacts = getContacts().map(c => c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c);
  saveContacts(contacts);
}
export function deleteContact(id) {
  saveContacts(getContacts().filter(c => c.id !== id));
}

// Offers
export function getOffers() { return load(KEYS.offers); }
export function saveOffers(offers) { save(KEYS.offers, offers); }
export function addOffer(offer) {
  const offers = getOffers();
  const newOffer = { ...offer, id: generateId(), createdAt: new Date().toISOString(), status: offer.status || 'draft' };
  saveOffers([...offers, newOffer]);
  return newOffer;
}
export function updateOffer(id, updates) {
  const offers = getOffers().map(o => o.id === id ? { ...o, ...updates, updatedAt: new Date().toISOString() } : o);
  saveOffers(offers);
}
export function deleteOffer(id) {
  saveOffers(getOffers().filter(o => o.id !== id));
}

// Deals
export function getDeals() { return load(KEYS.deals); }
export function saveDeals(deals) { save(KEYS.deals, deals); }
export function addDeal(deal) {
  const deals = getDeals();
  const newDeal = { ...deal, id: generateId(), createdAt: new Date().toISOString(), stage: deal.stage || 'lead' };
  saveDeals([...deals, newDeal]);
  return newDeal;
}
export function updateDeal(id, updates) {
  const deals = getDeals().map(d => d.id === id ? { ...d, ...updates } : d);
  saveDeals(deals);
}
export function deleteDeal(id) {
  saveDeals(getDeals().filter(d => d.id !== id));
}

// Seed demo data if empty
export function seedDemoData() {
  if (getContacts().length > 0) return;

  const c1 = addContact({ name: 'Anna Kowalska', email: 'anna@firmaxyz.pl', phone: '+48 600 100 200', company: 'FirmaXYZ', tags: ['VIP', 'eCommerce'], notes: 'Klientka premium, zainteresowana kampaniami email.' });
  const c2 = addContact({ name: 'Marek Nowak', email: 'marek@startup.io', phone: '+48 500 300 400', company: 'StartupIO', tags: ['Startup'], notes: 'Szuka rozwiązań do social media.' });
  const c3 = addContact({ name: 'Katarzyna Wiśniewska', email: 'kasia@agencja.com', phone: '+48 700 500 600', company: 'Agencja Kreatywna', tags: ['Agencja'], notes: 'Poszukuje kompleksowej obsługi marketingowej.' });

  addOffer({ contactId: c1.id, title: 'Kampania Email Marketing Q1', description: 'Kompleksowa kampania email dla sklepu internetowego. 12 wysyłek/miesiąc, segmentacja, A/B testy.', value: 3500, currency: 'PLN', validUntil: '2026-03-31', status: 'sent', items: [{ name: 'Email marketing (miesięcznie)', qty: 3, price: 1000 }, { name: 'Konfiguracja automatyzacji', qty: 1, price: 500 }] });
  addOffer({ contactId: c2.id, title: 'Pakiet Social Media Starter', description: 'Zarządzanie profilami na IG i FB, 20 postów/miesiąc, raporty miesięczne.', value: 2000, currency: 'PLN', validUntil: '2026-03-15', status: 'draft', items: [{ name: 'Posty social media (20 szt.)', qty: 1, price: 1500 }, { name: 'Raportowanie', qty: 1, price: 500 }] });

  addDeal({ contactId: c1.id, title: 'Email Marketing FirmaXYZ', value: 10500, stage: 'negotiation', probability: 80 });
  addDeal({ contactId: c2.id, title: 'Social Media StartupIO', value: 6000, stage: 'proposal', probability: 50 });
  addDeal({ contactId: c3.id, title: 'Obsługa marketingowa Agencja', value: 15000, stage: 'lead', probability: 20 });
}
