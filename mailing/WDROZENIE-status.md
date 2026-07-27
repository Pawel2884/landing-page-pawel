# Wdrożenie mailingu: status

Data: 27.07.2026
Zasada wdrożenia: **wszystko addytywnie**. Nic z tego, co działało, nie zostało zmienione.

---

## 1. Co zostało wdrożone

### Brevo: 12 szablonów maili, aktywne, gotowe do użycia w automatyzacji

Nadawca w każdym: `Paweł z KWIATEKmedia <kontakt@kwiatekmedia.pl>` (sender id 2). Odpowiedzi wracają na `kontakt@kwiatekmedia.pl`.

| ID | Szablon | Temat |
|---|---|---|
| 20 | KOSZYK A1/5 Prompt za darmo | Zanim wrócisz na tamtą stronę, weź to za darmo |
| 21 | KOSZYK A2/5 Claude jak Google | Błąd, przez który ludzie odpuszczają AI po dwóch tygodniach |
| 22 | KOSZYK A3/5 34 godziny | Policzmy, ile kosztuje Cię ten miesiąc |
| 23 | KOSZYK A4/5 Pełna oferta | 79 zł do {{DEADLINE}}. Potem 129 zł i to się już nie cofnie. |
| 24 | KOSZYK A5/5 Deadline | Dzisiaj 79 zł. Jutro 129 zł. |
| 25 | CROSSSELL B1/5 Nie oglądaj do końca | Jedna rada, zanim przerobisz cały kurs |
| 26 | CROSSSELL B2/5 9 na 10 | Dlaczego 9 na 10 osób nigdy nie wypuszcza własnego kursu |
| 27 | CROSSSELL B3/5 Struktura oferty | Właśnie przeszedłeś przez to, o czym Ci napiszę |
| 28 | CROSSSELL B4/5 Oferta 197 zł | Pierwsze 10 000 zł na własnym kursie. 197 zł do {{DEADLINE_B}}. |
| 29 | CROSSSELL B5/5 Deadline | Dzisiaj 197 zł. Jutro 297 zł. |
| 30 | CROSSSELL B6 Downsell prompty | Skoro nie teraz, to weź chociaż to |
| 31 | CROSSSELL B1-HIST | Kupiłeś mój kurs i zniknąłem. Naprawiam to. |

### Brevo: draft kampanii do bazy historycznej

Kampania **id 32**, `BAZA HISTORYCZNA — B1-HIST`. Status draft, **bez odbiorców i bez terminu wysyłki**, więc nie wyjdzie przypadkiem. Wybierzesz listę i wyślesz ręcznie.

### Make: nowy scenariusz `Brevo sync zakupow (EasyTools)`

* **ID scenariusza:** 9581586
* **Status: NIEAKTYWNY.** Włączam go dopiero, gdy w magazynie będzie klucz API.
* **Własny webhook:** `https://hook.eu2.make.com/egqgqwhjx2jfnyh6m4ojudufuaywrhe1`
* Konfigurację czyta z magazynu `mailing_config`, więc nie ma w nim nic wklepanego na sztywno

Co robi, w kolejności:

1. Filtr: przepuszcza tylko `product_assigned` + `success = true` + kwota większa od zera
2. Rozpoznaje koszyk po kwocie: 79, 116, 37, 197, 276, 313
3. Zapisuje kontakt do Brevo z atrybutami i przypisuje do właściwych list
4. Zawsze usuwa go z listy porzuconych koszyków, bo skoro kupił, sekwencja A ma zamilknąć
5. Jeśli kupił cross sell, usuwa go z listy `L21`, co **zatrzymuje sekwencję B**

Zabezpieczenia w środku:

* koszyk `NIEZNANY` (np. po kodzie rabatowym) nie jest zapisywany, żeby nie wpadł do złej sekwencji
* błąd zapisu do Brevo wysyła Ci maila z powodem i **nie przerywa niczego innego**
* usunięcia z list mają `Ignore` na błędzie, bo kontakt może po prostu nie być na danej liście
* dopóki w magazynie stoi `0` zamiast ID list, zapis kontaktu w ogóle się nie odpali

### Make: magazyn konfiguracji `mailing_config`

* **ID magazynu:** 174285, rekord o kluczu `config`
* Trzyma klucz API Brevo i cztery ID list w jednym miejscu
* Czytają go oba scenariusze, więc klucz istnieje tylko raz i wystarczy podmienić go w jednym polu

### Make: scenariusz `SETUP Brevo (jednorazowy) - listy i atrybuty`

* **ID scenariusza:** 9581615, tryb on-demand, **nieaktywny**
* Zakłada w Brevo cztery listy i dwanaście atrybutów kontaktu, po czym zapisuje ID list do magazynu i wysyła Ci podsumowanie mailem
* Odpalam go ja, jednym poleceniem, gdy tylko klucz API znajdzie się w magazynie

---

## 2. Czego NIE dotknąłem (zweryfikowane po fakcie)

