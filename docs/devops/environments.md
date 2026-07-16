# DevOps — środowiska, monitoring, backupy

## 1. Środowiska

| Środowisko | Frontend | Baza danych | Cel |
|---|---|---|---|
| **dev (lokalny)** | `next dev` na `localhost:3000` | Supabase lokalny (`supabase start`) lub osobny projekt "dev" | codzienna praca dewelopera, dane testowe |
| **staging** | Vercel Preview (auto-deploy z `main`) | Osobny projekt Supabase "lifedots-staging" (region EU) | testy integracyjne, QA przed produkcją — **nigdy realne dane użytkowników** |
| **production** | Vercel Production (`lifedots.app`) | Projekt Supabase "lifedots-prod" (region EU Frankfurt) | realny ruch użytkowników |

Zasada: **żadna migracja SQL nie jest wykonywana ręcznie w dashboardzie produkcyjnym**
— zawsze przez `supabase/migrations` + pipeline (`.github/workflows/deploy-migrations.yml`).
Deploy na produkcję wymaga ręcznej akceptacji (GitHub Environment protection rule
na środowisku `production`).

## 2. Sekrety i konfiguracja

Wymagane sekrety w GitHub Actions (Settings → Secrets and variables → Actions):

- `SUPABASE_ACCESS_TOKEN` — personal access token do Supabase CLI
- `SUPABASE_STAGING_PROJECT_REF`, `SUPABASE_PROD_PROJECT_REF`
- `NOTE_ENCRYPTION_KEY` (per środowisko, różne klucze dla staging/prod — **nigdy** ten
  sam klucz co produkcyjny w staging)
- `SENTRY_AUTH_TOKEN`, `NEXT_PUBLIC_SENTRY_DSN`

Zmienne środowiskowe aplikacji (Vercel → Project Settings → Environment Variables),
ustawiane per środowisko (Preview / Production), zgodnie z `.env.example`.

Zasada rotacji: klucze API i `NOTE_ENCRYPTION_KEY` rotowane co najmniej raz na 12
miesięcy lub natychmiast po podejrzeniu wycieku (patrz
[procedura naruszeń](../legal/breach-procedure.md)).

## 3. Monitoring i observability

| Warstwa | Narzędzie | Co monitorujemy |
|---|---|---|
| Błędy frontend/backend | Sentry (region EU) | Wyjątki JS/Node, source maps, **scrubbing PII** — `note`/`mood_value` nigdy nie trafiają do logów błędów |
| Dostępność | BetterStack / UptimeRobot | Ping `/` i `/api/health` co 1 min, alert po 2 nieudanych próbach |
| Logi bazy danych | Supabase Log Explorer | Zapytania wolne (>500ms), błędy RLS (odmowy dostępu — potencjalny sygnał ataku) |
| Wydajność | Vercel Analytics | Core Web Vitals, czas odpowiedzi funkcji serverless |
| Alerty | Slack/e-mail webhook z Sentry + UptimeRobot | Zespół powiadamiany w czasie rzeczywistym |

Endpoint zdrowia: `app/api/health/route.ts` zwraca `200 OK` + status połączenia z bazą.

## 4. Backup i disaster recovery

- **Supabase Point-in-Time Recovery (PITR)** aktywowane na planie Pro dla środowiska
  produkcyjnego — pozwala na odtworzenie stanu bazy do konkretnej minuty (do 7 dni na
  planie Pro, do 90 dni na Enterprise)
- Codzienne automatyczne backupy (natywne dla Supabase Pro+)
- **Test odtworzenia backupu — co kwartał**, na osobnym projekcie testowym, z
  udokumentowanym wynikiem (czas odtworzenia, integralność danych)
- RTO (Recovery Time Objective) docelowy dla MVP: **4 godziny**
- RPO (Recovery Point Objective) docelowy dla MVP: **1 godzina** (zgodnie z
  częstotliwością PITR)

## 5. Bezpieczeństwo pipeline

- Dependabot włączony w ustawieniach repo (aktualizacje zależności npm i GitHub Actions)
- `npm audit` w CI (job `security-scan` w `ci.yml`)
- Skan sekretów (gitleaks) w CI — blokuje merge przy wykryciu wycieku klucza w diffie
- Każda migracja SQL dotycząca tabel z danymi osobowymi (`profiles`, `dot_entries`,
  `consents`, `data_requests`) wymaga code review z jawnym potwierdzeniem, że polityki
  RLS zostały zachowane/zaktualizowane
- Wymagane 2FA dla wszystkich kont z dostępem administracyjnym do Supabase/Vercel/GitHub

## 6. Rate limiting / ochrona przed abuse

- Limity Supabase Auth (domyślne: ograniczenie prób logowania/rejestracji)
- Rekomendacja v2: Vercel Edge Middleware lub Cloudflare przed `/api/*` z limitem
  np. 60 zapisów/użytkownika/godzinę na `dot_entries` (ochrona przed automatyzacją /
  scraping / DoS na warstwie zapisu)
