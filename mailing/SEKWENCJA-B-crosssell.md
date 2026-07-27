# Sekwencja B: kupił kurs, nie kupił cross sella

Odbiorca: ma kurs "Claude w praktyce" (koszyk 79 zł albo 116 zł), nie ma produktu za 197 zł
Cel: sprzedaż "Pierwsze 10 000 zł na własnym kursie online", 197 zł
Downsell: Pakiet 24 promptów, 37 zł (tylko dla koszyka 79 zł)
Długość: 5 maili w 14 dni, plus opcjonalny szósty
Start: 3 dni po zakupie

---

## Mechanika podwyżki ceny

Ta sama logika co w sekwencji A:

1. **Cena regularna produktu za 10 000 zł idzie w górę do 297 zł.**
2. **197 zł zostaje ceną dla kursanta**, ważną 14 dni od zakupu kursu.
3. Po 14 dniach kod wygasa i zostaje 297 zł.

Uzasadnienie dla klienta jest tu mocniejsze niż w sekwencji A, bo jest prawdziwe i sprawdzalne: ta cena należy Ci się, bo jesteś już moim klientem, a nie dlatego, że akurat trwa promocja.

**Numery 297 zł i 129 zł to moja propozycja, nie ustalenie.** Potwierdź je albo podaj swoje, podmienię w minutę.

### Zmienne

| Zmienna | Co to |
|---|---|
| `{{contact.FIRSTNAME}}` | imię z faktury albo z checkoutu |
| `{{contact.LINK_10K}}` | link do checkoutu produktu 197 zł z kodem kursanta |
| `{{contact.LINK_PROMPTY}}` | link do pakietu 24 promptów za 37 zł |
| `{{params.DEADLINE_B}}` | data wygaśnięcia ceny 197 zł, czyli zakup plus 14 dni |
| `[ZAWARTOŚĆ 10K]` | co jest w produkcie, **wklej ręcznie** |
| `[TWOJE LICZBY]` | Twoje realne wyniki ze sprzedaży kursu, **wklej ręcznie, nie zmyślam dowodów** |

---

# MAIL B1

**Kiedy:** 3 dni po zakupie
**Typ:** edukacja, zero sprzedaży
**Mechanizm:** wzajemność, zasianie nowego celu, otwarcie pętli

**Temat (wariant 1):** Jedna rada, zanim przerobisz cały kurs
**Temat (wariant 2):** Nie oglądaj tego kursu do końca
**Preheader:** Serio. Zrób odwrotnie niż wszyscy.

---

Cześć {{contact.FIRSTNAME | default : ""}},

trzy dni temu kupiłeś kurs. Dzięki.

Mam jedną radę i to jest rada, która robi całą różnicę między ludźmi, którzy z kursu coś mają, a tymi, którzy tylko go obejrzeli.

**Nie oglądaj wszystkiego naraz.**

Wiem, że kusi. Wieczór, kawa, przeklikać całość i mieć poczucie, że się ogarnęło temat.

Tylko że wiedza, której nie użyjesz w ciągu 48 godzin, wyparowuje. Zostaje wrażenie, że się umie. Wrażenie nie zarabia.

Zrób tak:

Obejrzyj jeden moduł. Zatrzymaj się. Weź jedną konkretną rzecz z tego modułu i zastosuj ją dzisiaj do czegoś, co i tak musisz zrobić w firmie. Oferta, post, mail, opis, notatka. Cokolwiek.

Dopiero potem następny moduł.

Wolniej? Tak. Ale po tygodniu masz cztery rzeczy, które realnie działają u Ciebie, zamiast dwunastu, które widziałeś na ekranie.

I jeszcze jedno, do zapamiętania na później.

Umiejętność sama z siebie nie zarabia. Zarabia produkt.

Możesz być najlepszym operatorem AI w swoim mieście i nadal wymieniać godziny na złotówki, tak samo jak przedtem, tylko szybciej. To jest lepsze niż nic, ale to nie jest to, po co tu jesteś.

Za kilka dni napiszę Ci, dlaczego najprostszym produktem, jaki możesz z tej umiejętności zrobić, jest kurs online. I dlaczego dziewięć osób na dziesięć nigdy go nie wypuszcza, chociaż mają już wszystko, czego trzeba.

