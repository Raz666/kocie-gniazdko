# Makiety Kociego Gniazdka

Wszystkie makiety, eksporty i ich materiały znajdują się tutaj. Dokumentacja biznesowa, techniczna i design pozostają w [docs/](../docs/).

```text
mockups/
├── public/                  # Strona dostępna dla klientów
│   ├── strona-glowna/        # HTML, zrzuty i skrypt sprawdzający
│   ├── rezerwacja/           # Formularz zgłoszenia: HTML, PNG, eksporter
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
| Strona publiczna | [Strona główna](public/strona-glowna/preview-qa.html) | Wspólny szablon: plansza lub ciągła strona mobilna |
| Strona publiczna | [Zgłoszenie rezerwacji](public/rezerwacja/mockup-rezerwacja.html) | Plansze i przejścia między ekranami |
| Strona publiczna | [Kontakt](public/kontakt/mockup-kontakt.html) | Wspólny szablon, responsywność i działające menu |
| Panel administratora | [Dashboard „Dzisiaj”](admin/dashboard/mockup-dashboard.html) | Interakcje na danych przykładowych |
| Panel administratora | [Kalendarz — plan boksów](admin/kalendarz/mockup-kalendarz.html) | Interaktywny HTML z przełączaniem osi v3/v4; [opis i PNG](admin/kalendarz/README.md) |

HTML otwieraj w przeglądarce, a PNG/JPG w przeglądarce obrazów. Do oglądania nie potrzeba kompilacji ani Node.js. Każda makieta publiczna jest samodzielnym HTML-em z osadzonymi stylami, skryptami, fontami i obrazami — do pokazania danej strony wystarczy pojedynczy plik. Nawigacja między trzema makietami wymaga zachowania plików docelowych w dotychczasowym układzie katalogów. Dashboard i plan rezerwacji są samodzielnymi HTML-ami; plan rezerwacji ma osadzone także fonty i działa offline.

## Zasoby i eksport

[Mapa zasobów strony publicznej](public/assets/README.md) opisuje, które makiety używają logo, zdjęć i fontów. Panel administratora nie korzysta z tych plików; jego obrazy referencyjne i warianty są przy odpowiednich makietach.

Aktualne źródła publicznych makiet to samodzielne HTML-e. [Zasady spójności](public/STYLE-GUIDE.md) określają wygląd i sposób aktualizowania wspólnych bloków. [Opis szablonu i rozbudowy](public/README.md) zawiera sposób weryfikacji i opcjonalnego eksportu. Skrypty eksportu czytają HTML i nigdy go nie nadpisują. Starsze PNG pozostają archiwalnymi materiałami; aktualne eksporty trafiają do `public/exports/`.

## Zasady porządkowania

- Samodzielny HTML, archiwalne eksporty i opis konkretnego ekranu pozostają razem.
- Oryginały zasobów pozostają w `public/assets/`; używane fonty i obrazy osadzaj również w każdym HTML-u.
- Wariant PNG i opisujący go prompt pozostają w tym samym katalogu wersji.
- HTML-e nie mogą wymagać zewnętrznych zasobów do wyświetlenia. Linki między makietami pozostają względne.
