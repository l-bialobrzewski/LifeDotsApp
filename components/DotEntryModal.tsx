"use client";

import { useState, useTransition } from "react";
import type { WeekDot } from "@/lib/lifeGrid";
import { upsertDotEntry, deleteDotEntry } from "@/app/dashboard/actions";

const MOODS: { value: number; emoji: string; label: string }[] = [
  { value: 1, emoji: "😞", label: "Bardzo źle" },
  { value: 2, emoji: "😐", label: "Słabo" },
  { value: 3, emoji: "🙂", label: "Neutralnie" },
  { value: 4, emoji: "😄", label: "Dobrze" },
  { value: 5, emoji: "🤩", label: "Świetnie" },
];

interface DotEntryModalProps {
  week: WeekDot;
  onClose: () => void;
}

export default function DotEntryModal({ week, onClose }: DotEntryModalProps) {
  const [mood, setMood] = useState<number | null>(week.entry?.mood_value ?? null);
  const [note, setNote] = useState(week.entry?.note ?? "");
  const [tags, setTags] = useState(week.entry?.tags?.join(", ") ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    setError(null);
    const formData = new FormData();
    formData.set("entry_date", week.weekStartDate);
    if (mood) formData.set("mood_value", String(mood));
    formData.set("note", note);
    formData.set("tags", tags);

    startTransition(async () => {
      try {
        await upsertDotEntry(formData);
        onClose();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Wystąpił błąd zapisu.");
      }
    });
  }

  function handleDelete() {
    if (!week.entry) return;
    startTransition(async () => {
      try {
        await deleteDotEntry(week.entry!.id);
        onClose();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Wystąpił błąd usuwania.");
      }
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl border border-white/10 bg-[#0b1020] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-1 text-lg font-semibold">{week.weekStartDate}</h2>
        <p className="mb-4 text-sm text-white/60">Tydzień {week.index + 1}</p>

        <div className="mb-4 flex justify-between">
          {MOODS.map((m) => (
            <button
              key={m.value}
              type="button"
              title={m.label}
              onClick={() => setMood(m.value)}
              className={[
                "rounded-full p-2 text-2xl",
                mood === m.value ? "bg-white/20" : "hover:bg-white/10",
              ].join(" ")}
            >
              {m.emoji}
            </button>
          ))}
        </div>

        <label className="mb-3 flex flex-col gap-1 text-sm">
          Notatka (opcjonalnie, max 500 znaków, szyfrowana)
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 500))}
            rows={3}
            className="rounded-md border border-white/20 bg-transparent px-3 py-2"
          />
        </label>

        <label className="mb-4 flex flex-col gap-1 text-sm">
          Tagi (max 3, oddzielone przecinkiem)
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="praca, rodzina, zdrowie"
            className="rounded-md border border-white/20 bg-transparent px-3 py-2"
          />
        </label>

        {error && <p className="mb-3 text-sm text-red-400">{error}</p>}

        <div className="flex justify-between">
          {week.entry ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="rounded-md px-3 py-2 text-sm text-red-400 hover:text-red-300"
            >
              Usuń wpis
            </button>
          ) : (
            <span />
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-3 py-2 text-sm text-white/60 hover:text-white"
            >
              Zamknij
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isPending}
              className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-black disabled:opacity-50"
            >
              {isPending ? "Zapisywanie…" : "Zapisz"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
