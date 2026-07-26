# Analiza lejka sprzedażowego — kurs „Claude w praktyce"

Data: 26.07.2026 · Okres danych: ostatnie 90 dni · Konto: `PawełKwiatek` (1569482637544365)
Kampania: **Sprzedaż szkolenie Claude** (`120252985889790581`)

---

## 0. Zakres — co udało się sprawdzić, a czego nie

**Sprawdzone na żywo:** telemetria Meta Ads (kampanie, reklamy, kreacje, podział na placementy,
dzienny trend), jakość pixela `KwiatekMediaPixel`, potwierdzenia zakupu i faktury w Gmailu,
stan Brevo.

**Niesprawdzone:** sama strona sprzedażowa i checkout. W tej sesji cały ruch wychodzący HTTP jest
zablokowany przez politykę egress (`kwiatekmedia.pl:443` → 403 na CONNECT; blokada dotyczy też
każdego innego hosta, łącznie z `example.com`). Nie przeszedłem więc lejka klikiem — nie zmierzyłem
czasu ładowania, nie zobaczyłem układu strony ani kroków koszyka. **Wszystkie wnioski o stronie
poniżej są wywnioskowane z telemetrii, nie z oględzin.** To jedyna luka w tej analizie.

---

## 1. Mapa lejka (stan faktyczny)

```
Meta (FB feed 78% budżetu / IG stories / reels)
   ↓  reklama-post (SHOP_NOW / SEE_DETAILS)
Landing page  kwiatekmedia.pl
   ↓
Checkout  easy.tools  →  Stripe (cs_live_...)
   ↓  order bump: „prompty" +37 zł
Potwierdzenie: mail od easy.tools + dostęp do panelu
   ↓
Fakturownia → faktura na maila + kopia archiwalna + SaldeoSmart
   ↓
■■■ KONIEC ■■■   ← brak jakiegokolwiek ciągu dalszego
```

---

## 2. Liczby

| Krok | Wartość | Konwersja kroku | % od impresji |
|---|---:|---:|---:|
| Wyświetlenia | 30 505 | — | 100% |
| Kliknięcia (wszystkie) | 1 309 | 4,29% | 4,291% |
| Kliknięcia wychodzące | 610 | 46,60% | 2,000% |
| Wyświetlenia strony (LPV) | 213 | **34,92%** | 0,698% |
| InitiateCheckout | 39 | 18,31% | 0,128% |
| Zakup | 53 | *135,9%* | 0,174% |

```
Wydatek 1 691,17 zł · Przychód 4 187 zł · ROAS 2,48 · CPA 31,91 zł · AOV 79,00 zł
CPM 55,44 zł · CPC 1,29 zł · koszt kliknięcia wychodzącego 2,77 zł · koszt LPV 7,94 zł
```

### Podział na placementy

| Placement | Wydatek | CTR | Zakupy | CPA | ROAS |
|---|---:|---:|---:|---:|---:|
| feed | 1 311 zł | 4,56% | 43 | 30,50 zł | 2,59 |
| facebook_reels | 143 zł | 3,88% | 3 | 47,51 zł | 1,66 |
| instagram_stories | 112 zł | 4,30% | 4 | 27,89 zł | **2,83** |
| instagram_reels | 60 zł | 2,73% | 2 | 29,95 zł | 2,64 |
| facebook_reels_overlay | 13 zł | 3,13% | 1 | 13,38 zł | 5,90 |
| right_hand_column | 9,50 zł | 0,67% | 0 | — | — |

### Najlepsze i najgorsze reklamy

| Reklama | Wydatek | CTR | Zakupy | CPA | ROAS |
|---|---:|---:|---:|---:|---:|
| Kreacja 1.5 | 889 zł | 4,30% | 35 | 25,41 zł | 3,11 |
| Kreacja 1 | 59 zł | 7,73% | 3 | 19,66 zł | **4,02** |
| Kreacja 4 | 256 zł | 3,53% | 8 | 31,96 zł | 2,47 |
| **Kreacja 4.2** | **223 zł** | 3,38% | 3 | **74,44 zł** | **1,06** |

---

## 3. Co jest dobre

1. **CTR 4,29% na kampanii sprzedażowej to bardzo wysoki wynik.** Hook i kreacja działają.
   „Kreacja 1" ma 7,73%. Copy („Masz AI. To czemu dalej siedzisz nad ofertą o 21:47?") trafia
   w realny ból, a nie w cechy produktu.
