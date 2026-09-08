# Kocie Gniazdko 2.0
## Design

Na podstawie dokumentacji biznesowej i technicznej traktowałabym publiczną część Kociego Gniazdka 2.0 nie jak „stronę hotelową z formularzem”, ale jak **ciepłą stronę usługową, której głównym lejkiem jest bardzo prosty proces zgłoszenia pobytu**. Klient nie rezerwuje miejsca automatycznie: wysyła zgłoszenie, otrzymuje potwierdzenie jego przyjęcia, a administrator dopiero później potwierdza pobyt. To powinno być widoczne w całej architekturze informacji i szczególnie w samym formularzu. 

Jednocześnie publiczny interfejs nie może pokazywać kalendarza obłożenia, liczby wolnych miejsc, boksów ani lokalizacji wewnętrznych. Dla wybranego terminu może pojawić się najwyżej neutralna informacja o dużym zainteresowaniu. 

Poniżej proponuję plan, który można bezpośrednio potraktować jako brief do mockupów.

---

# 1. Ogólny charakter Kociego Gniazdka 2.0

Logo bardzo mocno określa kierunek. Nie próbowałabym go „modernizować” przez zestawienie ze sterylnym UI w rodzaju białych kart, szarych separatorów i typografii SaaS.

Nowa strona powinna być:

**ciepła → domowa → spokojna → zadbana → lekko retro → bardzo czytelna → współczesna funkcjonalnie.**

Nie powinna być:

**dziecinna → przesadnie „kocia” → luksusowo-hotelowa → minimalistycznie sterylna → przeładowana dekoracjami.**

Motyw koszyka, zieleni i pomarańczowego kota daje wystarczająco dużo charakteru. Nie potrzeba dodawać wszędzie łapek, uszu i sylwetek kotów.

---

# 2. Design system do mockupów

## Kolory

| Token        |     Kolor | Rola                                |
| ------------ | --------: | ----------------------------------- |
| Brand Green  | `#71942E` | główne CTA, linki, aktywne elementy |
| Leaf Green   | `#98CA6E` | delikatne powierzchnie i dekoracje  |
| Deep Green   | `#526F22` | hover, mocne zielone napisy         |
| Cat Orange   | `#EA8734` | akcenty informacyjne                |
| Basket Brown | `#966735` | ilustracje, linie, ikony            |
| Dark Brown   | `#44372C` | podstawowy kolor tekstu             |
| Sand         | `#D6A063` | dekoracje                           |
| Warm Cream   | `#FCFCFA` | tło główne                          |
| Warm Surface | `#F6F3EA` | alternatywne sekcje, karty          |
| Border       | `#DDD7CC` | obramowania                         |
| Muted text   | `#756C63` | tekst drugorzędny                   |

### Istotna zasada

**Pomarańczowy nie konkuruje z zielonym CTA.**

Pomarańczowy stosować do:

* małych wyróżnień,
* ikon,
* komunikatu „popularny termin”,
* dekoracyjnego podkreślenia,
* drobnych badge'y.

Przycisk „Rezerwuj” pozostaje zawsze zielony.

---

# 3. Typografia

Proponuję:

### Display / nagłówki

**Alegreya**

Do:

* H1,
* H2,
* większych cytatów,
* krótkich wyróżnień.

Daje marce dokładnie tę pensjonatowo-domową osobowość, którą już ma logo.

### UI / tekst

**Source Sans 3**

Do:

* akapitów,
* formularzy,
* menu,
* przycisków,
* FAQ,
* informacji pomocniczych.

Jest bardzo czytelny na telefonie, a jednocześnie mniej techniczny niż np. Inter.

Przykładowa hierarchia mobilna:

* H1: Alegreya 40–44 / 1.05
* H2: Alegreya 30–34
* H3: Alegreya 24–26
* Body L: Source Sans 3 18 / 1.55
* Body: 16 / 1.55
* Small: 14 / 1.45
* Button: 16–17 / semibold

Na desktopie przede wszystkim zwiększamy oddech i skalę nagłówków, nie zmniejszamy tekstu mobilnego.

---

# 4. Siatka i rytm

## Mobile — podstawowy mockup

Projektować najpierw na szerokości około **390 px**.

* gutter: 16 px
* sekcja od sekcji: 64–80 px
* odstępy wewnątrz sekcji: 24–32 px
* button height: minimum 48 px, preferowane 52–56 px
* input height: minimum 52 px
* radius kart: 16 px
* radius dużych zdjęć: 20–24 px

## Desktop

Mockup: około **1440 px**.

* max-width treści: 1180–1240 px
* gutter: minimum 32 px
* sekcje: około 96–120 px pionowego oddechu

Desktop powinien być **upscale'em mobilnego layoutu**.

Nie tworzyłabym alternatywnej desktopowej architektury strony.

---

# 5. Charakter komponentów

Karty nie powinny wyglądać jak typowe dashboardowe prostokąty.

Proponuję:

* Warm Surface zamiast czystej bieli,
* cienki Border,
* delikatny cień tylko dla elementów interaktywnych,
* duże zaokrąglenia,
* nagłówki Alegreya,
* czasem niewielka linia lub ilustracja w Basket Brown.

Sekcje można rozdzielać subtelnymi organicznymi detalami inspirowanymi:

* liściem,
* linią koszyka,
* delikatną falą.

Bez ornamentalnego przeładowania.

---

