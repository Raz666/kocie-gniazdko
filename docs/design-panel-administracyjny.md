# Plan designu panelu administracyjnego Kocie Gniazdko 2.0

Poniższy plan traktuję jako **specyfikację UX/UI pod mockupy**, nie tylko listę funkcji. Bazuję na dokumentacji biznesowej i technicznej projektu: panel ma obejmować dashboard, rezerwacje, kalendarz, klientów, koty, cennik, lokalizacje i boksy, płatności, CMS, szablony e-mail, eksporty i ustawienia, przy zachowaniu pełnej funkcjonalności na urządzeniach mobilnych.  

---

# 1. Ogólna koncepcja panelu

Panel powinien wizualnie należeć do Kociego Gniazdka, ale **nie powinien wyglądać jak publiczna strona pensjonatu**.

Logo może pozostać w nagłówku/logowaniu, a krem, zieleń i ciepły brąz mogą stanowić bazę, jednak we właściwym panelu pierwszeństwo mają:

* czytelność,
* wysoki kontrast,
* duży tekst,
* duże powierzchnie klikalne,
* szybkie skanowanie danych,
* funkcjonalne znaczenie kolorów,
* minimum elementów dekoracyjnych.

Ozdobny krój pisma z logo nie powinien być używany w tabelach, formularzach ani danych operacyjnych.

## Typografia

Proponuję już na poziomie mockupów przyjąć:

| Element          |    Desktop |     Mobile |
| ---------------- | ---------: | ---------: |
| podstawowy tekst |      18 px |   16–17 px |
| tekst tabel      |   16–17 px |      16 px |
| pomocniczy       |   15–16 px |   14–15 px |
| H1               |   30–32 px |      26 px |
| H2               |   22–24 px |   20–22 px |
| przyciski        | min. 17 px | min. 16 px |

Na desktopie nie projektowałabym „gęstych” administracyjnych tabel z tekstem 13–14 px. Główny administrator ma móc pracować przy **100% zoomu**.

Wiersze tabel: ok. **56 px wysokości**.
Pola formularzy: **48–52 px**.
Mobilne cele dotykowe: minimum **48 × 48 px**.

---

# 2. Kolor jako informacja

Kolor powinien być używany oszczędnie. Główna zieleń marki służy do akcji i aktywnych elementów nawigacji, a pozostałe kolory przede wszystkim do komunikowania stanu.

Dokumentacja wymaga, aby `NEW` był żółty i aby kolor nigdy nie był jedynym nośnikiem informacji. 

### Proponowana mapa statusów

| Status     | Kolor       | Oznaczenie   |
| ---------- | ----------- | ------------ |
| Nowa       | żółty       | ● Nowa       |
| Aktywna    | zielony     | ● Aktywna    |
| W hotelu   | niebieski   | ● W hotelu   |
| Zakończona | szary       | ✓ Zakończona |
| Odrzucona  | czerwony    | × Odrzucona  |
| Anulowana  | ciemnoszary | × Anulowana  |

### Rozliczenia

To powinien być **oddzielny system semantyczny od statusu rezerwacji**:

* `0 zł wpłat` → **Nieopłacona**
* część kwoty → **Częściowo opłacona**
* saldo 0 → **Rozliczona**
* wpłaty > cena → **Nadpłata**

Proponowane kolory:

* nieopłacona — czerwony,
* częściowa — pomarańczowy,
* rozliczona — zielony,
* nadpłata — fiolet.

Wszędzie wyświetlamy również tekst i kwotę, np.:

**Częściowo opłacona · pozostało 180 zł**

a nie sam kolor.

---

# 3. Główna nawigacja

## Desktop

Stały sidebar po lewej, szerokość około 240–260 px.

```text
[ Kocie Gniazdko ]

OPERACJE
● Dzisiaj
  Kalendarz
  Rezerwacje

BAZA
  Klienci
  Koty
  Płatności

ORGANIZACJA
  Cennik
  Lokalizacje i boksy
  E-maile

STRONA WWW
  Treści
  FAQ
  Galeria
  Komunikaty

DANE
  Eksporty
  Dziennik zmian

SYSTEM
  Ustawienia

--------------------
Administrator
Wyloguj
```

Przy **Rezerwacjach** może znajdować się żółty licznik nowych zgłoszeń.

Sidebar pozostaje nieruchomy przy przewijaniu.

## Mobile

Ponieważ administratorzy pomocniczy preferują menu u dołu, najważniejsza nawigacja:

```text
[Dzisiaj] [Kalendarz] [Rezerwacje] [Klienci] [Więcej]
```

`Więcej` otwiera pełnoekranowy arkusz/menu:

* Koty
* Płatności
* Cennik
* Lokalizacje i boksy
* E-maile
* Treści strony
* Eksporty
* Dziennik zmian
* Ustawienia

Dzięki temu **nie powstaje „okrojony panel mobilny”**. Mobilna wersja tylko inaczej organizuje nawigację.

---

# 4. Wspólny nagłówek stron

Każda podstrona:

```text
Tytuł strony                          [akcja główna]
Krótki kontekst / breadcrumbs
--------------------------------------------------
zawartość
```

Na mobile:

```text
← / logo      Tytuł               ⋮
------------------------------------
zawartość
```

Akcje o krytycznym znaczeniu na telefonie mogą być dodatkowo przyklejone do dolnej części ekranu, nad główną nawigacją.

---

# 5. Dashboard — „Dzisiaj”

To powinien być **najbardziej operacyjny ekran systemu**.

Dokumentacja już zakłada dzisiejsze przyjazdy, odbiory, nowe zgłoszenia, aktywne pobyty i nierozliczone rezerwacje.  Dodałabym do tego dokładnie wskazane przez Ciebie rozróżnienie między bieżącym dniem, oczekującymi na aktywację i najbliższymi siedmioma dniami.

## Desktop

Układ:

```text
Dzisiaj — niedziela, 6 września

┌───────────────────────────────────────────────────────────┐
│ DZISIEJSZY HARMONOGRAM                                   │
│ 08:00 ↓ Przyjazd   Luna + Mela   Box 2   Rozliczona      │
│ 11:30 ↑ Odbiór     Filemon       Box 8   Pozostało 80 zł │
│ 16:00 ↓ Przyjazd   Mruczek       Box 5   Brak wpłat      │
└───────────────────────────────────────────────────────────┘

┌────────────────────────────┐ ┌────────────────────────────┐
│ OCZEKUJĄ NA AKTYWACJĘ  4   │ │ W HOTELU                  │
│ ...                        │ │ ...                        │
└────────────────────────────┘ └────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│ NAJBLIŻSZE 7 DNI                                          │
│ PN 7 │ WT 8 │ ŚR 9 │ CZW 10 │ PT 11 │ SOB 12 │ ND 13   │
│ 2↓   │ 1↑   │ ...                                         │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│ WYMAGA UWAGI                                              │
│ • rezerwacja KG-XP41 — brak boksu                        │
│ • KG-... — pozostało 240 zł                              │
└───────────────────────────────────────────────────────────┘
```

### Dzisiejszy harmonogram

To nie powinny być kafelki statystyczne typu:

> 3 przyjazdy / 4 odbiory

jako główna treść.

Administrator potrzebuje przede wszystkim **listy rzeczy do wykonania w kolejności czasu**.

Każdy wpis:

* godzina,
* rodzaj zdarzenia: `PRZYJAZD ↓` / `ODBIÓR ↑`,
* klient,
* kot/koty,
* przypisany boks,
* status rezerwacji,
* rozliczenie,
* szybka akcja.

Przykład przyjazdu:

> **16:00 ↓ Przyjazd**
> Mruczek · Anna Kowalska · Box 5
> Aktywna · **pozostało 120 zł**
> `[Otwórz] [Przyjmij]`

Odbiór kota będącego w hotelu:

> `[Otwórz] [Zakończ pobyt]`

## Oczekują na aktywację

Osobny bardzo widoczny blok.

Dla każdej `NEW`:

* numer,
* klient,
* koty,
* termin,
* ile czasu temu wpłynęło,
* boks:

  * `Box 4`,
  * albo czerwone/żółte **Brak przypisanego boksu**.

Przycisk:

**Obsłuż zgłoszenie**

Nie „Aktywuj”, jeśli nie ma jeszcze boksu, ponieważ backend i tak nie może aktywować takiej rezerwacji. 

## Mobile

Wszystko w jednej kolumnie:

1. **Teraz / Dzisiaj**
2. **Oczekują na aktywację**
3. **Najbliższe 7 dni**
4. **Wymaga uwagi**

Harmonogram siedmiu dni jako poziomo przewijane dni.

---

# 6. Rezerwacje — lista

Route koncepcyjny:

`/admin/reservations`

## Desktop

Nad tabelą:

```text
Rezerwacje                       [Eksportuj]
[🔎 Szukaj klienta, kota, telefonu, e-maila, numeru...]

[Bieżące i przyszłe] [Archiwum]

Status ▾   Termin ▾   Rozliczenie ▾   Więcej filtrów ▾
```

Tabela:

