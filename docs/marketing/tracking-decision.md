# Decyzja tracking: pixel vs UTM-only

Data: Tydzień 0 setup kampanii wiralowej.

---

## Decyzja: **BEZ pixela Meta/TikTok**

| Pytanie | Odpowiedź |
|---|---|
| Czy landing ma baner cookie consent (CMP)? | **Nie** — brak komponentu CMP w `app/layout.tsx` |
| Czy pixel można legalnie włączyć? | **Nie** — wymaga zgody użytkownika przed ustawieniem cookies trackingowych (RODO/ePrivacy) |
| Co wdrożono? | **UTM-only** + natywne statystyki TikTok/IG + liczba zapisów waitlist |

`TRACKING_PIXELS_ENABLED = false` w `lib/marketing/config.ts`.

---

## Uzasadnienie

1. **RODO / ePrivacy** — Meta Pixel i TikTok Pixel ustawiają cookies identyfikujące użytkownika. Bez CMP (Cookiebot, CookieYes, własny baner z granularną zgodą) instalacja pixela = naruszenie.
2. **Profil ryzyka** — kampania solo, mały budżet, zero tolerancji na problemy prawne (sekcja 11 social-virality-campaign.md).
3. **Wystarczający pomiar** — dla organic-first walidacji wystarcza:
   - parametry UTM w linku bio → zapis w `waitlist_signups.utm_*`
   - natywne metryki platform (views, shares, saves — dane zagregowane)
   - ręczny arkusz [virality-metrics-template.csv](./virality-metrics-template.csv)

---

## Co NIE robić (Tydzień 0–4)

- Nie instaluj Meta Pixel w Events Manager.
- Nie instaluj TikTok Pixel w TikTok Ads Manager.
- Nie dodawaj Google Analytics z cookies bez CMP.

---

## Kiedy rozważyć pixel (po kampanii)

Dopiero gdy:

1. Wdrożysz CMP z kategorią „marketing/analytics” (opt-in, nie pre-checked).
2. Zaktualizujesz politykę prywatności o podprocesorów (Meta, TikTok).
3. Masz budżet paid ads wymagający retargetingu.

Wtedy ustaw `TRACKING_PIXELS_ENABLED = true` i dodaj lazy-loaded pixel tylko po `consent.marketing === true`.

---

## Implementacja UTM (wdrożona)

```
Reel → bio link (?utm_...) → landing (UtmCapture → sessionStorage) → waitlist API (zapis utm_*)
```

Bez cookies — tylko sessionStorage na czas sesji przeglądarki.
