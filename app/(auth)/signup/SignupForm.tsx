"use client";



import { useState } from "react";

import Link from "next/link";

import { createClient } from "@/lib/supabase/client";



export default function SignupForm() {

  const supabase = createClient();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);



  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    setLoading(true);

    setError(null);



    const { error: signUpError } = await supabase.auth.signUp({

      email,

      password,

      options: {

        emailRedirectTo: `${window.location.origin}/auth/callback`,

      },

    });



    setLoading(false);



    if (signUpError) {

      setError(signUpError.message);

      return;

    }



    setSubmitted(true);

  }



  if (submitted) {

    return (

      <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6 text-center">

        <h1 className="mb-2 text-2xl font-semibold">Sprawdź swoją skrzynkę</h1>

        <p className="text-white/70">

          Wysłaliśmy link potwierdzający na adres {email}. Kliknij go, aby

          aktywować konto.

        </p>

      </main>

    );

  }



  return (

    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">

      <h1 className="mb-2 text-2xl font-semibold">Utwórz konto LifeDots</h1>

      <p className="mb-6 text-sm text-white/70">

        Po rejestracji poprosimy Cię o odrębną, wyraźną zgodę na przetwarzanie

        danych o nastroju — zgodnie z art. 9 RODO. Zobacz{" "}

        <Link href="/privacy" className="underline">

          politykę prywatności

        </Link>

        .

      </p>

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

          Hasło (min. 8 znaków)

          <input

            type="password"

            required

            minLength={8}

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

          {loading ? "Tworzenie konta…" : "Zarejestruj się"}

        </button>

      </form>

      <p className="mt-4 text-sm text-white/70">

        Masz już konto?{" "}

        <Link href="/login" className="underline">

          Zaloguj się

        </Link>

      </p>

    </main>

  );

}