# 6. Zdjęcia

Fotografia powinna być jednym z głównych nośników emocji.

Najlepiej:

* realne zdjęcia Kociego Gniazdka,
* koty w przestrzeni hotelu,
* światło dzienne,
* bez ciężkich filtrów.

Na mobile większość zdjęć:

* 4:3,
* 3:2,
* duże, niemal na całą szerokość.

Na desktopie można wykorzystywać asymetrię, np. jedno duże zdjęcie + dwa mniejsze.

---

# 7. Nagłówek strony

## Mobile

```text
┌──────────────────────────────┐
│ ewentualny komunikat         │
├──────────────────────────────┤
│ LOGO                 ☰       │
└──────────────────────────────┘
```

Dotychczasowe poziome logo jest za szerokie na telefon.

Do 2.0 warto przygotować oficjalny wariant mobilny:

```text
[kot w koszyku]
Kocie Gniazdko
```

lub znak po lewej + nazwa w dwóch liniach.

Menu:

* Hotel
* Galeria
* Cennik
* Przed pobytem
* Regulamin
* Kontakt

Na dole menu mocny:

**Rezerwuj**

oraz:

**Zadzwoń**

## Desktop

```text
LOGO    Hotel  Galeria  Cennik  Przed pobytem  Regulamin  Kontakt    [Rezerwuj]
```

Bez gigantycznego headera.

---

# 8. Mobile sticky CTA

Na zwykłych stronach publicznych proponuję dolny pasek:

```text
┌─────────────────────────────────┐
│  ☎       [     Rezerwuj     ]   │
└─────────────────────────────────┘
```

Telefon jako ikona + dostępny label dla czytnika ekranowego.

Na ekranach formularza rezerwacji pasek znika, żeby nie konkurował z przyciskiem „Dalej”.

---

# 9. Stopka

Wspólna dla wszystkich stron:

```text
Kocie Gniazdko

krótkie zdanie o hotelu

[Zadzwoń]   [Napisz do nas]

Hotel
Galeria
Cennik
Przed pobytem
Regulamin
Kontakt

Polityka prywatności
© Kocie Gniazdko
```

Na desktopie: 3–4 kolumny.

Na mobile: pojedyncza spokojna kolumna.

---

# 10. Mapa publicznych ekranów

Główna struktura wynikająca bezpośrednio ze specyfikacji to: 

| Ekran                          | Funkcja                |
| ------------------------------ | ---------------------- |
| `/`                            | Strona główna          |
| `/hotel`                       | Hotel / oferta         |
| `/galeria`                     | Galeria                |
| `/cennik`                      | Cennik                 |
| `/przed-pobytem`               | Informacje + FAQ       |
| `/regulamin`                   | Regulamin              |
| `/kontakt`                     | Kontakt                |
| `/rezerwacja`                  | Zgłoszenie rezerwacji  |
| rezultat rezerwacji            | Potwierdzenie wysłania |
| dostęp do danych klienta       | Magic link             |
| ekran błędnego/wygasłego linku | Obsługa magic linku    |
| 404                            | Strona systemowa       |

Dodatkowo dokumentacja wymaga zgody związanej z prywatnością, więc layout należy przygotować także pod **Politykę prywatności**, choć jej konkretna treść ani slug nie zostały w dokumentacji biznesowej zdefiniowane.

---

# 11. STRONA GŁÓWNA

## Cel

W ciągu pierwszych kilkunastu sekund odpowiedzieć:

1. czym jest Kocie Gniazdko,
2. jak wygląda sposób rezerwacji,
3. gdzie znaleźć ceny i informacje,
4. jak wysłać zgłoszenie.

Nie próbowałabym na homepage opowiadać całej historii hotelu.

---

## 11.1 Hero

### Mobile

```text
[etykieta]

2–3 linie krótkiego opisu

[       Rezerwuj       ]

Zadzwoń     Napisz do nas

[duże zdjęcie]
```

Istotne: przy CTA niewielkie zdanie:

**„Rezerwacja rozpoczyna się od wysłania zgłoszenia.”**

To od razu ustawia właściwe oczekiwanie.

### Desktop

Układ 55/45:

```text
tekst + CTA       duże zdjęcie
```

Hero nie powinno mieć pełnej wysokości viewportu.

Chcemy szybko pokazać dalszą zawartość.

---

## 11.2 „Jak wygląda rezerwacja”

Bardzo ważna sekcja.

Trzy jasne kroki wynikające z procesu biznesowego: 

```text
01  Wybierasz termin
     ↓
02  Wysyłasz zgłoszenie
     ↓
03  Potwierdzamy pobyt
```

Na mobile pionowa ścieżka.

Na desktopie trzy elementy w rzędzie.

Kluczowa korzyść UX: klient od razu rozumie, że kliknięcie „Rezerwuj” nie daje automatycznego potwierdzenia.

---

## 11.3 „Poznaj Kocie Gniazdko”

Duże zdjęcie + krótki fragment treści CMS.

```text
[zdjęcie]

H2 Poznaj Kocie Gniazdko

2–3 krótkie akapity

[Dowiedz się więcej]
```

Desktop: naprzemienny układ zdjęcie/tekst.

---

## 11.4 Cennik — teaser

Nie kopiować cennika ręcznie.

Karty pobierają aktualne publiczne stawki.

Przy dwóch obecnych pozycjach:

```text
Cennik

┌──────────────────────┐
│ Z własną karmą       │
│                      │
│ 50 zł / dzień        │
└──────────────────────┘

┌──────────────────────┐
│ Z karmą hotelu       │
│                      │
│ 60 zł / dzień        │
└──────────────────────┘

```

Dane muszą pochodzić z aktywnych, publicznych pozycji cennika. 

---

## 11.5 Galeria — teaser

Mobile:

```text
Galeria

[      szerokie zdjęcie       ]

[ zdjęcie ] [ zdjęcie ]

[Zobacz galerię]
```

Desktop może mieć bardziej organiczny układ 1+2.

---

## 11.6 „Przed pierwszym pobytem”

Krótka sekcja na Warm Surface.

Trzy wejścia:

* Co warto wiedzieć
* FAQ
* Regulamin

To ma być bardziej nawigacja niż duży blok treści.

---

## 11.7 FAQ teaser

3–4 pierwsze pytania w accordionie.

Na końcu:

**Wszystkie pytania i odpowiedzi →**

---

## 11.8 Kontakt + final CTA

Ostatnia silna sekcja:

```text
Masz pytanie przed wysłaniem zgłoszenia?

[Napisz do nas]
[Zadzwoń]

lub

[       Rezerwuj       ]
```

---

# 12. HOTEL / OFERTA

Ta strona powinna sprzedawać **sposób opieki i charakter miejsca**, nie system rezerwacyjny.

Treści są zarządzane przez CMS, więc design powinien tolerować zmianę długości tekstu. 

## Kolejność mockupu

### 12.1 Intro

```text
Hotel dla kotów

H1 [główny tytuł CMS]

krótkie wprowadzenie

[duże zdjęcie]
```

Mniejszy hero niż na homepage.

---

## 12.2 Główny opis

Tekst + fotografia.

Na mobile:

```text
H2
tekst
tekst
[zdjęcie]
```

Na desktopie:

```text
tekst        zdjęcie
```

---

## 12.3 Sekcje opieki

Zamiast ograniczać CMS do jednej ściany tekstu, wizualnie pozwoliłabym na serię modułów:

```text
H2 temat

[ikona/mała ilustracja]
krótki opis
```

lub:

```text
zdjęcie | tekst
tekst   | zdjęcie
```

Treści i fakty pozostają po stronie CMS.

---

## 12.4 Duży blok zdjęciowy

Moment oddechu:

```text
[               fotografia               ]
```

opcjonalny krótki podpis.

---

## 12.5 „Jak zarezerwować pobyt”

Skrócona 4-etapowa ścieżka.

Nie powielamy formularza.

---

## 12.6 Final CTA

**Rezerwuj**

* „Masz pytanie? Zadzwoń / Napisz do nas”.

---

# 13. GALERIA

Galeria powinna być przede wszystkim wizualna.

Schemat danych obsługuje kategorię, podpis i kolejność zdjęcia. 

## 13.1 Nagłówek

```text
Galeria

H1 Zobacz Kocie Gniazdko

krótkie intro
```

---

## 13.2 Kategorie

Jeżeli administrator przypisze zdjęcia do kategorii:

```text
Wszystkie   [Kategoria]   [Kategoria]
```

Jako scrollowalny rząd chipów na mobile.

Nie tworzyłabym wielopoziomowych filtrów.

---

## 13.3 Grid

Mobile:

**2 kolumny**.

Od czasu do czasu jedno zdjęcie może zajmować 2 kolumny.

Desktop:

3–4 kolumny z lekką różnicą proporcji.

Nie klasyczny chaotyczny Pinterest masonry — trudniej go przewidywalnie skanować na telefonie.

---

## 13.4 Lightbox

Po dotknięciu:

* zdjęcie na dużym ekranie,
* swipe lewo/prawo,
* następne/poprzednie,
* zamknięcie,
* podpis, jeśli istnieje.

Bez automatycznego slideshow.

---

## 13.5 CTA

Po galerii:

> Chcesz zaplanować pobyt?

**Rezerwuj**

---

# 14. CENNIK

Ta strona powinna być ekstremalnie prosta.

## 14.1 Intro

```text
Cennik

H1 Proste zasady pobytu

krótki tekst
```

---

## 14.2 Stawki

Każda aktywna publiczna pozycja:

```text
┌─────────────────────────────┐
│ NAZWA                       │
│                             │
│ 00 zł                       │
│ za dzień pobytu             │
└─────────────────────────────┘
```

Przy dwóch pozycjach:

* mobile — jedna pod drugą,
* desktop — dwie obok siebie.

Nie wyróżniać jednej jako „najpopularniejsza”, jeśli biznes tego nie definiuje.

---

## 14.3 „Jak liczymy koszt pobytu”

To warto pokazać publicznie jako prostą zasadę:

```text
liczba dni pobytu
×
stawka za dzień
=
koszt pobytu
```

Dokumentacja definiuje dzień rozliczeniowy na podstawie różnicy dat, a godziny przyjazdu/odbioru nie wpływają na jego liczbę. 

Nie budowałabym na tym etapie publicznego kalkulatora, ponieważ nie został przewidziany w zaakceptowanym zakresie.

---

## 14.4 Ważna informacja

Neutralna karta:

> Wysłanie zgłoszenia rozpoczyna proces rezerwacji. Termin potwierdzamy po kontakcie z klientem.

To ważniejsze niż typowe hotelowe „Sprawdź dostępność”.

