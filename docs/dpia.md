# DPIA — Data Protection Impact Assessment (Ocena Skutków dla Ochrony Danych)

Produkt: **LifeDots** · Wersja: v0.1 (draft roboczy — wymaga finalnej akceptacji przez
osobę odpowiedzialną za ochronę danych / prawnika przed produkcyjnym startem)
Podstawa: art. 35 RODO (obowiązkowa, bo przetwarzanie na dużą skalę danych szczególnej
kategorii — art. 9 RODO)

> **Uwaga:** Ten dokument jest szkieletem roboczym przygotowanym w ramach prac
> zespołu produktowego/technicznego. Nie zastępuje on formalnej opinii prawnej.
> Przed publicznym launchem sekcje 5–7 powinny zostać zweryfikowane i podpisane przez
> osobę z kompetencjami prawnymi (prawnik RODO / IOD).

## 1. Opis przetwarzania

| Pole | Wartość |
|---|---|
| Administrator danych | [Nazwa spółki/osoby prowadzącej działalność — do uzupełnienia] |
| Cel przetwarzania | Umożliwienie użytkownikowi wizualizacji życia i śledzenia własnego nastroju/wydarzeń w czasie (funkcja główna produktu) |
| Kategorie danych | (a) dane konta: e-mail, data urodzenia; (b) **dane szczególnej kategorii**: wpisy nastroju (`mood_value`), notatki tekstowe (`note`), tagi opisujące kontekst życiowy |
| Kategorie osób | Użytkownicy końcowi aplikacji webowej, dorośli (18+, patrz sekcja 6) |
| Skala | MVP: dziesiątki–setki użytkowników; docelowo potencjalnie tysiące — przetwarzanie uznane za "na dużą skalę" prospektywnie |
| Retencja | Dane przechowywane do usunięcia konta przez użytkownika lub wycofania zgody; brak automatycznego czyszczenia — patrz [polityka retencji](./legal/data-retention-policy.md) |
| Lokalizacja przechowywania | Supabase Postgres, region UE (Frankfurt, `eu-central-1`) |

## 2. Klasyfikacja danych — dlaczego to art. 9 RODO

Wpisy nastroju i notatki dziennikowe ujawniają stan psychiczny/emocjonalny
użytkownika. Zgodnie z wykładnią EDPB oraz orzecznictwem (m.in. analiza prawna dot.
aplikacji dziennikowych i mental health), **dane o nastroju/samopoczuciu = dane
dotyczące zdrowia w rozumieniu art. 4(15) i art. 9 RODO**, nawet jeśli mają formę
prostej skali (np. 1–5), a nie sformalizowanej dokumentacji medycznej.

**Wniosek:** przetwarzanie jest domyślnie zabronione (art. 9(1)) i wymaga jednej z
podstaw z art. 9(2). Dla komercyjnej aplikacji konsumenckiej właściwą podstawą jest:

> **art. 9(2)(a) — wyraźna (explicit) zgoda osoby, której dane dotyczą.**

## 3. Ocena niezbędności i proporcjonalności

- Czy funkcja oznaczania nastroju jest niezbędna do realizacji celu produktu? **Tak** —
  to główna wartość produktu (bez tego LifeDots byłby jedynie kalendarzem).
- Czy zbieramy więcej danych niż potrzeba (data minimisation)? Rewizja pól:
  - `mood_value` — niezbędne, minimalny zakres (skala 1–5, brak wolnego tekstu wymagany)
  - `note` — **opcjonalne pole**, użytkownik nie musi go wypełniać; UI powinien to
    komunikować jasno ("notatka opcjonalna")
  - `tags` — opcjonalne, ograniczone do predefiniowanej lub użytkownik-definiowanej
    krótkiej listy, bez zbierania danych szczególnie inwazyjnych (bez sugerowania np.
    tagów diagnostycznych)
  - Data urodzenia — niezbędna dla rdzennej funkcji (siatka życia); nie zbieramy
    dodatkowych demografii (adres, numer telefonu, płeć) w MVP — **redukcja zakresu
    względem pierwszych szkiców architektury**

## 4. Ocena ryzyk

| Ryzyko | Prawdopodobieństwo | Skutek dla osoby | Środki ograniczające |
|---|---|---|---|
| Wyciek bazy danych (notatki o nastroju) | Średnie (typowe dla SaaS) | Wysoki — ujawnienie stanu psychicznego, możliwa dyskryminacja/stygmatyzacja | Szyfrowanie pola `note` na poziomie aplikacji (patrz sekcja 5), RLS, szyfrowanie w tranzycie (TLS), ograniczony dostęp administracyjny + MFA |
| Nieautoryzowany dostęp do konta (słabe hasło) | Średnie | Wysoki | Wymuszenie polityki haseł, wsparcie MFA, monitorowanie logowań |
| Nadmierne przetwarzanie przez podprocesorów (Supabase/Vercel — spółki US) | Niskie–średnie (ryzyko prawne, nie operacyjne) | Średni — teoretyczna ekspozycja na CLOUD Act | DPA + SCC z podprocesorami, jawne ujawnienie w polityce prywatności, rozważenie hostingu w pełni unijnego przy skalowaniu (patrz sekcja 7) |
| Brak realnego mechanizmu usunięcia danych | Niskie (jeśli zaimplementowane poprawnie) | Wysoki (naruszenie art. 17) | Endpoint usunięcia konta testowany end-to-end w ramach `core_features` |
| Wnioskowanie o stanie zdrowia z metadanych (np. częstotliwość niskich ocen) | Niskie w MVP (brak analityki/AI) | Średni | Brak profilowania/AI na danych nastroju w MVP; jeśli dodane w v2 — wymaga rewizji DPIA i dodatkowej zgody |

