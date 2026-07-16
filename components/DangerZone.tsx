"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DangerZone() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    const confirmed = window.confirm(
      "To trwale usunie Twoje konto i WSZYSTKIE dane (wpisy, notatki, zgody). Ta operacja jest nieodwracalna. Kontynuować?"
    );
    if (!confirmed) return;

    setLoading(true);
    setError(null);

    const res = await fetch("/api/account/delete", { method: "POST" });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Nie udało się usunąć konta.");
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <section className="rounded-lg border border-red-400/30 p-5">
      <h2 className="mb-2 text-lg font-medium text-red-400">Usuń konto</h2>
      <p className="mb-3 text-sm text-white/70">
        Trwałe i nieodwracalne usunięcie konta oraz wszystkich powiązanych
        danych (art. 17 RODO — prawo do usunięcia).
      </p>
      {error && <p className="mb-3 text-sm text-red-400">{error}</p>}
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-black disabled:opacity-50"
      >
        {loading ? "Usuwanie…" : "Usuń konto na zawsze"}
      </button>
    </section>
  );
}
