# Decyzja: tryb kampanii = WAITLIST ONLY

**Status: ZAMROŻONE (Tydzień 0)**  
**Data decyzji:** 2026-07-18  
**Właściciel:** marketing + compliance (solo founder)

---

## Decyzja

Na czas kampanii wiralowej TikTok / Instagram oraz do momentu odhaczenia
[beta-launch-plan.md](./beta-launch-plan.md) sekcja 2:

1. Publiczny landing zbiera **wyłącznie e-mail na waitlistę** (+ zgoda marketingowa).
2. **Brak** publicznego signupu z logowaniem nastroju / notatek (dane art. 9 RODO).
3. `/signup` przekierowuje na landing (`/?waitlist=1`).
4. Pixel Meta/TikTok **wyłączony** — [tracking-decision.md](./tracking-decision.md).

---

## Implementacja w kodzie

| Element | Wartość |
|---|---|
| Env (domyślne) | `NEXT_PUBLIC_LANDING_MODE=waitlist` — [`.env.example`](../../.env.example) |
| Gate | [`lib/marketing/config.ts`](../../lib/marketing/config.ts) — `isWaitlistMode()` |
| Landing | [`app/page.tsx`](../../app/page.tsx) — `WaitlistForm` |
| Blokada signup | [`app/(auth)/signup/page.tsx`](../../app/(auth)/signup/page.tsx) — `redirect` |
| API | [`app/api/waitlist/route.ts`](../../app/api/waitlist/route.ts) — tylko e-mail + UTM |
| DB | [`supabase/migrations/0003_waitlist.sql`](../../supabase/migrations/0003_waitlist.sql) |

**Zakaz operacyjny:** nie ustawiaj `NEXT_PUBLIC_LANDING_MODE=signup` na produkcji,
dopóki nie są spełnione warunki beta (DPIA, Supabase EU + DPA, RLS, szyfrowanie,
`/privacy` + `/terms` zatwierdzone).

---

## Odblokowanie signup (później)

```env
NEXT_PUBLIC_LANDING_MODE=signup
```

Dopiero po checklistcie [beta-launch-plan.md](./beta-launch-plan.md) §2.
Dokumentuj datę zmiany w tym pliku.
