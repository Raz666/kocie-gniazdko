# Rezerwacje v4 — boksy u góry, dni po lewej

Propozycja odwrócenia osi planu z v3. Dwie statyczne makiety PNG przygotowano wbudowanym narzędziem imagegen; prompty podstawowe i korekty znajdują się obok obrazów.

- [Widok ogólny — 10 boksów, 7 dni](kalendarz-v4-01-odwrocone-osie.png).
- [Przenoszenie części pobytu — Gniazdko 1](kalendarz-v4-02-przenoszenie.png).

## Układ i czytelność

Na górze znajdują się dwa poziomy nagłówków: lokalizacja, a pod nią boksy. Po lewej biegną kolejne dni. Pobyt jest jedną pionową kartą, której początek i koniec wynikają z terminu. Tekst pozostaje poziomy: imię kota, pełne imię i nazwisko właściciela, status. Zachowujemy kolory v3, duży tekst, osobną kartę każdego kota oraz wspólny znacznik domu Luny i Meli.

Dzisiaj wyróżnia wiersz; weekendy mają delikatne poziome tło. Strzałka u góry lub u dołu karty wskazuje kontynuację poza oglądanym okresem. Kliknięcie karty pokazuje pełny termin i szczegóły.

Proponowane zachowania działającego widoku:

- Nagłówki lokalizacji i boksów pozostają przyklejone u góry podczas przewijania kalendarza. Kolumna dni pozostaje po lewej podczas przewijania w poziomie.
- Minimalna szerokość pojedynczego pasa to 180–220 px przy dużym tekście. Długie nazwiska zawijamy, bez wielokropka. Gdy brakuje miejsca, przewijamy siatkę poziomo lub korzystamy z filtra lokalizacji.
- W zakresie 14 lub 30 dni zachowujemy wysokość dnia i przewijamy pionowo. Nie zmniejszamy tekstu ani wysokości wierszy, żeby zmieścić cały okres.
- Dane kota na długiej karcie pozostają widoczne podczas przewijania, ograniczone do obszaru tej karty. Nie powielamy rezerwacji w każdym dniu.
- Krótki pobyt ma dokładne znaczniki czasu; jeśli nie mieści tekstu, dostaje połączoną etykietę obok oraz podgląd po kliknięciu. Nie wydłużamy graficznego terminu dla zmieszczenia nazwiska.
- Pełny ekran usuwa nawigację i rozszerza siatkę. Na telefonie zachowujemy opisany w specyfikacji widok listowy Boksy / Dni.

Box 7 pokazuje dwa równoległe pasy dla Pestki i Rudego. Nakładanie pobytów zwiększa szerokość kolumny boksu; karty nie zasłaniają się. Liczba przypisań jest informacją, bez domniemywania konfliktu czy pojemności boksu.

## Przenoszenie

Zmiana boksu odbywa się poziomo. W trakcie przeciągania współrzędne początku i końca na osi czasu są zablokowane. Wyróżniamy wiersz daty rozpoczęcia przenoszonego fragmentu oraz docelowy nagłówek boksu. Kontur docelowy i kreskowany fragment źródłowy mają tę samą wysokość i te same pozycje pionowe.

Przykład na drugim obrazie:

| Parametr | Wartość |
| --- | --- |
| Kot i właściciel | Luna — Anna Nowak |
| Zakres | Część pobytu |
| Z boksu | Gniazdko 1 · Box 4 |
| Do boksu | Gniazdko 1 · Box 2 |
| Początek | 13 września 2026, 14:00 |
| Koniec | 15 września 2026, 10:00 |
| Poprzedzający pobyt w Box 2 | Misza — Barbara Król, odbiór 13 września o 10:00 |

Między odbiorem Miszy a początkiem przeniesienia Luny są cztery godziny. Cały pobyt przenosi się analogicznie, ze zblokowaniem oryginalnego początku. Dwa koty przeniesione do jednego boksu otrzymują osobne pasy, także gdy pochodzą z tego samego domu.

Gest ma alternatywę: wybór kota → Przenieś kota → zakres → boks docelowy → podsumowanie. Upuszczenie przygotowuje propozycję; przycisk Zapisz przeniesienie zatwierdza ją, Anuluj przywraca stan początkowy. Otwarcie panelu nie zmienia samoczynnie filtra lokalizacji — drugi obraz ilustruje już wybrane Gniazdko 1. Przeniesienie do innej lokalizacji jest dostępne przez wybór celu w panelu.

## Koty bez boksu

Zachowujemy widoczny licznik „4 koty z 3 domów”. Pokaż koty rozwija kolejkę nad siatką: Leo / Magdalena Lewandowska, Figa / Joanna Szymańska, Felek / Joanna Szymańska, Mruczek / Tomasz Dąbrowski. Każdy kot ma osobną kartę; Figa i Felek wspólną grupę domu oraz akcję Przypisz razem. Przypisanie zachowuje termin. Kolejka nie jest dodatkową kolumną boksu.

## Zakres propozycji i dokładność obrazów

To propozycja wizualna, bez wdrożenia interakcji. PNG ilustrują układ i kierunek ruchu; położenia końców kart wewnątrz dni są orientacyjne. W szczególności na obrazie przenoszenia koniec Miszy jest narysowany zbyt wysoko, a pozioma prowadnica przechodzi przez górną część kart zamiast dokładnie po ich krawędzi początku. Wiążące dla prototypu są terminy z tabeli i równe granice obu fragmentów Luny. Przy realizacji pozycje trzeba obliczać z czasu, bez odtwarzania pikseli z PNG.

V4 rozwija kierunek makiet v3; nie zmienia automatycznie bazowej [specyfikacji panelu](../../../../docs/design-panel-administracyjny.md). Planowane odcinki pobytów i przenoszenie zakresu nadal należą do rozszerzenia A-01. Aktualny model faktycznych przemieszczeń nie staje się przez tę makietę modelem przyszłego planu.

Główny kompromis: łatwiej porównywać boksy danego dnia i przenosić kota w poziomie, ale długie okresy wymagają przewijania pionowego, a wiele równoległych przypisań poszerza siatkę.
