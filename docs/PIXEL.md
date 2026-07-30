# Piksel 2209863822840705 — co naprawia nowa strona i co zostało

## Diagnoza (23–29.07)

| Problem | Skutek |
|---|---|
| ViewContent: 3 zdarzenia na 103 wejścia | Andromeda nie widzi „oglądających ofertę" |
| AddToCart nie odpalał na stronie | brak środka lejka do modelowania |
| `fbc` tylko na 24% PageView | Meta nie łączy wejścia z kliknięciem reklamy → gorsza atrybucja i optymalizacja |
| Zdarzenia z `http://localhost/` | dane deweloperskie w produkcyjnym pikselu |
| Purchase po 2 zł (testy z 25.07) | zaniżony modelowany AOV przy optymalizacji wartością |

## Co robi nowa strona (index.html)

1. **Strażnik hosta** — pixel odpala się tylko na `claudewpraktyce.kwiatekmedia.pl`.
   Localhost/podglądy nigdy więcej nie trafią do danych.
2. **`?nopixel=1`** — Twój wyłącznik. Raz wejdziesz z tym parametrem na urządzeniu
   i już na stałe jest ono wykluczone (localStorage). Do testów własnych.
3. **Ratowanie `fbclid`** — parametr z reklamy zapisywany natychmiast jako cookie
   `_fbc` (90 dni, domena .kwiatekmedia.pl) + kopia w localStorage. Cel: fbc 24% → 60%+.
4. **PageView → ViewContent → AddToCart** z `eventID` na każdym zdarzeniu:
   - ViewContent: gdy sekcja zakupu jest realnie widoczna (IntersectionObserver),
     z `content_ids:["kurs-claude"]` — spójnie z CAPI z Make
   - AddToCart: klik w każdy przycisk CTA, tuż przed przejściem do koszyka

## Serwerowa strona (Make, scenariusz 9575348) — już dobra, nie ruszać

Zweryfikowane 30.07: filtr odrzuca Twoje maile i zamówienia testowe, hashuje
em/fn/ln/ct/zp/country, przekazuje fbp/fbc gdy są, `event_id = order_uuid`.
Wysyła `ZakupPelnaWartosc` (tryb pomiarowy) — celowo osobna nazwa, żeby nie
dublować Purchase z przeglądarki easy.tools.

## Co zostało do zrobienia ręcznie (10 min)

1. **easy.tools → ustawienia piksela:** upewnij się, że przy zdarzeniach koszyka
   easy.tools wysyła e-mail klienta (advanced matching). Purchase miał e-mail
   tylko w 66,7% — powinno być ~100%, skoro mail jest obowiązkowy w koszyku.
2. **Events Manager → Testuj zdarzenia:** przejdź ścieżkę wg `WDROZENIE.md` krok 3.
3. **Nigdy więcej testów z rabatem 2 zł** — patrz `CHECKOUT-EASYTOOLS.md` sekcja D.

## Jak mierzyć sukces (po 7 dniach od wdrożenia)

| Metryka | Było (23–29.07) | Cel |
|---|---|---|
| klik linku → LPV | 36% | ≥60% |
| ViewContent / LPV | 3% | ≥50% |
| pokrycie `fbc` w PageView | 24% | ≥60% |
| checkout → zakup | 56% | ≥70% |
| zakupy / tydzień | 19 | ≥38 |
