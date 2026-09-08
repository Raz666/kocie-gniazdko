# Kocie Gniazdko 2.0 — design strony publicznej

> Baza projektowa do makiet i implementacji UI. Aktualizacja: 8 września 2026.
> Zakres: wspólny język wizualny marki, strony publiczne i proces zgłoszenia pobytu.

## 1. Jak korzystać z dokumentu

Dokument określa kierunek wizualny, hierarchię informacji, komponenty i zachowania interfejsu. Wartości tokenów i opisane układy są punktem wyjścia do makiet; po weryfikacji w prototypie należy aktualizować je tutaj, zamiast utrzymywać sprzeczne warianty.

Dokumenty powiązane:

- [Dokumentacja biznesowa](dokumentacja-biznesowa.md) — cel usługi i zakres funkcji.
- [Specyfikacja techniczna](specyfikacja-techniczna.md) — model danych, reguły i ograniczenia implementacji.
- [Design panelu administracyjnego](design-panel-administracyjny.md) — zastosowanie wspólnych fundamentów w interfejsie operacyjnym.

Reguły domenowe odczytujemy z dokumentacji biznesowej i technicznej. Dokument designu nie rozszerza ich samą obecnością przycisku w makiecie. Nierozstrzygnięte zależności i rozszerzenia są zebrane w sekcji 12. Opisy ekranów poza tą sekcją wyznaczają bazowy wariant projektu. Adresy dodatkowych ekranów są koncepcyjne, dopóki nie ustalono routingu.

Kwoty, nazwiska, numery zgłoszeń i treści w makietach są danymi przykładowymi. Cennik i informacje o hotelu muszą docelowo pochodzić z właściwych danych projektu. Repozytorium nie zawiera obecnie plików logo ani zdjęć; wskazany niżej kierunek kontynuuje opis marki z pierwotnego briefu i wymaga sprawdzenia na rzeczywistych materiałach.

## 2. Cel i charakter wizualny

Strona ma budować zaufanie do miejsca i opieki oraz prowadzić do prostego zgłoszenia pobytu. Główne pytania klienta to: jak wygląda hotel, jak przygotować kota, ile kosztuje pobyt i jak zgłosić termin.

Charakter marki: **ciepły, domowy, spokojny, zadbany, lekko retro i czytelny**. Kremowe powierzchnie, ciepły brąz tekstu, zieleń, naturalne zdjęcia i Alegreya w dużych nagłówkach tworzą rozpoznawalną całość. Układ jest przestronny, z wyraźną hierarchią i oszczędnymi dekoracjami.

Motywy kota, koszyka i liści występują głównie w logo oraz pojedynczych detalach. Unikać powtarzanych łapek, uszu na komponentach, infantylnych ilustracji, ciężkich filtrów zdjęć i dekoracji konkurujących z formularzem. Karty stosować do grupowania informacji i wyborów; zwykłe akapity nie potrzebują osobnych pudełek.

### Zasady wynikające z procesu obsługi

- **Rezerwuj** prowadzi do zgłoszenia. Ostateczna akcja formularza to **Wyślij zgłoszenie**.
- Wysłanie zgłoszenia nie potwierdza miejsca. Hotel weryfikuje je i kontaktuje się z klientem telefonicznie lub e-mailem.
- Publicznie nie pokazujemy obłożenia, liczby miejsc, boksów ani lokalizacji wewnętrznych. Kalendarz w formularzu służy wyłącznie do wyboru dat.
- Komunikat o popularności terminu nie blokuje wysłania zgłoszenia. Brak tego komunikatu nie oznacza dostępności.
- Klient może wysłać zgłoszenie bez konta. Zapisane dane można wykorzystać po uwierzytelnieniu jednorazowym linkiem.
- Płatności odbywają się poza aplikacją. Cennik oraz ewentualne dane do przelewu pełnią funkcję informacyjną.

## 3. Wspólne fundamenty wizualne

Ta sekcja jest wspólnym źródłem tokenów dla strony i panelu. Panel określa własną gęstość, typografię nagłówków i semantykę statusów, zachowując poniższe role kolorów.

### 3.1. Kolory i ich zastosowanie