Paweł
KWIATEKmedia

**PS.** Gdyby coś nie działało albo coś było niejasne, po prostu odpisz na tego maila. Czytam wszystko.

---

# MAIL B2

**Kiedy:** 6 dni po zakupie
**Typ:** edukacja
**Mechanizm:** rozbicie trzech obiekcji, zanim ktokolwiek je wypowie

**Temat (wariant 1):** Dlaczego 9 na 10 osób nigdy nie wypuszcza własnego kursu
**Temat (wariant 2):** Trzy powody, przez które nie masz jeszcze własnego produktu
**Preheader:** Żaden z nich nie jest prawdziwy.

---

Cześć {{contact.FIRSTNAME | default : ""}},

obiecałem, więc piszę.

Kurs online to najprostszy produkt cyfrowy, jaki możesz zrobić. Z jednego powodu, który brzmi banalnie, dopóki się nad nim nie zatrzymasz.

**Robisz go raz. Sprzedajesz go dowolną liczbę razy.**

Nie ma magazynu. Nie ma wysyłki. Nie ma dodatkowego kosztu przy dwudziestym kliencie. Setny kupujący kosztuje Cię dokładnie tyle samo co pierwszy, czyli zero.

Godzina Twojej pracy zapisana raz może się sprzedać sto razy. Godzina Twojej pracy sprzedana klientowi sprzedaje się raz.

To wie prawie każdy. A mimo to dziewięć osób na dziesięć nigdy nic nie wypuszcza. Zawsze przez te same trzy rzeczy.

**1. „Muszę być ekspertem."**

Nie musisz. Musisz być dwa kroki przed osobą, do której mówisz. Człowiek, który zaczyna, nie potrzebuje profesora. Potrzebuje kogoś, kto pamięta, jak to jest nie wiedzieć. Ty właśnie masz tę wiedzę świeżą i to jest przewaga, nie brak.

**2. „Muszę mieć studio, kamerę i światło."**

Nie musisz. Nagranie ekranu i mikrofon za dwie stówy. Ludzie kupują to, czego się nauczą, a nie ostrość obrazu. Najlepiej sprzedające się kursy w Polsce to często nagrania ekranu z gadającą głową w rogu.

**3. „Nie mam publiczności."**

Nie potrzebujesz publiczności. Potrzebujesz dwustu osób z konkretnym problemem, który potrafisz rozwiązać. To jest liczba, którą da się zebrać reklamą za kilkaset złotych albo w kilka tygodni pisania w jednym miejscu.

Żaden z tych trzech powodów nie jest prawdziwy. Wszystkie trzy są wygodne, bo pozwalają nie zaczynać.

Jest natomiast jedna rzecz, która faktycznie decyduje o tym, czy kurs się sprzeda, czy zostanie na dysku. I to nie jest treść.

Napiszę o tym za trzy dni. To będzie najbardziej konkretny mail z całej tej serii, bo pokażę Ci to na przykładzie, który znasz od środka.

Paweł
KWIATEKmedia

**PS.** Zastanów się do tego czasu nad jednym pytaniem. O co ludzie pytają Cię najczęściej? To jest zwykle Twój pierwszy kurs, tylko jeszcze o tym nie wiesz.

---

# MAIL B3

**Kiedy:** 9 dni po zakupie
**Typ:** edukacja, najmocniejszy mail sekwencji
**Mechanizm:** dowód na własnej skórze, którego nie da się podważyć

**Temat (wariant 1):** Właśnie przeszedłeś przez to, o czym Ci napiszę
**Temat (wariant 2):** Kurs się nie sprzedaje treścią. Sprzedaje się strukturą.
**Preheader:** Byłeś w środku tego mechanizmu 9 dni temu.

---

Cześć {{contact.FIRSTNAME | default : ""}},

obiecałem rzecz, która decyduje o tym, czy kurs się sprzeda.

To nie jest treść. Treść decyduje o tym, czy ludzie będą Cię polecać. O sprzedaży decyduje **struktura oferty**.

I najlepiej pokażę Ci to na przykładzie, który znasz, bo byłeś w jego środku dziewięć dni temu.

**Kupiłeś mój kurs za 79 zł.**

W koszyku zobaczyłeś dokładkę: pakiet promptów za 37 zł. Jedno kliknięcie, bez wychodzenia z płatności.

