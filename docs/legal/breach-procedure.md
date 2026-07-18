# Procedura zgłaszania naruszeń ochrony danych (art. 33–34 RODO)

Wersja: 1.0.0 · Wersja robocza

## 1. Co jest "naruszeniem"

Każde zdarzenie prowadzące do przypadkowego lub niezgodnego z prawem zniszczenia,
utraty, zmodyfikowania, nieuprawnionego ujawnienia lub uzyskania dostępu do danych
osobowych — np. wyciek bazy danych, skompromitowany klucz szyfrujący notatek,
nieautoryzowany dostęp administracyjny, błąd RLS ujawniający dane innego użytkownika.

**Ze względu na charakter danych (art. 9 — nastrój/zdrowie), próg wagi incydentu w
LifeDots jest niższy niż w typowej aplikacji — nawet pojedynczy przypadek błędnego
dostępu do notatki innego użytkownika należy traktować jako potencjalne naruszenie
wysokiego ryzyka.**

## 2. Kroki po wykryciu incydentu

1. **Zatrzymaj rozprzestrzenianie** — w zależności od typu: rotacja kluczy API/
   `NOTE_ENCRYPTION_KEY`, wyłączenie skompromitowanego konta, wyłączenie feature flag.
2. **Zabezpiecz dowody** — zrzuty logów Supabase/Sentry/Vercel z okresu incydentu,
   zanim zostaną nadpisane retencją.
3. **Oceń zakres** — liczba dotkniętych użytkowników, kategorie danych (czy dane
   art. 9 były zaangażowane — to eskaluje wagę incydentu).
4. **Powiadomienie organu nadzorczego (UODO)** — **w ciągu 72 godzin** od
   wykrycia, jeśli naruszenie może skutkować ryzykiem dla praw i wolności osób
   (przy danych o zdrowiu przyjmujemy domyślnie, że tak). Zgłoszenie zawiera:
   charakter naruszenia, kategorie i szacunkową liczbę osób/danych, konsekwencje,
   podjęte/planowane środki naprawcze.
5. **Powiadomienie osób, których dane dotyczą (art. 34)** — wymagane, jeśli
   naruszenie może powodować wysokie ryzyko (np. wyciek treści notatek o
   zdrowiu psychicznym) — powiadomienie bez zbędnej zwłoki, jasnym językiem,
   z opisem zalecanych działań (np. zmiana hasła).
6. **Dokumentacja wewnętrzna** — każde naruszenie (nawet niezgłaszane do UODO)
   odnotowywane w rejestrze incydentów z uzasadnieniem decyzji o (nie)zgłoszeniu.
7. **Analiza post-mortem** — przyczyna źródłowa, poprawki techniczne/proceduralne,
   aktualizacja DPIA jeśli zmienia się profil ryzyka.

## 3. Role i kontakty

| Rola | Osoba | Kontakt |
|---|---|---|
| Osoba decyzyjna ds. incydentu | Łukasz Białobrzewski | lifedots.app@gmail.com |
| Kontakt techniczny (rotacja kluczy, logi) | Łukasz Białobrzewski | lifedots.app@gmail.com |
| Kontakt prawny / zgłoszenie do UODO | Łukasz Białobrzewski (ew. kancelaria zewnętrzna) | lifedots.app@gmail.com |

Zgłoszenia do UODO: [https://uodo.gov.pl](https://uodo.gov.pl) (formularz zgłoszenia
naruszenia ochrony danych osobowych).

## 4. Rejestr incydentów (szablon)

| Data wykrycia | Opis | Kategorie danych | Liczba osób | Zgłoszono UODO? | Powiadomiono osoby? | Status |
|---|---|---|---|---|---|---|
| | | | | | | |
