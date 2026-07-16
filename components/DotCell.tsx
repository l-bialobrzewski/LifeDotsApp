"use client";

import type { WeekDot } from "@/lib/lifeGrid";

const MOOD_COLOR: Record<number, string> = {
  1: "bg-mood-1",
  2: "bg-mood-2",
  3: "bg-mood-3",
  4: "bg-mood-4",
  5: "bg-mood-5",
};

interface DotCellProps {
  week: WeekDot;
  onClick: () => void;
  disabled: boolean;
}

export default function DotCell({ week, onClick, disabled }: DotCellProps) {
  const moodClass = week.entry?.mood_value
    ? MOOD_COLOR[week.entry.mood_value]
    : week.status === "future"
    ? "bg-white/5"
    : "bg-white/15";

  const isClickable = !disabled && week.status !== "future";

  return (
    <button
      type="button"
      onClick={isClickable ? onClick : undefined}
      disabled={!isClickable}
      title={week.weekStartDate}
      className={[
        "h-2.5 w-2.5 rounded-[2px] transition-transform",
        moodClass,
        week.status === "current" ? "ring-2 ring-white" : "",
        isClickable ? "hover:scale-125 cursor-pointer" : "cursor-default",
      ].join(" ")}
    />
  );
}
