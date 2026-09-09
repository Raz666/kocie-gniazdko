# Zasoby makiet strony publicznej

Ten katalog zawiera materiały strony dla klientów. Żadna z obecnych makiet panelu administratora nie odwołuje się do tych plików.

| Zasób | Wykorzystanie |
| --- | --- |
| [logo.png](logo.png) | Ładowane przez kontakt i formularz rezerwacji; strona główna ma logo osadzone w HTML |
| [fonts/fonts.css](fonts/fonts.css) i cztery pliki TTF | Wspólne lokalne fonty Alegreya i Source Sans 3 dla kontaktu oraz rezerwacji |
| [photos/photo-23.jpg](photos/photo-23.jpg) | Zdjęcie pensjonatu ładowane przez makietę kontaktu |
| `photos/photo-1.jpg`–`photo-36.jpg` | Zachowany zbiór fotografii źródłowych hotelu i kotów do makiet strony publicznej; nie wszystkie są obecnie używane |
| [photos/contact-sheet.jpg](photos/contact-sheet.jpg) | Plansza przeglądowa zdjęć z numerami plików |

Strona główna w [preview-qa.html](../strona-glowna/preview-qa.html) zawiera obrazy jako dane osadzone. Nie potrzebuje zewnętrznych plików zdjęć do wyświetlenia, ale korzysta z sieciowych bibliotek/fontów. Kontakt i rezerwacja odwołują się do `../assets/`; ich HTML należy przenosić razem z tym katalogiem.

Fonty zachowują oryginalne nazwy, aby uniknąć pomylenia odmian; ich rodziny, wagi i zakresy znaków określa `fonts.css`.
