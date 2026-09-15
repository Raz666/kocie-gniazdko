# Kocie Gniazdko 2.0
## Specyfikacja techniczna dla agenta implementacyjnego

> Status dokumentu: docelowa specyfikacja wersji 2.0.  
> Dokument jest źródłem prawdy dla implementacji, dopóki kolejne prompty nie nadpiszą konkretnego wymagania.

---

# 1. Cel techniczny

Zbudować jedną aplikację webową obejmującą:

1. publiczną stronę Kociego Gniazdka,
2. publiczny formularz zgłoszenia rezerwacji,
3. opcjonalny bezhasłowy dostęp powracającego klienta do zapisanych danych,
4. prywatny panel administratora,
5. backend/API,
6. relacyjną bazę SQLite,
7. wysyłkę e-maili,
8. generowanie eksportów `.xlsx`,
9. prosty CMS,
10. automaty retencji danych,
11. audyt istotnych zmian.

System ma działać mobile-first i pozostawać prostym monolitem. Nie dzielić go na mikroserwisy.

---

# 2. Ustalony stack

## Frontend i backend

- Next.js
- React
- TypeScript
- App Router
- Server Components tam, gdzie nie jest potrzebna interaktywność
- Client Components wyłącznie dla interaktywnych fragmentów
- Server Actions lub Route Handlers dla operacji serwerowych
- formularze walidowane po stronie klienta i obowiązkowo ponownie po stronie serwera

## Baza danych

- SQLite
- Drizzle ORM
- Drizzle migrations
- tryb WAL
- persistent storage

## Pozostałe elementy

- ExcelJS do eksportów `.xlsx`
- SMTP lub dostawca transactional e-mail
- storage S3-compatible dla publicznych zdjęć galerii
- bez płatności online
- bez WordPressa
- bez Redis
- bez osobnego backend service

Nie pinować wersji bibliotek w tej specyfikacji. Przy rozpoczęciu implementacji użyć aktualnych stabilnych wersji kompatybilnych ze sobą.

---

# 3. Architektura

```text
Next.js application
│
├── Public website
│   ├── Home
│   ├── Hotel / Oferta
│   ├── Gallery
│   ├── Pricing
│   ├── Before stay / FAQ
│   ├── Rules
│   ├── Contact
│   └── Reservation form
│
├── Customer passwordless flow
│
├── /admin
│   ├── Dashboard
│   ├── Reservations
│   ├── Calendar
│   ├── Customers
│   ├── Pets
│   ├── Pricing
│   ├── Locations / Boxes
│   ├── Payments
│   ├── CMS
│   ├── Email templates
│   ├── Exports
│   └── Settings
│
├── Domain services
│   ├── Reservations
│   ├── Pricing
│   ├── Boxes
│   ├── Payments
│   ├── Emails
│   ├── Retention
│   └── Audit
│
└── SQLite
```

Zasada: logika biznesowa nie może być rozproszona po komponentach React. Reguły statusów, ceny, przypisań boksów, wpłat i retencji implementować w warstwie usług domenowych używanej zarówno przez UI, jak i endpointy.

---

# 4. Strefa czasowa i formaty

Biznesowa strefa czasowa:

```text
Europe/Warsaw
```

Zasady:

- znaczniki czasu (`createdAt`, `updatedAt`, logi, historia) przechowywać w `Europe/Warsaw`,
- daty pobytu przechowywać w `Europe/Warsaw`,
- wymagane godziny przyjazdu/odbioru przechowywać jako lokalny `HH:MM`,
- formatowanie dla użytkownika wykonywać w `Europe/Warsaw`,
- waluta: PLN,
- wszystkie kwoty w bazie przechowywać jako INTEGER w groszach.

Nigdy nie używać `float`/`REAL` do kwot pieniężnych.

---

# 5. Statusy rezerwacji

Dozwolone statusy:

```ts
type ReservationStatus =
  | "NEW"
  | "ACTIVE"
  | "CHECKED_IN"
  | "COMPLETED"
  | "REJECTED"
  | "CANCELLED";
```

Dozwolone podstawowe przejścia:

```text
NEW -> ACTIVE
NEW -> REJECTED
NEW -> CANCELLED

ACTIVE -> CHECKED_IN
ACTIVE -> CANCELLED

CHECKED_IN -> COMPLETED
```

`COMPLETED`, `REJECTED` i `CANCELLED` są stanami terminalnymi w standardowym workflow.

Każda zmiana statusu musi:

1. być wykonana w transakcji,
2. zaktualizować `reservations.status`,
3. ustawić odpowiedni timestamp statusu,
4. utworzyć rekord `reservation_status_history`,
5. utworzyć odpowiedni wpis audytowy,
6. utworzyć zdarzenie e-mailowe, jeśli dla przejścia istnieje szablon automatycznej wiadomości.

Kolor `NEW` w UI: żółty.

Kolor nigdy nie może być jedynym nośnikiem informacji o statusie.

---

# 6. Warunek aktywacji

Przejście NEW -> ACTIVE wymaga pełnego planu każdego kota z reservation_pets. Odcinki muszą dokładnie pokrywać [arrival_at, departure_at), bez luk i nakładania dla danego kota, w aktywnych boksach aktywnych lokalizacji. Sam rekord reservation_boxes nie wystarcza.

Walidacja kompletności, wersji i aktywności zasobów odbywa się w tej samej transakcji co status, historia, audyt i outbox. Nie polegać na walidacji frontendowej. [Kontrakt kalendarza i rozmieszczenia](kalendarz-kontrakt.md) uzupełnia niniejszą specyfikację.

---

# 7. Model ceny

Każda rezerwacja może wskazywać jedną pozycję `price_rates`.

Przy przypisaniu stawki do rezerwacji należy zapisać snapshot:

```text
priceRateId
pricePerDayCents
```

Późniejsza edycja `price_rates.pricePerDayCents` nie może zmieniać historycznych rezerwacji.

Automatyczny koszt:

```text
billableDays = calendarDateDifference(departureDate, arrivalDate) // walidacja: >= 2
calculatedPriceCents = billableDays * pricePerDayCents
```

Godziny przyjazdu i odbioru nie wpływają na `billableDays`.

Domyślnie:

```text
finalPriceCents = calculatedPriceCents
priceManuallyAdjusted = false
```

Po ręcznej zmianie ceny:

```text
finalPriceCents = adminValue
priceManuallyAdjusted = true
```

Zmiana terminu albo stawki:

- zawsze przelicza `calculatedPriceCents`,
- jeśli `priceManuallyAdjusted = false`, aktualizuje również `finalPriceCents`,
- jeśli `priceManuallyAdjusted = true`, nie nadpisuje `finalPriceCents`; UI pokazuje różnicę i pozwala administratorowi jawnie przywrócić cenę wyliczoną.

Akcja „Użyj ceny wyliczonej”:

```text
finalPriceCents = calculatedPriceCents
priceManuallyAdjusted = false
```

---

# 8. Model wpłat

Jedna rezerwacja ma 0..N rekordów `payments`.

Suma wpłat:

```text
paidCents = SUM(payments.amountCents)
```

Pozostała należność:

```text
remainingCents = finalPriceCents - paidCents
```

Interpretacja:

```text
paidCents = 0
=> brak wpłat

0 < paidCents < finalPriceCents
=> częściowo opłacona

paidCents = finalPriceCents
=> rozliczona

paidCents > finalPriceCents
=> nadpłata
```

Nie przechowywać `remainingCents` ani `paymentStatus` jako redundantnej wartości w `reservations`.

---