| Termin  | Rezerwacja | Klient / koty         | Status   | Boksy |   Cena | Rozliczenie |
| ------- | ---------- | --------------------- | -------- | ----- | -----: | ----------- |
| 6–12 IX | KG-X42P    | Kowalska / Luna, Mela | W hotelu | B2    | 720 zł | Rozliczona  |
| 9–15 IX | KG-H73N    | Nowak / Filemon       | Nowa     | —     | 660 zł | Brak wpłat  |

Cały wiersz jest klikalny.

`NEW` może mieć delikatnie żółte tło/żółty pasek z lewej, ale nadal ma badge **Nowa**.

### Domyślny zakres

Tak jak zakłada dokumentacja biznesowa:

**bieżące i przyszłe**.

Zakończone, anulowane i odrzucone → **Archiwum**. 

## Mobile

Tabela zamienia się w karty:

```text
NOWA
KG-H73N

9–15 września
Filemon
Jan Nowak

Boks: brak
660 zł
Brak wpłat

                    >
```

Filtry otwierają bottom sheet.

---

# 7. Szczegóły rezerwacji

To będzie najważniejszy ekran szczegółowy całego panelu.

Route:

`/admin/reservations/[id]`

Nie projektowałabym go jako kilkunastu zakładek. Administrator powinien dostać **jedną kartę sprawy**, którą można szybko przewijać.

## Nagłówek

```text
← Rezerwacje

KG-X42P                         ● AKTYWNA
Luna, Mela · Anna Kowalska

6 września 16:00 → 12 września 11:00

[Zmień termin] [Napisz e-mail] [•••]
```

Dla `NEW`:

```text
[Przypisz boks]   [Aktywuj rezerwację]
```

Jeśli boksu brak:

`Aktywuj` nieaktywny + komunikat:

> Aby aktywować rezerwację, przypisz co najmniej jeden boks.

---

## Sekcja 1 — pobyt i rozmieszczenie

Powinna znajdować się bardzo wysoko.

```text
POBYT

6 IX                                         12 IX
│─────────────────────────────────────────────│

Przypisane boksy:
[Gniazdko 1 / Box 4] [Gniazdko 1 / Box 5]

Luna
6 IX ───────── Box 4 ─────────── 9 IX ─ Box 5 ── 12 IX

Mela
6 IX ─────────────────── Box 4 ───────────────── 12 IX

[Zmień rozmieszczenie]
```

To od razu pokazuje nie tylko „jaki box”, ale również zmianę w czasie.

---

# 8. Najważniejszy UX: przenoszenie kotów między boksami

Tutaj proponuję **dwa poziomy złożoności**.

## Poziom 1 — domyślna akcja

**Przenieś cały pobyt**

Administrator wybiera:

```text
Przenieś:
● cały pobyt
○ część pobytu

Kot:
☑ Luna
☑ Mela

Z:
Box 4

Do:
[Box 8 ▾]

[Anuluj]                    [Przenieś]
```

Jeżeli cała rezerwacja ma zostać przeorganizowana, ta ścieżka powinna wymagać dosłownie kilku kliknięć.

## Poziom 2 — zaawansowany

Dopiero po wybraniu:

**część pobytu**

pokazujemy:

```text
Od: 09.09
Do: 12.09

Koty:
☑ Luna
☐ Mela

Nowy boks:
Box 8
```

Na desktopie odpowiednikiem będzie również drag & drop w kalendarzu.

Na telefonie **drag & drop nie może być jedynym sposobem wykonania operacji**. Tap → „Przenieś pobyt” → wybór boksu jest znacznie bezpieczniejszy.

---

# 9. Ważna luka między UX a obecną specyfikacją techniczną

Obecny model danych bardzo dobrze obsługuje:

1. boksy przypisane **całej rezerwacji** przez `reservation_boxes`,
2. historię **rzeczywistych przemieszczeń konkretnego kota** przez `pet_box_assignments`. 

Nie ma natomiast osobnej struktury opisującej wprost:

> „zaplanowany Box 3 w dniach 6–8, a Box 7 w dniach 9–12”

jako przyszły plan pobytu.

Dlatego do samego mockupu możemy bez problemu zaprojektować akcję **„Przenieś część pobytu”**, ale przed implementacją trzeba ustalić, czy ma ona:

* oznaczać rzeczywiste przemieszczenie kota w trakcie trwającego pobytu,
* czy również umożliwiać wcześniejsze planowanie różnych boksów dla różnych dni.

Ten drugi przypadek wymaga rozszerzenia obecnego modelu danych.

---

# 10. Część finansowa rezerwacji

W szczegółach:

```text
ROZLICZENIE

Stawka
Z własną karmą
120 zł / dzień × 6 dni

Cena wyliczona                 720 zł
Cena końcowa                   680 zł
                              ↑ ręczna korekta

Wpłacono                       400 zł
Pozostało                      280 zł

[Dodaj wpłatę]       [Edytuj cenę]
```

Jeżeli cena była zmieniona ręcznie:

> Cena końcowa została zmieniona ręcznie.
> Cena wg aktualnego terminu: 720 zł
> `[Użyj ceny wyliczonej]`

Dokładnie odpowiada to przewidzianemu modelowi `calculatedPrice` + `finalPrice`. 

Pod spodem:

```text
WPŁATY

04.09     200 zł     Przelew
06.09     200 zł     Gotówka
```

---

# 11. Dane klienta w rezerwacji

Zwarty blok:

```text
KLIENT

Anna Kowalska
☎ 600 000 000
✉ anna@example.pl

Dane zachowane na przyszłość

[Profil klienta] [Edytuj]
```

Telefon i e-mail na mobile bezpośrednio klikalne.

---

# 12. Koty w rezerwacji

Każdy kot jako niezależna karta.

```text
LUNA
Kotka · 5 lat · sterylizowana

Żywienie
Własna karma, 2 × dziennie

Leki
Brak

Zdrowie
...

Zachowanie
...

[Pełny profil] [Edytuj]
```

Przy pobycie w hotelu karta może pokazywać:

> **Teraz: Box 5**

---

# 13. Kontakt i e-maile w rezerwacji

Proponuję połączyć komunikację w jeden blok:

```text
KOMUNIKACJA

[Napisz e-mail]   [Dodaj notatkę kontaktową]

────────────────────────────

6 IX 10:42   ✉ E-mail wysłany
Potwierdzenie rezerwacji

5 IX 18:10   ☎ Telefon
Termin potwierdzony. Przyjazd około 16:00.

4 IX 09:23   ✉ E-mail wysłany
Otrzymaliśmy zgłoszenie
```

Dzięki temu administrator dostaje **jedną chronologiczną historię kontaktu**, mimo że technicznie e-maile i notatki są przechowywane osobno. 

---

# 14. Kompozytor e-maila

To powinien być bardzo dopracowany element.

Kliknięcie **Napisz e-mail**:

## Desktop

```text
┌──────────────────────────┬────────────────────────────┐
│ EDYCJA                   │ PODGLĄD                    │
│                          │                            │
│ Szablon                  │ Do: Anna Kowalska          │
│ [Potwierdzenie ▾]        │ Temat: ...                 │
│                          │                            │
│ Temat                    │ Dzień dobry Pani Anno,     │
│ [...]                    │ ...                        │
│                          │                            │
│ Treść                    │                            │
│ [...]                    │                            │
│                          │                            │
│ Dostępne dane            │                            │
│ [Imię] [Termin] [Cena]   │                            │
└──────────────────────────┴────────────────────────────┘

[Anuluj]                        [Wyślij e-mail]
```

System **podpowiada szablon na podstawie kontekstu**, np.:

* `NEW` → kontakt w sprawie zgłoszenia,
* aktywacja → potwierdzenie,
* odrzucenie → odrzucenie,
* anulowanie → anulowanie.

Administrator może:

1. wybrać inny szablon,
2. edytować temat,
3. edytować treść,
4. zobaczyć wynik po podstawieniu danych,
5. dopiero wtedy wysłać.

Na mobile:

**Edycja → Podgląd → Wyślij**.

---

# 15. E-mail przy zmianie statusu

Dla operacji takich jak aktywacja:

```text
AKTYWOWAĆ REZERWACJĘ?

Status:
Nowa → Aktywna

E-mail do klienta:
☑ Przygotuj potwierdzenie

[Podgląd i edycja e-maila]

[Anuluj]            [Potwierdź aktywację]
```

To realizuje nowe założenie, że administrator widzi i może poprawić wiadomość przed jej wysłaniem.

Jednocześnie zachowujemy automatyczne potwierdzenie **otrzymania publicznego zgłoszenia**, które według obecnej dokumentacji powstaje bez udziału administratora. 

---

# 16. Kalendarz / plan boksów

Route:

`/admin/calendar`

To drugi obok Dashboardu ekran, któremu poświęciłabym najwięcej miejsca w mockupach.

## Desktop — macierz czas × przestrzeń

```text
Kalendarz boksów

[<] [Dzisiaj] [>]       [7 dni] [14 dni] [30 dni]
Lokalizacje: Wszystkie ▾

               6 IX     7 IX     8 IX     9 IX    10 IX ...
──────────────────────────────────────────────────────────
▼ GNIAZDKO 1
Box 1          │████ Luna / KG-23 ███████████│
Box 2          │      ███ Filemon █████│
Box 3          │████████ Mela / KG-91 ███████████████│

▼ GNIAZDKO 2
Box 4          │                  █████ Mruczek █████│
Box 5          │
──────────────────────────────────────────────────────────
▼ PARTER
...
```

