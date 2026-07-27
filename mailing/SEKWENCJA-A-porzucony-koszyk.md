# Sekwencja A: porzucony koszyk

Produkt: kurs "Claude w praktyce", 79 zł, dostęp bezterminowy
Order bump: Pakiet 24 promptów, 37 zł
Odbiorca: zostawił mail na checkoucie, nie zapłacił
Długość: 5 maili w 7 dni
Nadawca: Paweł z KWIATEKmedia, `kontakt@kwiatekmedia.pl`

---

## Zanim to włączysz: mechanika podwyżki ceny

Wybrałeś podwyżkę ceny jako mechanizm domykający. Żeby to było uczciwe i działało w trybie ciągłym, a nie tylko raz, potrzebna jest taka konfiguracja:

1. **Cena regularna kursu idzie w górę do 129 zł.** To jest cena na stronie, dla wszystkich, na stałe.
2. **79 zł zostaje ceną wejściową**, ważną 7 dni od momentu, w którym człowiek zostawił mail na checkoucie. Realizujesz to kodem rabatowym w EasyTools z datą wygaśnięcia, generowanym per kontakt albo jednym kodem odnawianym co tydzień.
3. Po 7 dniach kod umiera i zostaje 129 zł.

Dzięki temu deadline jest prawdziwy, a nie odgrywany. Klient, który wróci po terminie, faktycznie zobaczy 129 zł. To jest jedyny sposób, żeby ta mechanika nie spaliła Ci zaufania przy drugiej kampanii.

**Jeśli nie chcesz podnosić ceny regularnej, powiedz, przepisuję maile 4 i 5 na znikający bonus.** Nie da się napisać wiarygodnego "cena rośnie", jeśli cena nie rośnie.

### Zmienne do podstawienia

| Zmienna | Co to | Skąd |
|---|---|---|
| `{{contact.FIRSTNAME}}` | imię | z checkoutu |
| `{{contact.LINK_KOSZYKA}}` | link powrotny do koszyka z kodem | Make |
| `{{params.DEADLINE}}` | data i godzina wygaśnięcia ceny 79 zł | Make, moment zapisu plus 7 dni |
| `[MODUŁY KURSU]` | lista modułów | **wklej ręcznie, nie zmyślam zawartości Twojego kursu** |

Powitanie wszędzie: `Cześć {{contact.FIRSTNAME | default : ""}},` żeby przy braku imienia wyszło samo "Cześć,".

---

# MAIL A1

**Kiedy:** 1 godzina po porzuceniu
**Typ:** edukacja, zero sprzedaży
**Mechanizm:** wzajemność, otwarcie pętli

**Temat (wariant 1):** Zanim wrócisz na tamtą stronę, weź to za darmo
**Temat (wariant 2):** Ten jeden prompt skraca pisanie oferty z 2 godzin do 11 minut
**Preheader:** Nie musisz nic kupować, żeby z tego skorzystać.

---

Cześć {{contact.FIRSTNAME | default : ""}},

zostawiłeś mail na stronie kursu i nie dokończyłeś zakupu.

Spokojnie. Nie będę Cię teraz do niczego przekonywał.

Zamiast tego dam Ci coś, czego możesz użyć dzisiaj. Nawet jeśli nigdy nic ode mnie nie kupisz.

Większość ludzi pisze do Claude tak: „napisz mi ofertę dla klienta".

I dostaje tekst, który brzmi jak ulotka z 2011 roku.

Spróbuj tak:

> Jesteś moim doświadczonym handlowcem. Sprzedajesz [co sprzedajesz] dla [kto jest Twoim klientem].
> Zanim cokolwiek napiszesz, zadaj mi 5 pytań, których potrzebujesz, żeby ta oferta trafiła w punkt.
> Po moich odpowiedziach napisz ofertę w trzech wersjach: krótkiej, konkretnej i bardzo bezpośredniej.

Cała różnica siedzi w jednym poleceniu. Każesz mu zapytać, zanim odpowie.

Claude przestaje zgadywać, kim jest Twój klient. Zaczyna to wiedzieć.

Wypróbuj dzisiaj. Zajmie Ci cztery minuty.

Jutro napiszę Ci o czymś innym. O błędzie, który praktycznie każdy popełnia przez pierwsze dwa tygodnie z AI. Przez ten błąd ludzie odpuszczają i mówią „to jednak nie dla mnie". A problem nie leży po ich stronie.

Paweł
KWIATEKmedia

**PS.** Twój koszyk nadal czeka, nic z nim nie robiłem. Gdybyś chciał go dokończyć, link jest tutaj: {{contact.LINK_KOSZYKA}}

---

# MAIL A2

**Kiedy:** 24 godziny po A1
**Typ:** edukacja
**Mechanizm:** kontrast przed i po, zamknięcie pętli z A1, otwarcie nowej

**Temat (wariant 1):** Błąd, przez który ludzie odpuszczają AI po dwóch tygodniach
**Temat (wariant 2):** Traktujesz Claude jak Google. I dlatego Cię zawodzi.
**Preheader:** To nie jest wina narzędzia.

---

Cześć {{contact.FIRSTNAME | default : ""}},