# 9. Zainteresowanie terminem

Publiczna strona nie może ujawniać faktycznego obłożenia.

Dla wybranego zakresu dat backend może zwrócić wyłącznie:

```ts
{ popular: boolean }
```

Nie zwracać liczby rezerwacji, liczby wolnych miejsc ani informacji o boksach.

Rezerwacja jest uznawana za nakładającą się na wybrany okres, jeśli zakresy dat się przecinają.

Do obliczania zainteresowania uwzględniać statusy:

```text
NEW
ACTIVE
CHECKED_IN
```

Wykluczać:

```text
COMPLETED
REJECTED
CANCELLED
```

Próg jest ustawieniem w `system_settings.popularTermThreshold`.

Jeżeli:

```text
overlappingReservations >= popularTermThreshold
```

backend zwraca:

```json
{"popular": true}
```

Publiczny UI pokazuje wyłącznie neutralny komunikat o dużym zainteresowaniu.

---

# 10. Brak publicznej dostępności

Publiczna część aplikacji:

- nie zwraca `locations`,
- nie zwraca `boxes`,
- nie zwraca `reservation_boxes`,
- nie zwraca `pet_box_assignments`,
- nie zwraca liczby zajętych/wolnych miejsc,
- nie zwraca danych innych rezerwacji.

Nie wystarczy ukrycie elementów w UI. Publiczne Route Handlers / Server Actions nie mogą serializować tych danych.

---

# 11. Użytkownik bez konta i profil zapisany na przyszłość

Każde zgłoszenie potrzebuje tymczasowego rekordu `customers`, ponieważ rezerwacja musi być powiązana z właścicielem.

Tryby retencji:

```ts
type RetentionMode =
  | "ONE_TIME"
  | "KEEP_FOR_FUTURE";
```

`ONE_TIME`:

- profil istnieje do obsługi rezerwacji i okresu retencji,
- następnie dane osobowe są anonimizowane.

`KEEP_FOR_FUTURE`:

- profil może być ponownie używany,
- klient może uzyskać dostęp przez jednorazowy link e-mail,
- po okresie nieaktywności profil również trafia do retencji.

Nigdy nie łączyć nowego zgłoszenia z istniejącym profilem wyłącznie na podstawie zgodności adresu e-mail.

Ponowne użycie istniejącego profilu wymaga uwierzytelnienia klienta przez magic link.

---

# 12. Schemat danych

Nazwy SQL zapisane w `snake_case`. Nazwy TypeScript mogą być `camelCase`.

---

## 12.1 `admin_users`

Administratorzy panelu.

```text
id                  INTEGER PRIMARY KEY
email               TEXT NOT NULL
display_name        TEXT NOT NULL
password_hash       TEXT NOT NULL
totp_secret_enc     TEXT NULL
two_factor_enabled  INTEGER NOT NULL DEFAULT 0
active              INTEGER NOT NULL DEFAULT 1
last_login_at       TEXT NULL
created_at          TEXT NOT NULL
updated_at          TEXT NOT NULL
```

Constrainty:

```text
CHECK(two_factor_enabled IN (0,1))
CHECK(active IN (0,1))
```

Indeksy:

```text
UNIQUE INDEX admin_users_email_uq ON admin_users(email COLLATE NOCASE)
INDEX admin_users_active_idx ON admin_users(active)
```

Relacje:

- `reservation_status_history.changed_by_admin_id -> admin_users.id`
- `reservation_boxes.assigned_by_admin_id -> admin_users.id`
- `pet_box_assignments.changed_by_admin_id -> admin_users.id`
- `payments.created_by_admin_id -> admin_users.id`
- `contact_notes.created_by_admin_id -> admin_users.id`
- `audit_logs.admin_user_id -> admin_users.id`

Nie usuwać fizycznie administratora, jeśli posiada historię działań. Używać `active = 0`.

---

## 12.2 `customers`

Właściciele kotów.

```text
id                    INTEGER PRIMARY KEY
first_name            TEXT NULL
last_name             TEXT NULL
email                 TEXT NULL
phone                 TEXT NULL
retention_mode        TEXT NOT NULL
last_reservation_at   TEXT NULL
anonymized_at         TEXT NULL
created_at            TEXT NOT NULL
updated_at            TEXT NOT NULL
```

Constraint:

```text
CHECK(retention_mode IN ('ONE_TIME','KEEP_FOR_FUTURE'))
```

Indeksy:

```text
INDEX customers_email_idx ON customers(email)
INDEX customers_phone_idx ON customers(phone)
INDEX customers_last_name_idx ON customers(last_name)
INDEX customers_last_reservation_idx ON customers(last_reservation_at)
INDEX customers_retention_idx ON customers(retention_mode, last_reservation_at)
INDEX customers_anonymized_idx ON customers(anonymized_at)
```

Nie ustawiać `UNIQUE(email)`.

Relacje:

```text
customers 1 -> N pets
customers 1 -> N reservations
customers 1 -> N customer_consents
customers 1 -> N customer_login_tokens
customers 1 -> N email_logs
```

Po anonimizacji pola PII są zerowane lub zastępowane neutralnymi wartościami zgodnie z usługą retencji.

---

## 12.3 `customer_login_tokens`

Jednorazowe linki dla profili `KEEP_FOR_FUTURE`.

```text
id            INTEGER PRIMARY KEY
customer_id   INTEGER NOT NULL
token_hash    TEXT NOT NULL
expires_at    TEXT NOT NULL
used_at       TEXT NULL
requested_ip  TEXT NULL
created_at    TEXT NOT NULL
```

FK:

```text
customer_id -> customers.id ON DELETE CASCADE
```

Indeksy:

```text
UNIQUE INDEX customer_login_tokens_hash_uq ON customer_login_tokens(token_hash)
INDEX customer_login_tokens_customer_idx ON customer_login_tokens(customer_id)
INDEX customer_login_tokens_expires_idx ON customer_login_tokens(expires_at)
```

Nigdy nie przechowywać surowego tokenu. W bazie wyłącznie hash.

Token jednorazowy, krótko ważny i po użyciu oznaczany `used_at`.

---

## 12.4 `pets`

Profile kotów.

```text
id                    INTEGER PRIMARY KEY
customer_id           INTEGER NOT NULL
name                  TEXT NULL
sex                   TEXT NULL
breed                 TEXT NULL
birth_date            TEXT NULL
age_description       TEXT NULL
is_neutered           INTEGER NULL
feeding_type          TEXT NULL
feeding_instructions  TEXT NULL
medications           TEXT NULL
health_notes          TEXT NULL
behavior_notes        TEXT NULL
general_notes         TEXT NULL
anonymized_at         TEXT NULL
created_at            TEXT NOT NULL
updated_at            TEXT NOT NULL
```

FK:

```text
customer_id -> customers.id
```

Preferowane zachowanie przy usuwaniu klienta: nie wykonywać fizycznego `DELETE` podczas standardowej retencji; anonimizować klienta i kota. Dzięki temu historia rezerwacji pozostaje spójna.

Constraint:

```text
CHECK(is_neutered IS NULL OR is_neutered IN (0,1))
```

Indeksy:

```text
INDEX pets_customer_idx ON pets(customer_id)
INDEX pets_name_idx ON pets(name)
INDEX pets_customer_name_idx ON pets(customer_id, name)
INDEX pets_anonymized_idx ON pets(anonymized_at)
```

---

## 12.5 `customer_consents`

Historia zgód.

