# Tydzień 0 — setup (deliverables)

Status wykonania setupu kampanii wiralowej. Powiązane:
[social-virality-campaign.md](./social-virality-campaign.md),
[beta-launch-plan.md](./beta-launch-plan.md).

---

## Zrobione w repozytorium (kod + docs)

| Element | Status | Lokalizacja |
|---|---|---|
| Gate waitlist vs signup | ✅ | Zamrożone: [campaign-mode-decision.md](./campaign-mode-decision.md); `NEXT_PUBLIC_LANDING_MODE=waitlist` |
| KPI 4 tygodnie | ✅ | [campaign-kpi.md](./campaign-kpi.md) — share rate + waitlist + WTP |
| 10 PNG siatek demo | ✅ | [`assets/demo-grids/`](./assets/demo-grids/) — `npm run generate:demo-grids` |
| Formularz waitlisty (e-mail + zgoda RODO) | ✅ | `components/WaitlistForm.tsx`, `app/api/waitlist/route.ts` |
| Migracja waitlist (SQL-only, bez mood) | ✅ | [`scripts/waitlist-only.sql`](../../scripts/waitlist-only.sql) — wklej w Dashboard |
| Instrukcja DPA + klucze + test | ✅ | [waitlist-supabase-setup.md](./waitlist-supabase-setup.md) |
| Capture UTM (sessionStorage, bez cookies) | ✅ | `components/UtmCapture.tsx`, `lib/marketing/utm.ts` |
| Szablony UTM + bio copy | ✅ | [utm-links.md](./utm-links.md), `lib/marketing/config.ts` |
| Decyzja pixel vs UTM-only | ✅ | [tracking-decision.md](./tracking-decision.md) |
| Ankieta WTP — struktura formularza | ✅ | [wtp-survey.md](./wtp-survey.md) |
| Checklista assetów (sekcja 11) | ✅ | [asset-bank-checklist.md](./asset-bank-checklist.md) |
| Szablon arkusza metryk | ✅ | [virality-metrics-template.csv](./virality-metrics-template.csv) |
| Wpis ROPA waitlist | ✅ | `docs/legal/ropa.md` wiersz #8 |
| Avatar + logo SVG/PNG | ✅ | [brand-avatar.md](./brand-avatar.md), `docs/marketing/assets/` |

---

## Wymaga ręcznej akcji (poza repo)

### Konta social (już utworzone — uzupełnij bio)

| Platforma | URL | Akcja |
|---|---|---|
| TikTok | https://www.tiktok.com/@lifedotapps | Wklej bio + link UTM z [utm-links.md](./utm-links.md) |
| Instagram | https://www.instagram.com/lifedots.app/ | To samo |

**Avatar:** wgraj `docs/marketing/assets/avatar-tiktok-instagram.png` na oba konta — instrukcja w [brand-avatar.md](./brand-avatar.md).

### Bio (gotowe do wklejenia)

```
LifeDots — zobacz swoje życie jako doty.
Każdy tydzień = 1 kropka. Świadomie. Prywatnie.
👇 Zbuduj swoją siatkę — bezpłatnie
```

### Infrastruktura

1. **Deploy landingu** na `https://lifedots.app` (Vercel).
2. **Supabase EU** — utwórz projekt Frankfurt, `npx supabase db push` (migracja `0003_waitlist`).
3. ~~Uzupełnij dane administratora~~ — **zrobione:** Łukasz Białobrzewski, lifedots.app@gmail.com (polityka, waitlista, DPIA, ROPA, ToS).
4. **Tally waitlist (alternatywa)** — jeśli Supabase jeszcze nie gotowy: utwórz formularz Tally, ustaw `NEXT_PUBLIC_EXTERNAL_WAITLIST_URL`.
5. **Ankieta WTP** — utwórz formularz wg [wtp-survey.md](./wtp-survey.md), ustaw `NEXT_PUBLIC_WTP_SURVEY_URL`.
6. **Arkusz metryk** — skopiuj [virality-metrics-template.csv](./virality-metrics-template.csv) do Google Sheets.
7. **Bank assetów** — odhacz pozycje w [asset-bank-checklist.md](./asset-bank-checklist.md).
8. **Pixel Meta/TikTok** — **NIE instaluj** (patrz [tracking-decision.md](./tracking-decision.md)).

### Przełączenie na pełny signup (po betcie)

Gdy odhaczysz [beta-launch-plan.md](./beta-launch-plan.md) sekcja 2:

```env
NEXT_PUBLIC_LANDING_MODE=signup
```

---

## Szybki test lokalny

```bash
# .env.local
NEXT_PUBLIC_LANDING_MODE=waitlist
NEXT_PUBLIC_SITE_URL=http://localhost:3000

npm run dev
# Otwórz: http://localhost:3000?utm_source=tiktok&utm_medium=organic&utm_campaign=virality_w1
```