Zaraz po zakupie zobaczyłeś jeszcze jedną ofertę, za 197 zł.

Nie kliknąłeś jej. I bardzo dobrze, bo dzięki temu mogę Ci teraz pokazać, o co w tym wszystkim chodziło.

To nie były przypadkowe wyskakujące okienka. To była struktura. Trzy poziomy, każdy w innym momencie, każdy do innego człowieka.

**Teraz matematyka, bo tu jest cała rzecz.**

Wyobraź sobie sto osób i kurs za 79 zł.

Bez struktury: 100 razy 79 zł. Siedem tysięcy dziewięćset złotych. Koniec.

Ze strukturą: część bierze dokładkę za 37 zł. Część bierze ofertę po zakupie za 197 zł. Nie wszyscy, nawet nie większość. Ale wystarczy, że zrobi to jedna osoba na pięć, żeby ta sama setka ludzi była warta grubo powyżej dwunastu tysięcy.

**Ten sam ruch. Te same reklamy. Ten sam budżet. Ta sama treść kursu.**

Zmienia się tylko to, co widzi człowiek, który już wyjął kartę.

I to jest powód, dla którego jedni sprzedają kurs za 79 zł i wychodzą na zero po opłaceniu reklam, a inni sprzedają dokładnie ten sam kurs za 79 zł i zarabiają.

Nie chodzi o to, żeby mieć lepszy produkt. Chodzi o to, żeby mieć ułożoną drogę.

Jutro pokażę Ci, jak tę drogę ułożyć u siebie od zera. Krok po kroku, z konkretnymi liczbami i kolejnością.

Paweł
KWIATEKmedia

**PS.** Wróć na chwilę myślami do tamtego zakupu. Zobaczyłeś dokładkę i ofertę po płatności, i ani przez sekundę nie poczułeś się naciągany, prawda? Bo dobrze ułożona struktura nie jest nachalna. Ona po prostu pokazuje właściwą rzecz właściwej osobie w momencie, w którym ta osoba jest najbardziej otwarta.

---

# MAIL B4

**Kiedy:** 11 dni po zakupie
**Typ:** sprzedaż
**Mechanizm:** kotwiczenie, matematyka progu rentowności, wybicie czterech obiekcji

**Temat (wariant 1):** Pierwsze 10 000 zł na własnym kursie. 197 zł do {{params.DEADLINE_B}}.
**Temat (wariant 2):** Ta droga, ułożona za Ciebie
**Preheader:** Zwraca się przy trzeciej sprzedaży.

---

Cześć {{contact.FIRSTNAME | default : ""}},

wczoraj pokazałem Ci strukturę. Dzisiaj mówię wprost, gdzie masz ją gotową.

**"Pierwsze 10 000 zł na własnym kursie online"**

To jest droga od pustej kartki do pierwszych pieniędzy. Nie teoria o tym, że warto mieć produkt cyfrowy. Kolejność działań.

[ZAWARTOŚĆ 10K: wklej listę tego, co jest w środku, jedna linia na element]

**Ile to kosztuje**

Cena regularna: 297 zł.
Twoja cena jako kursanta: **197 zł**, ważna do {{params.DEADLINE_B}}.

Masz ją nie dlatego, że trwa promocja. Masz ją, bo już mi zaufałeś raz i uważam, że to coś znaczy.

**Teraz policz to inaczej.**

Jeśli sprzedasz swój kurs za 79 zł, wychodzisz na zero przy trzeciej sprzedaży.

Trzy osoby. Nie trzysta.

Wszystko powyżej trzeciej sprzedaży to już jest coś, czego wcześniej nie było. A tytuł mówi o pierwszych dziesięciu tysiącach, nie o pierwszych stu złotych, bo o taką skalę tu chodzi.

**Cztery rzeczy, które teraz myślisz. Po kolei.**

**„Nie mam tematu na kurs."**
Masz. Tylko go nie widzisz, bo dla Ciebie jest oczywisty. Wewnątrz jest konkretny sposób na wyciągnięcie tematu z tego, co już umiesz i z tego, o co ludzie Cię pytają. To jest pierwsza rzecz, którą zrobisz.

