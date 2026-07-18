"use client";

import { useState } from "react";
import Link from "next/link";
import { readStoredUtm } from "@/components/UtmCapture";
import { WTP_SURVEY_URL } from "@/lib/marketing/config";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      setError("Zaznacz zgodę na powiadomienie e-mail o starcie bety.");
      return;
    }

    setLoading(true);
    setError(null);

    const utm = readStoredUtm();

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, consent, ...utm }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        redirect?: string;
      };
      if (data.redirect) {
        window.location.href = data.redirect;
        return;
      }
      setError(data.error ?? "Nie udało się zapisać. Spróbuj ponownie.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-md text-center">
        <h2 className="mb-2 text-xl font-semibold">Jesteś na liście!</h2>
        <p className="mb-4 text-white/70">
          Damy znać, gdy beta będzie gotowa. Sprawdź skrzynkę — może trafić do
          spamu.
        </p>
        {WTP_SURVEY_URL ? (
          <p className="text-sm text-white/60">
            Opcjonalnie:{" "}
            <a
              href={WTP_SURVEY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              krótka ankieta (2 min)
            </a>{" "}
            — pomoże nam ustalić priorytety Pro.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-md flex-col gap-4"
    >
      <label className="flex flex-col gap-1 text-sm text-left">
        E-mail
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="twoj@email.pl"
          className="rounded-md border border-white/20 bg-transparent px-3 py-2"
        />
      </label>

      <label className="flex items-start gap-2 text-left text-xs text-white/70">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        <span>
          Wyrażam zgodę na otrzymywanie e-maila o starcie bety LifeDots.
          Administratorem danych jest Łukasz Białobrzewski (projekt LifeDots),
          ul. Kozłowskiego „Lasa” 1/13, 07-410 Ostrołęka; kontakt:
          lifedots.app@gmail.com. Podstawa: zgoda (art. 6 ust. 1 lit. a RODO).
          Mogę wycofać zgodę w dowolnym momencie.{" "}
          <Link href="/privacy" className="underline">
            Polityka prywatności
          </Link>
          .
        </span>
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-emerald-500 px-6 py-3 font-medium text-black disabled:opacity-50"
      >
        {loading ? "Zapisuję…" : "Dołącz do waitlisty — bezpłatnie"}
      </button>
    </form>
  );
}
