# Kocie Gniazdko 2.0 — design panelu administracyjnego

> Baza projektowa do makiet i implementacji UI. Aktualizacja: 8 września 2026.
> Zakres: prywatny panel, codzienna obsługa pobytów, dane, treści strony i ustawienia.

## 1. Rola dokumentu i granice zakresu

Dokument opisuje hierarchię ekranów, komponenty, język wizualny oraz zachowania potrzebne do pracy na komputerze i telefonie. Stanowi bazę do projektowania wraz z:

- [Dokumentacją biznesową](dokumentacja-biznesowa.md) — cele, zadania administratora i zakres systemu.
- [Specyfikacją techniczną](specyfikacja-techniczna.md) — statusy, model danych, reguły operacji i integracje.
- [Designem strony publicznej](design-kocie-gniazdko.md) — wspólne tokeny marki w sekcji 3 i zasady komponentów w sekcji 4.

Opisy ekranów wyznaczają **wariant bazowy zgodny z obecną specyfikacją**. Propozycje wymagające rozszerzenia modelu lub zmiany procesu są zachowane w sekcji 14. Nie implementować ich jako domyślnego zachowania na podstawie samej makiety. Ścieżki ekranów są koncepcyjne, poza ustalonym prefiksem `/admin`.

Pierwotny brief zawierał kierunki: dolna nawigacja mobilna, czytelność przy standardowym powiększeniu, perspektywa siedmiu dni, przenoszenie całego lub części pobytu i podgląd wiadomości przed wysyłką. Zachowujemy te kierunki, rozdzielając decyzje prezentacyjne od zmian wymagających ustaleń domenowych. Nie zakładamy dodatkowych ról administratora ani uprawnień, których dokumentacja jeszcze nie definiuje.

Dane osobowe, kwoty, daty i numery w przykładach są fikcyjne. W makietach używać jednego spójnego zestawu danych, aby przejścia między ekranami można było zweryfikować.

## 2. Cel i język wizualny panelu

Administrator ma szybko zobaczyć dzisiejsze zadania, obsłużyć zgłoszenie, sprawdzić informacje opiekuńcze, przypisać boks i rozliczyć pobyt. Na ekranie pierwszeństwo mają termin, koty, stan obsługi i następna dostępna akcja.

Panel korzysta z kremu, zieleni i ciepłego brązu marki. Logo pojawia się w ramie i logowaniu; wnętrze jest spokojne, czytelne i oszczędne w dekoracjach. Bez fotografii hero, ornamentalnych separatorów i ozdobnej typografii w danych operacyjnych. Kolor wyróżnia działania i stany; zwykłe dane pozostają neutralne.

### 2.1. Typografia i gęstość

**Source Sans 3** we wszystkich nagłówkach, tabelach, polach i przyciskach. Alegreya pozostaje krojem nagłówków strony publicznej. Liczby w kwotach, datach i godzinach używają cyfr tabelarycznych; kwoty w tabeli wyrównujemy do prawej.

| Element | Telefon | Desktop |
| --- | --- | --- |
| H1 | 26 px / 1,2 | 32 px / 1,2 |
| H2 | 22 px / 1,3 | 24 px / 1,3 |
| Tekst podstawowy | 16–17 px / 1,5 | 18 px / 1,5 |
| Tabele i pola | 16 px / 1,45 | 16–17 px / 1,45 |
| Tekst pomocniczy | 14–15 px / 1,45 | 15–16 px / 1,45 |
| Przyciski | 16 px, waga 600 | 17 px, waga 600 |

Wysokość wiersza tabeli min. 56 px, bez stałego ograniczenia przy zawijaniu treści. Pola 52 px, cele dotykowe min. 48 × 48 px. Nie zmniejszać tekstu, aby zmieścić dodatkowe kolumny. Na dużym ekranie panel musi być wygodny przy 100% powiększenia; równocześnie obsługuje powiększenie tekstu i mniejsze szerokości.

### 2.2. Siatka i powierzchnie

Wspólna skala odstępów: 4, 8, 12, 16, 24, 32, 48 px. W panelu odstępy między sekcjami wynoszą zwykle 24–32 px, wewnątrz grupy 12–16 px. Karty mają promień 12 px, kontrolki 12 px, dialogi 16 px. Powierzchnie `surface.page`, `surface.subtle` i `surface.raised` pochodzą ze wspólnych tokenów.

Desktop od 1024 px: sidebar 248 px i obszar pracy z paddingiem 24–32 px. Tabele i kalendarz mogą wykorzystywać dostępną szerokość; szczegóły zwykle do 1280 px, długie formularze do 760 px. Dwie kolumny szczegółów dopiero, gdy obie pozostają czytelne, zwykle od około 1200 px.

Poniżej 1024 px: zwarta rama i dolna nawigacja. Na telefonie padding 16 px, tabele zastępowane kartami, jedna kolumna. Próg zamiany tabeli na karty może wypaść wcześniej, jeśli jej treść się nie mieści. Referencyjne makiety: 390 i 1440 px; sprawdzenia także przy 320, 768 i 1024 px.

### 2.3. Statusy rezerwacji

Używać małych etykiet z pełną nazwą; barwy są dodatkową informacją. Nie kolorować całych wierszy na intensywne kolory. Nowe zgłoszenie może dodatkowo otrzymać subtelny żółty pasek. Ikony są opcjonalnym uzupełnieniem etykiety.

| Kod | Etykieta | Tekst / tło | Rola |
| --- | --- | --- | --- |
| `NEW` | Nowa | `#805D12` / `#FFF4CC` | Żółte oznaczenie wymagane przez dokumentację |
| `ACTIVE` | Aktywna | `#526F22` / `#EDF3E3` | Pobyt potwierdzony |
| `CHECKED_IN` | W hotelu | `#285D7A` / `#E8F2F8` | Trwający pobyt |
| `COMPLETED` | Zakończona | `#756C63` / `#F6F3EA` | Pobyt zakończony; opcjonalna ikona zatwierdzenia |
| `REJECTED` | Odrzucona | `#9B3A2E` / `#FCEBE7` | Zgłoszenie nieprzyjęte |
| `CANCELLED` | Anulowana | `#44372C` / `#E7E2DC` | Zgłoszenie lub rezerwacja anulowane |

