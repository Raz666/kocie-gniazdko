# Kalendarz — panel administratora

## Interaktywna makieta HTML

Otwórz [mockup-kalendarz.html](mockup-kalendarz.html) bezpośrednio w przeglądarce. Plik jest samodzielny: zawiera CSS, JavaScript, ikony, osadzone fonty Source Sans 3 i przykładowe dane. Działa także offline, bez instalowania Node.js, serwera ani kompilacji. Link „Dzisiaj” prowadzi do sąsiedniej makiety dashboardu, jeśli zachowasz układ katalogów.

Przełącznik u góry pozwala porównać ten sam plan:

- **v3 · dni u góry** — czas w kolumnach, boksy w wierszach.
- **v4 · boksy u góry** — boksy w kolumnach, dni w wierszach; domyślny widok.

Orientacja zachowuje okres, filtry, wybór kota, propozycję przeniesienia i zmiany przykładowych danych. Przewijanie po zmianie orientacji zaczyna się od początku siatki. Nagłówki osi pozostają widoczne podczas przewijania. Nakładające się pobyty mają osobne pasy; rozszerzają odpowiednio wiersz v3 lub kolumnę v4.

### Co można wypróbować

- Wyszukiwanie kota lub właściciela, filtr lokalizacji i statusu.
- Zakres 7 / 14 / 30 dni, poprzedni/następny okres i Dzisiaj. Dniem odniesienia danych jest **9 września 2026**, niezależnie od daty komputera.
- Zoom przeglądarki i pełny ekran obszaru pracy; Esc zamyka najpierw panel, a następnie pełny ekran.
- Kliknięcie karty otwiera szczegóły, w tym dokładne daty oraz odcinki rozmieszczenia.
- Przeniesienie całego pobytu lub części odcinka przez formularz albo przeciągnięcie uchwytu w prawym górnym rogu karty. Przeciąganie zmienia wyłącznie boks. Upuszczenie tworzy propozycję; zapis i anulowanie są osobnymi akcjami.
- Rozwinięcie kolejki bez boksu, przypisanie pojedynczego kota oraz wspólne przypisanie Figi i Felka.
- Przywrócenie przykładowych danych jednym przyciskiem.

Przykład do porównania: wybierz Gniazdko 1 → Lunę → Przenieś kota → Część pobytu → Box 2. Domyślny fragment trwa od 13 września, 14:00 do 15 września, 10:00. Przełączaj v3/v4 przed zapisem, aby obejrzeć te same zablokowane daty w obu orientacjach. Karty mają geometrię wyliczoną z terminów, z czterogodzinną przerwą po odbiorze Miszy.

Na wąskim ekranie siatka zachowuje czytelne rozmiary i własne przewijanie; panel szczegółów wysuwa się nad prawą częścią kalendarza i przewija niezależnie. Ten wariant celowo umożliwia ocenę obu osi także na telefonie, bez osobnego widoku listowego. Krótkie odcinki mają skróconą etykietę w siatce i pełne dane w podglądzie. Pełny ekran jest trybem układu strony, nie ukrywa interfejsu samej przeglądarki.

To symulacja w pamięci przeglądarki: odświeżenie usuwa zmiany. Nie ma backendu, logowania ani wysyłki wiadomości. Przenoszenie planowanych odcinków pozostaje propozycją rozszerzenia A-01, nie implementacją produkcyjnego modelu przemieszczeń. Godziny nieokreślone na PNG przyjęto przykładowo jako przyjazd 14:00 i odbiór 10:00; Luna i Mela przyjeżdżają o 09:00.

### Mały ekran i zoom 150%

Wariant kompaktowy oddaje więcej wysokości siatce. Bazowy tekst ma 14 px, imiona kotów 16 px, właściciele 13 px, a statusy i dodatkowe opisy 11 px. Wielkość tekstu administrator dobiera zoomem przeglądarki. Przyciski i filtry mają wysokość 34 px, odstępy 6–8 px. W widoku z dniami w wierszach dzień zajmuje 36 px (pierwotnie 116), pojedynczy pas boksu 120 px (pierwotnie 188), a nagłówki łącznie 54 px (pierwotnie 92).

