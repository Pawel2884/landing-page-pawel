# MASTERPROMPT — pełne wdrożenie wzrostu sprzedaży kursu „Claude w praktyce"

> **Uruchom to w Claude Code zainstalowanym LOKALNIE na komputerze Pawła** (terminal / VS Code).
> Sesja w chmurze na claude.ai ma odciętą sieć i nie wykona zadań przez Chrome.
> Skopiuj wszystko poniżej linii i wklej jako pierwszą wiadomość.

---

Jesteś Claude Code na komputerze Pawła Kwiatka (KWIATEKmedia). Paweł NIE jest techniczny.
Masz jego pełną, wyraźną zgodę na działanie w jego panelach i kontach.

## ZASADY PRACY — PRZECZYTAJ NAJPIERW

1. **NIE ZADAWAJ PYTAŃ.** Podejmuj decyzje sam. Jeśli masz wybór między dwiema drogami — wybierz
   bezpieczniejszą i idź dalej. Pytaj TYLKO, jeśli fizycznie nie masz dostępu (np. potrzebne hasło,
   którego nigdzie nie ma).
2. **NIE ZATRZYMUJ SIĘ**, dopóki wszystkie kryteria ukończenia (sekcja na końcu) nie są spełnione.
   Jeśli coś nie działa — diagnozuj i próbuj innej drogi. Praca może zająć godziny; to normalne.
3. **RAPORTUJ POSTĘP** krótkimi zdaniami po polsku po każdym ukończonym zadaniu. Paweł ma widzieć,
   że pracujesz. Bez żargonu.
4. **KAMPANIE REKLAMOWE META SĄ NIETYKALNE.** Nie zmieniasz budżetów, nie wyłączasz reklam,
   nie edytujesz zestawów, targetowania ani kreacji. Meta MCP używasz WYŁĄCZNIE do odczytu.
   To jest twardy zakaz — złamanie go kosztuje Pawła pieniądze.
5. **Weryfikuj każdą zmianę.** „Włączyłem" nie znaczy „działa". Po każdej zmianie sprawdź
   dowodem (curl, screenshot, odczyt z API), że efekt jest realny.
6. **Rób kopie zapasowe** przed każdą nadpisującą zmianą (pliki na serwerze, blueprinty Make).

---

## 1. DANE DOSTĘPOWE I IDENTYFIKATORY

### Konta i adresy
| Co | Wartość |
|---|---|
| E-mail główny (login wszędzie) | `pawel.kwiatek1177@gmail.com` |
| E-mail firmowy | `kontakt@kwiatekmedia.pl` |
| NIP | `7123115454` |
| Strona sprzedażowa | https://claudewpraktyce.kwiatekmedia.pl/ |
| Panel kursu (NIE DOTYKAĆ) | https://claudewpraktyce.kwiatekmedia.pl/panel/ |
| Menedżer plików Hostinger | https://hpanel.hostinger.com/websites/claudewpraktyce.kwiatekmedia.pl/files/file-manager |
| Serwer FTP | `ftp.claudewpraktyce.kwiatekmedia.pl` (IP `46.17.175.123`) |
| Koszyk easy.tools | https://cart.easy.tools/checkout/kwiatekmedia/claude-w-praktyce |
| Produkt w easy.tools | `cart.easy.tools/creator/products/6a8960ac-7f4e-40c6-9625-cee7a51db540` |
| Repo (publiczne) | `Pawel2884/landing-page-pawel`, branch `claude/course-sales-campaign-analysis-dpddji` |
| Pull request | https://github.com/Pawel2884/landing-page-pawel/pull/2 |
| Gotowy plik strony (raw) | https://raw.githubusercontent.com/Pawel2884/landing-page-pawel/claude/course-sales-campaign-analysis-dpddji/index.html |

### Klucze

**Klucz API Brevo NIE jest zapisany w tym repo — repozytorium jest publiczne.**

Klucz jest już wpisany tam, gdzie jest potrzebny: w Make, magazyn `mailing_config`
(ID `174285`), pole `klucz_brevo`. Scenariusze czytają go stamtąd i **nie musisz go
nigdzie wklejać**, żeby wykonać zadania z tego dokumentu.

Jeśli mimo to potrzebujesz go wprost (np. do ręcznego wywołania API Brevo), odczytaj go
przez MCP Make: `data-store-records_list(dataStoreId: 174285)` → pole `klucz_brevo`.
Alternatywnie Paweł ma go w prywatnej kopii tego dokumentu (`MASTERPROMPT-PELNY-Z-KLUCZEM.md`).

