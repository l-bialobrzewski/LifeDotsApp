import type { DecryptedDotEntry } from "./types";

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

export interface WeekDot {
  index: number; // tydzien zycia, od 0
  weekStartDate: string; // ISO date
  status: "past" | "current" | "future";
  entry: DecryptedDotEntry | null;
}

/**
 * Generuje siatke tygodni od daty urodzenia do life_expectancy_years.
 * Kazdy tydzien jest reprezentowany przez jeden dot; wpis (DecryptedDotEntry)
 * jest dopasowywany po dacie nalezacej do danego tygodnia (jesli istnieje).
 */
export function buildLifeGrid(
  birthDate: string,
  lifeExpectancyYears: number,
  entries: DecryptedDotEntry[]
): WeekDot[] {
  const birth = new Date(birthDate + "T00:00:00Z");
  const now = new Date();
  const todayUtc = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );
  const totalWeeks = Math.ceil((lifeExpectancyYears * 365.25) / 7);

  const entriesByWeek = new Map<number, DecryptedDotEntry>();
  for (const entry of entries) {
    const entryDate = new Date(entry.entry_date + "T00:00:00Z");
    const weekIndex = Math.floor(
      (entryDate.getTime() - birth.getTime()) / MS_PER_WEEK
    );
    if (weekIndex >= 0) entriesByWeek.set(weekIndex, entry);
  }

  const currentWeekIndex = Math.floor(
    (todayUtc - birth.getTime()) / MS_PER_WEEK
  );

  const weeks: WeekDot[] = [];
  for (let i = 0; i < totalWeeks; i++) {
    const weekStart = new Date(birth.getTime() + i * MS_PER_WEEK);
    const status: WeekDot["status"] =
      i < currentWeekIndex ? "past" : i === currentWeekIndex ? "current" : "future";

    weeks.push({
      index: i,
      weekStartDate: weekStart.toISOString().slice(0, 10),
      status,
      entry: entriesByWeek.get(i) ?? null,
    });
  }

  return weeks;
}

export function todayIso(): string {
  const now = new Date();
  return [
    now.getUTCFullYear(),
    String(now.getUTCMonth() + 1).padStart(2, "0"),
    String(now.getUTCDate()).padStart(2, "0"),
  ].join("-");
}