Lewa kolumna z lokalizacją i nazwą boksu pozostaje **sticky** podczas poziomego przewijania.

Nagłówek z datami również sticky.

### Paski pobytu

Na pasku:

* imię/imiona kotów,
* numer rezerwacji,
* mały badge statusu.

Nie próbujemy upchnąć całej rezerwacji.

Hover / kliknięcie:

```text
KG-X42P
Luna + Mela

6 IX 16:00 → 12 IX 11:00
Anna Kowalska
Aktywna
Pozostało: 180 zł

[Otwórz]
[Przenieś pobyt]
```

### Przyjazd i odbiór

Na początku/końcu paska niewielkie znaczniki:

`↓` przyjazd
`↑` odbiór

Dzięki temu również przy dwóch rezerwacjach kończących/zaczynających się tego samego dnia można szybko odczytać zmianę.

---

# 17. Drag & drop w kalendarzu

Główna akcja:

**przeciągnięcie całego paska na inny Box = przeniesienie całego pobytu.**

Po upuszczeniu nie zapisujemy od razu.

Pokazujemy potwierdzenie:

> Przenieść Lunę i Melę
> z Box 2 do Box 7
> na cały pobyt 6–12 września?

`[Anuluj] [Przenieś]`

### Przenoszenie fragmentu

Nie próbowałabym tworzyć skomplikowanego uchwytu „Excelowego”.

Po wybraniu paska:

`••• → Przenieś część pobytu`

i dopiero tam wybór dat.

Jest to znacznie trudniejsze do wykonania przypadkiem.

---

# 18. Mobile — kalendarz

Nie należy ściskać desktopowej macierzy do 390 px.

Domyślny mobilny widok:

```text
Kalendarz        6–12 września

[Gniazdko 1 ▾]

BOX 1
6 ━━━━━━━━━ 12
Luna + Mela
Aktywna

BOX 2
        8 ━━━━━ 11
Filemon
W hotelu

BOX 3
Wolny w tym okresie
```

Przełącznik:

`[Boksy] [Dni]`

Widok **Dni**:

```text
NIEDZIELA 6 IX

↓ 09:00 Luna — Box 1
↑ 11:00 Filemon — Box 3
↓ 16:00 Mela — Box 4
```

Zmiana boksu:

tap w rezerwację → **Przenieś pobyt**.

Pełna funkcjonalność zostaje zachowana bez wymagania precyzyjnego przeciągania palcem.

---

# 19. Klienci — lista

`/admin/customers`

```text
Klienci

[🔎 Imię, nazwisko, telefon lub e-mail]

Anna Kowalska
600 000 000 · anna@...
2 koty · ostatni pobyt 12 VIII

Jan Nowak
...
```

Desktop może używać tabeli, mobile kart.

Informacja dodatkowa:

* `Dane tylko dla tej rezerwacji`
* `Profil zachowany na przyszłość`
* `Zanonimizowany`

Nie używałabym tego jednak jako bardzo kolorowego statusu.

---

# 20. Klient — szczegóły

`/admin/customers/[id]`

Układ:

### Dane kontaktowe

* imię,
* nazwisko,
* telefon,
* e-mail,
* tryb retencji.

### Koty

Karty profili:

`Luna`, `Mela`.

### Historia rezerwacji

Tabela/karty:

* termin,
* koty,
* status,
* cena.

### Zgody i retencja

Mniejsza sekcja techniczna:

* zgody,
* daty,
* wersja polityki,
* status retencji.

Nie mieszamy jej z najczęściej używanymi danymi.

---

# 21. Koty — lista

`/admin/pets`

Potrzebna przede wszystkim jako szybka wyszukiwarka całej bazy.

```text
Koty

[🔎 Imię kota lub właściciel]

Luna
Anna Kowalska
5 lat · kotka

Filemon
Jan Nowak
...
```

Filtry mogą ograniczać się początkowo do:

* właściciel,
* aktualnie w hotelu.

---

# 22. Kot — szczegóły

`/admin/pets/[id]`

Na górze:

```text
Luna
Anna Kowalska

● Aktualnie w hotelu · Box 5
```

Dalej sekcje:

* podstawowe dane,
* żywienie,
* leki,
* zdrowie,
* zachowanie,
* inne uwagi,
* historia rezerwacji,
* historia boksów.

Historia boksów w prostej osi:

```text
06.09 16:12    Box 4
09.09 09:35    Box 4 → Box 7
12.09 10:48    pobyt zakończony
```

---

# 23. Płatności

`/admin/payments`

To powinien być przede wszystkim **rejestr operacyjny**, a nie drugi ekran księgowy rezerwacji.

Tabela:

| Data  | Rezerwacja | Klient   |  Kwota | Metoda  | Administrator |
| ----- | ---------- | -------- | -----: | ------- | ------------- |
| 06 IX | KG-X42P    | Kowalska | 200 zł | gotówka | Anna          |
| 05 IX | KG-A19Z    | Nowak    | 500 zł | przelew | Maria         |

Filtry:

* okres,
* metoda,
* klient/rezerwacja.

Przycisk:

**Dodaj wpłatę**

najpierw wyszukuje rezerwację.

Najwygodniejszym miejscem dodawania wpłat pozostaje jednak szczegół rezerwacji.

---

# 24. Cennik

`/admin/pricing`

Desktop:

| Nazwa            | Cena / dzień | Na stronie | Aktywna |        |
| ---------------- | -----------: | ---------- | ------- | ------ |
| Z własną karmą   |       120 zł | ✓          | ✓       | Edytuj |
| Z karmą hotelu   |       140 zł | ✓          | ✓       | Edytuj |
| Stawka specjalna |       100 zł | —          | ✓       | Edytuj |

`[+ Dodaj pozycję]`

Edycja w drawerze lub modalu:

```text
Nazwa
[                         ]

Cena za dzień
[            ] zł

☑ Aktywna
☑ Widoczna na stronie

[Anuluj] [Zapisz]
```

Przy zmianie ceny:

> Zmiana nie wpłynie na istniejące rezerwacje.

To ważne, ponieważ rezerwacje przechowują snapshot stawki. 

Brak przycisku „Usuń” dla stawek historycznych.

---

# 25. Lokalizacje i boksy

`/admin/boxes`

Hierarchiczny layout:

```text
Lokalizacje i boksy                  [+ Lokalizacja]

☰ GNIAZDKO 1                         [Edytuj]
   Box 1                              [Edytuj]
   Box 2                              [Edytuj]
   Box 3                              [Edytuj]
   [+ Dodaj boks]

☰ GNIAZDKO 2
   Box 4
   Box 5
   [+ Dodaj boks]

☰ PARTER
...

☰ POKÓJ
...
```

Można przeciągać **lokalizacje**, ponieważ mają `sort_order`.

Nie sugerowałabym dragowania boxów w celu zmiany kolejności, ponieważ `boxes` celowo **nie mają `sort_order`**. 

Edycja boksu:

* nazwa,
* lokalizacja,
* notatka,
* aktywny/nieaktywny.

**Nie ma pola pojemność.**

---

# 26. Szablony e-mail

`/admin/email-templates`

Lista:

| Szablon               | Temat                       | Aktywny |        |
| --------------------- | --------------------------- | ------- | ------ |
| Otrzymanie zgłoszenia | Otrzymaliśmy zgłoszenie...  | ✓       | Edytuj |
| Potwierdzenie         | Potwierdzenie rezerwacji... | ✓       | Edytuj |
| Odrzucenie            | ...                         | ✓       | Edytuj |

Editor identyczny stylistycznie do kompozytora wiadomości.

Po lewej treść, po prawej **podgląd na przykładowych danych**.

Dostępne placeholdery pokazujemy jako klikalne chipy:

`{{customerFirstName}}`
`{{reservationReference}}`
`{{arrivalDate}}`
`{{departureDate}}`
`{{finalPrice}}`

Nie pozwalamy administratorowi wpisywać dowolnej logiki szablonowej.

---

# 27. CMS — struktura

Pod główną pozycją **Treści strony**:

```text
Treści
FAQ
Galeria
Komunikaty
```

Cennik pozostaje osobno, ponieważ technicznie jest źródłem danych dla rezerwacji oraz publicznej strony. 

---

# 28. Treści stron

`/admin/content/pages`

Lista:

```text
Strona główna               Opublikowana
Hotel / oferta              Opublikowana
Przed pobytem               Opublikowana
Regulamin                   Opublikowana
Kontakt                     Opublikowana
```

Kliknięcie → edytor.

Desktop:

```text
┌───────────────────────┬──────────────────────────┐
│ EDYCJA                │ PODGLĄD                  │
│                       │                          │
│ Tytuł                 │ render strony           │
│ Treść                 │                          │
│ SEO title             │                          │
│ SEO description       │                          │
└───────────────────────┴──────────────────────────┘

☑ Opublikowana

[Zapisz]
```

