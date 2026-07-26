# Plan „droga do zysku” — zadania agentów + budżet początkowy

Cel: doprowadzić LifeDots do **pierwszego realnego przychodu** (płatny plan Pro,
19–25 zł/mies.) w 3 fazach. Każda rola z
[team-roles-backlog.md](./team-roles-backlog.md) działa jako **osobny agent**
z własnym backlogiem, definicją ukończenia (DoD) i zależnościami.

Powiązane: [campaign-kpi.md](./campaign-kpi.md), [gtm-plan.md](./gtm-plan.md),
[wtp-survey.md](./wtp-survey.md), [session-handoff.md](./session-handoff.md).

---

## Model przychodu (przypomnienie)

- **Freemium:** darmowa siatka + wpisy; **Pro 19–25 zł/mies.** (backup w chmurze,
  album PDF, palety kolorów, unlimited tagi) — wg [wtp-survey.md](./wtp-survey.md).
- Płatności włączamy **dopiero po sygnale WTP ≥ 20%** i aktywacji ≥ 40% / D7 ≥ 20%
  (decyzja Go/No-Go należy do Agenta PO).
- Próg symbolicznej rentowności operacyjnej: przy koszcie stałym ~300–400 zł/mies.
  wystarczy **~20–25 subskrybentów Pro**. Pierwszy realny cel: **50 płacących**
  (~950–1250 zł MRR) w ciągu 8 tygodni od włączenia płatności.

---

## Fazy

| Faza | Okno | Cel biznesowy | Bramka wyjścia |
|---|---|---|---|
| **1. Walidacja (waitlista)** | Tydzień 0–4 | Sygnał: share rate ≥ 0,5%, konwersja waitlist ≥ 15%, WTP ≥ 20% | Raport go/no-go wg [campaign-kpi.md](./campaign-kpi.md) |
| **2. Zamknięta beta** | Tydzień 5–8 | Aktywacja ≥ 40%, retencja D7 ≥ 20%, NPS ≥ 30 | Decyzja Go na monetyzację |
| **3. Monetyzacja + launch publiczny** | Tydzień 9–12 | Stripe live, Product Hunt, pierwsi płacący | 50 subskrypcji Pro / ~1000 zł MRR |

---

## Agent 1 — Product Owner (Ty)

**Misja:** doprowadzić do decyzji Go i pierwszego MRR; trzymać budżet w ryzach.

### Faza 1
- Odblokuj deploy: ustaw 5 zmiennych env na Vercel i zrób redeploy
  (szczegóły: [session-handoff.md](./session-handoff.md) — to jest **blocker nr 1**).
- Opublikuj formularz WTP (Tally) i ustaw `NEXT_PUBLIC_WTP_SURVEY_URL`.
- Utwórz arkusz metryk z `virality-metrics-template.csv`; co tydzień wpisuj wiersz.
- Koniec tygodnia 4: raport go/no-go wg tabeli decyzyjnej w
  [campaign-kpi.md](./campaign-kpi.md).

### Faza 2
- Rekrutacja 30–100 beta-testerów z waitlisty (e-mail zapraszający, kryteria
  z [beta-launch-plan.md](./beta-launch-plan.md)).
- Cotygodniowy przegląd aktywacji/retencji; priorytetyzacja poprawek dla Agenta Dev.
- Ustal finalną cenę Pro na podstawie rozkładu odpowiedzi z pytania 5 ankiety WTP
  (15/19/25/29 zł).

### Faza 3
- Decyzja Go/No-Go na Product Hunt; przygotowanie opisu i materiałów launchowych.
- Formalności biznesowe: działalność (JDG), konto firmowe, aktywacja Stripe.
- **DoD:** pierwsze 50 płatnych subskrypcji lub udokumentowana decyzja pivot.

---

## Agent 2 — Growth / Video Creator

**Misja:** napełnić lejek — waitlista w fazie 1, testerzy w fazie 2, kupujący w fazie 3.

### Faza 1
- 10–15 wideo w 2–3 tygodnie (hooki memento mori, POV z siatką, founder-led);
  assety gotowe w `docs/marketing/assets/demo-grids/`.
