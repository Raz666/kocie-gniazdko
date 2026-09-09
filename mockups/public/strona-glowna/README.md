# Strona główna — makieta mobilna

- [preview-qa.html](preview-qa.html) — interaktywny podgląd strony w ramce.
- [kocie-gniazdko-mobile-full.png](kocie-gniazdko-mobile-full.png) — pełna długość strony.
- [first-screen.png](first-screen.png) — pierwszy ekran.
- [full-review.jpg](full-review.jpg) — plansza przeglądowa fragmentów strony.
- [check-mockup.cjs](check-mockup.cjs) — kontrola menu, galerii, FAQ i rozmiarów oraz zapis zrzutów przy makiecie.

Logo i zdjęcia są osadzone w HTML. Oryginały zdjęć i logo znajdują się we [wspólnych zasobach](../assets/README.md). Podgląd korzysta także z bibliotek/fontów pobieranych z sieci.

Skrypt uruchamiaj poleceniem `node mockups/public/strona-glowna/check-mockup.cjs` z katalogu repozytorium. Ścieżki wejścia i eksportów są wyznaczane względem samego skryptu. Import Playwright nadal wskazuje lokalne środowisko autora; do odtwarzania zrzutów na innym komputerze wymaga dostosowania. Gotowy HTML i obrazy nie wymagają uruchamiania skryptu.

Podstawa projektu: [design strony publicznej](../../../docs/design-kocie-gniazdko.md).