Nadać tym parom role `reservation.new`, `.active`, `.checked-in`, `.completed`, `.rejected`, `.cancelled`. Nie używać samej zieleni do jednoczesnego oznaczenia stanu pobytu i rozliczenia bez odpowiednich etykiet.

### 2.4. Rozliczenie jako osobna informacja

Rozliczenie nie jest statusem rezerwacji. W szczegółach ma własną sekcję, a na liście nazwę i kwotę. Przyjmujemy poniższą kolejność interpretacji, aby poprawnie obsłużyć cenę końcową 0 zł.

| Warunek | Etykieta i kwota | Wygląd |
| --- | --- | --- |
| Wpłaty = cena końcowa | Rozliczona | Zielona para jak `feedback.success`, również przy 0 zł = 0 zł |
| Wpłaty > cena końcowa | Nadpłata · X zł | Tekst `#68458A`, tło `#F1EBF7` |
| 0 < wpłaty < cena końcowa | Częściowo opłacona · pozostało X zł | Tekst `#805D12`, tło `#FFF4CC` |
| Wpłaty = 0 i cena końcowa > 0 | Brak wpłat · pozostało X zł | Neutralny tekst; ostrzeżenie tylko w uzasadnionym kontekście zadania |

Brak wpłat przed pobytem nie oznacza automatycznie zaległości — specyfikacja nie definiuje terminu wymagalności. Nie dodawać etykiety „Przeterminowana”. Nadpłatę prezentować dodatnią kwotą z opisem, zamiast samego ujemnego salda.

## 3. Nawigacja i wspólna rama

### Desktop

Sidebar ma następującą kolejność i grupy. Dłuższa nawigacja przewija się we własnym obszarze; profil i wylogowanie pozostają osiągalne również na niskim ekranie.

| Grupa | Pozycje |
| --- | --- |
| Operacje | Dzisiaj, Kalendarz, Rezerwacje |
| Baza | Klienci, Koty, Płatności |
| Organizacja | Cennik, Lokalizacje i boksy, Szablony e-mail |
| Strona WWW | Treści, FAQ, Galeria, Komunikaty |
| Dane | Eksporty, Dziennik zmian |
| System | Ustawienia, dane zalogowanego administratora, Wyloguj |

Przy Rezerwacjach można pokazać żółty licznik `NEW`. Aktywna pozycja ma tło `surface.selected`, tekst i dodatkowy znacznik. Tytuł ekranu, kontekst lub powrót oraz główna akcja tworzą wspólny nagłówek obszaru pracy.

### Telefon i tablet w zwartej ramie

Dolna nawigacja: **Dzisiaj · Kalendarz · Rezerwacje · Klienci · Więcej**. Ikona zawsze z etykietą. Więcej otwiera pełnoekranowe menu ze wszystkimi pozostałymi pozycjami, w tym podsekcjami CMS i wylogowaniem. Aktywny stan Więcej wskazuje, że otwarty ekran należy do tej grupy.

Nie nakładać na siebie dolnej nawigacji i kilku pasków działań. W zwykłym widoku pozostaje nawigacja; akcje są w treści lub w jednym dodatkowym pasku z zarezerwowanym miejscem. Pełnoekranowa edycja na telefonie zastępuje dolną nawigację własnymi Anuluj / Zapisz. Otwarcie klawiatury nie może zasłaniać pola ani jego błędu.

## 4. Wspólne wzorce interakcji

- **Lista:** tytuł, wyszukiwanie, filtry, liczba wyników, tabela lub karty, stronicowanie. Zachować filtry i pozycję po powrocie ze szczegółów. Pokazać różnicę między brakiem danych a brakiem wyników wyszukiwania.
- **Wiersz/karta:** wyraźny link do szczegółów, np. kod rezerwacji lub Otwórz. Kliknięcie tła może być skrótem, ale link pozostaje dostępny klawiaturą. Nie zagnieżdżać przycisków w jednym rozciągniętym linku.
- **Krótka edycja:** panel boczny do około 480–560 px na desktopie; na telefonie dialog pełnoekranowy przy dłuższym formularzu. Jedna warstwa edycji naraz, bez kaskady modali.
- **Duża edycja:** osobna strona dla profilu, treści CMS i dużych zbiorów danych. Zapis jawny, z widocznym stanem niezapisanych zmian.
- **Operacja istotna:** potwierdzenie wskazuje obiekt, wartości przed/po i skutek, np. „Anulować rezerwację KG-X42P na 6–12 września dla Luny i Meli?”. Potwierdzenia nie dodajemy do zwykłego otwierania, filtrowania czy przechodzenia między widokami.
- **Wynik zapisu:** komunikat tekstowy i aktualizacja danych dopiero po potwierdzeniu operacji. Błąd zachowuje wpisane wartości. Przy niepewnym wyniku odświeżyć stan, zanim UI zaproponuje ponowienie zmiany lub wpłaty.
- **Nieaktualne dane:** jeśli serwer odrzuci akcję, bo ktoś wcześniej zmienił status lub przypisanie, pokazać aktualny stan i wyjaśnienie. Nie sugerować sukcesu przez samą animację.
- **Dostępność:** wspólne wymagania kontrastu i fokusu z dokumentu publicznego; etykiety pól, podsumowanie błędów, klawiatura, powrót fokusu po zamknięciu dialogu. Przeciąganie zawsze ma alternatywę w przyciskach.

