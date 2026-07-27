# Plan mailingu: porzucone koszyki + cross sell po kursie

KWIATEKmedia / kurs "Claude w praktyce"
Stack: EasyTools → Make → Brevo
Data: 27.07.2026

---

## 1. Stan na dziś (audyt, nie założenia)

### Co realnie idzie do klientów

| Kanał | Co wysyła | Do kogo | Status |
|---|---|---|---|
| Make 9572287 "Faktury po zakupie kursu EasyTools" | faktura PDF + mail transakcyjny | każdy kto zapłacił | aktywny, 31 uruchomień |
| Make 9506720 "Faktury Stripe" | to samo, stara wersja | historyczni klienci | wyłączony |
| Make 9575348 "Meta CAPI ZakupPelnaWartosc" | event do Meta, nie mail | pixel | aktywny |
| Brevo | nic | nikt | 0 wysłanych kampanii |

### Brevo, stan faktyczny

* Konto free, limit 300 maili na dobę, w chwili sprawdzenia zostało 293 kredyty
* Marketing Automation: włączony (klucz jest)
* Listy: 2, obie puste (`L1_ZGODA_MARKETING`, `LeadForm 20.06`)
* Nadawcy zweryfikowani: `kontakt@kwiatekmedia.pl` (id 2) i gmail (id 1)
* Szablony: 5 gotowych maili `KWIATEKmedia Lead Seq 1/5 ... 5/5`, ale to sekwencja dla leadów z formularza Meta Ads, nie ma nic wspólnego z kursem
* Kampanii wysłanych: **zero**

### Wniosek

Do porzuconych koszyków nie idzie **nic**.
Do kupujących kurs idzie **tylko faktura**.
Cross sell za 197 zł jest oferowany **wyłącznie na stronie zaraz po zakupie**. Kto go tam nie kliknął, nie usłyszy o nim już nigdy.

To jest dziura, a nie brak funkcji. Każdy człowiek, który zapłacił 79 zł i nie dobrał cross sella, jest dzisiaj kontaktem martwym. Zapłacił za pozyskanie, zbudował zaufanie i został porzucony przez system.

### Produkty i ceny (odczytane z konfiguracji Make, nie ze zgadywania)

| Produkt | Cena brutto | Rola |
|---|---|---|
| Kurs "Claude w praktyce", dostęp bezterminowy | 79 zł | produkt główny |
| Pakiet 24 promptów: kreacje, reklamy, strony | 37 zł | order bump w koszyku |
| Pierwsze 10 000 zł na własnym kursie online | 197 zł | **cross sell po zakupie** |

Rozpoznawane koszyki po kwocie: 79, 116, 197, 276, 313, 37.

---

## 2. Architektura, czyli kto komu przekazuje dane

```
EasyTools (checkout)
   │
   ├── [zakup] webhook product_assigned ──► Make 9572287 ──► Fakturownia + mail z fakturą
   │                                            │
   │                                            └──► NOWY route ──► Brevo API
   │                                                 (kontakt + atrybuty + lista)
   │
   └── [porzucenie] przechwycenie maila ──► Make (nowy scenariusz) ──► Brevo lista L10
                                                                          │
                                                              Brevo Automation
                                                              odpala sekwencję
```

Zasada: **Make jest mózgiem, Brevo jest ustami.** Make decyduje kto do jakiego segmentu trafia i kiedy z niego wypada. Brevo tylko wysyła.

### Dlaczego dopinamy się do istniejącego scenariusza, a nie budujemy nowego

Scenariusz 9572287 ma już router z czterema gałęziami i czwarta gałąź wysyła kopię payloadu na inny webhook. Dokładamy piątą gałąź, która strzela do Brevo. Fakturowanie tego nie dotknie, bo router puszcza gałęzie równolegle. Zero ryzyka dla dokumentów księgowych.

---

## 3. Segmentacja w Brevo

### Listy