Mobile: osobne tryby **Edytuj / Podgląd**.

---

# 29. FAQ

`/admin/content/faq`

Lista pytań z możliwością przeciągania, ponieważ FAQ posiada `sort_order`.

```text
☰ Czy kot musi być zaszczepiony?       [Edytuj]
☰ Co należy przywieźć?                 [Edytuj]
☰ ...
```

Aktywność jako toggle.

---

# 30. Galeria

`/admin/content/gallery`

Siatka thumbnaili.

Każdy element pokazuje:

* zdjęcie,
* alt text,
* kategorię,
* aktywność.

Drag & drop do zmiany kolejności, ponieważ galeria ma `sort_order`.

Na mobile lista/kafelki po dwie kolumny.

Edycja:

* obraz,
* alt,
* podpis,
* kategoria,
* aktywny.

---

# 31. Komunikaty specjalne

`/admin/content/announcements`

Karty:

```text
Wzmożone zainteresowanie świętami
01.12 – 27.12
● Aktywny

[Edytuj]
```

Formularz:

* opcjonalny tytuł,
* treść,
* od,
* do,
* aktywny.

---

# 32. Eksporty

`/admin/exports`

Nie wymaga skomplikowanego dashboardu.

```text
Eksport rezerwacji

Zakres:
[01.09.2026] – [30.09.2026]

Status
[Wszystkie ▾]

Typ daty
● cały pobyt
○ przyjazd
○ odbiór

Rozliczenie
[Wszystkie ▾]

[Generuj XLSX]
```

Po prawej desktop / poniżej mobile:

> **Do eksportu: 73 rezerwacje**

Może być też oddzielna sekcja:

* eksport klientów,
* eksport kotów,

zgodnie z dokumentacją biznesową. 

---

# 33. Dziennik zmian

`/admin/audit`

Dokumentacja przewiduje append-only audit dla ważnych operacji. 

Proponuję osobną stronę, choć dokument nie wskazuje jej jednoznacznie w głównej nawigacji.

```text
Dziennik zmian

Data ▾  Administrator ▾  Rodzaj ▾  [Szukaj]

10:42   Anna
Zmiana ceny
Rezerwacja KG-X42P
680 zł → 720 zł

10:31   Maria
Przeniesienie kota
Luna: Box 4 → Box 7
```

Kliknięcie → szczegół z wartościami „przed / po”.

Strona całkowicie read-only.

---

# 34. Ustawienia systemu

`/admin/settings`

Tylko ustawienia faktycznie przewidziane przez `system_settings`:

### Retencja

```text
Klienci jednorazowi
[ 365 ] dni

Profile zachowane na przyszłość
[ 730 ] dni
```

### Popularne terminy

```text
☑ Pokazuj komunikat o dużym zainteresowaniu

Próg
[ 8 ] nakładających się rezerwacji
```

### Powiadomienia

```text
E-mail administratora
[ kontakt@... ]
```

Przy ustawieniach retencji powinien być wyraźny komunikat:

> Zmiana wpływa na automatyczne terminy anonimizacji danych.

---

# 35. Konto administratora / bezpieczeństwo

Potrzebny jest również niewielki ekran dostępny z profilu użytkownika:

`/admin/account`

Techniczna dokumentacja wymaga logowania e-mail + hasło i obsługi TOTP 2FA. 

Mockup:

```text
Moje konto

Gabriela
gabriela@...

HASŁO
[Zmień hasło]

UWIERZYTELNIANIE DWUSKŁADNIKOWE
● Aktywne
[Skonfiguruj ponownie]
```

Nie dodawałabym na tym etapie panelu zarządzania administratorami, ponieważ załączone dokumenty definiują tabelę `admin_users`, ale **nie opisują biznesowego workflow dodawania i zarządzania administratorami przez UI**.

---

# 36. Logowanie

Desktop i mobile bardzo proste:

```text
            [logo]

      Panel administratora

E-mail
[                    ]

Hasło
[                    ]

[      Zaloguj      ]
```

Po poprawnym haśle, jeżeli aktywne 2FA:

```text
Kod uwierzytelniający

[ _ _ _ _ _ _ ]

[Potwierdź]
```

Bez ozdobnych hero, zdjęć kotów czy marketingu.

---

# 37. Formularze i edycja — wspólny wzorzec

Dla całego panelu zastosowałabym trzy zasady.

### Mała zmiana → drawer/modal

Np.:

* wpłata,
* cena,
* przypisanie boksu,
* kontakt,
* zmiana statusu.

### Duża encja → osobna strona

Np.:

* rezerwacja,
* klient,
* kot,
* strona CMS.