---

## 14.5 CTA

**Rezerwuj**

* kontakt.

---

# 15. PRZED POBYTEM / FAQ

Proponuję potraktować tę stronę jako centrum informacji.

## 15.1 Intro

```text
Przed pobytem

H1 Wszystko, co warto wiedzieć

krótkie intro
```

---

## 15.2 Treść „przed pobytem”

Sekcje CMS.

Dla długich treści:

* H2,
* krótki akapit,
* listy,
* ewentualna informacyjna karta.

Maksymalna szerokość kolumny tekstowej około 680–720 px również na desktopie.

---

## 15.3 FAQ

Następnie:

```text
Najczęstsze pytania

⌄ Pytanie 1
⌄ Pytanie 2
⌄ Pytanie 3
...
```

Jeden accordion otwarty lub wiele — oba modele są poprawne; wybrałabym możliwość otwarcia kilku jednocześnie.

Schema FAQ zawiera pytanie, odpowiedź i kolejność, ale nie zawiera kategorii. Nie projektowałabym więc obecnie kategorii ani wyszukiwarki FAQ. 

---

## 15.4 Nadal masz pytanie?

```text
Nie znalazłaś/eś odpowiedzi?

[Zadzwoń]
[Napisz do nas]
```

---

# 16. REGULAMIN

Nie traktować go jak surowego dokumentu prawnego w małej czcionce.

## Mobile

```text
Regulamin

H1 Regulamin pobytu

[krótki wstęp]

1. Nagłówek
tekst

2. Nagłówek
tekst
...
```

Rozmiar tekstu minimum 16 px.

Duże odstępy pomiędzy sekcjami.

---

## Desktop

Wąska kolumna treści około 720–800 px.

Jeżeli regulamin ma dużo nagłówków, po lewej można dodać sticky spis treści.

Na telefonie ten sam spis może być pojedynczym przyciskiem:

**Przejdź do sekcji ↓**

---

## Dół strony

```text
Masz pytanie dotyczące regulaminu?
[Skontaktuj się]
```

oraz CTA Rezerwuj.

---

# 17. KONTAKT

Strona kontaktowa powinna być przede wszystkim **użytkowa i bardzo czytelna na telefonie**. Klient ma bez szukania znaleźć sposób kontaktu, adres hotelu, trasę dojazdu oraz dane do przelewu. Formularz kontaktowy ma służyć do zwykłych pytań i wiadomości — nie może zastępować formularza zgłoszenia rezerwacji.

Kolejność sekcji na mobile:

```text
Hero
↓
Telefon + e-mail
↓
Adres + mapa dojazdu
↓
Dane do przelewu
↓
Formularz kontaktowy
↓
CTA Rezerwuj
```

Na desktopie zachowujemy tę samą kolejność logiczną, ale część modułów można zestawić obok siebie w dwóch kolumnach.

---

## 17.1 Hero

Hero jest krótszy niż na stronie głównej i nie powinien zajmować całego pierwszego ekranu.

### Mobile

```text
Kontakt

H1 Skontaktuj się z nami

Masz pytanie dotyczące pobytu,
przygotowania kota albo rezerwacji?
Zadzwoń, napisz lub skorzystaj
z formularza poniżej.
```

Bez zdjęcia hero — na stronie kontaktowej priorytetem jest szybkie przejście do informacji użytkowych.

### Desktop

Treść pozostaje w wąskiej kolumnie, maksymalnie około 700 px. Sekcja może mieć subtelny dekoracyjny detal w kolorze Leaf Green / Basket Brown, ale bez dużej ilustracji konkurującej z danymi kontaktowymi.

---

## 17.2 Bezpośredni kontakt

Pierwsza właściwa sekcja powinna eksponować dwa najprostsze kanały kontaktu.

### Mobile

Dwie duże karty jedna pod drugą:

```text
┌───────────────────────────────┐
│ ✉  Napisz do nas             │
│                               │
│ adres@email.pl                │
│                               │
│ Otwórz pocztę              →  │
└───────────────────────────────┘

┌───────────────────────────────┐
│ ☎  Zadzwoń                    │
│                               │
│ +48 XXX XXX XXX               │
│                               │
│ Zadzwoń teraz              →  │
└───────────────────────────────┘
```

Cała karta jest klikalna, nie tylko sam numer lub adres.

Karty:

* tło `Warm Surface`,
* border `Border`,
* radius 16 px,
* ikona w `Basket Brown`,
* główna akcja / arrow w `Brand Green`,
* minimum 56 px wysokości dla klikalnych części.

Jeżeli administrator publikuje godziny kontaktu, można pokazać je bezpośrednio pod kartami jako spokojny tekst pomocniczy:

```text
Telefonicznie jesteśmy dostępni:
[godziny kontaktu z CMS]
```

### Desktop

Dwie karty obok siebie w równych kolumnach.

---

## 17.3 Adres i mapa dojazdu

Adres hotelu powinien być pełnym, samodzielnym blokiem — nie drobną linią tekstu w stopce.

### Mobile

Najpierw karta adresowa:

```text
H2 Jak do nas trafić

┌───────────────────────────────┐
│ ⌖  Kocie Gniazdko            │
│                               │
│ [ulica i numer]               │
│ [kod pocztowy, miejscowość]   │
│                               │
│ [ Wyznacz trasę ]             │
└───────────────────────────────┘
```

