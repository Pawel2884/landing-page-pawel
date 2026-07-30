# INSTRUKCJA DLA NASTĘPNEJ SESJI CLAUDE (sieć otwarta)

Kontekst: Paweł (nietechniczny) wyraźnie polecił dokończyć wdrożenie za niego.
Poprzednia sesja (30.07.2026) zrobiła wszystko poza krokami wymagającymi internetu
z kontenera. Stan: strona gotowa na branchu `claude/course-sales-campaign-analysis-dpddji`
(plik `index.html`, CHECKOUT_URL ustawiony), Brevo+Make aktywne (sync zakupów działa,
listy L10=9/L20=10/L21=11/L30=12), piksel 2209863822840705.

## Krok 0 — sprawdź sieć
`curl -sS -o /dev/null -w "%{http_code}" --max-time 8 https://cart.easy.tools/`
Jeśli błąd CONNECT → sieć nadal zamknięta: powiedz Pawłowi, że w ustawieniach
środowiska na claude.ai/code trzeba ustawić Network = "All domains" i wrócić.

## Krok A — easy.tools (Chrome/Playwright, PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers)
1. Wejdź na https://cart.easy.tools/ → logowanie mailem `pawel.kwiatek1177@gmail.com`
   (easy.tools wysyła kod/magic-link; odbierz przez Gmail MCP: `from:easy.tools newer_than:1h`).
2. Zmień TYLKO: BLIK jako pierwsza/domyślna metoda płatności; włącz odzyskiwanie
   porzuconych koszyków (1h i 24h); opcjonalnie opis order bumpa wg
   `docs/CHECKOUT-EASYTOOLS.md` sekcja B (BEZ kotwicy cenowej, bez zmian cen).
3. Screenshot przed/po każdej zmianie → wyślij Pawłowi (SendUserFile).
   Produkt: `cart.easy.tools/creator/products/6a8960ac-7f4e-40c6-9625-cee7a51db540`.

## Krok B — Hostinger (wdrożenie strony)
1. Najpierw sprawdź, czy już wdrożona: `curl -s https://claudewpraktyce.kwiatekmedia.pl/`
   → szukaj frazy `Masz AI. To czemu dalej siedzisz` i `km_nopixel`. Jeśli jest → pomiń.
2. Ścieżka preferowana FTP (bez logowania do hPanel): sprawdź w Make MCP
   (team 2349260, `connections_list`) połączenie "FTP Hostinger kwiatekmedia"
   (formularz poświadczeń: requestId bb30b698-a0ed-4cc9-a781-a54a00d33214).
   Host: `ftp.claudewpraktyce.kwiatekmedia.pl` (46.17.175.123). Jeśli sieć otwarta,
   możesz też użyć zwykłego klienta ftp/lftp z kontenera.
3. Procedura: w katalogu subdomeny (prawdopodobnie
   `domains/claudewpraktyce.kwiatekmedia.pl/public_html`) zmień nazwę starego
   `index.html` → `index_stary.bak`, wgraj `index.html` z tego brancha, zweryfikuj
   curl-em frazę na żywo. NICZEGO nie kasuj, NIE dotykaj katalogu `/panel/`.
4. Jeśli brak FTP: hPanel przez Playwright wymaga hasła Pawła — poproś go o nie
   na czacie (kod 2FA, jeśli przyjdzie, odbierz z Gmaila).

## Krok C — weryfikacja i raport
1. Wejdź na `https://claudewpraktyce.kwiatekmedia.pl/?fbclid=TEST_WDROZENIE`
   headless-Chromem, sprawdź LCP/wagę i czy baner zgody działa.
2. Meta MCP `ads_get_dataset_stats` (dataset 2209863822840705, aggregation=event) —
   czy płyną PageView/ViewContent/AddToCart.
3. Krótki raport po polsku, nietechnicznie + screenshoty.

## Czego NIE robić
- Nie zmieniać nic w kampaniach Meta bez osobnej zgody Pawła.
- Nie zmieniać cen w easy.tools.
- Testy strony tylko z `?nopixel=1` (poza jednym testem fbclid wyżej).
