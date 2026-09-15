# Mockup dashboardu Kociego Gniazdka

Źródłem makiety jest [mockup-dashboard.html](mockup-dashboard.html). Plik zawiera cały interfejs, style, przykładowe dane i interakcje.

## Uruchomienie na innym komputerze

1. Sklonuj repozytorium lub pobierz foldery `mockups/admin/dashboard` i `mockups/admin/kalendarz` z zachowaniem ich wzajemnego położenia.
2. Otwórz ten plik bezpośrednio w aktualnej przeglądarce, np. Chrome, Edge lub Firefox.

Nie trzeba instalować Node.js, pobierać pakietów ani wykonywać kompilacji. Source Sans 3 jest pobierany z Google Fonts; bez dostępu do sieci przeglądarka używa fontu systemowego.

## Edycja i zakres

Bazowy HTML pozostaje edytowalny; źródłem nowych interakcji i kompaktowych stylów jest dashboard-workflows.js. Po zmianach uruchom node mockups/admin/dashboard/build-mockup.cjs. Standard testowania wszystkich ekranów admina: ekran 1920×1080 i zoom 150%, z naciskiem na czytelność oraz wykorzystanie dostępnej przestrzeni.

Makieta obejmuje dashboard „Dzisiaj”, filtry i panele kontekstowe. Pozostałe pozycje nawigacji wskazują planowane moduły. Dane są fikcyjne, a symulowane zmiany znikają po odświeżeniu. Nie ma połączenia z bazą, logowania ani wysyłki e-maili.

`dashboard-reference.png` to zapisany obraz referencyjny dashboardu, a nie zasób ładowany przez HTML. Makieta nie wymaga zdjęć ani fontów z katalogu strony publicznej.

## Wspólna pełna karta rezerwacji

Akcje rezerwacji używają tego samego edytora co Kalendarz, osadzonego w pełnoekranowym dialogu przez iframe. Adapter przekazuje dane przykładowe dashboardu i odbiera zapisany stan po zamknięciu. Działa po HTTP i lokalnie przy zachowanej strukturze folderów. Hash #rezerwacja/KG-B4R8 otwiera kartę bezpośrednio. Po zmianie wspólnego edytora zbuduj również kalendarz. Osobno otwarte makiety nie współdzielą bazy danych.
