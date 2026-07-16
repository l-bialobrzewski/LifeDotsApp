# Avatar i logo — LifeDots

Znak profilowy TikTok / Instagram oraz master logo SVG. Spójny z landingiem i siatką kropek w aplikacji.

---

## Pliki

| Plik | Rozmiar | Użycie |
|---|---|---|
| [`assets/logo-avatar.svg`](./assets/logo-avatar.svg) | wektor 400×400 | Master — edycje, skalowanie |
| [`assets/avatar-tiktok-instagram.png`](./assets/avatar-tiktok-instagram.png) | 400×400 PNG | **Upload na TikTok i Instagram** |
| [`assets/avatar-circle-preview.png`](./assets/avatar-circle-preview.png) | 400×400 PNG | Podgląd przycięcia do kółka profilu |

Regeneracja PNG (bez zewnętrznych zależności):

```bash
node scripts/render-avatar.mjs
```

---

## Koncepcja

Siatka **3×3** kwadratowych kropek — metafora „życie jako doty” z aplikacji (`ShareGridButton`).

- **Środkowa kropka** = „teraz” / akcent CTA (`#10b981`)
- **8 otaczających** = puste tygodnie (`#ffffff26`)
- **Tło** = kolor landingu (`#0b1020`)
- **Bez tekstu** — czytelność w małym kółku profilu (~48 px)

---

## Paleta

| Token | Hex | Źródło |
|---|---|---|
| Tło | `#0b1020` | `app/globals.css` → `--background` |
| Kropka pusta | `#ffffff26` | `ShareGridButton` — puste tygodnie |
| Akcent | `#10b981` | Tailwind `emerald-500` — przyciski waitlisty |
| Tekst (nie w avatrze) | `#e8ecf7` | `--foreground` |

---

## Wymiary techniczne

| Parametr | Wartość |
|---|---|
| Canvas | 400 × 400 px |
| Kropka | 56 × 56 px, `rx=4` w SVG |
| Odstęp | 22 px |
| Siatka | wyśrodkowana (start 94, 94) |
| Safe zone | ~75% środka — mieści się w kółku TikTok/IG |

---

## Upload — TikTok

1. Zaloguj się: https://www.tiktok.com/@lifedotapps
2. **Profil** → **Edytuj profil**
3. **Zdjęcie profilowe** → wybierz `avatar-tiktok-instagram.png`
4. Zapisz

## Upload — Instagram

1. Zaloguj się: https://www.instagram.com/lifedots.app/
2. **Profil** → **Edytuj profil**
3. **Zmień zdjęcie** → **Prześlij zdjęcie** → `avatar-tiktok-instagram.png`
4. Zapisz

**Ten sam plik** na obu platformach — spójność marki.

---

## Wymagania platform

| Platforma | Min. | Zalecane | Format |
|---|---|---|---|
| TikTok | 200×200 | 400×400 | PNG / JPG |
| Instagram | 320×320 | 400×400+ | PNG / JPG |

Wyświetlanie: obie platformy przycinają avatar do **kółka**. Sprawdź `avatar-circle-preview.png` przed publikacją.

---

## Powiązane

- [asset-bank-checklist.md](./asset-bank-checklist.md) — checklista assetów
- [week-0-setup.md](./week-0-setup.md) — setup kampanii
- [utm-links.md](./utm-links.md) — bio + linki UTM