**Nigdy nie commituj tego klucza do repozytorium.**

### Meta Ads (TYLKO ODCZYT)
| Co | ID |
|---|---|
| Konto reklamowe | `1569482637544365` (PawełKwiatek) |
| Business | `591163360686591` |
| Piksel / dataset | `2209863822840705` (KwiatekMediaPixel) |
| Kampania główna | `120252985889790581` „Sprzedaż szkolenie Claude" |
| Kampania remarketing | `120253604020520581` „REM KURS SPRZEDAŻ" |
| Najlepsza reklama | `120253292750810581` „Kreacja 1.5" |

### Make (org `4709930`, team `2349260`)
| Scenariusz | ID | Stan | Rola |
|---|---|---|---|
| Faktury po zakupie kursu – EasyTools | `9572287` | AKTYWNY, hook `4279251` | wystawia faktury, KSeF, Saldeo — **serce systemu** |
| Meta CAPI – ZakupPelnaWartosc | `9575348` | AKTYWNY, hook `4280222` | serwerowy pomiar zakupu |
| Brevo sync zakupów (EasyTools) | `9581586` | AKTYWNY, hook `4282871`, **0 uruchomień** | zapis klientów do Brevo — NIE DOSTAJE DANYCH |
| SETUP Brevo (jednorazowy) | `9581615` | nieaktywny, wykonany | utworzył listy i atrybuty |
| Faktury Stripe (stare) | `9506720` | nieaktywny | archiwum |

Magazyny danych: `174285` = `mailing_config` (struktura `607782`), `172442` = rejestr faktur.

Webhooki: scenariusz faktur w 4. gałęzi routera (moduł `60`) wysyła kopię zamówienia na
`https://hook.eu2.make.com/x1t2s0nljy44k6wvi2sslzlvgkjendth` (to zasila Meta CAPI).
Webhook scenariusza Brevo to `https://hook.eu2.make.com/egqgqwhjx2jfnyh6m4ojudufuaywrhe1`
— **i nikt do niego nie puka, dlatego zapis klientów nie działa.**

