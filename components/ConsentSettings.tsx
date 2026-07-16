"use client";

import { useState, useTransition } from "react";
import { grantHealthConsent, withdrawHealthConsent } from "@/app/dashboard/actions";

interface ConsentSettingsProps {
  consent: {
    granted_at: string | null;
    withdrawn_at: string | null;
    policy_version: string;
  } | null;
}

export default function ConsentSettings({ consent }: ConsentSettingsProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const isActive = Boolean(consent?.granted_at && !consent?.withdrawn_at);

  function handleWithdraw() {
    if (
      !window.confirm(
        "Wycofanie zgody usunie WSZYSTKIE Twoje wpisy nastroju i notatki. Ta operacja jest nieodwracalna. Kontynuować?"
      )
    ) {
      return;
    }
    setError(null);
    startTransition(async () => {
      try {
        await withdrawHealthConsent();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Wystąpił błąd.");
      }
    });
  }

  function handleGrant() {
    setError(null);
    startTransition(async () => {
      try {
        await grantHealthConsent();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Wystąpił błąd.");
      }
    });
  }

  return (
    <section className="mb-8 rounded-lg border border-white/10 p-5">
      <h2 className="mb-2 text-lg font-medium">
        Zgoda na dane o nastroju (art. 9 RODO)
      </h2>
      <p className="mb-3 text-sm text-white/70">
        Status:{" "}
        {isActive ? (
          <span className="text-emerald-400">aktywna</span>
        ) : (
          <span className="text-white/50">nieudzielona / wycofana</span>
        )}
        {consent?.granted_at && (
          <span className="ml-2 text-white/40">
            (udzielona: {consent.granted_at.slice(0, 16).replace("T", " ")}
            {consent.policy_version ? `, wersja polityki: ${consent.policy_version}` : ""})
          </span>
        )}
      </p>
      {error && <p className="mb-3 text-sm text-red-400">{error}</p>}
      {isActive ? (
        <button
          type="button"
          onClick={handleWithdraw}
          disabled={isPending}
          className="rounded-md border border-red-400/40 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 disabled:opacity-50"
        >
          Wycofaj zgodę i usuń wpisy nastroju
        </button>
      ) : (
        <button
          type="button"
          onClick={handleGrant}
          disabled={isPending}
          className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-black disabled:opacity-50"
        >
          Udziel zgody
        </button>
      )}
    </section>
  );
}