Siatka zajmuje pozostałą wysokość okna i przewija się w obu kierunkach, z przypiętymi osiami oraz paskami przewijania. Kolejka rozwija się pod siatką w jednym zwartym rzędzie, z własnym przewijaniem; nie zasłania siatki ani jej pasków przewijania. Wybór kota lub wspólnego domu zwija kolejkę i otwiera krótki formularz przypisania: koty, termin, boks, inne przypisania i zapis. Boks można wybrać przy przypisywaniu i przenoszeniu także kliknięciem nagłówka siatki (lub Enter/Spacją po ustawieniu fokusu). Anulowanie przywraca kolejkę bez zapisu. Panel szczegółów ma własny scroll oraz przypięte zamknięcie. Przy szerokości do 1190 px nawigacja chowa się pod przyciskiem menu; do 700 px szczegóły wysuwają się nad siatką. Legenda zachowuje kolorowe tła i pionowe paski także na niskich ekranach; znika tylko tekst stopki, a przy wysokości do 440 px dostępny jest także scroll całej strony, aby wszystkie kontrolki pozostały osiągalne.

Sprawdzenie: `node mockups/admin/kalendarz/check-compact.cjs`. Obejmuje m.in. 1536 × 726 oraz 1024 × 484 piksele CSS — drugi rozmiar odpowiada przestrzeni roboczej pierwszego przy zoomie 150%. Sprawdza zwykły i pełny ekran, przewijanie, kolejkę oraz zapis przypisania/przeniesienia. Nie nadpisuje referencyjnych PNG. To weryfikacja geometrii viewportu; końcową ocenę na urządzeniu warto wykonać z jego rzeczywistym zoomem i skalowaniem systemowym.

Nagłówek zawiera wyszukiwarkę, filtr lokalizacji i legendę działającą jako filtr statusów. Wszystkie statusy są domyślnie włączone; można wyłączyć dowolne, także wszystkie. Wyłączone przyciski mają opacity 0.7, a karty niedopasowane do wyszukiwania 0.5. Zakres dni i orientacja współdzielą drugi rząd. Wyjście z pełnego ekranu ma etykietę „Widok zwykły”. Na węższych ekranach kontrolki zawijają się.

Całą kartę domu można przeciągnąć (kursor grab, uchwyt w prawym górnym rogu) do nagłówka lub obszaru boksu. Gest przypisuje cały dom jako propozycję, zachowuje daty i wymaga zapisu. Kliknięcie imienia nadal przypisuje pojedynczego kota. Esc przerywa przeciąganie z kolejki i przywraca kolejkę. Test interakcji: node mockups/admin/kalendarz/check-controls.cjs — rzeczywiste gesty myszy w obu orientacjach, filtry, wyszukiwanie, daty i anulowanie.

Panel pobytu ma niski, stały nagłówek, badge statusu oraz osobno przewijaną treść. Przyciski Zapisz / Anuluj leżą obok siebie poza przewijaną częścią, stale przy dolnej krawędzi. Zakres przeniesienia to poziomy przełącznik; część pobytu udostępnia dwie kolumny Od / Do (data i godzina 00:00–23:00, bez minut). Walidacja blokuje puste daty, odwrócony zakres i wyjście poza pobyt.

Lista boksów ma podgląd: najechanie opcją lub strzałki podświetlają i przewijają do odpowiedniego nagłówka siatki bez zmiany propozycji. Kliknięcie lub Enter zatwierdza wybór; Esc zamyka listę i usuwa podgląd. Boks źródłowy jest niedostępny. Test: node mockups/admin/kalendarz/check-panel.cjs (daty, badge’e, stałe CTA, podgląd i zapis).

Po zapisie sąsiadujące odcinki tego samego kota w tym samym boksie są scalane, wyłącznie gdy koniec jednego równa się początkowi następnego. Przerwy i różne boksy pozostają rozdzielone.

