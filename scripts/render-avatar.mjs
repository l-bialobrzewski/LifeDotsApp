/**
 * One-off avatar PNG export — no external deps.
 * Run: node scripts/render-avatar.mjs
 */
import fs from "fs";
import path from "path";
import zlib from "zlib";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../docs/marketing/assets/avatar-tiktok-instagram.png");
const OUT_PREVIEW = path.join(
  __dirname,
  "../docs/marketing/assets/avatar-circle-preview.png"
);

const W = 400;
const H = 400;

const BG = { r: 11, g: 16, b: 32, a: 255 };
const MUTED = { r: 255, g: 255, b: 255, a: 38 };
const ACCENT = { r: 16, g: 185, b: 129, a: 255 };

const DOT = 56;
const GAP = 22;
const START = 94;

function setPixel(buf, x, y, c) {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 4;
  buf[i] = c.r;
  buf[i + 1] = c.g;
  buf[i + 2] = c.b;
  buf[i + 3] = c.a;
}

function fillRect(buf, x0, y0, w, h, c) {
  for (let y = y0; y < y0 + h; y++) {
    for (let x = x0; x < x0 + w; x++) {
      setPixel(buf, x, y, c);
    }
  }
}

const rgba = Buffer.alloc(W * H * 4, 0);
fillRect(rgba, 0, 0, W, H, BG);

for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 3; col++) {
    const x = START + col * (DOT + GAP);
    const y = START + row * (DOT + GAP);
    const color = row === 1 && col === 1 ? ACCENT : MUTED;
    fillRect(rgba, x, y, DOT, DOT, color);
  }
}

function crc32(buf) {
  let c = 0xffffffff;
  const table = crc32._table ?? (crc32._table = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c;
    }
    return t;
  })());
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 6; // RGBA
ihdr[10] = 0; // compression
ihdr[11] = 0; // filter
ihdr[12] = 0; // interlace

const raw = Buffer.alloc(H * (1 + W * 4));
for (let y = 0; y < H; y++) {
  const rowStart = y * (1 + W * 4);
  raw[rowStart] = 0; // filter none
  rgba.copy(raw, rowStart + 1, y * W * 4, (y + 1) * W * 4);
}

const idat = zlib.deflateSync(raw, { level: 9 });

const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk("IHDR", ihdr),
  chunk("IDAT", idat),
  chunk("IEND", Buffer.alloc(0)),
]);

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, png);
console.log("Wrote", OUT);

// Circle-crop preview (simulates TikTok/IG profile photo mask)
const PREVIEW_BG = { r: 26, g: 26, b: 46, a: 255 };
const RING = { r: 255, g: 255, b: 255, a: 60 };
const cx = W / 2;
const cy = H / 2;
const radius = 180;

const preview = Buffer.alloc(W * H * 4);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const dx = x - cx + 0.5;
    const dy = y - cy + 0.5;
    const dist = Math.sqrt(dx * dx + dy * dy);
    let c;
    if (dist <= radius - 1.5) {
      const i = (y * W + x) * 4;
      c = { r: rgba[i], g: rgba[i + 1], b: rgba[i + 2], a: rgba[i + 3] };
    } else if (dist <= radius + 1.5) {
      c = RING;
    } else {
      c = PREVIEW_BG;
    }
    setPixel(preview, x, y, c);
  }
}

const rawPreview = Buffer.alloc(H * (1 + W * 4));
for (let y = 0; y < H; y++) {
  const rowStart = y * (1 + W * 4);
  rawPreview[rowStart] = 0;
  preview.copy(rawPreview, rowStart + 1, y * W * 4, (y + 1) * W * 4);
}

const idatPreview = zlib.deflateSync(rawPreview, { level: 9 });
const pngPreview = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk("IHDR", ihdr),
  chunk("IDAT", idatPreview),
  chunk("IEND", Buffer.alloc(0)),
]);

fs.writeFileSync(OUT_PREVIEW, pngPreview);
console.log("Wrote", OUT_PREVIEW);
