"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { grantHealthConsent } from "@/app/dashboard/actions";

/**
 * Odrebny, wyrazny ekran zgody na przetwarzanie danych o nastroju/zdrowiu
 * (art. 9(2)(a) RODO). Celowo NIE jest to laczone z ogolna polityka
 * prywatnosci lub regulaminem — patrz docs/dpia.md sekcja 2 i 4.
 */
export default function ConsentGate() {
  const [checked, setChecked] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (dismissed) return null;

  function handleAccept() {
    if (!checked) return;
    startTransition(async () => {
      try {
        await grantHealthConsent();
        setDismissed(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Wystąpił błąd.");
      }
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
      <div className="max-w-md rounded-xl border border-white/10 bg-[#0b1020] p-6 shadow-xl">
        <h2 className="mb-3 text-lg font-semibold">
          Zgoda na przetwarzanie danych o nastroju i samopoczuciu
        </h2>
        <p className="mb-4 text-sm text-white/80">
          Aby oznaczać doty swoim nastrojem i dodawać notatki, potrzebujemy
          Twojej <strong>wyraźnej, odrębnej zgody</strong> na przetwarzanie
          danych szczególnej kategorii dotyczących zdrowia/samopoczucia
          (art. 9 RODO). Te dane są szyfrowane i widoczne wyłącznie dla Ciebie.
          Zgodę możesz wycofać w każdej chwili w ustawieniach — spowoduje to
          usunięcie zapisanych wpisów nastroju.
        </p>
        <label className="mb-4 flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mt-1"
          />
          <span>
            Wyrażam wyraźną zgodę na przetwarzanie moich danych o nastroju i
            samopoczuciu w celu świadczenia funkcji LifeDots. Przeczytałem/am{" "}
            <Link href="/privacy" className="underline">
              politykę prywatności
            </Link>
            .
          </span>
        </label>
        {error && <p className="mb-3 text-sm text-red-400">{error}</p>}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="rounded-md px-3 py-2 text-sm text-white/60 hover:text-white"
          >
            Może później (bez oznaczania nastroju)
          </button>
          <button
            type="button"
            disabled={!checked || isPending}
            onClick={handleAccept}
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-black disabled:opacity-50"
          >
            {isPending ? "Zapisywanie…" : "Wyrażam zgodę"}
          </button>
        </div>
      </div>
    </div>
  );
}