### Brevo — stan istniejący
Listy: `8` L1_ZGODA_MARKETING, `7` LeadForm 20.06, **`9` L10_KOSZYK_PORZUCONY**,
**`10` L20_KLIENCI**, **`11` L21_BEZ_CROSSSELL**, **`12` L30_MA_CROSSSELL`**.

Atrybuty kontaktu (utworzone): `KWOTA`(float), `KOSZYK`(text), `MA_KURS`(bool), `MA_PROMPTY`(bool),
`MA_10K`(bool), `DATA_ZAKUPU`(date), `ORDER_ID`(text), `DEADLINE`(text), `DEADLINE_B`(text),
`LINK_KOSZYKA`(text), `LINK_10K`(text), `LINK_PROMPTY`(text).

Szablony maili (gotowe, nieużywane): `20`–`24` = sekwencja KOSZYK A1–A5 (porzucony koszyk),
`25`–`30` = sekwencja CROSSSELL B1–B6, `31` = B1-HIST (baza historyczna), kampania `32` = draft.
Nadawca: `Paweł z KWIATEKmedia <kontakt@kwiatekmedia.pl>` (sender id 2).
Konto Brevo: plan free, limit 300 maili/dobę.

### Produkty i ceny (NIE ZMIENIAĆ CEN)
| Produkt | Cena | Rola |
|---|---|---|
| Kurs „Claude w praktyce" | 79 zł | główny |
| Pakiet 24 promptów | 37 zł | order bump w koszyku |
| „Pierwsze 10 000 zł na własnym kursie" | 197 zł | cross-sell po zakupie |

Rozpoznawane kwoty koszyka: 79, 116 (kurs+prompty), 197, 276 (kurs+10k), 313 (wszystko), 37.

---

## 2. STAN WYJŚCIOWY — LICZBY BAZOWE (23–29.07.2026)

Kampania `120252985889790581`:
```
15 802 wyświetleń → 284 kliknięcia linku (240 unikalnych) → 103 wejścia na stronę
→ 22 AddToCart → 32 rozpoczęte płatności → 18 zakupów
wydatek 731,04 zł · przychód 1 533 zł · koszt zakupu 40,61 zł
```
Kampania remarketingowa `120253604020520581`: 1 wejście, 2 checkouty, 1 zakup, 34,11 zł.

**RAZEM BASELINE: 104 wejścia na stronę, 19 zakupów, 765,15 zł wydatku, 1 612 zł przychodu, ROAS 2,11.**

Rozbicie na urządzenia (to jest klucz do zrozumienia problemu):
| Urządzenie | Kliknięcia | Weszło na stronę | → Checkout | Zakupy | Zakup/wejście |
|---|---|---|---|---|---|
| iPhone | 89 | 42 (47%) | 21 (**50%**) | **12** | **28,6%** |
| **Android** | 168 | 54 (32%) | 8 (**15%**) | 6 | 11,1% |
| Desktop | 25 | 6 (24%) | 3 | **0** | **0%** |

**CEL: minimum 38 zakupów tygodniowo (x2) bez zwiększania budżetu reklamowego.**

## 3. LISTA WSZYSTKICH USTEREK DO NAPRAWY

| # | Usterka | Dowód | Skutek |
|---|---|---|---|
| U1 | Nowa strona nie jest wdrożona | stary `index.html` na serwerze | całość poniżej nie działa |
| U2 | 64% klikających nie dociera na stronę | 284 kliki → 103 wejścia | przepalasz ~2/3 budżetu |
| U3 | Android konwertuje 3× gorzej niż iPhone | 15% vs 50% strona→checkout | tracisz ~9 sprzedaży/tydz. |
| U4 | Desktop: 0 zakupów przy 3 checkoutach | tabela wyżej | zmarnowane 1 326 wyświetleń |
| U5 | ViewContent prawie nie odpala | 3 zdarzenia na 103 wejścia | Andromeda uczy się na ślepo |
| U6 | AddToCart niespójny | 22 ATC przy 32 checkoutach | brak środka lejka |
| U7 | `fbc` tylko na 24% zdarzeń | audyt jakości piksela | zła atrybucja, gorszy dobór odbiorców |
| U8 | `fbclid` ginie na granicy domen | brak przekazania do easy.tools | Purchase bez `fbc` |
| U9 | Zdarzenia z `http://localhost/` w danych | 9 PageView 24.07 | śmieci w danych produkcyjnych |
| U10 | Testowe zakupy po 2 zł | 5 szt. 25.07 | zaniżony modelowany AOV |
| U11 | BLIK nie jest domyślny | ustawienia koszyka | 44% porzuceń płatności |
| U12 | Order bump sprzedaje 4,5% | 1 na 22 faktury | norma to 20–40% |
| U13 | Sync do Brevo nie dostaje danych | 0 uruchomień scenariusza `9581586` | baza klientów się nie buduje |
| U14 | Automatyzacje Brevo niewłączone | 0 wysłanych kampanii | 12 gotowych maili leży bezczynnie |
| U15 | Brak przechwytywania porzuconych koszyków | lista `9` pusta | 14 osób/tydz. przepada |
| U16 | Zero opinii/social proof na stronie | treść strony | najniżej wiszący owoc konwersji |
| U17 | Brak regulaminu i polityki prywatności | stopka | ryzyko prawne przy sprzedaży konsumenckiej |

---

## 4. ZADANIA — WYKONAJ PO KOLEI

### ZADANIE A — Wdrożenie strony na Hostinger *(naprawia U1, U2, U3, U4, U5, U6, U7, U8, U9)*
**Narzędzie: Chrome (Playwright) lub FTP z terminala**

Nowa strona jest gotowa i przetestowana (25/25 testów): 30 KB, jeden plik, zero zewnętrznych
zasobów poza pikselem Meta, sticky przycisk zakupu, cele dotykowe 56 px, fallbacki CSS dla
starych WebView Androida, naprawiony piksel z ratowaniem `fbclid`, baner zgody cookies,
strażnik blokujący zdarzenia z localhost, wyłącznik `?nopixel=1` do testów.

**A1.** Sprawdź, czy nie jest już wdrożona:
```bash
curl -s https://claudewpraktyce.kwiatekmedia.pl/ | grep -c "Masz AI. To czemu dalej siedzisz"
```
Jeśli `1` → pomiń zadanie A.

**A2.** Pobierz plik i zweryfikuj, że ma wpisany koszyk:
```bash
curl -sL -o /tmp/index-nowy.html "https://raw.githubusercontent.com/Pawel2884/landing-page-pawel/claude/course-sales-campaign-analysis-dpddji/index.html"
grep -c "cart.easy.tools/checkout/kwiatekmedia/claude-w-praktyce" /tmp/index-nowy.html   # musi być 1
grep -c "USTAW_LINK_DO_KOSZYKA" /tmp/index-nowy.html                                     # musi być 0
```

