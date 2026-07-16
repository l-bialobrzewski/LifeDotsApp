# Linki UTM — bio TikTok / Instagram

Produkcja: `https://lifedots.app`  
Konta: [@lifedotapps TikTok](https://www.tiktok.com/@lifedotapps) · [@lifedots.app Instagram](https://www.instagram.com/lifedots.app/)

---

## Bio — gotowe linki (Tydzień 1)

Wklej **jeden** link w pole „Strona internetowa” / link w bio.

### TikTok (organic, tydzień 1)

```
https://lifedots.app?utm_source=tiktok&utm_medium=organic&utm_campaign=virality_w1
```

### Instagram (organic, tydzień 1)

```
https://lifedots.app?utm_source=instagram&utm_medium=organic&utm_campaign=virality_w1
```

---

## Wszystkie szablony kampanii

| Użycie | URL |
|---|---|
| TikTok organic W1 | `https://lifedots.app?utm_source=tiktok&utm_medium=organic&utm_campaign=virality_w1` |
| Instagram organic W1 | `https://lifedots.app?utm_source=instagram&utm_medium=organic&utm_campaign=virality_w1` |
| TikTok organic W2 | `https://lifedots.app?utm_source=tiktok&utm_medium=organic&utm_campaign=virality_w2` |
| Instagram organic W2 | `https://lifedots.app?utm_source=instagram&utm_medium=organic&utm_campaign=virality_w2` |
| TikTok EN control W2 | `https://lifedots.app?utm_source=tiktok&utm_medium=organic&utm_campaign=virality_w2&utm_content=en_control` |
| Instagram EN control W2 | `https://lifedots.app?utm_source=instagram&utm_medium=organic&utm_campaign=virality_w2&utm_content=en_control` |
| TikTok paid boost W3 | `https://lifedots.app?utm_source=tiktok&utm_medium=paid&utm_campaign=virality_w3_boost` |
| Instagram paid boost W3 | `https://lifedots.app?utm_source=instagram&utm_medium=paid&utm_campaign=virality_w3_boost` |
| Kreator (przykład @nick) | `https://lifedots.app?utm_source=tiktok&utm_medium=creator&utm_campaign=virality_w3&utm_content=nick` |

---

## Bio copy (tekst profilu)

TikTok ma **limit 80 znaków** — pełna wersja się nie zmieści (przycisk „Zapisz” będzie szary).

### TikTok (max 80 znaków — 67 znaków)

```
LifeDots
1 tydzień = 1 kropka. Świadomie.
👇 Zbuduj siatkę za darmo
```

### Instagram (max 150 znaków — pełna wersja)

```
LifeDots — zobacz swoje życie jako doty.
Każdy tydzień = 1 kropka. Świadomie. Prywatnie.
👇 Zbuduj swoją siatkę — bezpłatnie
```

---

## Jak mierzyć

1. **Wejścia z UTM** — zapytanie SQL na `waitlist_signups` (grupuj po `utm_source`, `utm_campaign`) lub eksport z Tally.
2. **Kliknięcia bio** — szacunek: wejścia landing z danym `utm_source` / wyświetlenia profilu (TikTok/IG Analytics).
3. **Konwersja** — zapisy waitlist / wejścia z UTM (cel ≥ 15%).

Kod: `lib/marketing/utm.ts`, capture w `components/UtmCapture.tsx`.
