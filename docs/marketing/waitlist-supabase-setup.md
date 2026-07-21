# Waitlista na Supabase EU — setup (ręczne kroki)

Projekt: `rvuuadfvskhmwbmcffpe` · Region: **EU (Frankfurt)**  
Cel: zbierać **tylko e-mail** (kampania), bez tabel nastroju art. 9.

Powiązane: [campaign-mode-decision.md](./campaign-mode-decision.md),
[`scripts/waitlist-only.sql`](../../scripts/waitlist-only.sql),
[`app/api/waitlist/route.ts`](../../app/api/waitlist/route.ts).

---

## 1. DPA (Data Processing Agreement) — zaakceptuj

1. Otwórz: https://supabase.com/dashboard/org/_/documents  
   (albo Project Settings → **Legal** / **Documents**)
2. Zaakceptuj / pobierz **DPA** (oraz SCC, jeśli wyświetlone).
3. Upewnij się, że projekt jest w regionie **West EU (Frankfurt)** / `eu-central-1`.
4. Zaznacz poniżej:

- [ ] DPA zaakceptowane
- [ ] Region = Frankfurt (EU)
- [ ] Data akceptacji: ________

Bez DPA nie zbieraj e-maili na produkcji.

---

## 2. Migracja waitlisty (SQL Editor — najszybsze)

1. Dashboard → projekt `rvuuadfvskhmwbmcffpe` → **SQL Editor**
2. Wklej całość pliku [`scripts/waitlist-only.sql`](../../scripts/waitlist-only.sql)
3. **Run**
4. Table Editor → powinna być tabela `waitlist_signups`

- [ ] Tabela `waitlist_signups` istnieje
- [ ] RLS włączone (czerwona kłódka / enabled)

**Alternatywa CLI** (gdy masz access token):

```powershell
cd "C:\Users\lukas\Documents\projekty ai\LifeDots"
$env:SUPABASE_ACCESS_TOKEN = "sbp_..."   # Account → Access Tokens
.\.tools\supabase\supabase.exe login --token $env:SUPABASE_ACCESS_TOKEN
.\.tools\supabase\supabase.exe link --project-ref rvuuadfvskhmwbmcffpe
.\.tools\supabase\supabase.exe db push
```

Uwaga: `db push` wgra też `0001`/`0002` (profiles, mood). Na etap kampanii
preferuj **tylko** `waitlist-only.sql`.

---

## 3. Klucze w `.env.local` i na Vercel

Z **Project Settings → API** (lub API Keys):

| Zmienna | Skąd |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://rvuuadfvskhmwbmcffpe.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publishable / anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | **service_role / secret** — tylko serwer, nigdy w przeglądarce |

Wklej `SUPABASE_SERVICE_ROLE_KEY` do lokalnego `.env.local` (już masz URL + anon).

Na Vercel (Preview + Production) ustaw te same 3 zmienne + `NEXT_PUBLIC_LANDING_MODE=waitlist`.

- [ ] `.env.local` ma `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Vercel ma te same zmienne (po deployu)

---

## 4. Test lokalny

```powershell
npm run dev
# Otwórz: http://localhost:3000?utm_source=tiktok&utm_medium=organic&utm_campaign=virality_w1
# Zapisz testowy e-mail + zaznacz zgodę
```

W Table Editor → `waitlist_signups` powinien pojawić się wiersz.

Usuwanie (art. 17): Table Editor → usuń wiersz **lub** SQL:
`delete from public.waitlist_signups where email = 'test@example.com';`

- [ ] Zapis z landingu działa
- [ ] Duplikat e-maila zwraca komunikat „już na liście”

---

## 5. Plan B — Tally (gdy Supabase jeszcze nie gotowy)

1. Utwórz formularz Tally (serwer UE jeśli dostępny) z polem e-mail + checkbox zgody
2. Zaakceptuj DPA Tally
3. W `.env.local` / Vercel:

```env
NEXT_PUBLIC_EXTERNAL_WAITLIST_URL=https://tally.so/r/XXXXXX
```

API waitlisty przy braku `SUPABASE_SERVICE_ROLE_KEY` przekieruje na Tally (503 + redirect).

---

## Co wklej do czatu, żebym dokończył za Ciebie

1. Potwierdzenie: „DPA zaakceptowane, SQL uruchomiony”
2. **`SUPABASE_SERVICE_ROLE_KEY`** (secret) — albo wklej tylko lokalnie do `.env.local` i napisz „klucz ustawiony”
3. Opcjonalnie: **Access Token** CLI (`sbp_...`) do `link` / przyszłych migracji

**Nie wklejaj service_role na publiczne fora** — w czacie Cursor OK, byle nie commitować do gita.