| Token | Wartość | Zastosowanie |
| --- | --- | --- |
| `brand.green` | `#71942E` | Zieleń tożsamości, większe akcenty i dekoracje |
| `brand.leaf` | `#98CA6E` | Detale ilustracyjne; nie bazowe tło wszystkich kart |
| `brand.orange` | `#EA8734` | Drobny akcent, ilustracja, dekoracyjne podkreślenie |
| `brand.basket` | `#966735` | Motyw koszyka, ikony dekoracyjne |
| `brand.sand` | `#D6A063` | Oszczędne dekoracje |
| `surface.page` | `#FCFCFA` | Główne tło |
| `surface.subtle` | `#F6F3EA` | Sekcje i grupy informacji |
| `surface.raised` | `#FFFFFF` | Pola, dialogi i powierzchnie wymagające wyraźnego oddzielenia |
| `surface.selected` | `#EDF3E3` | Wybrana opcja, aktywna nawigacja |
| `text.primary` | `#44372C` | Tekst podstawowy |
| `text.secondary` | `#756C63` | Podpisy i tekst pomocniczy na jasnych powierzchniach |
| `border.subtle` | `#DDD7CC` | Dekoracyjne separatory i karty |
| `border.control` | `#8A8073` | Granice pól i niezaznaczonych kontrolek |
| `action.primary` | `#526F22` | Główne CTA, linki, zaznaczenie |
| `action.hover` | `#405719` | Hover i stan wciśnięcia głównej akcji |
| `action.on-primary` | `#FFFFFF` | Tekst na głównym przycisku |
| `focus.ring` | `#526F22` | Obrys fokusu z odstępem od komponentu |
| `feedback.success.text` / `.surface` | `#526F22` / `#EDF3E3` | Potwierdzenie zapisania lub wykonania akcji |
| `feedback.warning.text` / `.surface` | `#805D12` / `#FFF4CC` | Ostrzeżenie wymagające uwagi |
| `feedback.error.text` / `.surface` | `#9B3A2E` / `#FCEBE7` | Błąd walidacji lub operacji |
| `feedback.info.text` / `.surface` | `#285D7A` / `#E8F2F8` | Neutralna informacja systemowa |

Biel na `brand.green` ma kontrast około 3,51:1, dlatego zwykły tekst przycisku używa bieli na `action.primary` (około 5,74:1). Zieleń marki pozostaje elementem tożsamości. `text.secondary` na `surface.subtle` ma około 4,64:1; nie osłabiać jej dodatkową przezroczystością.

Pomarańczowy nie jest kolorem głównej akcji ani samodzielnym kolorem drobnego tekstu. Komunikat o popularnym terminie może mieć pomarańczowy detal, ale treść zapisujemy kontrastowym tekstem. Jasny separator nie zastępuje widocznej granicy pola formularza.

### 3.2. Typografia

- Nagłówki strony publicznej: **Alegreya**, wagi 500 i 600; fallback `Georgia, serif`.
- Tekst i UI: **Source Sans 3**, wagi 400 i 600; fallback `system-ui, sans-serif`.
- Ładować tylko używane odmiany, z polskimi znakami. Zmiana fontu po załadowaniu nie powinna przesuwać istotnych elementów.

| Rola | Telefon | Desktop | Interlinia |
| --- | --- | --- | --- |
| H1 | 40 px | 56 px | 1,1 |
| H2 | 32 px | 40 px | 1,2 |
| H3 | 24 px | 28 px | 1,25 |
| Wprowadzenie | 18 px | 20 px | 1,55 |
| Tekst / pola / przyciski | 16 px | 18 px tekst, 16–18 px UI | 1,5–1,55 |
| Podpis / tekst pomocniczy | 14 px | 14–16 px | 1,45 |

Nagłówek procesu i tytuły jego kroków mogą używać Source Sans 3, aby wspierać czytelność formularza. Nie wymuszać ręcznych podziałów wiersza tylko pod jedną szerokość makiety. Długie nazwy i treści z CMS zawijają się bez ucinania znaczenia. Tekst ciągły ograniczamy do około 65–75 znaków w wierszu, zwykle maksymalnie 720 px.

### 3.3. Przestrzeń, siatka i powierzchnie

| Parametr | Ustalenie bazowe |
| --- | --- |
| Skala odstępów | 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 120 px |
| Szerokości referencyjne makiet | 390 px i 1440 px; dodatkowe sprawdzenie przy 320, 768 i 1024 px |
| Progi zmiany układu | Poniżej 768 px: jedna kolumna; 768–1023 px: układ pośredni; od 1024 px: układ szeroki, o ile treść się mieści |
| Kontener treści | Maks. 1200 px; marginesy boczne 16 / 24 / 32 px odpowiednio dla powyższych zakresów |
| Odstęp sekcji | 64–80 px na telefonie, 96–120 px na desktopie |
| Odstęp wewnątrz sekcji | 24–32 px; w grupie pól 16–24 px |
| Kontrolki | Pola min. 52 px wysokości, główne przyciski 52–56 px, cele dotykowe min. 48 × 48 px |
| Zaokrąglenia | Kontrolki 12 px, karty 16 px, duże zdjęcia 24 px, etykiety statusu pełne zaokrąglenie |
| Obramowania | 1 px; zaznaczenie i focus 2 px, bez przesuwania układu |
| Cień | Oszczędny, np. `0 4px 16px rgba(68, 55, 44, 0.08)`; głównie warstwy nad treścią |