- Codziennie (tyg. 1–2): mierz share rate, zabijaj formaty < 0,3%.
- Bio + linki UTM na obu profilach ([utm-links.md](./utm-links.md)).
- Tydzień 3: lista 5–10 mikrokreatorów (stoicyzm/journaling) + pierwszy outreach
  (barter/afiliacja zamiast płatnych stawek — koszt ~0 zł na start).

### Faza 2
- Content „behind the beta”: pokazuj prawdziwe siatki testerów (za zgodą, tylko PNG
  bez notatek) — buduje FOMO przed launchem.
- Zbieraj testimoniale wideo/tekst od testerów pod launch na Product Hunt.

### Faza 3
- Seria launchowa: „waitlista otwarta → apka otwarta → co daje Pro”.
- Każde wideo z CTA na stronę cennika; mierz CTR bio → checkout.
- **DoD:** ≥ 30% ruchu na stronę Pro pochodzi z organic social (UTM).

---

## Agent 3 — Full-Stack Dev

**Misja:** apka gotowa na betę (faza 2), a potem na przyjmowanie pieniędzy (faza 3).

### Faza 1 (przygotowanie pod betę)
- Wydajność siatki (~4680 kropek) — eliminacja zbędnych re-renderów.
- Test izolacji RLS + scrubbing Sentry (`mood_value`, notatki poza logami).
- Eksport JSON/CSV + kaskadowe usuwanie konta (wymóg RODO przed betą).

### Faza 2
- Migracja SQL tabel mood/entries na projekt produkcyjny (obecnie jest tylko
  `waitlist_signups` z `scripts/waitlist-only.sql`).
- Instrumentacja metryk aktywacji/retencji (eventy: rejestracja, 1. wpis, D7 return).
- Poprawki z feedbacku testerów wg priorytetów Agenta PO.

### Faza 3 (monetyzacja)
- **Integracja Stripe:** checkout subskrypcyjny, webhook → flaga `is_pro` w Supabase,
  portal klienta (anulowanie/faktury) — najprościej Stripe Customer Portal.
- Feature-gating Pro: backup wersjonowany, eksport PDF, palety, unlimited tagi.
- Strona cennika + upgrade-prompty w apce (np. przy 4. tagu).
- **DoD:** pełny cykl test → płatność → dostęp Pro → anulowanie działa na produkcji.

---

## Agent 4 — UX/UI Designer

**Misja:** maksymalna konwersja na każdym kroku lejka przy zachowaniu „Calm Tech”.

### Faza 1–2
- Consent flow (art. 9) — zrozumiały i nieodstraszający; cel opt-in ≥ 60%.
- ShareGridButton PNG — szablon, który użytkownicy chętnie wrzucą na IG Stories
  (to darmowy kanał akwizycji → bezpośrednio zasila lejek przychodu).
- Onboarding low-friction: od rejestracji do pierwszego wpisu < 2 min
  (wspiera cel aktywacji ≥ 40%).

### Faza 3
- **Strona cennika + paywall:** projekt ekranu upgrade (wartość Pro w 5 sekund,
  bez dark patterns — spójne z pozycjonowaniem prywatności).
- Ekran sukcesu po zakupie + stany „jesteś Pro” w apce.
- **DoD:** makiety cennika/paywalla przekazane Devowi przed startem fazy 3.

---

## Agent 5 — Legal / Compliance

**Misja:** zero blokerów prawnych dla bety (dane art. 9) i sprzedaży (konsument).

### Faza 1–2
- Finalizacja i podpis DPIA (`docs/dpia.md`) — **warunek startu bety**.
- Uzupełnienie pól `[do uzupełnienia]` w polityce prywatności, regulaminie, ROPA.
- Audyt zgód: waitlista (e-mail) + zgoda na nastrój w aplikacji.

### Faza 3
- Regulamin sprzedaży subskrypcji: prawo odstąpienia (konsument, treści cyfrowe),
  zasady anulowania, informacje o cenie — wymagane przed włączeniem Stripe.
- Weryfikacja Stripe jako procesora w ROPA/DPA.
- **DoD:** komplet dokumentów zaakceptowany przez Agenta PO przed pierwszą płatnością.

---

## Zależności między agentami (krytyczna ścieżka)

