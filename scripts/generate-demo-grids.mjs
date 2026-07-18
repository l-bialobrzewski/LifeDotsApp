/**
 * Generuje fikcyjne siatki PNG do kampanii (Tydzień 0).
 * Kolory i layout zgodne z components/ShareGridButton.tsx.
 * Dane wymyślone — zero PII / prawdziwych notatek.
 *
 * Uruchom: node scripts/generate-demo-grids.mjs
 */

import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "docs", "marketing", "assets", "demo-grids");

const MOOD_HEX = {
  1: [0x94, 0xa3, 0xb8],
  2: [0x60, 0xa5, 0xfa],
  3: [0xfb, 0xbf, 0x24],
  4: [0xfb, 0x92, 0x3c],
  5: [0x34, 0xd3, 0x99],
};

const COLS = 52;
const DOT = 8;
const GAP = 3;
const CELL = DOT + GAP;
const BG = [0x0b, 0x10, 0x20];
const PAST_EMPTY = [0xff, 0xff, 0xff, 0x26];
const FUTURE = [0xff, 0xff, 0xff, 0x10];
/** Tylko ASCII — bitmap font nie obsługuje PL diacritics; CapCut i tak nakłada PL overlay. */
const LABEL = "lifedots.app";
const LABEL_COLOR = [0xe8, 0xec, 0xf7];

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1;
    }
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePng(width, height, rgba) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    const rowStart = y * (width * 4 + 1);
    raw[rowStart] = 0;
    rgba.copy(raw, rowStart + 1, y * width * 4, (y + 1) * width * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function setPixel(rgba, w, x, y, r, g, b, a = 255) {
  if (x < 0 || y < 0 || x >= w) return;
  const i = (y * w + x) * 4;
  rgba[i] = r;
  rgba[i + 1] = g;
  rgba[i + 2] = b;
  rgba[i + 3] = a;
}

function fillRect(rgba, w, x0, y0, dw, dh, r, g, b, a = 255) {
  for (let y = y0; y < y0 + dh; y++) {
    for (let x = x0; x < x0 + dw; x++) {
      setPixel(rgba, w, x, y, r, g, b, a);
    }
  }
}

/** Font 5×7 (bity wierszy 0–6, LSB = lewa kolumna). */
const GLYPHS = {
  " ": [0, 0, 0, 0, 0, 0, 0],
  "-": [0, 0, 0, 0x1f, 0, 0, 0],
  ".": [0, 0, 0, 0, 0, 0, 0x04],
  a: [0, 0, 0x0e, 0x11, 0x1f, 0x11, 0x11],
  d: [0x01, 0x01, 0x0f, 0x11, 0x11, 0x11, 0x0f],
  e: [0, 0, 0x0e, 0x11, 0x1f, 0x10, 0x0e],
  f: [0x06, 0x08, 0x08, 0x1e, 0x08, 0x08, 0x08],
  i: [0x04, 0, 0x0c, 0x04, 0x04, 0x04, 0x0e],
  l: [0x0c, 0x04, 0x04, 0x04, 0x04, 0x04, 0x0e],
  m: [0, 0, 0x1b, 0x15, 0x15, 0x15, 0x15],
  o: [0, 0, 0x0e, 0x11, 0x11, 0x11, 0x0e],
  p: [0, 0, 0x1e, 0x11, 0x1e, 0x10, 0x10],
  s: [0, 0, 0x0f, 0x10, 0x0e, 0x01, 0x1e],
  t: [0x08, 0x08, 0x1e, 0x08, 0x08, 0x08, 0x06],
  w: [0, 0, 0x11, 0x11, 0x15, 0x15, 0x0a],
  y: [0, 0, 0x11, 0x11, 0x0f, 0x01, 0x0e],
  z: [0, 0, 0x1f, 0x02, 0x04, 0x08, 0x1f],
  "0": [0x0e, 0x11, 0x13, 0x15, 0x19, 0x11, 0x0e],
  "1": [0x04, 0x0c, 0x04, 0x04, 0x04, 0x04, 0x0e],
  "2": [0x0e, 0x11, 0x01, 0x06, 0x08, 0x10, 0x1f],
  "3": [0x1f, 0x02, 0x04, 0x02, 0x01, 0x11, 0x0e],
  "4": [0x02, 0x06, 0x0a, 0x12, 0x1f, 0x02, 0x02],
  "5": [0x1f, 0x10, 0x1e, 0x01, 0x01, 0x11, 0x0e],
  "6": [0x06, 0x08, 0x10, 0x1e, 0x11, 0x11, 0x0e],
  "7": [0x1f, 0x01, 0x02, 0x04, 0x08, 0x08, 0x08],
  "8": [0x0e, 0x11, 0x11, 0x0e, 0x11, 0x11, 0x0e],
  "9": [0x0e, 0x11, 0x11, 0x0f, 0x01, 0x02, 0x0c],
};

function drawChar(rgba, width, x, y, ch, scale = 2) {
  const g = GLYPHS[ch.toLowerCase()] ?? GLYPHS["."];
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 5; col++) {
      if (g[row] & (1 << (4 - col))) {
        fillRect(
          rgba,
          width,
          x + col * scale,
          y + row * scale,
          scale,
          scale,
          LABEL_COLOR[0],
          LABEL_COLOR[1],
          LABEL_COLOR[2],
          255
        );
      }
    }
  }
}