```text
id              INTEGER PRIMARY KEY
customer_id     INTEGER NOT NULL
consent_type    TEXT NOT NULL
granted         INTEGER NOT NULL
policy_version  TEXT NOT NULL
ip_address      TEXT NULL
created_at      TEXT NOT NULL
```

FK:

```text
customer_id -> customers.id
```

Constraint:

```text
CHECK(granted IN (0,1))
```

`consent_type`:

```text
TERMS
PRIVACY
DATA_RETENTION
```

Indeksy:

```text
INDEX customer_consents_customer_idx ON customer_consents(customer_id)
INDEX customer_consents_type_idx ON customer_consents(customer_id, consent_type)
INDEX customer_consents_created_idx ON customer_consents(created_at)
```

Rekordy zgód są append-only.

---

## 12.6 `price_rates`

Cennik.

```text
id                  INTEGER PRIMARY KEY
name                TEXT NOT NULL
price_per_day_cents INTEGER NOT NULL
visible_on_website  INTEGER NOT NULL DEFAULT 1
active              INTEGER NOT NULL DEFAULT 1
created_at          TEXT NOT NULL
updated_at          TEXT NOT NULL
```

Constrainty:

```text
CHECK(price_per_day_cents >= 0)
CHECK(visible_on_website IN (0,1))
CHECK(active IN (0,1))
```

Indeksy:

```text
INDEX price_rates_active_idx ON price_rates(active)
INDEX price_rates_visible_idx ON price_rates(visible_on_website)
INDEX price_rates_public_idx ON price_rates(active, visible_on_website)
```

Nie wymagać unikalnej nazwy.

Zmiana stawki nie aktualizuje istniejących rezerwacji.

---

## 12.7 `reservations`

Centralna tabela zgłoszeń i rezerwacji.

```text
id                       INTEGER PRIMARY KEY
reference_code           TEXT NOT NULL
customer_id              INTEGER NOT NULL
status                   TEXT NOT NULL
plan_version             INTEGER NOT NULL DEFAULT 1

arrival_date             TEXT NOT NULL
arrival_time             TEXT NOT NULL
departure_date           TEXT NOT NULL
departure_time           TEXT NOT NULL

price_rate_id            INTEGER NULL
price_per_day_cents      INTEGER NULL
calculated_price_cents   INTEGER NOT NULL DEFAULT 0
final_price_cents        INTEGER NOT NULL DEFAULT 0
price_manually_adjusted  INTEGER NOT NULL DEFAULT 0

customer_notes           TEXT NULL
admin_notes              TEXT NULL

activated_at             TEXT NULL
checked_in_at            TEXT NULL
completed_at             TEXT NULL
rejected_at              TEXT NULL
cancelled_at             TEXT NULL
anonymized_at            TEXT NULL

created_at               TEXT NOT NULL
updated_at               TEXT NOT NULL
```

FK:

```text
customer_id -> customers.id
price_rate_id -> price_rates.id
```

Dla `price_rate_id` nie używać `ON DELETE CASCADE`. Stawki historyczne mają być wyłączane przez `active = 0`, a nie usuwane.

Constrainty:

```text
CHECK(status IN (
  'NEW',
  'ACTIVE',
  'CHECKED_IN',
  'COMPLETED',
  'REJECTED',
  'CANCELLED'
))

CHECK(julianday(departure_date) - julianday(arrival_date) >= 2)
CHECK(price_per_day_cents IS NULL OR price_per_day_cents >= 0)
CHECK(calculated_price_cents >= 0)
CHECK(final_price_cents >= 0)
CHECK(price_manually_adjusted IN (0,1))
```

Indeksy:

```text
UNIQUE INDEX reservations_reference_uq ON reservations(reference_code)

INDEX reservations_customer_idx ON reservations(customer_id)
INDEX reservations_status_idx ON reservations(status)
INDEX reservations_arrival_idx ON reservations(arrival_date)
INDEX reservations_departure_idx ON reservations(departure_date)
INDEX reservations_status_arrival_idx ON reservations(status, arrival_date)
INDEX reservations_status_departure_idx ON reservations(status, departure_date)
INDEX reservations_range_idx ON reservations(arrival_date, departure_date)
INDEX reservations_price_rate_idx ON reservations(price_rate_id)
INDEX reservations_created_idx ON reservations(created_at)
INDEX reservations_anonymized_idx ON reservations(anonymized_at)
```

`reference_code`:

- publiczny identyfikator używany w e-mailach i UI,
- nie używać sekwencyjnego `id` jako publicznego numeru,
- generować losowy, krótki i trudny do odgadnięcia kod.

---

## 12.8 `reservation_pets`

Tabela łącząca rezerwacje z kotami.

```text
id              INTEGER PRIMARY KEY
reservation_id  INTEGER NOT NULL
pet_id          INTEGER NOT NULL
created_at      TEXT NOT NULL
```

FK:

```text
reservation_id -> reservations.id ON DELETE CASCADE
pet_id -> pets.id
```

Indeksy:

```text
INDEX reservation_pets_reservation_idx ON reservation_pets(reservation_id)
INDEX reservation_pets_pet_idx ON reservation_pets(pet_id)
UNIQUE INDEX reservation_pets_pair_uq ON reservation_pets(reservation_id, pet_id)
```

Aplikacja musi walidować, że dodawany kot należy do klienta wskazanego przez `reservations.customer_id`.

---

## 12.9 `reservation_status_history`

Append-only historia statusów.

```text
id                   INTEGER PRIMARY KEY
reservation_id       INTEGER NOT NULL
from_status          TEXT NULL
to_status            TEXT NOT NULL
changed_by_admin_id  INTEGER NULL
reason               TEXT NULL
created_at           TEXT NOT NULL
```

FK:

```text
reservation_id -> reservations.id ON DELETE CASCADE
changed_by_admin_id -> admin_users.id
```

`changed_by_admin_id = NULL` jest dozwolone dla zmian wykonanych przez system.

Indeksy:

```text
INDEX reservation_status_history_reservation_idx
  ON reservation_status_history(reservation_id)

INDEX reservation_status_history_timeline_idx
  ON reservation_status_history(reservation_id, created_at)

INDEX reservation_status_history_to_status_idx
  ON reservation_status_history(to_status)

INDEX reservation_status_history_created_idx
  ON reservation_status_history(created_at)
```

Nie edytować i nie usuwać rekordów z tej tabeli przez standardowy UI.

---

## 12.10 `locations`

Wewnętrzne lokalizacje.

```text
id          INTEGER PRIMARY KEY
name        TEXT NOT NULL
sort_order  INTEGER NOT NULL
active      INTEGER NOT NULL DEFAULT 1
created_at  TEXT NOT NULL
updated_at  TEXT NOT NULL
```

Seed:

```text
Gniazdko 1
Gniazdko 2
Parter
Pokój
```

Constraint:

```text
CHECK(active IN (0,1))
```

Indeksy:

```text
UNIQUE INDEX locations_name_uq ON locations(name COLLATE NOCASE)
INDEX locations_active_sort_idx ON locations(active, sort_order)
```

Lokalizacji historycznie użytej nie usuwać fizycznie. Wyłączać `active = 0`.

---

## 12.11 `boxes`

Boksy.

```text
id           INTEGER PRIMARY KEY
location_id  INTEGER NOT NULL
name         TEXT NOT NULL
active       INTEGER NOT NULL DEFAULT 1
notes        TEXT NULL
created_at   TEXT NOT NULL
updated_at   TEXT NOT NULL
```

Brak `sort_order`.

Brak `capacity`.

FK:

```text
location_id -> locations.id
```

Constraint:

```text
CHECK(active IN (0,1))
```

