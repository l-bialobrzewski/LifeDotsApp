# Handoff — kampania TikTok/IG LifeDots (stan na 2026-07-24)

Skrócony zapis sesji do wklejenia na start nowego czatu. Nie zawiera sekretów —
tylko status i lokalizacje.

---

## Kontekst

LifeDots — Polska app (Next.js + Supabase) wizualizująca życie jako siatkę
tygodni. Prowadzimy **4-tygodniowy test wiralowości i monetyzacji** na
TikTok/Instagram, jako jednoosobowy founder (Łukasz Białobrzewski), zanim
ruszy zamknięta beta z prawdziwymi danymi nastroju (art. 9 RODO).

Pełny plan: [`social-virality-campaign.md`](./social-virality-campaign.md).

---

## Zrobione (repo, kod, docs)

| Element | Plik |
|---|---|
| Tryb kampanii = waitlist-only (zamrożone) | [`campaign-mode-decision.md`](./campaign-mode-decision.md), `lib/marketing/config.ts` |
| KPI 4 tyg. (share rate + waitlist + WTP) | [`campaign-kpi.md`](./campaign-kpi.md) |
| 10 fikcyjnych PNG siatek demo | `docs/marketing/assets/demo-grids/*.png`, generator: `scripts/generate-demo-grids.mjs` |
| Dane administratora RODO uzupełnione | `docs/legal/privacy-policy.md`, `ropa.md`, `dpia.md`, `terms-of-service.md`, `breach-procedure.md`, `WaitlistForm.tsx`, `app/privacy`, `app/terms` |
| Formularz waitlisty (tylko e-mail + zgoda) | `components/WaitlistForm.tsx`, `app/api/waitlist/route.ts` |
| Migracja SQL tylko-waitlist (bez tabel mood) | `scripts/waitlist-only.sql` — **uruchomiona** na projekcie Supabase `jgtchikdcjnuaczlqkie` (Success) |
| Instrukcja Supabase + DPA | [`waitlist-supabase-setup.md`](./waitlist-supabase-setup.md) |
| Naprawa `next.config.mjs` (usunięty przestarzały `experimental.instrumentationHook`) | `next.config.mjs` |
| Wszystko commitowane i wypchnięte na GitHub | `main`, ostatni commit `9b52537` |

---

## Supabase — status

- **Projekt aktywny:** `jgtchikdcjnuaczlqkie` (`https://jgtchikdcjnuaczlqkie.supabase.co`), region EU.
- **DPA zaakceptowane** (PandaDoc, 2026-07-24).
- Tabela `waitlist_signups` istnieje (RLS on, zapis tylko przez `service_role`).
- `.env.local` lokalnie ma poprawne 3 wartości (URL, anon/publishable, service_role) —
  **lokalny test zapisu przeszedł**: `POST /api/waitlist` → `200 {"ok":true}`.
- Uwaga: był pomyłkowo wklejony klucz z **innego** projektu (`rvuuadfvskhmwbmcffpe`)
  na początku — poprawione, wszystkie docs/SQL zaktualizowane na `jgtchikdcjnuaczlqkie`.
- **Do zrobienia:** rozważ rotację `service_role` w Dashboardzie (był wklejony na czacie).

---

## BLOCKER — Vercel deploy failing

Ostatnie 2 deploye (Preview `7u7UzpXreAej4orPUNqT19zTMuit` z 21.07 i
`AaMYEUuQL2FBaHDcRyFiPdpK1ehp` z 24.07, commit `9b52537`) = **failure**.

**Przyczyna (z Build Logs):**
```
Error: @supabase/ssr: Your project's URL and API key are required to create a Supabase client!
Error occurred prerendering page "/login"
```
Strona `/login` renderuje się statycznie i tworzy klienta Supabase w buildzie.
Na Vercel **brakuje zmiennych środowiskowych** (w CI GitHub Actions są
placeholdery, więc tam build przechodzi — różnica CI vs Vercel).

### Fix — do zrobienia na Vercel (Settings → Environment Variables)

Dodaj dla **Production + Preview + Development** (zaznacz wszystkie 3):

| Zmienna | Wartość |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://jgtchikdcjnuaczlqkie.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | publishable key (ten sam co lokalnie) |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role (do `/api/waitlist`) |
| `NEXT_PUBLIC_LANDING_MODE` | `waitlist` |
| `NEXT_PUBLIC_SITE_URL` | aktualny URL Vercel / `lifedots.app` |

Potem: **Deployments → ... → Redeploy** (bez cache) na `main` / `9b52537`.

Nie dodawaj `NEXT_PUBLIC_SENTRY_DSN`, jeśli nie masz kompletu
`SENTRY_ORG`/`SENTRY_PROJECT`/`SENTRY_AUTH_TOKEN` — częściowy Sentry też
potrafi wywalić build.

---

## Następne kroki (w kolejności)

1. **[Ty]** Ustaw 5 zmiennych na Vercel (wszystkie środowiska) → Redeploy.
2. **[Ty]** Po zielonym deployu: sprawdź landing publicznie, zapisz testowy e-mail.
3. **[Ty]** Bio + link UTM na TikTok (`@lifedotapps`) i Instagram (`lifedots.app`) —
   szablon w [`utm-links.md`](./utm-links.md).
4. **[Ty]** (opcjonalnie) Arkusz metryk z [`virality-metrics-template.csv`](./virality-metrics-template.csv)
   + formularz WTP wg [`wtp-survey.md`](./wtp-survey.md).
5. **[Ja, po 1–3]** Plan 7 dni filmów (który PNG + skrypt + CTA) do startu Tygodnia 1.
6. **[Ty, przy okazji]** Rozważ rotację `SUPABASE_SERVICE_ROLE_KEY` (był wklejony na czacie).

---

## Ważne pliki do zajrzenia w nowym czacie

- [`social-virality-campaign.md`](./social-virality-campaign.md) — pełny plan kampanii
- [`campaign-kpi.md`](./campaign-kpi.md) — KPI go/no-go
- [`team-roles-backlog.md`](./team-roles-backlog.md) — lean podział ról + backlog operacyjny (beta → launch)
- [`path-to-profit-plan.md`](./path-to-profit-plan.md) — plan „droga do zysku”: zadania agentów per faza + budżet początkowy
- [`asset-bank-checklist.md`](./asset-bank-checklist.md) — checklista RODO/assety (bieżący status odznaczeń)
- [`waitlist-supabase-setup.md`](./waitlist-supabase-setup.md) — setup Supabase krok po kroku
- `docs/marketing/assets/demo-grids/` — 10 PNG do filmów
