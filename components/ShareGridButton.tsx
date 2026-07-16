"use client";

import { useRef } from "react";
import type { WeekDot } from "@/lib/lifeGrid";

const MOOD_HEX: Record<number, string> = {
  1: "#94a3b8",
  2: "#60a5fa",
  3: "#fbbf24",
  4: "#fb923c",
  5: "#34d399",
};

const COLS = 52; // 1 rok = 52 tygodnie per wiersz

interface ShareGridButtonProps {
  weeks: WeekDot[];
}

/**
 * Generuje obrazek PNG samej siatki (tylko kolory dotow), BEZ notatek i tagow —
 * patrz docs/spec.md sekcja "Udostepnianie" i docs/dpia.md (minimalizacja danych
 * w funkcjach spolecznych/wiralowych).
 */
export default function ShareGridButton({ weeks }: ShareGridButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  function handleShare() {
    const dotSize = 8;
    const gap = 3;
    const rows = Math.ceil(weeks.length / COLS);

    const canvas = canvasRef.current ?? document.createElement("canvas");
    canvasRef.current = canvas;
    canvas.width = COLS * (dotSize + gap);
    canvas.height = rows * (dotSize + gap) + 40;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#0b1020";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    weeks.forEach((week, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const x = col * (dotSize + gap);
      const y = row * (dotSize + gap);

      ctx.fillStyle = week.entry?.mood_value
        ? MOOD_HEX[week.entry.mood_value] ?? "#ffffff33"
        : week.status === "future"
        ? "#ffffff10"
        : "#ffffff26";
      ctx.fillRect(x, y, dotSize, dotSize);
    });

    ctx.fillStyle = "#e8ecf7";
    ctx.font = "16px sans-serif";
    ctx.fillText("Moje życie w dotach — lifedots.app", 4, canvas.height - 14);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "lifedots-siatka.png";
      link.click();
      URL.revokeObjectURL(url);
    });
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="rounded-md border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
    >
      Udostępnij siatkę (obrazek)
    </button>
  );
}