Indeksy:

```text
UNIQUE INDEX boxes_name_uq ON boxes(name COLLATE NOCASE)
INDEX boxes_location_idx ON boxes(location_id)
INDEX boxes_location_active_idx ON boxes(location_id, active)
INDEX boxes_active_idx ON boxes(active)
```

Nazwa jest unikalna globalnie. `Box 1` nie może istnieć w dwóch lokalizacjach.

Boks historycznie użyty nie powinien być fizycznie usuwany. Używać `active = 0`.

---

## 12.12 `reservation_boxes`

Boksy przydzielone całej rezerwacji.

```text
id                    INTEGER PRIMARY KEY
reservation_id        INTEGER NOT NULL
box_id                 INTEGER NOT NULL
assigned_at            TEXT NOT NULL
removed_at             TEXT NULL
assigned_by_admin_id   INTEGER NOT NULL
```

FK:

```text
reservation_id -> reservations.id ON DELETE CASCADE
box_id -> boxes.id
assigned_by_admin_id -> admin_users.id
```

Indeksy:

```text
INDEX reservation_boxes_reservation_idx
  ON reservation_boxes(reservation_id)

INDEX reservation_boxes_box_idx
  ON reservation_boxes(box_id)

INDEX reservation_boxes_active_by_reservation_idx
  ON reservation_boxes(reservation_id, removed_at)

INDEX reservation_boxes_active_by_box_idx
  ON reservation_boxes(box_id, removed_at)
```

Dodać partial unique index:

```sql
CREATE UNIQUE INDEX reservation_boxes_active_pair_uq
ON reservation_boxes(reservation_id, box_id)
WHERE removed_at IS NULL;
```

Nie tworzyć unikalności `box_id` w czasie. Boks nie ma maksymalnej pojemności i system nie narzuca wyłączności między rezerwacjami.

Zbiór synchronizowany automatycznie z planem. Wewnętrzne wycofanie pary ustawia removed_at; administrator nie może usuwać przypisań.

---

## 12.13 `pet_box_assignments`

Bieżący, edytowalny plan rozmieszczenia. Zastępuje wcześniejszą semantykę otwartej historii faktycznych ruchów. Każdy rekord jest skończonym odcinkiem [started_at, ended_at).

```text
id                    INTEGER PRIMARY KEY
reservation_id        INTEGER NOT NULL
pet_id                INTEGER NOT NULL
box_id                INTEGER NOT NULL
started_at            TEXT NOT NULL
ended_at              TEXT NOT NULL
changed_by_admin_id   INTEGER NOT NULL
notes                 TEXT NULL
```

FK: reservation_id -> reservations.id; (reservation_id, pet_id) -> reservation_pets(reservation_id, pet_id); box_id -> boxes.id; changed_by_admin_id -> admin_users.id. UNIQUE w reservation_pets jest kluczem złożonego FK. Indeksy: (reservation_id, pet_id), (box_id, started_at, ended_at), (pet_id, started_at, ended_at).

Czas ISO 8601 z offsetem Europe/Warsaw; w walidacji porównywać momenty, nie surowe ciągi o różnych offsetach. Serwer wymaga started_at < ended_at i granic wewnątrz terminu rezerwacji.

Dla kota plan nie istnieje wcale albo jest kompletnym pokryciem pobytu. Puste przypisanie to brak rekordów, nie box_id = NULL. W stanie ACTIVE/CHECKED_IN brak planu jest niedozwolony. Pełne pokrycie i brak nakładania sprawdzać w transakcji; dodatkowo nie dopuszczać równoczesnego planu tego samego pet_id w innej rezerwacji.

Odcinki można dzielić, zastępować i scalać, również w przeszłości. Audyt zachowuje wartości przed/po; tabela nie jest niezmienialną historią. Nie ma ended_at = NULL ani domyślnego started_at = now. Szczegółowe reguły: [Kontrakt kalendarza i rozmieszczenia](kalendarz-kontrakt.md).

---

## 12.14 `payments`

Wpłaty.

```text
id                    INTEGER PRIMARY KEY
reservation_id        INTEGER NOT NULL
amount_cents          INTEGER NOT NULL
payment_date          TEXT NOT NULL
payment_method        TEXT NOT NULL
note                  TEXT NULL
created_by_admin_id   INTEGER NOT NULL
created_at            TEXT NOT NULL
updated_at            TEXT NOT NULL
```

FK:

```text
reservation_id -> reservations.id ON DELETE CASCADE
created_by_admin_id -> admin_users.id
```

Constrainty:

```text
CHECK(amount_cents > 0)
CHECK(payment_method IN ('CASH','TRANSFER','OTHER'))
```

Indeksy:

```text
INDEX payments_reservation_idx ON payments(reservation_id)
INDEX payments_date_idx ON payments(payment_date)
INDEX payments_method_idx ON payments(payment_method)
INDEX payments_reservation_date_idx
  ON payments(reservation_id, payment_date)
```

Edycja lub usunięcie wpłaty musi generować `audit_logs`.

---

## 12.15 `contact_notes`

Historia kontaktów związanych z rezerwacją.

```text
id                    INTEGER PRIMARY KEY
reservation_id        INTEGER NOT NULL
type                  TEXT NOT NULL
note                  TEXT NOT NULL
created_by_admin_id   INTEGER NOT NULL
created_at            TEXT NOT NULL
```

FK:

```text
reservation_id -> reservations.id ON DELETE CASCADE
created_by_admin_id -> admin_users.id
```

Constraint:

```text
CHECK(type IN ('PHONE','EMAIL','IN_PERSON','OTHER'))
```

Indeksy:

```text
INDEX contact_notes_reservation_idx ON contact_notes(reservation_id)
INDEX contact_notes_timeline_idx ON contact_notes(reservation_id, created_at)
INDEX contact_notes_created_idx ON contact_notes(created_at)
```

---

## 12.16 `email_templates`

Edytowalne szablony.

```text
id          INTEGER PRIMARY KEY
key         TEXT NOT NULL
name        TEXT NOT NULL
subject     TEXT NOT NULL
body        TEXT NOT NULL
active      INTEGER NOT NULL DEFAULT 1
created_at  TEXT NOT NULL
updated_at  TEXT NOT NULL
```

Klucze startowe:

```text
RESERVATION_RECEIVED_CUSTOMER
RESERVATION_RECEIVED_ADMIN
RESERVATION_CONFIRMED
RESERVATION_REJECTED
RESERVATION_CANCELLED
CUSTOMER_MAGIC_LINK
```

Constraint:

```text
CHECK(active IN (0,1))
```

Indeksy:

```text
UNIQUE INDEX email_templates_key_uq ON email_templates(key)
INDEX email_templates_active_idx ON email_templates(active)
```

`body` może używać ograniczonego, jawnie zdefiniowanego zestawu placeholderów, np.:

```text
{{customerFirstName}}
{{reservationReference}}
{{arrivalDate}}
{{departureDate}}
{{finalPrice}}
```

Nie wykonywać dowolnego kodu ani niezaufanych template expressions.

---

## 12.17 `email_logs`

Outbox i historia wysyłki.

```text
id               INTEGER PRIMARY KEY
reservation_id   INTEGER NULL
customer_id      INTEGER NULL
template_key     TEXT NOT NULL
recipient        TEXT NOT NULL
subject          TEXT NOT NULL
body_snapshot    TEXT NOT NULL
status           TEXT NOT NULL
attempts         INTEGER NOT NULL DEFAULT 0
next_attempt_at  TEXT NULL
sent_at          TEXT NULL
failed_at        TEXT NULL
error_message    TEXT NULL
created_at       TEXT NOT NULL
updated_at       TEXT NOT NULL
```

