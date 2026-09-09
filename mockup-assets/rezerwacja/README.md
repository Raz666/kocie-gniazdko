# Mobilny formularz rezerwacji — makiety PNG

Przygotowano 9 września 2026 na podstawie `docs/design-kocie-gniazdko.md`, dokumentacji biznesowej oraz `mockup-assets/preview-qa.html` i istniejącego PNG strony głównej. Zachowano dostarczone logo, kremowe powierzchnie, ciemnozielone CTA, Alegreya i Source Sans 3.

## Pliki do oglądania

- `rezerwacja-mobile-wszystkie-kroki.png` — pełna plansza: Termin, Pobyt, Twoje dane, Koty, Podsumowanie i przyjęcie zgłoszenia.
- `rezerwacja-mobile-zapisane-dane.png` — prośba o link, neutralny wynik wysyłki, wybór danych i nieaktywny link.
- `rezerwacja-mobile-stany-i-bledy.png` — dziewięć zestawów widoków pomocniczych, w tym walidacja, brak stawek, nieaktywna stawka, wysyłanie, błąd połączenia i niepewny wynik.
- Pliki `01-…png` do `10-…png` — każdy pełny ekran osobno w szerokości 780 pikseli (makieta 390 px, eksport ×2).

Ekrany mają pełną długość przewijanej strony. Plansza zbiorcza wymaga powiększenia, aby czytać drobny tekst. Dane klientów, kotów, numer zgłoszenia i kwoty są przykładowe. Kontakt, logo i przykładowe stawki 50/60 zł kontynuują istniejącą makietę strony głównej.

## Założenia i adnotacje

- Przykład: 12–19.10.2026, 7 dni, 50 zł dziennie, razem 350 zł za rezerwację z dwoma kotami. Bez dodatkowego mnożnika liczby kotów.
- Kalendarz pokazuje wybór dat, a nie dostępność. Komunikat o popularności jest przykładowym stanem opcjonalnym.
- Wysłanie zgłoszenia nie jest potwierdzeniem pobytu. Płatności są ustalane poza formularzem.
- Pełne informacje opiekuńcze są widoczne w podsumowaniu. Puste informacje zdrowotne Felka oznaczają „Nie podano”.
- Zgody na planszy pokazują stan uzupełniony przed wysłaniem, a nie domyślną akceptację. Etykiety dokumentów są robocze; wymagają zatwierdzenia zgodnie z P-04 designu. Zachowanie danych na przyszłość nie jest wybrane.
- Wymagalność danych klienta i kota wymaga uzgodnienia z walidacją aplikacji (P-06). Nie dodano deklaracji o okresie przechowywania danych.
- Plansza stanów przedstawia fragmenty UI. Dwa komunikaty w sekcji „Limit i błąd linku” są alternatywnymi wariantami.

## Źródło i odtworzenie

`mockup-rezerwacja.html` jest źródłem wizualnym z przykładowymi przejściami przez adresy `?screen=01`–`?screen=10`. Pola i wybory są statycznymi reprezentacjami do eksportu, nie działającym formularzem produkcyjnym. Makieta nie zapisuje danych i nie wysyła wiadomości. Nie została opublikowana.

`render.cjs` tworzy HTML i 13 plików PNG przy użyciu Playwright oraz zainstalowanego Edge. Uruchom z katalogu projektu: `node mockup-assets/rezerwacja/render.cjs`. Ścieżka do Playwright odpowiada lokalnemu środowisku Codex. Fonty są zapisane lokalnie i nie wymagają sieci przy eksporcie.

Weryfikacja: cztery odmiany fontów załadowane, logo poprawnie wczytane, brak błędów JavaScript, brak poziomego przepełnienia dziesięciu widoków przy 390 px oraz podsumowania przy 320 px. Obejrzano render główny, szczegóły formularza, podsumowanie oraz plansze dodatkowe. PNG wyrenderowano deterministycznie z HTML/CSS; nie użyto generowania obrazowego.
