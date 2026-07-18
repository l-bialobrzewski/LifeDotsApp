# KPI kampanii wiralowej (4 tygodnie) — zamrożone

**Decyzja CMO / Tydzień 0.**  
Nie mierzymy followerów, lajków ani vanity views jako sukcesu.

Powiązane: [social-virality-campaign.md](./social-virality-campaign.md),
[virality-metrics-template.csv](./virality-metrics-template.csv),
[wtp-survey.md](./wtp-survey.md).

---

## Jeden North Star (trzy sygnały)

Kampania jest sukcesem tylko wtedy, gdy **łącznie** dają sygnał:

| # | KPI | Co liczy | Próg „jest sygnał” | Próg „mocny sygnał” | Skąd dane |
|---|---|---|---|---|---|
| 1 | **Share rate** | udostępnienia ÷ wyświetlenia (średnia z ≥15 filmów) | ≥ 0,5% | ≥ 1,5% | TikTok / IG Insights |
| 2 | **Zapisy waitlist** | liczba e-maili + konwersja landing→waitlist | ≥ 15% konwersji *oraz* rosnący wolumen tygodniowy | ≥ 30% konwersji | `waitlist_signups` / Tally + UTM |
| 3 | **WTP** | % „tak / raczej tak” przy 19 zł/mies. wśród respondentów ankiety | ≥ 20% | ≥ 40% | [wtp-survey.md](./wtp-survey.md) |

**Nie są KPI sukcesu:** followers, likes, reach bez share, liczba filmów opublikowanych.

Saves monitorujemy jako **wskaźnik pomocniczy** (cel ≥ 1% / mocny ≥ 3%) — informuje o jakości, ale decyzja go/no-go opiera się na trójce powyżej.

---

## Jak czytać wynik po 4 tygodniach

| Share | Waitlist | WTP | Decyzja |
|---|---|---|---|
| OK | OK | OK | Idź w zamkniętą betę; social zostaje stałym kanałem |
| OK | OK | Słabe | Rósć organic; przeprojektuj Pro zanim Stripe |
| OK | Słabe | * | Landing/CTA/lejek — nie produkt; popraw waitlistę |
| Słabe | OK | OK | Problem hooków/dystrybucji — iteruj formaty |
| Słabe | Słabe | Słabe | Pauza social; wróć do pozycjonowania |

„OK” = próg „jest sygnał” lub wyżej.

---

## Rytm raportowania (Ty = CMO)

| Kiedy | Co robisz |
|---|---|
| Codziennie (tyg. 1–2) | Notuj share rate top filmów; zabijaj formaty poniżej 0,3% share |
| Co tydzień | Sumuj waitlist + UTM source; wklej wiersz do arkusza z CSV |
| Koniec tyg. 4 | Ankieta WTP + raport go/no-go wg tabeli powyżej |

Minimalny arkusz: skopiuj [virality-metrics-template.csv](./virality-metrics-template.csv) do Google Sheets.

---

## Status zamrożenia

- [x] KPI zatwierdzone na czas testu 4 tygodni (ten dokument)
- [ ] Arkusz metryk utworzony (kopia CSV)
- [ ] Formularz WTP opublikowany + `NEXT_PUBLIC_WTP_SURVEY_URL`
- [ ] Waitlist produkcyjna zbiera e-maile (Supabase EU lub Tally)