obiecałem błąd, więc jest błąd.

Ludzie traktują Claude jak wyszukiwarkę.

Wpisują jedno pytanie. Dostają jedną odpowiedź. Oceniają ją. Wzruszają ramionami. Zamykają kartę.

I mówią: „przereklamowane".

Tymczasem to nie jest wyszukiwarka. To jest rozmowa. Pierwsza odpowiedź nie jest wynikiem, tylko materiałem do dalszej pracy.

Zobacz różnicę.

**Tak robi 90 procent ludzi:**
„Napisz post na Facebooka o promocji w moim salonie."

Efekt: post, który mógłby być o czymkolwiek. Cztery emoji, dwa wykrzykniki, zero konkretu.

**Tak to wygląda, kiedy wiesz, co robisz:**
Wklejasz swoje trzy najlepsze posty z zeszłego roku. Piszesz, kto jest Twoim klientem i czego się boi. Podajesz konkretną promocję z datami. Prosisz o pięć wersji w różnym tonie. A potem dorzucasz jedno zdanie, które zmienia wszystko:

> Teraz oceń krytycznie własne teksty. Wskaż, który z nich jest najsłabszy i dlaczego. Popraw go.

Claude zaczyna wtedy pracować przeciwko sobie. I to jest moment, w którym wychodzą z niego rzeczy lepsze niż to, co sam byś napisał.

Jedna zmiana. Zero dodatkowych kosztów. Piętnaście sekund więcej pisania.

Jutro policzę Ci coś, czego większość ludzi wolałaby nie liczyć. Ile kosztuje Cię to, że jeszcze tego nie ogarniasz. Nie w złotówkach. W godzinach Twojego życia.

Paweł
KWIATEKmedia

**PS.** Kurs zaczyna się dokładnie od tego. Od tego, jak rozmawiać, a nie jak wyszukiwać. Koszyk masz tutaj: {{contact.LINK_KOSZYKA}}

---

# MAIL A3

**Kiedy:** 48 godzin po A2
**Typ:** edukacja
**Mechanizm:** awersja do straty policzona w godzinach, spójność z tożsamością

**Temat (wariant 1):** Policzmy, ile kosztuje Cię ten miesiąc
**Temat (wariant 2):** 34 godziny. Tyle według moich obliczeń tracisz co miesiąc.
**Preheader:** Nie w złotówkach. W godzinach.

---

Cześć {{contact.FIRSTNAME | default : ""}},

usiądź na chwilę i policz to ze mną. Uczciwie, bez zaniżania.

Ile czasu w miesiącu zjadają Ci te rzeczy:

Pisanie ofert i wycen. Odpowiadanie na te same pytania klientów. Posty i opisy. Maile, które musisz sformułować „ładnie". Notatki po spotkaniach. Ogarnianie tekstów na stronę.

U większości ludzi, których o to pytam, wychodzi między 25 a 40 godzin miesięcznie.

Weźmy środek. 34 godziny.

To jest **ponad cztery dni robocze**. Co miesiąc. Rok w rok to jest półtora miesiąca Twojego życia oddane na przepisywanie tego samego.

Teraz druga liczba. Ile jest warta godzina Twojej pracy? Weź swój przychód i podziel przez godziny. Większość ludzi boi się to zrobić, bo wynik jest nieprzyjemny.

Pomnóż. Masz kwotę, którą co miesiąc wyrzucasz.

Nie mówię, że AI zabierze Ci wszystkie 34 godziny. Nie zabierze. Ale zabierze sporą część i to jest różnica, którą czuje się w kalendarzu, nie w teorii.

I teraz najważniejsze zdanie w tym mailu.

Nie chodzi o to, żeby zostać ekspertem od AI. Nie musisz nim być. Chodzi o to, żeby nie zostać tym, kogo wyprzedzi ktoś, kto po prostu ogarnął narzędzie wcześniej.

Ty już zrobiłeś pierwszy ruch. Byłeś na stronie płatności. Coś Cię zatrzymało w ostatniej sekundzie i naprawdę to rozumiem.

Jutro napiszę wprost. Ile to kosztuje, co dokładnie dostajesz i dlaczego ta cena za chwilę przestanie obowiązywać.

Paweł
KWIATEKmedia

**PS.** Jeżeli te 34 godziny brzmią u Ciebie jak przesada, policz sam. Kartka i pięć minut. Potem wróć do tego maila.

---

# MAIL A4

**Kiedy:** 72 godziny po A3
**Typ:** sprzedaż
**Mechanizm:** kotwiczenie, rozbicie ceny, wybicie czterech obiekcji, odwrócenie ryzyka

**Temat (wariant 1):** 79 zł do {{params.DEADLINE}}. Potem 129 zł i to się już nie cofnie.
**Temat (wariant 2):** Cena kursu rośnie {{params.DEADLINE}}
**Preheader:** Cztery powody, dla których ludzie tego nie kupują. Rozbijam każdy.

---

Cześć {{contact.FIRSTNAME | default : ""}},

konkretnie, bez owijania.