Każdy wzorzec ma makietę ładowania, błędu, pustego wyniku i sukcesu. Dane operacyjne po błędzie odświeżenia pozostają wyraźnie oznaczone jako nieaktualne; brak odpowiedzi nie może wyglądać jak brak rezerwacji.

## 5. Dzisiaj — centrum codziennej pracy

Ekran `/admin` odpowiada na pytanie, jakie działania trzeba wykonać w bieżącym dniu. Nagłówek zawiera pełną datę według Europe/Warsaw. Dominują listy zdarzeń i spraw; liczniki pełnią rolę skrótów do danych.

| Moduł, w kolejności czytania | Zawartość i akcje |
| --- | --- |
| Dzisiejszy harmonogram | Przyjazdy i odbiory według preferowanej godziny: typ zdarzenia, klient, koty, boksy, status, rozliczenie i Otwórz; akcja Przyjmij / Zakończ pobyt tylko dla właściwego statusu |
| Oczekują na aktywację | Zgłoszenia `NEW`: kod, termin, klient, koty, czas od zgłoszenia i przypisane boksy lub Brak boksu; Obsłuż zgłoszenie |
| W hotelu | Liczba trwających pobytów `CHECKED_IN`, z czytelnie opisaną jednostką, i wejście do ich listy |
| Najbliższe 7 dni | Skrót przyjazdów i odbiorów na jutro i sześć kolejnych dni, z wejściem do kalendarza |
| Wymaga uwagi | Konkretne sprawy i przyczyna: np. nowe zgłoszenie bez boksu, przekroczona data planowanego odbioru, błąd wysyłki; stan pomocniczy, nie nowy status |
| Nierozliczone | Rezerwacje z pozostałą kwotą, z datą i statusem umożliwiającymi ocenę kontekstu |

Na desktopie harmonogram ma pełną szerokość; oczekujące i W hotelu mogą stać obok siebie. Na telefonie zachować wszystkie moduły w jednej kolumnie. Skrót siedmiu dni może przewijać się poziomo, z nazwą dnia i datą.

Brak godziny pokazać jako „Godzina niepodana”, w oddzielnej grupie po zdarzeniach z godziną. Terminy `NEW` nie są potwierdzonymi przyjazdami; pozostają w oczekujących. Dla dzisiejszych zdarzeń już wykonanych pokazać stan Przyjęto / Pobyt zakończony, bez ponownej akcji. Definicje grup pomocniczych są odczytem istniejących danych i wymagają wspólnych filtrów z listą — szczegóły w sekcji 14.

## 6. Rezerwacje — lista i szczegóły

### 6.1. Lista `/admin/reservations`

Nad wynikami: wyszukiwanie po kodzie, kliencie, kocie, telefonie i e-mailu; przełącznik Bieżące i przyszłe / Archiwum; filtry statusu, terminu i rozliczenia; Eksportuj.

Bieżące obejmują `NEW`, `ACTIVE`, `CHECKED_IN`, również rekordy z minioną planowaną datą, jeśli sprawy nie zamknięto. Archiwum obejmuje `COMPLETED`, `REJECTED`, `CANCELLED`. Nie ukrywać niezakończonej sprawy tylko dlatego, że minął jej termin.

Tabela desktopowa: Termin, Rezerwacja, Klient / koty, Status, Boksy, Cena końcowa, Rozliczenie. Podstawowy porządek według daty przyjazdu; nowe zgłoszenia mają dedykowany filtr i kolejkę na Dzisiaj. Kwoty wyrównane do prawej, statusy z pełną nazwą, daty z rokiem tam, gdzie potrzebny.

Karta mobilna: status i kod → termin → koty i klient → boksy → cena końcowa i rozliczenie → Otwórz. Filtry w osobnym arkuszu z Zastosuj i Wyczyść; nad wynikami widoczna liczba aktywnych filtrów. Długie listy kotów mogą mieć skrót „+3”, pod warunkiem łatwego rozwinięcia pełnej listy.

### 6.2. Karta rezerwacji `/admin/reservations/[id]`

Jedna przewijana karta sprawy, z kotwicami do sekcji. Na desktopie główna kolumna operacyjna i pomocnicza z klientem oraz rozliczeniem; na telefonie jedna kolejność. Historia nie konkuruje z bieżącym zadaniem.

1. Nagłówek: kod, status, koty, klient, daty i preferowane godziny, powrót do listy, właściwa następna akcja.
2. Pobyt i rozmieszczenie: boksy przypisane rezerwacji oraz aktualne rozmieszczenie każdego kota, pokazane osobno.
3. Koty i opieka: żywienie, leki, zdrowie, zachowanie, uwagi; ważne wpisane informacje widoczne bez otwierania pełnego profilu.
4. Rozliczenie: stawka, cena wyliczona, cena końcowa, korekta, wpłaty i saldo.
5. Klient: kontakt, profil i tryb przechowywania danych.
6. Uwagi klienta i uwagi administratora: odrębne, jasno nazwane pola.
7. Komunikacja: notatki kontaktowe i e-maile.
8. Historia statusów oraz historia rozmieszczenia, z datą, autorem i ewentualnym powodem/notatką.

W razie potrzeby sekcje 3–5 mogą zamienić położenie w kolumnach szerokiego ekranu, ale kolejność klawiatury musi być logiczna. Wpisane leki i instrukcje nie mogą zniknąć w obciętym tekście. Puste pole ma etykietę „Nie podano”; „Brak” tylko wtedy, gdy jest faktyczną treścią informacji.

### 6.3. Akcje zależne od statusu

