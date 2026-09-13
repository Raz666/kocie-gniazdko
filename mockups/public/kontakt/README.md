# Kontakt — makieta mobilna

[Otwórz makietę](mockup-kontakt.html). Duży ekran pokazuje trzy części kontaktu obok siebie: dane kontaktowe, dojazd oraz rezerwację ze stopką. Na telefonie tworzą jedną przewijaną stronę bez ramki.

Treść, style, skrypty, fonty, logo i zdjęcie pensjonatu są osadzone bezpośrednio w HTML-u. Do pokazania kontaktu wystarczy jeden pobrany plik. [Zasady wspólnego stylu](../STYLE-GUIDE.md) opisują wygląd i sposób rozwijania szablonu. Przejścia do strony głównej i rezerwacji wymagają ich plików w dotychczasowym układzie katalogów.

Dane kontaktowe pochodzą z dotychczasowych makiet. Trasa otwiera mapy, telefon i e-mail używają odpowiednich linków. Regulamin i polityka prywatności prowadzą do istniejącej witryny.

[Opis szablonu, rozbudowy i weryfikacji](../README.md). Eksport: `node mockups/public/kontakt/render.cjs`; zapisuje obrazy w `../exports/contact/` i nie nadpisuje HTML. PNG i raport `verification.json` w tym katalogu dokumentują wcześniejszą wersję z 9 września 2026.