**„Nie mam czasu nagrywać kursu."**
Pierwszy kurs to nie jest czterdzieści godzin materiału. To jest jedna konkretna rzecz rozwiązana od początku do końca. Da się to nagrać w weekend i to jest dokładnie ta skala, o której mówimy.

**„Nie mam komu tego sprzedać."**
To jest realny problem i dlatego jest w środku część o tym, skąd wziąć pierwszych kupujących, kiedy nikt Cię jeszcze nie zna. Bez tego reszta jest bez sensu, więc tego nie pomijam.

**„A jak nikt nie kupi?"**
To jest właściwe pytanie i nie będę Ci obiecywał, że kupią. Nikt uczciwy tego nie obieca. Powiem inaczej: jeśli zrobisz to bez ułożonej drogi, prawie na pewno nie kupią. Z ułożoną drogą masz szansę. To jest cała różnica, jaką mogę Ci sprzedać, i nie zamierzam sprzedawać więcej.

👉 **{{contact.LINK_10K}}**

Paweł
KWIATEKmedia
695 947 017

**PS.** {{params.DEADLINE_B}} cena wraca do 297 zł. Kurs, którego nie wypuścisz, nie zarobi nigdy. Ta jedna rzecz jest pewna.

---

# MAIL B5

**Kiedy:** 14 dni po zakupie, kilka godzin przed wygaśnięciem
**Typ:** sprzedaż, domknięcie
**Mechanizm:** niedobór, awersja do straty, uczciwe wyjście

**Temat (wariant 1):** Dzisiaj 197 zł. Jutro 297 zł.
**Temat (wariant 2):** Ostatni mail w tej sprawie
**Preheader:** Krótko.

---

Cześć {{contact.FIRSTNAME | default : ""}},

krótko, bo nie ma o czym pisać dłużej.

Dzisiaj o {{params.DEADLINE_B}} Twoja cena 197 zł wygasa. Zostaje 297 zł.

Przez ostatnie dwa tygodnie napisałem Ci trzy rzeczy, za które nie wziąłem złotówki. Jak przerabiać kurs, żeby coś z niego zostało. Dlaczego trzy najczęstsze wymówki przed własnym produktem są nieprawdziwe. I skąd naprawdę bierze się sprzedaż kursu, pokazane na lejku, przez który sam przeszedłeś.

Jeśli po tych trzech mailach masz w głowie myśl „ja też mógłbym coś takiego zrobić", to znaczy, że to jest dla Ciebie.

Jeśli nie masz, to nie jest i nie ma sprawy.

👉 **{{contact.LINK_10K}}**

Paweł
KWIATEKmedia

**PS.** Za rok albo będziesz miał własny produkt, albo będziesz miał ten sam kalendarz co dzisiaj. Trzecia opcja nie istnieje.

---

# MAIL B6 (downsell, opcjonalny)

**Kiedy:** 17 dni po zakupie
**Warunek:** nie kupił produktu za 197 zł **i** nie ma pakietu promptów (koszyk 79 zł)
**Typ:** sprzedaż, niski próg
**Mechanizm:** obniżenie progu po odrzuceniu głównej oferty

**Temat (wariant 1):** Skoro nie teraz, to weź chociaż to
**Temat (wariant 2):** 24 prompty, których używam u klientów
**Preheader:** 37 zł, bez deadline, bez ciśnienia.

---

Cześć {{contact.FIRSTNAME | default : ""}},

nie wziąłeś tamtej rzeczy i to jest w porządku. Nie każdy chce robić własny produkt i nie każdy powinien.

Ale skoro masz już kurs, to jest jedna drobna rzecz, która go domyka.

**Pakiet 24 promptów. Kreacje, reklamy, strony. 37 zł.**

To nie jest kolejny kurs. To są gotowce, których używam w codziennej pracy dla klientów. Wklejasz, podmieniasz swoje dane, masz wynik.

Kurs uczy Cię, jak rozmawiać z Claude. To są gotowe rozmowy do skopiowania na te sytuacje, które wracają co tydzień.

Tu nie ma deadline i nie ma podwyżki. Będzie leżało i czekało.

👉 **{{contact.LINK_PROMPTY}}**

Paweł
KWIATEKmedia

**PS.** To ostatni mail sprzedażowy z mojej strony w tej serii. Dalej dostajesz już tylko rzeczy, których możesz użyć za darmo.