| Stan | Akcja główna | Pozostałe dozwolone przejścia | Warunek i komunikat |
| --- | --- | --- | --- |
| Nowa bez boksu | Przypisz boks | Odrzuć zgłoszenie, Anuluj zgłoszenie | Aktywuj nieaktywne z tekstem: „Aby aktywować rezerwację, przypisz co najmniej jeden boks” |
| Nowa z boksem | Aktywuj rezerwację | Odrzuć zgłoszenie, Anuluj zgłoszenie | Przed zatwierdzeniem pokaż termin, koty, boksy i informację o e-mailu |
| Aktywna | Przyjmij do hotelu | Anuluj rezerwację | Przejście do W hotelu jest świadomą operacją administratora |
| W hotelu | Zakończ pobyt | Brak innych standardowych przejść | Pokaż saldo; nie dodawać blokady zakończenia z powodu braku pełnej wpłaty |
| Zakończona / Odrzucona / Anulowana | Otwórz potrzebną sekcję sprawy | Brak | Brak Przywróć, Aktywuj ponownie i dowolnego selecta statusów |

Stan terminalny zamyka workflow statusów; nie oznacza automatycznej blokady całej karty, np. późniejszego uzupełnienia wpłat. Operacje finansowe i inne edycje podlegają regułom serwera. Brak statusu „Do kontaktu” — kontakt opisują notatki i zadania wynikające z danych.

## 7. Boksy, rozmieszczenie i kalendarz

### 7.1. Trzy różne informacje

| Informacja | Co oznacza | Prezentacja bazowa |
| --- | --- | --- |
| Boksy rezerwacji | Zbiór boksów przypisanych całej rezerwacji przez `reservation_boxes` | Lista nazw z lokalizacją i akcjami przypisania/usunięcia |
| Aktualne położenie kota | Aktywny wpis `pet_box_assignments` dla konkretnego kota i rezerwacji | „Teraz: Gniazdko 1 / Box 4” albo „Nie przypisano”; w kontekście trwającego pobytu |
| Historia przemieszczeń | Rzeczywiste zmiany z czasem rozpoczęcia i zakończenia | Chronologiczna lista, opcjonalnie oś czasu z tymi samymi danymi |

Plan przyszłych odcinków pobytu w różnych boksach nie jest historią faktycznych przemieszczeń. Obecny model nie definiuje takiego planu; rozszerzenie A-01 opisuje jego docelowy kierunek. Nie rysować przyszłej części historii jako potwierdzonego rozmieszczenia.

### 7.2. Przypisywanie boksów do rezerwacji

Dialog pokazuje aktualny zbiór boksów i wybór kolejnych, grupowanych według lokalizacji. Nazwa boksu jest globalnie unikalna. Nieaktywne boksy mogą być widoczne w historii, ale nie są celem nowego przypisania.

Zajętość przez inną rezerwację nie blokuje wyboru; dokumentacja nie definiuje pojemności ani wyłączności boksu. UI może pokazać istniejące przypisania jako kontekst, bez etykiety „Konflikt” sugerującej zakaz.

Przy usuwaniu przypisania wyjaśnić ograniczenie: Aktywna i W hotelu muszą zachować przynajmniej jeden aktywny boks. Jeśli w boksie są aktywne przypisania kotów tej rezerwacji, najpierw trzeba je zamknąć lub przenieść koty. Usunięcie przypisania nie usuwa boksu ani historii.

### 7.3. Przenieś kota — operacja bazowa

Akcja dotyczy jednego kota i faktycznej zmiany od chwili zatwierdzenia. Dialog zawiera: kota, rezerwację, obecny boks, docelowy boks i opcjonalną notatkę. Docelowy boks musi być aktywny i przypisany tej rezerwacji. Gdy go brakuje, wskazać Przypisz boks do rezerwacji, zamiast mieszać obie operacje w niezrozumiały zapis.

Potwierdzenie: „Przenieść Lunę z Box 4 do Box 7 teraz?”. Wynik aktualizuje obecne położenie i dopisuje historię. Brak selektora przyszłego zakresu dat w bazowym dialogu. Daty od/do oraz zbiorcze przenoszenie wszystkich kotów należą do rozszerzenia A-01.

Historia ma formę czytelnej listy z pełnymi datami, godziną, boksem i autorem. Oś czasu jest pomocnicza; przedziały otwarte oznaczamy „od …”, a nie przewidywaną datą końca jako faktem historycznym. Kwestia zamykania aktywnych przypisań po zakończeniu pobytu wymaga doprecyzowania — A-07.

### 7.4. Kalendarz `/admin/calendar` — desktop

Schemat relacji czasu, boksu i rezerwacji; bloki pokazują przypisania, a nie rzeczywiste położenie każdego kota:

```text
Kalendarz przypisań       <  Dzisiaj  >       7 / 14 / 30 dni
Lokalizacja: Wszystkie                       Status: Operacyjne

                         6 IX       7 IX       8 IX       9 IX
Gniazdko 1
  Box 1                  [ KG-A · Luna · Aktywna             ]
                         [ KG-B · Mela · Nowa     ]
  Box 2                             [ KG-C · Filemon         ]
Gniazdko 2
  Box 3                  Brak przypisanych rezerwacji

Bez przypisanego boksu    KG-D · 7–9 IX · Mruczek · Nowa
```

Wiersz Box 1 ma dwa pasy, aby obie nakładające się rezerwacje pozostały widoczne. Tekst statusu, kod i szczegóły po otwarciu muszą pozostać dostępne także dla krótkich pasków.

Macierz: czas w kolumnach, boksy w wierszach, grupy według lokalizacji. Sterowanie: poprzedni/następny okres, Dzisiaj, 7 / 14 / 30 dni, filtr lokalizacji i statusu. Domyślnie 7 dni i rezerwacje operacyjne. Lewa kolumna oraz nagłówek dat pozostają widoczne podczas przewijania samego kalendarza.

