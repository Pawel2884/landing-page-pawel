# AUDYT META ADS — KAMPANIA LEADOWA „LeadGen 27.05"

**Tryb: wyłącznie odczyt. Nie wprowadzono żadnej zmiany na koncie.**
Data wykonania audytu: **2026-08-03**, dane pobrane do godz. **21:45 (Europe/Warsaw)**.
Źródło: Meta Ads MCP — `ads_get_ad_accounts`, `ads_get_ad_entities`, `ads_account_get_activity_logs`, `ads_get_creatives`, `ads_get_errors`.

> ⚠️ **Uwaga wstępna, istotna dla całej interpretacji:** dzisiaj **2026-08-03 o 11:57–11:59** ktoś zmienił ustawienia tego zestawu reklam przez integrację o nazwie aplikacji **„ads MCP server"** (aktor: Paweł Kwiatek). Zmieniono zdarzenie optymalizacyjne i targetowanie. **Te zmiany nie zostały wykonane w ramach tego audytu** — audyt był i pozostaje w trybie odczytu. Szczegóły w sekcji 3.

---

## 1. IDENTYFIKACJA KONTA I KAMPANII

### Konto

| Pole | Wartość |
|---|---|
| ID konta | `1569482637544365` |
| Nazwa konta | PawełKwiatek |
| Business | Paweł Kwiatek Marketing (`591163360686591`) |
| Status konta | ACTIVE |
| Waluta | **PLN** |
| Strefa czasowa | **Europe/Warsaw** |
| Metoda płatności | jest |
| Minimalny budżet dzienny | 3,82 zł |

### Kampania

| Pole | Wartość |
|---|---|
| ID kampanii | `120250261422190581` |
| Nazwa | **LeadGen 27.05** |
| Cel | `OUTCOME_LEADS` |
| Typ zakupu | AUCTION |
| Kategoria specjalna | brak |
| Miejsce konwersji | **Formularz błyskawiczny na Meta (Instant Form)** — leady raportowane jako `onsite_conversion.lead_grouped` |
| Typ wyniku raportowany przez Meta | **Leads (form)** |
| Budżet | **na poziomie zestawu (ABO)** — kampania nie używa Advantage Campaign Budget |
| Strategia licytacji | Highest volume (automatyczna), bez cost cap / bid cap |
| Okno atrybucji | **1d_view / 7d_click** |
| Status | ACTIVE, dostarczanie: active |
| Utworzona | 2026-05-27 15:37:46 |
| Ostatnia edycja | **2026-08-03 11:59:16** |
| Harmonogram | ciągły, bez dayparting |

**Jednoznaczność identyfikacji:** na koncie `1569482637544365` jest to **jedyna aktywna kampania leadowa**. Pozostałe kampanie leadowe (`Kampania leadowa KM 09.07`, `24.07 LEAD-GEN MOJA`, `Kampania TEST LEAD 26.07`, `28.07 test LeadGen`) są wyłączone. Nie było potrzeby zadawania pytania o wybór.

### Zestaw reklam (jedyny w kampanii)

| Pole | Wartość |
|---|---|
| ID / nazwa | `120250261422330581` / **Cała polska** |
| Status | ACTIVE |
| Budżet dzienny | **200,00 zł** (od 2026-07-28) |
| Zdarzenie optymalizacyjne — OBECNIE | `LEAD_GENERATION` (Leads) — **zmienione dziś 11:57** |
| Zdarzenie optymalizacyjne — OD STARTU DO DZIŚ 11:57 | **`QUALITY_LEAD` (Conversion leads)** |
| Okno atrybucji | 1d_view / 7d_click |
| Lokalizacja | Polska (home + recent) |
| Wiek / płeć / język — OBECNIE | 18–65 / wszystkie / brak ograniczenia (**zmienione dziś 11:58**) |
| Wiek / płeć / język — 20.06–03.08 | 35–60 / **tylko mężczyźni** / polski |
| Advantage+ Audience | **ON** (włączone ponownie 28.07) |
| Placementy | **automatyczne** — Facebook + Instagram + Audience Network, 24 pozycje |
| Grupy niestandardowe / lookalike | brak |
| Wykluczenia | `24.07 Wyklucza form` — custom audience z 29 źródeł lead/ig_lead_generation, zdarzenie `lead_generation_submitted`, retencja 90 dni |
| Szacowana wielkość grupy | **BRAK DANYCH** (niedostępne przez MCP) |

### Zakresy dat użyte w audycie (wszystkie w Europe/Warsaw)

| Kod | Okres | Daty |
|---|---|---|
| **D** | Ostatnie 7 pełnych dni (zakończone wczoraj) | **2026-07-27 → 2026-08-02** |
| **I** | Dziś — dane niepełne, liczone osobno | **2026-08-03** |
| **E** | Poprzednie 7 pełnych dni | **2026-07-20 → 2026-07-26** |
| **F4** | Od ponownego uruchomienia do wczoraj | **2026-07-28 → 2026-08-02** |
| **F1/F2/F3** | 24 h / 48 h / 3 dni po restarcie | 2026-07-28 / …-07-29 / …-07-30 |
| **C** | Ostatni stabilny 7 dni przed wyłączeniem | **2026-06-13 → 2026-06-19** |
| **B** | Ostatni stabilny 14 dni przed wyłączeniem | **2026-06-10 → 2026-06-23** |
| **A** | Pierwsze 7 dni po starcie kampanii | **2026-05-27 → 2026-06-02** |
| **G** | Ostatnie 30 dni | **2026-07-04 → 2026-08-02** |
| **H** | Cała historia kampanii (bez dziś) | **2026-05-27 → 2026-08-02** |

---

## 2. WIARYGODNOŚĆ DANYCH

| Element | Ocena |
|---|---|
| Strefa czasowa | ✅ Wszystkie zakresy liczone w Europe/Warsaw = strefa konta. |
| Dzień dzisiejszy | ✅ 2026-08-03 wydzielony jako **niepełny**, nie mieszany z pełnymi dniami. |
| Opóźnienie atrybucji | ⚠️ Okno **7d_click** — leady z 28.07–02.08 mogą jeszcze dojść. Wpływ na ostatnie 1–2 dni: realny, ale niewielki (formularz Instant Form konwertuje w minutach, nie w dniach). |
| Zmiana okna atrybucji | ✅ Brak — `1d_view_7d_click` niezmienne przez całą historię. |
| Zmiana definicji wyniku | ⚠️ **TAK.** Zdarzenie optymalizacyjne zmienione dziś 11:57 z `QUALITY_LEAD` na `LEAD_GENERATION`. Nie zmienia to historycznych liczb leadów (metryka `lead` jest ta sama), ale zmienia sposób licytowania od dziś. |
| Zgodność breakdownów z sumą | ✅ Suma wydatku po platformach (780,05 + 260,52 = **1 040,57 zł**) = suma dzienna 28.07–02.08. Suma leadów w breakdownach = **3** = suma dzienna. |
| Podwójne liczenie zasięgu | ✅ Zasięg nie był sumowany między dniami ani breakdownami. |
| Zgodność sumy reklam z kampanią | ✅ Suma wydatku 22 reklam = 4 769,50 zł vs kampania 4 769,31 zł (różnica 0,19 zł = zaokrąglenia). Leady: 81 = 81. |
| Zgodność Meta ↔ CRM | ❌ **BRAK DANYCH** — nie dostarczono żadnego źródła CRM/arkusza. |
| Duplikaty | ❌ **BRAK DANYCH** — wymaga CRM. |
| Modelowanie danych przez Meta | ⚠️ Nie da się zweryfikować przez MCP. Przy Instant Form (konwersja na Meta) modelowanie jest minimalne. |
| Wielkość próby | ⚠️ **KRYTYCZNE.** Okres D to **3 leady**. Każdy pojedynczy lead zmienia CPL o ~30%. Wnioski o CPL na poziomie dnia i segmentu są niestabilne. |
| Czy kampania miała dość czasu po restarcie | ⚠️ 6 pełnych dni, 3 leady, 1 040 zł. Przy optymalizacji na leady próg wyjścia z fazy uczenia to ~50 zdarzeń/7 dni na zestaw. **Kampania nie zebrała nawet 10% tej liczby.** |

**Ogólna ocena pewności: ŚREDNIA.**
Dane o emisji, koszcie, ruchu i historii zmian są kompletne i spójne. Dane o leadach po restarcie mają zbyt małą próbę, żeby ocenić CPL punktowo — ale **kierunek zmiany jest jednoznaczny i widoczny w mianowniku, nie w liczniku** (patrz sekcja 12). Cała warstwa jakości leadów i sprzedaży: brak.

---

## 3. OŚ CZASU