**A3 — droga główna: zalogowany Chrome Pawła.**
Nie uruchamiaj czystego Playwrighta — nie ma w nim żadnych logowań. Podłącz się pod profil Chrome:
```js
import { chromium } from 'playwright';
import os from 'os'; import path from 'path';
// macOS: ~/Library/Application Support/Google/Chrome
// Windows: %LOCALAPPDATA%\Google\Chrome\User Data
// Linux: ~/.config/google-chrome
const profile = path.join(os.homedir(), 'Library/Application Support/Google/Chrome');
const ctx = await chromium.launchPersistentContext(profile, {
  channel: 'chrome', headless: false, args: ['--profile-directory=Default'],
});
const page = ctx.pages()[0] || await ctx.newPage();
```
**Chrome musi być całkowicie zamknięty przed uruchomieniem** (profil jest blokowany).
Jeśli profil zablokowany — napisz Pawłowi jedno zdanie: „Zamknij całkowicie Chrome i napisz ok".

Następnie w Menedżerze plików:
1. Wejdź na adres menedżera plików (tabela wyżej)
2. Znajdź katalog z `index.html` obsługującym subdomenę — sprawdź `public_html`,
   a jeśli tam nie ma, `domains/claudewpraktyce.kwiatekmedia.pl/public_html`
3. **BACKUP:** zmień nazwę istniejącego `index.html` → `index_stary.bak` (prawy przycisk → Rename)
4. **UPLOAD:** wgraj `/tmp/index-nowy.html` (przycisk Upload → `page.setInputFiles()`),
   po wgraniu zmień nazwę na `index.html`
5. Screenshot po każdym kroku

**A4 — droga zapasowa: FTP.** Jeśli menedżer plików sprawia problemy, w hPanel → Pliki → Konta FTP
odczytaj nazwę użytkownika i ustaw nowe hasło, potem z terminala:
```bash
curl -T /tmp/index-nowy.html "ftp://UZYTKOWNIK:HASLO@ftp.claudewpraktyce.kwiatekmedia.pl/public_html/index.html"
```
(najpierw pobierz stary plik jako backup: `curl -o /tmp/index-stary.html "ftp://...@.../public_html/index.html"`)

**A5 — WERYFIKACJA (obowiązkowa, bez tego nie idziesz dalej):**
```bash
curl -s https://claudewpraktyce.kwiatekmedia.pl/ | grep -c "Masz AI. To czemu dalej siedzisz"  # 1
curl -s https://claudewpraktyce.kwiatekmedia.pl/ | grep -c "km_nopixel"                        # 1
curl -s https://claudewpraktyce.kwiatekmedia.pl/ | grep -c "cart.easy.tools"                   # ≥1
curl -so /dev/null -w "czas: %{time_total}s waga: %{size_download}B\n" https://claudewpraktyce.kwiatekmedia.pl/
```
Czas ma być poniżej 1,5 s, waga poniżej 40 000 B.

**A6.** Otwórz `https://claudewpraktyce.kwiatekmedia.pl/?nopixel=1` w Chrome w trybie emulacji
Androida (Pixel 7) i osobno na desktopie. Sprawdź: brak poziomego przewijania, sticky przycisk
widoczny i klikalny, przycisk prowadzi do koszyka easy.tools, stopka nie jest zasłonięta.
Zrób screenshoty i wyślij Pawłowi.

**A7.** Sprawdź, że panel kursu nadal działa: `curl -sI https://claudewpraktyce.kwiatekmedia.pl/panel/`
— ma zwrócić 200 albo przekierowanie do logowania, NIE 404.

---

### ZADANIE B — Weryfikacja piksela *(potwierdza U5, U6, U7, U8, U9)*
**Narzędzie: MCP Meta Ads (tylko odczyt) + Chrome**

**B1.** Wejdź na stronę Chromem z parametrem `?fbclid=TEST_WDROZENIE_001`, przewiń do sekcji
zakupu, kliknij przycisk zakupu (możesz przerwać przed płatnością). W DevTools Network sprawdź
żądania do `facebook.com/tr` — mają być trzy: `PageView`, `ViewContent`, `AddToCart`, każde
z parametrem `eid`.

**B2.** Sprawdź w localStorage, że `km_fbc` został zapisany i zawiera `TEST_WDROZENIE_001`.

