# Testy na urządzeniach — Android (P1) i desktop (P4)

Dane pokazują, że problem jest sprzętowy, nie tekstowy:

| Urządzenie | klik → strona | strona → checkout | zakupy |
|---|---|---|---|
| iPhone | 47% | 50% | 12 |
| **Android** | **32%** | **15%** | 6 |
| Desktop | 24% | 50% (3 szt.) | **0** |

Nowa strona eliminuje typowe przyczyny (ciężkie zasoby, słabe cele dotykowe,
sticky elementy zasłaniające treść). Po wdrożeniu zrób 2 przebiegi kontrolne:

## Android — 5 minut (koniecznie fizyczny telefon)

1. Otwórz **aplikację Facebook**, znajdź swoją reklamę (Ads Manager → podgląd →
   „Wyślij powiadomienie na telefon" albo po prostu klik z feeda)
2. Kliknij reklamę — strona MUSI otworzyć się w przeglądarce wbudowanej FB
3. Sprawdź kolejno:
   - [ ] strona widoczna w < 3 s na LTE (nie Wi-Fi!)
   - [ ] nagłówek i cena widoczne bez scrollowania
   - [ ] dolny pasek „Kupuję kurs · 79 zł" widoczny i klikalny kciukiem
   - [ ] klik w przycisk → koszyk easy.tools otwiera się i DA SIĘ wybrać BLIK
   - [ ] wróć, przewiń całą stronę — nic nie skacze, nic nie zasłania tekstu
4. Powtórz to samo z **Instagrama** (stories/reels używają innej przeglądarki in-app)

## Desktop — 3 minuty

1. Chrome na komputerze → wejdź z reklamy (lub wpisz adres)
2. Sprawdź:
   - [ ] klik „Kupuję kurs" → koszyk otwiera się w tej samej karcie
   - [ ] w koszyku widać metody płatności (desktop nie ma BLIK-a w aplikacji —
         upewnij się, że przelew/karta są dostępne i działają)
   - [ ] przejdź płatność do samego końca (możesz użyć swojego maila i zwrócić)
3. Jeśli wszystko działa, a desktop dalej nie sprzedaje po 2 tygodniach —
   wykluczamy placement desktop w kampanii (decyzja w Ads Managerze, nie na stronie)

## Gdzie zgłosić wynik

Wróć do tej sesji Claude i napisz co nie zadziałało — poprawka w kodzie
strony to jedna iteracja tutaj.
