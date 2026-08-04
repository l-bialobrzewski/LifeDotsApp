import Link from "next/link";

import UtmCapture from "@/components/UtmCapture";

import WaitlistForm from "@/components/WaitlistForm";

import { isWaitlistMode } from "@/lib/marketing/config";

export default function LandingPage() {
  const waitlist = isWaitlistMode();

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <UtmCapture />

      <header className="mb-16 text-center">
        <p className="mb-3 text-sm uppercase tracking-widest text-white/40">
          LifeDots
        </p>
        <h1 className="mb-4 text-4xl font-semibold leading-tight sm:text-5xl">
          Zobacz swoje życie jako doty.
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-lg text-white/70">
          Każdy tydzień Twojego życia to jeden dot. Oznacz nastrój, zapisz
          chwilę, zobacz swój czas z dystansu — i żyj bardziej świadomie.
        </p>

        {waitlist ? (
          <div className="mb-4">
            <p className="mb-6 text-sm text-white/50">
              Wczesna beta — zapisz się na waitlistę. Damy znać, gdy będzie
              gotowa.
            </p>
            <WaitlistForm />
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-md bg-emerald-500 px-6 py-3 font-medium text-black hover:bg-emerald-400"
            >
              Zbuduj swoją siatkę — bezpłatnie
            </Link>
            <Link
              href="/login"
              className="rounded-md border border-white/20 px-6 py-3 font-medium hover:bg-white/10"
            >
              Zaloguj się
            </Link>
          </div>
        )}
      </header>

      <section className="mb-16 grid gap-8 sm:grid-cols-3">
        <Feature
          title="Refleksja, nie dane"
          description="Twoje notatki są szyfrowane. Nie sprzedajemy danych, nie profilujemy Cię reklamowo. Prywatność to nasz fundament, nie dodatek."
        />
        <Feature
          title="Cała historia w jednym widoku"
          description="Tygodnie, lata, dekady — cała Twoja przeszłość i przyszłość na jednej siatce. Świadomość przemijania czasu jako motywacja do działania."
        />
        <Feature
          title="Udostępnij swoją siatkę"
          description="Wygeneruj obrazek swojej siatki (bez treści notatek) i pokaż go znajomym — bez ujawniania niczego wrażliwego."
        />
      </section>

      <section className="mb-16 rounded-xl border border-white/10 p-6 text-sm text-white/70">
        <h2 className="mb-2 text-base font-medium text-white">
          Traktujemy Twoje dane poważnie
        </h2>
        <p>
          Wpisy o nastroju to dane szczególnej kategorii w rozumieniu RODO —
          dlatego wymagamy odrębnej, wyraźnej zgody na ich przetwarzanie,
          szyfrujemy notatki i dajemy Ci pełną kontrolę: eksport i usunięcie
          danych jednym kliknięciem. Zobacz{" "}
          <Link href="/privacy" className="underline">
            politykę prywatności
          </Link>{" "}
          i{" "}
          <Link href="/terms" className="underline">
            regulamin
          </Link>
          .
        </p>
      </section>

      <footer className="text-center text-xs text-white/40">
        © {new Date().getFullYear()} LifeDots ·{" "}
        <Link href="/privacy" className="underline">
          Prywatność
        </Link>{" "}
        ·{" "}
        <Link href="/terms" className="underline">
          Regulamin
        </Link>
      </footer>
    </main>
  );
}

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h3 className="mb-2 font-medium">{title}</h3>
      <p className="text-sm text-white/60">{description}</p>
    </div>
  );
}