Kolejność informacji pozostaje wspólna na wszystkich szerokościach. Desktop łączy sąsiadujące moduły w kolumny, bez zmiany kolejności czytania i nawigacji klawiaturą. Menu zwijamy wcześniej, jeśli logo i etykiety przestają się mieścić. Poziomy scroll nie może obejmować całej strony.

### 3.4. Logo, zdjęcia, ikony i ruch

Zachować proporcje i pole ochronne dostarczonego logo. Wariant kompaktowy na telefon trzeba przygotować na podstawie materiału źródłowego; nie składać go przez przypadkowe przycinanie znaku. Do czasu jego opracowania korzystać z pełnego logo w czytelnej skali.

Preferować prawdziwe zdjęcia hotelu, kotów w jego przestrzeni i opieki, przy naturalnym świetle. Zdjęcia zastępcze w makietach oznaczać jako materiały do wymiany. Nie przedstawiać wygenerowanego lub stockowego wnętrza jako rzeczywistego hotelu.

Fotografie treściowe: zwykle 4:3 lub 3:2; hero dopuszcza inny kadr sprawdzony na obu szerokościach. Zachować punkt zainteresowania i nie ucinać kluczowego fragmentu zdjęcia. Rezerwować miejsce na obraz przed załadowaniem; opis alternatywny opisuje jego treść, a ilustracje dekoracyjne mają pusty opis.

Ikony pochodzą z jednego spójnego zestawu, zwykle 20–24 px, o jednakowej grubości linii. Nie używać emoji jako docelowych ikon UI. Krótkie przejścia 120–200 ms mogą podkreślać zmianę stanu. Respektować ograniczenie animacji; bez parallaxu i automatycznie przesuwających się galerii.

## 4. Komponenty i wspólne zachowania

| Komponent | Wygląd i zachowanie |
| --- | --- |
| Przycisk główny | Pełna ciemna zieleń, jasny tekst; jedna dominująca akcja w danej grupie |
| Przycisk drugorzędny | Obrys lub jasna powierzchnia, ciemnozielony tekst; np. Wstecz, Zadzwoń |
| Link tekstowy | Podkreślenie w treści; czytelne stany hover i focus |
| Pole | Stała etykieta, opcjonalność w etykiecie, instrukcja nad błędem; placeholder wyłącznie jako przykład |
| Karta wyboru | Natywne radio z dużą klikalną etykietą; zaznaczenie: obrys, delikatne tło i widoczny znacznik |
| Checkbox | Osobna etykieta; link do dokumentu nie przełącza przypadkowo zgody |
| Accordion | Przycisk z tytułem i stanem rozwinięcia; można otworzyć kilka sekcji jednocześnie |
| Komunikat | Ikona, krótki tytuł lub zdanie, opis i ewentualna akcja; kolor jest uzupełnieniem treści |
| Dialog / lightbox | Widoczny tytuł i zamknięcie; focus wewnątrz, Escape zamyka, powrót fokusu do elementu otwierającego |
| Pasek kroków | Nazwa i numer bieżącego kroku; na desktopie wszystkie nazwy, na telefonie „Krok 2 z 5 · Pobyt” |

Dla elementów interaktywnych przygotować stany: domyślny, hover, focus, wciśnięty, wybrany, nieaktywny, ładowanie i błąd — odpowiednio do roli. Niedostępna akcja ma wyjaśnienie, jeśli powód nie jest oczywisty. Wysyłanie zachowuje szerokość przycisku i pokazuje tekst, np. „Wysyłanie…”.

Po walidacji zachować dane, rozwinąć grupę z błędem, pokazać podsumowanie z linkami do pól i przenieść focus do podsumowania. Link prowadzi do konkretnego pola z opisem błędu. Przy zmianie kroku focus trafia na jego nagłówek. Komunikaty o wyniku operacji są ogłaszane technologiom asystującym.

