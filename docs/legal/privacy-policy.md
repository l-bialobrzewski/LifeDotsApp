# Polityka prywatności LifeDots

Wersja: 1.0.0 · Ostatnia aktualizacja: [DATA] · Wersja robocza — **wymaga finalnej
weryfikacji przez prawnika przed publikacją**

> Wersja jest zsynchronizowana ze zmienną `NEXT_PUBLIC_PRIVACY_POLICY_VERSION` w
> aplikacji — patrz `app/dashboard/actions.ts`. Każda istotna zmiana treści musi
> zwiększać ten numer, aby log zgód (`consents.policy_version`) odzwierciedlał, na
> jaką wersję polityki użytkownik faktycznie się zgodził.

## 1. Administrator danych

**Łukasz Białobrzewski** — osoba fizyczna prowadząca projekt LifeDots (bez wpisu do
CEIDG/KRS).

- Adres: ul. Kozłowskiego „Lasa” 1/13, 07-410 Ostrołęka
- E-mail kontaktowy (sprawy ochrony danych): [lifedots.app@gmail.com](mailto:lifedots.app@gmail.com)

## 2. Jakie dane przetwarzamy

| Kategoria danych | Przykłady | Podstawa prawna |
|---|---|---|
| Dane konta | e-mail, hasło (zahaszowane) | Art. 6(1)(b) RODO — wykonanie umowy (świadczenie usługi) |
| Data urodzenia, oczekiwana długość życia | pole `birth_date`, `life_expectancy_years` | Art. 6(1)(b) — niezbędne do funkcji głównej (siatka życia) |
| **Dane o nastroju i samopoczuciu** (dane szczególnej kategorii, art. 9 RODO) | ocena nastroju 1–5, notatki dziennikowe, tagi | **Art. 9(2)(a) — Twoja wyraźna, odrębna zgoda** |
| Dane techniczne | logi błędów, adres IP (przejściowo, w logach infrastruktury) | Art. 6(1)(f) — prawnie uzasadniony interes (bezpieczeństwo, diagnostyka) |

Notatki i oceny nastroju są **szyfrowane** przed zapisem (AES-256-GCM) — nawet w
przypadku dostępu do bazy danych treść notatek nie jest odczytywalna bez klucza
przechowywanego odrębnie od bazy.

## 3. Twoja zgoda na dane o nastroju

Ekran zgody na przetwarzanie danych o nastroju/zdrowiu jest wyświetlany **odrębnie**
od akceptacji niniejszej polityki i regulaminu, zgodnie z wymogami dot. zgody
wyraźnej (art. 9(2)(a)). Możesz:

- wycofać zgodę w każdej chwili w Ustawienia → "Zgoda na dane o nastroju"
- wycofanie powoduje **usunięcie wszystkich zapisanych wpisów nastroju i notatek**
- korzystać z podstawowej funkcji siatki (bez oznaczania nastroju) bez udzielania tej zgody

## 4. Komu udostępniamy dane (podprocesorzy)

| Podmiot | Rola | Lokalizacja | Uwagi |
|---|---|---|---|
| Supabase Inc. | Baza danych, autentykacja | UE (Frankfurt, eu-central-1) | Spółka z siedzibą w USA; podpisana Data Processing Agreement (DPA) i Standardowe Klauzule Umowne (SCC) dla transferu danych |
| Vercel Inc. | Hosting aplikacji | Globalna sieć CDN | Spółka z siedzibą w USA; SCC |
| Sentry (Functional Software Inc.) | Monitorowanie błędów technicznych | Region UE (konfiguracja) | Treść notatek/nastroju nie jest przekazywana do tego systemu |
| [Stripe — jeśli aktywowane] | Płatności | Globalnie, zgodność PCI-DSS | Nie przetwarza danych o nastroju |

Nie sprzedajemy danych osobowych. Nie wykorzystujemy danych o nastroju do reklamy
targetowanej ani profilowania marketingowego.

## 5. Okres przechowywania danych

Patrz [Polityka retencji danych](./data-retention-policy.md). W skrócie: dane są
przechowywane do momentu usunięcia konta przez Ciebie lub wycofania zgody (dla
danych o nastroju).

## 6. Twoje prawa

Masz prawo do: dostępu do danych (art. 15), sprostowania (art. 16), usunięcia (art.
17), ograniczenia przetwarzania (art. 18), przenoszenia danych (art. 20), wycofania
zgody w każdym momencie (art. 7(3)) oraz wniesienia sprzeciwu (art. 21). Możesz
zrealizować prawo dostępu/przenoszenia i usunięcia samoobsługowo w Ustawieniach
konta. W innych przypadkach napisz na [lifedots.app@gmail.com](mailto:lifedots.app@gmail.com).

Masz również prawo wniesienia skargi do organu nadzorczego — w Polsce: Prezes
Urzędu Ochrony Danych Osobowych (UODO), ul. Stawki 2, 00-193 Warszawa.

## 7. Bezpieczeństwo danych

Szyfrowanie w tranzycie (TLS), szyfrowanie notatek w spoczynku, izolacja danych
między użytkownikami (Row Level Security), ograniczony dostęp administracyjny z
wymogiem uwierzytelniania dwuczynnikowego. Szczegóły techniczne: [DPIA](../dpia.md).

## 8. Zmiany polityki

O istotnych zmianach informujemy e-mailem i/lub powiadomieniem w aplikacji z
odpowiednim wyprzedzeniem przed wejściem w życie.

## 9. Kontakt

Administrator: Łukasz Białobrzewski  
E-mail: [lifedots.app@gmail.com](mailto:lifedots.app@gmail.com)  
Adres: ul. Kozłowskiego „Lasa” 1/13, 07-410 Ostrołęka  

Nie wyznaczono Inspektora Ochrony Danych (IOD).