| Lista | Kto tam trafia | Co uruchamia |
|---|---|---|
| `L10_KOSZYK_PORZUCONY` | zostawił mail, nie zapłacił w 45 min | Sekwencja A |
| `L20_KURS_KUPIONY` | kupił cokolwiek z kursem | nic, to baza |
| `L21_BEZ_CROSSSELL` | ma kurs, nie ma produktu za 197 zł | Sekwencja B |
| `L30_MA_CROSSSELL` | kupił 197 zł | **wyklucza ze wszystkiego** |

### Atrybuty kontaktu do dodania

`IMIE`, `KWOTA` (number), `KOSZYK` (text), `MA_KURS` (bool), `MA_PROMPTY` (bool), `MA_10K` (bool), `DATA_ZAKUPU` (date), `ORDER_ID` (text), `LINK_KOSZYKA` (text).

### Mapowanie kwoty na segment (kopiuj wprost do Make)

| Kwota | MA_KURS | MA_PROMPTY | MA_10K | Lista | Sekwencja |
|---|---|---|---|---|---|
| 79 | tak | nie | nie | L20 + L21 | B, pełna |
| 116 | tak | tak | nie | L20 + L21 | B, bez downsella promptów |
| 37 | nie | tak | nie | L20 | brak |
| 197 | nie | nie | tak | L30 | **stop** |
| 276 | tak | nie | tak | L20 + L30 | **stop** |
| 313 | tak | tak | tak | L20 + L30 | **stop** |

Jedna rzecz jest krytyczna: **zakup produktu za 197 zł musi natychmiast wyrzucić kontakt z L21 i zatrzymać sekwencję.** Mail sprzedażowy do kogoś, kto już kupił, kosztuje więcej niż przynosi. To jedyny błąd w tym systemie, który realnie boli.

---

## 4. Skąd wziąć maile porzuconych koszyków

Tu jest jedyny twardy problem techniczny. EasyTools na liście webhooków ma zdarzenia: `single_product_bought`, `product_assigned`, `product_access_expiring`, `product_access_expired`, `subscription_*`. **Zdarzenia "porzucony koszyk" tam nie ma.** Bez maila nie ma do kogo pisać, więc to trzeba rozwiązać przed pisaniem czegokolwiek.

### Droga 1: natywny Checkout Recovery w EasyTools

Włączasz w panelu, EasyTools sam łapie porzucone checkouty i wysyła przypomnienia.
Plus: 10 minut roboty.
Minus: maile pisze EasyTools, nie Ty. Brak sekwencji 5 maili, brak Twojego stylu, brak kontroli nad treścią. To gaśnica, nie strategia.

### Droga 2: mikro krok przed płatnością (rekomendowana)

Przycisk "Kup" na landingu nie prowadzi wprost do checkoutu, tylko do krótkiego kroku: imię i mail. Dopiero potem checkout z uzupełnionymi danymi. Mail leci webhookiem do Make, Make wrzuca go na `L10_KOSZYK_PORZUCONY`. Kto zapłaci, tego `product_assigned` natychmiast z tej listy zdejmuje. Kto nie zapłaci w 45 minut, dostaje sekwencję A.

Plus: masz 100 procent adresów i pełną kontrolę nad treścią.
Minus: jeden krok więcej w lejku, więc konwersja na checkout spadnie o kilka procent. Ale odzysk 10 do 20 procent z porzuconych to znacznie więcej niż te kilka procent.

### Droga 3: tracker Brevo na landingu i checkoucie

Brevo ma gotową automatyzację "porzucony koszyk" opartą o zdarzenia `cart_updated` i `order_completed`. Wymaga wstrzyknięcia skryptu Brevo w stronę checkoutu EasyTools. Do sprawdzenia, czy EasyTools dopuszcza własny kod na checkoucie (obsługuje pixele, więc jest szansa).

Plus: zero dodatkowych kroków w lejku.
Minus: zależne od tego, na co pozwala EasyTools. Do zweryfikowania w panelu.

**Rekomendacja: Droga 2 jako główna, Droga 1 włączona równolegle na pierwszy tydzień jako siatka bezpieczeństwa.**

