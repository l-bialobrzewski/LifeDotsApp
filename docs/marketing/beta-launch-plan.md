# Plan zamkniętej beta i publicznego launchu

## 1. Cel beta-testu

Zweryfikować przed publicznym launchem: (a) czy koncepcja "siatki życia" generuje
realną aktywację i retencję, (b) czy przepływ zgody RODO (art. 9) jest zrozumiały i
nie blokuje nadmiernie użytkowników, (c) stabilność techniczną na realnym ruchu.

## 2. Warunek wejścia (przed otwarciem beta z prawdziwymi danymi użytkowników)

Zgodnie z rekomendacją [DPIA](../dpia.md) sekcja 9 — **nie uruchamiać z prawdziwymi
danymi użytkowników przed**:

- [ ] DPIA zweryfikowane i zatwierdzone (osoba z kompetencjami prawnymi)
- [ ] Projekt Supabase utworzony w regionie EU (Frankfurt), DPA podpisana
- [ ] Migracje (`supabase/migrations`) zastosowane, RLS zweryfikowane manualnie
      (test: użytkownik A nie widzi wpisów użytkownika B)
- [ ] `NOTE_ENCRYPTION_KEY` wygenerowany i bezpiecznie zapisany (poza repo)
- [ ] Polityka prywatności i regulamin opublikowane pod `/privacy` i `/terms`
      (finalna wersja zatwierdzona prawnie, nie tylko szkic)
- [ ] Sentry skonfigurowany ze scrubbingiem PII (brak `note`/`mood_value` w logach)
- [ ] Endpoint eksportu i usunięcia konta przetestowany end-to-end

## 3. Rekrutacja testerów zamkniętej beta

- Cel: 20–50 osób z grup docelowych (patrz [gtm-plan.md](./gtm-plan.md) sekcja 2)
- Kanały rekrutacji: lista z waitlisty landing page, osobista sieć kontaktów,
  posty w niszowych społecznościach (r/selfimprovement, dyskordy o produktywności)
  z jasnym opisem "to jest wczesna beta, dane wrażliwe, prosimy o feedback"
- Wymagane od testera: zgoda na udział w beta (odrębna od zgody RODO na dane o
  nastroju), świadomość że to wczesna wersja

## 4. Czas trwania i harmonogram

| Faza | Długość | Działania |
|---|---|---|
| Przygotowanie | 1 tydzień | Deploy na staging, wewnętrzny dogfooding zespołu |
| Zamknięta beta | 2–3 tygodnie | Realni testerzy, zbieranie feedbacku i metryk |
| Iteracja | 1 tydzień | Poprawki na bazie feedbacku, priorytetyzacja bugów |
| Publiczny launch | Dzień X | Product Hunt + kanały z gtm-plan.md |

## 5. Zbieranie feedbacku

- Krótki formularz (Google Forms / Tally) wysyłany po 7 dniach użytkowania:
  pytania o zrozumiałość ekranu zgody, wartość funkcji udostępniania, ogólny NPS
- Kanał bezpośredni (e-mail/Discord) do zgłaszania błędów
- Monitorowanie metryk technicznych: Sentry (błędy), Supabase logs (wydajność
  zapytań), uptime

## 6. Kryteria sukcesu przed publicznym launchem

Patrz [gtm-plan.md](./gtm-plan.md) sekcja 6 — jeśli aktywacja/retencja znacząco
odbiegają od celów, priorytet to iteracja produktowa, nie przyspieszanie launchu.

## 7. Checklist dnia launchu

Patrz [../launch-checklist.md](../launch-checklist.md).

## 8. Co wymaga działania człowieka (poza zakresem automatyzacji/kodu)

Poniższe kroki **nie mogą zostać wykonane przez agenta kodującego** i wymagają
realnych decyzji/kont właściciela produktu:

- Utworzenie faktycznego konta i projektu Supabase (region EU) oraz Vercel
- Podpisanie DPA z Supabase / akceptacja warunków Vercel i Sentry
- Finalna prawna akceptacja polityki prywatności, regulaminu i DPIA
- Rekrutacja i komunikacja z realnymi testerami beta
- Publikacja na Product Hunt i w społecznościach (wymaga konta/reputacji)
- Podjęcie decyzji o dacie faktycznego publicznego launchu
