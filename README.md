# MarketCRM – Darmowy CRM dla Marketerów

Mobilna aplikacja CRM dla marketerów. Działa w przeglądarce na smartfonie (PWA).

## Funkcje

- **Panel (Dashboard)** – przegląd klientów, ofert i pipeline sprzedaży
- **Klienci** – dodawanie, edytowanie, usuwanie kontaktów z tagami i notatkami
- **Oferty** – tworzenie spersonalizowanych ofert z pozycjami i cenami, udostępnianie przez Share API
- **Pipeline** – śledzenie dealów przez etapy: Lead → Oferta → Negocjacje → Wygrany/Przegrany

## Stos technologiczny

- React 19 + Vite 7
- Tailwind CSS v4
- Lucide React (ikony)
- LocalStorage (dane bez backendu)

## Uruchomienie

```bash
cd crm-app
npm install
npm run dev
```

Aplikacja dostępna pod `http://localhost:5173`

## Budowanie produkcyjne

```bash
npm run build
```