---

# WARIANT B1-HIST (baza historyczna)

**Dla kogo:** ludzie, którzy kupili kurs przed uruchomieniem tego systemu
**Zastępuje:** mail B1
**Dalej:** B2, B3, B4, B5 bez zmian, tylko z przesuniętym deadline

Nie da się do nich napisać „trzy dni temu kupiłeś kurs", bo to było dawno. Potrzebny jest inny wstęp, który uczciwie nazywa lukę i od razu daje wartość.

**Temat (wariant 1):** Kupiłeś mój kurs i zniknąłem. Naprawiam to.
**Temat (wariant 2):** Wisi mi u Ciebie jedna rzecz
**Preheader:** Bez sprzedaży. Po prostu wracam z czymś konkretnym.

---

Cześć {{contact.FIRSTNAME | default : ""}},

jakiś czas temu kupiłeś mój kurs "Claude w praktyce". Dostałeś dostęp, dostałeś fakturę i na tym się skończyło.

I to jest mój błąd, nie Twój.

Człowiek, który wyjmuje kartę i kupuje kurs o AI, jest dokładnie tym typem osoby, z którą chce się rozmawiać dalej. A ja przez ten czas nie odezwałem się ani razu.

Naprawiam to i zaczynam od czegoś, co możesz użyć dzisiaj.

**Jedna rada do samego kursu.** Jeśli obejrzałeś go w całości i masz wrażenie, że „w sumie wiem, ale nie używam", to jest normalne i ma prostą przyczynę. Wiedza, której nie zastosujesz w ciągu 48 godzin, wyparowuje.

Zrób jedną rzecz. Wróć do dowolnego modułu, weź z niego jedną konkretną technikę i zastosuj ją dzisiaj do czegoś, co i tak musisz zrobić. Oferta, post, mail, opis. Cokolwiek. Jedna rzecz, dzisiaj.

To odblokowuje więcej niż ponowne obejrzenie całości.

I zostaw sobie w głowie jedno zdanie na kolejne dni.

Umiejętność sama z siebie nie zarabia. Zarabia produkt.

Za kilka dni napiszę Ci, dlaczego najprostszym produktem, jaki możesz z tej umiejętności zrobić, jest kurs online. I dlaczego dziewięć osób na dziesięć nigdy go nie wypuszcza, chociaż mają już wszystko, czego trzeba.

Paweł
KWIATEKmedia

**PS.** Jeśli nie chcesz dostawać ode mnie nic więcej, kliknij [tutaj] i znikam. Bez obrazy.

---

## Notatki wdrożeniowe do sekwencji B

* **Zakup produktu za 197 zł w dowolnym momencie natychmiast zatrzymuje sekwencję.** To jest jedyny błąd w tym systemie, który realnie boli, bo oznacza wysłanie oferty komuś, kto już zapłacił. Pilnuje tego Make na zdarzeniu `product_assigned` przy kwotach 197, 276 i 313.
* Koszyk 116 zł, czyli kurs plus prompty, **nie dostaje maila B6**. Ci ludzie mają już prompty.
* Mail B3 jest najmocniejszy w całej sekwencji i tam warto włożyć najwięcej uwagi przy korekcie. Jeśli coś w nim zabrzmi nieszczerze, cała reszta się sypie, bo to jedyny mail, który sprzedaje dowodem na własnej skórze.
* W B3 przy matematyce nie podaję Twoich prawdziwych liczb, tylko modelowy przykład na stu osobach. **Jeśli chcesz to wzmocnić, wklej swoje realne dane** ze sprzedaży kursu, wtedy z mocnego maila robi się mail nie do podważenia. Sam ich nie wymyślam.
* Baza historyczna: przy limicie 300 maili na dobę wysyłasz partiami. Przy zapisie do automatyzacji rozłóż start na kilka dni, żeby nie zderzyć się z limitem i nie zrobić nagłego skoku wysyłki na świeżej domenie, bo to uderza w dostarczalność.
* UTM: `utm_source=brevo&utm_medium=email&utm_campaign=crosssell&utm_content=b1` i tak dalej. Tylko tak rozdzielisz sprzedaż z maila od sprzedaży ze strony po zakupie, a to jest jedyna liczba, która mówi, czy ta sekwencja zarabia.
