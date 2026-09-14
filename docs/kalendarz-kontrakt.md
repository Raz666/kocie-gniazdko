# Kalendarz i rozmieszczenie — kontrakt działania

Ustalenia z 14 września 2026. Dokument normatywny, wspólny dla [biznesu](dokumentacja-biznesowa.md), [techniki](specyfikacja-techniczna.md) i [designu admina](design-panel-administracyjny.md). Zastępuje wcześniejsze otwarte założenia A-01 i dotyczące rozmieszczenia A-07. Źródłem interakcji jest aktualna makieta HTML, nie archiwalne PNG.

## 1. Jeden edytowalny plan

Plan jest przyjmowany jako rozmieszczenie. Nie ma osobnego potwierdzania wykonania ruchu, listy niewykonanych przemieszczeń ani niezależnego rejestru fizycznego położenia. Administrator może poprawiać również przeszłe odcinki. Audyt zachowuje zapis zmian danych, nie jest raportem faktycznych ruchów.

Karta kalendarza oznacza odcinek pobytu jednego kota w jednym boksie. Status i rozliczenie pochodzą z rezerwacji. Jeden kot może mieć wiele kart; liczników kotów i rezerwacji nie wolno liczyć po liczbie odcinków.

„Wspólny dom” oznacza dokładnie jedną rezerwację: porównanie reservation_id. Rezerwacje nigdy się nie łączą, również przy identycznym kliencie lub nazwisku. Numer rezerwacji nie występuje w kartach ani panelu bocznym kalendarza; może być drugorzędną informacją w pełnej karcie rezerwacji.

## 2. Ciągłość i aktywacja

- Kot z nowego zgłoszenia może nie mieć żadnego planu. Wtedy cały jego pobyt jest w kolejce bez boksu.
- Pierwsze przypisanie obejmuje cały pobyt kota. Nie ma częściowego braku boksu.
- Po przypisaniu odcinki dokładnie pokrywają cały pobyt: bez luk, bez nakładania odcinków tego samego kota, dodatniej długości, w granicach rezerwacji.
- Przed aktywacją wszystkie koty muszą mieć pełne pokrycie pobytu w aktywnych boksach aktywnych lokalizacji. Sam wpis w reservation_boxes nie wystarcza.
- Po przypisaniu można zmieniać boksy i zakresy, ale nie usuwać rozmieszczenia ani cofać kota do kolejki.
- Zapis automatycznie synchronizuje zbiór boksów rezerwacji z jej odcinkami. Administrator nie wykonuje osobnego „dodania boksu do rezerwacji” ani „usunięcia boksu”.
- Liczba kotów w boksie i współdzielenie przez różne rezerwacje nie są ograniczone.

## 3. Czas i minimalny pobyt

Biznesowa strefa to Europe/Warsaw. Dane zachowują pełną datę i czas; formularze upraszczają wybór do pełnych godzin 00:00–23:00. Zmiana boksu bez zmiany terminu nie zaokrągla istniejących minut.

Wymagane są daty i godziny przyjazdu oraz odbioru. Godzina przyjazdu nie jest już opcjonalna. Wymagalność odbioru przyjęto jako spójne dopełnienie dokładnego końca każdego pobytu.

Minimum 2 dni oznacza calendarDateDifference(departureDate, arrivalDate) >= 2, np. 12–14 września. Nie oznacza 48 godzin. Cena nadal wynika z różnicy dat, bez mnożnika liczby kotów. Minimum dotyczy całego pobytu; pojedynczy odcinek rozmieszczenia może być krótszy.

Przedziały mają postać [od, do). Koniec jednego i początek drugiego w tym samym momencie nie powodują nakładania. Nie ma obowiązkowych buforów między pobytami.

W implementacji produkcyjnej czas jest serializowany jako ISO 8601 z offsetem właściwym dla Europe/Warsaw; porównania odbywają się na momentach czasu. Dni osi tworzy się według lokalnego kalendarza, nie przez dodawanie 86 400 000 ms. Dla nieistniejącej godziny podczas zmiany czasu pokazać błąd; dla godziny dwuznacznej wymagać wskazania wystąpienia (np. 02:00, czas letni / zimowy). To wyjątkowa kontrolka, nie stałe pole minut.