---

## 5. Sekwencja A: porzucony koszyk

**Kto:** zostawił mail, nie dokończył płatności za kurs 79 zł
**Cel:** dokończenie zakupu
**Długość:** 5 maili w 7 dni

### Założenie psychologiczne

Ten człowiek nie powiedział "nie". Powiedział "nie teraz". To zupełnie inna obiekcja i wymaga zupełnie innego maila. Nie przekonujemy go do produktu, bo on już był przekonany na tyle, żeby kliknąć "Kup". Usuwamy to, co go zatrzymało w ostatniej sekundzie. A zatrzymują zawsze te cztery rzeczy:

1. "Nie mam kiedy tego przerobić"
2. "Sam znajdę to samo na YouTube za darmo"
3. "Nie jestem techniczny, u mnie to nie zadziała"
4. "79 zł to nie problem, tylko czy to cokolwiek zmieni"

Trzy maile edukujące wybijają obiekcje 1, 2 i 3 wartością, nie obietnicą. Dwa sprzedażowe domykają obiekcję 4 i dokładają presję czasu.

| # | Kiedy | Typ | Zadanie maila | Główny mechanizm |
|---|---|---|---|---|
| A1 | +1 h | edukacja | dajesz jeden gotowy prompt, który oszczędza godzinę **dzisiaj**, bez proszenia o cokolwiek | wzajemność, otwarcie pętli |
| A2 | +24 h | edukacja | najdroższy błąd początkującego: traktowanie Claude jak wyszukiwarki, pokazane na PRZED i PO | kontrast, dowód, zamknięcie pętli z A1 |
| A3 | +48 h | edukacja | policzony koszt bezczynności w godzinach, nie w złotówkach, plus hak tożsamościowy | awersja do straty, spójność z tożsamością |
| A4 | +72 h | **sprzedaż** | pełna oferta, rozbicie ceny, wybicie wszystkich czterech obiekcji po kolei | kotwiczenie, odwrócenie ryzyka |
| A5 | +6 dni | **sprzedaż** | ostatni mail, twardy deadline, krótki, plus uczciwe wyjście | niedobór, awersja do straty |

Kilka rzeczy stałych w tej sekwencji:

* w mailach A1 do A3 link do koszyka jest, ale nisko i bez nacisku. Sprzedaje wartość, nie link
* każdy mail edukujący kończy się zapowiedzią następnego. To jest technika otwartej pętli od Skwarka i to ona robi open rate w mailach 2 i 3
* A5 zawiera zdanie: jeśli to nie dla Ciebie, kliknij tu i nie odezwę się więcej. Buduje zaufanie, czyści listę i podnosi dostarczalność

---

## 6. Sekwencja B: kupił kurs, nie kupił cross sella

**Kto:** ma kurs (79 lub 116 zł), nie ma produktu za 197 zł
**Cel:** sprzedaż "Pierwsze 10 000 zł na własnym kursie online" za 197 zł
**Długość:** 5 maili w 14 dni, start 3 dni po zakupie

### Założenie psychologiczne

To są ludzie, którzy już zapłacili. Zaufania nie trzeba budować, ono jest. Problem jest zupełnie inny niż przy koszyku: oni nie widzą, **po co im drugi produkt**. Kupili kurs o Claude, dostali kurs o Claude, temat zamknięty.

Więc trzy maile edukujące nie mają nic sprzedawać. Mają zbudować **nowy cel**, którego ten człowiek jeszcze nie ma w głowie:

> Umiesz obsługiwać Claude. Świetnie. Ale umiejętność sama z siebie nie zarabia. Zarabia produkt. A Ty właśnie zdobyłeś umiejętność, z której produkt da się zrobić w dwa tygodnie.

Dopiero kiedy ten cel istnieje, oferta za 197 zł przestaje być dokładaniem kolejnego kursu, a zaczyna być narzędziem do celu, który klient sam sobie postawił trzy maile wcześniej.

