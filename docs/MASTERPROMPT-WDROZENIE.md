# MASTERPROMPT — wklej do nowego okna Claude Code

> **WAŻNE:** ten prompt zadziała w pełni tylko, jeśli Claude Code jest uruchomiony
> **lokalnie na komputerze Pawła** (CLI w terminalu / rozszerzenie IDE), a nie w chmurze.
> Sesja w chmurze ma odciętą sieć i utknie tak samo jak poprzednia.

---

Jesteś Claude Code uruchomiony na komputerze Pawła Kwiatka (KWIATEKmedia). Paweł NIE jest
techniczny — nie tłumacz mu procedur, tylko wykonaj je za niego i zdaj krótki raport po polsku.
Masz jego pełną zgodę i wyraźne polecenie, żeby działać w jego zalogowanych panelach.

## CEL

Dokończyć wdrożenie kampanii sprzedażowej kursu „Claude w praktyce" (79 zł). Poprzednia sesja
(w chmurze) przygotowała wszystko, ale nie miała dostępu do internetu, więc dwa ostatnie kroki
czekają na Ciebie. Cel biznesowy: podwojenie sprzedaży bez zwiększania budżetu reklamowego.

## STAN — CO JUŻ DZIAŁA (nie ruszaj tego)

- Nowa strona sprzedażowa: gotowa, przetestowana (25/25 testów), na branchu
  `claude/course-sales-campaign-analysis-dpddji` w repo `Pawel2884/landing-page-pawel` (publiczne)
- Brevo: klucz wpięty, listy utworzone (L10=9 porzucone koszyki, L20=10 klienci,
  L21=11 bez cross-sella, L30=12 ma cross-sell), 12 atrybutów kontaktu
- Make (team 2349260, org 4709930): scenariusz `9581586 Brevo sync zakupow` — AKTYWNY, działa;
  `9575348 Meta CAPI`, `9572287 Faktury` — działają, NIE DOTYKAJ
- Piksel Meta: `2209863822840705`

## DANE, KTÓRYCH BĘDZIESZ POTRZEBOWAĆ

| Co | Wartość |
|---|---|
| Strona (produkcja) | https://claudewpraktyce.kwiatekmedia.pl/ |
| Nowy plik (raw) | https://raw.githubusercontent.com/Pawel2884/landing-page-pawel/claude/course-sales-campaign-analysis-dpddji/index.html |
| Menedżer plików Hostinger | https://hpanel.hostinger.com/websites/claudewpraktyce.kwiatekmedia.pl/files/file-manager |
| Serwer FTP | `ftp.claudewpraktyce.kwiatekmedia.pl` (46.17.175.123) |
| Koszyk easy.tools | https://cart.easy.tools/checkout/kwiatekmedia/claude-w-praktyce |
| Produkt w easy.tools | `cart.easy.tools/creator/products/6a8960ac-7f4e-40c6-9625-cee7a51db540` |
| E-mail Pawła (login) | pawel.kwiatek1177@gmail.com |

---

## KLUCZOWA TECHNIKA: użyj PRAWDZIWEGO, ZALOGOWANEGO Chrome Pawła

Nie otwieraj czystego Playwrighta — nie ma w nim żadnych logowań. Podłącz się pod istniejący
profil Chrome Pawła przez `launchPersistentContext`. Wtedy jesteś zalogowany wszędzie tam,
gdzie on.

```js
import { chromium } from 'playwright';
import os from 'os';
import path from 'path';

// Ścieżki profilu Chrome:
//  macOS:   ~/Library/Application Support/Google/Chrome
//  Windows: %LOCALAPPDATA%\\Google\\Chrome\\User Data
//  Linux:   ~/.config/google-chrome
const profile = path.join(os.homedir(), 'Library/Application Support/Google/Chrome'); // dostosuj do systemu

const ctx = await chromium.launchPersistentContext(profile, {
  channel: 'chrome',   // prawdziwy Chrome, nie Chromium
  headless: false,     // Paweł ma widzieć, co się dzieje
  args: ['--profile-directory=Default'],
});
const page = ctx.pages()[0] || await ctx.newPage();
```

**Zanim to odpalisz: Chrome musi być CAŁKOWICIE zamknięty** (profil jest blokowany przez
działającą instancję). Poproś Pawła jednym zdaniem: „Zamknij proszę całkowicie Chrome, daj znać".
Jeśli profil jest zablokowany albo logowań nie ma — plan B: zaloguj się przez magic-link/kod,
który easy.tools wysyła na maila (odbierz go z Gmaila Pawła, MCP Gmail lub jego skrzynka).

---

## ZADANIE 1 — Wdroż nową stronę na Hostinger

Najpierw sprawdź, czy nie jest już wdrożona:

```bash
curl -s https://claudewpraktyce.kwiatekmedia.pl/ | grep -c "Masz AI. To czemu dalej siedzisz"
```

Jeśli `1` → strona już jest, pomiń zadanie 1.

Pobierz nowy plik:

```bash
curl -sL -o /tmp/index-nowy.html "https://raw.githubusercontent.com/Pawel2884/landing-page-pawel/claude/course-sales-campaign-analysis-dpddji/index.html"
grep -c "cart.easy.tools/checkout/kwiatekmedia/claude-w-praktyce" /tmp/index-nowy.html  # musi być 1
```

Wdrożenie przez zalogowany Menedżer plików hPanel (Chrome jak wyżej):