Pasek reprezentuje **rezerwację przypisaną do boksu w jej terminie**. Nie oznacza, że każdy wymieniony kot faktycznie przebywa w tym boksie przez cały okres. Legenda i podgląd wyraźnie nazywają ten widok „Przypisania rezerwacji”. Kilka boksów jednej rezerwacji oznacza kilka pasków; tego samego pobytu nie liczymy wtedy jako kilku rezerwacji.

Pasek: kod, koty objęte rezerwacją i etykieta statusu; dokładne przypisanie kota dostępne w szczegółach. Kliknięcie lub klawiatura otwiera podgląd z klientem, datami, godzinami, rozliczeniem i Otwórz rezerwację. Hover może jedynie powtarzać dostępny podgląd.

Nakładające się rezerwacje w tym samym boksie układamy w osobnych pasach wewnątrz wiersza. Zwiększyć wysokość wiersza lub udostępnić rozwinięcie, zamiast zasłaniać dane. Pusty wiersz opisujemy „Brak przypisanych rezerwacji w tym okresie”, bez wnioskowania o pojemności.

Daty końca i początku mają podpisane znaczniki Odbiór / Przyjazd. Pobyt jednodniowy pozostaje widocznym elementem o minimalnej czytelnej szerokości. Rysunek w siatce dni pokazuje termin, nie liczbę płatnych dni; dokładne daty i godziny są w podglądzie. Rezerwacje bez boksu mają osobną listę „Bez przypisanego boksu” dla wybranego okresu, aby nie znikały z planowania.

Bazowy kalendarz służy do przeglądu i wejścia do operacji. Przeciąganie pasków, zmiana ich długości i planowanie odcinków nie są częścią bazowych mutacji — patrz A-01.

### 7.5. Kalendarz — telefon

Przełącznik **Boksy / Dni**, wspólny wybór okresu i lokalizacji.

- Boksy: kolejne karty boksów, a w nich lista rezerwacji z dokładnym terminem, kotami i statusem. Uproszczony pasek czasu może być dodatkiem do tekstu.
- Dni: przyjazdy i odbiory z godziną, nazwą zdarzenia, kotami i boksem; odrębny kontekst niepotwierdzonych zgłoszeń.
- Bez przypisanego boksu: dostępna lista dla bieżącego okresu również na telefonie.

Dotknięcie otwiera podgląd i przejście do szczegółów. Każda operacja przypisania oraz przeniesienia kota jest dostępna bez precyzyjnego gestu. Nie ściskać pełnej macierzy do szerokości telefonu.

## 8. Cena, wpłaty i dane klienta

### 8.1. Rozliczenie rezerwacji

W jednym bloku pokazać: nazwę stawki, zapisaną cenę za dzień, liczbę dni, cenę wyliczoną, cenę końcową, informację o korekcie, sumę wpłat oraz pozostałą kwotę lub nadpłatę. Pod spodem rejestr wpłat z datą, metodą, kwotą, notatką i akcjami.

Przykład wyłącznie do makiet: 6 dni × 120,00 zł = 720,00 zł ceny wyliczonej; cena końcowa 680,00 zł po korekcie; wpłacono 400,00 zł; pozostało 280,00 zł. Liczba kotów nie stanowi dodatkowego mnożnika ceny w obecnym modelu.

Zmiana terminu lub stawki przelicza cenę wyliczoną. Ręcznie zmieniona cena końcowa pozostaje bez zmian. UI pokazuje obie wartości i akcję **Użyj ceny wyliczonej**, z konkretną zmianą kwoty do sprawdzenia. Informacja o korekcie musi być widoczna również po zamknięciu edycji.

Dodaj wpłatę: dodatnia kwota, data, metoda Gotówka / Przelew / Inna i opcjonalna notatka. Przed zapisem widoczny numer rezerwacji. Edycja i usunięcie aktualizują saldo; usunięcie wymaga potwierdzenia z kwotą i datą. Panel rejestruje wpłaty otrzymane poza systemem; bez Zapłać online i automatycznego zwrotu nadpłaty.

### 8.2. Rejestr płatności `/admin/payments`

Tabela lub karty: data, rezerwacja, klient, kwota, metoda, administrator. Filtry: okres, metoda, klient/rezerwacja. Dodaj wpłatę rozpoczyna się od wyboru rezerwacji. Główne miejsce pracy nad rozliczeniem pozostaje w szczegółach pobytu.

### 8.3. Klienci i koty

| Ekran | Zawartość i priorytet |
| --- | --- |
| `/admin/customers` | Wyszukiwanie po imieniu, nazwisku, telefonie i e-mailu; kontakt, liczba kotów, ostatni pobyt, neutralna etykieta trybu danych |
| `/admin/customers/[id]` | Dane kontaktowe → koty → historia rezerwacji → zgody, wersje dokumentów i stan retencji |
| `/admin/pets` | Wyszukiwanie po imieniu kota i właścicielu; filtr Aktualnie w hotelu; właściciel zawsze pomaga rozróżnić imiona |
| `/admin/pets/[id]` | Dane podstawowe → żywienie → leki i zdrowie → zachowanie i uwagi → rezerwacje i historia boksów |

Telefon i e-mail są linkami. Informacje o retencji są drugorzędne wobec bieżącej opieki. Dane zanonimizowane mają etykietę „Dane zanonimizowane”, bez fikcyjnego nazwiska i nieaktywnych akcji kontaktu. Historia pozostaje dostępna w dozwolonym zakresie.

Zmiana profilu jest edycją wspólnych danych klienta lub kota, co trzeba wyjaśnić w edytorze; nie obiecywać osobnej historycznej wersji profilu dla każdej rezerwacji. Nie projektować automatycznego scalania klientów po adresie e-mail. Informacja „Aktualnie w hotelu” wymaga bieżącego pobytu; stary otwarty wpis boksu nie wystarcza.

## 9. Komunikacja i szablony e-mail

### 9.1. Historia w rezerwacji