| # | Kiedy | Typ | Zadanie maila | Główny mechanizm |
|---|---|---|---|---|
| B1 | +3 dni | edukacja | onboarding, jak wycisnąć z kursu maksimum, plus jedno zdanie sadzące ziarno: wiedza bez produktu to hobby | wzajemność, otwarcie pętli |
| B2 | +6 dni | edukacja | dlaczego kurs online to najprostszy produkt do sprzedania i dlaczego 90 procent ludzi nigdy nie startuje, rozbicie trzech mitów | rozbicie obiekcji zanim padną |
| B3 | +9 dni | edukacja | najmocniejszy mail w całej sekwencji, patrz niżej | dowód na własnej skórze |
| B4 | +11 dni | **sprzedaż** | pełna oferta 197 zł, kotwica 10 000 zł, matematyka progu rentowności | kotwiczenie, logika |
| B5 | +14 dni | **sprzedaż** | deadline, krótko, twardo, plus uczciwe wyjście | niedobór |

### Dlaczego B3 jest najmocniejszy

W mailu B3 mówisz wprost: kurs się nie sprzedaje treścią, tylko strukturą oferty. I pokazujesz strukturę na przykładzie, który ten człowiek zna od środka, bo właśnie przez nią przeszedł:

> Produkt główny 79 zł. Dokładka w koszyku 37 zł. Oferta zaraz po zakupie 197 zł.
> Wiesz, skąd to wiem, że to działa? Bo dokładnie przez ten lejek przeszedłeś, kupując ten kurs.

To jest uczciwe, sprawdzalne i nie do podważenia. Klient nie musi Ci wierzyć, bo sam był dowodem. Żaden inny argument w tej sekwencji nie ma takiej siły.

### Downsell (opcja do decyzji)

Kto po B5 nie kupił produktu za 197 zł i nie ma jeszcze pakietu promptów (koszyk 79 zł), może dostać szósty mail z pakietem 24 promptów za 37 zł. Niższy próg, ratuje część kontaktów, które odpadły na cenie. Do włączenia albo odrzucenia, ale zaznaczam, że to zwykle dokłada kilka procent do wyniku całej sekwencji.

---

## 7. Styl pisania

### Ze szkoły Mirosława Skwarka

* **Otwarte pętle.** Każdy mail edukujący kończy się zapowiedzią następnego. Nie "do zobaczenia jutro", tylko konkretna niedokończona myśl, która swędzi.
* **Temat robi 80 procent roboty.** Najlepszy mail z nudnym tematem nie istnieje, bo nikt go nie otworzy.
* **Prosty język, jedna osoba.** Piszesz do jednego człowieka, nie do bazy. Nigdy "drodzy kursanci".
* **Historia zamiast wykładu.** Konkretna sytuacja z życia zamiast akapitu teorii.

### Ze szkoły Adriana Kołodzieja

* **Direct response.** Mail ma jedno zadanie: kliknięcie. Nie podziw, nie budowanie marki, nie "wartość dodana". Klik.
* **Jedna oferta, jedno CTA.** Dwa linki do dwóch różnych rzeczy to zero sprzedaży.
* **Obiekcje wybijane zanim klient je pomyśli.** Wymieniasz je na głos i rozbijasz po kolei. Klient wtedy nie ma czym się bronić.
* **Twarda mechanika deadline.** Termin musi być prawdziwy i musi mieć konsekwencję. Fałszywy deadline zabija zaufanie na zawsze.
* **Liczby, nie przymiotniki.** "41 leadów w 24h" zamiast "świetne wyniki".
* **PS na końcu.** Drugi najczęściej czytany element maila po temacie. Wchodzi tam powtórzone CTA albo najmocniejszy argument.

### Zasady twarde dla całej treści

* zero myślników i pauz jako łącznika zdań, zamiast tego krótsze zdania
* zero słów zakazanych z tonu głosu: "odkryj", "zapraszamy", "kompleksowy", "najwyższa jakość", "gwarantujemy", "w dzisiejszych czasach"
* akapity po 2 do 3 linie, jedna myśl na zdanie
* zwrot "Ty", nigdy "Państwo"
* telefon w treści zapisywany ze spacjami: 695 947 017

