# Rezerwacja — makieta mobilna

Przygotowano 9 września 2026 na podstawie `docs/design-kocie-gniazdko.md`, dokumentacji biznesowej oraz `mockups/public/strona-glowna/preview-qa.html` i istniejącego PNG strony głównej. Zachowano dostarczone logo, kremowe powierzchnie, ciemnozielone CTA, Alegreya i Source Sans 3.

## Archiwalne eksporty PNG

- `rezerwacja-mobile-wszystkie-kroki.png` — pełna plansza: Termin, Pobyt, Twoje dane, Koty, Podsumowanie i przyjęcie zgłoszenia.
- `rezerwacja-mobile-zapisane-dane.png` — prośba o link, neutralny wynik wysyłki, wybór danych i nieaktywny link.
- `rezerwacja-mobile-stany-i-bledy.png` — dziewięć zestawów widoków pomocniczych, w tym walidacja, brak stawek, nieaktywna stawka, wysyłanie, błąd połączenia i niepewny wynik.
- Pliki `01-…png` do `10-…png` — każdy pełny ekran osobno w szerokości 780 pikseli (makieta 390 px, eksport ×2).

Ekrany mają pełną długość przewijanej strony. Plansza zbiorcza wymaga powiększenia, aby czytać drobny tekst. Dane klientów, kotów, numer zgłoszenia i kwoty są przykładowe. Kontakt, logo i przykładowe stawki 50/60 zł kontynuują istniejącą makietę strony głównej.

## Założenia i adnotacje

Aktualizacja 14 września 2026: daty i godziny przyjazdu/odbioru wymagane, wybór pełnych godzin; pobyt minimum 2 dni liczony jako różnica dat, np. 12–14 października. Zaktualizowano etykiety i adnotacje źródłowego HTML. Archiwalne PNG nie zostały nadpisane.

- Przykład: 12–19.10.2026, 7 dni, 50 zł dziennie, razem 350 zł za rezerwację z dwoma kotami. Bez dodatkowego mnożnika liczby kotów.
- Kalendarz pokazuje wybór dat, a nie dostępność. Komunikat o popularności jest przykładowym stanem opcjonalnym.
- Wysłanie zgłoszenia nie jest potwierdzeniem pobytu. Płatności są ustalane poza formularzem.
- Pełne informacje opiekuńcze są widoczne w podsumowaniu. Puste informacje zdrowotne Felka oznaczają „Nie podano”.
- Zgody na planszy pokazują stan uzupełniony przed wysłaniem, a nie domyślną akceptację. Etykiety dokumentów są robocze; wymagają zatwierdzenia zgodnie z P-04 designu. Zachowanie danych na przyszłość nie jest wybrane.
- Wymagalność danych klienta i kota wymaga uzgodnienia z walidacją aplikacji (P-06). Nie dodano deklaracji o okresie przechowywania danych.
- Plansza stanów przedstawia fragmenty UI. Dwa komunikaty w sekcji „Limit i błąd linku” są alternatywnymi wariantami.

## Aktualne źródło i odtworzenie

[Otwórz makietę](mockup-rezerwacja.html). Wszystkie 19 widoków, style, skrypty, logo i fonty są osadzone w jednym HTML-u. Możesz pobrać tylko ten plik; przejścia między krokami działają bez zasobów repozytorium. [Zasady wspólnego stylu](../STYLE-GUIDE.md) opisują wygląd i rozbudowę. Przejścia do pozostałych makiet wymagają ich plików w dotychczasowym układzie katalogów.

Na dużym ekranie plansze dopasowują się do szerokości okna. Na telefonie domyślnie otwiera się krok 01, a odnośniki prowadzą przez kolejne kroki. Zachowano adresy `?screen=01`–`?screen=10` i dziewięć stanów pomocniczych. Pasek podglądu umożliwia powrót do planszy i wybór ekranu. Logo, wyjście ze zgłoszenia i kontakt prowadzą do pozostałych makiet.

Pola i wybory prezentują przykładowe dane; nie jest to formularz produkcyjny. Makieta nie zapisuje danych i nie wysyła wiadomości.

[Opis wspólnego szablonu i zasad rozbudowy](../README.md). `node mockups/public/rezerwacja/render.cjs` eksportuje istniejący HTML do `../exports/booking/` bez generowania lub nadpisywania źródeł. PNG zachowane w tym katalogu są archiwalne. Wspólną weryfikację uruchamia `node mockups/public/check-public.cjs`.