FK:

```text
reservation_id -> reservations.id ON DELETE SET NULL
customer_id -> customers.id
```

Constraint:

```text
CHECK(status IN ('PENDING','SENT','FAILED'))
CHECK(attempts >= 0)
```

Indeksy:

```text
INDEX email_logs_reservation_idx ON email_logs(reservation_id)
INDEX email_logs_customer_idx ON email_logs(customer_id)
INDEX email_logs_status_idx ON email_logs(status)
INDEX email_logs_outbox_idx ON email_logs(status, next_attempt_at)
INDEX email_logs_sent_idx ON email_logs(sent_at)
```

Wysyłkę realizować jako prosty SQLite-backed outbox. Nie blokować transakcji rezerwacji na zewnętrznym SMTP.

---

## 12.18 `pages`

Podstawowe treści CMS.

```text
id               INTEGER PRIMARY KEY
slug             TEXT NOT NULL
title            TEXT NOT NULL
content          TEXT NOT NULL
seo_title        TEXT NULL
seo_description  TEXT NULL
published        INTEGER NOT NULL DEFAULT 1
created_at       TEXT NOT NULL
updated_at       TEXT NOT NULL
```

Constraint:

```text
CHECK(published IN (0,1))
```

Indeksy:

```text
UNIQUE INDEX pages_slug_uq ON pages(slug)
INDEX pages_published_idx ON pages(published)
```

`content` może być bezpiecznym Markdownem lub ustrukturyzowanym JSON-em. Jeśli używany jest Markdown, renderować go przez bezpieczny renderer bez surowego HTML.

Cennika nie przechowywać w `pages.content`.

---

## 12.19 `faq_items`

```text
id          INTEGER PRIMARY KEY
question    TEXT NOT NULL
answer      TEXT NOT NULL
sort_order  INTEGER NOT NULL
active      INTEGER NOT NULL DEFAULT 1
created_at  TEXT NOT NULL
updated_at  TEXT NOT NULL
```

Constraint:

```text
CHECK(active IN (0,1))
```

Indeks:

```text
INDEX faq_items_active_sort_idx ON faq_items(active, sort_order)
```

---

## 12.20 `gallery_items`

```text
id            INTEGER PRIMARY KEY
storage_key   TEXT NOT NULL
alt_text      TEXT NOT NULL
caption       TEXT NULL
category      TEXT NULL
sort_order    INTEGER NOT NULL
active        INTEGER NOT NULL DEFAULT 1
created_at    TEXT NOT NULL
updated_at    TEXT NOT NULL
```

Constraint:

```text
CHECK(active IN (0,1))
```

Indeksy:

```text
UNIQUE INDEX gallery_items_storage_key_uq ON gallery_items(storage_key)
INDEX gallery_items_active_sort_idx ON gallery_items(active, sort_order)
INDEX gallery_items_category_idx ON gallery_items(category, active, sort_order)
```

Publiczny URL budować z `storage_key`; nie przechowywać sekretów ani signed URLs w DB.

---

## 12.21 `site_announcements`

```text
id          INTEGER PRIMARY KEY
title       TEXT NULL
content     TEXT NOT NULL
starts_at   TEXT NULL
ends_at     TEXT NULL
active      INTEGER NOT NULL DEFAULT 1
created_at  TEXT NOT NULL
updated_at  TEXT NOT NULL
```

Constraint:

```text
CHECK(active IN (0,1))
CHECK(ends_at IS NULL OR starts_at IS NULL OR ends_at >= starts_at)
```

Indeksy:

```text
INDEX site_announcements_active_idx ON site_announcements(active)
INDEX site_announcements_range_idx ON site_announcements(starts_at, ends_at)
```

---

## 12.22 `system_settings`

Singleton z ustawieniami operacyjnymi.

```text
id                            INTEGER PRIMARY KEY CHECK(id = 1)
guest_retention_days          INTEGER NOT NULL
saved_profile_retention_days  INTEGER NOT NULL
popular_term_enabled          INTEGER NOT NULL DEFAULT 1
popular_term_threshold        INTEGER NOT NULL
admin_notification_email      TEXT NOT NULL
updated_at                    TEXT NOT NULL
```

Constrainty:

```text
CHECK(guest_retention_days > 0)
CHECK(saved_profile_retention_days > 0)
CHECK(popular_term_enabled IN (0,1))
CHECK(popular_term_threshold > 0)
```

Nie używać dowolnego key-value store dla tych ustawień. Jawne kolumny ułatwiają typowanie i walidację.

Zmiana ustawień generuje `audit_logs`.

---

## 12.23 `retention_jobs`

Kolejka retencji.

```text
id             INTEGER PRIMARY KEY
customer_id    INTEGER NOT NULL
action_type    TEXT NOT NULL
scheduled_for  TEXT NOT NULL
status         TEXT NOT NULL
executed_at    TEXT NULL
error_message  TEXT NULL
created_at     TEXT NOT NULL
updated_at     TEXT NOT NULL
```

FK:

```text
customer_id -> customers.id
```

Constrainty:

```text
CHECK(action_type IN (
  'ANONYMIZE_CUSTOMER',
  'ANONYMIZE_PETS',
  'DELETE_LOGIN_TOKENS'
))

CHECK(status IN (
  'PENDING',
  'DONE',
  'FAILED',
  'CANCELLED'
))
```

Indeksy:

```text
INDEX retention_jobs_due_idx ON retention_jobs(status, scheduled_for)
INDEX retention_jobs_customer_idx ON retention_jobs(customer_id)
```

Retention worker powinien być idempotentny.

---

## 12.24 `audit_logs`

Append-only dziennik ważnych operacji.

```text
id             INTEGER PRIMARY KEY
admin_user_id  INTEGER NULL
action         TEXT NOT NULL
entity_type    TEXT NOT NULL
entity_id      TEXT NOT NULL
before_data    TEXT NULL
after_data     TEXT NULL
created_at     TEXT NOT NULL
```

FK:

```text
admin_user_id -> admin_users.id
```

`before_data` i `after_data` przechowywać jako JSON text.

Nie zapisywać sekretów, haseł, tokenów, TOTP secretów ani pełnych danych uwierzytelniających.

Indeksy:

```text
INDEX audit_logs_admin_idx ON audit_logs(admin_user_id)
INDEX audit_logs_entity_idx ON audit_logs(entity_type, entity_id)
INDEX audit_logs_created_idx ON audit_logs(created_at)
```

Przykładowe `action`:

```text
RESERVATION_STATUS_CHANGED
RESERVATION_PRICE_CHANGED
PAYMENT_ADDED
PAYMENT_UPDATED
PAYMENT_DELETED
BOX_ASSIGNED
BOX_REMOVED
PET_MOVED
CUSTOMER_UPDATED
PET_UPDATED
PRICE_RATE_CHANGED
CMS_UPDATED
SETTINGS_CHANGED
```

---

## 12.25 Operacje rezerwacji i równoczesna edycja

Tabela reservation_operations: operation_id TEXT PRIMARY KEY, reservation_id INTEGER NOT NULL FK, admin_id INTEGER NOT NULL FK, request_hash TEXT NOT NULL, result_json TEXT NOT NULL, created_at TEXT NOT NULL. Rekord wyniku jest zapisywany w tej samej transakcji co mutacja. Ten sam klucz i ten sam payload zwracają ten sam wynik; inny payload pod tym samym kluczem daje błąd. Nie przechowywać sekretów.