## 4. Wybór i przenoszenie odcinków

Kliknięcie dowolnej karty otwiera wszystkie lokalizacje pobytu tego kota. Karty lokalizacji są przełącznikami z widocznym zaznaczeniem. Kliknięty odcinek jest kotwicą wyboru; można dołączyć inne odcinki i koty tej samej rezerwacji.

Przeniesienie zaznaczonych odcinków zachowuje ich daty i dotyczy jednego celu. Dla pojedynczego odcinka dostępna jest także „Część pobytu” z datą/godziną od–do. Przy wielu odcinkach tego samego kota przenoszone są ich pełne przedziały. Wybranie odcinków rozłącznych nie wypełnia przestrzeni między nimi i nie przenosi niezaznaczonego fragmentu.

Po zapisie scalać odcinki tylko, gdy mają tę samą rezerwację, kota i boks, a koniec poprzedniego równa się początkowi następnego. Zaznaczenie wszystkich odcinków i przeniesienie ich do jednego boksu daje jeden połączony pobyt.

Przeciąganie zmienia wyłącznie boks. Upuszczenie tworzy propozycję; zapis jest jawny. Propozycję można przeciągać ponownie i zmieniać cel formularzem lub nagłówkiem boksu. Cel równy źródłu jest wyłączony tylko, gdy wszystkie wybrane odcinki są już w tym boksie.

Nie dodawać osobnego podsumowania powtarzającego dane widoczne na kalendarzu. Wspólne operacje nie mogą objąć innej rezerwacji, nawet po zmianie filtrów.

## 5. Widok, filtry i wyszukiwanie

Domyślnie 14 dni od wczoraj; opcje 7 / 14 / 30. Poprzedni/następny okres przesuwa o liczbaDni - 2. „Dzisiaj” wraca do wczoraj jako początku. Wybór daty ustawia tę datę jako początek okresu, zachowując długość.

Domyślna orientacja to dni w wierszach, boksy w kolumnach. Można zamienić osie. Zmiana orientacji zachowuje dane, okres, filtry i propozycję; resetuje przewinięcie siatki. Osie są przypięte, nakładające się odcinki mają odrębne pasy.

Kalendarz pokazuje NEW, ACTIVE, CHECKED_IN oraz aktywne boksy i lokalizacje. Wszystkie trzy statusy są początkowo włączone. Archiwum i nieaktywne boksy są dostępne na liście Rezerwacje i w eksporcie; nie dodajemy ich jako wariantu tego kalendarza.

Filtry rzeczywiście ukrywają elementy. Wyszukiwanie po kocie/właścicielu wyróżnia dopasowania i przygasza pozostałe. Dotyczy siatki i kolejki. Dopasowanie w kolejce automatycznie ją rozwija i oznacza wynik. Wyszukiwanie nie przełącza samoczynnie statusów, lokalizacji ani okresu.

Licznik pokazuje unikalne koty pasujące w bieżącym okresie i filtrach, z liczbą w kolejce; osobno może wskazać dopasowania ukryte filtrami. Brak dopasowań ma własny komunikat. Bez zapytania licznik wyników znika. Kolejka nie ma jeszcze lokalizacji i pozostaje dostępna niezależnie od filtra lokalizacji; podlega okresowi i statusom. Licznik domów liczy rezerwacje.

## 6. Ostrzeżenia

Współdzielenie boksu jest oceniane po rzeczywistym przecięciu przedziałów. Domy porównuje się po reservation_id. Wspólny dom otrzymuje ikonę, różne domy pomarańczowe ostrzeżenie. Ostrzeżenie nie blokuje zapisu.

Obliczenia korzystają także z przypisań ukrytych filtrami lub przygaszonych wyszukiwaniem. Wybór celu i podgląd zmiany terminu uwzględniają cały zmieniany zakres, również poza aktualnym oknem siatki. Rezerwacje terminalne nie są operacyjnymi przeszkodami.

## 7. Pełna karta rezerwacji i termin

