# Kalendarz — panel administratora

Aktualizacja: 14 września 2026. [Samodzielna makieta HTML](mockup-kalendarz.html) zawiera style, fonty, przykładowe dane i skrypty; działa bez backendu. Zmiany w pamięci znikają po odświeżeniu.

## Podgląd i narzędzia

Do pracy w Chrome uruchom z katalogu repozytorium:

    node mockups/admin/kalendarz/preview-server.cjs

Podgląd: [Kalendarz na localhost](http://127.0.0.1:8765/admin/kalendarz/mockup-kalendarz.html). Serwer słucha wyłącznie na 127.0.0.1:8765 i udostępnia katalog mockups. Zatrzymanie: Ctrl+C. Nie wymaga zmiany ustawień bezpieczeństwa przeglądarki. Przy ponownym uruchomieniu najpierw sprawdź, czy podgląd już działa.

Przy pracy narzędziowej sprawdź dostępne przeglądarki i połączenie rozszerzenia Chrome. Dostęp do plików file:// może podlegać ograniczeniom danego narzędzia; standardowym środowiskiem testowania rozwijanej makiety jest lokalny HTTP. Nie wyłączać zabezpieczeń.

## Co działa

- Domyślnie 14 dni od wczoraj względem przykładowego 9 września 2026. Zakres 7/14/30, dwudniowe zazębienie, Dzisiaj i wybór konkretnej daty początku.
- Dwie orientacje: dni w wierszach (domyślna) lub kolumnach. Przypięte osie, osobne pasy nakładających się pobytów i pełny ekran.
- Filtry lokalizacji/statusów ukrywają karty. Wyszukiwanie wyróżnia i przygasza, obejmuje kolejkę, automatycznie ją rozwija przy dopasowaniu i pokazuje liczbę unikalnych kotów lub brak dopasowań.
- Podgląd pobytu pokazuje saldo całej rezerwacji i link do pełnej karty. Numer rezerwacji jest tylko drugorzędnym szczegółem tej pełnej karty.
- Pełnoekranowa karta rezerwacji: termin, koty i rozmieszczenie, kontakt, rozliczenie, notatka i historia zmian. Edycja terminu aktualizuje wszystkich kotów, skrajne odcinki, cenę i ostrzeżenia. Minimum 2 dni jako różnica dat. Obsługa aktywacji z kontrolą pełnego planu, przyjęcia i zakończenia.
- Klikalne karty lokalizacji wybierają odcinki do wspólnego przeniesienia. Można dołączyć koty tej samej rezerwacji. Po zapisie stykające się odcinki tego samego kota i boksu scalają się; niezaznaczone fragmenty pozostają bez zmian.
- Przenoszenie formularzem, nagłówkiem boksu lub przeciąganiem. Zapis jawny, terminy zachowane. Część pojedynczego odcinka ma daty i pełne godziny. Nie ma powrotu do stanu bez boksu.
- Kolejka oznacza całe pobyty kotów jeszcze bez planu. Przypisanie pojedyncze lub wspólne. Wspólny dom to rezerwacja, nie nazwisko właściciela.
- Ostrzeżenia o różnych domach wynikają z przecinających się terminów, uwzględniają ukryte filtrem przypisania i nie blokują zapisu. Nie ma obowiązkowego bufora.
- Ochrona niezapisanych zmian przy zamknięciu, Esc, innej karcie i nawigacji. Jawne odrzucenie albo powrót do edycji.

## Scenariusze makiety

Rozwiń „Scenariusze makiety” w lewym dolnym rogu. Wybór „Najbliższy zapis” pozwala sprawdzić sukces, błąd połączenia, zmianę innego administratora, niepewny wynik i wygasłą sesję. Po błędzie pola pozostają; niepewny wynik wymaga sprawdzenia stanu. Wygasła sesja jest symulacją, bez prawdziwego logowania.

„Podzielony pobyt” przygotowuje trzy odcinki Luny. Wybierz karty Box 2 i Box 3, opcjonalnie Melę, następnie Przenieś kota → wybierz cel → Zapisz. Powstaje jeden odcinek Luny i osobny odcinek Meli. „Pobyt 2 dni” przygotowuje Miszę 9–11 września. „Ładowanie” i „Błąd odświeżenia” pokazują stany odczytu.

Pełna karta ma adres np. [rezerwacja Luny i Meli](mockup-kalendarz.html#rezerwacja/dom-luny). Działa bezpośrednie wejście i Wstecz. Docelowy router ma obsłużyć /admin/reservations/[id] z różnych ekranów; pozostałe makiety nie są jeszcze zintegrowane z nową kartą.

## Źródła i weryfikacja

Nowe operacje są w calendar-workflows.js i osadzane w HTML poleceniem:

    node mockups/admin/kalendarz/build-mockup.cjs

Po edycji skryptu należy przebudować HTML. Reszta siatki i stylów pozostaje w HTML. Zgodność osadzonego źródła i testy rzeczywistych funkcji planu:

    node mockups/admin/kalendarz/check-workflows.cjs

Testy obejmują scalanie całego planu, rozłączne zaznaczenia, wybór boksu źródłowego dla grupy, niepoprawny zakres, pełny plan wszystkich kotów, zmianę terminu oraz nieaktualną wersję. Interakcje, komunikaty, układ i popover sprawdzono osobno przez połączone Chrome.

Starsze check-*.cjs zachowują scenariusze siatki/osi/zoomu, lecz część zakładała synchroniczny zapis i zamknięcie bez ochrony zmian. Nie traktować ich jako kompletnego odbioru nowego workflow. Aktualne reguły odbioru są w kontrakcie.

## Granice i dokumentacja

Jest to makieta w pamięci, nie produkcyjny backend, audyt ani obsługa wielu sesji. Konflikty i wyniki sieci są symulowane. Pełna karta demonstruje edycję terminu/notatki/statusu; edycja wpłat i wysyłanie wiadomości wymagają dalszych ekranów.

Daty przykładowe stanowią współrzędne lokalnego czasu na równej osi dni; produkcyjna obsługa Europe/Warsaw i DST jest opisana w kontrakcie. Przeniesienie zachowuje pełną precyzję danych, UI upraszcza wybór do godzin.

Priorytetem jest kompaktowy desktop i zoom 150%. Specjalizowany wariant mobilny admina jest odłożony. Zachowane przewijanie wąskiej siatki nie oznacza zakończenia prac mobilnych.

Wiążące źródła: [kontrakt kalendarza](../../../docs/kalendarz-kontrakt.md), [design admina](../../../docs/design-panel-administracyjny.md), [specyfikacja techniczna](../../../docs/specyfikacja-techniczna.md), [dokumentacja biznesowa](../../../docs/dokumentacja-biznesowa.md).

## Archiwalne podglądy

Istniejące PNG kalendarz-html-*.png oraz katalogi v1–v4 przedstawiają wcześniejsze iteracje. Nie odzwierciedlają nowych funkcji z 14 września. Prompty i obrazy pozostają materiałem historycznym; aktualnym źródłem jest HTML.