Kurs "Claude w praktyce" kosztuje dzisiaj 79 zł. Cena regularna to 129 zł. Masz 79 zł, bo byłeś na stronie płatności i uznałem, że należy Ci się dokończenie tego po starej cenie.

Ta cena jest ważna do **{{params.DEADLINE}}**. Potem link przestaje działać i zostaje 129 zł.

**Co dostajesz:**

[MODUŁY KURSU: wklej listę modułów, jedna linia na moduł]

Dostęp bezterminowy. Bez subskrypcji, bez dopłat, bez terminu ważności. Kupujesz raz i wracasz, kiedy chcesz.

**Teraz cztery rzeczy, które zatrzymują ludzi przy tej stronie. Znam je wszystkie.**

**„Nie mam kiedy tego przerobić."**
Nie musisz przerabiać całości. Zrób pierwszy moduł, zastosuj jedną rzecz w swojej firmie i już Ci się zwróciło. Reszta poczeka. Dostęp jest bezterminowy właśnie po to.

**„Znajdę to samo na YouTube za darmo."**
Znajdziesz. Rozrzucone w 40 filmach, z których 30 jest o czymś innym, a 6 jest nieaktualnych. Pytanie nie brzmi, czy da się to znaleźć. Brzmi, ile godzin zajmie Ci szukanie i układanie tego w kolejność. Twoja godzina jest warta więcej niż 79 zł. Policzyłeś to wczoraj.

**„Nie jestem techniczny, u mnie to nie zadziała."**
Tu nie ma kodowania. Nie ma instalowania. Nie ma konfiguracji. Jest pisanie po polsku do okna czatu. Jeśli umiesz napisać maila, umiesz to.

**„79 zł to nie problem, tylko czy to cokolwiek zmieni."**
To jest jedyna uczciwa obiekcja z tej czwórki. Odpowiadam tak: jeśli po pierwszym module nie zaoszczędzisz co najmniej godziny w pierwszym tygodniu, to znaczy, że nie zastosowałeś tego, co tam jest. Napisz do mnie wtedy, odpiszę osobiście i pokażę gdzie.

**Jedna rzecz na koniec.**

W koszyku zobaczysz dokładkę: pakiet 24 promptów do kreacji, reklam i stron, za 37 zł. To są gotowce, których używam w pracy dla klientów. Nie musisz ich brać. Ale jeśli chcesz efekt od pierwszego dnia zamiast od trzeciego, to jest właśnie po to.

👉 **{{contact.LINK_KOSZYKA}}**

Paweł
KWIATEKmedia
695 947 017

**PS.** {{params.DEADLINE}} ten link umiera, a cena wraca do 129 zł i już tam zostaje. Jeśli masz to zrobić, zrób teraz. Zajmie Ci to mniej czasu niż przeczytanie tego maila.

---

# MAIL A5

**Kiedy:** 6 dni od startu, kilka godzin przed deadline
**Typ:** sprzedaż, domknięcie
**Mechanizm:** niedobór, awersja do straty, uczciwe wyjście

**Temat (wariant 1):** Dzisiaj 79 zł. Jutro 129 zł.
**Temat (wariant 2):** Zamykam to dzisiaj
**Preheader:** Krótko, bo nie ma o czym pisać dłużej.

---

Cześć {{contact.FIRSTNAME | default : ""}},

krótko.

Dzisiaj o {{params.DEADLINE}} Twój link przestaje działać. Cena wraca do 129 zł.

Przez ostatni tydzień wysłałem Ci trzy rzeczy, których mogłeś użyć za darmo. Prompt z pytaniami zwrotnymi. Sposób na to, żeby Claude krytykował własną robotę. I rachunek za godziny, które co miesiąc idą w powietrze.

Jeśli któraś z nich Ci się przydała, kurs jest tym samym, tylko poukładanym i w całości.

Jeśli żadna, to spokojnie. Nie każdy produkt jest dla każdego i wolę to powiedzieć wprost, niż udawać.

👉 **{{contact.LINK_KOSZYKA}}**

Paweł
KWIATEKmedia

**PS.** Jeżeli to nie jest dla Ciebie, kliknij [tutaj] i nie odezwę się więcej w tej sprawie. Bez obrazy, serio. Wolę mniejszą listę ludzi, którzy chcą to czytać.

---

## Notatki wdrożeniowe do sekwencji A

* Maile A1 do A3 mają link w PS, nie w treści. Sprzedaje wartość, nie link. Nie przenoś go wyżej, bo cała sekwencja straci wiarygodność.
* Zakup w dowolnym momencie **natychmiast** wypisuje kontakt z sekwencji. To pilnuje Make na zdarzeniu `product_assigned`.
* Testy A/B robisz tylko na temacie maila A1 i A4. Tam jest cały zysk z optymalizacji, reszta to szum.
* Link do rezygnacji w A5 wskazuje na osobną stronę wypisu, nie na standardowy unsubscribe Brevo. Chodzi o to, żeby zabrzmiał jak decyzja, nie jak stopka.
* UTM: `utm_source=brevo&utm_medium=email&utm_campaign=koszyk&utm_content=a1` i tak dalej. Bez tego za miesiąc nie policzysz, co odzyskało koszyki.