Wspólny chronologiczny widok może prezentować notatki kontaktowe i wiadomości, ale każdy wpis zachowuje typ źródła. Notatka: Telefon / E-mail / Osobiście / Inne, treść, autor, data i godzina. Odnotowanie kontaktu e-mailowego nie jest dowodem wysyłki wiadomości przez aplikację.

| Stan wiadomości | Etykieta UI | Znaczenie |
| --- | --- | --- |
| `PENDING` | Oczekuje na wysłanie | Wiadomość zapisana, wysyłka jeszcze niepotwierdzona |
| `SENT` | Wysłana | Provider potwierdził wysłanie; brak obietnicy odczytu lub dostarczenia do skrzynki |
| `FAILED` | Błąd wysyłki | Wysyłka zakończona błędem; szczegół i powiązana rezerwacja |

Szczegóły pokazują odbiorcę, temat i historyczną treść. Późniejsza edycja szablonu nie zmienia tego podglądu. Brak udokumentowanej akcji ręcznego ponowienia — jej dodanie wymaga zasad unikania duplikatów. W bazowym widoku Napisz e-mail otwiera `mailto:` i ma opis „Otwórz pocztę”; wbudowany kompozytor należy do A-02.

### 9.2. Wiadomość przy zmianie statusu

Wariant bazowy: aktywacja, odrzucenie i anulowanie tworzą automatyczną wiadomość zgodnie ze specyfikacją techniczną. Potwierdzenie operacji informuje o tym skutku. Po zapisaniu statusu pokazać „Zmieniono status. Wiadomość oczekuje na wysłanie”, jeśli taki jest faktyczny stan.

Nie dodawać checkboxa „Wyślij e-mail” sugerującego możliwość pominięcia automatycznej wiadomości ani nie uzależniać zmiany statusu od ręcznego kompozytora bez aktualizacji specyfikacji. Zachowany docelowy wariant podglądu i edycji opisano w A-02.

### 9.3. Szablony `/admin/email-templates`

Lista obejmuje sześć zdefiniowanych szablonów: otrzymanie zgłoszenia przez klienta, powiadomienie administratora, potwierdzenie, odrzucenie, anulowanie i jednorazowy link. Nazwa, temat, aktywność i Edytuj; klucze techniczne nie są głównymi etykietami.

Edytor: nazwa, temat, treść, aktywność i podgląd na jawnie oznaczonych przykładowych danych. Desktop: edycja i podgląd obok siebie; telefon: przełącznik Edycja / Podgląd, bez utraty treści. Wstawianie obsługiwanych zmiennych przez przyciski z opisowymi nazwami, np. Imię klienta, Termin i Cena; techniczny zapis zmiennej może być pomocniczy.

Podgląd obejmuje także długość tekstu na telefonie i nieuzupełnione dane opcjonalne. Wiadomości mają prostą hierarchię: marka, tytuł, istotne dane, dalszy krok i kontakt. Nie przenosić do nich dekoracyjnego układu strony głównej. Wyłączenie szablonu wymaga wyjaśnienia skutku zgodnego z logiką wysyłki — A-06.

## 10. Cennik, lokalizacje i treści strony

### 10.1. Cennik `/admin/pricing`

Lista: nazwa, cena za dzień, Aktywna, Widoczna na stronie, Edytuj. Dodaj pozycję otwiera prosty formularz. Aktywność i widoczność są dwoma osobnymi ustawieniami; publiczny efekt wymaga obu. W podglądzie używać opisów: „Widoczna publicznie”, „Tylko wewnętrzna” lub „Nieaktywna”.

Przy zapisie zmiany ceny: „Zmiana stawki nie zmienia cen istniejących rezerwacji”. Historycznie użyte stawki można wyłączyć, bez fizycznego usuwania. Nie wpisywać cen do edytora treści strony cennika.

### 10.2. Lokalizacje i boksy `/admin/boxes`

Hierarchiczna lista lokalizacji z przypisanymi boksami. Lokalizacja: nazwa, aktywność i kolejność. Boks: nazwa, lokalizacja, notatka i aktywność. Brak pola pojemności. Przy powtórzonej nazwie boksu błąd wyjaśnia, że nazwa musi być unikalna w całym hotelu.

Zmiana kolejności lokalizacji: przeciąganie oraz Przesuń w górę / w dół. Boksy nie mają ręcznej kolejności; zastosować spójne sortowanie po nazwie. Przeniesienie boksu do innej lokalizacji jest edycją jego właściwości, odrębną od przeniesienia kota.

Dane wyłączone pozostają dostępne w historii. Reguły wyłączenia lokalizacji lub boksu z bieżącymi przypisaniami nie są w pełni opisane; makieta powinna przewidzieć komunikat skutków, bez samodzielnego dodawania automatycznej relokacji — A-07.

### 10.3. CMS — stałe typy treści

| Ekran | Lista i edycja | Stany wymagane w makiecie |
| --- | --- | --- |
| `/admin/content/pages` | Strona główna, hotel, przed pobytem, regulamin, kontakt; tytuł, treść, pola SEO i publikacja | Edycja/podgląd, niezapisane zmiany, błąd zapisu, opublikowana/nieopublikowana |
| `/admin/content/faq` | Pytanie, odpowiedź, kolejność, aktywność | Pusta lista, długa odpowiedź, zmiana kolejności |
| `/admin/content/gallery` | Obraz, tekst alternatywny, podpis, kategoria, kolejność, aktywność | Wgrywanie, błąd pliku, ponowienie, usunięcie i brak zdjęć |
| `/admin/content/announcements` | Opcjonalny tytuł, treść, początek, koniec, aktywność | Wyłączony, zaplanowany, widoczny teraz, zakończony |

Galeria: miniatury z akcją Edytuj; na telefonie dwie kolumny, o ile akcje pozostają czytelne. Tekst alternatywny nie jest podpisem pod zdjęciem — pola mają osobne etykiety. FAQ i galeria obsługują zmianę kolejności przyciskami obok opcjonalnego przeciągania. Usunięcie zdjęcia pokazuje, co zniknie ze strony.

