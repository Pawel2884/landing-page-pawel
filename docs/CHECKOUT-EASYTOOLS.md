# Checkout easy.tools — plan naprawy porzuceń (44% → cel <30%)

Dane 23–29.07: **32 rozpoczęte płatności → 18 zakupów.** 14 osób odpadło w koszyku.
Każde odzyskane 10 p.p. = ~3 sprzedaże tygodniowo.

Panel produktu: `cart.easy.tools/creator/products/6a8960ac-7f4e-40c6-9625-cee7a51db540`

## A. Ustawienia koszyka (15 minut, dziś)

Zaloguj się do easy.tools → produkt „Claude w praktyce":

1. **BLIK jako pierwsza, domyślnie zaznaczona metoda płatności.**
   W Polsce przy 79 zł to metoda ~70% kupujących. Karta druga, przelew trzeci.
2. **Minimum pól:** tylko e-mail (+ imię jeśli musi być). Dane do faktury —
   jako opcjonalny checkbox „Chcę fakturę na firmę", nie jako pola obowiązkowe.
3. **Bez zakładania konta** przed płatnością.
4. **Cena 79 zł widoczna cały czas** w podsumowaniu, bez doliczeń-niespodzianek.
5. **Odzyskiwanie porzuconych koszyków: WŁĄCZ** (easy.tools ma wbudowane maile
   ratunkowe — ustaw wysyłkę po 1 h i po 24 h).

## B. Order bump — dziś sprzedaje się 4,5%, norma to 20–40%

Obecny bump: „Prompty, które robią kreacje, reklamy i strony" 37 zł — kupuje ~1/22 osób.

Zmień opis bumpa na (do wklejenia):

> **☑ Dorzuć „Prompty do kreacji, reklam i stron” +37 zł**
> 24 gotowe prompty, które robią za Ciebie grafiki reklamowe, teksty reklam
> i sekcje stron. Jedno kliknięcie teraz — osobno ten pakiet kupisz tylko
> w wyższej cenie.

Zasady: checkbox tuż nad przyciskiem płatności, korzyść w pierwszej linii.

⚠️ **Omnibus:** kotwica typu „37 zł zamiast 67 zł" to formalnie ogłoszenie
obniżki — wymaga pokazania najniższej ceny z ostatnich 30 dni i realnej
sprzedaży po 67 zł wcześniej. Dopóki tego nie masz, pisz o wartości
(„osobno drożej"), nie o przekreślonej cenie. Ostatnia linia powyżej jest
legalna tylko, jeśli pakiet naprawdę sprzedajesz osobno drożej (np. 67 zł
jako samodzielny produkt w easy.tools — ustaw to najpierw).

Cel: attach rate 20% ⇒ przy 80 zakupach/mc to **+590 zł/mc bez ruchu**.

## C. Sekwencja mailowa ratująca koszyki (gotowa, czeka na 1 klucz)

W Brevo czeka 12 gotowych maili (KOSZYK A1–A5 + CROSSSELL B1–B6),
w Make — scenariusze 9581586 (sync) i 9581615 (setup). Wszystko NIEAKTYWNE,
bo w magazynie Make `mailing_config` (ID 174285) zamiast klucza API Brevo
stoi `WKLEJ_TU_KLUCZ_API_BREVO`.

**Co zrobić:** Brevo → Ustawienia → SMTP & API → wygeneruj klucz API →
wklej go w Make: Data stores → `mailing_config` → rekord `config` → pole `klucz_brevo`.

Potem daj znać Claude'owi w tej sesji — uruchomi scenariusz SETUP (założy listy,
zapisze ID) i aktywuje sync. Od tego momentu każdy kupujący wypada z sekwencji
koszykowej automatycznie, a porzucający dostają serię A.

## D. Opinie kursantów w 48 h (do sekcji „Kto to prowadzi?")

Masz maile wszystkich kupujących. Wyślij do 10–15 ostatnich prostą prośbę:

> Temat: Jedno pytanie o kurs (2 minuty)
> Cześć! Kupiłeś/aś „Claude w praktyce" — powiedz mi proszę w 2-3 zdaniach:
> co konkretnie udało Ci się zrobić z pomocą kursu? Najciekawsze odpowiedzi
> (za Twoją zgodą, z imieniem) trafią na stronę kursu. Dzięki! Paweł

3 odpowiedzi wystarczą na start. Social proof to największa brakująca
dźwignia konwersji na tej stronie (miejsce jest gotowe w `index.html`,
komentarz `TODO(Paweł)` w sekcji autora).

## E. Test całej ścieżki (bez śmiecenia w danych!)

Test rób tak: wejdź na stronę z `?nopixel=1`, kup za pełną cenę ze SWOJEGO maila
`pawel.kwiatek1177@gmail.com` — scenariusz CAPI i tak Cię odfiltruje, a płatność
możesz zaraz zwrócić w easy.tools. **Nie używaj kodów rabatowych na 2 zł** —
przeglądarka wysyła wtedy Purchase o wartości 2 zł i psuje optymalizację wartości.