1. **PO: env na Vercel** → landing żyje → Creator może kierować ruch.
2. **Legal: DPIA podpisane** + **Dev: eksport/usuwanie danych** → start bety.
3. **PO: sygnał WTP** + **Designer: paywall** + **Legal: regulamin sprzedaży**
   → **Dev: Stripe** → pierwszy przychód.

---

## Budżet początkowy (fazy 1–3, ~3 miesiące)

### Koszty stałe (miesięczne)

| Pozycja | Faza 1 (waitlista) | Faza 2–3 (beta + płatności) | Uwagi |
|---|---|---|---|
| Vercel | 0 zł (Hobby) | ~85 zł (Pro, $20) | Plan Pro wymagany przy użyciu komercyjnym |
| Supabase | 0 zł (Free) | ~105 zł (Pro, $25) | Pro daje backupy i brak pauzowania — potrzebne od bety |
| Sentry | 0 zł (Free/dev) | 0–110 zł (Team, $26 — opcjonalnie) | Free tier zwykle wystarcza na start |
| Domena `lifedots.app` | ~10 zł/mies. (~120 zł/rok) | j.w. | .app wymaga HTTPS (Vercel daje) |
| E-mail transakcyjny (Resend/Postmark) | 0 zł (free tier) | 0–85 zł | Free tier do ~3k maili/mies. |
| Tally / arkusze / CapCut | 0 zł | 0 zł | Wersje darmowe wystarczą |
| Księgowość (od startu JDG) | — | ~200–350 zł | Dopiero gdy ruszy sprzedaż |
| **Razem stałe** | **~10 zł/mies.** | **~400–650 zł/mies.** | |

### Koszty jednorazowe

| Pozycja | Kwota (szacunek) | Kiedy | Czy konieczne |
|---|---|---|---|
| Konsultacja RODO/prawna (DPIA + regulamin sprzedaży) | 1 500–4 000 zł | Przed betą + przed Stripe | **Tak** — dane art. 9 to realne ryzyko |
| UX/UI freelance (consent flow, paywall, share PNG) | 2 000–5 000 zł | Faza 1–3 | Warunkowo — jeśli nie robisz sam / z AI |
| Rejestracja JDG | 0 zł | Przed pierwszą płatnością | Tak (formalnie darmowa) |
| Budżet na mikrokreatorów | 0–2 000 zł | Tydzień 3+ | Nie — zacznij od barteru/afiliacji |
| Product Hunt / launch assets | 0 zł | Faza 3 | Praca własna + Creator |

### Koszty zmienne (od pierwszej sprzedaży)

- **Stripe:** brak abonamentu; prowizja ~1,4% + 1 zł (karty EU) do ~2,9% + 1 zł
  od transakcji. Przy 19 zł/mies. → ~1,3–1,6 zł prowizji od subskrypcji.
- **Podatek:** JDG ryczałt (prawdopodobnie 8,5% dla usług cyfrowych — potwierdź
  z księgowym) + składki ZUS (ulga na start / preferencyjny ZUS na początku).

### Podsumowanie budżetu

| Scenariusz | Fazy 1–3 łącznie (~3 mies.) |
|---|---|
| **Minimalny** (sam robisz design, prawnik tylko DPIA, zero płatnych kreatorów) | **~2 500–3 500 zł** |
| **Komfortowy** (freelance UX, pełna obsługa prawna, mały budżet kreatorski) | **~7 000–12 000 zł** |

Break-even kosztów stałych (~400–650 zł/mies.): **~25–40 subskrypcji Pro** po 19 zł
(licząc prowizje i podatek ryczałtowy).

---

## Ryzyka dla przychodu

| Ryzyko | Sygnał | Mitygacja |
|---|---|---|
| WTP poniżej 20% | Ankieta tydzień 4 | Nie włączaj Stripe; przeprojektuj pakiet Pro (tabela decyzyjna w campaign-kpi.md) |
| Wiral jest, konwersja nie | Share OK, waitlist < 15% | Landing/CTA — problem lejka, nie produktu |
| Koszty prawne rosną | Wycena > 4 000 zł | Zakres ograniczony do DPIA + regulamin sprzedaży; reszta z szablonów |
| Beta ujawnia słabą retencję | D7 < 20% | Wstrzymaj monetyzację; iteruj core loop zamiast palić budżet na launch |