Panel pobytu pokazuje saldo całej rezerwacji w sekcji Pobyt, pod Odbiorem: „Do zapłaty”, przy zerze „Opłacona”, przy nadpłacie „Nadpłata”. Nad sekcją Pobyt znajduje się secondary button „Pełna karta rezerwacji”. Karta jest pełnoekranowym popoverem/dialogiem z własnym przewijaniem i przypiętymi akcjami. Docelowy URL: /admin/reservations/[id]. Ten sam ekran otwiera się z Kalendarza, Dzisiaj i listy Rezerwacje; bez kontekstu jest samodzielnym ekranem. Powrót przywraca okres, filtry, scroll i fokus źródła. Obsłużyć odświeżenie, bezpośredni link i Wstecz.

Karta zawiera kontakt, dane opiekuńcze, termin, odcinki, rozliczenie, notatki i historie wymagane przez design. Kod jest drugorzędnym szczegółem. Zmiana terminu obejmuje wszystkie koty tej rezerwacji.

Reguła dostosowania odcinków przy zapisie terminu:

1. Odcinki wewnątrz nowego zakresu pozostają na swoich datach.
2. Skrócenie przycina skrajne odcinki i usuwa fragmenty wyłącznie spoza nowego pobytu.
3. Wydłużenie przed przyjazdem wydłuża pierwszy odcinek; po odbiorze — ostatni.
4. Jeśli nowy zakres jest całkowicie wcześniejszy/późniejszy od starego, cały nowy pobyt przejmuje pierwszy/ostatni boks.
5. Kot bez planu nadal ma cały nowy pobyt bez boksu. Nie tworzyć częściowej luki.
6. Przeliczyć cenę automatyczną i zachować ręczną cenę końcową zgodnie z regułami cen.
7. Pokazać nakładania przed zapisem i odświeżyć karty oraz ostrzeżenia po zapisie.

Skrócenie może wyeliminować wybrany odcinek, ale nie jest operacją „usuń przypisanie” i nie tworzy braku boksu w pozostałym pobycie.

## 8. Statusy i wyłączanie boksów

Przyjęcie do hotelu zmienia status, nie tworzy osobnego ruchu. Zakończenie, anulowanie i odrzucenie usuwają rezerwację z operacyjnego kalendarza; zachowują odcinki i audyt w szczegółach/eksporcie. Nie dopisywać fikcyjnego ruchu o chwili zakończenia.

Nie wyłączać boksu ani lokalizacji, jeśli odcinki operacyjnych rezerwacji nadal ich używają. Najpierw administrator przenosi wskazane odcinki; nie ma automatycznej relokacji ani ukrycia aktywnego planu. Historia rezerwacji terminalnych nie blokuje wyłączenia. Korekty przeszłych danych są możliwe przez szczegóły, z audytem.

## 9. Bezpieczny zapis i komunikaty

Każda mutacja ma walidację serwerową, wersję rezerwacji, klucz idempotencji oraz atomowy zapis planu, zbioru boksów, ceny (jeśli zmienia się termin) i audytu.

- Podczas zapisu widoczne „Zapisywanie…”, zablokowane kolejne mutacje.
- Sukces dopiero po potwierdzeniu serwera.
- Błąd zachowuje propozycję/pola i umożliwia ponowienie.
- Niepewny wynik wymaga sprawdzenia operacji po jej identyfikatorze przed ponowieniem; ponowienie używa tego samego klucza.
- Nieaktualna wersja odrzuca całą grupę; komunikat wskazuje autora zmiany i umożliwia wczytanie aktualnego stanu oraz ponowną edycję. Nie nadpisywać automatycznie cudzych zmian.
- Wygasła sesja zachowuje robocze dane w pamięci; po uwierzytelnieniu ponownie sprawdzić wersję.
- Błąd odświeżenia pozostawia oznaczone nieaktualne dane, blokuje mutacje i udostępnia ponowienie odczytu.
- Zamknięcie, Esc, inna karta, nawigacja i Wstecz przy niezapisanych zmianach oferują „Wróć do edycji” / „Odrzuć zmiany”. Zmiana orientacji, daty widoku i filtrów zachowuje propozycję.

Audyt obejmuje autora, moment, rezerwację, kota/odcinki, wartości przed/po i identyfikator operacji. Edycja przeszłości zmienia bieżący plan, lecz nie usuwa wcześniejszych wpisów audytu.

## 10. Desktop i etap mobilny

