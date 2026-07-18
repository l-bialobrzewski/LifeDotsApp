# Checklist launchu MVP LifeDots

Zbiorcza lista kontrolna łącząca wymagania architekta IT, DevOps, marketingu i
zgodności RODO — do odznaczenia przed każdym istotnym etapem (beta → publiczny launch).

## Architektura / kod

- [ ] `npm install` przechodzi bez błędów
- [ ] `npm run typecheck` i `npm run lint` przechodzą bez błędów
- [ ] `npm run build` przechodzi lokalnie i w CI
- [ ] Projekt Supabase utworzony w regionie **EU Central (Frankfurt)**
- [ ] Migracje zastosowane (`supabase db push`), RLS ręcznie zweryfikowane
      dwoma testowymi kontami

## DevOps

- [ ] CI (`.github/workflows/ci.yml`) zielony na `main`
- [ ] Sekrety uzupełnione w GitHub Actions i Vercel (patrz `docs/devops/environments.md`)
- [ ] Sentry podłączony, PII scrubbing potwierdzony testem (wysłanie testowego błędu
      z notatką — treść notatki NIE powinna pojawić się w Sentry)
- [ ] Uptime monitoring aktywny na `/api/health`
- [ ] PITR/backup aktywny na projekcie produkcyjnym Supabase

## Prawne / RODO

- [ ] DPIA (`docs/dpia.md`) zatwierdzone
- [ ] Polityka prywatności i regulamin — finalna wersja prawna opublikowana
      pod `/privacy` i `/terms`
- [x] Rejestr czynności przetwarzania (`docs/legal/ropa.md`) — dane administratora
      (Łukasz Białobrzewski) uzupełnione
- [x] Procedura naruszeń (`docs/legal/breach-procedure.md`) — kontakty uzupełnione
- [ ] Test end-to-end: rejestracja → zgoda → wpis → eksport danych → wycofanie
      zgody (usuwa wpisy) → usunięcie konta (usuwa wszystko)

## Marketing

- [ ] Landing page (`/`) opublikowany
- [ ] Materiały launchowe (Product Hunt, posty społecznościowe) przygotowane —
      patrz `docs/marketing/gtm-plan.md`
- [ ] Funkcja udostępniania siatki przetestowana na realnych danych testowych

## Beta / launch

- [ ] Zamknięta beta zakończona, feedback zebrany i przeanalizowany
      (`docs/marketing/beta-launch-plan.md`)
- [ ] Metryki aktywacji/retencji zmierzone względem celów z `gtm-plan.md`
- [ ] Decyzja Go/No-Go podjęta przez właściciela produktu
