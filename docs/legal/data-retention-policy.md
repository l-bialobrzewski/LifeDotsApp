# Polityka retencji danych

Wersja: 1.0.0 · Wersja robocza

## Zasada ogólna

Dane osobowe przechowujemy tylko tak długo, jak jest to niezbędne do celu, dla
którego zostały zebrane (art. 5(1)(e) RODO — minimalizacja retencji).

## Okresy retencji per kategoria danych

| Kategoria danych | Okres przechowywania | Zdarzenie kończące retencję |
|---|---|---|
| Dane konta (e-mail, profil) | Do usunięcia konta przez użytkownika | Samoobsługowe usunięcie konta (`app/api/account/delete`) |
| Wpisy nastroju / notatki (art. 9) | Do usunięcia konta **lub** wycofania zgody na dane o nastroju | Wycofanie zgody → automatyczne usunięcie wpisów (`withdrawHealthConsent` w `app/dashboard/actions.ts`) |
| Log zgód (`consents`) | Przechowywany także po wycofaniu zgody / usunięciu wpisów, jako dowód rozliczalności, przez okres [do potwierdzenia z prawnikiem, orientacyjnie 3 lata] | Automatyczne czyszczenie po okresie retencji [do zaimplementowania w v2] |
| Log żądań (`data_requests`) | 3 lata (cele dowodowe realizacji praw RODO) | Zadanie okresowego czyszczenia [backlog] |
| Logi błędów (Sentry) | 90 dni (domyślna retencja dostawcy) | Automatyczne wygaszanie przez dostawcę |
| Backupy bazy danych (PITR) | 7 dni (plan Pro) | Automatyczna rotacja przez Supabase |

## Usunięcie konta — co dokładnie się dzieje

1. Żądanie trafia do `app/api/account/delete/route.ts`
2. Wpis w `data_requests` (typ `delete`) do celów dowodowych
3. Usunięcie użytkownika z `auth.users` przez Supabase Admin API
4. Kaskadowe usunięcie powiązanych wierszy (`profiles`, `dot_entries`, `consents`)
   dzięki `ON DELETE CASCADE` w schemacie (`supabase/migrations/0001_init_schema.sql`)
5. Dane pozostają jeszcze do 7 dni w backupach PITR (przeznaczenie: disaster
   recovery, nie normalne przetwarzanie) — po tym czasie usuwane trwale przez
   rotację backupów dostawcy

## Rewizja

Polityka podlega rewizji co 12 miesięcy lub przy istotnej zmianie architektury/
podprocesorów.