Klikalne karty „Z tego samego domu” dołączają lub odłączają koty do wspólnego przeniesienia. Dla całego odcinka każdy kot zachowuje własne daty; przy części pobytu wybrany zakres musi mieścić się w odcinkach wszystkich dołączonych kotów. Każdą propozycję można ponownie przeciągnąć, także jako grupę, przed zapisem.

Mała ikona domku w pełnym kółku obok imienia kota oznacza wspólny dom. Nakładające się przypisania są opisane jako „z jednego domu” albo „z różnych domów”; drugi przypadek ma pomarańczowe tło nagłówka i małą, okrągłą ikonę ostrzeżenia z pełnym tłem. Mocna obwódka pojawia się wyłącznie na celu lub boksie podświetlanym podczas przenoszenia. Oznaczenie uwzględnia również koty ukryte filtrem statusu. Różne domy w rozłącznych terminach nie powodują ostrzeżenia. Ostrzeżenie pojawia się też obok innych przypisań podczas wyboru celu. Lista boksów jest nakładką, wybiera kierunek otwarcia według dostępnego miejsca i nie zwiększa wysokości przewijanej treści. Test: node mockups/admin/kalendarz/check-households.cjs.

### Podglądy i sprawdzenie

Zrzuty działającego HTML: [v4](kalendarz-html-v4.png), [v3](kalendarz-html-v3.png), [przenoszenie](kalendarz-html-przenoszenie.png), [telefon](kalendarz-html-mobile.png).

Opcjonalny skrypt `node mockups/admin/kalendarz/check-mockup.cjs` sprawdza przełączanie osi, zachowanie terminów, przypięte nagłówki, geometrię propozycji, rzeczywisty gest myszy, zapis i anulowanie, walidację zakresu, przypisanie wspólnego domu, wyszukiwanie, nawigację dat, pełny ekran i brak przepełnienia strony przy szerokościach 320–1920 px. Zapisuje cztery powyższe PNG. Wymaga Playwright i Edge; można wskazać moduł przez `PLAYWRIGHT_MODULE` oraz kanał przeglądarki przez `BROWSER_CHANNEL`. Skrypt rozpoznaje także Playwright obok dołączonego środowiska Node.js. Nie jest potrzebny do otwierania HTML.

## Referencyjne makiety PNG

Makiety graficzne PNG i odpowiadające im prompty znajdują się razem, według wersji:

- [v1 — lista rezerwacji](v1/kalendarz-desktop.png).
- [v2 — plan boksów](v2/kalendarz-plan-boksow-v2.png); zawiera prompt podstawowy i instrukcję korekty.
- [v3 — czytelność](v3/kalendarz-v3-01-czytelnosc.png).
- [v3 — przenoszenie](v3/kalendarz-v3-02-przenoszenie.png).
- [v3 — brak boksu](v3/kalendarz-v3-03-bez-boksu.png).
- [v3 — pełny ekran](v3/kalendarz-v3-04-fullscreen.png).
- [v3 — przeniesienie całego pobytu](v3/kalendarz-v3-05-caly-pobyt.png).
- [v4 — odwrócone osie: boksy u góry, dni po lewej](v4/kalendarz-v4-01-odwrocone-osie.png).
- [v4 — przenoszenie poziome](v4/kalendarz-v4-02-przenoszenie.png).

Założenia v4, zasady przewijania i ograniczenia dokładności obrazów opisano w [propozycji v4](v4/README.md).

Są to gotowe obrazy, nie ekrany działającej aplikacji. Nie wymagają zdjęć, fontów ani innych plików z `public/assets/`. Prompty zachowano bez zmian jako dokumentację powstania wariantów.

Podstawa: [design panelu](../../../docs/design-panel-administracyjny.md). Warianty przenoszenia należy odczytywać wraz z zależnościami i rozszerzeniami opisanymi w tej specyfikacji, a nie jako potwierdzenie wdrożenia tych funkcji.
