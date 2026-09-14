# Strona główna — makieta mobilna

## Porównanie kierunków wizualnych

- [Wersja 04 — ciepły ogród](preview-botanical-v4.html): paleta kremu i piasku z ciepłą oliwką, Alegreya w nagłówkach i opisach, lekka faktura papieru oraz liniowe motywy roślinne. Zdjęcie ogrodowe płynnie łączy się z tłem i mniejszym portretem przy oknie; galeria ma asymetryczną kompozycję. Pasek podglądu prowadzi do wszystkich wcześniejszych wersji.
- [Wersja 03 — gościnna nowoczesność](preview-modern-v3.html): ciepła biel, szałwia i głęboka zieleń, proste nagłówki bezszeryfowe, duże zdjęcie na pierwszym ekranie oraz galeria z różnymi rozmiarami kadrów. Bez albumowych ramek, pieczęci i terakoty. Na komputerze odnośniki w pasku podglądu otwierają wersje 01 i 02 w osobnych kartach, zachowując tryb planszy lub strony.
- [Wersja 01 — pierwotna](preview-qa.html).
- [Wersja 02 — ciepłe retro](preview-retro-v2.html): kremowe tło, oliwka i terakota, łukowe oprawy zdjęć, albumowa galeria i subtelne detale pensjonatu. Układ sekcji, informacje o pobycie i funkcje pozostają porównywalne. Na komputerze przycisk „Wersja 01 · porównaj” otwiera oryginał w nowej karcie, w tym samym trybie podglądu.

Wersja 02 jest samodzielnym eksperymentem wizualnym, a nie zmianą wspólnego szablonu. Jej style znajdują się w `style#variant-styles`, a link porównania w `script#variant-behavior`. Oryginał, kontakt i rezerwacja zachowują dotychczasowy wygląd; odnośniki do kontaktu i rezerwacji prowadzą do wersji 01.

HTML wersji 02 działa offline, również po skopiowaniu i zmianie nazwy. Istniejące zdjęcia zostały ponownie skompresowane do WebP; bez dodatkowych fontów, bibliotek, filmów ani zasobów sieciowych. Plik ma 1 541 496 B (około 1,54 MB), o 19,4% mniej niż wersja 01 (1 911 869 B). Wszystkie zasoby są osadzone, więc zdjęcia w dalszych sekcjach również wchodzą w całkowity transfer HTML-a.

Weryfikacja wariantu: `node mockups/public/strona-glowna/check-retro.cjs`. Sprawdza szerokości 320–3440 px, menu, FAQ, galerię, link porównania, lokalne odnośniki, samodzielność pliku i brak żądań sieciowych. Zrzuty zapisuje w `../exports/retro-v2/`.

## Wersja 03 — samodzielny wariant

Wersja 03 jest osobnym eksperymentem w `preview-modern-v3.html`; wersje 01 i 02 pozostają niezmienione. Zachowuje wspólne bloki szablonu i osadza lokalne nadpisania w `variant-styles` oraz linki porównania w `variant-behavior`. Wykorzystuje już odchudzone zdjęcia z wersji 02 i istniejące fonty. Cały samodzielny HTML ma 1 541 214 B (około 1,54 MB), działa offline i nie pobiera dodatkowych zasobów. Kontakt i formularz rezerwacji nadal prowadzą do wspólnego szablonu wersji 01.

Kontrola wersji 03: `node mockups/public/strona-glowna/check-retro.cjs modern`. Obejmuje szerokości 320–3440 px, interakcje, oba linki porównania i działanie po skopiowaniu samego HTML-a pod inną nazwą. Zrzuty: `../exports/modern-v3/`.

## Wersja 04 — fotografie i botanika

Samodzielny plik `preview-botanical-v4.html` zachowuje poprzednie warianty. Alegreya 500 służy też do dłuższych opisów (18–21 px); Source Sans 3 pozostaje w nawigacji, przyciskach i drobnym tekście użytkowym. Faktura tła powstaje w CSS, a dekoracje są lekkimi osadzonymi SVG. Brak animacji, dodatkowych fontów, bibliotek i zasobów sieciowych.

Dopracowanie z 14 września: żywsza ciepła zieleń `#58782b`, różne kompozycje liści przy powitaniu, hotelu, zaproszeniu i stopce oraz kocie łapki w przerywnikach. Trzy kroki mają numerowane znaczniki skierowane w dół i łączące strzałki. Cennik otrzymał kremowe i jasnozielone kontenery. Sekcja przed wizytą zawiera ilustrowaną kartę przygotowań z ptaszkami oraz osobną kartę FAQ. Stopka łączy zdjęcie ogrodowe, pożegnanie, roślinny brzeg i zielony panel kontaktu oraz nawigacji. Jej rozbudowa znajduje się w lokalnym `variant-behavior`, bez zmian we wspólnym szablonie. Kontrast białego tekstu CTA względem nowej zieleni wynosi około 5,08:1.

Dwie fotografie poddano retuszowi generatywnemu wbudowanym narzędziem image_gen: zdjęcie kota w ogrodzie i kota na parapecie. Są to materiały do oceny kierunku wizualnego, z możliwymi zmianami drobnych szczegółów względem oryginałów. [Źródła, finalne obrazy i pełne prompty](../assets/botanical-v4/README.md) pozostają w osobnym katalogu; oryginalne zdjęcia nie zostały zmienione. W HTML-u każde z dwóch zdjęć WebP osadzono tylko raz, mimo użycia również w galerii i kompozycji powitania.

Plik ma około 1,63 MB, o 14,7% mniej niż wersja 01. Nowe dekoracje i ponowne użycie zdjęcia w stopce zwiększyły HTML o około 14 KB, bez dodatkowych danych fotografii. Wszystkie obrazy są częścią transferu HTML-a. Weryfikacja: `node mockups/public/strona-glowna/check-retro.cjs botanical`; obejmuje szerokości 320–3440 px, menu, FAQ, galerię, trzy linki porównania, brak przepełnień oraz działanie offline i po zmianie nazwy pliku. Eksport czeka na dekodowanie zdjęć, również tych użytych ponownie. Zrzuty: `../exports/botanical-v4/`.

## Wspólny szablon wersji 01

[Otwórz makietę](preview-qa.html). Na dużym ekranie pokazuje pięć kolejnych części strony na jednej planszy, a na telefonie ciągłą stronę od nagłówka do stopki. Pasek podglądu przełącza tryby i prowadzi do kontaktu oraz rezerwacji.

Cała makieta znajduje się w jednym HTML-u: treść, CSS, JavaScript, zdjęcia, logo i fonty. Pobierz sam plik i otwórz go w przeglądarce. Menu, galeria, FAQ i sekcje bieżącej strony działają także po zmianie nazwy pliku. [Zasady wspólnego stylu](../STYLE-GUIDE.md) opisują utrzymanie spójności z kontaktem i rezerwacją. Przejścia do pozostałych makiet wymagają ich plików w dotychczasowym układzie katalogów.

[Opis szablonu, rozbudowy i weryfikacji](../README.md). Kontrola: `node mockups/public/check-public.cjs`. Eksport: `node mockups/public/render-public.cjs home`.

PNG i JPG w tym katalogu są archiwalnymi eksportami wcześniejszej wersji, nie aktualnym źródłem projektu.