| Data i godzina (Europe/Warsaw) | Zdarzenie |
|---|---|
| 2026-05-27 15:37 | Utworzenie kampanii, zestawu i 5 reklam. Budżet **100 zł/d**. Optymalizacja: **Conversion leads**. Targetowanie: PL, 35–65+, język polski, Advantage+ Audience **ON**. |
| 2026-05-29 19:41 | Budżet 100 → **110 zł/d** |
| 2026-06-05 14:17–14:54 | +3 reklamy (KREDYTY 1/2/3) i **podmiana ich kreacji** |
| 2026-06-09 11:10–11:11 | Zestaw wyłączony i włączony w ciągu 1 minuty (bez wpływu) |
| 2026-06-09 15:39–15:40 | +4 reklamy; budżet 110 → **120 zł/d** |
| 2026-06-12 20:26 | Budżet 120 → **140 zł/d** |
| 2026-06-20 10:42 | **Zawężenie grupy:** wiek 35–60, **tylko mężczyźni**, Advantage+ Audience **OFF**, Advantage+ detailed targeting ON. +3 reklamy. |
| 2026-06-22 12:29–12:32 | **Podmiana kreacji na 6 reklamach** |
| 2026-06-23 13:46 | +3 warianty tej samej grafiki („Grafika 966 leadów 2/3/4") |
| **2026-06-24 12:30** | 🔴 **WYŁĄCZENIE KAMPANII** (status Active → Inactive) |
| 2026-06-24 16:16 | Wyłączenie zestawu |
| 2026-06-25 → 2026-07-27 | **PRZERWA — 33 dni bez emisji tej kampanii** |
| **2026-07-28 17:42** | 🟢 **PONOWNE URUCHOMIENIE KAMPANII** |
| 2026-07-28 17:48 | Budżet 140 → **200 zł/d (+43%)** |
| 2026-07-28 17:48 | Wykluczenie: `26.05 WYKLUCZENIE` → **`24.07 Wyklucza form`**; min. wiek 18; **Advantage+ Audience z powrotem ON** |
| 2026-07-28 17:48 | 🔴 **PODMIANA KREACJI NA WSZYSTKICH 9 AKTYWNYCH REKLAMACH** (nowe `creative_id`, nazwy z sufiksem `2026-07-28`) |
| 2026-07-28 17:49–17:50 | Archiwizacja 13 starych reklam |
| 2026-07-28 18:10 | +1 reklama wideo („Dodatkowe Wideo") |
| 2026-07-30 18:02 → 18:08 | Konto: Active → **Payment Needed** → Active (6 min), obciążenie 1 000,00 zł |
| 2026-08-02 20:46 → 20:49 | Konto: Active → **Payment Needed** → Active (3 min), obciążenie 1 000,70 zł |
| **2026-08-03 11:57** | 🔴 Zdarzenie optymalizacyjne: **Conversion leads → Leads** (aplikacja: **„ads MCP server"**) |
| **2026-08-03 11:58** | 🔴 Targetowanie: **usunięto wiek 35–60, płeć męską i język polski** (aplikacja: **„ads MCP server"**) |
| 2026-08-03 11:59 | Zestaw ponownie Active |

**Długość przerwy: 33 dni 5 godzin 12 minut** (2026-06-24 12:30 → 2026-07-28 17:42). Dni z zerową emisją: **33** (25.06–27.07).

**Czy konfiguracja po restarcie jest identyczna jak przed wyłączeniem? NIE.** Różnice:

| Parametr | Przed wyłączeniem (stan na 24.06) | Po restarcie (28.07) | Po zmianie z dziś (03.08) |
|---|---|---|---|
| Budżet dzienny | 140 zł | **200 zł** | 200 zł |
| Advantage+ Audience | **OFF** | **ON** | ON |
| Advantage+ detailed targeting | ON | (zastąpione przez Advantage+ Audience) | — |
| Wykluczenie | `26.05 WYKLUCZENIE` | **`24.07 Wyklucza form`** | `24.07 Wyklucza form` |
| Minimalny wiek | — | 18 | 18 |
| Wiek | 35–60 | 35–60 | **18–65 (usunięte)** |
| Płeć | mężczyźni | mężczyźni | **wszystkie (usunięte)** |
| Język | polski | polski | **brak (usunięty)** |
| Kreacje | 22 reklamy, historyczne posty | **9 reklam z całkowicie nowymi kreacjami** | bez zmian |
| Optymalizacja | Conversion leads | Conversion leads | **Leads** |

---

## 4. PORÓWNANIE OKRESÓW

Wszystkie wskaźniki policzone **z sum liczników i mianowników**, nie ze średnich dziennych.

| Miernik | A: pierwsze 7 dni po starcie (27.05–02.06) | C: stabilne 7 dni przed wyłączeniem (13–19.06) | B: stabilne 14 dni przed wył. (10–23.06) | E: poprzednie 7 pełnych dni (20–26.07) | D: ostatnie 7 pełnych dni (27.07–02.08) | Zmiana D vs C |
|---|---|---|---|---|---|---|
| Dni z emisją | 7 | 7 | 14 | **0** | 6 (z 7) | — |
| Wydatek | 765,24 zł | 992,68 zł | 1 896,97 zł | **0,00 zł** | 1 040,57 zł | **+4,8%** |
| Wyświetlenia | 15 424 | 18 401 | 35 280 | 0 | 16 484 | −10,4% |
| CPM | 49,61 zł | 53,95 zł | 53,77 zł | — | **63,13 zł** | **+17,0%** |
| Kliknięcia (all) | 236 | 320 | 573 | 0 | 254 | −20,6% |
| CTR (all) | 1,53% | 1,74% | 1,62% | — | 1,54% | −11,4% |
| CPC (all) | 3,24 zł | 3,10 zł | 3,31 zł | — | 4,10 zł | +32,1% |
| Kliknięcia linku | 93 | 104 | 199 | 0 | 88 | −15,4% |
| **CTR linku** | 0,603% | **0,565%** | 0,564% | — | **0,534%** | **−5,5%** |
| **CPC linku** | 8,23 zł | 9,54 zł | 9,53 zł | — | **11,82 zł** | **+23,9%** |
| Otwarcia formularza | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | — |
| Ukończenia formularza | 24 | 26 | 40 | 0 | 3 | — |
| **Konwersja klik linku → lead** | 25,8% | **25,0%** | 20,1% | — | **3,4%** | **−86,4%** |
| **Leady** | 24 | 26 | 40 | **0** | **3** | **−88,5%** |
| **CPL** | 31,88 zł | **38,18 zł** | 47,42 zł | — | **346,86 zł** | **+808,5%** |
| Qualified rate | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | — |
| CPQL | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | — |
| Contact rate | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | — |
| Booking rate | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | — |
| Close rate | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | — |
| CAC | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | BRAK DANYCH | — |

> **Okres E (poprzednie 7 pełnych dni, 20–26.07) jest zerowy** — kampania była wtedy wyłączona. Dlatego podstawowym punktem odniesienia w tym audycie jest **okres C** (ostatnie stabilne 7 dni przed wyłączeniem), a nie E.

### Okna po ponownym uruchomieniu

| Okno | Daty | Wydatek | Wyśw. | CPM | CTR linku | Kliknięcia linku | Leady | CPL |
|---|---|---|---|---|---|---|---|---|
| Pierwsze 24 h | 28.07 (od 17:49) | 45,53 zł | 715 | 63,68 zł | 0,420% | 3 | **0** | — |
| Pierwsze 48 h | 28–29.07 | 292,88 zł | 4 948 | 59,19 zł | 0,485% | 24 | 2 | 146,44 zł |
| Pierwsze 3 dni | 28–30.07 | 452,51 zł | 7 801 | 58,01 zł | 0,564% | 44 | 2 | 226,25 zł |
| Od restartu do wczoraj (6 dni) | 28.07–02.08 | 1 040,57 zł | 16 484 | 63,13 zł | 0,534% | 88 | **3** | **346,86 zł** |
| Pierwsze 7 dni po restarcie | 28.07–03.08 | **niekompletne** — 7. dzień to dziś | | | | | | |

### Dziś, osobno (dane niepełne)

| Data | Wydatek | Wyśw. | CPM | Kliknięcia | CTR | CTR linku | Kliknięcia linku | Leady |
|---|---|---|---|---|---|---|---|---|
| 2026-08-03 (do 21:45) | **242,98 zł** | 3 177 | 76,48 zł | 63 | 1,98% | 0,598% | 19 | **0** |

> Uwaga: dziś wydano już **242,98 zł przy budżecie dziennym 200 zł**. To normalne — Meta może przekroczyć budżet dzienny do 25% i wyrównuje w skali tygodnia. Ale **7. dzień z rzędu bez leada przy 243 zł wydatku** to najmocniejszy sygnał w całym audycie.

### Porównanie tych samych dni tygodnia

| Dzień | Data (baza 13–19.06) | CPL baza | Leady | Data (teraz 28.07–02.08) | CPL teraz | Leady |
|---|---|---|---|---|---|---|
| poniedziałek | 15.06 | 21,72 zł | 7 | — (28.07 to wtorek) | — | — |
| wtorek | 16.06 | 32,28 zł | 5 | 28.07 | brak leada | 0 |
| środa | 17.06 | 38,77 zł | 4 | 29.07 | 123,68 zł | 2 |
| czwartek | 18.06 | 39,97 zł | 3 | 30.07 | brak leada | 0 |
| piątek | 19.06 | 57,31 zł | 2 | 31.07 | 196,90 zł | 1 |
| sobota | 13.06 | 64,89 zł | 2 | 01.08 | brak leada | 0 |
| niedziela | 14.06 | 53,28 zł | 3 | 02.08 | brak leada | 0 |

**Wniosek:** różnica nie wynika z układu dni tygodnia. Każdy dzień tygodnia po restarcie wypada gorzej niż jego odpowiednik w bazie.

---

## 5. WYNIKI DZIEŃ PO DNIU

Pełna tabela dzienna od 14 dni przed wyłączeniem do dnia audytu. Pełny plik: `META_LEADGEN_DANE_DZIENNE.csv` (zawiera też wszystkie dni przerwy jako jawne wiersze z zerem i adnotacją).

| Data | Wydatek | Wyśw. | Zasięg | Częst. | CPM | Klik. | CTR | CPC | Klik. linku | CTR linku | Leady | CPL |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-06-10 | 112,77 | 2 919 | 1 749 | 1,67 | 38,63 | 40 | 1,37% | 2,82 | 13 | 0,445% | 1 | 112,77 |
| 2026-06-11 | 123,76 | 2 486 | 1 732 | 1,44 | 49,78 | 49 | 1,97% | 2,53 | 13 | 0,523% | 3 | 41,25 |
| 2026-06-12 | 99,55 | 2 398 | 1 567 | 1,53 | 41,51 | 44 | 1,83% | 2,26 | 14 | 0,584% | 2 | 49,78 |
| 2026-06-13 | 129,78 | 2 131 | 1 597 | 1,33 | 60,90 | 33 | 1,55% | 3,93 | 11 | 0,516% | 2 | 64,89 |
| 2026-06-14 | 159,84 | 2 694 | 1 917 | 1,41 | 59,33 | 46 | 1,71% | 3,47 | 12 | 0,445% | 3 | 53,28 |
| 2026-06-15 | 152,05 | 2 902 | 1 999 | 1,45 | 52,39 | 42 | 1,45% | 3,62 | 19 | 0,655% | 7 | 21,72 |
| 2026-06-16 | 161,40 | 2 777 | 1 966 | 1,41 | 58,12 | 57 | 2,05% | 2,83 | 19 | 0,684% | 5 | 32,28 |
| 2026-06-17 | 155,09 | 3 386 | 2 453 | 1,38 | 45,80 | 60 | 1,77% | 2,58 | 20 | 0,591% | 4 | 38,77 |
| 2026-06-18 | 119,90 | 2 382 | 1 789 | 1,33 | 50,34 | 49 | 2,06% | 2,45 | 12 | 0,504% | 3 | 39,97 |
| 2026-06-19 | 114,62 | 2 129 | 1 586 | 1,34 | 53,84 | 33 | 1,55% | 3,47 | 11 | 0,517% | 2 | 57,31 |
| 2026-06-20 | 115,22 | 1 795 | 1 277 | 1,41 | 64,19 | 36 | 2,01% | 3,20 | 11 | 0,613% | 2 | 57,61 |
| 2026-06-21 | 193,57 | 2 994 | 1 765 | 1,70 | 64,65 | 72 | 2,40% | 2,69 | 25 | 0,835% | 5 | 38,71 |
| 2026-06-22 | 143,36 | 2 440 | 1 610 | 1,52 | 58,75 | 37 | 1,52% | 3,87 | 13 | 0,533% | 1 | 143,36 |
| 2026-06-23 | 116,06 | 1 847 | 1 200 | 1,54 | 62,84 | 25 | 1,35% | 4,64 | 6 | 0,325% | 0 | — |
| **2026-06-24** | 47,17 | 672 | 507 | 1,33 | 70,19 | 10 | 1,49% | 4,72 | 4 | 0,595% | 0 | — |
| *2026-06-25 → 2026-07-27* | *0,00* | *0* | *0* | — | — | *0* | — | — | *0* | — | *0* | — |
| **2026-07-28** | 45,53 | 715 | 546 | 1,31 | 63,68 | 9 | 1,26% | 5,06 | 3 | 0,420% | 0 | — |
| 2026-07-29 | 247,35 | 4 233 | 2 519 | 1,68 | 58,43 | 69 | 1,63% | 3,58 | 21 | 0,496% | 2 | 123,68 |
| 2026-07-30 | 159,63 | 2 853 | 1 931 | 1,48 | 55,95 | 56 | 1,96% | 2,85 | 20 | 0,701% | 0 | — |
| 2026-07-31 | 196,90 | 3 248 | 2 220 | 1,46 | 60,62 | 56 | 1,72% | 3,52 | 24 | 0,739% | 1 | 196,90 |
| 2026-08-01 | 197,38 | 2 698 | 1 813 | 1,49 | 73,16 | 34 | 1,26% | 5,81 | 12 | 0,445% | 0 | — |
| 2026-08-02 | 193,78 | 2 737 | 1 870 | 1,46 | 70,80 | 30 | 1,10% | 6,46 | 8 | 0,292% | 0 | — |
| **2026-08-03** *(niepełny)* | 242,98 | 3 177 | 2 366 | 1,34 | 76,48 | 63 | 1,98% | 3,86 | 19 | 0,598% | 0 | — |

**Sekwencja leadów po restarcie: 0, 2, 0, 1, 0, 0, 0.** Siedem dni, 1 283,55 zł, **3 leady**.

---

## 6. WYNIKI WEDŁUG ZESTAWU REKLAM

Kampania ma **jeden zestaw** — cały budżet i wszystkie wyniki są w nim. Nie ma więc konkurencji między zestawami ani problemu fragmentacji budżetu wewnątrz kampanii.

| Pole | Wartość |
|---|---|
| ID / nazwa | `120250261422330581` / Cała polska |
| Status / dostarczanie | ACTIVE / active |
| Faza uczenia / learning limited | **BRAK DANYCH** (`delivery_sub_status` nie zwróciło wartości) |
| Budżet dzienny | 200,00 zł |
| Wydatek lifetime (27.05–03.08) | 4 769,31 zł |
| Strategia licytacji | Highest volume |
| Zdarzenie optymalizacyjne | LEAD_GENERATION (od dziś 11:57); wcześniej QUALITY_LEAD |
| Miejsce konwersji | Instant Form |
| Okno atrybucji | 1d_view_7d_click |
| Lokalizacja | Polska |
| Wiek / płeć / język | 18–65 / wszystkie / brak (od dziś 11:58) |
| Grupy niestandardowe / lookalike | brak |
| Wykluczenia | `24.07 Wyklucza form` |
| Advantage Audience | ON |
| Placementy | automatyczne (FB + IG + Audience Network) |
| Harmonogram | ciągły |
| Utworzony / ostatnia istotna edycja | 2026-05-27 15:37 / **2026-08-03 11:59** |
| Udział w wydatku kampanii | **100%** |
| Leady lifetime / udział | **81 / 100%** |
| CPL lifetime | 58,88 zł |
| CPQL / CAC | **BRAK DANYCH** |

**Nakładanie się grup:** w okresie przerwy (09.07–28.07) działały równolegle inne kampanie leadowe na tym samym koncie, na tę samą ofertę (`Kampania leadowa KM 09.07` — 2 135 zł / 9 leadów / CPL 237 zł; `24.07 LEAD-GEN MOJA` — 435 zł / 2 leady; `Kampania TEST LEAD 26.07` — 154 zł / 1 lead). Od 28.07 równolegle działają dwie kampanie sprzedażowe (`Sprzedaż szkolenie Claude` — 2 654 zł lifetime, ACTIVE; `REM KURS SPRZEDAŻ` — ACTIVE), które konkurują o tę samą polską grupę i o budżet konta. **Precyzyjny pomiar nakładania się grup: BRAK DANYCH** (niedostępne przez MCP).

---

## 7. WYNIKI WEDŁUG REKLAMY

Wszystkie **22 reklamy**, które kiedykolwiek wydały budżet w tej kampanii. Pełne dane: `META_LEADGEN_WYNIKI_REKLAM.csv` (osobne wiersze dla lifetime, okresu po restarcie i okresu przed pauzą).

### Lifetime (2026-05-27 → 2026-08-03)

| # | Reklama | ID | Format | Status | Wydatek | Udział | Wyśw. | Częst. | CPM | CTR | Klik. linku | Leady | CPL | Konw. klik→lead |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Grafika 966 leadów | `120250264318640581` | obraz | ACTIVE | 2 073,61 zł | **43,5%** | 38 631 | 2,60 | 53,68 | 1,69% | 223 | **36** | 57,60 zł | 16,1% |
| 2 | Grafika 4,18 zł za leada | `120250264318630581` | obraz | ACTIVE | 827,77 zł | 17,4% | 13 064 | 1,81 | 63,36 | 1,97% | 75 | **16** | 51,74 zł | 21,3% |
| 3 | KREDYTY 3 | `120250997888440581` | obraz | ARCHIVED | 497,33 zł | 10,4% | 10 117 | 2,49 | 49,16 | 1,27% | 46 | 11 | 45,21 zł | 23,9% |
| 4 | Zajebiste wideo | `120250540270620581` | wideo | ACTIVE | 388,86 zł | 8,2% | 6 773 | 1,73 | 57,41 | 1,46% | 46 | 6 | 64,81 zł | 13,0% |
| 5 | 1 Kredyty NOWE 09.06 | `120251313146890581` | obraz | ARCHIVED | 159,28 zł | 3,3% | 4 293 | 1,80 | 37,10 | 1,58% | 25 | 3 | 53,09 zł | 12,0% |
| 6 | Wideo google sheets | `120250419453900581` | wideo | ARCHIVED | 124,41 zł | 2,6% | 1 960 | 1,51 | 63,47 | 1,07% | 6 | 2 | 62,21 zł | 33,3% |
| 7 | OZE kreacja | `120252023481510581` | obraz | ARCHIVED | 106,68 zł | 2,2% | 2 144 | 2,28 | 49,76 | **2,89%** | 27 | 2 | 53,34 zł | 7,4% |
| 8 | KREDYTY 1 | `120250997578340581` | obraz | ARCHIVED | 100,48 zł | 2,1% | 2 108 | 1,67 | 47,67 | 1,52% | 8 | 2 | 50,24 zł | 25,0% |
| 9 | KREDYTY 2 | `120250997888430581` | obraz | ARCHIVED | 69,47 zł | 1,5% | 1 595 | 1,60 | 43,55 | 1,38% | 7 | 1 | 69,47 zł | 14,3% |
| 10 | Dodatkowe Wideo | `120253607230510581` | wideo | ACTIVE | 61,49 zł | 1,3% | 788 | 1,30 | 78,03 | 1,78% | 7 | **0** | — | 0% |
| 11 | 4 Kredyty NOWE 09.06 | `120251313146880581` | obraz | ARCHIVED | 60,77 zł | 1,3% | 1 480 | 1,54 | 41,06 | 0,88% | 5 | 0 | — | 0% |
| 12 | 22 zł za leada | `120252023481530581` | obraz | ARCHIVED | 60,15 zł | 1,3% | 1 036 | 1,36 | 58,06 | 2,12% | 8 | 0 | — | 0% |
| 13 | 3 Kredyty NOWE 09.06 | `120251313146910581` | obraz | ARCHIVED | 55,85 zł | 1,2% | 1 023 | 1,52 | 54,59 | 1,27% | 5 | 0 | — | 0% |
| 14 | Grafika 966 leadów 4 | `120252253193590581` | obraz | ARCHIVED | 43,97 zł | 0,9% | 611 | 1,31 | 71,96 | 1,80% | 0 | 0 | — | — |
| 15 | Kredyty grafika 20.06 | `120252023481470581` | obraz | ARCHIVED | 38,62 zł | 0,8% | 631 | 1,47 | 61,20 | 1,27% | 0 | 0 | — | — |
| 16 | Grafika 966 leadów 3 | `120252253193580581` | obraz | ARCHIVED | 27,18 zł | 0,6% | 490 | 1,28 | 55,47 | 1,43% | 3 | 0 | — | 0% |
| 17 | Wideo 41 leadów w 24h | `120250265232910581` | wideo | ARCHIVED | 21,12 zł | 0,4% | 119 | 1,40 | **177,48** | 0,84% | 0 | 0 | — | — |
| 18 | Grafika 46 leadów w 24h | `120250261422320581` | obraz | ARCHIVED | 18,97 zł | 0,4% | 227 | 1,19 | 83,57 | 2,64% | 1 | 0 | — | 0% |
| 19 | Grafika 966 leadów 2 | `120252253193570581` | obraz | ARCHIVED | 11,94 zł | 0,3% | 154 | 1,18 | 77,53 | 0,00% | 0 | 0 | — | — |
| 20 | 2 Kredyty NOWE 09.06 | `120251313146900581` | obraz | ARCHIVED | 10,23 zł | 0,2% | 279 | 1,23 | 36,67 | 2,15% | 5 | 1 | **10,23 zł** | 20,0% |
| 21 | Przepalasz budżet na reklamy | `120252024057140581` | obraz | ARCHIVED | 8,92 zł | 0,2% | 18 | 1,13 | 495,56 | 11,11% | 1 | 1 | **8,92 zł** | 100% |
| 22 | Grafika zdjęcie kartki | `120250264318650581` | obraz | ARCHIVED | 2,40 zł | 0,1% | 39 | 1,11 | 61,54 | 2,56% | 0 | 0 | — | — |
| | **RAZEM** | | | | **4 769,50 zł** | 100% | 84 394+ | | | | 501 | **81** | **58,88 zł** | 16,2% |

> Pozycje 20 i 21 mają CPL 10,23 zł i 8,92 zł, ale przy 279 i **18 wyświetleniach**. To szum statystyczny, nie sygnał. **Nie należy uznawać żadnej z tych reklam za zwycięzcę.**
> Pozycje 14–19 i 22 nie dostały praktycznie żadnej emisji. Zgodnie z zasadą audytu — **to nie znaczy, że są słabe**; Meta po prostu nie przydzieliła im budżetu, bo w jednym zestawie z 22 reklamami algorytm koncentruje wydatek na 2–4 pozycjach. Brak emisji wynika tu z **dystrybucji budżetu**, nie ze statusu ani z odrzucenia (`ads_get_errors` zwróciło pusty wynik — **żadnych błędów dostarczania, odrzuceń ani ograniczeń**).

### Te same reklamy: przed pauzą vs po restarcie

| Reklama | Okres | Wydatek | Wyśw. | CPM | CTR | Klik. linku | Leady | CPL | Konw. klik→lead |
|---|---|---|---|---|---|---|---|---|---|
| **Grafika 966 leadów** | przed pauzą (27.05–24.06) | 1 467,34 zł | 28 119 | 52,18 | 1,77% | 173 | **34** | **43,16 zł** | **19,7%** |
| | po restarcie (28.07–02.08) | 527,80 zł | 9 403 | 56,13 | 1,44% | 45 | **2** | **263,90 zł** | **4,4%** |
| **Grafika 4,18 zł za leada** | przed pauzą | 348,67 zł | 6 205 | 56,19 | 2,26% | 38 | **15** | **23,24 zł** | **39,5%** |
| | po restarcie | 344,85 zł | 5 095 | 67,68 | 1,63% | 28 | **1** | **344,85 zł** | **3,6%** |
| **Zajebiste wideo** | przed pauzą | 251,98 zł | 5 262 | 47,89 | 1,27% | 33 | **6** | **42,00 zł** | **18,2%** |
| | po restarcie | 109,97 zł | 1 237 | 88,90 | 2,02% | 9 | **0** | — | **0%** |

**To jest sedno diagnozy.** Te same reklamy (te same nazwy, te same ID), przy porównywalnym wydatku i porównywalnym ruchu, **przestały konwertować**. „Grafika 4,18 zł za leada" wydała niemal identyczną kwotę w obu okresach (348,67 zł vs 344,85 zł) i dowiozła **15 leadów vs 1**.

---

## 8. ANALIZA KREACJI

### Kreacje aktywne po restarcie

| Reklama | Format | Nagłówek | CTA | Hook / pierwsze zdanie | Kąt komunikacji | Problem odbiorcy | Obietnica / mechanizm | Social proof | Etap lejka / świadomość |
|---|---|---|---|---|---|---|---|---|---|
| Grafika 966 leadów | obraz | „966 leadów dla mojego klienta" | Dowiedz się więcej | „Wiesz dlaczego widzisz tą reklamę? Bo Twoja firma potrzebuje więcej leadów." | pattern interrupt + autorytet | za mało leadów | umiem zmusić algorytm Mety + formularz odsiewa | 966 leadów, „70% większa skuteczność niż konkurencja" | problem-aware → solution-aware |
| Grafika 4,18 zł za leada | obraz | „Pozyskałem 92 leady w cenie 4,18 zł" | Dowiedz się więcej | „92 leady. 4,18 zł za sztukę. Dużo?" | dowód liczbowy | drogi lead | targetowanie + odsiewanie | 92 leady po 4,18 zł, „odezwę się w mniej niż 10 minut" | solution-aware |
| Zajebiste wideo | wideo | „Generuj więcej jakościowych LEADÓW" | Dowiedz się więcej | „Ile kosztuje Cię każdy dzień bez nowych leadów?" | koszt bezczynności | pusty grafik handlowców | 41 leadów w 24 h | 41 leadów w 24 h | problem-aware |
| Dodatkowe Wideo | wideo | „Potrafię pozyskać jakościowe leady" | Dowiedz się więcej | „🔥🎯 Możesz mieć kilka, kilkanaście i kilkadziesiąt wartościowych leadów każdego dnia. SERIO!" | obietnica + brak presji | za mało klientów | zadzwonię i opowiem, bez wciskania | brak konkretnej liczby | unaware → problem-aware |

**Wszystkie 4 aktywne reklamy mają identyczne CTA (`LEARN_MORE`), ten sam kąt („dowożę tanie i jakościowe leady"), tę samą personę (właściciel firmy / doradca finansowy) i ten sam dowód (screen z liczbą leadów).** To znaczące ryzyko: przy jednym zestawie i czterech wariantach tego samego konceptu algorytm nie ma między czym wybierać, a odbiorca widzi w praktyce jedną reklamę.

### Dystrybucja budżetu między kreacjami (28.07–02.08)

| Reklama | Wydatek | Udział |
|---|---|---|
| Grafika 966 leadów | 527,80 zł | **50,7%** |
| Grafika 4,18 zł za leada | 344,85 zł | 33,1% |
| Zajebiste wideo | 109,97 zł | 10,6% |
| Dodatkowe Wideo | 57,95 zł | 5,6% |

Dwie kreacje graficzne zabierają **84% budżetu**. Wideo („Dodatkowe Wideo") dostało 58 zł w 6 dni — za mało, żeby cokolwiek o nim orzec.

### Zmęczenie kreacji

| Sygnał | Odczyt |
|---|---|
| Częstotliwość 28.07–02.08 | **2,48 (FB) / 2,24 (IG)** przy 6 dniach — wysoko jak na tydzień |
| Częstotliwość „Grafika 966 leadów" lifetime | **2,60** |
| Trend CTR linku w okresie D | 0,420% → 0,496% → 0,701% → 0,739% → 0,445% → **0,292%** (02.08) |
| Trend CPM w okresie D | 63,68 → 58,43 → 55,95 → 60,62 → **73,16 → 70,80** |
| Trend CPC linku w okresie D | 15,18 → 12,20 → 7,98 → 8,20 → **16,45 → 24,22** |

**Odczyt:** w dniach 01–02.08 widać klasyczny wzorzec zmęczenia — **CTR spada, CPM i CPC rosną jednocześnie**. To realny sygnał, ale wyjaśnia tylko końcówkę okresu, nie całość problemu (patrz sekcja 12: CTR odpowiada za 2,6% zmiany CPL).

### Kluczowe ustalenie o kreacjach: podmiana 28.07

**Wszystkie 9 aktywnych reklam dostało 28.07 o 17:48 nowe `creative_id`.** Przykłady:

| Reklama | Stare creative_id | Nowe creative_id |
|---|---|---|
| Grafika 966 leadów | `2503459996760172` | `4507964006107118` |
| Grafika 4,18 zł za leada | `2447231149086322` | `1373958244800023` |
| Zajebiste wideo | `2089076122027610` | `1801766904578819` |
| Grafika 966 leadów 2/3/4 | `1998752494075377` / `2058216368146986` / `2401785224784893` | `1049724354190732` / `1665769604489427` / `1032691296185309` |
| Przepalasz budżet | `2195089154583409` | `2044339556448507` |
| 2 Kredyty NOWE | `1335795027913933` | `1394442742546813` |
| KREDYTY 3 | `2001769833798488` | `1623583403108650` |

Konsekwencja: **nowe `effective_object_story_id` = nowe posty = zerowa historia społeczna** (polubienia, komentarze, udostępnienia z 4 tygodni emisji przepadły). Wszystkie nazwy kreacji mają sufiks `2026-07-28`. To nie jest „ta sama kampania wznowiona" — to **kampania z nowymi kreacjami w starym opakowaniu**.

Wcześniej ten sam zabieg wykonano 05.06 (3 reklamy) i 22.06 (6 reklam). Warto zauważyć: po podmianie z 22.06 CPL w kolejnych dniach też się posypał (22.06 — 143,36 zł, 23.06 — 0 leadów, 24.06 — 0 leadów), po czym kampania została wyłączona.

### Jakość leadów według kreacji

**BRAK DANYCH** — wymaga CRM.

---

## 9. ANALIZA FORMULARZA / LANDINGU

Kampania prowadzi do **formularza błyskawicznego na Meta (Instant Form)**, nie na stronę. Potwierdzenie: leady raportowane jako `onsite_conversion.lead_grouped`; kreatywy nie mają `link_url`; `landing_page_view` występuje śladowo (1–3 dziennie, to przypadkowe kliknięcia w profil/link w tekście).

### Przebieg od kliknięcia do leada — co da się zmierzyć

| Krok | 13–19.06 (baza) | 28.07–02.08 | Zmiana |
|---|---|---|---|
| Wyświetlenia | 18 401 | 16 484 | −10,4% |
| Kliknięcia (all) | 320 | 254 | −20,6% |
| **Kliknięcia linku (= otwarcia formularza)** | **104** | **88** | **−15,4%** |
| Otwarcia formularza (metryka Meta) | BRAK DANYCH | BRAK DANYCH | — |
| Rozpoczęcia formularza | BRAK DANYCH | BRAK DANYCH | — |
| **Ukończenia formularza (= leady)** | **26** | **3** | **−88,5%** |
| **Współczynnik ukończenia (klik linku → lead)** | **25,0%** | **3,4%** | **−86,4%** |
| Koszt otwarcia formularza (CPC linku) | 9,54 zł | 11,82 zł | +23,9% |
| Koszt ukończenia (CPL) | 38,18 zł | 346,86 zł | +808,5% |

> Uwaga metodologiczna: `kliknięcia linku` to najbliższy dostępny odpowiednik „otwarć formularza". Meta liczy je nie zawsze 1:1 z otwarciem Instant Form, ale trend i rząd wielkości są miarodajne — zwłaszcza że mianownik zmienił się o −15%, a licznik o −88%.

### Czego nie da się sprawdzić

| Element | Status |
|---|---|
| ID i nazwa formularza | **BRAK DANYCH** |
| Typ formularza (More volume / Higher intent) | **BRAK DANYCH** |
| Wszystkie pytania | **BRAK DANYCH** |
| Pola kontaktowe | **BRAK DANYCH** |
| Pytania kwalifikujące | **BRAK DANYCH** |
| Logika warunkowa | **BRAK DANYCH** |
| Ekran powitalny / podsumowania / końcowy | **BRAK DANYCH** |
| Polityka prywatności | **BRAK DANYCH** |
| Końcowe CTA | **BRAK DANYCH** |
| Otwarcia / rozpoczęcia formularza (metryki natywne) | **BRAK DANYCH** |
| Czy formularz zmieniono przed lub po restarcie | **BRAK DANYCH** |
| Czy różne reklamy prowadzą do różnych formularzy | **BRAK DANYCH** |

**Przyczyna:** Meta Ads MCP nie udostępnia narzędzia do odczytu Lead Gen Forms, a pola `lead_gen_form_id` nie ma w zwracanych kreatywach. Katalog pól metryk (`ads_get_field_context`) nie zawiera `leadgen_form_open` / `_start` / `_complete`.

> ⚠️ **To najpoważniejsza luka tego audytu.** Cała diagnoza wskazuje na krok „otwarcie formularza → wysłanie", a to jest dokładnie ten krok, którego nie mogę zmierzyć od środka.

---

## 10. ANALIZA JAKOŚCI I SPRZEDAŻY

**BRAK DANYCH — w całości.** Nie dostarczono żadnego źródła CRM, arkusza ani eksportu leadów. Zgodnie z zasadą audytu **nie oceniam rentowności ani jakości leadów**.

Nie da się policzyć: liczby duplikatów, błędnych danych, leadów spamowych, contact rate, mediany i percentyla 90 czasu pierwszego kontaktu, liczby prób kontaktu, qualified rate, CPQL, umówionych rozmów, kosztu rozmowy, show rate, liczby klientów, close rate, CAC, przychodu, marży, ROAS, powodów dyskwalifikacji i przegranej.

Nie da się też porównać liczby leadów Meta z liczbą leadów w CRM ani wyjaśnić ewentualnych różnic, opóźnień i braków.

### Co dokładnie musisz dostarczyć

Eksport CSV/arkusz z jednym wierszem na lead i kolumnami:

```
lead_id, data_utworzenia_leada (data+godzina), campaign_id, campaign_name,
adset_id, ad_id, ad_name, platform, placement,
czy_duplikat (0/1), czy_dane_bledne (0/1), czy_spam (0/1),
data_pierwszej_proby_kontaktu, liczba_prob_kontaktu, czy_nawiazano_kontakt (0/1),
status_kwalifikacji (kwalifikowany/niekwalifikowany), powod_dyskwalifikacji,
czy_umowiono_rozmowe (0/1), data_rozmowy, czy_sie_stawil (0/1),
czy_klient (0/1), data_sprzedazy, przychod_netto, marza, powod_przegranej
```

**Bez tego nie da się odpowiedzieć na najważniejsze pytanie audytu: czy niższy CPL sprzed pauzy oznaczał też niższy CPQL i CAC — czy tanie leady z czerwca były bezwartościowe, a rozdmuchany CPL z sierpnia dotyczy leadów lepszych.** Ta niepewność dotyka bezpośrednio ustalenia nr 2 (patrz sekcja 13).

---

## 11. BREAKDOWNY (2026-07-28 → 2026-08-02)

### Platforma

| Platforma | Wydatek | Udział | Wyśw. | Zasięg | Częst. | CPM | CTR | Klik. linku | Leady | CPL |
|---|---|---|---|---|---|---|---|---|---|---|
| Facebook | 780,05 zł | **75,0%** | 12 206 | 4 922 | 2,48 | 63,91 zł | 1,72% | 62 | **3** | 260,02 zł |
| Instagram | 260,52 zł | 25,0% | 4 278 | 1 909 | 2,24 | 60,90 zł | 1,03% | 26 | **0** | — |
| Audience Network | **0,00 zł** | 0% | 0 | — | — | — | — | — | 0 | — |

> Audience Network jest **włączony w ustawieniach, ale nie dostał ani jednego wyświetlenia**. Nie jest źródłem problemu.

### Placement

| Placement | Wydatek | Udział | Wyśw. | CTR | Klik. linku | Leady | CPL |
|---|---|---|---|---|---|---|---|
| Facebook Feed | 528,13 zł | **50,8%** | 8 843 | 1,97% | 41 | 2 | 264,07 zł |
| Facebook Reels | 245,52 zł | **23,6%** | 3 111 | 1,00% | 19 | 1 | 245,52 zł |
| Instagram Stories | 120,29 zł | 11,6% | 2 102 | 1,05% | 13 | 0 | — |
| Instagram Reels | 70,83 zł | 6,8% | 1 248 | 1,44% | 12 | 0 | — |
| Facebook Stories | 61,92 zł | 6,0% | 852 | 0,82% | 3 | 0 | — |
| Instream video | 8,20 zł | 0,8% | 88 | 1,14% | — | 0 | — |
| FB Reels overlay | 2,06 zł | 0,2% | 111 | 0,00% | — | 0 | — |
| FB profile feed | 2,01 zł | 0,2% | 66 | 1,52% | — | 0 | — |
| Marketplace | 1,36 zł | 0,1% | 45 | 0,00% | — | 0 | — |
| IG Explore | 0,25 zł | 0,0% | 16 | 0,00% | — | 0 | — |
| Search | 0,00 zł | 0,0% | 2 | 0,00% | — | 0 | — |

> **Sygnał wart uwagi (próba za mała na twardy wniosek):** placementy typu Stories/Reels wzięły łącznie **498,56 zł (47,9% budżetu)** i dowiozły **1 lead**. Feed wziął 528,13 zł i dowiózł 2. Formaty pionowe z szybkim scrollem historycznie źle konwertują na Instant Form.

### Urządzenie

| Urządzenie | Wydatek | Wyśw. | CPM | CTR | Klik. linku | Leady | CPL |
|---|---|---|---|---|---|---|---|
| Android smartphone | 588,62 zł | 7 576 | **77,70 zł** | 1,62% | 34 | 1 | 588,62 zł |
| iPhone | 449,13 zł | 8 864 | **50,67 zł** | 1,48% | 54 | 2 | 224,57 zł |
| iPad | 1,83 zł | 28 | — | 0,00% | — | 0 | — |
| Android tablet | 0,96 zł | 15 | — | 0,00% | — | 0 | — |
| other | 0,03 zł | 1 | — | — | — | 0 | — |

> Android kosztuje **+53% więcej za tysiąc wyświetleń** niż iPhone i dowozi mniej. Próba za mała na wniosek o leadach, ale różnica CPM jest strukturalna i realna.

### Wiek

| Wiek | Wydatek | Udział | Wyśw. | CPM | CTR | Klik. linku | Leady | CPL |
|---|---|---|---|---|---|---|---|---|
| 18–24 | 122,23 zł | 11,7% | 3 247 | **37,64 zł** | 1,79% | 22 | 1 | 122,23 zł |
| 25–34 | 292,34 zł | 28,1% | 6 264 | 46,67 zł | 1,50% | 29 | 1 | 292,34 zł |
| 35–44 | 286,06 zł | 27,5% | 4 244 | 67,40 zł | 1,23% | 20 | **0** | — |
| 45–54 | 256,37 zł | 24,6% | 1 962 | **130,67 zł** | 1,89% | 11 | 1 | 256,37 zł |
| 55–64 | 54,49 zł | 5,2% | 575 | 94,77 zł | 1,74% | 6 | 0 | — |
| 65+ | 29,08 zł | 2,8% | 192 | 151,46 zł | 1,56% | — | 0 | — |

> **To dane z okresu, gdy zestaw był ustawiony na wiek 35–60 i tylko mężczyzn.** Mimo to **39,8% budżetu poszło na 18–34** i 2,8% na 65+. Powód: **Advantage+ Audience jest ON** — Meta traktuje ustawienie wieku i płci jako sugestię, nie twarde ograniczenie, i wychodzi poza nie.
> Wiek 45–54 ma CPM **130,67 zł** — 3,5× więcej niż 18–24 — i skonsumował 24,6% budżetu przy 1 962 wyświetleniach.

### Płeć

| Płeć | Wydatek | Udział | Wyśw. | CPM | CTR | Klik. linku | Leady | CPL |
|---|---|---|---|---|---|---|---|---|
| mężczyźni | 853,62 zł | **82,0%** | 13 876 | 61,52 zł | 1,48% | 68 | 3 | 284,54 zł |
| kobiety | 182,03 zł | **17,5%** | 2 534 | 71,84 zł | **1,89%** | 20 | 0 | — |
| nieznana | 4,92 zł | 0,5% | 74 | — | 1,35% | — | 0 | — |

> Zestaw był ustawiony na **tylko mężczyzn**, a mimo to **17,5% budżetu poszło na kobiety** — kolejny dowód, że Advantage+ Audience przekracza zdefiniowane targetowanie.

### Region (17 województw, próba na segment: 12–3 317 wyświetleń)

| Region | Wydatek | Wyśw. | CTR | Leady |
|---|---|---|---|---|
| Mazowieckie | 224,84 zł | 3 317 | 1,42% | 0 |
| Śląskie | 128,73 zł | 1 929 | 1,92% | 0 |
| Małopolskie | 125,68 zł | 1 818 | 1,71% | 0 |
| Wielkopolskie | 90,63 zł | 1 694 | 1,71% | 0 |
| Dolnośląskie | 87,03 zł | 1 490 | 1,48% | 0 |
| Pomorskie | 65,77 zł | 1 002 | 1,80% | 0 |
| Łódzkie | 50,45 zł | 833 | 1,68% | 0 |
| Zachodniopomorskie | 43,66 zł | 473 | 1,48% | 0 |
| Lubelskie | 41,68 zł | 603 | 1,49% | 0 |
| Podkarpackie | 38,81 zł | 756 | 0,66% | 0 |
| Lubuskie | 33,43 zł | 302 | 1,99% | 0 |
| Kujawsko-pomorskie | 32,20 zł | 765 | 0,92% | 0 |
| Podlaskie | 26,60 zł | 384 | 1,04% | 0 |
| Warmińsko-mazurskie | 22,85 zł | 462 | 1,52% | 0 |
| Świętokrzyskie | 16,95 zł | 384 | 0,78% | 0 |
| Opolskie | 11,07 zł | 260 | 3,08% | 0 |
| Unknown | 0,19 zł | 12 | — | 0 |

> **Wszystkie 3 leady wypadły poza podziałem regionalnym** (Meta nie przypisała ich do województwa w tym breakdownie). Próba na region: **0 leadów w każdym segmencie**. **Żadnego wniosku regionalnego nie da się wyciągnąć.**

### Godzina emisji (strefa konta)

| Godzina | Wydatek | Wyśw. | CPM | CTR | Leady |
|---|---|---|---|---|---|
| 09:00–09:59 | 101,94 zł | 1 249 | 81,62 zł | **2,64%** | 1 |
| 11:00–11:59 | 85,14 zł | 1 051 | 81,01 zł | 2,28% | 0 |
| 22:00–22:59 | 71,52 zł | 1 244 | 57,49 zł | 1,45% | 0 |
| 10:00–10:59 | 63,20 zł | 1 021 | 61,90 zł | 1,47% | 0 |
| 18:00–18:59 | 59,20 zł | 1 007 | 58,79 zł | 1,49% | 0 |
| 08:00–08:59 | 57,97 zł | 939 | 61,74 zł | 0,85% | 0 |
| 17:00–17:59 | 56,27 zł | 1 235 | 45,56 zł | 2,02% | 0 |
| 21:00–21:59 | 54,83 zł | 975 | 56,24 zł | 1,33% | 0 |
| 23:00–23:59 | 54,69 zł | 872 | 62,72 zł | 1,26% | 0 |
| 15:00–15:59 | 53,58 zł | 734 | 73,00 zł | 1,36% | 0 |
| 12:00–12:59 | 49,68 zł | 880 | 56,45 zł | 1,82% | 0 |
| 16:00–16:59 | 42,98 zł | 763 | 56,33 zł | 1,70% | 1 |
| 19:00–19:59 | 38,68 zł | 792 | 48,84 zł | 1,01% | 0 |
| 14:00–14:59 | 38,75 zł | 664 | 58,36 zł | 1,05% | 0 |
| 20:00–20:59 | 37,94 zł | 688 | 55,15 zł | **0,44%** | 1 |
| 07:00–07:59 | 37,25 zł | 478 | 77,93 zł | 1,26% | 0 |
| 13:00–13:59 | 36,22 zł | 628 | 57,68 zł | 1,59% | 0 |
| 06:00–06:59 | 27,01 zł | 315 | 85,75 zł | 2,22% | 0 |
| 00:00–00:59 | 25,80 zł | 396 | 65,15 zł | 1,01% | 0 |
| 02:00–02:59 | 20,85 zł | 130 | **160,38 zł** | 2,31% | 0 |
| 01:00–01:59 | 14,16 zł | 218 | 64,95 zł | 0,46% | 0 |
| 05:00–05:59 | 6,63 zł | 89 | 74,49 zł | 3,37% | 0 |
| 03:00–03:59 | 3,51 zł | 62 | 56,61 zł | 1,61% | 0 |
| 04:00–04:59 | 2,77 zł | 54 | 51,30 zł | 0,00% | 0 |

> **W nocy (00:00–05:59) poszło 73,72 zł (7,1% budżetu) i 0 leadów.** Godziny 02:00–02:59 mają CPM 160 zł. Próba za mała na twardy wniosek, ale kierunek jednoznaczny.
> Breakdown godzinowy nie zwraca zasięgu ani leadów w sposób pełny — 1 z 3 leadów nie ma przypisanej godziny w tym rozbiciu.

### Dzień tygodnia

Patrz tabela w sekcji 4 — porównanie odpowiadających sobie dni tygodnia nie wyjaśnia różnicy.

---

## 12. ROZKŁAD ZMIANY CPL

Zależność: **CPL = CPM / (1000 × CTR linku × konwersja kliknięcie→lead)**
Baza: **13–19.06** (ostatnie stabilne 7 dni przed wyłączeniem). Stan obecny: **27.07–02.08**.
Metoda: dekompozycja logarytmiczna (multiplikatywna) — udziały sumują się do 100%.

| Czynnik | Wartość bazowa | Wartość obecna | Zmiana czynnika | Udział w zmianie CPL |
|---|---|---|---|---|
| **CPM** | 53,95 zł | 63,13 zł | **+17,0%** | **7,1%** |
| **CTR linku** | 0,565% | 0,534% | **−5,5%** | **2,6%** |
| **Konwersja kliknięcie → lead** | **25,0%** | **3,4%** | **−86,4%** | **90,3%** |
| **CPL (kontrola)** | **38,18 zł** | **346,86 zł** | **+808,5%** | **100%** |

Kontrola arytmetyczna: 63,13/1000 ÷ (0,00534 × 0,034) = **346,86 zł** = CPL raportowany. Rekonstrukcja domyka się co do grosza.

### Interpretacja

**Ponad 90% wzrostu CPL nie ma nic wspólnego z aukcją, ceną mediów ani atrakcyjnością kreacji.**

- **Emisja działa.** Wyświetleń jest tylko o 10% mniej, budżet się wydaje w całości (a dziś nawet z nawiązką), nie ma błędów dostarczania, nie ma odrzuceń, nie ma ograniczeń.
- **Aukcja podrożała, ale umiarkowanie.** CPM +17% to normalna sezonowa różnica między połową czerwca a przełomem lipca i sierpnia. Odpowiada za 7,1% problemu.
- **Kreacja nadal klika prawie tak samo.** CTR linku spadł o 5,5% — to szum. Odpowiada za 2,6% problemu.
- **Ludzie, którzy kliknęli, przestali wysyłać formularz.** Z 25,0% do 3,4%. Na 88 kliknięć linku wypadły **3 leady** zamiast oczekiwanych ~22.

Innymi słowy: **kupujesz prawie tyle samo ruchu, w prawie tej samej cenie, o prawie tej samej jakości klikalności — i ten ruch nie zamienia się w leady.** Problem siedzi między kliknięciem a wysłaniem formularza.

### Czynniki, których wpływu NIE da się wiarygodnie rozdzielić

| Czynnik | Status |
|---|---|
| Wpływ struktury kampanii | Jeden zestaw, brak fragmentacji — **wpływ pomijalny** |
| Wpływ dystrybucji budżetu | Zmierzalny częściowo: 84% budżetu na 2 kreacje, 48% na Stories/Reels. **Prawdopodobnie istotny, ale nierozdzielny od reszty przy 3 leadach** |
| Wpływ zmian ustawień | Zmierzalny co do faktu i daty (sekcja 3), **ale nie da się rozdzielić wpływu podmiany kreacji od zmiany wykluczenia od włączenia Advantage+ Audience — wszystkie trzy zaszły w tej samej minucie 28.07 17:48** |
| Wpływ częstotliwości i zmęczenia | Widoczny w dniach 01–02.08 (CTR ↓, CPM ↑, CPC ↑ jednocześnie) — **realny, ale wyjaśnia końcówkę, nie całość** |
| Wpływ jakości leadów | **BRAK DANYCH** |
| Wpływ szybkości kontaktu i procesu sprzedaży | **BRAK DANYCH** |
| Wpływ problemów z pomiarem | Instant Form = konwersja na Meta, minimalne ryzyko utraty pomiaru. **Ryzyko niskie, ale niezerowe** — patrz ustalenie nr 4 |

---

## 13. NAJWAŻNIEJSZE USTALENIA

**Format:** Ustalenie | Dowód liczbowy | Alternatywne wyjaśnienie | Pewność

---

**1. Wzrost CPL w 90% pochodzi z załamania konwersji kliknięcie → lead, nie z aukcji ani kreacji.**
*Dowód:* konwersja 25,0% → 3,4% (−86,4%), udział w zmianie CPL 90,3%. CPM +17,0% (udział 7,1%), CTR linku −5,5% (udział 2,6%). Rekonstrukcja CPL domyka się do grosza: 63,13/1000 ÷ (0,00534 × 0,034) = 346,86 zł.
*Alternatywne wyjaśnienie:* przy 3 leadach mianownik 3,4% jest bardzo niestabilny — gdyby dwa dodatkowe leady doszły w oknie atrybucji 7d_click, konwersja wynosiłaby 5,7%, a CPL 208 zł. Kierunek pozostaje ten sam, skala byłaby mniejsza.
*Pewność:* **WYSOKA co do kierunku i mechanizmu, ŚREDNIA co do dokładnej skali.**

---

**2. Te same reklamy, przy porównywalnym wydatku, przestały konwertować po restarcie.**
*Dowód:* „Grafika 4,18 zł za leada" — przed pauzą 348,67 zł / 38 kliknięć linku / **15 leadów** / CPL 23,24 zł; po restarcie 344,85 zł / 28 kliknięć linku / **1 lead** / CPL 344,85 zł. „Grafika 966 leadów" — 43,16 zł → 263,90 zł CPL przy podobnej strukturze ruchu. „Zajebiste wideo" — 42,00 zł → brak leadów.
*Alternatywne wyjaśnienie:* to nie są te same reklamy w sensie kreatywnym — 28.07 o 17:48 podmieniono `creative_id` na wszystkich 9 aktywnych reklamach. Zmieniła się treść, obraz albo oba. Nazwa i ID reklamy zostały, ale kreacja jest nowa.
*Pewność:* **WYSOKA co do faktu spadku, WYSOKA co do faktu podmiany kreacji, NISKA co do tego, która z tych dwóch rzeczy jest przyczyną.**

---

**3. Advantage+ Audience wypycha emisję poza zdefiniowaną grupę i zjada blisko połowę budżetu.**
*Dowód:* w okresie 28.07–02.08 zestaw był ustawiony na **wiek 35–60, tylko mężczyźni**. Faktyczna emisja: **39,8% budżetu na 18–34 lat**, **17,5% budżetu na kobiety**, 2,8% na 65+. CPM w grupie 45–54 to 130,67 zł vs 37,64 zł w 18–24. Advantage+ Audience został włączony ponownie 28.07 o 17:48 — dokładnie w momencie restartu (przed pauzą był **OFF** od 20.06).
*Alternatywne wyjaśnienie:* to zamierzone i normalne zachowanie Advantage+ Audience; szeroka emisja może z czasem znaleźć tańsze konwersje, jeśli sygnał optymalizacyjny jest poprawny.
*Pewność:* **WYSOKA co do faktu wychodzenia poza grupę, ŚREDNIA co do tego, że to zwiększa CPL.**

---

**4. Kampania optymalizowała się na „Conversion leads" (QUALITY_LEAD) od startu do dziś 11:57 — a dziś to zmieniono.**
*Dowód:* log zmian 2026-05-27 15:37 „Ad set optimization goal updated → **Conversion leads**"; log zmian 2026-08-03 11:57 „**Conversion leads → Leads**" (aplikacja: „ads MCP server"). `QUALITY_LEAD` wymaga sygnału zwrotnego o jakości leada z CRM/offline conversions. **Nie znalazłem żadnego takiego źródła podpiętego do tej kampanii** — w kampanii brak custom conversions i pixel/dataset nie jest używany (Instant Form).
*Alternatywne wyjaśnienie:* Meta mogła mimo to raportować wyniki jako „Leads (form)" i licytować w praktyce na zwykłe leady formularzowe — pole `cost_per_result` pokazywało „Leads (form)" przez cały czas. Możliwe, że QUALITY_LEAD degradował się do zwykłego lead gen bez realnej szkody.
*Pewność:* **WYSOKA co do faktu ustawienia i zmiany, NISKA co do wpływu na wyniki. Wymaga potwierdzenia, czy do konta było kiedykolwiek podpięte źródło jakości leadów.**

---

**5. Dziś dwukrotnie zresetowano fazę uczenia — w ciągu dwóch minut.**
*Dowód:* 2026-08-03 11:57 zmiana zdarzenia optymalizacyjnego; 11:58 zmiana targetowania (usunięto wiek, płeć i język). Obie zmiany na poziomie zestawu, obie resetują fazę uczenia. Zmiany wykonane przez integrację „ads MCP server". Dzisiejszy wydatek do 21:45: 242,98 zł, leadów: 0.
*Alternatywne wyjaśnienie:* przy 3 leadach na 6 dni kampania i tak nigdy nie wyszła z fazy uczenia, więc „reset" nie odbiera jej niczego, co miała.
*Pewność:* **WYSOKA co do faktu, ŚREDNIA co do wpływu — ale te zmiany unieważniają okres 28.07–02.08 jako bazę do dalszych porównań.**

---

**6. Kampania nigdy nie miała szansy wyjść z fazy uczenia po restarcie.**
*Dowód:* 6 pełnych dni, 1 040,57 zł, **3 zdarzenia optymalizacyjne**. Próg wyjścia z fazy uczenia dla zestawu to ok. 50 zdarzeń w 7 dni. Osiągnięto **6%** tego progu. Dla porównania: w okresie bazowym 13–19.06 było 26 leadów w 7 dni — też poniżej progu, ale 8,7× więcej.
*Alternatywne wyjaśnienie:* brak — to arytmetyka.
*Pewność:* **WYSOKA.**
*Zastrzeżenie:* to **skutek**, nie przyczyna. Nie wolno tłumaczyć całego wzrostu CPL „fazą uczenia" — dekompozycja pokazuje, że zawiódł konkretny krok lejka, a nie ogólna „nauka algorytmu".

---

**7. Przerwa trwała 33 dni, a w jej trakcie na koncie działały konkurencyjne kampanie leadowe na tę samą ofertę.**
*Dowód:* przerwa 2026-06-24 12:30 → 2026-07-28 17:42. W tym czasie: `Kampania leadowa KM 09.07` (2 135,22 zł, 9 leadów, CPL **237,25 zł**), `24.07 LEAD-GEN MOJA` (435,07 zł, 2 leady, CPL 217,54 zł), `Kampania TEST LEAD 26.07` (153,78 zł, 1 lead). **Wszystkie miały CPL w przedziale 154–237 zł — czyli problem z drogim leadem istniał na koncie już przed restartem LeadGen 27.05.**
*Alternatywne wyjaśnienie:* to były kampanie testowe z małym budżetem i krótkim czasem życia, więc ich CPL jest naturalnie zawyżony.
*Pewność:* **WYSOKA co do liczb, ŚREDNIA co do wniosku — ale to mocno osłabia tezę, że winna jest sama przerwa lub sam restart.**

---

**8. Blisko połowa budżetu idzie na placementy pionowe (Stories/Reels), które dowiozły 1 lead.**
*Dowód:* Facebook Reels 245,52 zł + Instagram Stories 120,29 zł + Instagram Reels 70,83 zł + Facebook Stories 61,92 zł = **498,56 zł (47,9% budżetu), 1 lead**. Feed: 528,13 zł, 2 leady. CTR na Facebook Reels 1,00% i Facebook Stories 0,82% vs Feed 1,97%.
*Alternatywne wyjaśnienie:* 3 leady łącznie to za mała próba, żeby porównywać placementy; różnica może być przypadkowa.
*Pewność:* **ŚREDNIA co do kierunku, NISKA co do konkretnej liczby.**

---

**9. Instagram wziął 25% budżetu i nie dowiózł ani jednego leada.**
*Dowód:* Instagram 260,52 zł / 4 278 wyświetleń / 26 kliknięć linku / **0 leadów**. Facebook 780,05 zł / 12 206 wyświetleń / 62 kliknięcia linku / 3 leady. CTR: FB 1,72% vs IG 1,03%.
*Alternatywne wyjaśnienie:* 26 kliknięć linku przy bazowej konwersji 25% dałoby oczekiwane ~6,5 leada — zero jest poniżej oczekiwań, ale przy tej próbie prawdopodobieństwo zera to ok. 0,05%. To sygnał, ale nie dowód.
*Pewność:* **ŚREDNIA.**

---

**10. Emisja techniczna jest w porządku — problem nie leży w dostarczaniu.**
*Dowód:* `ads_get_errors` dla kampanii i zestawu: **pusty wynik** — zero błędów dostarczania, odrzuceń, ograniczeń. Status konta ACTIVE. Delivery status „active". Budżet wydaje się w całości i z nawiązką (dziś 242,98 zł przy budżecie 200 zł). Jedyne przerwy: dwie przerwy płatnicze (30.07 — 6 minut, 02.08 — 3 minuty), łącznie **9 minut** w 6 dni.
*Alternatywne wyjaśnienie:* brak.
*Pewność:* **WYSOKA.**

---

**11. Cztery aktywne kreacje to w praktyce jeden koncept.**
*Dowód:* wszystkie 4 mają CTA `LEARN_MORE`, tę samą personę, ten sam kąt („dowożę tanie i jakościowe leady") i ten sam typ dowodu (screen z liczbą leadów: 966 / 92 / 41). Dwie z nich zabierają 84% budżetu. Do tego 3 zarchiwizowane warianty „Grafika 966 leadów 2/3/4" były dosłownymi duplikatami tego samego konceptu.
*Alternatywne wyjaśnienie:* to zamierzona strategia — jeden sprawdzony kąt w wielu wariantach.
*Pewność:* **WYSOKA co do faktu, ŚREDNIA co do tego, że to szkodzi.**

---

**12. Nie da się wykluczyć, że problem leży w samym formularzu — i to jest największa luka tego audytu.**
*Dowód:* cała dekompozycja wskazuje na krok „kliknięcie → wysłanie formularza" (90,3% zmiany CPL). Meta Ads MCP **nie udostępnia** odczytu Lead Gen Forms ani metryk otwarć/rozpoczęć/ukończeń formularza. Nie wiem, czy formularz zmieniono, czy zmieniono pytania, czy zmieniono typ z „More volume" na „Higher intent", czy dodano pytania kwalifikujące, czy zmieniono ekran powitalny.
*Alternatywne wyjaśnienie:* formularz mógł nie zostać w ogóle ruszony, a przyczyna leży wyłącznie w podmianie kreacji i we wpuszczeniu szerokiej grupy przez Advantage+ Audience.
*Pewność:* **WYSOKA co do tego, że problem jest w tym kroku lejka. ZEROWA co do tego, co dokładnie się w nim zepsuło.**

---

## 14. RANKING PRAWDOPODOBNYCH PRZYCZYN

Uszeregowane od najbardziej do najmniej prawdopodobnej. **To diagnoza, nie plan zmian.**

| # | Przyczyna | Siła dowodu | Co ją potwierdza | Co ją osłabia |
|---|---|---|---|---|
| **1** | **Zmiana w formularzu błyskawicznym lub w jego dopasowaniu do nowych kreacji** — załamanie na kroku kliknięcie→wysłanie (−86,4%) | 🔴 najsilniejsza poszlaka, **zerowa weryfikacja** | 90,3% zmiany CPL siedzi dokładnie w tym kroku; ruch i CTR prawie bez zmian | Nie mam żadnego dostępu do danych formularza — nie mogę potwierdzić ani wykluczyć |
| **2** | **Podmiana wszystkich kreacji 28.07 o 17:48** — nowe `creative_id`, nowe posty, zerowa historia społeczna | 🔴 wysoka | Podmieniono 9/9 aktywnych reklam w jednej minucie; ten sam zabieg 22.06 poprzedzał poprzedni spadek | Nowa kreacja sama w sobie nie tłumaczy, czemu CTR został, a konwersja padła |
| **3** | **Ponowne włączenie Advantage+ Audience 28.07** — emisja wychodzi poza grupę: 39,8% budżetu na 18–34, 17,5% na kobiety mimo ustawienia „35–60, mężczyźni" | 🟠 wysoka | Twarde liczby z breakdownów wieku i płci; przed pauzą Advantage+ był OFF od 20.06 | Advantage+ bywa skuteczny; szeroka grupa może z czasem znaleźć tańsze leady |
| **4** | **Podmiana wykluczenia na `24.07 Wyklucza form`** — wykluczenie wszystkich, którzy kiedykolwiek wysłali formularz (29 źródeł, 90 dni) | 🟠 średnia | Zmiana dokładnie w momencie restartu; usuwa z puli najbardziej skłonnych do konwersji | Wykluczanie dotychczasowych leadów jest poprawną praktyką; efekt powinien być umiarkowany |
| **5** | **Skok budżetu 140 → 200 zł/d (+43%) w dniu restartu** przy jednoczesnym restarcie fazy uczenia | 🟠 średnia | Budżet +43% w tej samej minucie co podmiana kreacji i zmiana targetowania | Wydatek w okresie D wzrósł tylko o 4,8% vs baza — więc realnie budżet nie „wystrzelił" |
| **6** | **Podział budżetu na placementy pionowe** — 47,9% budżetu na Stories/Reels, 1 lead | 🟡 średnia | Feed ma CTR 1,97%, FB Reels 1,00%, FB Stories 0,82% | 3 leady łącznie to za mała próba na twardy wniosek |
| **7** | **Instagram bez konwersji** — 25% budżetu, 26 kliknięć linku, 0 leadów | 🟡 średnia | Zero przy oczekiwanych ~6,5 leada | Próba za mała; możliwy przypadek |
| **8** | **Zmęczenie kreacji w końcówce okresu** — 01–02.08 CTR ↓, CPM ↑, CPC ↑ jednocześnie, częstotliwość 2,48 | 🟡 średnia | Klasyczny wzorzec, wyraźnie widoczny w dwóch ostatnich dniach | Wyjaśnia końcówkę, nie początek; CTR odpowiada tylko za 2,6% zmiany CPL |
| **9** | **Nierozstrzygnięty sygnał optymalizacyjny — QUALITY_LEAD bez źródła jakości leadów** przez cały okres do dziś 11:57 | 🟡 niska/średnia | Log jednoznacznie pokazuje QUALITY_LEAD od 27.05; nie znalazłem podpiętego źródła | Wyniki raportowano jako „Leads (form)"; problem istniał też w okresie bazowym, gdy CPL był 38 zł |
| **10** | **Sama przerwa i sama faza uczenia** | 🟢 najsłabsza | 33 dni bez emisji, 3 zdarzenia optymalizacyjne po restarcie | **Kampanie leadowe uruchomione na tym koncie w trakcie przerwy miały CPL 154–237 zł.** Problem z drogim leadem istniał niezależnie od tej kampanii i niezależnie od przerwy |

> **Ostrzeżenie interpretacyjne:** przyczyny 2, 3, 4 i 5 zaszły **w tej samej minucie — 2026-07-28 17:48**. Na podstawie samych danych z Meta **nie da się ich rozdzielić**. Każda analiza, która przypisuje spadek jednej z nich z wysoką pewnością, przekracza to, co pokazują dane.

---

## 15. BRAKUJĄCE DANE

| # | Czego brakuje | Skąd to dostarczyć | Jak brak wpływa na diagnozę |
|---|---|---|---|
| 1 | **Konfiguracja formularza błyskawicznego** — ID, typ (More volume / Higher intent), pytania, pytania kwalifikujące, logika warunkowa, ekran powitalny, ekran końcowy, CTA końcowe, polityka prywatności; oraz czy formularz zmieniono przy restarcie | Ads Manager → Narzędzia biznesowe → Formularze błyskawiczne → eksport formularza i jego historii; albo zrzuty ekranu podglądu formularza sprzed i po 28.07 | 🔴 **KRYTYCZNE.** To jest dokładnie ten krok lejka, który odpowiada za 90,3% wzrostu CPL. Bez tego przyczyna nr 1 pozostaje niezweryfikowana |
| 2 | **Metryki lejka formularza** — otwarcia, rozpoczęcia, ukończenia | Ads Manager → dostosuj kolumny → „Otwarcia formularza kontaktowego", eksport CSV za 13–19.06 i 28.07–03.08 | 🔴 **KRYTYCZNE.** Pozwoliłoby rozdzielić „nikt nie otwiera formularza" od „otwierają i nie kończą" — dwie zupełnie różne diagnozy |
| 3 | **Dane CRM/sprzedażowe** — kolumny wypisane w sekcji 10 | Twój arkusz leadów / CRM, eksport CSV od 2026-05-27 | 🔴 **KRYTYCZNE.** Bez tego nie da się rozstrzygnąć, czy tanie leady z czerwca były w ogóle coś warte. Możliwe, że CPL 38 zł dawał leady bezwartościowe, a obecne 3 leady po 347 zł są lepsze. **Diagnoza „jest źle" opiera się wyłącznie na CPL, czego sam zakazałeś w zasadzie nr 10** |
| 4 | **Quality / Engagement / Conversion rate ranking** | Ads Manager → dostosuj kolumny → sekcja „Wskaźniki rankingu", eksport na poziomie reklamy | 🟠 Pozwoliłoby ocenić, czy nowe kreacje z 28.07 są gorzej odbierane niż stare |
| 5 | **Status fazy uczenia i „learning limited"** | Ads Manager, kolumna „Dostarczanie" na poziomie zestawu — zrzut ekranu | 🟠 Potwierdziłoby lub obaliłoby ustalenie nr 6 |
| 6 | **Szacowana wielkość grupy odbiorców i nakładanie się grup** | Ads Manager → edycja zestawu (wielkość grupy); Audience Overlap Tool | 🟡 Pozwoliłoby ocenić, ile realnie odbiera wykluczenie `24.07 Wyklucza form` |
| 7 | **Negatywne reakcje i ukrycia reklamy** | Ads Manager → kolumny → „Negatywna opinia" | 🟡 Wzmocniłoby lub osłabiło diagnozę zmęczenia kreacji |
| 8 | **Podgląd starych kreacji sprzed 28.07** | Ads Manager → historia reklamy, albo zrzuty ekranu sprzed restartu | 🟠 Pozwoliłoby porównać, co dokładnie zmieniono w treści przy podmianie — dziś widzę tylko, że `creative_id` się zmieniło |
| 9 | **Limit wydatków konta i limity rozliczeniowe** | Ads Manager → Ustawienia płatności | 🟢 Dwie przerwy płatnicze trwały łącznie 9 minut — wpływ pomijalny, ale warto potwierdzić brak twardego limitu |
| 10 | **Czy do konta było kiedykolwiek podpięte źródło jakości leadów (offline conversions / CRM integration)** | Menedżer zdarzeń → Źródła danych | 🟠 Rozstrzygnęłoby ustalenie nr 4 o QUALITY_LEAD |
| 11 | **Kto i po co uruchomił zmiany przez „ads MCP server" dziś o 11:57** | Twoja wiedza / historia sesji | 🟠 Te zmiany unieważniają okres 28.07–02.08 jako bazę porównawczą na przyszłość |

**Czego nie brakuje** (dla jasności): dane o emisji, wydatku, wyświetleniach, zasięgu, częstotliwości, CPM, kliknięciach, CTR, CPC, leadach, pełna historia zmian od 2026-05-15, pełna lista 22 reklam z podziałem na okresy, pełne breakdowny wg platformy, placementu, urządzenia, wieku, płci, regionu, godziny i dnia — wszystko to jest kompletne i zweryfikowane krzyżowo.

---

# 16. DANE Z AUDYTU META ADS DO OPTYMALIZACJI

> Ta sekcja jest samodzielna. Nie wymaga dostępu do konta ani czytania wcześniejszych części.

## Kontekst

Agencja marketingowa (KWIATEKmedia / Paweł Kwiatek Marketing) prowadzi **własną kampanię pozyskiwania klientów** na Meta Ads. Oferta: prowadzenie kampanii leadowych Meta Ads dla firm (głównie doradcy finansowi/kredytowi, OZE, B2B). Konwersja przez **formularz błyskawiczny na Meta**, nie przez stronę.

Kampania działała **27.05–24.06**, była **wyłączona 33 dni**, została **ponownie uruchomiona 28.07**. Po restarcie CPL wzrósł z ~38 zł do ~347 zł.

## Identyfikacja

- Konto: `1569482637544365` „PawełKwiatek", **PLN**, **Europe/Warsaw**, status ACTIVE
- Kampania: `120250261422190581` **„LeadGen 27.05"**, cel `OUTCOME_LEADS`, AUCTION, bez kategorii specjalnej
- Zestaw (jedyny): `120250261422330581` **„Cała polska"**, budżet **ABO 200 zł/dzień**, Highest volume, bez cost/bid cap
- Miejsce konwersji: **Instant Form** (`onsite_conversion.lead_grouped`), typ wyniku „Leads (form)"
- Okno atrybucji: **1d_view / 7d_click** (niezmienne przez całą historię)
- Advantage+ Audience: **ON**; placementy: **automatyczne** (FB + IG + AN); wykluczenie: `24.07 Wyklucza form`
- Zdarzenie optymalizacyjne: **`LEAD_GENERATION`** od 2026-08-03 11:57; wcześniej od startu **`QUALITY_LEAD`**

## Oś czasu — to, co musisz wiedzieć

| Data | Zdarzenie |
|---|---|
| 2026-05-27 15:37 | Start. Budżet 100 zł/d. Optymalizacja **Conversion leads**. Targetowanie 35–65+, język PL, Advantage+ Audience **ON** |
| 2026-05-29 / 06-09 / 06-12 | Budżet 110 → 120 → **140 zł/d** |
| 2026-06-20 10:42 | Zawężenie: wiek 35–60, **tylko mężczyźni**, Advantage+ Audience **OFF** |
| 2026-06-22 12:29 | Podmiana kreacji na 6 reklamach |
| **2026-06-24 12:30** | **WYŁĄCZENIE KAMPANII** |
| 2026-06-25 → 07-27 | **33 dni przerwy.** Na koncie działały inne kampanie leadowe: CPL **154–237 zł** |
| **2026-07-28 17:42** | **RESTART KAMPANII** |
| **2026-07-28 17:48** | W jednej minucie: budżet 140 → **200 zł/d**; wykluczenie → `24.07 Wyklucza form`; Advantage+ Audience → **ON**; **PODMIANA KREACJI NA WSZYSTKICH 9 AKTYWNYCH REKLAMACH** |
| 2026-07-28 17:49–17:50 | Archiwizacja 13 starych reklam |
| 2026-07-30 / 08-02 | Dwie przerwy płatnicze: 6 min i 3 min |
| **2026-08-03 11:57–11:58** | Optymalizacja **Conversion leads → Leads**; usunięto wiek 35–60, płeć męską i język polski (przez integrację „ads MCP server") |

## Liczby — porównanie okresów

| Miernik | Baza: 13–19.06 (stabilne 7 dni przed wyłączeniem) | Teraz: 27.07–02.08 (7 pełnych dni) | Zmiana |
|---|---|---|---|
| Dni z emisją | 7 | 6 | |
| Wydatek | 992,68 zł | 1 040,57 zł | +4,8% |
| Wyświetlenia | 18 401 | 16 484 | −10,4% |
| **CPM** | 53,95 zł | **63,13 zł** | **+17,0%** |
| Kliknięcia (all) | 320 | 254 | −20,6% |
| CTR (all) | 1,74% | 1,54% | −11,4% |
| **Kliknięcia linku** | 104 | 88 | −15,4% |
| **CTR linku** | 0,565% | **0,534%** | **−5,5%** |
| **CPC linku** | 9,54 zł | **11,82 zł** | +23,9% |
| **Konwersja klik→lead** | **25,0%** | **3,4%** | **−86,4%** |
| **Leady** | **26** | **3** | **−88,5%** |
| **CPL** | **38,18 zł** | **346,86 zł** | **+808,5%** |

Poprzednie 7 pełnych dni (20–26.07): **0 zł, 0 leadów** — kampania była wyłączona.
Dziś 03.08 (niepełny): **242,98 zł, 3 177 wyświetleń, 19 kliknięć linku, 0 leadów.**

Sekwencja leadów po restarcie: **0, 2, 0, 1, 0, 0, 0** (7 dni, 1 283,55 zł, 3 leady).

## ROZKŁAD ZMIANY CPL — to jest sedno

`CPL = CPM / (1000 × CTR linku × konwersja klik→lead)`

| Czynnik | Baza | Teraz | Zmiana | **Udział w zmianie CPL** |
|---|---|---|---|---|
| CPM | 53,95 zł | 63,13 zł | +17,0% | **7,1%** |
| CTR linku | 0,565% | 0,534% | −5,5% | **2,6%** |
| **Konwersja klik→lead** | **25,0%** | **3,4%** | **−86,4%** | **90,3%** |
| CPL | 38,18 zł | 346,86 zł | +808,5% | 100% |

Kontrola: 63,13/1000 ÷ (0,00534 × 0,034) = 346,86 zł ✓

**Wniosek: emisja i klikalność są prawie nietknięte. Załamał się krok „kliknął → wysłał formularz".**

## Dowód na poziomie pojedynczych reklam

| Reklama | Okres | Wydatek | Klik. linku | Leady | CPL | Konwersja |
|---|---|---|---|---|---|---|
| Grafika 4,18 zł za leada | 27.05–24.06 | 348,67 zł | 38 | **15** | 23,24 zł | **39,5%** |
| Grafika 4,18 zł za leada | 28.07–02.08 | 344,85 zł | 28 | **1** | 344,85 zł | **3,6%** |
| Grafika 966 leadów | 27.05–24.06 | 1 467,34 zł | 173 | **34** | 43,16 zł | **19,7%** |
| Grafika 966 leadów | 28.07–02.08 | 527,80 zł | 45 | **2** | 263,90 zł | **4,4%** |
| Zajebiste wideo | 27.05–24.06 | 251,98 zł | 33 | **6** | 42,00 zł | **18,2%** |
| Zajebiste wideo | 28.07–02.08 | 109,97 zł | 9 | **0** | — | **0%** |

⚠️ **Zastrzeżenie:** to nie są w pełni „te same reklamy". Nazwy i ID reklam zostały, ale **28.07 o 17:48 podmieniono `creative_id` na wszystkich 9** (nowe nazwy kreacji mają sufiks `2026-07-28`, nowe `effective_object_story_id`).

## Reklamy aktywne teraz (4)

| Reklama | ID | Format | Wydatek 28.07–02.08 | Udział | CTR | Klik. linku | Leady |
|---|---|---|---|---|---|---|---|
| Grafika 966 leadów | `120250264318640581` | obraz | 527,80 zł | 50,7% | 1,44% | 45 | 2 |
| Grafika 4,18 zł za leada | `120250264318630581` | obraz | 344,85 zł | 33,1% | 1,63% | 28 | 1 |
| Zajebiste wideo | `120250540270620581` | wideo | 109,97 zł | 10,6% | 2,02% | 9 | 0 |
| Dodatkowe Wideo | `120253607230510581` | wideo | 57,95 zł | 5,6% | 1,47% | 6 | 0 |

Wszystkie 4: CTA **`LEARN_MORE`**, ten sam kąt („dowożę tanie i jakościowe leady"), ta sama persona (właściciel firmy / doradca finansowy), ten sam typ dowodu (screen z liczbą leadów: 966 / 92 / 41). Łącznie w kampanii było 22 reklamy, 18 zarchiwizowanych.

## Breakdowny (28.07–02.08, 1 040,57 zł, 3 leady)

**Platforma:** Facebook 780,05 zł / 3 leady / CTR 1,72% • Instagram 260,52 zł / **0 leadów** / CTR 1,03% • Audience Network 0 zł (włączony, ale zero emisji)

**Placement:** Feed 528,13 zł / 2 leady / CTR 1,97% • FB Reels 245,52 zł / 1 lead / CTR 1,00% • IG Stories 120,29 zł / 0 / CTR 1,05% • IG Reels 70,83 zł / 0 / CTR 1,44% • FB Stories 61,92 zł / 0 / CTR 0,82% • reszta <10 zł
→ **Stories + Reels razem: 498,56 zł (47,9% budżetu), 1 lead**

**Urządzenie:** Android 588,62 zł / CPM **77,70 zł** / 1 lead • iPhone 449,13 zł / CPM **50,67 zł** / 2 leady

**Wiek** (przy ustawieniu 35–60!): 18–24 → 122,23 zł (CPM 37,64) / 1 lead • 25–34 → 292,34 zł (CPM 46,67) / 1 lead • 35–44 → 286,06 zł (CPM 67,40) / **0** • 45–54 → 256,37 zł (**CPM 130,67**) / 1 lead • 55–64 → 54,49 zł / 0 • 65+ → 29,08 zł / 0
→ **39,8% budżetu poza zadeklarowaną grupą wiekową**

**Płeć** (przy ustawieniu „tylko mężczyźni"): mężczyźni 853,62 zł / 3 leady • **kobiety 182,03 zł (17,5%) / 0 leadów**

**Region:** 17 województw, **0 leadów w każdym segmencie** — brak podstaw do wniosków regionalnych. Największe: Mazowieckie 224,84 zł, Śląskie 128,73 zł, Małopolskie 125,68 zł

**Godzina:** noc 00:00–05:59 → 73,72 zł (7,1% budżetu), 0 leadów; CPM o 02:00 = 160,38 zł. Leady wypadły o 09:00, 16:00 i 20:00

**Dzień tygodnia:** każdy dzień po restarcie wypada gorzej niż jego odpowiednik w bazie — układ tygodnia nie tłumaczy różnicy

## Zdrowie techniczne

- `ads_get_errors`: **pusty wynik** — zero błędów dostarczania, odrzuceń, ograniczeń
- Status konta ACTIVE; dwie przerwy płatnicze łącznie **9 minut** (30.07, 02.08)
- Budżet wydaje się w całości; dziś 242,98 zł przy budżecie 200 zł
- Częstotliwość 28.07–02.08: **2,48 (FB) / 2,24 (IG)**
- Zmęczenie kreacji widoczne 01–02.08: CTR linku 0,445% → 0,292%, CPM 73,16 → 70,80, CPC linku 16,45 → 24,22 zł

## Kontekst konta

- Wydatek całego konta w 30 dni: **7 012,88 zł**, leadów **17**, CPL konta **412,52 zł**
- Równolegle aktywne: `Sprzedaż szkolenie Claude` (OUTCOME_SALES, 2 654,09 zł lifetime), `REM KURS SPRZEDAŻ` (OUTCOME_SALES) — konkurują o tę samą polską grupę i o budżet
- W trakcie przerwy działały inne kampanie leadowe: **CPL 154–237 zł** → **problem z drogim leadem istniał na koncie niezależnie od tej kampanii i niezależnie od przerwy**

## Ranking prawdopodobnych przyczyn

1. **Zmiana / niedopasowanie formularza błyskawicznego** — 90,3% zmiany CPL siedzi w kroku klik→wysłanie. **Niezweryfikowane, brak dostępu do danych formularza**
2. **Podmiana wszystkich 9 kreacji 28.07 17:48** — nowe posty, zerowa historia społeczna
3. **Ponowne włączenie Advantage+ Audience 28.07** — 39,8% budżetu poza grupą wiekową, 17,5% na kobiety mimo ustawienia „tylko mężczyźni"
4. **Podmiana wykluczenia na `24.07 Wyklucza form`** — usuwa z puli wszystkich dotychczasowych zgłaszających (29 źródeł, 90 dni)
5. **Skok budżetu +43% w dniu restartu** przy jednoczesnym resecie fazy uczenia
6. **47,9% budżetu na Stories/Reels** → 1 lead
7. **Instagram: 25% budżetu, 0 leadów**
8. **Zmęczenie kreacji** w dniach 01–02.08
9. **QUALITY_LEAD bez podpiętego źródła jakości leadów** przez cały okres do 03.08 11:57
10. **Sama przerwa i faza uczenia** — najsłabsza, bo kampanie uruchomione w trakcie przerwy też miały CPL 154–237 zł

⚠️ **Przyczyny 2, 3, 4 i 5 zaszły w tej samej minucie (2026-07-28 17:48). Na podstawie danych z Meta NIE DA SIĘ ich rozdzielić.**

## Czego brakuje — bez tego optymalizacja będzie zgadywaniem

🔴 **Krytyczne:**
1. **Konfiguracja formularza błyskawicznego** — ID, typ (More volume / Higher intent), pytania, pytania kwalifikujące, ekrany, oraz **czy formularz zmieniono przy restarcie**. To dokładnie ten krok lejka, który się załamał
2. **Metryki lejka formularza** — otwarcia / rozpoczęcia / ukończenia za 13–19.06 i 28.07–03.08. Pozwoli rozdzielić „nikt nie otwiera" od „otwierają i nie kończą"
3. **Dane CRM** — jakość leadów, kwalifikacja, kontakt, sprzedaż. **Bez tego cała ocena opiera się wyłącznie na CPL. Nie da się wykluczyć, że leady po 38 zł z czerwca były bezwartościowe, a 3 leady po 347 zł są lepsze**

🟠 **Ważne:** Quality / Engagement / Conversion rate ranking • status fazy uczenia i „learning limited" • podgląd starych kreacji sprzed 28.07 • czy było podpięte źródło jakości leadów (offline conversions) • kto i po co uruchomił zmiany przez „ads MCP server" 03.08 o 11:57

🟡 **Przydatne:** wielkość grupy i nakładanie się grup • negatywne opinie i ukrycia reklamy • limity wydatków konta

## Ograniczenia metodologiczne, o których trzeba pamiętać

- **Próba: 3 leady w okresie D.** Każdy pojedynczy lead zmienia CPL o ~30%. Wnioski o CPL na poziomie dnia, placementu, urządzenia, wieku i regionu są **niestabilne**
- Okno atrybucji **7d_click** — leady z 28.07–02.08 mogą jeszcze dojść
- **Zmiany z 03.08 11:57–11:58 unieważniają okres 28.07–02.08 jako bazę do dalszych porównań** — od dziś kampania ma inne zdarzenie optymalizacyjne i inne targetowanie
- Kampania **nigdy nie wyszła z fazy uczenia po restarcie**: 3 zdarzenia optymalizacyjne przy progu ~50/7 dni (6% progu). To **skutek, nie przyczyna** — dekompozycja pokazuje konkretny zepsuty krok lejka, nie ogólną „naukę algorytmu"

---

## PLIKI

| Plik | Zawartość |
|---|---|
| `AUDYT_META_LEADGEN_DO_CHATGPT.md` | ten raport |
| `META_LEADGEN_DANE_DZIENNE.csv` | dane dzienne 27.05–03.08 + wszystkie dni przerwy jako jawne wiersze zerowe |
| `META_LEADGEN_WYNIKI_REKLAM.csv` | 22 reklamy × 3 okresy (lifetime / po restarcie / przed pauzą) |
| `META_LEADGEN_HISTORIA_ZMIAN.csv` | 37 zdarzeń: data, poziom, ID, parametr, wartość przed/po, autor, możliwy wpływ |
| `META_LEADGEN_DANE_SUROWE.json` | pełne ustawienia, oś czasu, wszystkie okresy, dekompozycja CPL, wszystkie breakdowny, lista braków |

W plikach CSV pola bez danych **pozostawiono puste** — nie wpisano zera w miejsce wartości niedostępnych. Separator: średnik. Kodowanie: UTF-8. Format liczb: przecinek dziesiętny (polski).

---

*Audyt wykonany w trybie wyłącznie odczytu. Nie zmieniono żadnego ustawienia, nie włączono ani nie wyłączono żadnej kampanii, zestawu ani reklamy, nie zmieniono budżetów, odbiorców, placementów, formularzy ani kreacji, nie opublikowano żadnych zmian, nie utworzono nowych kampanii ani testów.*