| Scenariusz | Stan przed | Stan po |
|---|---|---|
| `Faktury po zakupie kursu - EasyTools` (9572287) | aktywny, lastEdit 26.07 12:08, 0 błędów | **aktywny, lastEdit 26.07 12:08, 0 błędów** |
| `Meta CAPI - ZakupPelnaWartosc` (9575348) | aktywny, lastEdit 26.07 17:21 | **aktywny, lastEdit 26.07 17:21** |
| `Faktury Stripe` (9506720) | nieaktywny | **nieaktywny** |
| Szablony Brevo `Lead Seq 1/5` do `5/5` (11 do 15) | aktywne | **aktywne, nietknięte** |
| Listy `L1_ZGODA_MARKETING`, `LeadForm 20.06` | 2 listy | **2 listy, nietknięte** |

Fakturowanie, KSeF, Saldeo, Meta CAPI i dostęp do produktu działają dokładnie tak jak wczoraj. Nowy scenariusz jest osobnym bytem z osobnym webhookiem i nie ma z nimi żadnego połączenia.

---

## 3. Co zostało do zrobienia

### Krok 1: TWOJA JEDYNA RĘCZNA ROBOTA. Wklej klucz API Brevo

1. Brevo → ikona konta → **SMTP & API** → **API Keys** → wygeneruj klucz v3, skopiuj
2. Make → **Data stores** → `mailing_config` → **Browse** → rekord o kluczu `config`
3. W polu `klucz_brevo` podmień `WKLEJ_TU_KLUCZ_API_BREVO` na swój klucz. Zapisz

To wszystko. Napisz mi, że gotowe, a resztę po stronie Brevo i Make robię ja.

Jeden klucz, jedno pole. Klucz zostaje po Twojej stronie, nie muszę go widzieć, a możesz go unieważnić jednym kliknięciem w każdej chwili.

### Krok 2: to robię ja, jak dasz znać

Uruchamiam scenariusz **SETUP Brevo (jednorazowy)** (id 9581615), który sam:

* zakłada cztery listy: `L10_KOSZYK_PORZUCONY`, `L20_KLIENCI`, `L21_BEZ_CROSSSELL`, `L30_MA_CROSSSELL`
* zakłada dwanaście atrybutów kontaktu: `KWOTA`, `KOSZYK`, `MA_KURS`, `MA_PROMPTY`, `MA_10K`, `DATA_ZAKUPU`, `ORDER_ID`, `DEADLINE`, `DEADLINE_B`, `LINK_KOSZYKA`, `LINK_10K`, `LINK_PROMPTY`
* zapisuje ID list z powrotem do `mailing_config`
* wysyła Ci maila z podsumowaniem i numerami list

Potem włączam scenariusz `Brevo sync zakupow`, który czyta konfigurację z tego samego magazynu, więc nie ma nic do przepisywania ręcznie.

### Krok 3: drugi webhook w EasyTools

EasyTools → Ustawienia sklepu → API i Webhooks → dodaj adres:

```
https://hook.eu2.make.com/egqgqwhjx2jfnyh6m4ojudufuaywrhe1
```

**Nie usuwaj i nie podmieniaj istniejącego webhooka od faktur.** Dodajesz drugi obok pierwszego. Jeśli EasyTools dodaje webhooki tylko do nowych checkoutów, wejdź w każdy istniejący checkout i dodaj go w Automatyzacje → Webhook.

### Krok 4: test na żywo, zanim cokolwiek pójdzie do ludzi

Zrób jeden testowy zakup kodem 100 procent albo najtańszym produktem i sprawdź trzy rzeczy naraz:

1. faktura przyszła jak zawsze (to znaczy, że nic nie zepsułem)
2. kontakt pojawił się w Brevo z wypełnionymi atrybutami i na właściwych listach
3. w Make oba scenariusze mają zielone wykonanie, bez błędów

Dopiero jak te trzy się zgadzają, przechodź dalej.

### Krok 5: dwie automatyzacje w Brevo

Brevo → Automatyzacje → Utwórz workflow → od zera.

**Workflow A: porzucony koszyk**

| Krok | Ustawienie |
|---|---|
| Wyzwalacz | Kontakt dodany do listy `L10_KOSZYK_PORZUCONY` |
| Czekaj 1 godzinę | wyślij szablon **20** (A1) |
| Czekaj 1 dzień | wyślij szablon **21** (A2) |
| Czekaj 2 dni | wyślij szablon **22** (A3) |
| Czekaj 1 dzień | wyślij szablon **23** (A4) |
| Czekaj 3 dni | wyślij szablon **24** (A5) |

Warunek wyjścia: kontakt usunięty z listy `L10`. Robi to Make automatycznie przy zakupie.

**Workflow B: cross sell**

