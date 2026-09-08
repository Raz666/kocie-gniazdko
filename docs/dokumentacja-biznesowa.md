# Kocie Gniazdko 2.0
## Dokumentacja biznesowa dla administratora systemu

## 1. Cel wersji 2.0

Wersja 2.0 zastępuje obecną stronę internetową i rozproszone narzędzia jednym spójnym systemem do obsługi Hotelu dla Kotów Kocie Gniazdko.

System składa się z dwóch głównych części:

- publicznej strony internetowej dla klientów,
- prywatnego panelu administracyjnego do obsługi zgłoszeń, rezerwacji, klientów, kotów, boksów, płatności, treści strony i komunikacji e-mail.

System nie dokonuje automatycznej decyzji o przyjęciu rezerwacji. Każde zgłoszenie jest ręcznie weryfikowane przez administratora, a dostępność jest potwierdzana telefonicznie lub e-mailem.

Płatności są nadal przyjmowane poza systemem, przede wszystkim gotówką, a administrator jedynie rejestruje w panelu poszczególne wpłaty.

---

## 2. Publiczna strona internetowa

Nowa strona jest projektowana od początku jako responsywna i wygodna na telefonach, tabletach i komputerach - mobile first.

Publiczna część obejmuje:

- stronę główną,
- opis hotelu i opieki,
- galerię,
- cennik,
- informacje przed pobytem i FAQ,
- regulamin,
- kontakt,
- formularz zgłoszenia rezerwacji.

Najważniejsze informacje i przyciski są łatwo dostępne na telefonie. Numer telefonu jest klikalny, formularze są dostosowane do małych ekranów, a zdjęcia są zoptymalizowane tak, aby strona ładowała się szybko również w sieci komórkowej.

Treści są zarządzane bezpośrednio z panelu administracyjnego Kociego Gniazdka.

---

## 3. Zgłoszenie rezerwacji przez klienta

Klient nie dokonuje samodzielnie potwierdzonej rezerwacji. Wysyła zgłoszenie rezerwacyjne.

Formularz jasno informuje, że wysłanie zgłoszenia nie gwarantuje miejsca i że administrator skontaktuje się telefonicznie lub e-mailowo w celu potwierdzenia pobytu.

Podstawowy proces wygląda następująco:

1. Klient wybiera datę i preferowaną godzinę przyjazdu.
2. Klient wybiera datę i preferowaną godzinę odbioru.
3. Klient wybiera odpowiednią pozycję cennika, np. pobyt z własną karmą albo pobyt z karmą hotelu.
4. Klient podaje swoje dane kontaktowe.
5. Klient dodaje jednego lub więcej kotów.
6. Klient podaje informacje potrzebne do opieki nad każdym kotem.
7. Klient wybiera sposób przechowywania danych na przyszłość.
8. Klient akceptuje wymagane zgody i wysyła zgłoszenie.
9. System tworzy rezerwację ze statusem „Nowa”.
10. Klient otrzymuje e-mail potwierdzający otrzymanie zgłoszenia.
11. Administrator otrzymuje powiadomienie o nowym zgłoszeniu.
12. Administrator sprawdza zgłoszenie, przypisuje odpowiedni boks lub boksy i oddzwania do klienta.
13. Po potwierdzeniu pobytu administrator aktywuje rezerwację.

---

## 4. Informowanie o terminach cieszących się zainteresowaniem

Publiczna strona nie ujawnia:

- ile miejsc jest zajętych,
- ile miejsc pozostało,
- które boksy są zajęte,
- gdzie przebywają konkretne koty,
- danych innych rezerwacji.

System analizuje jednak napływające zgłoszenia i aktywne rezerwacje dla wybranego okresu.

Jeżeli dany termin przekroczy ustalony próg zainteresowania, klient może zobaczyć ogólny komunikat:

> Ten termin cieszy się dużym zainteresowaniem. Zalecamy wysłanie zgłoszenia możliwie wcześnie.

Komunikat nie zawiera żadnej informacji pozwalającej wywnioskować faktyczne obłożenie hotelu.

---

## 5. Dane klienta i możliwość rezerwacji bez konta

