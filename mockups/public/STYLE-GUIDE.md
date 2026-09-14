# Zasady spójności samodzielnych makiet publicznych

Każda strona jest jednym edytowalnym HTML-em. Zawiera własne CSS, JavaScript, fonty, logo, ikony i zdjęcia. Plik otwarty w przeglądarce działa bez repozytorium, serwera, kompilacji i internetu. Dotyczy to zawartości danej strony; linki do innych makiet wymagają plików docelowych w dotychczasowym układzie katalogów.

Wzorcem wyglądu formularzy pozostaje [rezerwacja](rezerwacja/mockup-rezerwacja.html). Reguły wspólne obowiązują również [stronę główną](strona-glowna/preview-qa.html) i [kontakt](kontakt/mockup-kontakt.html). PNG są archiwalnymi eksportami, a nie źródłem zmian.

## Organizacja HTML

Ten sam wyjątek dla niezależnych kierunków wizualnych obejmuje [wersję 04 — ciepły ogród](strona-glowna/preview-botanical-v4.html), z `body[data-variant="botanical-warm"]`. Używa Alegreyi również w opisach, lokalnych dekoracji SVG/CSS oraz dwóch fotografii po retuszu generatywnym. Wspólne bloki wersji bazowej pozostają identyczne; osobny blok wariantu obsługuje też ponowne użycie osadzonych zdjęć. Kontrola: `node mockups/public/strona-glowna/check-retro.cjs botanical`.

Analogiczny wyjątek dotyczy [wersji 03 — gościnnej nowoczesności](strona-glowna/preview-modern-v3.html). Jest niezależnym kierunkiem wizualnym, zachowuje wersję 02 i wspólne bloki bazowe; używa tych samych identyfikatorów bloków wariantu oraz `body[data-variant="modern-warm"]`. Sprawdzenie: `node mockups/public/strona-glowna/check-retro.cjs modern`.

Wyjątek do porównania kierunków: [strona główna w wersji 02](strona-glowna/preview-retro-v2.html) zachowuje wspólne bloki wersji 01, ale celowo nadpisuje wygląd w osobnym `style#variant-styles`, ograniczonym do `body[data-variant]`. Ten eksperyment zamówiony jako oddzielna wersja nie ustanawia nowych zasad dla kontaktu i rezerwacji. Jego interakcje porównania znajdują się w `script#variant-behavior`, a kontrolę wykonuje `strona-glowna/check-retro.cjs`. Nie dodawaj go do rejestru stron wspólnego szablonu.

Zachowaj `lang="pl"`, kodowanie UTF-8, meta viewport i poniższe identyfikatory bloków:

| Blok | Zawartość | Zasada edycji |
| --- | --- | --- |
| `style#page-styles` | Style treści konkretnej strony | Zmiany lokalne; selektory ograniczone do komponentu lub `body[data-page]` |
| `style#shared-fonts` | Cztery osadzone odmiany fontów | Identyczny blok w każdej makiecie |
| `style#shared-styles` | Tokeny, typografia, komponenty i podgląd | Identyczny blok w każdej makiecie |
| Treść `body[data-page]` | Sekcje / ekrany danej strony | Jedna kolejność DOM dla planszy i telefonu |
| `script#mockup-assets[type="application/json"]` | Logo jako data URI | Identyczny blok w każdej makiecie |
| `script#shared-behavior` | Nagłówek, stopka, nawigacja i tryby podglądu | Identyczny blok w każdej makiecie |
| `script#page-behavior` | Interakcje charakterystyczne dla strony | Opcjonalny, np. galeria strony głównej |

Skrypty wykonywalne umieszczaj na końcu `body`, po treści i danych zasobów. Nie dodawaj `script[src]`, zewnętrznych arkuszy, `@import`, iframe ani zasobów wymagających pobrania. Fonty osadzaj w `@font-face` jako `data:font/ttf;base64,…`; zdjęcia jako `data:image/jpeg;base64,…`; logo jako `data:image/png;base64,…`. Ikony to liniowe SVG bez zewnętrznej biblioteki.

## Kolory i typografia

| Token | Wartość | Zastosowanie |
| --- | --- | --- |
| `--kg-ink` | `#44372c` | Tekst główny i nagłówki |
| `--kg-muted` | `#756c63` | Tekst pomocniczy |
| `--kg-green` | `#526f22` | Główne CTA, linki, wybór |
| `--kg-paper` | `#fcfcfa` | Tło treści |
| `--kg-cream` | `#f6f3ea` | Sekcje i stopka |
| `--kg-line` | `#ddd7cc` | Obramowania i separatory |
| `--kg-soft` | `#edf3e3` | Wybrane karty i delikatne wyróżnienia |
| `--kg-gold` | `#b88c55` | Kreska przy nadtytule |
| `--kg-board` | `#eae7df` | Całe tło planszy, także na bardzo szerokim ekranie |

