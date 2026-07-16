"use client";

import { useTransition } from "react";
import { setBirthDate } from "@/app/dashboard/actions";
import { todayIso } from "@/lib/lifeGrid";

export default function OnboardingForm() {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await setBirthDate(formData);
    });
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Data urodzenia
        <input
          type="date"
          name="birth_date"
          required
          max={todayIso()}
          className="rounded-md border border-white/20 bg-transparent px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Oczekiwana długość życia (lata)
        <input
          type="number"
          name="life_expectancy_years"
          defaultValue={90}
          min={1}
          max={130}
          className="rounded-md border border-white/20 bg-transparent px-3 py-2"
        />
      </label>
      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-emerald-500 px-4 py-2 font-medium text-black disabled:opacity-50"
      >
        {isPending ? "Zapisywanie…" : "Wygeneruj siatkę"}
      </button>
    </form>
  );
}