Każda mutacja danych rezerwacji/odcinków zwiększa reservations.plan_version, także edycja statusu, notatki, terminu lub rozliczenia. Serwer porównuje expectedVersion wewnątrz transakcji; przy rozbieżności zwraca 409, aktualną wersję, stan i autora zmiany. SQLite: transakcja z blokadą zapisu i ponowną walidacją. Wersja nie zastępuje walidacji zasobów.

GET /admin/reservations/:id/operations/:operationId jest uwierzytelnionym odczytem wyniku. Przy braku potwierdzenia klient sprawdza wynik, a dopiero potem bezpiecznie ponawia ten sam klucz; nie tworzy nowej operacji. Brak rekordu nie dowodzi, że pierwotne żądanie nie jest jeszcze w toku — unikalność i transakcja rozstrzygają wyścig.

Wyłączenie boksu/lokalizacji jest blokowane, jeśli korzysta z nich plan NEW/ACTIVE/CHECKED_IN. Zmiany terminalne zachowują plan do historii i eksportu. Edycja danych przeszłych jest dozwolona z audytem. Nie ma osobnej tabeli wykonania przemieszczeń.

---
# 13. Diagram relacji

```text
CUSTOMER
│
├──< PET
│      │
│      └──────< PET_BOX_ASSIGNMENT >──── BOX >──── LOCATION
│
├──< CUSTOMER_CONSENT
├──< CUSTOMER_LOGIN_TOKEN
│
└──< RESERVATION >──── PRICE_RATE
       │
       ├──< RESERVATION_PET >──── PET
       ├──< RESERVATION_BOX >──── BOX
       ├──< PET_BOX_ASSIGNMENT
       ├──< RESERVATION_STATUS_HISTORY
       ├──< PAYMENT
       ├──< CONTACT_NOTE
       └──< EMAIL_LOG

ADMIN_USER
│
├── status history
├── reservation box assignment
├── pet movement
├── payment
├── contact note
└── audit log
```

---

# 14. Retencja danych

## ONE_TIME

Anchor retencji:

- `completed_at` dla zakończonego pobytu,
- `rejected_at` dla odrzuconego zgłoszenia,
- `cancelled_at` dla anulowanego zgłoszenia/rezerwacji.

Termin:

```text
anchor + system_settings.guest_retention_days
```

Po osiągnięciu terminu:

- anulować aktywne magic-link tokens,
- anonimizować dane klienta,
- anonimizować dane kotów,
- zachować niezbędne identyfikatory techniczne i historię operacyjną,
- nie usuwać historii statusów i danych agregacyjnych potrzebnych do raportowania.

## KEEP_FOR_FUTURE

Anchor:

```text
customers.last_reservation_at
```

Jeżeli klient nie ma bieżącej ani przyszłej aktywnej rezerwacji i przekroczony został:

```text
system_settings.saved_profile_retention_days
```

utworzyć job retencji.

Nowa rezerwacja lub aktywność klienta przed wykonaniem joba może go anulować i przeliczyć termin.

Wszystkie operacje muszą być idempotentne.

---

# 15. Tworzenie nowego zgłoszenia

Operacja publiczna powinna być transakcyjna.

Sekwencja:

1. walidacja payloadu,
2. walidacja dat,
3. walidacja wybranej publicznej stawki,
4. utworzenie `customer`,
5. zapis zgód,
6. utworzenie `pets`,
7. utworzenie `reservation` ze statusem `NEW`,
8. przypięcie kotów przez `reservation_pets`,
9. snapshot stawki,
10. wyliczenie `calculated_price_cents`,
11. ustawienie `final_price_cents = calculated_price_cents`,
12. utworzenie pierwszego `reservation_status_history`:
   - `from_status = NULL`
   - `to_status = NEW`,
13. utworzenie pending e-maila do klienta,
14. utworzenie pending e-maila do administratora,
15. commit.

Boksy nie są przypisywane przez klienta.

---

# 16. Aktywacja rezerwacji

Operacja `activateReservation(reservationId, adminId)`:

1. pobierz rezerwację,
2. sprawdź `status === NEW`,
3. sprawdź pełne pokrycie pobytu każdego kota oraz aktywność boksów i lokalizacji,
4. w transakcji:
   - `status = ACTIVE`,
   - `activated_at = now`,
   - insert `reservation_status_history`,
   - insert `audit_logs`,
   - enqueue `RESERVATION_CONFIRMED`,
5. commit.

---

# 17. Odrzucenie i anulowanie

`rejectReservation`:

- tylko `NEW -> REJECTED`,
- ustawia `rejected_at`,
- zapisuje history + audit,
- enqueue e-mail.

`cancelReservation`:

- `NEW -> CANCELLED` lub `ACTIVE -> CANCELLED`,
- ustawia `cancelled_at`,
- zapisuje history + audit,
- enqueue e-mail.

---

# 18. Check-in i zakończenie pobytu

`checkInReservation`:

- tylko `ACTIVE -> CHECKED_IN`,
- nie tworzy nowego odcinka; plan jest przyjmowany jako rozmieszczenie,
- ustawia `checked_in_at`,
- history + audit.

`completeReservation`:

- tylko `CHECKED_IN -> COMPLETED`,
- ustawia `completed_at`,
- zachowuje skończone odcinki i wyłącza rezerwację z operacyjnego kalendarza; nie tworzy fikcyjnego ruchu,
- aktualizuje `customers.last_reservation_at`,
- tworzy lub aktualizuje odpowiedni `retention_job`,
- history + audit.

---

# 19. Pierwsze przypisanie i zbiór boksów

assignPetPlan(reservationId, petIds, targetBoxId, expectedVersion, operationId): pierwszy przydział pełnego pobytu wybranych kotów tej samej rezerwacji. Docelowy boks i lokalizacja muszą być aktywne. Koty muszą należeć do rezerwacji i nie mieć jeszcze planu. Nie przyjmować częściowego pierwszego zakresu.

W transakcji: sprawdź wersję i przynależność, utwórz odcinki od przyjazdu do odbioru, sprawdź niezmienniki, zsynchronizuj reservation_boxes, zwiększ plan_version, zapisz audyt i wynik operacji.

reservation_boxes jest pochodnym zbiorem unikalnych boksów występujących w planie danej rezerwacji. Nowe pary są dopisywane, już użyte mogą zostać ponownie aktywowane; pary nieobecne w planie dostają removed_at. Jest to wewnętrzna synchronizacja, nie akcja usuwania przypisania przez administratora. Nie udostępniać removeBoxFromReservation ani samodzielnego assignBoxToReservation w UI/API.

Nie ma limitu pojemności ani wyłączności boksu pomiędzy rezerwacjami.

# 20. Edycja rozmieszczenia i terminu

movePetSegments(reservationId, segmentIds, targetBoxId, range?, expectedVersion, operationId): przenosi wybrane odcinki jednej rezerwacji. Opcjonalny zakres jest dozwolony, gdy mieści się w każdym wybranym odcinku i nie wybieramy kilku odcinków tego samego kota. Zachować daty i niezaznaczone fragmenty. Nie wywoływać starego movePet z momentem now.

updateReservationStay(reservationId, arrivalDateTime, departureDateTime, expectedVersion, operationId): zmienia termin wszystkich kotów, dostosowuje skrajne odcinki zgodnie z kontraktem, przelicza cenę i zachowuje ręczną cenę końcową.

