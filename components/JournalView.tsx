"use client";

import { useMemo, useState } from "react";
import type { DecryptedDotEntry, MoodValue } from "@/lib/types";

const MOOD_EMOJI: Record<MoodValue, string> = {
  1: "😞",
  2: "😐",
  3: "🙂",
  4: "😄",
  5: "🤩",
};

interface JournalViewProps {
  entries: DecryptedDotEntry[];
}

export default function JournalView({ entries }: JournalViewProps) {
  const [moodFilter, setMoodFilter] = useState<MoodValue | "all">("all");
  const [tagFilter, setTagFilter] = useState<string>("all");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const e of entries) {
      for (const t of e.tags ?? []) tags.add(t);
    }
    return Array.from(tags).sort();
  }, [entries]);

  const filtered = useMemo(() => {
    return [...entries]
      .filter((e) => {
        if (moodFilter !== "all" && e.mood_value !== moodFilter) return false;
        if (tagFilter !== "all" && !(e.tags ?? []).includes(tagFilter)) return false;
        return true;
      })
      .sort((a, b) => b.entry_date.localeCompare(a.entry_date));
  }, [entries, moodFilter, tagFilter]);

  if (entries.length === 0) {
    return (
      <p className="text-sm text-white/50">
        Brak wpisów. Kliknij dot na siatce, aby dodać pierwszy wpis.
      </p>
    );
  }

  return (
    <section>
      <div className="mb-4 flex flex-wrap gap-3">
        <label className="flex items-center gap-2 text-sm">
          Nastrój
          <select
            value={moodFilter}
            onChange={(e) =>
              setMoodFilter(
                e.target.value === "all" ? "all" : (Number(e.target.value) as MoodValue)
              )
            }
            className="rounded-md border border-white/20 bg-transparent px-2 py-1"
          >
            <option value="all">Wszystkie</option>
            {([1, 2, 3, 4, 5] as MoodValue[]).map((v) => (
              <option key={v} value={v}>
                {MOOD_EMOJI[v]} {v}
              </option>
            ))}
          </select>
        </label>
        {allTags.length > 0 && (
          <label className="flex items-center gap-2 text-sm">
            Tag
            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="rounded-md border border-white/20 bg-transparent px-2 py-1"
            >
              <option value="all">Wszystkie</option>
              {allTags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <ul className="space-y-3">
        {filtered.map((entry) => (
          <li
            key={entry.id}
            className="rounded-lg border border-white/10 p-4 text-sm"
          >
            <div className="mb-1 flex items-center gap-2">
              <span className="font-medium">{entry.entry_date}</span>
              {entry.mood_value && (
                <span title={`Nastrój: ${entry.mood_value}/5`}>
                  {MOOD_EMOJI[entry.mood_value]}
                </span>
              )}
              {(entry.tags ?? []).map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-white/10 px-2 py-0.5 text-xs text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
            {entry.note && (
              <p className="text-white/70 whitespace-pre-wrap">{entry.note}</p>
            )}
          </li>
        ))}
      </ul>
      {filtered.length === 0 && (
        <p className="text-sm text-white/50">Brak wpisów dla wybranych filtrów.</p>
      )}
    </section>
  );
}