Założenie konta nie jest wymagane do wysłania rezerwacji.

Każdy klient może wybrać jeden z dwóch wariantów:

### Tylko na potrzeby tej rezerwacji

Dane są używane do obsługi zgłoszenia i pobytu. Po zakończeniu okresu retencji dane osobowe, których system nie musi dłużej przechowywać, są anonimizowane.

### Zachowaj dane na przyszłość

System przechowuje dane klienta i jego kotów, aby kolejne zgłoszenie można było przygotować szybciej.

Powracający klient nie używa klasycznego hasła. Dostęp do zapisanego profilu odbywa się za pomocą bezpiecznego jednorazowego linku przesłanego na zapisany adres e-mail.

Jeżeli zapisany profil nie jest używany przez ustalony okres od ostatniej rezerwacji, dane są automatycznie kierowane do anonimizacji zgodnie z ustawieniami retencji.

---

## 6. Profile kotów

Każdy kot jest osobnym profilem powiązanym z właścicielem.

Profil może zawierać między innymi:

- imię,
- płeć,
- rasę,
- datę urodzenia lub opis wieku,
- informację o kastracji lub sterylizacji,
- sposób żywienia,
- instrukcje karmienia,
- leki,
- ważne informacje zdrowotne,
- informacje o zachowaniu,
- inne uwagi potrzebne do opieki.

Jedna rezerwacja może obejmować dowolną liczbę kotów należących do klienta.

Dla klientów, którzy zdecydowali się zachować dane, profile kotów mogą zostać użyte ponownie przy kolejnej rezerwacji.

---

## 7. Statusy rezerwacji

Każda rezerwacja ma jeden z następujących statusów:

### Nowa

Nowe zgłoszenie przesłane przez klienta.

Kolor w panelu: żółty.

Nowa rezerwacja może zostać:

- aktywowana,
- odrzucona,
- anulowana.

### Aktywna

Rezerwacja została potwierdzona przez administratora.

Rezerwacja może otrzymać status „Aktywna” wyłącznie wtedy, gdy ma przypisany co najmniej jeden boks.

### W hotelu

Kot lub koty zostały przyjęte i pobyt aktualnie trwa.

### Zakończona

Pobyt został zakończony.

### Odrzucona

Hotel nie przyjął zgłoszenia.

Odrzucenie oznacza, że zgłoszenie nigdy nie zostało potwierdzone jako aktywna rezerwacja.

### Anulowana

Zgłoszenie lub wcześniej aktywna rezerwacja została anulowana.

Status zawsze jest prezentowany tekstowo. Kolor jest dodatkowym wyróżnieniem wizualnym.

---

## 8. Historia zmian statusu

Każda zmiana statusu jest automatycznie zapisywana.

Administrator może sprawdzić:

- poprzedni status,
- nowy status,
- datę i godzinę zmiany,
- administratora, który wykonał zmianę,
- opcjonalny powód zmiany.

Historia nie znika po kolejnych zmianach i stanowi trwały zapis przebiegu obsługi rezerwacji.

---

## 9. Lokalizacje i boksy

System obsługuje cztery wewnętrzne lokalizacje:

1. Gniazdko 1,
2. Gniazdko 2,
3. Parter,
4. Pokój.

Lokalizacje oraz boksy są widoczne wyłącznie w panelu administracyjnym.

Administrator może:

- dodawać lokalizacje,
- zmieniać ich nazwy,
- zmieniać kolejność lokalizacji,
- czasowo wyłączać lokalizacje,
- dodawać boksy,
- zmieniać nazwy boksów,
- przenosić boks do innej lokalizacji,
- czasowo wyłączać boks.

Nazwa boksu jest unikalna w całym systemie. Przykładowo „Box 1” może wystąpić tylko raz, niezależnie od lokalizacji.

Boksy nie mają zdefiniowanej maksymalnej pojemności.

---

## 10. Przypisywanie boksów do rezerwacji

Rezerwacja musi mieć przypisany co najmniej jeden boks, zanim administrator będzie mógł zmienić jej status na „Aktywna”.

