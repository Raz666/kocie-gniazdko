# Makiety Kociego Gniazdka

Wszystkie makiety, eksporty i ich materiały znajdują się tutaj. Dokumentacja biznesowa, techniczna i design pozostają w [docs/](../docs/).

```text
mockups/
├── public/                  # Strona dostępna dla klientów
│   ├── strona-glowna/        # HTML, zrzuty i skrypt sprawdzający
│   ├── rezerwacja/           # Formularz zgłoszenia: HTML, PNG, generator
│   ├── kontakt/              # Kontakt: HTML, PNG, generator, raport
│   └── assets/               # Zasoby wspólne makiet publicznych
│       ├── logo.png
│       ├── fonts/            # Lokalne fonty i fonts.css
│       └── photos/           # Zdjęcia hotelu i plansza przeglądowa
└── admin/                   # Prywatny panel administratora
    ├── dashboard/           # Interaktywny HTML i obraz referencyjny
    └── rezerwacje/           # Interaktywny HTML v3/v4, zrzuty i makiety PNG
        ├── v1/              # Lista rezerwacji
        ├── v2/              # Plan boksów
        ├── v3/              # Czytelność, przenoszenie i stany widoku
        └── v4/              # Boksy u góry, dni po lewej, przenoszenie poziome
```

## Otwieranie makiet

| Obszar | Makieta | Uwagi |
| --- | --- | --- |
| Strona publiczna | [Strona główna](public/strona-glowna/preview-qa.html) | Podgląd mobilny w ramce; obrazy osadzone w HTML |
| Strona publiczna | [Zgłoszenie rezerwacji](public/rezerwacja/mockup-rezerwacja.html) | Plansze i przejścia między ekranami |
| Strona publiczna | [Kontakt](public/kontakt/mockup-kontakt.html) | Statyczny podgląd mobilny |
| Panel administratora | [Dashboard „Dzisiaj”](admin/dashboard/mockup-dashboard.html) | Interakcje na danych przykładowych |
| Panel administratora | [Rezerwacje — plan boksów](admin/rezerwacje/mockup-rezerwacje.html) | Interaktywny HTML z przełączaniem osi v3/v4; [opis i PNG](admin/rezerwacje/README.md) |

HTML otwieraj w przeglądarce, a PNG/JPG w przeglądarce obrazów. Do oglądania nie potrzeba kompilacji ani Node.js. Przy przenoszeniu makiet publicznych na inny komputer zachowaj cały katalog `public/`, aby działały wspólne zasoby i link kontakt → rezerwacja. Dashboard i plan rezerwacji są samodzielnymi HTML-ami; plan rezerwacji ma osadzone także fonty i działa offline.

## Zasoby i eksport

[Mapa zasobów strony publicznej](public/assets/README.md) opisuje, które makiety używają logo, zdjęć i fontów. Panel administratora nie korzysta z tych plików; jego obrazy referencyjne i warianty są przy odpowiednich makietach.

Skrypty `render.cjs` zapisują HTML oraz eksporty w swoim katalogu. `check-mockup.cjs` sprawdza stronę główną i zapisuje jej zrzuty obok HTML-a. Wymagają Playwright oraz Edge; obecnie import Playwright wskazuje lokalne środowisko autora — przed odtwarzaniem na innym urządzeniu trzeba dostosować ten import. Nie jest to wymagane do otwierania gotowych makiet.

## Zasady porządkowania

- HTML, eksporty, generator i opis konkretnego ekranu pozostają razem.
- Zasoby używane przez kilka ekranów strony publicznej trafiają do `public/assets/`.
- Wariant PNG i opisujący go prompt pozostają w tym samym katalogu wersji.
- Ścieżki do zasobów w HTML/CSS są względne; aktualizuj je także w generatorze.
