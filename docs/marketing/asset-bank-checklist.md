# Checklista assetów + RODO (Tydzień 0 → przed Tygodniem 1)

Odpowiednik sekcji 11 [social-virality-campaign.md](./social-virality-campaign.md).  
Profil: jednoosobowa działalność, mały budżet, zero tolerancji na problemy prawne.

Legenda: `[x]` = zrobione w repo / gotowe · `[ ]` = wymaga ręcznej akcji

---

## Decyzja bazowa

- [x] **Tryb kampanii = waitlist e-mail** — zamrożone: [campaign-mode-decision.md](./campaign-mode-decision.md); `NEXT_PUBLIC_LANDING_MODE=waitlist`, redirect `/signup`
- [x] **KPI 4 tygodnie** — share rate + waitlist + WTP: [campaign-kpi.md](./campaign-kpi.md)
- [ ] DPIA + beta checklist odhaczone przed pełnym signupiem — [beta-launch-plan.md](./beta-launch-plan.md) sekcja 2
- [x] Dane administratora uzupełnione — Łukasz Białobrzewski; [privacy-policy.md](../legal/privacy-policy.md), `WaitlistForm`

---

## Konta i profil

- [x] Konto TikTok — https://www.tiktok.com/@lifedotapps
- [x] Konto Instagram — https://www.instagram.com/lifedots.app/
- [x] Avatar / ikona spójna z landingiem — [`brand-avatar.md`](./brand-avatar.md), `assets/avatar-tiktok-instagram.png` (upload na konta: ręcznie)
- [ ] Bio wg szablonu — tekst w [utm-links.md](./utm-links.md)
- [ ] Link w bio z UTM — URL w [utm-links.md](./utm-links.md)

---

## Landing / waitlist + RODO

- [x] Landing z formularzem waitlisty — `app/page.tsx`, `components/WaitlistForm.tsx`
- [x] Formularz zbiera **tylko e-mail** (+ checkbox zgody)
- [x] Klauzula informacyjna art. 13 przy polu e-mail
- [x] Osobny checkbox zgody (domyślnie niezaznaczony)
- [x] Link do `/privacy` przy formularzu
- [ ] Narzędzie waitlist z DPA w UE — Supabase EU **lub** Tally; DPA zaakceptowane
- [ ] Migracja `0003_waitlist.sql` zastosowana na produkcji
- [ ] Procedura usunięcia e-maila z listy (art. 17) — Supabase dashboard / Tally
- [x] Wpis waitlist w [ropa.md](../legal/ropa.md) wiersz #8

---

## Tracking bez cookies

- [x] **Bez Meta/TikTok Pixel** — [tracking-decision.md](./tracking-decision.md)
- [x] Pomiar UTM + waitlist count — `UtmCapture`, `waitlist_signups`
- [ ] Arkusz metryk — skopiuj [virality-metrics-template.csv](./virality-metrics-template.csv)

---

## Ankieta WTP

- [x] Struktura formularza — [wtp-survey.md](./wtp-survey.md)
- [ ] Formularz opublikowany (Tally / Google Forms)
- [ ] `NEXT_PUBLIC_WTP_SURVEY_URL` ustawiony w produkcji
- [ ] Poll IG Stories (15/19/25 PLN) — **Tydzień 4**

---

## Bank wizualny (WYŁĄCZNIE dane fikcyjne)

Folder: [`assets/demo-grids/`](./assets/demo-grids/).

- [x] **10 PNG siatek demo** (fikcyjne wieki 22–50, różna gęstość) — `assets/demo-grids/*.png`
- [x] Zero prawdziwych notatek/tagów — generowane skryptem `npm run generate:demo-grids`
- [ ] 1–2 screeny flow (siatka + modal — treść notatki nieczytelna / blur)
- [x] Logo / wordmark — [`assets/logo-avatar.svg`](./assets/logo-avatar.svg) + [brand-avatar.md](./brand-avatar.md)
- [x] Paleta: tło `#0b1020`, akcent `#10b981` (emerald-500), tekst `#e8ecf7`
- [ ] Muzyka tylko z biblioteki TikTok/IG
- [ ] Twarz tylko własna (jeśli w ogóle)

**Regeneracja siatek:** `npm run generate:demo-grids` → `scripts/generate-demo-grids.mjs`.

---

## Mikrokreatorzy (Tydzień 3 — przygotuj listę)

- [ ] Lista 5–10 mikrokreatorów PL (stoicyzm, journaling, self-improvement)
- [ ] Brief — sekcja 8 kampanii + `#reklama` / „płatna współpraca”
- [ ] Ustalenie mailowe: zakres, oznaczenie reklamy, zakaz obietnic medycznych
- [ ] Kreator dostaje wyłącznie siatki demo

---

## Compliance treści

- [x] Copy landingu — refleksja, nie terapia
- [ ] Review każdego filmu przed publikacją (checklist mental health)
- [ ] Copy social — bez obietnic leczenia / diagnozy

---

## Następny krok

Po odhaczeniu pozycji `[ ]` w sekcjach „Konta”, „Landing DPA”, „Bank wizualny” → start **Tygodnia 1** (5–7 filmów/tydz.).