Jedna rezerwacja może mieć przypisany jeden lub wiele boksów.

System nie narzuca maksymalnej liczby kotów przypisanych do boksu.

Administrator może zmieniać przypisane boksy w trakcie obsługi rezerwacji.

Informacje o boksach nie są nigdy prezentowane klientom.

---

## 11. Przemieszczanie kotów między boksami

Oprócz boksów przypisanych do całej rezerwacji system przechowuje historię faktycznego rozmieszczenia kotów.

Administrator może w dowolnym momencie przenieść kota z jednego boksu do innego.

System zapisuje:

- kota,
- rezerwację,
- boks,
- moment rozpoczęcia pobytu w boksie,
- moment zakończenia pobytu w boksie,
- administratora wykonującego zmianę,
- opcjonalną notatkę.

Dzięki temu można sprawdzić aktualne położenie kota oraz historię jego przemieszczeń w czasie pobytu.

---

## 12. Cennik

Cennik jest zarządzany z panelu administracyjnego.

Każda pozycja cennika ma:

- nazwę,
- cenę za dzień pobytu,
- informację, czy jest aktywna,
- informację, czy ma być widoczna na publicznej stronie.

Na początku system zawiera dwie podstawowe pozycje:

- pobyt z własną karmą,
- pobyt z karmą hotelu.

Administrator może dowolnie zmieniać ceny i nazwy, dodawać kolejne pozycje oraz ukrywać stawki przeznaczone wyłącznie do użytku wewnętrznego.

Wyłączenie lub zmiana pozycji cennika nie zmienia cen już istniejących rezerwacji.

---

## 13. Automatyczne wyliczanie kosztu rezerwacji

Rezerwacja ma przypisaną jedną pozycję cennika.

W momencie przypisania stawki system zapamiętuje jej aktualną cenę za dzień.

Automatyczna cena rezerwacji jest wyliczana według wzoru:

> liczba dni pobytu × zapamiętana cena za dzień

Godzina przyjazdu i odbioru nie zmienia automatycznej liczby dni rozliczeniowych.

System pokazuje administratorowi:

- wybraną stawkę,
- cenę za dzień,
- liczbę dni,
- cenę wyliczoną automatycznie,
- końcową cenę rezerwacji.

Administrator może ręcznie zmienić końcową cenę rezerwacji.

Po ręcznej zmianie system zachowuje zarówno cenę wyliczoną, jak i cenę końcową oraz wyraźnie oznacza, że została zastosowana korekta ręczna.

Jeżeli termin zostanie później zmieniony, system ponownie oblicza cenę wynikającą z cennika. Jeżeli cena końcowa była wcześniej zmieniona ręcznie, nie jest nadpisywana automatycznie.

---

## 14. Wpłaty i rozliczenie

Administrator ręcznie rejestruje każdą otrzymaną wpłatę.

Do jednej rezerwacji można dodać dowolną liczbę wpłat.

Każda wpłata zawiera:

- kwotę,
- datę,
- metodę płatności,
- opcjonalną notatkę.

Metody płatności:

- gotówka,
- przelew,
- inna.

Panel automatycznie pokazuje:

- całkowitą cenę rezerwacji,
- sumę wpłat,
- kwotę pozostałą do rozliczenia,
- ewentualną nadpłatę.

Kwota pozostała do rozliczenia jest zawsze liczona na podstawie końcowej ceny rezerwacji, a nie ceny wyliczonej z cennika.

---

## 15. Notatki kontaktowe

Przy każdej rezerwacji administrator może prowadzić historię kontaktów.

Notatka zawiera:

- rodzaj kontaktu,
- treść,
- administratora,
- datę i godzinę.

Rodzaje kontaktu obejmują:

- telefon,
- e-mail,
- kontakt osobisty,
- inne.

Przykład:

> Rozmowa telefoniczna. Termin potwierdzony. Klient planuje przyjazd około 16:00.

Notatki są widoczne chronologicznie w szczegółach rezerwacji.

---

## 16. Dashboard administratora

Po zalogowaniu administrator trafia na ekran „Dzisiaj”.

