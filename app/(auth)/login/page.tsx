"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // #region agent log
  fetch("http://127.0.0.1:7564/ingest/49210152-1b7f-468e-8ddd-e77a52c26829", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "0cb82c",
    },
    body: JSON.stringify({
      sessionId: "0cb82c",
      runId: "pre-fix",
      hypothesisId: "H2",
      location: "app/(auth)/login/page.tsx:render",
      message: "LoginPage render (no createClient at top-level)",
      data: {
        hasUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
        hasKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
        phase: typeof window === "undefined" ? "server" : "browser",
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError("Nieprawidłowy e-mail lub hasło.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <h1 className="mb-6 text-2xl font-semibold">Zaloguj się do LifeDots</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          E-mail
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-white/20 bg-transparent px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Hasło
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-white/20 bg-transparent px-3 py-2"
          />
        </label>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-emerald-500 px-4 py-2 font-medium text-black disabled:opacity-50"
        >
          {loading ? "Logowanie…" : "Zaloguj się"}
        </button>
      </form>
      <p className="mt-4 text-sm text-white/70">
        Nie masz konta?{" "}
        <Link href="/signup" className="underline">
          Zarejestruj się
        </Link>
      </p>
    </main>
  );
}