Edytor stron korzysta ze stałych szablonów określonych w dokumencie publicznym. Format `pages.content`, przypisanie fotografii do sekcji i źródło strukturalnych danych kontaktu wymagają wspólnego ustalenia P-02. Podgląd nie oznacza publikacji. Zapis opublikowanej strony może zmienić treść publiczną; etykieta i komunikat muszą to jasno wskazywać. Nie obiecywać wersji roboczej obok opublikowanej, historii wersji ani page buildera, których model nie przewiduje.

Stan publikacji komunikatu wyliczać z aktywności i dat. Samo zaznaczenie Aktywny nie oznacza „Widoczny teraz”. Daty i godziny są w Europe/Warsaw. Publiczny cennik korzysta z modułu Cennik, a nie z ręcznie wpisanych akapitów.

## 11. Eksporty, audyt i ustawienia

### Eksporty `/admin/exports`

Formularz: zakres dat, rodzaj daty (przecięcie okresu pobytu / przyjazd / odbiór), status, aktywne pobyty i rozliczenie. Akcja **Generuj XLSX**. Przejście z listy rezerwacji przenosi wybrane filtry i jasno pokazuje zakres eksportu.

Stan przed eksportem pokazuje filtry i liczbę rekordów, jeśli została obliczona. Ładowanie liczby nie jest zerowym wynikiem. Dalej: Generowanie, plik gotowy do pobrania, brak pasujących danych lub błąd z ponowieniem. Osobne eksporty klientów i kotów są kierunkiem wskazanym w dokumentacji biznesowej, ale wymagają doprecyzowania kolumn i filtrów — A-04.

### Dziennik zmian `/admin/audit`

Widok tylko do odczytu: data, administrator, rodzaj operacji, obiekt i zwięzła zmiana. Filtry daty, autora i rodzaju. Szczegóły pokazują opisowe wartości przed/po, bez dominującego surowego JSON-a. Nie wyświetlać sekretów ani tokenów. Historia statusów w rezerwacji i audyt są odrębnymi widokami, choć mogą odnosić się do tej samej operacji.

### Ustawienia `/admin/settings`

Wyłącznie ustawienia określone w `system_settings`: okres przechowywania danych jednorazowych, okres dla zapisanych profili, włączenie komunikatu popularności, próg nakładających się rezerwacji i adres administratora do powiadomień.

Wartości pobierać z konfiguracji; nie traktować liczb z makiety jako domyślnych okresów. Przy zmianie retencji pokazać wpływ na automatyczny proces i zakres zmienianych wartości. Nie dodawać ręcznego przycisku anonimizacji bez osobnego wymagania. Wgląd w stan retencji klienta znajduje się w jego profilu; zarządzanie zadaniami retencji jako osobny moduł nie jest obecnie określone.

## 12. Logowanie i bezpieczeństwo sesji

Logowanie: logo, tytuł Panel administratora, e-mail, hasło, pokaż/ukryj hasło i Zaloguj. Następnie ekran kodu TOTP, gdy wymagany dla administratora. Pole kodu umożliwia wklejenie całego kodu i ma jedną czytelną etykietę. Stany: błędne dane, błędny kod, ograniczenie prób, ładowanie i błąd usługi.

Po wygaśnięciu sesji pokazać konieczność ponownego logowania. Operacja nie może zostać zapisana automatycznie po odzyskaniu sesji; przed ponowieniem trzeba przywrócić kontekst i zweryfikować stan. Zachowanie niezapisanej edycji musi uwzględnić prywatność danych i kontrakt sesji.

Profil w ramie pozwala zidentyfikować administratora i się wylogować. Ekran Moje konto ze zmianą hasła, ponowną konfiguracją TOTP oraz odzyskiwaniem dostępu pozostaje rozszerzeniem A-03. Nie dodawać zarządzania administratorami i rolami bez opisanego procesu.

## 13. Makiety, scenariusze i kryteria odbioru

### Kolejność projektowania

1. Plansza komponentów: rama, tabela/karta, filtry, statusy, kwoty, formularze, dialog i ich stany.
2. Szczegóły nowej rezerwacji i aktywacja: przypisanie boksu, blokada bez boksu, zmiana statusu i wynik wiadomości.
3. Kalendarz oraz rozmieszczenie kotów: nakładanie rezerwacji, kilka boksów, brak przypisania i rzeczywiste przeniesienie kota.
4. Dzisiaj, przyjęcie, wpłaty, korekta ceny i zakończenie pobytu.
5. Listy, profile, cennik, CMS, szablony, eksporty, audyt, ustawienia i logowanie.

Każdy kluczowy ekran przygotować przy 390 i 1440 px; szerokości pośrednie zweryfikować w prototypie. Rozszerzenia z sekcji 14, jeśli są rysowane, umieszczać na osobnych planszach z oznaczeniem „Wymaga zmiany specyfikacji”.

### Scenariusze przekrojowe do prototypu

| Scenariusz | Co należy wykazać |
| --- | --- |
| Nowa bez boksu → przypisanie → Aktywna | Czytelna blokada, właściwa akcja i rozróżnienie zapisu statusu od wysłania e-maila |
| Dwa koty, dwa boksy, przeniesienie jednego kota | Rozróżnienie przypisania rezerwacji, faktycznego położenia i historii |
| Dwie rezerwacje w jednym boksie | Obie widoczne; brak sztucznego zakazu lub pojemności |
| Korekta ceny, zmiana daty i kilka wpłat | Zachowana cena końcowa, przeliczona cena wyliczona i prawidłowy opis salda |
| Cena końcowa 0 zł, brak wpłat; nadpłata | Poprawna etykieta Rozliczona dla 0/0 oraz dodatnia kwota nadpłaty |
| Odbiór przy niepełnym rozliczeniu | Widoczne saldo, brak nieudokumentowanej blokady zakończenia |
| Nieaktualny status lub błąd sieci podczas zapisu | Brak pozornego sukcesu i bezrefleksyjnego ponowienia operacji |
| Anonimizacja danych w archiwum | Czytelna historia bez fikcyjnych danych kontaktowych |

