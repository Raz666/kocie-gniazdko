# Wspólny szablon makiet publicznych

Źródłem każdej makiety jest jeden samodzielny HTML z osadzonymi stylami, skryptami, fontami, logo i zdjęciami. PNG zachowane przy poszczególnych stronach są archiwalnymi eksportami z 9 września 2026, a nie aktualnym wzorcem implementacji.

## Otwieranie

- [Strona główna](strona-glowna/preview-qa.html)
- [Kontakt](kontakt/mockup-kontakt.html)
- [Rezerwacja](rezerwacja/mockup-rezerwacja.html)

Otwórz dowolny HTML w przeglądarce. Nie potrzeba serwera, kompilacji ani połączenia z internetem do załadowania makiet. Do pokazania danej strony wystarczy pobrać jej pojedynczy HTML. Przejścia do innych makiet wymagają ich plików w dotychczasowym układzie katalogów — tak samo jak w makietach administratora. Linki wewnątrz bieżącej strony działają także po zmianie nazwy pliku.

Na ekranach od 768 px domyślnie wyświetla się **Plansza**: kolumny o projektowej szerokości 390 px, automatycznie pomniejszone, jeśli nie mieszczą się w oknie. Przycisk „Dopasuj do okna” przełącza pomiędzy dopasowaniem a skalą 1:1. Plansza zachowuje pełną długość treści i przewijanie pionowe.

**Strona** pokazuje ciągłą stronę główną lub kontakt, a w rezerwacji pojedynczy krok. Na dużym ekranie ten widok ma 390 px i wspólne tło dookoła. Na ekranach poniżej 768 px automatycznie wypełnia całą szerokość okna, także przy 412 i 600 px. Dolne CTA są przyklejone do okna; na planszy i pełnym eksporcie znajdują się na końcu treści. To nadal projekt mobilny, przygotowany do późniejszego dodania osobnych układów desktopowych.

Adres `?view=page` otwiera widok strony, `?view=board` planszę na dużym ekranie. W rezerwacji `?screen=01`–`?screen=10` i nazwy stanów, np. `?screen=exit`, otwierają konkretny widok. Domyślny mobilny ekran rezerwacji to `01`. Tytuły kolumn rezerwacji i selektor w pasku podglądu prowadzą do pojedynczych ekranów.

Menu, logo, stopki, CTA, przejścia rezerwacji, galeria i FAQ działają lokalnie. Regulamin i polityka prywatności prowadzą do dotychczasowych dokumentów istniejącej witryny. Telefon, e-mail i trasa zachowują właściwe schematy linków. Formularz rezerwacji przedstawia przykładowe dane i stany; nie zapisuje ani nie wysyła zgłoszeń.

## Spójność i rozbudowa

[STYLE-GUIDE.md](STYLE-GUIDE.md) określa kolory, typografię, odstępy, komponenty, responsywność oraz zasady aktualizowania wspólnych bloków w HTML-ach. Makiety nie korzystają z osobnych plików CSS lub JS. Bloki `shared-fonts`, `shared-styles`, `mockup-assets` i `shared-behavior` muszą być identyczne we wszystkich plikach; kontrola automatyczna wykrywa rozbieżności.

Treść i style danej strony edytuj bezpośrednio w jej HTML-u. Nową makietę rozpocznij od kopii istniejącej, zgodnie z instrukcją w przewodniku. Nie potrzeba generatora ani kroku budowania. Katalog `assets/` zachowuje oryginały materiałów do przyszłych zmian, ale nie jest potrzebny do wyświetlania makiet.

## Sprawdzanie i opcjonalny eksport

```sh
node mockups/public/check-public.cjs
node mockups/public/render-public.cjs home
node mockups/public/render-public.cjs contact
node mockups/public/render-public.cjs booking
```

Sprawdzenie obejmuje zgodność wspólnych bloków, 3 makiety skopiowane bez zasobów pod nowymi nazwami do katalogu tymczasowego, osadzone fonty i obrazy, szerokości 320–3440 px, 19 ekranów rezerwacji, przepełnienia, ścieżki do plików i interakcje. Eksporter czyta istniejące HTML-e i zapisuje obrazy do ignorowanego przez Git katalogu `exports/`. **Nie nadpisuje plików źródłowych.** Dotychczasowe `render.cjs` kontaktu i rezerwacji oraz `strona-glowna/check-mockup.cjs` delegują do tych wspólnych narzędzi.

Skrypty korzystają z lokalnego Playwright lub środowiska desktopowego Codex. Można podać `PLAYWRIGHT_MODULES` wskazujące katalog `node_modules`. Domyślnie używają Edge; `BROWSER_CHANNEL=chromium` wybiera Chromium z Playwright. Przeglądanie makiet nie wymaga tych zależności.