Pod nią mapa Google Maps na niemal pełną szerokość ekranu:

```text
┌───────────────────────────────┐
│                               │
│        GOOGLE MAPS            │
│                               │
│        znacznik hotelu        │
│                               │
└───────────────────────────────┘
```

Proporcja mapy na mobile: około **4:3** lub **16:10**, minimum około 260–300 px wysokości.

Mapa:

* pokazuje jeden znacznik — lokalizację Kociego Gniazdka,
* nie pokazuje żadnych wewnętrznych lokalizacji ani boksów,
* ma wyraźnie zaznaczony punkt docelowy,
* nie powinna być przykrywana dekoracjami,
* pod mapą pozostaje tekstowy adres, aby lokalizacja była dostępna również bez interakcji z mapą.

Przycisk **Wyznacz trasę** otwiera lokalizację w Google Maps / domyślnej aplikacji mapowej urządzenia.

Na telefonie należy uważać, aby osadzona mapa nie powodowała przypadkowego przejmowania scrollowania całej strony. Jeżeli embed utrudnia przewijanie, interakcję z mapą można aktywować dopiero po tapnięciu.

### Desktop

Układ 40/60:

```text
┌─────────────────────┐  ┌──────────────────────────────────┐
│ H2 Jak do nas trafić│  │                                  │
│                     │  │                                  │
│ pełny adres         │  │          GOOGLE MAPS             │
│                     │  │                                  │
│ [Wyznacz trasę]     │  │                                  │
└─────────────────────┘  └──────────────────────────────────┘
```

Mapa powinna być wizualnie większym elementem, ale karta adresowa pozostaje w pełni czytelna bez niej.

---

## 17.4 Dane do przelewu

Dane bankowe powinny być łatwe do znalezienia, ale nie powinny wyglądać jak bramka płatnicza. System nadal nie obsługuje płatności online — jest to wyłącznie informacja umożliwiająca wykonanie tradycyjnego przelewu poza stroną.

Sekcja na `Warm Surface` lub w osobnej dużej karcie.

### Mobile

```text
H2 Dane do przelewu

┌───────────────────────────────┐
│ Odbiorca                      │
│ [nazwa odbiorcy]              │
│                               │
│ Numer konta                   │
│ [00 0000 0000 0000 0000      │
│  0000 0000]                   │
│                               │
│ [ Kopiuj numer konta ]        │
│                               │
│ Bank                          │
│ [nazwa banku — jeśli podawana]│
│                               │
│ Tytuł przelewu                │
│ [instrukcja z CMS]            │
└───────────────────────────────┘
```

Numer rachunku:

* duży i bardzo czytelny,
* podzielony wizualnie na grupy cyfr,
* możliwy do zaznaczenia,
* z osobnym przyciskiem **Kopiuj numer konta**.

Po skopiowaniu przycisk na krótko zmienia stan na:

```text
✓ Skopiowano
```

Nie używać pomarańczowego jako koloru przycisku — akcja kopiowania jest sekundarna i może mieć styl outline w `Brand Green`.

Jeżeli dokładny sposób opisywania przelewu jest ustalany przez administratora, tekst przy **Tytuł przelewu** powinien być treścią konfigurowalną, a nie zaszytą na stałe w mockupie.

### Desktop

Karta może mieć szerokość około 600–700 px i pozostać pojedynczym, spokojnym blokiem. Nie ma potrzeby rozciągania danych bankowych na całą szerokość ekranu.

---

## 17.5 Formularz kontaktowy

Formularz jest przeznaczony do pytań i zwykłego kontaktu. Nie powinien zbierać kompletu danych potrzebnych do rezerwacji ani tworzyć alternatywnego procesu zgłoszenia pobytu.

Nad formularzem:

```text
H2 Napisz do nas

Jeśli wolisz wiadomość, wypełnij krótki
formularz. Odpowiemy na podany adres e-mail.
```

### Pola

Minimalny zestaw:

```text
Imię
[                               ]

E-mail
[                               ]

Telefon — opcjonalnie
[                               ]

Wiadomość
[                               ]
[                               ]
[                               ]
[                               ]

☐ Akceptuję zasady przetwarzania danych
  opisane w Polityce prywatności.

[        Wyślij wiadomość        ]
```

Nie dodawać do formularza:

* dat pobytu,
* danych kota,
* wyboru stawki,
* danych do rezerwacji.

Jeśli użytkownik chce zgłosić pobyt, powinien przejść przez główny formularz **Rezerwuj**.

### Zachowanie formularza

* wszystkie etykiety są stale widoczne nad polami — placeholder nie zastępuje labela,
* pole wiadomości ma minimum około 140–160 px wysokości na mobile,
* `E-mail` jest wymagany,
* `Telefon` jest opcjonalny,
* `Wiadomość` jest wymagana,
* wymagane zgody są walidowane przed wysłaniem,
* błędy pojawiają się bezpośrednio przy polach,
* po próbie wysłania focus przechodzi do pierwszego błędnego pola,
* przycisk podczas wysyłki ma stan loading i jest zabezpieczony przed wielokrotnym submittem.

Przykład błędu:

```text
E-mail
[ błędny-adres                ]
! Wpisz poprawny adres e-mail.
```

### Stan sukcesu

Po poprawnym wysłaniu nie przenosimy użytkownika na osobną stronę. Formularz może zostać zastąpiony spokojną kartą sukcesu:

```text
┌───────────────────────────────┐
│ ✓ Wiadomość została wysłana   │
│                               │
│ Dziękujemy za kontakt.        │
│ Odpowiemy na podany adres     │
│ e-mail.                       │
└───────────────────────────────┘
```

Jeżeli wysyłka się nie powiedzie:

```text
Nie udało się wysłać wiadomości.
Spróbuj ponownie lub skontaktuj się
z nami telefonicznie / e-mailem.

[ Spróbuj ponownie ]
```

Nie kasować wpisanej wiadomości po błędzie wysyłki.

### Desktop

Formularz nie powinien rozciągać się na pełne 1200 px. Maksymalna szerokość samej kolumny formularza około 680–760 px.

Możliwy układ:

```text
┌──────────────────────────────┐   ┌───────────────────────┐
│ H2 Napisz do nas             │   │ Wolisz bezpośrednio?  │
│                              │   │                       │
│ [formularz]                  │   │ ☎ numer telefonu      │
│                              │   │ ✉ adres e-mail        │
│                              │   │                       │
│                              │   │ [Zadzwoń]             │
└──────────────────────────────┘   └───────────────────────┘
```

Prawa kolumna jest pomocnicza i wizualnie lżejsza od formularza.

---

## 17.6 CTA rezerwacji

Na końcu strony kontaktowej powinno znaleźć się wyraźne rozdzielenie zwykłego kontaktu od zgłoszenia pobytu.

```text
┌───────────────────────────────┐
│ Planujesz pobyt kota?         │
│                               │
│ Formularz kontaktowy służy    │
│ do pytań. Zgłoszenie pobytu   │
│ wyślij przez formularz        │
│ rezerwacji.                   │
│                               │
│ [        Rezerwuj        ]    │
└───────────────────────────────┘
```

Karta może otrzymać delikatne tło `Leaf Green`, a **Rezerwuj** pozostaje głównym zielonym CTA.

---

## 17.7 Kolejność i layout desktopowy

Na desktopie strona powinna pozostać stosunkowo zwarta. Proponowany układ:

```text
Hero

[ Telefon ] [ E-mail ]

[ Adres 40% ] [ Mapa 60% ]

[ Dane do przelewu ]

[ Formularz kontaktowy 65% ] [ kontakt pomocniczy 35% ]

[ CTA Rezerwuj ]
```

Nie układać mapy, danych bankowych i formularza w trzy równorzędne kolumny — każda z tych sekcji ma inną funkcję i powinna mieć własną wyraźną hierarchię.

---

## 17.8 Mobile i dostępność

Szczególnie ważne dla tej strony:

* numer telefonu korzysta z linku `tel:`,
* adres e-mail korzysta z `mailto:`,
* przycisk wyznaczania trasy ma jednoznaczny dostępny label,
* mapa nie może być jedynym sposobem przekazania adresu,
* dane bankowe są dostępne jako prawdziwy tekst, nie jako obraz,
* przycisk kopiowania potwierdza wykonanie akcji również tekstowo, nie tylko zmianą koloru,
* formularz ma poprawne `autocomplete` dla imienia, e-maila i telefonu,
* komunikat sukcesu i błędu wysyłki jest ogłaszany technologiom asystującym,
* dolny sticky CTA **Rezerwuj** może pozostać na stronie, ale nie powinien zasłaniać przycisku **Wyślij wiadomość** — podczas przewijania formularza należy zapewnić odpowiedni dolny odstęp.

---

# 18. REZERWACJA — NAJWAŻNIEJSZY EKRAN MOBILE

To tutaj poświęciłabym najwięcej czasu projektowego.

Nie robiłabym jednego bardzo długiego formularza.

Proponuję **5 kroków**:

```text
1 Termin
2 Pobyt
3 Twoje dane
4 Koty
5 Podsumowanie
```

Cały proces opisany w dokumentacji można bezpiecznie odwzorować w takim układzie. 

---

# 19. Nagłówek formularza

Mobile:

```text
‹ Wróć                 Kocie Gniazdko

Zgłoszenie rezerwacji

Krok 1 z 5
●────○────○────○────○
```

Nie pokazujemy pełnych pięciu nazw kroków na wąskim telefonie.

Na desktopie:

```text
Termin — Pobyt — Twoje dane — Koty — Podsumowanie
```

---

# 20. KROK 1 — Termin

```text
Kiedy planujesz pobyt?

Przyjazd
[ Data             ]
[ Preferowana godzina ]

Odbiór
[ Data             ]
[ Preferowana godzina ]

[           Dalej           ]
```

Date picker powinien być natywny lub bardzo dobrze zoptymalizowany pod mobile.

### Popularny termin

Po wybraniu zakresu backend może zwrócić wyłącznie boolean `popular`. 

Jeżeli `true`:

```text
┌──────────────────────────────┐
│ ● Ten termin cieszy się      │
│   dużym zainteresowaniem.    │
│                              │
│ Warto wysłać zgłoszenie      │
│ możliwie wcześnie.           │
└──────────────────────────────┘
```

Delikatny pomarańczowy akcent.

Nie:

* „zostały 2 miejsca”,
* „prawie pełne”,
* diagram obłożenia,
* zielone/czerwone dni,
* wybór boksu.

---

# 21. KROK 2 — Pobyt / stawka

```text
Wybierz opcję pobytu

○ Z własną karmą
  XX zł / dzień

○ Z karmą hotelu
  XX zł / dzień

[ Wstecz ]    [ Dalej ]
```