Dashboard pokazuje przede wszystkim dane potrzebne do bieżącej pracy:

- liczbę aktywnych pobytów,
- dzisiejsze przyjazdy,
- dzisiejsze odbiory,
- nowe zgłoszenia,
- rezerwacje wymagające uwagi,
- nierozliczone rezerwacje.

Każda pozycja prowadzi bezpośrednio do szczegółów odpowiedniej rezerwacji.

Widok jest dostosowany również do telefonu.

---

## 17. Lista rezerwacji

Administrator ma dostęp do pełnej listy rezerwacji.

Może filtrować ją według:

- statusu,
- terminu,
- klienta,
- kota,
- numeru telefonu,
- adresu e-mail.

Domyślny widok skupia się na rezerwacjach bieżących i przyszłych.

Zakończone, odrzucone i anulowane rezerwacje są dostępne jako archiwum.

Na komputerze lista może być prezentowana w tabeli, a na telefonie w wygodnych kartach.

---

## 18. Szczegóły rezerwacji

Ekran pojedynczej rezerwacji gromadzi wszystkie informacje potrzebne administratorowi w jednym miejscu:

- numer rezerwacji,
- status,
- termin,
- dane klienta,
- koty,
- wybraną pozycję cennika,
- cenę wyliczoną,
- końcową cenę,
- wpłaty,
- pozostałą należność,
- przypisane boksy,
- aktualne rozmieszczenie kotów,
- uwagi klienta,
- uwagi administratora,
- notatki kontaktowe,
- historię statusów,
- historię wysłanych e-maili.

Administrator nie musi przechodzić między kilkoma aplikacjami, aby obsłużyć pobyt.

---

## 19. Kalendarz administracyjny

Panel zawiera wewnętrzny kalendarz pokazujący rezerwacje i przypisania boksów.

Kalendarz może grupować boksy według lokalizacji:

- Gniazdko 1,
- Gniazdko 2,
- Parter,
- Pokój.

Administrator widzi rozkład rezerwacji w czasie i może szybko przejść do ich szczegółów.

Kalendarz jest wyłącznie narzędziem wewnętrznym i nie ma publicznego odpowiednika.

---

## 20. E-maile

System automatyzuje podstawową komunikację e-mail.

Po wysłaniu zgłoszenia:

- klient otrzymuje potwierdzenie przyjęcia zgłoszenia,
- administrator otrzymuje powiadomienie o nowym zgłoszeniu.

Po zmianie rezerwacji na odpowiedni status klient otrzymuje wiadomość dotyczącą:

- potwierdzenia rezerwacji,
- odrzucenia zgłoszenia,
- anulowania rezerwacji.

Wiadomości e-mail są uzupełnieniem lub alternatywą kontaktu telefonicznego przy potwierdzaniu dostępności, do wyboru administratora.

Administrator może edytować treści i tematy szablonów wiadomości w panelu.

Historia wysyłki jest zapisywana przy rezerwacji.

---

## 21. Eksport do Excela

Administrator może eksportować dane rezerwacji do pliku `.xlsx`.

Przed eksportem można zastosować filtry, między innymi:

- zakres dat,
- status,
- przyjazdy,
- odbiory,
- aktywne pobyty,
- rozliczone i nierozliczone rezerwacje.

Eksport może zawierać między innymi:

- numer rezerwacji,
- datę utworzenia,
- status,
- datę i godzinę przyjazdu,
- datę i godzinę odbioru,
- dane klienta,
- koty,
- liczbę kotów,
- przypisane boksy i lokalizacje,
- wybraną stawkę,
- cenę za dzień,
- cenę końcową,
- sumę wpłat,
- kwotę pozostałą do rozliczenia,
- metody płatności,
- uwagi administracyjne.

Możliwy jest również oddzielny eksport klientów i kotów.

---

## 22. Zarządzanie treścią strony

Panel zawiera prosty CMS przygotowany specjalnie dla Kociego Gniazdka.

Administrator może edytować:

- stronę główną,
- opis hotelu i oferty,
- treści informacyjne przed pobytem,
- regulamin,
- kontakt,
- FAQ,
- galerię,
- komunikaty specjalne.