### Destrukcyjne/istotne operacje → potwierdzenie z konkretną treścią

Nie:

> Czy na pewno?

Tylko:

> Anulować rezerwację KG-X42P na 6–12 września dla Luny i Meli?

---

# 38. Desktop vs mobile — zasada projektowa

Nie należy projektować osobno „pełnego desktopu” i „uboższego mobile”.

Funkcjonalność jest ta sama, zmienia się jej prezentacja:

| Desktop                      | Mobile                           |
| ---------------------------- | -------------------------------- |
| sidebar                      | bottom navigation                |
| tabela                       | karty                            |
| modal/drawer                 | bottom sheet / fullscreen dialog |
| 2 kolumny                    | 1 kolumna                        |
| drag & drop                  | tap + wybór                      |
| editor + preview obok siebie | editor → preview                 |
| szeroki kalendarz            | boksy/dni + poziomy scroll       |
| hover details                | tap details                      |

To odpowiada wymaganiu dokumentacji, aby panel był responsywny, miał alternatywny widok kart dla tabel oraz był w pełni używalny z telefonu. 

---

# 39. Cztery ekrany, które powinny dostać najwięcej pracy w mockupie

Jeżeli będziemy wykonywać mockupy etapami, priorytet powinien być taki:

### 1. Kalendarz boksów

To najbardziej specyficzny element Kociego Gniazdka i najtrudniejszy UX.

Trzeba pokazać:

**czas × lokalizacja × boks × rezerwacja × kot**.

### 2. Szczegół rezerwacji

To centralne miejsce całego workflow.

Musi spiąć:

status + koty + klienta + boksy + cenę + wpłaty + komunikację + historię.

### 3. Dashboard „Dzisiaj”

Musi odpowiadać na pytanie:

> Co dokładnie trzeba zrobić teraz i w ciągu najbliższych kilku godzin?

### 4. Mobile kalendarza i szczegółów rezerwacji

To nie może być jedynie „zmniejszony desktop”, ponieważ właśnie z tych ekranów administratorzy pomocniczy będą korzystać najczęściej.

---

# 40. Proponowany komplet ekranów do przygotowania w mockupach

Finalnie zestaw panelu wyglądałby tak:

```text
AUTH
01. Logowanie
02. Weryfikacja 2FA

OPERACJE
03. Dashboard / Dzisiaj
04. Rezerwacje — lista
05. Rezerwacja — szczegóły
06. Kalendarz boksów
07. Przeniesienie pobytu / kota
08. Kompozytor i podgląd e-maila

BAZA
09. Klienci
10. Klient — szczegóły
11. Koty
12. Kot — szczegóły
13. Płatności

ORGANIZACJA
14. Cennik
15. Lokalizacje i boksy
16. Szablony e-mail
17. Edycja szablonu e-mail

CMS
18. Strony
19. Edycja strony
20. FAQ
21. Galeria
22. Komunikaty

DANE / SYSTEM
23. Eksporty
24. Dziennik zmian
25. Ustawienia
26. Moje konto / 2FA
```

Do tego potrzebne są stany modalne/bottom-sheet, niekoniecznie osobne strony:

* przypisanie boksu,
* aktywacja,
* odrzucenie,
* anulowanie,
* check-in,
* zakończenie pobytu,
* zmiana terminu,
* zmiana ceny,
* dodanie wpłaty,
* przeniesienie pobytu,
* przeniesienie części pobytu,
* dodanie notatki kontaktowej,
* przygotowanie i podgląd e-maila.

---

## Dwie rzeczy, które warto uwzględnić przed zamknięciem specyfikacji implementacyjnej

**Pierwsza to planowanie boksów dla poszczególnych dni.** Zaproponowany UX dokładnie realizuje Twoje założenie „najpierw przenieś cały pobyt, potem ewentualnie część pobytu”, ale obecny model techniczny nie ma jeszcze jednoznacznego bytu reprezentującego *planowane* odcinki pobytu w różnych boksach.

**Druga to podgląd e-maila.** Obecny backend przewiduje automatyczne tworzenie wiadomości przy zmianach statusu.  Dla działań administratora proponuję zmienić ten workflow tak, aby zmiana statusu otwierała przygotowaną wiadomość, pozwalała ją przejrzeć/zmienić i dopiero po zatwierdzeniu tworzyła snapshot w outboxie. Automatyczne potwierdzenie otrzymania zgłoszenia od klienta może pozostać wyjątkiem, bo w tym momencie administrator nie uczestniczy jeszcze w procesie.

Poza tym obecna dokumentacja dobrze pokrywa zaproponowaną strukturę panelu i nie widzę potrzeby tworzenia dodatkowych dużych modułów.