### Kryteria odbioru

- [ ] Priorytet zadania i następna akcja są czytelne na telefonie i desktopie.
- [ ] Wszystkie podstawowe funkcje są dostępne w zwartej ramie, w tym CMS i ustawienia.
- [ ] Zachowano sześć statusów i dozwolone przejścia; Nowa jest oznaczona żółto.
- [ ] Status rezerwacji i rozliczenie są wizualnie i językowo odrębne.
- [ ] Brak boksu, kilka kotów, nakładanie rezerwacji, długie nazwy i brak godziny mają zaprojektowane warianty.
- [ ] Informacje o zdrowiu i lekach nie są zastępowane domysłami ani ukryte w uciętej treści.
- [ ] Tabele, kalendarz i dialogi działają klawiaturą; przeciąganie ma alternatywę.
- [ ] Sprawdzono kontrast, focus, powiększenie tekstu oraz szerokości 320, 390, 768, 1024 i 1440 px.
- [ ] Pokazano ładowanie, pusty wynik, błąd, nieaktualne dane, niezapisane zmiany i wygasłą sesję.
- [ ] Zapis statusu, wpłaty i wysyłka e-maila mają osobne, prawdziwe komunikaty wyniku.
- [ ] Zmiana publicznej treści i cennika ma widoczny skutek publikacyjny.
- [ ] Makiety bazowe nie zawierają nieoznaczonych funkcji zależnych od rozszerzenia specyfikacji.

## 14. Zachowane kierunki rozwoju i otwarte ustalenia

### A-01. Przenoszenie całego lub części pobytu

Docelowy kierunek: najpierw prosta operacja dla całego pobytu i wszystkich wybranych kotów; po wybraniu „Część pobytu” ujawnienie dat od/do. Desktop może mieć przeciąganie paska z podsumowaniem przed zapisem, telefon wybór Przenieś → zakres → koty → boks. Każdy gest ma odpowiednik w formularzu.

Przed wdrożeniem trzeba ustalić, czy operacja zmienia przyszły plan, faktyczne położenie teraz, czy oba; zdefiniować model planowanych odcinków, granice przedziałów, skutki dla przypisań rezerwacji, wielu kotów, historii i audytu oraz atomowość operacji zbiorczej. Obecne `movePet` zapisuje ruch jednego kota od chwili wykonania. Do tego czasu wariant bazowy używa Przypisz boks oraz Przenieś kota teraz, a kalendarz nie obiecuje edycji przyszłych odcinków.

### A-02. Podgląd i edycja e-maila przed zmianą statusu

Docelowy kierunek zachowany z briefu: kontekstowy szablon, temat i treść do edycji, podgląd po podstawieniu danych, świadome zatwierdzenie. Desktop: edycja/podgląd obok siebie; telefon: Edycja → Podgląd → Zatwierdź. Automatyczne potwierdzenie otrzymania publicznego zgłoszenia pozostaje osobną ścieżką bez udziału administratora.

Wymaga decyzji o wspólnej operacji status + treść wiadomości, możliwości pominięcia e-maila, zachowaniu po zamknięciu kompozytora, ponowieniu i błędzie wysyłki. Trzeba zaktualizować reguły outboxa, aby nie wysłać dodatkowo automatycznego duplikatu. Wbudowane wysyłanie dowolnej wiadomości wymaga też własnej reguły i typu wiadomości. Do tego czasu działa automatyczny outbox, edytor szablonów i historia, a ręczny kontakt korzysta z poczty zewnętrznej.

### Pozostałe zależności

| ID | Temat | Ustalenie potrzebne przed implementacją zależnego widoku |
| --- | --- | --- |
| A-03 | Konto i TOTP | Dokument biznesowy opisuje 2FA jako opcjonalne, techniczny wymaga TOTP. Potwierdzić politykę wymuszania, konfiguracji i odzyskiwania dostępu; nie projektować wyłączenia jako gotowej funkcji |
| A-04 | Eksport klientów i kotów | Zakres biznesowy dopuszcza osobne eksporty, techniczny szczegółowo opisuje rezerwacje. Ustalić kolumny, filtry i obsługę danych zanonimizowanych |
| A-05 | Dzisiaj i filtry | Uzgodnić dokładne reguły grupy Wymaga uwagi, zdarzeń już wykonanych i listy nierozliczonych; te same definicje mają działać w licznikach, listach, kalendarzu i eksporcie |
| A-06 | Aktywność szablonów | Ustalić skutek wyłączenia szablonu wobec wymaganych automatycznych wiadomości. UI nie może jednocześnie obiecywać wysyłki i pozwalać bez wyjaśnienia ją wyłączyć |
| A-07 | Cykl życia przypisań | Ustalić zamykanie aktywnych przypisań kotów po zakończeniu/anulowaniu oraz skutki wyłączenia boksu/lokalizacji z przypisaniami. Nie traktować osieroconego wpisu jako bieżącego pobytu |
| P-02 | CMS i kontakt | Wspólna zależność z dokumentem publicznym: struktura treści, zdjęć i danych kontaktowych musi odpowiadać rzeczywistym polom edytora |

Po rozstrzygnięciu zależności zaktualizować dokumentację biznesową/techniczną, bazowy opis ekranów, powiązane stany i scenariusze odbioru. Ten rejestr pozwala rozwijać projekt bez utraty pomysłów i bez mieszania ich z już zdefiniowanym zakresem.
