# Rejestr Czynności Przetwarzania (RCP / ROPA) — art. 30 RODO

Administrator: [Nazwa podmiotu] · Wersja: 1.0.0 · Wersja robocza

| # | Czynność przetwarzania | Cel | Kategorie danych | Kategorie osób | Podstawa prawna | Odbiorcy / podprocesorzy | Okres przechowywania | Środki bezpieczeństwa |
|---|---|---|---|---|---|---|---|---|
| 1 | Rejestracja i zarządzanie kontem | Świadczenie usługi, autentykacja | E-mail, hash hasła | Użytkownicy końcowi | Art. 6(1)(b) — wykonanie umowy | Supabase (EU, Frankfurt) | Do usunięcia konta | TLS, RLS, hashowanie hasła (Supabase Auth) |
| 2 | Generowanie siatki życia | Realizacja funkcji głównej | Data urodzenia, oczekiwana długość życia | Użytkownicy końcowi | Art. 6(1)(b) | Supabase (EU) | Do usunięcia konta | RLS |
| 3 | Rejestrowanie nastroju/notatek | Umożliwienie samorefleksji (funkcja główna) | Ocena nastroju (1-5), notatka tekstowa, tagi — **dane szczególnej kategorii zdrowia (art. 9)** | Użytkownicy końcowi | **Art. 9(2)(a) — wyraźna zgoda** | Supabase (EU) | Do wycofania zgody lub usunięcia konta | Szyfrowanie AES-256-GCM notatek, RLS, brak logowania treści w Sentry |
| 4 | Zarządzanie zgodami | Wykazanie zgodności z art. 7(1) | Znacznik czasu zgody, wersja polityki, status wycofania | Użytkownicy end. | Art. 6(1)(c) — obowiązek prawny (rozliczalność) | Supabase (EU) | Zgodnie z ogólnym okresem retencji konta + [okres archiwizacji do potwierdzenia] | RLS, log niemodyfikowalny (append-only w praktyce operacyjnej) |
| 5 | Realizacja praw podmiotu danych (eksport/usunięcie) | Zgodność z art. 15/17/20 | Metadane żądania (typ, status, data) | Użytkownicy końcowi | Art. 6(1)(c) | Supabase (EU) | 3 lata po realizacji (cele dowodowe) — do potwierdzenia z prawnikiem | RLS |
| 6 | Monitorowanie błędów technicznych | Bezpieczeństwo i stabilność usługi | Stack trace, metadane sesji (bez treści notatek/nastroju) | Użytkownicy końcowi | Art. 6(1)(f) — uzasadniony interes | Sentry (region EU) | 90 dni (domyślna retencja Sentry) | Scrubbing PII w konfiguracji Sentry |
| 7 | Hosting i dostarczanie aplikacji | Świadczenie usługi | Adres IP, logi żądań HTTP | Użytkownicy końcowi | Art. 6(1)(f) | Vercel Inc. (US, SCC) | Zgodnie z domyślną retencją logów dostawcy | TLS, ograniczony dostęp do logów |
| 8 | Waitlist kampanii wiralowej (pre-beta) | Powiadomienie o starcie bety | E-mail, parametry UTM kampanii (źródło, medium, campaign) | Osoby zapisujące się na waitlistę | Art. 6(1)(a) — zgoda | Supabase (EU) lub Tally (EU) — patrz docs/marketing/week-0-setup.md | Do wycofania zgody / usunięcia z listy / startu bety + [okres do potwierdzenia] | Brak danych art. 9; zapis przez API (service role) lub zewnętrzny formularz z DPA |

## Uwagi

- Wiersze #3 i #4 to czynności o **najwyższym ryzyku** (dane art. 9) — wymagają
  szczególnej uwagi przy audytach i priorytetowej rewizji przy każdej zmianie
  funkcjonalności (np. dodanie AI/analityki).
- Rejestr wymaga rewizji przy: dodaniu nowego podprocesora, zmianie celu
  przetwarzania, wprowadzeniu płatności (Stripe), wprowadzeniu analityki/AI na
  danych nastroju.
- Właściciel rejestru: [osoba/rola odpowiedzialna, np. założyciel / IOD jeśli wyznaczony].