function drawLabelBar(rgba, width, height, text) {
  const barH = 40;
  fillRect(rgba, width, 0, height - barH, width, barH, BG[0], BG[1], BG[2], 255);
  let x = 4;
  const y = height - 32;
  for (const ch of text) {
    drawChar(rgba, width, x, y, ch, 2);
    x += ch === " " ? 6 : 12;
    if (x > width - 20) break;
  }
}

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * @param {{ ageYears: number, expectancy: number, density: number, moodBias: number[], seed: number, name: string }} opts
 * density: 0–1 udział przeszłych tygodni z kolorem
 * moodBias: wagi mood 1–5
 */
function buildMoodMap(opts) {
  const rand = mulberry32(opts.seed);
  const totalWeeks = Math.ceil((opts.expectancy * 365.25) / 7);
  const currentWeek = Math.floor((opts.ageYears * 365.25) / 7);
  const moods = new Array(totalWeeks).fill(null);

  const weights = opts.moodBias;
  const sumW = weights.reduce((a, b) => a + b, 0);

  function pickMood() {
    let r = rand() * sumW;
    for (let m = 0; m < weights.length; m++) {
      r -= weights[m];
      if (r <= 0) return m + 1;
    }
    return 3;
  }

  for (let i = 0; i < currentWeek; i++) {
    // Więcej wpisów w ostatnich latach życia (bardziej „żywa” siatka)
    const recency = i / Math.max(currentWeek, 1);
    const p = opts.density * (0.45 + 0.55 * recency);
    if (rand() < p) moods[i] = pickMood();
  }
  // Zawsze zaznacz „dziś” kolorem
  if (currentWeek < totalWeeks) moods[currentWeek] = pickMood();

  return { totalWeeks, currentWeek, moods };
}

function renderGrid(opts) {
  const { totalWeeks, currentWeek, moods } = buildMoodMap(opts);
  const rows = Math.ceil(totalWeeks / COLS);
  const width = COLS * CELL;
  const height = rows * CELL + 40;
  const rgba = Buffer.alloc(width * height * 4);

  fillRect(rgba, width, 0, 0, width, height, BG[0], BG[1], BG[2], 255);

  for (let i = 0; i < totalWeeks; i++) {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const x = col * CELL;
    const y = row * CELL;
    const mood = moods[i];

    if (mood) {
      const [r, g, b] = MOOD_HEX[mood];
      fillRect(rgba, width, x, y, DOT, DOT, r, g, b, 255);
    } else if (i > currentWeek) {
      fillRect(
        rgba,
        width,
        x,
        y,
        DOT,
        DOT,
        FUTURE[0],
        FUTURE[1],
        FUTURE[2],
        FUTURE[3]
      );
    } else {
      fillRect(
        rgba,
        width,
        x,
        y,
        DOT,
        DOT,
        PAST_EMPTY[0],
        PAST_EMPTY[1],
        PAST_EMPTY[2],
        PAST_EMPTY[3]
      );
    }

    // Obrys „dziś”
    if (i === currentWeek) {
      for (let t = 0; t < DOT; t++) {
        setPixel(rgba, width, x + t, y, 0xe8, 0xec, 0xf7, 255);
        setPixel(rgba, width, x + t, y + DOT - 1, 0xe8, 0xec, 0xf7, 255);
        setPixel(rgba, width, x, y + t, 0xe8, 0xec, 0xf7, 255);
        setPixel(rgba, width, x + DOT - 1, y + t, 0xe8, 0xec, 0xf7, 255);
      }
    }
  }

  drawLabelBar(rgba, width, height, LABEL);
  return encodePng(width, height, rgba);
}