1. Wejdź na `https://hpanel.hostinger.com/websites/claudewpraktyce.kwiatekmedia.pl/files/file-manager`
2. Znajdź katalog z plikiem `index.html` obsługującym subdomenę (zwykle
   `public_html` albo `domains/claudewpraktyce.kwiatekmedia.pl/public_html`)
3. **BACKUP:** zmień nazwę istniejącego `index.html` → `index_stary.bak` (prawy przycisk → Rename)
4. **UPLOAD:** wgraj `/tmp/index-nowy.html`, a po wgraniu zmień mu nazwę na `index.html`
   (albo użyj `page.setInputFiles()` na input[type=file] po kliknięciu Upload)
5. Zrób screenshot po każdym kroku

Alternatywa, jeśli menedżer plików sprawia problemy: w hPanel → Pliki → Konta FTP odczytaj
nazwę użytkownika i ustaw nowe hasło, po czym wgraj plik przez `lftp`/`curl -T` na
`ftp.claudewpraktyce.kwiatekmedia.pl`.

Weryfikacja (obowiązkowa):

```bash
curl -s https://claudewpraktyce.kwiatekmedia.pl/ | grep -c "Masz AI. To czemu dalej siedzisz"  # 1
curl -s https://claudewpraktyce.kwiatekmedia.pl/ | grep -c "km_nopixel"                        # 1
curl -so /dev/null -w "czas: %{time_total}s waga: %{size_download}B\n" https://claudewpraktyce.kwiatekmedia.pl/
```

Potem otwórz `https://claudewpraktyce.kwiatekmedia.pl/?nopixel=1` w Chrome, przewiń całą stronę,
zrób screenshot i sprawdź, że przycisk „Kupuję kurs" prowadzi do koszyka easy.tools.

## ZADANIE 2 — easy.tools: BLIK domyślny + odzyskiwanie koszyków

Kontekst liczbowy: 32 osoby rozpoczęły płatność, kupiło 18 (44% porzuceń). BLIK to w Polsce
metoda ~70% kupujących przy kwocie 79 zł.

Wejdź zalogowanym Chrome na `https://cart.easy.tools/` (jeśli trzeba — kod logowania z Gmaila
Pawła) i ustaw **tylko to**:

1. **BLIK jako pierwsza i domyślnie zaznaczona metoda płatności** (karta druga, przelew trzeci) —
   szukaj w ustawieniach produktu lub sklepu, sekcja metod płatności / kolejność
2. **Włącz odzyskiwanie porzuconych koszyków** (Abandoned cart recovery) — jeśli da się ustawić
   opóźnienia, ustaw maile po **1 h** i po **24 h**
3. **Minimum pól w koszyku** — zostaw wymagany tylko e-mail (+ ewentualnie imię). Dane do faktury
   przestaw na opcjonalne / za checkboxem „Chcę fakturę na firmę"
4. **Nie wymuszaj zakładania konta** przed płatnością
5. **Zgoda na natychmiastowe dostarczenie treści cyfrowej** — jeśli easy.tools ma taki checkbox,
   włącz go (bez niego klient ma ustawowe 14 dni na odstąpienie nawet po przerobieniu kursu)

Screenshot PRZED i PO każdej zmianie.

**CZEGO NIE WOLNO:** nie zmieniaj cen (79 zł kurs, 37 zł order bump, 197 zł cross-sell),
nie usuwaj produktów, nie dotykaj ustawień wypłat ani danych firmowych.

## ZADANIE 3 — Weryfikacja piksela

Jeśli masz MCP do Meta Ads: `ads_get_dataset_stats` dla datasetu `2209863822840705`,
`aggregation=event`, ostatnie 2 godziny — sprawdź, czy płyną `PageView`, `ViewContent`, `AddToCart`.
Jeśli nie masz MCP: wejdź w Events Manager → Testuj zdarzenia i przejdź ścieżką na stronie.

Oczekiwana sekwencja przy wejściu na stronę i kliknięciu CTA:
`PageView` → `ViewContent` → `AddToCart` (każde z własnym `eventID`).

---

## ZASADY BEZPIECZEŃSTWA (twarde)

- **Nigdy nie kasuj plików na serwerze** — tylko zmiana nazwy (backup) i upload
- **Nie dotykaj katalogu `/panel/`** — tam siedzi kurs opłaconych klientów
- **Nie zmieniaj niczego w kampaniach Meta Ads** bez osobnego polecenia Pawła
- **Testy strony rób z `?nopixel=1`**, żeby nie zaśmiecać danych reklamowych
- **Nie rób testowych zakupów z kodem rabatowym na 2 zł** — psuje to optymalizację wartości
  w Meta (zdarzyło się już 25.07)
- Jeśli coś pójdzie nie tak z wdrożeniem: przywróć `index_stary.bak` → `index.html`

## RAPORT KOŃCOWY

Napisz Pawłowi po polsku, prosto i nietechnicznie:
1. Co zostało zrobione (lista) + screenshoty
2. Czy nowa strona jest live i ile się ładuje
3. Czy BLIK jest domyślny i czy odzyskiwanie koszyków działa
4. Czy piksel zbiera zdarzenia
5. Co ewentualnie zostało i dlaczego

Baseline do porównania za 7 dni (kampania „Sprzedaż szkolenie Claude", 23–29.07):
284 kliknięcia linku → 103 wejścia na stronę → 32 rozpoczęte płatności → **18 zakupów**.
Cel: ≥38 zakupów tygodniowo.

**Nie kończ pracy, dopóki strona nie jest live i BLIK nie jest domyślny.** Jeśli utkniesz,
napisz Pawłowi dokładnie co widzisz na ekranie i o co go prosisz — jednym prostym zdaniem.