Cała karta stawki jest tap targetem.

Wybrana:

* zielone obramowanie,
* delikatne Leaf Green tło,
* check.

Formularz przesyła wyłącznie identyfikator stawki; cena jest ponownie sprawdzana po stronie serwera. 

---

# 22. KROK 3 — Twoje dane

```text
Twoje dane

Imię
[                    ]

Nazwisko
[                    ]

E-mail
[                    ]

Telefon
[                    ]
```

Poniżej subtelna opcja:

**„Mam już zapisane dane w Kocim Gniazdku”**

→ prowadzi do magic-link flow.

Nie próbować automatycznie rozpoznawać istniejącego klienta po adresie e-mail — specyfikacja tego wyraźnie zabrania. 

---

# 23. KROK 4 — Koty

To potencjalnie najdłuższy etap.

Nie pokazujemy od razu wszystkich kilkunastu pól.

## Kot 1

```text
Kot 1

Imię kota
[                    ]

Płeć
[                    ]

Rasa
[                    ]

Data urodzenia
lub
Opis wieku

Czy kot jest wykastrowany /
wysterylizowany?
○ Tak ○ Nie ○ Nie wiem
```

Następnie grupy rozwijane:

### Żywienie

* sposób żywienia,
* instrukcje karmienia.

### Zdrowie i leki

* leki,
* informacje zdrowotne.

### Zachowanie

* informacje o zachowaniu,
* pozostałe uwagi.

W ten sposób jeden kot nie staje się 1,5-ekranową ścianą pól.

Dostępne dane wynikają bezpośrednio z modelu profilu kota. 

---

## Dodawanie kolejnego kota

Duży sekundarny przycisk:

**+ Dodaj kolejnego kota**

Po dodaniu:

```text
Kot 1   ✓
Kot 2   edytowany
```

Każdy profil jako accordion/card.

Minimum jeden kot jest wymagany. 

---

# 24. KROK 5 — Podsumowanie i zgody

Najpierw zwięzłe podsumowanie.

```text
Termin
12–16 października
Edytuj

Opcja pobytu
Z własną karmą
Edytuj

Dane
Anna Kowalska
...
Edytuj

Koty
Misia
Frodo
Edytuj
```

---

## 24.1 Przechowywanie danych

Dwie duże radio-cards:

```text
○ Zachowaj moje dane na przyszłość

Przy kolejnej rezerwacji będzie można
uzyskać do nich dostęp przez bezpieczny
link wysłany e-mailem.
```

```text
○ Tylko na potrzeby tej rezerwacji

Dane zostaną wykorzystane do obsługi
zgłoszenia i później objęte retencją.
```

To dokładnie odpowiada dwóm trybom `ONE_TIME` i `KEEP_FOR_FUTURE`. 

---

## 24.2 Zgody

Checkboxy z wyraźnymi linkami.

Nie upychać całej polityki prywatności obok checkboxa.

---

## 24.3 Kluczowy komunikat

Tuż przed przyciskiem:

```text
Wysłanie formularza nie oznacza jeszcze
potwierdzenia pobytu.

Po otrzymaniu zgłoszenia skontaktujemy się
z Tobą telefonicznie lub e-mailowo.
```

---

## 24.4 Submit

Duży przycisk:

**Wyślij zgłoszenie**

Nie:

* „Zapłać”,
* „Potwierdź rezerwację”,
* „Zarezerwuj teraz”.

W nagłówkach i marketingowych CTA możemy pozostać przy ustalonym **Rezerwuj**, natomiast ostatni przycisk formularza powinien precyzyjnie mówić, co faktycznie robi.

---

# 25. Walidacja formularza

Nigdy ogólny komunikat:

> W formularzu są błędy.

bez wskazania pól.

Powinno być:

```text
E-mail
[ błędna wartość        ]
! Wpisz poprawny adres e-mail.
```

Po próbie przejścia dalej:

* focus na pierwsze błędne pole,
* error summary na początku kroku,
* błędy pozostają również przy konkretnych polach.

---

# 26. POTWIERDZENIE WYSŁANIA ZGŁOSZENIA

Osobny ekran.

```text
✓

Dziękujemy

Otrzymaliśmy Twoje zgłoszenie.

Numer zgłoszenia
KG-XXXXXX

Co dalej?

1. Sprawdzimy zgłoszenie.
2. Skontaktujemy się z Tobą.
3. Po potwierdzeniu pobyt stanie się
   aktywną rezerwacją.

Na podany adres wysłaliśmy potwierdzenie.

[Wróć na stronę główną]

Masz pytanie?
[Zadzwoń]
```

Publicznie używany jest losowy kod referencyjny, a nie wewnętrzne ID rezerwacji. 

---

# 27. POWRACAJĄCY KLIENT — MAGIC LINK

To nie musi być pozycja w głównym menu.

Wejście przede wszystkim z formularza rezerwacji:

**Mam już zapisane dane**

---

## 27.1 Żądanie linku

```text
Wróć do rezerwacji

H1 Użyj zapisanych danych

Podaj adres e-mail użyty wcześniej
w Kocim Gniazdku.

E-mail
[                     ]

[Wyślij link]
```

---

## 27.2 Stan po submit

Niezależnie od tego, czy konto istnieje:

```text
Sprawdź swoją skrzynkę

Jeśli podany adres jest zapisany w systemie,
wysłaliśmy wiadomość z linkiem.
```

To zachowanie jest bezpośrednio wymagane ze względów bezpieczeństwa. 

---

## 27.3 Poprawny magic link

Po wejściu:

```text
Witaj ponownie

Twoje dane
[...]

Twoje koty

[Misia]
[Frodo]

[Użyj danych do zgłoszenia]
```

Cel: wrócić z istniejącymi danymi do procesu rezerwacji.

Nie budowałabym tu osobnego rozbudowanego „konta użytkownika”. Dokumentacja przewiduje lekki passwordless flow, nie typowy portal klienta. 

---

## 27.4 Wygasły / użyty link

```text
Ten link nie jest już aktywny.

Dla bezpieczeństwa linki działają tylko
przez ograniczony czas i mogą być użyte raz.

[Wyślij nowy link]

[Wróć do rezerwacji]
```

---

# 28. POLITYKA PRYWATNOŚCI

Tutaj zaznaczyłabym jedno miejsce do uzupełnienia w projekcie.

System przewiduje zgodę `PRIVACY` i wersjonowanie zgód, ale dokumentacja nie wymienia osobnej strony prywatności na liście głównych publicznych stron. 

UI powinna więc zostać zaprojektowana od razu.

Layout identyczny jak Regulamin:

* H1,
* wąska kolumna,
* czytelne sekcje,
* spis treści na desktopie,
* link w stopce,
* link przy zgodzie w rezerwacji.

Treść prawna to osobny zakres.

---

# 29. 404

Nie robiłabym suchego:

> Page not found.

Raczej:

```text
[mała ilustracja kota/koszyka]

Ups, tego miejsca nie znaleźliśmy.

Strona mogła zostać przeniesiona
albo adres jest nieprawidłowy.

[Strona główna]
[Rezerwuj]
```

To także wymaganie techniczne projektu — poprawna obsługa 404. 

---

# 30. KOMUNIKATY SPECJALNE

`site_announcements` pozwalają publikować czasowe informacje. 

Design:

```text
┌─────────────────────────────────┐
│  ●  Treść krótkiego komunikatu  │
└─────────────────────────────────┘
```

Umiejscowienie:

* nad headerem,
* albo pod headerem przed hero.

Nigdy modal po wejściu na stronę.

Jeżeli tekst jest dłuższy:

**Czytaj więcej**

---

# 31. Responsywny upscale na desktop

Najważniejsza zasada całego projektu:

### nie robimy

```text
desktop
↓
upychamy
↓
mobile
```

### robimy

```text
mobile
↓
zwiększamy przestrzeń
↓
łączymy sąsiednie moduły w kolumny
↓
desktop
```

Przykładowo:

Mobile:

```text
H2
tekst
zdjęcie
```

Desktop:

```text
tekst          zdjęcie
```

ale:

* kolejność informacji,
* hierarchia,
* CTA,
* logika

pozostają identyczne.

---

# 32. Elementy szczególnie ważne na telefonie

W mockupie mobile konsekwentnie zastosowałabym:

* przyciski minimum 48–52 px,
* wszystkie podstawowe akcje w zasięgu kciuka,
* brak hover-dependent interaction,
* pola formularza w jednej kolumnie,
* prawidłowe typy klawiatury dla telefonu/e-maila,
* żadnych miniaturek z mikroskopijnym tekstem,
* sticky „Rezerwuj” poza samym formularzem,
* naturalny back-navigation formularza,
* zachowanie wpisanych danych przy cofnięciu kroku,
* zdjęcia zoptymalizowane tak, aby nie blokowały pierwszego renderu.

Dokumentacja już określa mobile-first, duże cele dotykowe, etykiety pól, powiązanie błędów z inputami, focus states i semantyczny HTML. 

---

# 33. Jedna ważna zasada językowa całego serwisu

Marketingowe CTA:

### **Rezerwuj**

może zostać zgodnie z Twoim założeniem.

Ale wszędzie tam, gdzie mogłoby powstać wrażenie automatycznej rezerwacji, dodajemy małe doprecyzowanie:

> Wyślij zgłoszenie — termin potwierdzimy po kontakcie.

Nie używałabym publicznie zwrotów:

* „Sprawdź dostępność”,
* „Wolne miejsca”,
* „Zarezerwuj natychmiast”,
* „Ostatnie miejsca”,
* „Dostępne boksy”.

Są sprzeczne zarówno z modelem biznesowym, jak i z techniczną zasadą nieujawniania obłożenia.  

---

# 34. Docelowy „feel” mockupów

Gdybym miała streścić wygląd projektu dla osoby tworzącej mockupy w jednym akapicie:

> **Kocie Gniazdko 2.0 wygląda jak współczesna, bardzo wygodna mobilna strona rodzinnego pensjonatu, a nie jak aplikacja SaaS ani sieciowy hotel. Dominują kremowe powierzchnie, ciepły brąz tekstu, charakterystyczna zieleń marki, naturalna fotografia oraz Alegreya w nagłówkach. Interfejs jest przestronny, ale nie pusty; ma miękkie karty, subtelne linie i drobne elementy inspirowane logo. Najważniejszą akcją w całym serwisie jest zielone „Rezerwuj”, a proces zgłoszenia jest prowadzony krok po kroku i zaprojektowany przede wszystkim pod obsługę jedną ręką na telefonie.**