Docelowe kryteria projektu: kontrast tekstu co najmniej 4,5:1, widocznych granic kontrolek i wskaźników co najmniej 3:1 względem sąsiedniej powierzchni; cała obsługa klawiaturą, bez zależności od koloru, hoveru lub gestu. Sprawdzić powiększenie tekstu do 200% i układ przy szerokości 320 px. Każda strona ma jeden główny H1 i logiczną hierarchię nagłówków.

## 5. Wspólna rama strony

**Nagłówek:** logo i nawigacja: Hotel, Galeria, Cennik, Przed pobytem, Regulamin, Kontakt oraz CTA Rezerwuj. Na telefonie logo i przycisk Menu; rozwinięte menu zawiera te same pozycje, Rezerwuj i Zadzwoń. Menu ma pełną obsługę fokusu i zamknięcia. Hero nie zajmuje obowiązkowo pełnej wysokości ekranu.

**Mobilny pasek dolny:** Zadzwoń i Rezerwuj na stronach informacyjnych. Ukryty w procesie zgłoszenia, jego potwierdzeniu i dostępie do zapisanych danych. Rezerwować miejsce pod paskiem wraz z bezpiecznym obszarem urządzenia. Pasek nie zasłania stopki, komunikatów ani aktywnego pola przy otwartej klawiaturze.

**Komunikat czasowy:** nad nagłówkiem, w zwykłym toku dokumentu. Widoczny tylko w okresie publikacji; dłuższą treść można rozwinąć w miejscu. Bez automatycznego modalu i bez domyślnego „Czytaj więcej” prowadzącego do nieistniejącej strony.

**Stopka:** nazwa i krótki opis hotelu, kontakt, nawigacja, Regulamin i Polityka prywatności, prawa autorskie. Jedna kolumna na telefonie, 3–4 na desktopie. Telefon i adres e-mail są tekstowymi linkami `tel:` i `mailto:`.

## 6. Mapa ekranów i kompozycja treści

| Ekran | Cel i kolejność modułów | Zachowanie układu |
| --- | --- | --- |
| `/` | Hero → 3 kroki rezerwacji → hotel → skrót cennika → galeria → przed pobytem i FAQ → kontakt z CTA | Hero: tekst nad zdjęciem na telefonie; około 55/45 na desktopie |
| `/hotel` | Intro → opis miejsca i opieki ze zdjęciami → większe zdjęcie → 3 kroki rezerwacji → CTA | Naprzemienne moduły tekst/zdjęcie na desktopie; jedna kolumna na telefonie |
| `/galeria` | Tytuł i krótki wstęp → opcjonalne kategorie → zdjęcia → CTA | 2 kolumny na telefonie, 3–4 na desktopie; regularna siatka |
| `/cennik` | Intro → aktywne publiczne stawki → zasada naliczania → informacja o zgłoszeniu → CTA | Karty stawek jedna pod drugą lub w 2–3 kolumnach zależnie od liczby |
| `/przed-pobytem` | Intro → sekcje przygotowania → FAQ → kontakt | Kolumna tekstowa do 720 px; FAQ bez kategorii i wyszukiwarki |
| `/regulamin` | Tytuł → spis sekcji, jeśli potrzebny → treść → kontakt | Wąska kolumna; opcjonalny boczny spis treści na szerokim ekranie |
| `/kontakt` | Intro → telefon i e-mail → adres i dojazd → opcjonalne dane do przelewu → CTA | Bez fotografii hero; kontakt w pierwszej części ekranu |
| `/rezerwacja` | Pięć kroków zgłoszenia | Jedna główna kolumna formularza; pomocnicze podsumowanie na desktopie |
| Wynik zgłoszenia | Potwierdzenie przyjęcia, kod, dalsze kroki i kontakt | Zwarta karta sukcesu, bez promocji i kolejnego głównego CTA Rezerwuj |
| Dostęp do zapisanych danych | Żądanie linku → wynik → wybór danych; także link nieważny | Wspólna rama z formularzem |
| Polityka prywatności | Treść oraz wejścia ze stopki i zgód | Ten sam szablon czytania co regulamin; slug do ustalenia |
| 404 / błąd strony | Wyjaśnienie i droga powrotu lub ponowienia | Krótka treść, ewentualnie mały detal ilustracyjny |

### 6.1. Strona główna i hotel

Schemat hierarchii pierwszej części strony głównej (proporcje orientacyjne):

```text
Telefon                            Desktop
Logo                    Menu       Logo  Nawigacja                 Rezerwuj
Tytuł i krótki opis                 Tytuł i krótki opis   | Fotografia
Rezerwuj                           Rezerwuj             | hotelu
Wyjaśnienie zgłoszenia              Wyjaśnienie          |
Fotografia hotelu                  Zadzwoń / Napisz     |
3 kroki obsługi pionowo             1. Termin → 2. Zgłoszenie → 3. Potwierdzenie
```