| Krok | Ustawienie |
|---|---|
| Wyzwalacz | Kontakt dodany do listy `L21_BEZ_CROSSSELL` |
| Czekaj 3 dni | wyślij szablon **25** (B1) |
| Czekaj 3 dni | wyślij szablon **26** (B2) |
| Czekaj 3 dni | wyślij szablon **27** (B3) |
| Czekaj 2 dni | wyślij szablon **28** (B4) |
| Czekaj 3 dni | wyślij szablon **29** (B5) |
| Czekaj 3 dni, warunek `MA_PROMPTY` = nie | wyślij szablon **30** (B6 downsell) |

Warunek wyjścia: kontakt usunięty z listy `L21`. Robi to Make w chwili zakupu cross sella.

Przed włączeniem przetestuj oba workflow na własnym adresie, przechodząc całą ścieżkę od początku do końca.

### Krok 6: ceny i kody w EasyTools

Bez tego deadline w mailach 4 i 5 jest odgrywany, a nie prawdziwy.

* podnieś cenę regularną kursu do **129 zł**, cenę produktu za 10 000 zł do **297 zł**
* zrób kod rabatowy sprowadzający kurs do 79 zł, ważny 7 dni
* zrób kod rabatowy sprowadzający cross sell do 197 zł, ważny 14 dni
* linki z tymi kodami wpisuj w atrybuty `LINK_KOSZYKA` i `LINK_10K`

Jeśli nie chcesz podnosić cen, powiedz. Przepiszę maile 23, 24, 28 i 29 na znikający bonus zamiast podwyżki.

### Krok 7: uzupełnij dwa placeholdery w treści

W szablonie **23** (A4) jest żółte pole `[TU WKLEJ LISTĘ MODUŁÓW KURSU]`.
W szablonie **28** (B4) jest żółte pole `[TU WKLEJ LISTĘ TEGO, CO JEST W ŚRODKU]`.

Nie wymyślałem zawartości Twoich produktów. To dwie minuty roboty i muszą być wypełnione przed startem.

### Krok 8: SPF i DKIM

Brevo → Nadawcy, domeny i adresy IP → domena `kwiatekmedia.pl`. Jeśli nie ma zielonych ptaszków przy SPF i DKIM, dodaj rekordy w DNS. **Bez tego wszystko poleci do spamu i cała reszta nie ma znaczenia.**

### Krok 9: porzucone koszyki do listy L10

EasyTools zbiera te adresy przez Checkout Recovery. Sprawdź w panelu, czy da się je wypchnąć webhookiem. Jeśli tak, powiedz, dopiszę drugi scenariusz. Jeśli nie, na razie eksportuj je raz dziennie i importuj do listy `L10`, ustawiając przy imporcie `LINK_KOSZYKA` i `DEADLINE`.

### Krok 10: baza historyczna

Kampania draft **id 32** czeka gotowa. Wybierz listę odbiorców i wyślij ręcznie. Przy limicie 300 maili na dobę rozłóż to na partie. Po wysłaniu dodaj tych ludzi do `L21`, żeby weszli w workflow B od maila B2.

---

## 4. Limity, o których trzeba pamiętać

* **300 maili na dobę** na planie free. To wystarcza na około 60 nowych kontaktów dziennie w sekwencjach. Baza historyczna zjada ten limit, więc nie wysyłaj jej w dniu, w którym testujesz automatyzacje.
* **Tagi kampanii są zablokowane** na planie free. Dlatego kampania 32 nie ma tagu. Szablony tagi mają, bo tam limit nie obowiązuje.
* Make: plan Core, 10 000 operacji miesięcznie. Nowy scenariusz zużywa około 3 operacji na zakup, więc to nieistotny narzut.

---

## 5. Czego nie da się zrobić zdalnie i dlaczego

Sprawdzone, nie założone. Z tego środowiska nie ma ruchu wychodzącego do paneli:

| Host | curl | Chromium |
|---|---|---|
| `app.brevo.com` | 000, CONNECT odrzucony | pusty DOM, strona się nie wczytała |
| `panel.easy.tools` | 000, CONNECT odrzucony | to samo |
| `eu2.make.com` | 000, CONNECT odrzucony | to samo |

Integracje MCP działają, bo te wywołania wychodzą z serwera, a nie z tej maszyny. Dlatego przeglądarka nic tu nie zmienia. Nie jest to kwestia braku Chrome, tylko polityki sieciowej.

Co z tego wynika w praktyce:

* **Brevo przez Make: da się.** Make sięga do `api.brevo.com` z własnej chmury, więc listy, atrybuty, kontakty i listy wykluczeń ogarniam scenariuszami. Stąd scenariusz SETUP.
* **Automatyzacje Brevo: nie da się.** Brevo nie udostępnia w publicznym API tworzenia workflow. To jedyna rzecz w Brevo, która musi powstać klikaniem, i dlatego rozpisałem ją krok po kroku w sekcji 3.
* **EasyTools: nie da się.** Brak integracji i brak dostępu do panelu. Webhook, ceny regularne i kody rabatowe zostają po Twojej stronie.