**B3.** Sprawdź, że link koszyka ma doklejony `fbclid`:
```js
await page.locator('.sticky .btn').getAttribute('href')
// oczekiwane: https://cart.easy.tools/checkout/kwiatekmedia/claude-w-praktyce?fbclid=TEST_WDROZENIE_001
```

**B4.** Po 30–60 minutach odczytaj przez MCP Meta Ads:
`ads_get_dataset_stats` dla datasetu `2209863822840705`, `aggregation=event`, ostatnie 2 godziny.
Ma być widoczny wzrost `ViewContent` i `AddToCart` względem zera.
**Nie zmieniaj niczego w kampaniach — to tylko odczyt.**

**B5.** Sprawdź `aggregation=url` — nie może być już żadnych zdarzeń z `http://localhost/`.

---

### ZADANIE C — easy.tools: BLIK i koszyk *(naprawia U11, U12, U15)*
**Narzędzie: Chrome (zalogowany profil jak w A3)**

Wejdź na `https://cart.easy.tools/`. Jeśli wymaga logowania — easy.tools wysyła kod/magic-link
na `pawel.kwiatek1177@gmail.com`; odbierz go przez MCP Gmail (`from:easy.tools newer_than:1h`)
albo z lokalnej skrzynki i dokończ logowanie.

**C1 — BLIK jako pierwsza i domyślna metoda płatności.** W Polsce przy kwocie 79 zł to metoda
~70% kupujących. Szukaj w ustawieniach produktu lub sklepu: metody płatności / kolejność.
Kolejność docelowa: **BLIK → karta → przelew**.

**C2 — Minimum pól w koszyku.** Wymagany tylko e-mail (plus imię, jeśli nie da się wyłączyć).
Dane do faktury przestaw na opcjonalne albo za checkboxem „Chcę fakturę na firmę".
Wyłącz wymuszanie zakładania konta przed płatnością.

**C3 — Odzyskiwanie porzuconych koszyków: WŁĄCZ.** easy.tools ma to wbudowane. Jeśli da się
ustawić opóźnienia — pierwszy mail po **1 h**, drugi po **24 h**.

**C4 — Zgoda na natychmiastowe dostarczenie treści cyfrowej.** Jeśli easy.tools ma taki checkbox
w koszyku — włącz. Bez niego konsument ma ustawowe 14 dni na odstąpienie nawet po przerobieniu kursu.

**C5 — Order bump.** Obecny opis sprzedaje 4,5% (norma 20–40%). Podmień treść na:
> **☑ Dorzuć „Prompty do kreacji, reklam i stron" +37 zł**
> 24 gotowe prompty, które robią za Ciebie grafiki reklamowe, teksty reklam i sekcje stron.
> Jedno kliknięcie teraz — osobno ten pakiet kupisz tylko w wyższej cenie.

Umieść checkbox tuż nad przyciskiem płatności.
**UWAGA PRAWNA:** nie pisz „37 zł zamiast 67 zł" ani nie przekreślaj ceny — to ogłoszenie obniżki
i wymaga podania najniższej ceny z 30 dni (dyrektywa Omnibus). Ostatnie zdanie jest dopuszczalne
tylko wtedy, gdy pakiet naprawdę jest sprzedawany osobno drożej.

**C6 — Webhook porzuconych koszyków.** Sprawdź w ustawieniach easy.tools (Integracje / Webhooks),
czy da się wysyłać zdarzenie porzucenia koszyka na własny adres. Jeśli tak — wskaż
`https://hook.eu2.make.com/egqgqwhjx2jfnyh6m4ojudufuaywrhe1` i zgłoś to w raporcie
(dopiszemy obsługę w Make). Jeśli nie ma takiej opcji — wystarczy wbudowane odzyskiwanie z C3.

Screenshot PRZED i PO każdej zmianie.
**NIE ZMIENIAJ:** cen, danych firmowych, ustawień wypłat, nie usuwaj produktów.

---

### ZADANIE D — Naprawa zapisu klientów do Brevo *(naprawia U13)*
**Narzędzie: MCP Make**

**Diagnoza:** scenariusz `9581586` jest aktywny, ale ma 0 uruchomień, bo jego webhook
(`egqgqwhjx2jfnyh6m4ojudufuaywrhe1`) nie dostaje danych — easy.tools o nim nie wie.
Scenariusz faktur `9572287` **już dostaje** każde zamówienie i w 4. gałęzi routera (moduł `60`)
przekazuje kopię do Meta CAPI. Rozwiązanie: dołożyć **piątą gałąź** robiącą to samo do Brevo.