Schemat określa priorytety i relacje modułów; docelowa wysokość wynika z treści, zdjęcia i typografii, bez wymuszania identycznych podziałów wierszy.

Hero komunikuje rodzaj usługi, krótko przedstawia miejsce i pokazuje jedno dominujące Rezerwuj. Obok lub pod nim: „Wyślij zgłoszenie — termin potwierdzimy po kontakcie”. Zdjęcie wspiera treść, nie utrudnia odczytania tekstu.

W całym serwisie używać tej samej trzyetapowej opowieści: **Wybierasz termin → Wysyłasz zgłoszenie → Potwierdzamy pobyt**. To opis obsługi, niezależny od pięciu kroków formularza.

Skróty cennika, FAQ i galerii korzystają z tych samych źródeł co podstrony. FAQ na stronie głównej: 3–4 pytania. Sekcja przed pobytem zawiera krótkie wejścia do informacji i regulaminu; unikać powtarzania całych bloków. Fakty o opiece, wyposażeniu i zasadach hotelu pochodzą z dostarczonych treści, bez dopisywania obietnic usługowych.

### 6.2. Galeria

Kategorie pokazywać tylko wtedy, gdy istnieją w opublikowanych zdjęciach. Na telefonie filtr może przewijać się poziomo i ma widoczny stan wyboru. Kolejność wynika z CMS. Opcjonalne większe zdjęcie nie zmienia logicznej kolejności czytania.

Lightbox zawiera podpis, poprzednie/następne, licznik i zamknięcie. Swipe jest uzupełnieniem przycisków oraz klawiszy strzałek. Brak automatycznego pokazu. Dla braku zdjęć pokazać krótki stan pusty; dla błędu ładowania umożliwić ponowienie bez blokowania reszty strony.

### 6.3. Cennik

Prezentować wyłącznie stawki aktywne i widoczne publicznie. Każda ma nazwę i cenę za dzień; bez stałych kwot w kodzie lub treści CMS, sztucznego oznaczenia „najpopularniejsza” i osobnego publicznego kalkulatora.

Zasada naliczania w obecnej specyfikacji: **liczba dni = różnica dat, minimum 1 dzień; koszt = liczba dni × stawka zapisana dla rezerwacji**. Godziny przyjazdu i odbioru nie zmieniają liczby dni. Stawka dotyczy rezerwacji; interfejs nie dodaje mnożnika liczby kotów. Ewentualne inne zasady wymagają zmiany dokumentacji domenowej.

Brak dostępnych stawek ma osobny komunikat z kontaktem. Nie wyświetlać fikcyjnej ceny 0 zł ani ukrytych pozycji jako zastępstwa.

### 6.4. Treści informacyjne

Hotel, przygotowanie do pobytu i dokumenty wykorzystują ustalone szablony: nagłówki, akapity, listy, fotografie i wyróżnione informacje. CMS nie jest dowolnym kreatorem układu. Dobór formatu treści i sposób przypisania zdjęć do modułów wymaga uzgodnienia zgodnie z sekcją 12.

Regulamin i polityka prywatności pozostają czytelnym tekstem, z linkami do sekcji. FAQ umożliwia rozwinięcie kilku odpowiedzi. Podstawowe zasady pobytu nie powinny być dostępne wyłącznie w zamkniętym accordionie.

### 6.5. Kontakt i moduły dodatkowe

Telefon i e-mail pokazać jako dwie duże, klikalne karty; na desktopie obok siebie. Godziny kontaktu wyświetlać, jeśli są dostarczone. Pełny adres musi być dostępny tekstowo niezależnie od mapy.

Moduł dojazdu może zawierać mapę z jednym punktem hotelu, około 4:3 na telefonie, oraz Wyznacz trasę. Na desktopie układ adres/mapa około 40/60. Mapa nie przechwytuje zwykłego przewijania. Dostawca i osadzenie pozostają do ustalenia; działający adres i link do trasy wystarczają jako wariant bez osadzenia.

Jeżeli hotel publikuje dane do przelewu: osobna spokojna karta z odbiorcą, rachunkiem, opcjonalnym bankiem i instrukcją tytułu. Numer jest tekstem, wizualnie grupowanym, możliwym do zaznaczenia. Kopiuj numer konta kopiuje pełny numer i potwierdza wynik tekstowo; błąd kopiowania pozostawia możliwość ręcznego zaznaczenia. Źródło tych danych opisano w sekcji 12.