## 5. Środki techniczne i organizacyjne (art. 32)

- **Szyfrowanie w spoczynku dla pola `note`:** szyfrowanie po stronie aplikacji przed
  zapisem do bazy (AES-256-GCM, klucz zarządzany poza bazą danych) — patrz
  `lib/encryption.ts`. Nawet operator bazy danych nie ma dostępu do treści w formie
  czystego tekstu.
- `mood_value` (liczba 1–5) — **decyzja DPIA: przechowywane bez szyfrowania
  kolumnowego** w MVP, ponieważ: (a) samodzielnie ma niską wartość identyfikującą bez
  kontekstu notatki, (b) jest niezbędne do renderowania siatki po stronie serwera dla
  wydajności. Ryzyko uznane za zaakceptowane pod warunkiem RLS + szyfrowania transportu.
  **Do ponownej oceny, jeśli skala użytkowników znacząco wzrośnie.**
- Szyfrowanie w tranzycie: TLS 1.2+ wszędzie (Vercel/Supabase domyślnie)
- Row Level Security (RLS) na każdej tabeli z danymi osobowymi — `user_id = auth.uid()`
- Zasada najmniejszych uprawnień dla kont administracyjnych + wymagane MFA
- Logowanie dostępu do danych wrażliwych (audyt) po stronie Supabase
- Regularne backupy z PITR (Point-in-Time Recovery) — do rozważenia szyfrowanie
  backupów zgodnie z domyślną konfiguracją dostawcy

## 6. Wiek użytkowników

MVP kierowany do osób **18+**. ToS wyklucza rejestrację osób niepełnoletnich (brak
mechanizmu weryfikacji wieku w MVP — ryzyko zaakceptowane na etapie MVP, do rewizji
przy skalowaniu; patrz [ToS](./legal/terms-of-service.md)).

## 7. Podprocesorzy i transfery danych

| Podprocesor | Rola | Lokalizacja danych | Ryzyko transferowe |
|---|---|---|---|
| Supabase Inc. | Baza danych, autentykacja, storage | UE (Frankfurt, `eu-central-1`) | Spółka US → teoretyczna ekspozycja na CLOUD Act mimo hostingu UE; mitygacja: DPA + SCC podpisane, ujawnione w polityce prywatności |
| Vercel Inc. | Hosting frontend, edge network | Globalny CDN, możliwe punkty poza UE | Spółka US → jak wyżej; SCC standardowo dostępne u dostawcy |
| Sentry (Functional Software Inc.) | Error tracking | Wybór regionu UE w konfiguracji | Jak wyżej; **rekomendacja: nie logować treści `note`/`mood_value` do Sentry — scrubbing PII w konfiguracji** |
| Stripe (jeśli aktywowane w v2) | Płatności | Globalne, PCI-DSS | Nie dotyczy danych zdrowotnych — odrębny scope |

**Decyzja do podjęcia świadomie przez właściciela produktu:** MVP korzysta z powyższego
stosu z ujawnieniem ryzyka CLOUD Act w polityce prywatności. Przy wejściu do
segmentu B2B/instytucjonalnego (np. klienci korporacyjni, ochrona zdrowia) —
rekomendowana migracja do w pełni unijnego dostawcy infrastruktury bez amerykańskiego
podmiotu macierzystego.

## 8. Prawa osób, których dane dotyczą — implementacja

| Prawo | Mechanizm w MVP |
|---|---|
| Dostęp / przenoszenie (art. 15, 20) | Samoobsługowy eksport JSON/CSV w ustawieniach konta |
| Sprostowanie (art. 16) | Edycja wpisu w dzienniku |
| Usunięcie (art. 17) | Samoobsługowe usunięcie konta — trwałe, kaskadowe (profil, wpisy, zgody) |
| Wycofanie zgody (art. 7(3)) | Przełącznik w ustawieniach; wycofanie = wymuszenie usunięcia danych nastroju |
| Zgłoszenie do organu nadzorczego | Informacja w polityce prywatności (dane kontaktowe UODO / właściwego organu) |

## 9. Konsultacja i decyzja

- [ ] DPIA zweryfikowane przez osobę z kompetencjami prawnymi
- [ ] Podstawa prawna (art. 9(2)(a)) potwierdzona
- [ ] Zakres szyfrowania (sekcja 5) zatwierdzony
- [ ] Lista podprocesorów i ryzyk transferowych zaakceptowana
- [ ] DPIA do rewizji przy: (a) wprowadzeniu AI/analityki nastroju, (b) istotnym
      wzroście skali, (c) zmianie podprocesora

**Rekomendacja:** nie uruchamiać publicznego (nawet beta) dostępu z prawdziwymi danymi
użytkowników przed odznaczeniem powyższej listy.