**D1.** Pobierz blueprint `scenarios_get(9572287)` i **zapisz go do pliku jako kopię zapasową**.

**D2.** W blueprincie znajdź moduł `4` (`builtin:BasicRouter`) i jego tablicę `routes`.
Dodaj nową, piątą trasę — kopię istniejącej czwartej (moduł `60`), zmieniając tylko `id` modułów
i adres URL:
```json
{
  "flow": [
    {
      "id": 62,
      "module": "http:ActionSendData",
      "version": 3,
      "parameters": { "handleErrors": false },
      "mapper": {
        "qs": [],
        "url": "https://hook.eu2.make.com/egqgqwhjx2jfnyh6m4ojudufuaywrhe1",
        "data": "{\"event\":\"product_assigned\",\"success\":\"true\",\"order_amount\":{{2.kwota}},\"order_uuid\":\"{{2.sesja}}\",\"order_id\":\"{{1.order_id}}\",\"customer_email\":\"{{1.customer_email}}\",\"customer_first_name\":\"{{2.imie}}\",\"customer_last_name\":\"{{2.nazwisko}}\",\"invoice_data\":{\"city\":\"{{2.miasto}}\",\"post_code\":\"{{2.kod}}\",\"country_code\":\"{{2.kraj}}\"}}",
        "gzip": true, "method": "post", "headers": [], "useMtls": false,
        "bodyType": "raw", "contentType": "application/json",
        "serializeUrl": false, "shareCookies": false, "parseResponse": false,
        "followRedirect": true, "useQuerystring": false,
        "followAllRedirects": false, "rejectUnauthorized": true
      },
      "onerror": [
        { "id": 63, "module": "builtin:Ignore", "version": 1, "parameters": {}, "mapper": {} }
      ],
      "metadata": { "designer": { "x": 300, "y": 1200 } }
    }
  ]
}
```
Wyślij CAŁY blueprint (z dołożoną trasą) przez `scenarios_update(9572287, blueprint)`.
`scenarios_update` **nadpisuje w całości** — musisz odesłać komplet, nie fragment.

**D3 — WERYFIKACJA:** ponownie `scenarios_get(9572287)` i sprawdź, że:
- router ma teraz 5 tras (było 4),
- trasy 1–4 są identyczne jak w kopii zapasowej (porównaj JSON),
- scenariusz nadal `isActive: true`, `isinvalid: false`.

**Jeśli cokolwiek się nie zgadza — natychmiast przywróć blueprint z kopii zapasowej.**

**D4.** To jest system fakturowania. Po zmianie obserwuj: przy najbliższym prawdziwym zakupie
sprawdź, czy faktura wyszła (mail `[FV B2C]` na Gmailu Pawła) ORAZ czy kontakt pojawił się
w Brevo (`contacts_get_contacts`, lista `10`). Obie rzeczy muszą zadziałać.

**D5.** Jeśli nie chcesz czekać na prawdziwy zakup — uruchom scenariusz Brevo ręcznie
przez `scenarios_run(9581586)` z danymi testowymi na adres `pawel.kwiatek1177@gmail.com`,
potem usuń ten kontakt z list.

---

### ZADANIE E — Uruchomienie sekwencji mailowych *(naprawia U14, U15)*
**Narzędzie: Chrome (panel Brevo) + MCP Brevo do weryfikacji**

W Brevo leży 12 gotowych maili, których nikt nigdy nie wysłał. Automatyzacji NIE da się
utworzyć przez API — trzeba je kliknąć w panelu.

**E1.** Zaloguj się na https://app.brevo.com (konto `pawel.kwiatek1177@gmail.com`).