- Tekst: Source Sans 3, 400 i 600, bazowo 16 px / 1,5. Tekst wprowadzający: 18 px / 1,55. Pomocniczy: 14 px. Drobne metadane: 12 px.
- Nagłówki: Alegreya, 500; osadzona jest również waga 600. Odstęp liter `-.025em`. H1: 40 px / 1,1; H2: 32 px / 1,2; H3: 24 px / 1,25. H2 wewnątrz formularza: 28 px. Tytuł planszy: 48 px.
- Kolory komponentów bierz ze zmiennych `--kg-*`. Kolory stanów informacyjnych, ostrzeżeń i błędów kontynuuj z formularza rezerwacji.

## Wspólne komponenty

- Nagłówek: 90 px wysokości, padding 16 px, białe tło, dolna linia. Logo: do 264 px szerokości, skaluje się z zachowaniem proporcji. Menu / zamknięcie: 48 × 52 px.
- Główne przyciski: minimum 56 px wysokości, padding 14 × 16 px, promień 12 px, tekst 16 px / 600, biały na zieleni. Wariant wtórny: przezroczyste tło, zielony tekst i obramowanie. CTA w dolnym pasku: minimum 52 px.
- Pola: minimum 52 px wysokości, promień 12 px. Karty: zwykle promień 16 px; zdjęcia i duże zaproszenia: 24 px.
- Rytm odstępów: 8, 12, 16, 20, 24, 32, 40, 48, 64 px. Boczne odstępy treści mobilnej: 16 px.
- Ikony: `viewBox="0 0 24 24"`, `currentColor`, grubość linii 1,7, zaokrąglone końce; standardowy rozmiar 22 px.
- Znaczniki `data-site-header`, `data-site-footer` i `data-site-actions` wstawiają wspólne komponenty. `data-site-header="booking"` daje nagłówek z wyjściem z formularza.
- Zachowaj widoczny fokus, etykiety dostępności, `aria-expanded`, obsługę Escape w menu i galerii. Nie zastępuj odnośników klikanymi `div`.

## Plansza i telefon

- Projektowa szerokość kolumny: `--screen-width: 390px`; odstęp między kolumnami: 24 px. `.board-grid` korzysta z `--columns`.
- Od 768 px domyślnie pokazuj planszę, automatycznie pomniejszoną do szerokości okna. Zachowaj pełną długość treści i przełącznik dopasowania / skali 1:1.
- Tryb „Strona” na dużym ekranie ma 390 px i jest wyśrodkowany na tle planszy.
- Poniżej 768 px zawsze pokazuj widok strony na pełną szerokość okna, bez ramek, bocznych białych pasów i poziomego przepełnienia.
- Strona główna i kontakt składają kolejne kolumny w ciągłą stronę. Rezerwacja pokazuje jeden wybrany ekran, domyślnie `01`.
- Zachowaj `?view=page`, `?view=board`, `?screen=…`, identyfikatory sekcji i ekranów. Linki do sekcji bieżącej strony muszą działać również po zmianie nazwy HTML-a.
- Dolne CTA są przyklejone do okna w widoku strony; uwzględniaj `safe-area-inset-bottom` i zostaw miejsce pod treścią. W planszy i pełnym eksporcie pasek trafia na koniec treści.
- Plansze na monitorze nadal przedstawiają projekt mobilny. Przyszłe właściwe układy desktopowe należy dodać jako osobny, jawnie opisany wariant.

## Aktualizowanie i dodawanie stron

1. Edytuj treść i style lokalne bezpośrednio w HTML-u. Katalog `assets/` jest biblioteką materiałów źródłowych, nie zależnością uruchomieniową.
2. Zmianę wspólnego wyglądu lub zachowania wprowadź w odpowiednim wspólnym bloku i skopiuj cały blok do pozostałych HTML-i. Nie maskuj różnic lokalnymi nadpisaniami wspólnych komponentów.
3. Aktualizuj ten dokument, gdy zmieniają się uzgodnione reguły.
4. Nową stronę rozpocznij od kopii istniejącego HTML-a; wymień treść, `page-styles`, opcjonalny `page-behavior`, tytuł i `body[data-page]`. Zostaw identyczne wspólne bloki i znaczniki komponentów.
5. Dodaj trasę oraz pozycję nawigacji we wszystkich kopiach `shared-behavior`, a plik w `browser.cjs`. Zasoby nowej strony osadź wewnątrz jej HTML-a.
6. Uruchom `node mockups/public/check-public.cjs`. Skrypt sprawdza identyczność wspólnych bloków, działanie po skopiowaniu samych HTML-i pod nowymi nazwami bez katalogu zasobów, fonty, obrazy, interakcje i szerokości 320–3440 px. Obejrzyj widok mobilny i planszę po zmianie wyglądu.

Nie jest potrzebny generator HTML. Eksport PNG pozostaje opcjonalny i wyłącznie czyta aktualne pliki.