**Formularz kontaktowy jest zachowany jako rozszerzenie do uzgodnienia.** Jego makieta: imię, wymagany e-mail i wiadomość, opcjonalny telefon, informacja o prywatności, Wyślij wiadomość. Bez dat i profili kotów. Docelowe wymagania pól i zgód trzeba ustalić wraz z obsługą wiadomości. Umiejscowienie: po danych do przelewu, przed CTA rezerwacji. Sukces w miejscu formularza, błąd z ponowieniem i zachowaną treścią. Kolumna formularza do 720 px, na desktopie opcjonalny kontakt pomocniczy obok.

## 7. Zgłoszenie pobytu — pięć kroków

Formularz ma uproszczony nagłówek z nazwą hotelu, tytułem „Zgłoszenie rezerwacji” i postępem. Na telefonie jedna kolumna; na desktopie formularz do 720 px, opcjonalnie z krótkim podsumowaniem obok. Nie dublować pełnego podsumowania w kilku miejscach.

| Krok | Zawartość | Kluczowe zachowanie |
| --- | --- | --- |
| 1. Termin | Data przyjazdu, preferowana godzina, data odbioru, preferowana godzina | Daty wymagane; godziny opcjonalne. Odbiór nie wcześniej niż przyjazd; dopuszczony ten sam dzień |
| 2. Pobyt | Jedna z aktywnych publicznych stawek: nazwa i cena za dzień | Duże karty radio; wybór widoczny bez polegania na kolorze |
| 3. Twoje dane | Imię, nazwisko, e-mail i telefon; wejście „Mam już zapisane dane” | Etykiety, właściwe klawiatury i autocomplete; bez rozpoznawania profilu po samym e-mailu |
| 4. Koty | Co najmniej jeden profil; Dodaj kolejnego kota | Każdy kot ma oddzielną kartę; możliwość rozwinięcia, edycji i usunięcia z tego zgłoszenia |
| 5. Podsumowanie | Termin, stawka, kontakt, koty, uwagi do pobytu, tryb przechowywania danych i zgody | Edytuj wraca do odpowiedniego kroku; na końcu Wyślij zgłoszenie |

### 7.1. Nawigacja i zapis formularza

Dalej waliduje bieżący krok. Wstecz i cofanie w przeglądarce zachowują wpisane dane podczas bieżącego procesu. Kroki już odwiedzone można poprawić; zmiana daty lub stawki aktualizuje podsumowanie. Nie zakładać trwałego zapisu danych osobowych w przeglądarce; zachowanie po odświeżeniu, zamknięciu karty lub zmianie urządzenia wymaga osobnego rozwiązania.

Przed opuszczeniem niezakończonego formularza przez nawigację aplikacji ostrzec o utracie wpisanych danych, jeśli nie będą zachowane. Po błędzie sieci nie czyścić formularza. Blokada ponownego kliknięcia podczas wysyłania nie zastępuje obsługi niepewnego wyniku po stronie aplikacji.

### 7.2. Popularność terminu i stawki

Po wybraniu poprawnego zakresu może pojawić się: „Ten termin cieszy się dużym zainteresowaniem. Zalecamy wysłanie zgłoszenia możliwie wcześnie”. Komunikat korzysta wyłącznie z odpowiedzi `popular`; po zmianie dat usunąć nieaktualną informację. Brak danych lub błąd tej pomocniczej usługi nie blokuje formularza i nie oznacza wolnego terminu.

Pozycje cennika są weryfikowane ponownie przy wysyłaniu. Jeżeli wybrana stawka przestała być aktywna lub publiczna, zachować formularz, odświeżyć opcje i skierować do ponownego wyboru. Dla zmiany samej kwoty przy nadal dostępnej stawce potrzebne jest ustalenie kontraktu potwierdzania ceny — sekcja 12.

### 7.3. Profil kota

Pola podstawowe: imię, płeć, rasa, data urodzenia lub opis wieku, kastracja/sterylizacja z odpowiedziami Tak / Nie / Nie wiem. Imię jest bazowym wymaganym polem identyfikującym kota w makiecie; ostateczne reguły wymaganych danych muszą być wspólne z walidacją aplikacji. Nie wywodzić ich z dopuszczalności NULL w bazie, która obsługuje także anonimizację.

