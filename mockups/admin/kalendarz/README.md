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
- Większy tekst i pełny ekran obszaru pracy; Esc zamyka najpierw panel, a następnie pełny ekran.
- Kliknięcie karty otwiera szczegóły, w tym dokładne daty oraz odcinki rozmieszczenia.
- Przeniesienie całego pobytu lub części odcinka przez formularz albo przeciągnięcie uchwytu w prawym górnym rogu karty. Przeciąganie zmienia wyłącznie boks. Upuszczenie tworzy propozycję; zapis i anulowanie są osobnymi akcjami.
- Rozwinięcie kolejki bez boksu, przypisanie pojedynczego kota oraz wspólne przypisanie Figi i Felka.
- Przywrócenie przykładowych danych jednym przyciskiem.

Przykład do porównania: wybierz Gniazdko 1 → Lunę → Przenieś kota → Część pobytu → Box 2. Domyślny fragment trwa od 13 września, 14:00 do 15 września, 10:00. Przełączaj v3/v4 przed zapisem, aby obejrzeć te same zablokowane daty w obu orientacjach. Karty mają geometrię wyliczoną z terminów, z czterogodzinną przerwą po odbiorze Miszy.

Na wąskim ekranie siatka zachowuje czytelne rozmiary i własne przewijanie; panel szczegółów przechodzi pod kalendarz. Ten wariant celowo umożliwia ocenę obu osi także na telefonie, bez osobnego widoku listowego. Krótkie odcinki mają skróconą etykietę w siatce i pełne dane w podglądzie. Pełny ekran jest trybem układu strony, nie ukrywa interfejsu samej przeglądarki.

To symulacja w pamięci przeglądarki: odświeżenie usuwa zmiany. Nie ma backendu, logowania ani wysyłki wiadomości. Przenoszenie planowanych odcinków pozostaje propozycją rozszerzenia A-01, nie implementacją produkcyjnego modelu przemieszczeń. Godziny nieokreślone na PNG przyjęto przykładowo jako przyjazd 14:00 i odbiór 10:00; Luna i Mela przyjeżdżają o 09:00.

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