---

## 8. Techniczne warunki startu

| Rzecz | Status | Uwaga |
|---|---|---|
| SPF, DKIM, DMARC na `kwiatekmedia.pl` w Brevo | **do sprawdzenia** | bez tego wszystko leci do spamu, to warunek konieczny a nie kosmetyka |
| Nadawca | gotowe | "Paweł z KWIATEKmedia", `kontakt@kwiatekmedia.pl` |
| Limit wysyłki | 300 na dobę (plan free) | starcza na około 60 nowych kontaktów dziennie w sekwencjach. Przy jednorazowej wysyłce do bazy historycznej trzeba rozłożyć na dni albo wejść na płatny |
| Zgody marketingowe | **do ustalenia** | patrz niżej |
| Link wypisu w każdym mailu | wymagane | Brevo wstawia automatycznie |
| UTM na wszystkich linkach | do zrobienia | `utm_source=brevo&utm_campaign=koszyk_a1` itd. |

### RODO w dwóch zdaniach

Kupujący to klient, więc kontakt w sprawie produktu podobnego mieści się w uzasadnionym interesie. Porzucony koszyk to osoba, która sama zostawiła mail w Twoim formularzu, ale tu bezpieczniej jest mieć przy tym polu checkbox zgody marketingowej. Koszt: jeden checkbox. Zysk: spokój.

---

## 9. Co mierzymy

| Metryka | Sekwencja A | Sekwencja B |
|---|---|---|
| Open rate maili edukujących | powyżej 40 procent | powyżej 45 procent (to klienci, znają Cię) |
| CTR maili sprzedażowych | powyżej 5 procent | powyżej 6 procent |
| **Konwersja całej sekwencji** | **10 do 20 procent odzyskanych koszyków** | **8 do 15 procent kupuje cross sell** |
| Wypisy | poniżej 1 procent na mail | poniżej 1 procent na mail |

Przy sekwencji B liczy się tylko jedna liczba: ile razy 197 zł wpadło z maila, a nie ze strony po zakupie. To trzeba rozdzielić UTM od pierwszego dnia, inaczej za miesiąc nie będzie wiadomo, co zadziałało.

---

## 10. Kolejność wdrożenia

1. Sprawdzenie SPF i DKIM na domenie, bo bez tego reszta nie ma sensu
2. Założenie list i atrybutów w Brevo
3. Piąta gałąź w Make 9572287, czyli sync zakupów do Brevo, z twardą regułą wypisu przy 197 zł
4. Przechwytywanie maila przed checkoutem (Droga 2) plus włączenie natywnego recovery EasyTools na wszelki wypadek
5. Napisanie 10 maili i wgranie ich jako szablony do Brevo
6. Zbudowanie dwóch automatyzacji w Brevo i test na własnym adresie, cała sekwencja od początku do końca
7. Włączenie na żywo, obserwacja pierwszych 7 dni
8. Po dwóch tygodniach: testy A/B na tematach maili A1 i B4, bo tam jest największy zysk z optymalizacji

Punkty 1 do 3 to jeden wieczór roboty. Punkt 5 to główna praca merytoryczna.

---

## 11. Decyzje potrzebne przed pisaniem treści

1. **Mechanika pilności w mailach 4 i 5.** Rabat czasowy, znikający bonus czy podwyżka ceny? Bez tego maile sprzedażowe nie mają czym domykać, a deadline musi być prawdziwy.
2. **Skąd bierzemy maile porzuconych koszyków.** Droga 1, 2 czy 3 z sekcji 4.
3. **Czy włączamy downsell** promptów za 37 zł po nieudanej sekwencji B.
4. **Czy piszemy do bazy historycznej**, czyli do ludzi, którzy kupili kurs zanim ten system ruszył. To jednorazowa kampania, nie automatyzacja, i przy limicie 300 maili na dobę trzeba ją rozłożyć.