2. **CPM 55 zł i CPC 1,29 zł** — tanio jak na polski rynek kursów.
3. **ROAS 2,48 przy produkcie za 79 zł** to solidny wynik na zimnym ruchu.
4. **Oferta jest dobrze skonstruowana:** cena bez abonamentu, dożywotni dostęp, 7 dni zwrotu,
   konkret („18 modułów, 83 lekcje, 253 prompty, 20 workflow"). Zdejmuje ryzyko.
5. **Order bump już istnieje** — infrastruktura jest, tylko nie pracuje.
6. **Zaplecze operacyjne działa** — Stripe → faktura → księgowość, wszystko zautomatyzowane.

---

## 4. Problemy — od najdroższego

### 4.1 Dziura klik → strona: tracisz 65% ruchu (~1 100 zł)

**610 kliknięć wychodzących → 213 wyświetleń strony.** Dwie na trzy osoby, za które zapłaciłeś,
nigdy nie zostają zaliczone jako wejście na stronę.

Potwierdza to jakość pixela: **`fbc` (identyfikator kliknięcia) jest tylko na 24,1% PageView.**
Czyli 3 na 4 wejścia nie niosą informacji o kliknięciu w reklamę.

To jest albo (a) strona ładuje się tak wolno, że ludzie wychodzą przed odpaleniem pixela, albo
(b) parametr `fbclid` gubi się po drodze — przekierowanie, zgoda na cookies odpalana przed
pixelem, cache. **Najpewniej jedno i drugie.**

Ile to warte — przy zachowaniu obecnej konwersji strony:

| Klik → LPV | LPV | Zakupy | CPA | ROAS | Przychód |
|---:|---:|---:|---:|---:|---:|
| 34,9% (dziś) | 213 | 53 | 31,91 zł | 2,48 | 4 187 zł |
| 50% | 305 | 76 | 22,28 zł | 3,55 | 5 995 zł |
| 65% | 396 | 99 | 17,14 zł | 4,61 | 7 794 zł |
| 80% | 488 | 121 | 13,93 zł | 5,67 | 9 593 zł |

To górna granica (zakłada utrzymanie CVR strony 24,9%), ale kierunek jest jednoznaczny:
**to najtańsza rzecz do naprawy w całym lejku i nie wymaga złotówki więcej na reklamę.**

### 4.2 Pomiar jest połamany — optymalizujesz na zaszumionym sygnale

| Zdarzenie | EMQ | Pokrycie e-mailem | Problem |
|---|---:|---:|---|
| Purchase | 7,2 | 66,7% | Masz mail przy checkoucie — powinno być ~100% |
| InitiateCheckout | 7,0 | 39,1% | j.w. |
| PageView | 6,1 | 3,7% | `fbc` tylko 24,1% |
| ViewContent | 6,1 | brak | W kampanii tylko **2** zdarzenia / 845 zł za sztukę |
| AddToCart | 6,1 | brak | W ogóle nie odpala w lejku |

Dwie twarde anomalie:
- **53 zakupy przy 39 checkoutach.** InitiateCheckout gubi ~14 zdarzeń. Kolejność lejka jest
  niemożliwa, więc Andromeda nie ma czym modelować grupy „prawie kupili".
- **ViewContent = 2.** Praktycznie nie istnieje.

Brak też telefonu, miasta i kodu pocztowego w żadnym zdarzeniu — CAPI nie dostaje pełnego
kompletu, mimo że Stripe te dane ma.

**Skutek:** algorytm uczy się na 66% sygnału zamiast 100% i nie ma pośrednich zdarzeń do
budowy lookalike'ów. Przy takim CTR to marnowanie dobrej kreacji.

### 4.3 Testowe zakupy zanieczyszczają pixel

25.07 poszło **5 zakupów po 2 zł** z Twojego własnego maila (easy.tools, kod rabatowy),
plus faktura 58/07/2026 na 2,00 zł. To trafia do pixela jako `Purchase` o wartości 2 zł.

Przy 53 zakupach pięć śmieciowych zdarzeń o wartości 2,5% ceny zaniża modelowany AOV
i psuje optymalizację wartościową. **Testy rób z wyłączonym pixelem albo na koncie
testowym.**

### 4.4 Order bump praktycznie nie sprzedaje: 4,5%

Na 22 sprawdzone faktury B2C **jedna** miała „kurs + prompty 37" (116 zł). Reszta — czyste 79 zł.

| Attach rate | AOV | ROAS | Dodatkowy przychód / 53 zakupy |
|---:|---:|---:|---:|
| 4,5% (dziś) | 80,66 zł | 2,53 | +98 zł |
| 20% | 86,40 zł | 2,71 | +392 zł |
| 30% | 90,10 zł | 2,82 | +588 zł |
| 40% | 93,80 zł | 2,94 | +784 zł |

Order bumpy w tej kategorii robią 20–40%. 4,5% oznacza, że jest źle wyeksponowany albo źle
opisany — to nie jest problem oferty, tylko jednego checkboxa na checkoucie.

### 4.5 Największy problem: lejek kończy się na fakturze

**W Brevo jest 0 kampanii mailowych.** Zero. Po zakupie klient dostaje dostęp, fakturę — i cisza.

Nie ma: sekwencji onboardingowej, odzyskiwania porzuconych koszyków (a 39 osób weszło
w checkout i część nie kupiła), prośby o opinię, upsellu, żadnego kontaktu.

To jest miejsce, gdzie zostawiasz najwięcej pieniędzy — i przechodzę do tego osobno,
bo to nie jest usterka, tylko brakująca połowa modelu biznesowego.

---

## 5. Rzecz najważniejsza: masz przód lejka bez tyłu

Zestawienie, które mówi wszystko:

| | Wydatek | Efekt | Koszt kontaktu |
|---|---:|---:|---:|
| 11 kampanii lead ads | 13 755 zł | 151 leadów | **91,09 zł** |
| Kurs „Claude w praktyce" | 1 691 zł | 53 klientów | **−47,09 zł** |

Lead z formularza kosztuje Cię **91 zł i nic nie zapłacił**.
Kursant **dopłaca Ci 47 zł** — i zdążył Ci zaufać, zobaczyć jak pracujesz i wyjąć kartę.
Różnica na jeden kontakt: **138 zł**.

Gdyby te 13 755 zł przepuścić przez lejek kursowy przy dzisiejszym CPA:
**≈431 kursantów i ≈34 000 zł przychodu** zamiast 151 leadów i zera.

I teraz sedno: **Twoim high-ticketem jest obsługa Meta Ads w KWIATEKmedia.**
Kursant to człowiek, który właśnie udowodnił, że ma problem z marketingiem i jest gotów płacić.

Ile kosztuje brak tego połączenia:

| Konwersja kursant → klient agencji | Klienci | Przy 1 500 zł/mc |
|---:|---:|---:|
| 3% | 1,6 | 2 385 zł/mc |
| 5% | 2,7 | 3 975 zł/mc |
| 10% | 5,3 | 7 950 zł/mc |

**Powtarzalnie.** Z jednej kampanii za 1 691 zł. Masz nawet gotowy skill
`kwiatek-followup-kurs` (oferta −25% dla kursantów) — tylko odpalany ręcznie, po jednym mailu.

---

## 6. Plan działania

### Teraz (ten tydzień, zero dodatkowego budżetu)

1. **Napraw ścieżkę klik → strona.** Zmierz czas ładowania na 4G, sprawdź czy `fbclid` przeżywa
   przekierowanie i czy baner cookies nie blokuje pixela przed zgodą. Cel: `fbc` z 24% → 60%+.
2. **Napraw pixel.** Hashowany e-mail do wszystkich zdarzeń (masz go ze Stripe'a), dorzuć telefon
   i lokalizację przez CAPI. Napraw kolejność InitiateCheckout. Odpal ViewContent i AddToCart.
   Cel: Purchase EMQ 7,2 → 9,0+.
3. **Wyczyść testy.** Wyklucz swój ruch, testuj bez pixela.
4. **Wyłącz `Kreacja 4.2`** (ROAS 1,06 — jedyna nierentowna) i `right_hand_column`.
5. **Przesuń budżet** z facebook_reels (ROAS 1,66) na instagram_stories (2,83) i feed (2,59).

### Za dwa tygodnie

6. **Przeprojektuj order bump** — checkbox z ceną porównawczą, tuż nad przyciskiem płatności.
   Cel: 4,5% → 25%.
7. **Sekwencja mailowa w Brevo.** Minimum: odzyskiwanie koszyka (2 h / 24 h), onboarding
   dzień 0/1/3/7, prośba o opinię dzień 14.
8. **Upsell po zakupie** — na stronie „dziękuję", nie po tygodniu.

### Miesiąc

9. **Zautomatyzuj most kurs → agencja.** Dzień 7–14, po tym jak kursant zobaczył moduł o Meta Ads:
   oferta audytu / obsługi. To jest ten moment, nie moment zakupu.
10. **Custom audience z kursantów** → lookalike 1% jako nowa grupa dla kampanii sprzedażowej.
11. **Retencja kreacji.** „Kreacja 1.5" zjadła 53% budżetu kampanii. Potrzebujesz 3–4 nowych
    hooków miesięcznie, bo Andromeda karze powtarzalne kreacje.

---

## 7. Werdykt

Lejek jest **dobrze zbudowany na wejściu i urwany na wyjściu.**

Reklamy działają lepiej niż u większości ludzi w tej branży — CTR 4,29% i CPC 1,29 zł to nie
przypadek. Oferta jest uczciwa i dobrze wyceniona. Zaplecze techniczne (Stripe, faktury,
księgowość) działa bez Twojego udziału.

Ale kurs za 79 zł przy CPA 31,91 zł zostawia 47 zł brutto na klienta. Po VAT, podatku i prowizjach
to jest **praktycznie zero**. Ten produkt nigdy nie miał zarabiać — miał budować listę i zaufanie.
Lista powstaje, zaufanie powstaje, i **nic się z tym nie dzieje**.

Nie masz problemu z marketingiem. Masz kompletny przód lejka i brakujący tył.
