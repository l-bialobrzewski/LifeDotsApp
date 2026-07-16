import Link from "next/link";

export const metadata = { title: "Polityka prywatności — LifeDots" };

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-sm leading-relaxed text-white/80">
      <Link href="/" className="mb-8 inline-block text-white/50 hover:text-white">
        ← Wróć
      </Link>
      <h1 className="mb-6 text-2xl font-semibold text-white">
        Polityka prywatności LifeDots
      </h1>
      <p className="mb-4">
        Pełna, aktualna treść polityki (wersja roboczą do zatwierdzenia przez
        prawnika) znajduje się w repozytorium projektu:{" "}
        <code className="rounded bg-white/10 px-1">docs/legal/privacy-policy.md</code>
        .
      </p>
      <h2 className="mb-2 mt-6 text-lg font-medium text-white">Najważniejsze punkty</h2>
      <ul className="ml-5 list-disc space-y-2">
        <li>
          Dane o nastroju i notatki traktujemy jako dane szczególnej kategorii
          (art. 9 RODO) i przetwarzamy je wyłącznie na podstawie Twojej{" "}
          <strong>wyraźnej, odrębnej zgody</strong>.
        </li>
        <li>Notatki są szyfrowane (AES-256-GCM) zanim trafią do bazy danych.</li>
        <li>
          Możesz w każdej chwili wycofać zgodę, wyeksportować swoje dane albo
          trwale usunąć konto — samoobsługowo, w Ustawieniach.
        </li>
        <li>
          Dane przechowujemy na serwerach w UE (Frankfurt). Korzystamy z
          podprocesorów (Supabase, Vercel, Sentry) na podstawie umów DPA i
          standardowych klauzul umownych.
        </li>
        <li>Nie sprzedajemy danych i nie profilujemy Cię reklamowo na podstawie nastroju.</li>
      </ul>
    </main>
  );
}
