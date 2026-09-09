# Mobilna strona kontaktu — makieta PNG

Przygotowano 9 września 2026. Referencyjny ekran: 390 px, eksport ×2.

- `kontakt-mobile-full.png` — cała przewijana strona kontaktu.
- `kontakt-mobile-pierwszy-ekran.png` — widok 390 × 844 px z przyklejonym dolnym paskiem, eksport 780 × 1688 px.
- `mockup-kontakt.html` — źródło wizualne.
- `render.cjs` — odtwarzalny eksport: `node mockups/public/kontakt/render.cjs` z katalogu projektu.

## Podstawa i zakres

Zależności plikowe: [logo](../assets/logo.png), [zdjęcie pensjonatu](../assets/photos/photo-23.jpg) i [wspólne fonty](../assets/fonts/fonts.css). Przechowuj katalog kontaktu razem z `../assets/` oraz `../rezerwacja/`, do którego prowadzi przycisk rezerwacji.

Źródła: `docs/design-kocie-gniazdko.md` (w szczególności 3, 5 i 6.5), makieta strony głównej `mockups/public/strona-glowna/preview-qa.html`, jej PNG oraz makiety rezerwacji. Zachowano rzeczywiste pliki logo i zdjęcia (`logo.png`, `photo-23.jpg`), lokalne fonty Alegreya i Source Sans 3, kolory, odstępy, karty i przyciski.

Telefon, e-mail, adres i godziny przeniesiono z istniejącej makiety strony głównej; nie weryfikowano ich zewnętrznie. Dojazd pokazano w dopuszczonym przez design wariancie: adres tekstowy i link do trasy. Fotografia pensjonatu wspiera rozpoznanie miejsca; nie stanowi mapy. Godziny przyjazdu i odbioru są ustalane przy potwierdzeniu pobytu.

Formularz kontaktowy pozostaje w designie rozszerzeniem do uzgodnienia, dlatego makieta przedstawia wariant bazowy. Brak danych rachunku w materiałach, więc nie dodano sekcji przelewu. CTA wyjaśnia, że zgłoszenie nie potwierdza miejsca.

Pełny eksport pokazuje dolny pasek na końcu dokumentu, by nie zasłaniać treści. Osobny pierwszy ekran przedstawia jego pozycję przyklejoną do dolnej krawędzi. HTML jest źródłem statycznej makiety: Menu nie otwiera nawigacji, a ścieżki podstron są koncepcyjne. Nie jest to wdrożona strona.

## Weryfikacja

Obejrzano oba PNG. Fonty używane w makiecie i wszystkie obrazy zostały wczytane. Przy 390 i 320 px brak poziomego przepełnienia i błędów JavaScript; raport znajduje się w `verification.json`. Nieużywana waga 600 Alegreya nie wymaga ładowania.

PNG wyrenderowano z HTML/CSS w Playwright i Edge, zgodnie z metodą używaną dla rezerwacji. Nie użyto generowania obrazowego; dokładne logo, typografia i tekst pochodzą z istniejących zasobów.