Obie operacje atomowo walidują stan/wersję, wyliczają nowy kompletny plan, sprawdzają zasoby i przedziały, zapisują odcinki, scalają sąsiadujące tej samej rezerwacji/kota/boksu, synchronizują reservation_boxes, zwiększają wersję i zapisują audyt oraz wynik operationId. Błąd jednego kota cofa całą grupę. Zajętość boksu przez inne rezerwacje daje kontekst ostrzeżenia, nie blokadę.

Kontrakt odczytu getCalendar(startDate, days, filters): aktywne lokalizacje/boksy, NEW/ACTIVE/CHECKED_IN/COMPLETED (Zakończona w szarości), odcinki przecinające okno, koty bez planu, saldo rezerwacji, wersje i metadane ostrzeżeń obliczone z pełnych danych niezależnie od filtrów UI. Wyszukiwanie przygasza; filtry ukrywają. Podgląd celu i zmiany terminu wymaga oceny całego proponowanego przedziału.

Wspólny dom: reservation_id. Nigdy nie grupować mutacji po nazwisku/customer_id. Przedziały [od, do), brak obowiązkowych buforów. [Kontrakt kalendarza i rozmieszczenia](kalendarz-kontrakt.md) precyzuje cykl życia, DST, kolejkę i adaptację terminów.

---

# 21. Publiczny cennik

Endpoint / loader cennika może zwrócić wyłącznie:

```sql
WHERE active = 1
AND visible_on_website = 1
```

Dane publiczne pozycji:

```text
id
name
pricePerDay
```

Nie zwracać stawek ukrytych.

Pozycja wybrana przez klienta podczas formularza musi być w chwili submitu nadal:

```text
active = 1
visible_on_website = 1
```

Jeśli nie, zwrócić błąd walidacji i poprosić UI o odświeżenie cennika.

---

# 22. Panel cennika

Administrator może:

- dodać stawkę,
- zmienić nazwę,
- zmienić cenę,
- ustawić `visible_on_website`,
- ustawić `active`.

Nie usuwać fizycznie stawek użytych przez rezerwacje.

---

# 23. E-mail outbox

Nie wysyłać e-maila bezpośrednio wewnątrz transakcji tworzącej rezerwację/status.

Transakcja tworzy `email_logs(status = PENDING)` z snapshotem subject/body.

Worker:

1. pobiera rekordy `PENDING`,
2. wysyła przez provider,
3. ustawia `SENT` i `sent_at`,
4. przy błędzie zwiększa `attempts`,
5. ustawia `next_attempt_at`,
6. po przekroczeniu limitu oznacza `FAILED`.

Dzięki `body_snapshot` późniejsza edycja szablonu nie zmienia treści historycznie wysłanej wiadomości.

---

# 24. Eksport `.xlsx`

Eksport generowany wyłącznie po stronie serwera.

Filtry:

- zakres dat,
- status,
- arrival/departure,
- active stays,
- paid/unpaid/overpaid.

Podstawowe kolumny:

```text
referenceCode
createdAt
status
arrivalDate
arrivalTime
departureDate
departureTime

customerName
phone
email

pets
petCount

locations
boxes

priceRateName
pricePerDay
calculatedPrice
finalPrice
paid
remaining

paymentMethods

adminNotes
```

Dla wielu kotów, boksów lub metod płatności wartości można serializować w jednej komórce jako listę rozdzieloną przecinkami lub znakami nowej linii.

Nie eksportować danych zanonimizowanych jako aktywnych danych klienta.

---

# 25. CMS

CMS jest częścią `/admin`.

Brak dowolnego page buildera.

Formularze administracyjne edytują konkretne typy danych:

- `pages`,
- `faq_items`,
- `gallery_items`,
- `site_announcements`,
- `price_rates`.

Publiczna strona cennika zawsze czyta z `price_rates`, nie z ręcznie wpisanego tekstu.

Treści renderowane z CMS muszą być sanityzowane.

---

# 26. Autoryzacja administratora

Wymagania:

- e-mail + hasło,
- hasła hashowane bezpiecznym współczesnym algorytmem,
- 2FA TOTP,
- zabezpieczone cookie sesyjne:
  - `HttpOnly`,
  - `Secure`,
  - `SameSite`,
- rate limit logowania,
- brak dostępu do `/admin` bez aktywnej sesji,
- serwerowa autoryzacja każdej mutacji.

Nie polegać na ukrywaniu przycisków w frontendzie.

---

# 27. Bezhasłowy dostęp klienta

Magic link:

- wygenerować kryptograficznie losowy token,
- do DB zapisać wyłącznie hash,
- surowy token wysłać e-mailem,
- krótki czas ważności,
- jednorazowe użycie,
- rate limit endpointu żądania linku,
- odpowiedź endpointu nie może ujawniać, czy podany e-mail istnieje w bazie.

Przykładowa odpowiedź dla wszystkich przypadków:

> Jeśli podany adres jest zapisany w systemie, wysłaliśmy wiadomość z linkiem.

---

# 28. Ochrona formularza publicznego

Wymagane:

- walidacja server-side,
- rate limiting,
- CSRF protection tam, gdzie ma zastosowanie,
- prosty honeypot przeciw botom,
- limit długości pól tekstowych,
- normalizacja telefonu/e-maila,
- brak zaufania do ceny przesłanej przez klienta.

Cena zawsze jest pobierana z `price_rates` po stronie serwera i snapshotowana.

Klient przesyła wyłącznie `priceRateId`.

---

# 29. Walidacja danych wejściowych

Stworzyć współdzielone schematy TypeScript dla formularzy i backendu.

Przykładowe limity:

- imię/nazwisko: rozsądny limit znaków,
- e-mail: poprawny format,
- telefon: po normalizacji niepusty,
- nazwa kota: limit,
- notatki: limit chroniący DB/UI,
- różnica dat odbioru i przyjazdu >= 2; obie godziny wymagane,
- minimum jeden kot w zgłoszeniu,
- klient musi zaakceptować wymagane zgody,
- przy aktywacji pełny plan każdego kota.

Nie przyjmować dowolnych właściwości spoza schema payloadu.

---

# 30. SQLite i deployment

SQLite jest świadomym wyborem dla skali biznesu Kociego Gniazdka.

Wymagania infrastrukturalne:

- pojedynczy write node,
- persistent volume,
- brak deploymentu, w którym baza znajduje się na efemerycznym filesystemie serverless,
- WAL mode,
- rozsądny `busy_timeout`,
- regularny `PRAGMA foreign_keys = ON`,
- migracje wykonywane kontrolowanie podczas deployu.

Backup:

- automatyczny co najmniej raz dziennie,
- kopia poza głównym serwerem,
- backup wykonywany metodą bezpieczną dla działającego SQLite,
- okresowe testy odtworzenia.

---

# 31. Migracja do PostgreSQL w przyszłości

Nie używamy PostgreSQL, ale schema ma pozostać przenośna.

Unikać:

- SQLite-specific business logic rozsianego po aplikacji,
- ręcznych raw SQL query bez wrappera, jeśli Drizzle obsługuje przypadek,
- przechowywania złożonych struktur jako niepotrzebnych blobów.

Dozwolone SQLite-specific elementy:

- WAL,
- partial unique index dla aktywnych `reservation_boxes`,
- indeksy `COLLATE NOCASE`.

Logika domenowa pozostaje niezależna od silnika DB.

---

# 32. Transakcje

Transakcji wymagają minimum:

- utworzenie zgłoszenia,
- zmiana statusu,
- pierwszy przydział i synchronizacja zbioru boksów z planem,
- przeniesienie kota,
- zmiana ceny,
- dodanie/edycja/usunięcie wpłaty wraz z audytem,
- operacje retencji obejmujące wiele tabel.