Dalej grupy: Żywienie (sposób i instrukcje), Zdrowie i leki, Zachowanie i inne uwagi. Zdrowie i leki początkowo rozwinięte; ważne informacje opiekuńcze muszą być zauważalne. Po zwinięciu grupa pokazuje, czy zawiera wpisane informacje. Puste pole oznacza „Nie podano”, a nie „Brak leków” czy „Kot zdrowy”.

Po dodaniu kolejnego kota focus przechodzi na jego nagłówek lub pierwsze pole. Wypełnionego kota można usunąć ze zgłoszenia po czytelnym potwierdzeniu; nie oznacza to usunięcia zapisanego profilu. Ostatniego kota nie można usunąć bez zastąpienia. Lista nie ma sztucznego limitu liczby kotów i obsługuje długie imiona.

### 7.4. Podsumowanie i zgody

Podsumowanie obejmuje również informacje opiekuńcze, dostępne do sprawdzenia i poprawienia. Tryb przechowywania danych jest odrębnym, jawnym wyborem między „Tylko na potrzeby tej rezerwacji” i „Zachowaj moje dane na przyszłość”. Wariant zachowania danych nie jest domyślnie zaznaczony. Nie obiecywać usunięcia danych natychmiast po pobycie ani nie wpisywać nieustalonych okresów retencji.

Wymagane zgody mają osobne etykiety i linki do dokumentów; zgoda dotycząca zachowania danych nie może być ukryta w zgodach niezbędnych do zgłoszenia. Dokładne brzmienie i wersje treści pochodzą z zatwierdzonych dokumentów projektu.

Bezpośrednio przed wysłaniem: **„Wysłanie formularza nie oznacza jeszcze potwierdzenia pobytu. Po otrzymaniu zgłoszenia skontaktujemy się z Tobą telefonicznie lub e-mailowo.”**

## 8. Wynik zgłoszenia i dostęp do zapisanych danych

### Wynik zgłoszenia

Sukces: „Otrzymaliśmy Twoje zgłoszenie”, publiczny kod referencyjny, wyjaśnienie kolejnych działań hotelu, kontakt i Wróć na stronę główną. Nie pokazywać wewnętrznego ID ani komunikatu „Rezerwacja potwierdzona”.

Wysłanie e-maila jest osobnym procesem. Bez potwierdzonego wyniku wysyłki używać „Potwierdzenie otrzymania zgłoszenia otrzymasz e-mailem”, zamiast „Wysłaliśmy potwierdzenie”. Błąd wiadomości nie oznacza utraty zapisanego zgłoszenia i nie powinien skłaniać do ponownego wypełnienia formularza.

Przy niepewnym wyniku wysłania nie przedstawiać błędu jako pewnego braku zgłoszenia. Potrzebny stan „Nie możemy potwierdzić wyniku” z drogą sprawdzenia lub kontaktem; sposób bezpiecznego ponowienia należy uzgodnić w implementacji.

### Zapisane dane i jednorazowy link

1. Żądanie linku: e-mail, Wyślij link, powrót do formularza.
2. Odpowiedź neutralna dla każdego adresu: „Jeśli podany adres jest zapisany w systemie, wysłaliśmy wiadomość z linkiem”. Nie ujawniać istnienia profilu.
3. Poprawny link: dane klienta, wybór kotów i Użyj danych do zgłoszenia. Klient sprawdza aktualność informacji przed dalszym krokiem.
4. Link błędny, wygasły lub użyty: „Ten link nie jest już aktywny”, Wyślij nowy link, Wróć do rezerwacji.
5. Ograniczenie liczby prób i błąd usługi: czytelny komunikat i dalsza droga, bez ujawniania danych profilu.

Po powrocie w tej samej sesji zachować termin i pozostałe wpisane dane. Nie nadpisywać ich automatycznie danymi profilu bez świadomego wyboru. Link otwarty w nowej karcie lub na innym urządzeniu wymaga osobnego wariantu ciągłości procesu; nie obiecywać przeniesienia niezapisanego formularza. Zakres nie obejmuje rozbudowanego portalu klienta.

## 9. Język interfejsu

| Sytuacja | Ustalona etykieta lub zasada |
| --- | --- |
| Wejście do formularza | Rezerwuj |
| Zakończenie formularza | Wyślij zgłoszenie |
| Sukces zgłoszenia | Otrzymaliśmy Twoje zgłoszenie |
| Zapisane dane | Mam już zapisane dane / Użyj zapisanych danych |
| Błąd pola | Konkretna instrukcja, np. „Wpisz poprawny adres e-mail” |
| Brak danych | Nie podano; nie zastępować domysłem |
| Daty i godziny | Polski zapis, rok przy niejednoznaczności, godziny 24-godzinne; strefa Europe/Warsaw |
| Kwoty | PLN, np. 240,00 zł; spójna precyzja w danym widoku |

