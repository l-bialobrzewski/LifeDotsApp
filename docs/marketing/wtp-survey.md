# Ankieta WTP (Willingness to Pay)

Narzędzie: **Tally** (preferowane) lub **Google Forms**.  
Formularz **anonimowy** — bez łączenia z e-mailem waitlisty (sekcja 11 kampanii).

---

## Status

| Element | Status |
|---|---|
| Struktura pytań (gotowa) | ✅ poniżej |
| Formularz opublikowany online | ⏳ **ręcznie** — utwórz w Tally/Forms |
| Link w aplikacji | Ustaw `NEXT_PUBLIC_WTP_SURVEY_URL` w `.env` |
| Wysyłka po waitlist | Link opcjonalny na ekranie sukcesu `WaitlistForm` |

---

## Instrukcja: Tally (5 min)

1. Wejdź na [tally.so](https://tally.so) → New form → „LifeDots WTP — anonimowa”.
2. Ustawienia: **Anonymous**, serwery EU (Tally GDPR).
3. Dodaj pytania wg tabeli poniżej (kolejność 1–6).
4. Opublikuj → skopiuj URL → wklej do `.env`:

```env
NEXT_PUBLIC_WTP_SURVEY_URL=https://tally.so/r/TWOJ_KOD
```

5. (Opcjonalnie) Tydzień 4: link w IG Stories + e-mail do waitlisty.

---

## Instrukcja: Google Forms (alternatywa)

1. [forms.google.com](https://forms.google.com) → Blank form.
2. Tytuł: „LifeDots — krótka ankieta (anonimowa)”.
3. Opis: „2 minuty. Odpowiedzi anonimowe, nie łączymy z Twoim e-mailem.”
4. Pytania jak poniżej.
5. Ustawienia → **Nie zbieraj adresów e-mail respondentów**.
6. URL → `NEXT_PUBLIC_WTP_SURVEY_URL`.

---

## Pytania (minimum — sekcja 10)

### 1. Skąd o nas wiesz?

- Typ: **Multiple choice** (single)
- Opcje: TikTok / Instagram / Znajomy / Inne (+ pole tekstowe)

### 2. Czy zbudował(a)byś swoją siatkę życia w LifeDots?

- Typ: **Multiple choice** (single)
- Opcje: Tak / Nie / Nie wiem

### 3. Co jest dla Ciebie najważniejsze?

- Typ: **Multiple choice** (multi-select OK)
- Opcje:
  - Wizualizacja życia
  - Śledzenie nastroju
  - Prywatność
  - Udostępnianie siatki
  - Inne (+ pole tekstowe)

### 4. Czy zapłacił(a)byś 19 zł/mies. za Pro?

Opis Pro w nawiasie: *wersjonowany backup w chmurze, album PDF „życie”, własne palety kolorów, unlimited tagi*.

- Typ: **Linear scale** lub **Multiple choice**
- Opcje:
  - Zdecydowanie tak
  - Raczej tak
  - Raczej nie
  - Zdecydowanie nie

### 5. Jaka cena miesięczna byłaby OK?

- Typ: **Multiple choice** (single)
- Opcje: 15 zł / 19 zł / 25 zł / 29 zł / Żadna — tylko darmowe

### 6. (Opcja) Co musiałoby być w Pro, żebyś zapłacił(a)?

- Typ: **Long text** (opcjonalne)

---

## Progi sukcesu

| Wynik | Interpretacja |
|---|---|
| ≥ 20% „Zdecydowanie tak” + „Raczej tak” przy 19 zł | Sygnał monetyzacji |
| ≥ 40% | Mocny sygnał |

Liczenie: `(tak + raczej_tak) / wszystkie_odpowiedzi × 100%` dla pytania 4.

---

## Eksport wyników

- **Tally:** Responses → Export CSV → wklej do arkusza „WTP” w [virality-metrics-template.csv](./virality-metrics-template.csv).
- **Google Forms:** Responses → Sheets.

Co tydzień: zlicz % pozytywnych przy 19 zł, dopisz do raportu go/no-go (sekcja 2 kampanii).