Nie dopuszczać do sytuacji, w której np. `reservations.status` zmieni się bez odpowiedniego `reservation_status_history`.

---

# 33. Audit

Audit log jest dodatkowy wobec wyspecjalizowanych historii.

Przykład:

- `reservation_status_history` jest źródłem historii statusu,
- `audit_logs` informuje, kto wykonał operację i jakie dane zmieniono.

Audyt nie może zawierać:

- password hash,
- surowych magic-link tokenów,
- TOTP secretów,
- danych sesyjnych.

---

# 34. Cache

Dane często zmieniające się:

- rezerwacje,
- statusy,
- boksy,
- płatności,
- popularność terminu

nie mogą być agresywnie cache'owane.

Publiczne treści CMS i galeria mogą używać cache/revalidation.

Po zmianie CMS/cennika należy invalidować odpowiednie publiczne cache.

---

# 35. Dostępność i mobile-first

Publiczny frontend i `/admin` muszą być responsywne.

Wymagania:

- formularze używalne na telefonie,
- duże cele dotykowe,
- widoczne focus states,
- etykiety formularzy,
- błędy powiązane z polami,
- status niekomunikowany wyłącznie kolorem,
- specjalizowany wariant mobilny admina jest etapem późniejszym; obecnie priorytet desktop i zoom 150%,
- poprawna obsługa klawiatury,
- semantyczny HTML.

---

# 36. SEO i migracja

Publiczna strona ma mieć:

- sitemap,
- robots.txt,
- canonical,
- Open Graph,
- sensowne metadata,
- schema.org dla lokalnej działalności, jeśli dane są dostępne,
- zoptymalizowane zdjęcia,
- poprawne 404.

Przy migracji starej strony przygotować 301 redirecty dla istniejących ważnych adresów.

Nie odtwarzać starych technicznych attachment pages.

---

# 37. Testy

## Unit tests

Dodatkowo obowiązuje pełna lista scenariuszy z kontraktu kalendarza: ciągłość, grupy, scalanie, wersje, idempotencja, granice czasu/DST, zmiana terminu i cena ręczna.

Minimum dla:

- dozwolonych przejść statusów,
- warunku `NEW -> ACTIVE`,
- kalkulacji `billableDays`,
- kalkulacji ceny,
- zachowania ceny ręcznie zmienionej,
- sumowania wpłat,
- popularności terminu,
- retencji.

## Integration tests

Minimum:

- utworzenie publicznego zgłoszenia,
- zapis historii statusu,
- aktywacja z boxem,
- odrzucenie aktywacji bez boxa,
- przypisanie pełnego pobytu kota i zmiana boksu z synchronizacją planu,
- przeniesienie kota,
- zmiana stawki bez wpływu na historyczną rezerwację,
- dodanie wielu wpłat,
- email outbox,
- anonimizacja.

## E2E

Minimum:

1. klient wysyła nowe zgłoszenie,
2. administrator je widzi,
3. administrator przypisuje boks,
4. administrator aktywuje,
5. klient otrzymuje potwierdzenie,
6. administrator wykonuje check-in,
7. administrator przenosi kota,
8. administrator dodaje wpłaty,
9. administrator kończy pobyt,
10. rezerwacja trafia do archiwum i harmonogramu retencji.

---

# 38. Seed danych

Seed developerski powinien tworzyć:

## Locations

```text
Gniazdko 1
Gniazdko 2
Parter
Pokój
```

## Price rates

```text
Z własną karmą
Z karmą hotelu
```

Kwoty seedowe konfigurować zgodnie z aktualnym cennikiem podczas wdrożenia, nie hardcodować ich w logice domenowej.

## E-mail templates

Wszystkie klucze wymagane.

## Pages

Podstawowe slugi potrzebne publicznej stronie.

---

# 39. Reguły kasowania rekordów

Preferować dezaktywację lub anonimizację zamiast `DELETE` dla encji historycznych.

Nie usuwać fizycznie:

- historycznie użytych `price_rates`,
- historycznie użytych `locations`,
- historycznie użytych `boxes`,
- `reservation_status_history`,
- `audit_logs`.

`reservation_boxes` usuwać logicznie przez `removed_at`.

Dane osobowe klienta i kota podlegają osobnemu procesowi retencji/anonymizacji.

---

# 40. Zasady implementacyjne dla agenta

1. Nie zmieniaj ustalonego workflow statusów bez jawnego wymagania.
2. Nie dodawaj statusu `TO_CONTACT`.
3. `NEW` ma kolor żółty.
4. Nie aktywuj rezerwacji bez pełnego planu każdego kota na cały pobyt w aktywnych boksach aktywnych lokalizacji.
5. Nie dodawaj pojemności maksymalnej boksu.
6. Nazwa boksu jest globalnie unikalna.
7. Nie dodawaj `sortOrder` do `boxes`.
8. `locations` zachowują `sortOrder`.
9. Nie ujawniaj danych boksów publicznie.
10. Nie buduj publicznego kalendarza dostępności.
11. Publicznie pokazuj co najwyżej boolean/komunikat „popularny termin”.
12. Nie dodawaj płatności online.
13. Rezerwacja może mieć dowolną liczbę wpłat.
14. Pozostałą kwotę zawsze wyliczaj dynamicznie.
15. Cennik jest osobną tabelą.
16. Rezerwacja przechowuje snapshot stawki.
17. Zmiana cennika nie zmienia historycznych rezerwacji.
18. Cena końcowa może być skorygowana ręcznie.
19. Nie nadpisuj ręcznej ceny przy zmianie terminu.
20. Nie dodawaj WordPressa.
21. CMS ma być częścią aplikacji Next.js.
22. Używaj jednej tabeli `reservations`.
23. Historia statusów jest obowiązkowa i append-only.
24. Notatki kontaktowe są osobną historią.
25. Klient nie musi zakładać konta.
26. Ponowne użycie zapisanych danych wymaga passwordless magic link.
27. Nie łącz klientów wyłącznie po adresie e-mail.
28. Retencja ma działać automatycznie i być idempotentna.
29. Wszystkie mutacje biznesowe waliduj na serwerze.
30. Wszystkie krytyczne wielotabelowe operacje wykonuj transakcyjnie.
31. Pisz kod tak, aby przyszła migracja SQLite -> PostgreSQL nie wymagała przepisywania logiki domenowej.

---

# 41. Definition of Done

Wersja 2.0 jest technicznie ukończona, gdy:

- publiczna strona działa responsywnie,
- publiczny formularz tworzy poprawne `NEW`,
- klient może wybrać publiczną stawkę,
- publiczny endpoint popularności nie ujawnia obłożenia,
- administrator ma działający panel,
- rezerwacje obsługują pełny ustalony workflow,
- aktywacja bez pełnego planu wszystkich kotów jest niemożliwa,
- lokalizacje i boksy działają,
- edytowalny plan rozmieszczenia i audyt zmian działają zgodnie z kontraktem kalendarza,
- cennik jest edytowalny,
- kalkulacja i ręczna korekta ceny działają,
- dowolna liczba wpłat działa,
- saldo jest wyliczane poprawnie,
- status history działa,
- contact notes działają,
- e-mail outbox działa,
- `.xlsx` export działa,
- CMS działa bez WordPressa,
- retencja i anonimizacja działają,
- audit log działa,
- backup SQLite jest skonfigurowany,
- najważniejsze reguły domenowe są pokryte testami,
- publiczne API nie ujawnia danych wewnętrznych o boksach i lokalizacjach.