Wszystkie ekrany admina sprawdzamy na ekranie 1920×1080 przy zoomie 150%, dbając o czytelność i wykorzystanie całej dostępnej przestrzeni. Priorytetem jest kompaktowy desktop. Kalendarz używa tekstu bazowego 14 px, imion 16 px, właścicieli 13 px, opisów 11 px i kontrolek 34 px. Szczegóły przewijają się niezależnie; Zapisz/Anuluj są przypięte.

Specjalizowany mobilny panel, dolna nawigacja i widok listowy Boksy/Dni są odłożone na późniejszy etap. Obecna macierz może się przewijać na wąskim ekranie. Klawiatura, widoczny fokus, etykiety i alternatywa dla przeciągania nadal obowiązują.

## 11. Odbiór i testy

- Podział jednego pobytu, wybór kilku odcinków, wspólne przeniesienie i scalenie; niezaznaczony środkowy odcinek pozostaje bez zmian.
- Wybór odcinków i towarzyszących kotów tej samej rezerwacji; obca rezerwacja tego samego klienta nie dołącza.
- Brak luk i nakładania dla jednego kota po każdej mutacji; pierwszy przydział obejmuje cały pobyt.
- Pełny plan wszystkich kotów przed aktywacją; częściowo przypisane zgłoszenie nadal nie może być aktywowane.
- Granica [od, do), pełne godziny UI, zachowanie minut przy przenoszeniu, oba przejścia DST, minimum 2 dni.
- Wyszukiwanie kolejki, automatyczne rozwinięcie, licznik bez wielokrotnego liczenia odcinków, brak dopasowań i filtry.
- Ostrzeżenie przy różnych rezerwacjach mimo ukrycia filtrami i przy wydłużeniu terminu.
- Skrócenie/wydłużenie/przesunięcie terminu, kompletność planu i zachowanie ręcznej ceny.
- Atomowość całej grupy, błędy, konflikt dwóch administratorów, niepewny wynik, idempotencja, wygaśnięcie sesji, audyt.
- Popover: link bezpośredni, Wstecz, odświeżenie, fokus, zachowanie kontekstu i ochrona niezapisanych zmian.

## 12. Granice makiety

HTML jest samodzielną symulacją. Zapisy i wersje są w pamięci jednej strony; po odświeżeniu wracają dane przykładowe. Scenariusze błędów symulują backend i drugiego administratora, nie udają produkcyjnego logowania ani współpracy między sesjami.

Popover używa adresu #rezerwacja/[id]; docelowy router ma realizować URL z sekcji 7. Kontakt i finansowe dane przykładowe służą prezentacji. Pozostałe operacje pełnej karty, takie jak edycja wpłat lub wysyłanie wiadomości, wymagają dalszych makiet.

Współrzędne demonstracyjnej siatki kodują lokalne daty i godziny na osi o równych dniach; nie są produkcyjną serializacją momentów. Implementacja backendu i osi dla zmiany czasu musi spełniać sekcję 3.

### Doprecyzowanie interakcji — 15 września 2026

- Datę początku wybiera się przez przycisk „Od” z ikoną kalendarza otwierający picker. Strzałki poprzedniego i następnego okresu mają szerokość 28 px; także październikowy zakres mieści się w jednym wierszu.
- Licznik wyszukiwania znajduje się bezpośrednio obok pola wyszukiwania. W kolejce dopasowanie obrysowuje kartę rezerwacji bez zmiany tła; obrys kota występuje tylko przy dopasowaniu jego imienia. Przygaszane są całe niedopasowane karty rezerwacji.
- Jasnozielony obrys siatki oznacza wynik wyszukiwania. Ciemny obrys jest zarezerwowany dla aktualnie wybranego pobytu.
- Anuluj świadomie odrzuca edycję bez pytania o niezapisane zmiany. Ochrona pozostaje przy przypadkowym opuszczeniu edycji (inna karta, zamknięcie, Esc, nawigacja). Trwający lub niepewny zapis nadal wymaga ustalenia wyniku.
- Wybór boksu docelowego nie przewija dodatkowo siatki do propozycji.
- Propozycja i cień w pierwotnym miejscu zachowują odcień statusu pobytu; cień ma gradient w tym odcieniu. Badge „Propozycja” ma ziemną zieleń CTA i biały tekst.
