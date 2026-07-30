# Wdrożenie nowej strony (15 minut)

Cel: zastąpić starą stronę główną szybką wersją z naprawionym pikselem.
**Panel kursu (`/panel/`) zostaje nietknięty** — podmieniamy tylko stronę sprzedażową.

## Krok 0 — dwie rzeczy w pliku + wymogi prawne

**(a) Link do koszyka.** W `index.html`, linia
`var CHECKOUT_URL = "USTAW_LINK_DO_KOSZYKA_EASYTOOLS"`:
wklej pełny link do koszyka easy.tools — ten sam, do którego prowadził
przycisk „Kup" na starej stronie. Dopóki go nie ustawisz, strona pokazuje
**czerwony pasek ostrzegawczy** na górze i nie wysyła zdarzeń AddToCart —
nie da się przypadkiem wdrożyć „ślepej" wersji.

**(b) Baner zgody cookies.** `var REQUIRE_CONSENT = true` — pixel odpala się
po tapnięciu „OK, rozumiem" (wymóg Prawa komunikacji elektronicznej / RODO
dla cookies marketingowych). Możesz ustawić `false` — pełny sygnał od
pierwszej sekundy, ale prawnie na Twoją odpowiedzialność. Decyzja należy
do Ciebie; domyślnie zostawiłem wariant zgodny z prawem.

**(c) Stopka — wymagane przed kampanią.** Sprzedajesz treści cyfrowe
konsumentom, więc na stronie MUSZĄ być: pełne dane firmy (nazwa, adres,
NIP — NIP już wpisany), **regulamin sprzedaży** i **polityka prywatności**
(linki `/regulamin` i `/polityka-prywatnosci` już są w stopce — opublikuj
pod nimi dokumenty). W koszyku easy.tools włącz checkbox zgody na
natychmiastowe dostarczenie treści cyfrowej (utrata 14-dniowego prawa
odstąpienia) — bez tego klient może żądać zwrotu przez 14 dni nawet po
przerobieniu kursu.

## Krok 1 — backup starej strony

1. Zaloguj się do **hPanel Hostinger** → Witryny → `kwiatekmedia.pl` → Menedżer plików
2. Wejdź do katalogu subdomeny `claudewpraktyce` (zwykle `domains/claudewpraktyce.kwiatekmedia.pl/public_html` lub podkatalog w `public_html`)
3. Zmień nazwę obecnego `index.html` (lub `index.php`) na `index_stary.html.bak`
   — NIC nie kasuj. W razie czego wracasz jedną zmianą nazwy.

## Krok 2 — wgraj nowy plik

1. Wgraj `index.html` z tego repo do tego samego katalogu
2. Otwórz `https://claudewpraktyce.kwiatekmedia.pl/?nopixel=1` na swoim telefonie
   i komputerze — **pierwsze wejście zawsze z `?nopixel=1`**, żeby nie zaśmiecić piksela
   (parametr zapisuje się na urządzeniu na stałe)
3. Sprawdź: strona się ładuje, przycisk prowadzi do koszyka, płatność testowa działa

## Krok 3 — sprawdź piksel (5 min)

1. Events Manager → Piksel `KwiatekMediaPixel` → **Testuj zdarzenia**
2. Wejdź na stronę z INNEGO urządzenia (bez `?nopixel=1`) przez link z kodem testowym
3. Masz zobaczyć kolejno: `PageView` → (po dojechaniu do sekcji zakupu) `ViewContent`
   → (po kliknięciu przycisku) `AddToCart`

## Zdjęcia produktu / opinie (opcjonalnie, ale warto)

W kodzie są komentarze `TODO(Paweł)`:
- 2–3 opinie kursantów (za ich zgodą) + realna liczba kursantów
- 1–2 dodatkowe pytania FAQ z prawdziwych maili
- linki do regulaminu/polityki prywatności w stopce

## Dlaczego ta wersja jest szybsza

| | Stara strona (objaw) | Nowa strona |
|---|---|---|
| Dociera na stronę | 36% klikających | cel: 60%+ |
| Zasoby zewnętrzne | analytics + fonty + obrazy | tylko fbevents.js |
| Waga | (nie zmierzona — brak dostępu) | ~15 KB HTML, zero obrazów |
| fbclid | ginie (fbc na 24% zdarzeń) | zapisywany od razu, cookie 90 dni |