**E2 — Automatyzacja „Porzucony koszyk" (sekwencja A):**
- Wyzwalacz: kontakt dodany do listy **`L10_KOSZYK_PORZUCONY` (ID 9)**
- Krok 1: natychmiast → szablon **20** (KOSZYK A1/5 „Prompt za darmo")
- Krok 2: po 1 dniu → szablon **21** (A2/5)
- Krok 3: po 2 dniach → szablon **22** (A3/5)
- Krok 4: po 3 dniach → szablon **23** (A4/5)
- Krok 5: po 4 dniach → szablon **24** (A5/5)
- Warunek wyjścia: kontakt trafia na listę `L20_KLIENCI` (ID 10) → zatrzymaj sekwencję
- **WŁĄCZ automatyzację**

**E3 — Automatyzacja „Cross-sell po kursie" (sekwencja B):**
- Wyzwalacz: kontakt dodany do listy **`L21_BEZ_CROSSSELL` (ID 11)**
- Krok 1: po 1 dniu → szablon **25** (B1/5)
- Krok 2: po 3 dniach → szablon **26** (B2/5)
- Krok 3: po 5 dniach → szablon **27** (B3/5)
- Krok 4: po 7 dniach → szablon **28** (B4/5, oferta 197 zł)
- Krok 5: po 8 dniach → szablon **29** (B5/5, deadline)
- Krok 6: po 10 dniach → szablon **30** (B6, downsell prompty)
- Warunek wyjścia: kontakt trafia na listę `L30_MA_CROSSSELL` (ID 12) → zatrzymaj
- **WŁĄCZ automatyzację**

**E4.** Uwaga na limit: konto Brevo jest na planie free, **300 maili na dobę**. Jeśli sekwencje
mają wystartować od razu na dużej bazie, rozłóż to w czasie. Zgłoś Pawłowi w raporcie,
jeśli limit będzie wąskim gardłem (upgrade planu to jego decyzja).

**E5 — WERYFIKACJA:** przez MCP Brevo sprawdź, że automatyzacje istnieją i są aktywne;
dodaj testowy kontakt (swój alias, np. `pawel.kwiatek1177+test@gmail.com`) do listy 9
i potwierdź, że pierwszy mail wyszedł. Potem usuń kontakt.

---

### ZADANIE F — Opinie kursantów na stronie *(naprawia U16)*
**Narzędzie: MCP Gmail + edycja pliku + ponowne wdrożenie**

Strona nie ma ani jednej opinii — to najmocniejsza pojedyncza dźwignia konwersji, jakiej brakuje.

**F1.** Przez MCP Gmail zbierz listę kupujących z ostatnich 30 dni:
zapytanie `from:hello@easy.tools subject:"New Purchase" newer_than:30d` — wyciągnij imiona i maile.

**F2.** Utwórz **draft** (nie wysyłaj automatycznie masowo — Paweł ma zatwierdzić jednym kliknięciem)
do 10–15 ostatnich kupujących:
> Temat: Jedno pytanie o kurs (2 minuty)
> Cześć! Kupiłeś/aś „Claude w praktyce" — powiedz mi proszę w 2–3 zdaniach: co konkretnie udało
> Ci się zrobić z pomocą kursu? Najciekawsze odpowiedzi (za Twoją zgodą, z imieniem) trafią na
> stronę kursu. Dzięki! Paweł

**F3.** Gdy spłyną min. 3 odpowiedzi (sprawdzaj skrzynkę), wstaw je do `index.html` w sekcji
oznaczonej komentarzem `TODO(Paweł)` przy „Kto to prowadzi?" — imię + treść, **tylko prawdziwe
opinie, za zgodą autora**. Dopisz też realną liczbę kursantów, jeśli ją znasz z liczby faktur.
Wgraj poprawioną stronę ponownie (procedura z zadania A) i zacommituj zmianę do repo.

**NIGDY nie wymyślaj opinii ani liczb.** Fałszywy social proof to naruszenie prawa i ryzyko
dla marki.

---

### ZADANIE G — Wymogi prawne *(naprawia U17)*
**Narzędzie: Chrome + edycja pliku**

Stopka nowej strony ma już NIP i linki `/regulamin` oraz `/polityka-prywatnosci`, ale dokumenty
pod tymi adresami **muszą powstać** — przy sprzedaży treści cyfrowych konsumentom to obowiązek
(art. 12 ustawy o prawach konsumenta).

**G1.** Sprawdź, czy Paweł ma już te dokumenty gdziekolwiek (przeszukaj Gmaila, Google Drive
przez MCP, oraz stronę `kwiatekmedia.pl`). Jeśli tak — wgraj je jako `/regulamin/index.html`
i `/polityka-prywatnosci/index.html` na hosting.

**G2.** Jeśli ich nie ma — przygotuj projekty obu dokumentów jako pliki HTML w tym samym stylu
co strona (dane: KWIATEKmedia Paweł Kwiatek, NIP 7123115454, kontakt@kwiatekmedia.pl,
produkt cyfrowy, płatności przez easy.tools, dane przetwarzane w Brevo i Meta).
**Zaznacz wyraźnie w raporcie, że to projekty do weryfikacji przez prawnika**, i wgraj je,
bo brak jakichkolwiek dokumentów jest gorszy niż dokumenty do poprawki.

**G3.** Uzupełnij w stopce adres działalności, jeśli go znajdziesz w danych z Fakturowni.

---

### ZADANIE H — Kontrola higieny danych *(naprawia U10)*

**H1.** Poinstruuj w raporcie (i sprawdź w easy.tools), żeby testowe zakupy nie były robione
kodem rabatowym na 2 zł — psuje to optymalizację wartości w Meta. Prawidłowa metoda testu:
wejście na stronę z `?nopixel=1`, zakup za pełną cenę z maila Pawła (scenariusz CAPI i tak go
odfiltrowuje), potem zwrot w easy.tools.

**H2.** Sprawdź przez MCP Meta, czy w ostatnich 28 dniach nie pojawiają się nowe zdarzenia
`Purchase` o wartości poniżej 30 zł. Jeśli tak — zgłoś w raporcie.

---

## 5. CZEGO NIE WOLNO — TWARDE ZAKAZY

1. **Nie dotykaj kampanii Meta Ads.** Żadnych zmian budżetu, statusu, targetowania, kreacji.
   Meta MCP = tylko odczyt. Kampanie mają działać nieprzerwanie.
2. **Nie kasuj plików na serwerze.** Tylko zmiana nazwy (backup) i upload.
3. **Nie dotykaj katalogu `/panel/`** — tam jest kurs opłaconych klientów.
4. **Nie zmieniaj cen** (79 / 37 / 197 zł) ani danych firmowych i ustawień wypłat w easy.tools.
5. **Nie modyfikuj scenariuszy Make `9575348` i `9506720`.** Scenariusz `9572287` modyfikujesz
   wyłącznie w sposób opisany w zadaniu D (dołożenie trasy) i tylko z kopią zapasową.
6. **Nie wymyślaj opinii, liczb kursantów ani wyników.**
7. **Nie rób zakupów testowych z rabatem na 2 zł.**
8. **Nie wysyłaj masowych maili bez zatwierdzenia Pawła** — twórz drafty.

---

## 6. KRYTERIA UKOŃCZENIA — dopiero gdy WSZYSTKIE są spełnione, kończysz pracę

- [ ] `curl https://claudewpraktyce.kwiatekmedia.pl/` zwraca nową stronę (fraza „Masz AI. To czemu
      dalej siedzisz"), czas ładowania < 1,5 s, waga < 40 KB
- [ ] Panel kursu `/panel/` nadal działa
- [ ] Przycisk zakupu na stronie prowadzi do koszyka easy.tools z doklejonym `fbclid`
- [ ] Piksel wysyła `PageView`, `ViewContent`, `AddToCart` (potwierdzone w DevTools i w MCP Meta)
- [ ] Brak zdarzeń z `localhost` w danych piksela
- [ ] BLIK jest pierwszą i domyślną metodą płatności w koszyku
- [ ] Odzyskiwanie porzuconych koszyków w easy.tools jest włączone
- [ ] Order bump ma nowy opis i jest nad przyciskiem płatności
- [ ] Scenariusz Make `9572287` ma 5 tras, jest aktywny, fakturowanie nietknięte
- [ ] Scenariusz Make `9581586` ma co najmniej 1 udane uruchomienie
- [ ] W Brevo na liście `L20_KLIENCI` (ID 10) jest co najmniej 1 kontakt
- [ ] Obie automatyzacje w Brevo (sekwencja A i B) są WŁĄCZONE
- [ ] Regulamin i polityka prywatności są dostępne pod adresami ze stopki
- [ ] Kampanie Meta działają nieprzerwanie i nie mają żadnych zmian w konfiguracji

## 7. RAPORT KOŃCOWY

Napisz Pawłowi po polsku, prosto, bez żargonu:
1. Lista tego, co zostało zrobione (odhaczone kryteria)
2. Screenshoty: nowa strona na telefonie i desktopie, ustawienia BLIK, automatyzacje Brevo
3. Czy piksel zbiera dane i jakie liczby widać
4. Co ewentualnie zostało niezrobione i dlaczego (konkretna przyczyna, nie ogólniki)
5. **Plan pomiaru:** za 7 dni porównać z baseline (104 wejścia, 19 zakupów, ROAS 2,11).
   Cel: ≥38 zakupów tygodniowo.

Zacommituj wszystkie zmiany w plikach do repo na branch
`claude/course-sales-campaign-analysis-dpddji` (PR #2 zaktualizuje się sam).

**Nie kończ pracy przed spełnieniem wszystkich kryteriów z sekcji 6.**
