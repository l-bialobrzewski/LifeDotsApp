# Plan Go-To-Market — LifeDots MVP

## 1. Pozycjonowanie

**Hasło:** "Zobacz swoje życie jako doty."
**Obietnica:** narzędzie do samorefleksji i intencjonalnego życia, nie kolejna
appka do trackowania danych — **prywatność jest częścią propozycji wartości**, nie
przeszkodą, ponieważ dane są wrażliwe (nastrój/samopoczucie).

## 2. Grupa docelowa (persony)

| Persona | Motywacja | Gdzie ich szukać |
|---|---|---|
| "Intentional liver" | Chce żyć bardziej świadomie, inspirowany konceptem "Life in Weeks" / memento mori | Reddit (r/selfimprovement, r/getdisciplined, r/Stoicism), Twitter/X |
| "Journaler" | Prowadzi dziennik, szuka lżejszej/wizualnej alternatywy dla tradycyjnego journalingu | r/DecidingToBeBetter, społeczności mindfulness, Instagram (#journaling) |
| "Data nerd o sobie" | Lubi wizualizacje własnego życia (quantified self) | Product Hunt, Hacker News, r/dataisbeautiful (dla wersji udostępnianej) |

## 3. Hook wiralowy — funkcja udostępniania siatki

Kluczowy mechanizm wzrostu: przycisk "Udostępnij siatkę" (`components/ShareGridButton.tsx`)
generuje obrazek PNG samej siatki kolorów **bez treści notatek/tagów** — użytkownik
może bezpiecznie pokazać go publicznie. To jest świadomie zaprojektowany, minimalny
zestaw danych (data minimisation), zgodnie z DPIA.

Format wizualny "siatki życia" ma silny potencjał wiralowy (podobne posty "Life in
Weeks" regularnie trafiają na szczyty Reddita/Hacker News) — warto to wykorzystać w
materiałach launchowych.

## 4. Model monetyzacji (docelowy, poza pierwszym MVP)

Freemium — patrz [docs/spec.md](../spec.md) sekcja 4. W MVP wszystko darmowe, cel:
walidacja aktywacji i retencji przed wprowadzeniem płatności.

## 5. Kanały i taktyki launchu

1. **Landing page + waitlist** (`app/page.tsx`) — działa od dnia 1, zbiera
   zainteresowanie jeszcze przed pełnym launchem
2. **Zamknięta beta** — patrz [beta-launch-plan.md](./beta-launch-plan.md)
3. **Product Hunt** — launch dnia startu publicznego, przygotowany opis + wizualizacje
4. **Reddit** — organiczne posty (nie spam) w r/selfimprovement, r/getdisciplined,
   z naciskiem na historię/motywację, nie hard-sell
5. **Krótkie video (TikTok/Reels/Shorts)** — pokazujące moment wygenerowania własnej
   siatki życia — silny "wow-efekt" wizualny. Pełny plan 4-tygodniowej walidacji
   wiralu i monetyzacji (hooki, skrypty, UTM, WTP, mikrokreatorzy): 
   [social-virality-campaign.md](./social-virality-campaign.md)
6. **Content marketing** — artykuł/blog o koncepcji "Life in Weeks" i idei
   intencjonalnego życia, z LifeDots jako narzędziem

## 6. Metryki i cele MVP (pierwsze 4–6 tygodni po launchu)

| Metryka | Cel wstępny |
|---|---|
| Aktywacja (≥1 wpis w 24h od rejestracji) | ≥ 40% nowych użytkowników |
| Retencja D7 | ≥ 20% |
| Udostępnienia siatki / aktywni użytkownicy | ≥ 10% |
| Zgoda na dane o nastroju (opt-in rate) | Monitorowana jako sygnał zaufania — cel ≥ 60% |
| NPS z beta-testu | ≥ 30 |

## 7. Komunikacja o prywatności jako przewaga

Materiały marketingowe powinny explicite komunikować: szyfrowanie notatek, brak
sprzedaży danych, samoobsługowy eksport/usunięcie, hosting w UE. To wyróżnik wobec
większych, mniej transparentnych aplikacji wellness/mood-tracking.