Cennik nie jest wpisywany ręcznie w treść strony. Publiczna strona cennika automatycznie korzysta z aktywnych i widocznych pozycji cennika skonfigurowanych w panelu.

Administrator może dodawać, usuwać i zmieniać kolejność zdjęć w galerii.

System nie zawiera WordPressa ani mechanizmu wtyczek.

---

## 23. Komunikaty specjalne

Administrator może utworzyć czasowy komunikat widoczny na stronie.

Przykłady:

- większe zainteresowanie okresem świątecznym,
- zmienione godziny kontaktu,
- informacja organizacyjna.

Komunikat może mieć określony termin rozpoczęcia i zakończenia publikacji.

---

## 24. Retencja i anonimizowanie danych

System rozróżnia dane potrzebne do bieżącej obsługi usługi od danych zachowywanych na przyszłość za zgodą klienta.

Dla klientów jednorazowych mechanizm retencji uruchamia się po zakończeniu sprawy, w szczególności po zakończeniu pobytu, odrzuceniu lub anulowaniu zgłoszenia.

Dla klientów, którzy wybrali zachowanie danych, okres nieaktywności jest liczony od ostatniej zakończonej rezerwacji.

Po upływie skonfigurowanego okresu system automatycznie kieruje dane do anonimizacji.

Anonimizacja pozwala zachować niezbędną historię operacyjną i statystyczną bez zachowywania danych pozwalających zidentyfikować klienta.

Okresy retencji są ustawieniem administracyjnym systemu i powinny odpowiadać obowiązującej polityce prywatności oraz wymaganiom prawnym.

---

## 25. Dziennik audytowy

System zapisuje ważne działania wykonywane przez administratorów.

Dziennik obejmuje między innymi:

- zmianę statusu rezerwacji,
- zmianę ceny,
- dodanie lub usunięcie wpłaty,
- przypisanie lub usunięcie boksu,
- przeniesienie kota,
- zmianę danych klienta,
- zmianę treści strony.

Dzięki temu można ustalić, kto i kiedy wykonał istotną operację.

---

## 26. Bezpieczeństwo panelu

Panel administracyjny jest prywatny i wymaga zalogowania.

System zapewnia:

- bezpieczne połączenie HTTPS,
- silne uwierzytelnianie administratora,
- opcjonalne zabezpieczenie logowania 2FA,
- ograniczenie prób logowania,
- kontrolę dostępu do funkcji administracyjnych,
- automatyczne kopie zapasowe,
- historię istotnych zmian.

Dane o lokalizacjach, boksach i rozmieszczeniu kotów nie są udostępniane przez publiczną część aplikacji.

---

## 27. Efekt końcowy wersji 2.0

Po ukończeniu wersji 2.0 administrator otrzymuje jeden system do codziennego prowadzenia Kociego Gniazdka.

Zamiast formularzy, arkuszy i informacji rozproszonych między różnymi miejscami system pozwala:

- przyjmować nowe zgłoszenia ze strony,
- oddzwaniać do klientów i ręcznie decydować o przyjęciu,
- aktywować tylko rezerwacje z przypisanym boksem,
- prowadzić historię statusów,
- zarządzać klientami i kotami,
- rozmieszczać koty w boksach i zapisywać ich przemieszczenia,
- zarządzać cennikiem,
- automatycznie wyliczać koszt pobytu,
- korygować cenę indywidualnie,
- rejestrować dowolną liczbę wpłat,
- kontrolować pozostałe należności,
- prowadzić notatki z kontaktów,
- wysyłać automatyczne e-maile,
- eksportować rezerwacje do Excela,
- aktualizować treści strony bez udziału programisty,
- zarządzać retencją danych,
- korzystać z panelu wygodnie zarówno na komputerze, jak i na telefonie.

System zachowuje obecny, osobisty sposób obsługi hotelu — administrator nadal może telefonicznie potwierdzać każdą rezerwację lub zdecydować o komunikacji e-mail — ale usuwa zbędną pracę ręczną i porządkuje całą historię działalności w jednym miejscu.
