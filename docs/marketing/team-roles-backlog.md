# Podział ról i backlog operacyjny — LifeDotsApp

Szczegółowy podział ról, wymaganych kompetencji oraz konkretnych zadań (backlogu
operacyjnego) dla poszczególnych członków zespołu LifeDotsApp.

Struktura została zaprojektowana w modelu **lean** — skupiamy się na
najważniejszych zadaniach niezbędnych do przeprowadzenia udanej zamkniętej
bety oraz przygotowania aplikacji do publicznego launchu.

Powiązane: [beta-launch-plan.md](./beta-launch-plan.md),
[gtm-plan.md](./gtm-plan.md), [social-virality-campaign.md](./social-virality-campaign.md),
[session-handoff.md](./session-handoff.md),
[path-to-profit-plan.md](./path-to-profit-plan.md) (zadania per faza + budżet).

---

## 1. Product Owner / Project Lead

**Rola:** Lider strategiczny i biznesowy odpowiedzialny za wizję produktu,
priorytetyzację prac, budżet oraz koordynację całego zespołu.

### Wymagane skille

- Product Management & Agile / Scrum
- Znajomość strategii GTM (Go-To-Market) dla produktów typu B2C / SaaS
- Analityka biznesowa i rozumienie metryk produktowych (Retention, Activation, CAC/LTV)
- Podstawowa wiedza z zakresu RODO/DPIA

### Kluczowe zadania

- **Nadzór nad harmonogramem:** Pilnowanie kamieni milowych kampanii (Tydzień 0–4)
  oraz przejścia z fazy Waitlisty do Zamkniętej Bety.
- **Analiza walidacji rynkowej:** Monitorowanie metryk z arkusza
  `virality-metrics-template.csv` oraz analiza wyników ankiety WTP
  (Willingness to Pay) dotyczącej płatności Pro (19–25 PLN/mies.).
- **Decyzje strategiczne:** Podejmowanie decyzji Go / No-Go przed launchem na
  Product Hunt w oparciu o poziom aktywacji (cel ≥40%) i retencję D7 (cel ≥20%).
- **Odbiór prac:** Ostateczna akceptacja wdrożeń od dewelopera, tworzywa wideo
  od Creatora i dokumentacji prawnej.

---

## 2. Growth / Short-Form Video Creator (TikTok & IG Specialist)

**Rola:** Odpowiedzialny za organiczną akwizycję użytkowników i budowanie
wiralowych zasięgów wokół koncepcji „Life in Weeks” i Memento Mori.

### Wymagane skille

- Tworzenie i montaż wideo short-form (CapCut, Premiere Pro)
- Biegła znajomość algorytmów i trendów na TikToku i Instagram Reels
- Pisanie chwytliwych „hooków” i scenariuszy wideo (storytelling psychologiczny / samorozwój)
- Praca z analityką organiczną (VTR 3s, Shares, Saves, CTR z bio)

### Kluczowe zadania

- **Produkcja wideo:** Przygotowanie i publikacja 10–15 wariantów wideo
  w pierwszych 2–3 tygodniach (formaty surowe, founder-led, POV z siatką życia).
- **Zarządzanie profilami:** Obsługa kont `@lifedotapps` (TikTok) oraz
  `@lifedots.app` (Instagram) — dbanie o bio, poprawne linki UTM
  ([utm-links.md](./utm-links.md)) oraz interakcję z komentarzami.
- **Testowanie haczyków (Hooks):** Eksperymentowanie z emocjonalnymi otwarciami
  (np. „Oto ile poniedziałków Ci zostało…”, „Dlaczego usunąłem tradycyjny
  dziennik na rzecz kropek?”).
- **Outreach do mikrokreatorów:** Przygotowanie listy 5–10 twórców z nisz
  stoicyzmu, journalingu i self-improvement w celu nawiązania współpracy
  (Tydzień 3).

---

## 3. Full-Stack / Frontend Engineer (Next.js & Supabase)

**Rola:** Główny archikodier odpowiedzialny za wydajność interfejsu,
bezpieczeństwo danych nastroju oraz infrastrukturę backendową.

### Wymagane skille

- Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS
- Backend & DB: Supabase (PostgreSQL, Row Level Security — RLS)
- Security: Bezpieczne stosowanie algorytmów szyfrowania po stronie serwera (AES-256-GCM)
- DevOps & Monitoring: Vercel, Sentry (z konfiguracją Scrubbing PII), CI/CD (GitHub Actions)

### Kluczowe zadania

- **Wydajność komponentu siatki:** Optymalizacja renderowania ok. 4680
  interaktywnych kropek w DOM, aby uniknąć zbędnych re-renderów.
- **Bezpieczeństwo & RLS:** Manualny test izolacji danych — weryfikacja, czy
  polityki RLS bezwzględnie blokują dostęp do wpisów innych użytkowników.
  Zapewnienie, że klucz `NOTE_ENCRYPTION_KEY` jest bezpiecznie przechowywany
  poza repozytorium.
- **Prawne i eksport danych:** Wdrożenie samoobsługowego eksportu danych
  (JSON/CSV) oraz mechanizmu kaskadowego usuwania konta i wycofania zgody RODO.
- **Scrubbing Sentry:** Konfiguracja Sentry tak, aby żadne notatki ani wartości
  nastroju (`mood_value`) nie trafiały do logów błędów.

---

## 4. UX/UI & Product Designer (Consultant / Freelance)

**Rola:** Projektowanie prostego, estetycznego interfejsu użytkownika w duchu
„Calm Tech” z minimalnym tarciem (low-friction onboarding).

### Wymagane skille

- Figma (systemy komponentów, prototypowanie micro-interactions)
- UI/UX dla aplikacji habit-tracking / journaling
- Projektowanie pod wytyczne RODO (clear & transparent privacy design)

### Kluczowe zadania

- **Przepływ zgody (Consent Flow):** Dopracowanie ekranu zgody na przetwarzanie
  danych o nastroju (art. 9 RODO) w onboardingu — musi być w 100% zrozumiały
  i nieodstraszający.
- **Karta udostępniania (ShareGridButton):** Zaprojektowanie estetycznego
  szablonu wyjściowego PNG siatki (bez wpisów tekstowych), który użytkownicy
  będą z dumą wrzucać na IG Stories.
- **Dashboard i Modal wpisu:** Dopracowanie interakcji kliknięcia w „dzisiejszą
  kropkę”, wyboru nastroju (5 stanów/kolorów) oraz wpisywania krótkiej notatki.

---

## 5. Konsultant ds. Prawnych i Ochrony Danych (RODO / Compliance Expert)

**Rola:** Nadzór nad zgodnością z prawem przetwarzania danych szczególnej
kategorii (dane o zdrowiu psychicznym/nastroju) i mitygowanie ryzyk prawnych.

### Wymagane skille

- Głęboka znajomość RODO (w szczególności art. 6, art. 9, art. 35 DPIA)
- Tworzenie i audyt dokumentacji prawnej dla startupów SaaS/mobile

### Kluczowe zadania

- **Finalizacja DPIA:** Weryfikacja i podpisanie przygotowanego dokumentu
  [`docs/dpia.md`](../dpia.md).
- **Uzupełnienie danych Administratora:** Uzupełnienie pól `[do uzupełnienia]`
  w Polityce Prywatności (`privacy-policy.md`), Regulaminie
  (`terms-of-service.md`) i Rejestrze (ROPA).
- **Audyt formy zgody:** Weryfikacja, czy zgoda na e-mail na waitliście oraz
  zgoda na rejestrowanie nastroju w aplikacji spełniają wymóg dobrowolności
  i jednoznaczności.

---

## Podsumowanie podziału odpowiedzialności

| Rola | Główny obszar odpowiedzialności | Najważniejsze deliverable |
|---|---|---|
| Product Owner | Wizja, cele, finanse, decyzje GTM | Harmonogram, wyniki WTP, Launch PH |
| Growth Creator | Organiczny wiral, TikTok/IG | 10–15 wideo, przyrost waitlisty |
| Full-Stack Dev | Architektura, RLS, szyfrowanie | Działająca faza Beta, eksport/usuwanie danych |
| UX/UI Designer | Interfejs, prostota, wygenerowane PNG | Prototyp Figmy, Onboarding flow, Share PNG |
| Legal / Compliance | RODO, Art. 9, bezpieczeństwo prawne | Podpisane DPIA, zatwierdzony Regulamin |
