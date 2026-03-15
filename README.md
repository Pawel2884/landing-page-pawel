# 🎯 Meta Leads CRM — Google Apps Script

Zaawansowany system CRM dla kampanii Meta Ads Lead Generation zbudowany na Google Sheets + Apps Script.

---

## 📋 Funkcje

| Funkcja | Opis |
|---|---|
| **Automatyczne arkusze** | Leady, Dashboard, Ustawienia, Historia |
| **Lejek sprzedażowy** | 6 statusów z kolorowym kodowaniem |
| **Auto-scoring leadów** | Automatyczna ocena i priorytet na podstawie danych |
| **Dashboard KPI** | Konwersja, pipeline, top kampanie – odświeżany co godzinę |
| **Email powiadomienia** | Nowy lead, przypomnienia, raport dzienny + tygodniowy |
| **Webhook Meta API** | Automatyczny odbiór leadów z formularzy Meta |
| **Import CSV** | Masowy import z eksportu Meta Lead Ads |
| **Historia zmian** | Log wszystkich akcji w arkuszu Historia |
| **Triggery automatyczne** | Codzienne raporty, odświeżanie dashboardu |

---

## 🚀 Instalacja (krok po kroku)

### 1. Skopiuj kod do Apps Script

1. Otwórz swój arkusz Google Sheets
2. Kliknij **Rozszerzenia → Apps Script**
3. Usuń istniejący kod w `Code.gs`
4. Wklej całą zawartość pliku `Code.gs` z tego repozytorium
5. Kliknij **Zapisz** (💾)

### 2. Pierwsze uruchomienie

1. Odśwież arkusz Google Sheets (F5)
2. W menu pojawi się **🎯 CRM Meta Leads**
3. Kliknij **⚙️ Skonfiguruj CRM (pierwsze uruchomienie)**
4. Zatwierdź wymagane uprawnienia (Google poprosi o autoryzację)
5. Gotowe — arkusze zostaną automatycznie przygotowane

### 3. Skonfiguruj ustawienia

Przejdź do arkusza **Ustawienia** i uzupełnij:
- Twój email (powiadomienia)
- Nazwa firmy
- Cele miesięczne (leady, zamknięcia, przychód)
- Progi przypomnień

---

## 🌐 Podpięcie webhooka Meta (automatyczny odbiór leadów)

### Krok 1: Opublikuj skrypt jako Web App

1. W Apps Script kliknij **Wdróż → Nowe wdrożenie**
2. Typ: **Aplikacja internetowa**
3. Wykonaj jako: **Ja**
4. Kto ma dostęp: **Wszyscy**
5. Kliknij **Wdróż** → skopiuj URL

### Krok 2: Dodaj webhook w Meta

1. Wejdź na [Meta for Developers](https://developers.facebook.com/)
2. Twoja aplikacja → **Webhooki**
3. Subskrybuj obiekt: **`leadgen`**
4. **Callback URL**: URL z kroku 1
5. **Verify Token**: skopiuj z menu CRM → *Pokaż URL Webhooka*

### Krok 3 (opcjonalnie): Pobieranie danych przez Graph API

Aby skrypt automatycznie pobierał dane kontaktowe (imię, email, telefon):
1. Wygeneruj **Meta System User Access Token** z uprawnieniem `leads_retrieval`
2. Wklej go w arkuszu **Ustawienia** w polu: `Meta Access Token`

Bez tego tokenu skrypt zapisze tylko `Leadgen ID` — resztę możesz uzupełnić ręcznie lub przez import CSV.

---

## 📥 Import CSV z Meta Lead Ads

1. Wejdź w **Meta Ads Manager → Formularze błyskawiczne → Eksportuj leady (CSV)**
2. W arkuszu kliknij **CRM Meta Leads → Importuj leady z CSV/Meta export**
3. Wklej zawartość pliku CSV → kliknij Importuj

Obsługiwane kolumny Meta: `first_name`, `last_name`, `email`, `phone_number`, `campaign_name`, `ad_set_name`, `ad_name`, `created_time`

---

## 📊 Struktura arkuszy

### Arkusz: Leady
| Kolumna | Opis |
|---|---|
| ID | Unikalny identyfikator (LD-YYYYMMDD-XXXXX) |
| Data dodania | Timestamp dodania leada |
| Imię / Nazwisko / Email / Telefon | Dane kontaktowe |
| Kampania / Zestaw reklam / Reklama | Dane z Meta Ads |
| Status | Nowy → Kontaktowany → Zainteresowany → Negocjacje → Zamknięty |
| Priorytet | Wysoki / Średni / Niski (auto) |
| Ocena (1-10) | Auto-scoring na podstawie kompletności danych |
| Wartość (PLN) | Szacowana wartość dealu |
| Następny kontakt | Data planowanego kontaktu |
| Dni w pipeline | Automatyczna formuła |

### Lejek sprzedażowy (statusy)
```
🟢 Nowy           → świeży lead
🔵 Kontaktowany   → nawiązano kontakt
🟡 Zainteresowany → wyraził zainteresowanie
🟠 Negocjacje     → trwa negocjacja
✅ Zamknięty – wygrany
❌ Zamknięty – utracony
```

---

## ⚡ Automatyzacje (triggery)

| Trigger | Częstotliwość | Akcja |
|---|---|---|
| `buildDashboard` | Co godzinę | Odświeża KPI |
| `dailyMorningTasks` | Codziennie rano | Raport + przypomnienia |
| `onEdit` | Przy każdej edycji | Aktualizuje "Ostatnia zmiana", loguje status |

Ustaw triggery przez: **CRM Meta Leads → Ustaw triggery automatyczne**

---

## 🔧 Konfiguracja zaawansowana

W pliku `Code.gs` na górze znajdziesz obiekt `CFG` — możesz dostosować:
- `GODZINA_RAPORTU` — godzina wysyłki dziennego maila (domyślnie 8)
- `EMAIL_NOWY_LEAD` — true/false — powiadomienie o każdym nowym leadzie
- `EMAIL_PRZYPOMNIENIE` — true/false — powiadomienia o zaległościach
- `KOLORY_STATUSOW` — kolory wierszy dla każdego statusu

---

## 📁 Pliki

```
Code.gs    — cały kod Apps Script (wklej do edytora)
README.md  — ta instrukcja
```
