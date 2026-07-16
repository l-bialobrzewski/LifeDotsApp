"use client";

import { useMemo, useState } from "react";
import { buildLifeGrid, type WeekDot } from "@/lib/lifeGrid";
import type { DecryptedDotEntry } from "@/lib/types";
import DotCell from "./DotCell";
import DotEntryModal from "./DotEntryModal";
import ShareGridButton from "./ShareGridButton";

const COLS = 52;

interface LifeGridProps {
  birthDate: string;
  lifeExpectancyYears: number;
  entries: DecryptedDotEntry[];
  consentActive: boolean;
}

export default function LifeGrid({
  birthDate,
  lifeExpectancyYears,
  entries,
  consentActive,
}: LifeGridProps) {
  const weeks = useMemo(
    () => buildLifeGrid(birthDate, lifeExpectancyYears, entries),
    [birthDate, lifeExpectancyYears, entries]
  );

  const [selectedWeek, setSelectedWeek] = useState<WeekDot | null>(null);

  const rows = Math.ceil(weeks.length / COLS);
  const currentWeekIndex = weeks.findIndex((w) => w.status === "current");
  const yearsLived = Math.floor((currentWeekIndex >= 0 ? currentWeekIndex : 0) / 52);

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-white/70">
          Przeżyłeś/aś ok. <strong>{yearsLived}</strong> lat z {lifeExpectancyYears}{" "}
          zaplanowanych ({weeks.length} tygodni w siatce).
        </p>
        <ShareGridButton weeks={weeks} />
      </div>

      <div
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      >
        {weeks.map((week) => (
          <DotCell
            key={week.index}
            week={week}
            disabled={!consentActive}
            onClick={() => setSelectedWeek(week)}
          />
        ))}
      </div>

      <p className="mt-3 text-xs text-white/40">
        {rows} wierszy × {COLS} tygodni. Kliknij dot, aby oznaczyć nastrój dnia.
        {!consentActive && " Wymagana zgoda na dane o nastroju, aby dodawać wpisy."}
      </p>

      {selectedWeek && (
        <DotEntryModal week={selectedWeek} onClose={() => setSelectedWeek(null)} />
      )}
    </section>
  );
}