Nie używać obietnic „Sprawdź dostępność”, „Ostatnie miejsca”, „Natychmiastowa rezerwacja” ani nieustalonego czasu odpowiedzi hotelu. Krótkie zdania, uprzejmy bezpośredni ton, bez żargonu typu „retencja” i „magic link” w głównych komunikatach klienta.

## 10. Zestaw makiet i kolejność prac

1. Fundamenty: logo z materiałów źródłowych, paleta, typografia, siatka i plansza komponentów ze stanami.
2. Najważniejsza ścieżka: strona główna, pięć kroków zgłoszenia, sukces, błędy i powrót z zapisanymi danymi — 390 i 1440 px.
3. Podstrony: hotel, cennik, galeria z lightboxem, przed pobytem/FAQ, kontakt i wspólny szablon dokumentów.
4. Uzupełnienia: menu mobilne, ogłoszenie, 404, puste dane, awaria oraz dodatkowe warianty kontaktu oznaczone zakresem.

Do makiet dołączyć prototyp przejść, dane przykładowe i adnotacje dotyczące zachowania przy zmianie szerokości. Nie wystarcza pojedynczy statyczny ekran w idealnym stanie.

## 11. Kryteria odbioru wizualnego

- [ ] Strona ma charakter marki opisany w sekcji 2 i wykorzystuje spójne tokeny.
- [ ] Klient rozumie różnicę między zgłoszeniem a potwierdzonym pobytem, także na ekranie sukcesu.
- [ ] Cały proces da się wykonać na telefonie i klawiaturą; focus oraz błędy pozostają widoczne.
- [ ] Układ działa przy 320, 390, 768, 1024 i 1440 px oraz po powiększeniu tekstu.
- [ ] Menu, klawiatura ekranowa i paski stałe nie zasłaniają aktywnych elementów.
- [ ] Sprawdzono długie treści CMS, kilka kotów, długie imiona, brak zdjęć i brak stawek.
- [ ] Pokazano ładowanie, błąd pól, błąd sieci, zmianę stawki, nieważny link i niepewny wynik wysłania.
- [ ] Cennik, FAQ i galeria mają jedno źródło danych dla wszystkich publicznych widoków.
- [ ] Zdjęcia mają poprawne kadry i opisy, a finalne logo zostało sprawdzone w najmniejszym użyciu.
- [ ] Publiczny interfejs nie ujawnia informacji o boksach, obłożeniu ani innych klientach.

## 12. Otwarte ustalenia i zależności

| ID | Temat | Co trzeba ustalić i jaki wariant przyjmujemy do tego czasu |
| --- | --- | --- |
| P-01 | Materiały marki | Dostarczyć logo i prawdziwe zdjęcia; sprawdzić wariant kompaktowy. W makietach oznaczone materiały zastępcze |
| P-02 | CMS i kontakt | Specyfikacja dopuszcza Markdown lub JSON w `pages.content`, ale nie definiuje struktury modułów, pól kontaktowych, rachunku i mapy. Ustalić schemat stałych szablonów; do tego czasu nie obiecywać dowolnego układu ani osobnych pól w ustawieniach systemu |
| P-03 | Formularz kontaktowy | Zachować projekt jako rozszerzenie. Brakuje obsługi wiadomości, odbiorcy, zasad przechowywania, ochrony formularza i ustaleń zgód. Bazowy kontakt działa przez telefon i e-mail |
| P-04 | Polityka i zgody | Ustalić slug, treść, wersje dokumentów i finalne etykiety. Design przewiduje miejsce, nie określa treści prawnej ani okresów przechowywania |
| P-05 | Cena podczas zgłoszenia | Ustalić reakcję na zmianę kwoty nadal aktywnej stawki. Preferowany UX: pokazanie nowej kwoty i świadome ponowienie, bez utraty danych; wymaga kontraktu z backendem |
| P-06 | Wymagalność i ciągłość formularza | Potwierdzić wymagane dane klienta/kota, zachowanie po odświeżeniu i otwarciu linku na innym urządzeniu oraz obsługę niepewnego wyniku wysłania. W bazowym prototypie gwarantujemy zachowanie danych między krokami bieżącego procesu |

Zmianę dotyczącą reguł biznesowych należy najpierw odnotować w dokumentach domenowych, a potem zaktualizować dotknięte ekrany i kryteria odbioru w obu dokumentach designu.