const SCENARIOS = [
  {
    file: "01-age-22-sparse.png",
    name: "Wiek ~22, rzadkie wpisy",
    ageYears: 22,
    expectancy: 90,
    density: 0.22,
    moodBias: [1, 2, 3, 2, 2],
    seed: 2201,
  },
  {
    file: "02-age-28-balanced.png",
    name: "Wiek ~28, zrównoważony",
    ageYears: 28,
    expectancy: 90,
    density: 0.38,
    moodBias: [1, 2, 3, 3, 2],
    seed: 2802,
  },
  {
    file: "03-age-35-dense.png",
    name: "Wiek ~35, gęsta siatka",
    ageYears: 35,
    expectancy: 90,
    density: 0.55,
    moodBias: [1, 2, 3, 3, 3],
    seed: 3503,
  },
  {
    file: "04-age-42-warm.png",
    name: "Wiek ~42, ciepłe nastroje",
    ageYears: 42,
    expectancy: 90,
    density: 0.48,
    moodBias: [1, 1, 2, 4, 4],
    seed: 4204,
  },
  {
    file: "05-age-50-calm.png",
    name: "Wiek ~50, spokojne blues/ziele",
    ageYears: 50,
    expectancy: 90,
    density: 0.42,
    moodBias: [1, 4, 2, 1, 3],
    seed: 5005,
  },
  {
    file: "06-colorful-varied.png",
    name: "Wiek ~30, mocno kolorowa",
    ageYears: 30,
    expectancy: 90,
    density: 0.62,
    moodBias: [2, 2, 2, 2, 2],
    seed: 3006,
  },
  {
    file: "07-recent-years-active.png",
    name: "Wiek ~33, aktywne ostatnie lata",
    ageYears: 33,
    expectancy: 90,
    density: 0.7,
    moodBias: [1, 2, 3, 3, 4],
    seed: 3307,
  },
  {
    file: "08-empty-vs-filled.png",
    name: "Wiek ~25, kontrast puste/wypełnione",
    ageYears: 25,
    expectancy: 90,
    density: 0.18,
    moodBias: [1, 1, 2, 3, 5],
    seed: 2508,
  },
  {
    file: "09-age-38-emerald-heavy.png",
    name: "Wiek ~38, przewaga zieleni (5)",
    ageYears: 38,
    expectancy: 90,
    density: 0.5,
    moodBias: [1, 1, 2, 2, 6],
    seed: 3809,
  },
  {
    file: "10-age-45-life-map.png",
    name: "Wiek ~45, mapa życia (kampania)",
    ageYears: 45,
    expectancy: 90,
    density: 0.52,
    moodBias: [2, 2, 3, 3, 3],
    seed: 4510,
  },
];

mkdirSync(OUT_DIR, { recursive: true });

const manifest = [];
for (const s of SCENARIOS) {
  const png = renderGrid(s);
  const path = join(OUT_DIR, s.file);
  writeFileSync(path, png);
  manifest.push({
    file: s.file,
    description: s.name,
    ageYears: s.ageYears,
    fictional: true,
  });
  console.log("wrote", s.file, `(${png.length} bytes)`);
}

writeFileSync(
  join(OUT_DIR, "README.md"),
  `# Demo grids — fikcyjne siatki LifeDots

Wygenerowane skryptem \`scripts/generate-demo-grids.mjs\`.

**Wszystkie dane są fikcyjne** — do użycia w TikTok / Instagram / briefach kreatorów.
Nie zawierają notatek, tagów ani danych osobowych.

| Plik | Opis |
|---|---|
${manifest.map((m) => `| \`${m.file}\` | ${m.description} |`).join("\n")}

Kolory zgodne z \`ShareGridButton\` (mood 1–5). Podpis brandowy na dole obrazka.
`
);

console.log(`\nDone: ${SCENARIOS.length} PNGs → ${OUT_DIR}`);
