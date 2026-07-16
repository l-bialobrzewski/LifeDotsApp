# LifeDots

Wizualizacja życia jako siatka "dotów" (tygodni) z możliwością oznaczania nastroju.
MVP — patrz [docs/spec.md](./docs/spec.md).

## Dokumentacja

- [Specyfikacja funkcjonalna](./docs/spec.md)
- [DPIA (Ocena Skutków dla Ochrony Danych)](./docs/dpia.md)
- [Polityka prywatności](./docs/legal/privacy-policy.md)
- [Regulamin (ToS)](./docs/legal/terms-of-service.md)
- [Rejestr czynności przetwarzania (RCP / ROPA)](./docs/legal/ropa.md)
- [Procedura zgłaszania naruszeń](./docs/legal/breach-procedure.md)
- [Polityka retencji danych](./docs/legal/data-retention-policy.md)
- [Plan Go-To-Market](./docs/marketing/gtm-plan.md)
- [Plan beta-testu i launchu](./docs/marketing/beta-launch-plan.md)

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- Supabase (Postgres + Auth + Storage), region **EU (Frankfurt, eu-central-1)**
- Hosting: Vercel
- Szyfrowanie notatek: AES-256-GCM po stronie serwera (`lib/encryption.ts`)

## Uruchomienie lokalne

Wymagania: Node.js ≥ 18.18, konto Supabase, (opcjonalnie) Supabase CLI.

```bash
# 1. Instalacja zależności
npm ci

# 2. Konfiguracja środowiska
cp .env.example .env.local
# uzupełnij NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
# SUPABASE_SERVICE_ROLE_KEY (z dashboardu Supabase) oraz NOTE_ENCRYPTION_KEY:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# 3. Utworzenie projektu Supabase (jednorazowo, w dashboardzie supabase.com)
#    -> New project -> region: EU Central (Frankfurt, eu-central-1)
#    -> istotne dla RODO/data residency, patrz docs/dpia.md

# 4. Zastosowanie migracji (schemat + RLS) na projekcie Supabase
npx supabase login
npx supabase link --project-ref <twoj-project-ref>
npx supabase db push

# 5. Start dev servera
npm run dev
# -> http://localhost:3000
```

## Struktura repo

```
app/                    # Next.js App Router (strony, layouty)
components/             # Komponenty React (siatka, dot, modal zgody, udostepnianie)
lib/                    # Klienci Supabase, typy, szyfrowanie, logika siatki
supabase/migrations/    # Schemat DB + RLS jako kod (wersjonowane migracje SQL)
docs/                   # Specyfikacja, DPIA, dokumenty prawne, marketing
.github/workflows/      # CI/CD
```

## Zasady bezpieczeństwa danych (skrót — pełny opis w `docs/dpia.md`)

- Notatki dziennikowe (`dot_entries.note_encrypted`) są zaszyfrowane AES-256-GCM
  po stronie serwera przed zapisem — baza nigdy nie przechowuje plaintextu.
- Row Level Security wymusza, że użytkownik widzi wyłącznie własne dane.
- Zgoda na przetwarzanie danych o nastroju (art. 9 RODO) jest zbierana odrębnie
  od ogólnej polityki prywatności i logowana z znacznikiem czasu w tabeli `consents`.
- Usunięcie konta jest nieodwracalne i kaskadowe (profil, wpisy, zgody).

## Status implementacji względem planu MVP

- [x] Specyfikacja funkcjonalna
- [x] DPIA
- [x] Szkielet repo (Next.js + Supabase, migracje, RLS)
- [x] Core features (siatka, wpisy, zgoda, eksport/usunięcie danych) — kod w `app/` i `components/`
- [x] Pipeline DevOps (CI/CD, monitoring, backupy) — konfiguracja w `.github/workflows/`, opis w `docs/devops`
- [x] Dokumenty prawne (polityka prywatności, ToS, RCP, procedura naruszeń, retencja)
- [x] Landing page + plan marketingowy
- [x] Plan beta-testu i launchu (`docs/marketing/beta-launch-plan.md`) — gotowość techniczna i dokumentacja; faktyczne wdrożenie operacyjne poza repozytorium
