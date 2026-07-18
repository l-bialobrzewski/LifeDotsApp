import Link from "next/link";

export const metadata = { title: "Regulamin — LifeDots" };

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-sm leading-relaxed text-white/80">
      <Link href="/" className="mb-8 inline-block text-white/50 hover:text-white">
        ← Wróć
      </Link>
      <h1 className="mb-6 text-2xl font-semibold text-white">
        Regulamin świadczenia usługi LifeDots
      </h1>
      <p className="mb-4">
        Pełna treść regulaminu (wersja robocza do zatwierdzenia przez prawnika)
        znajduje się w repozytorium projektu:{" "}
        <code className="rounded bg-white/10 px-1">docs/legal/terms-of-service.md</code>
        .
      </p>
      <h2 className="mb-2 mt-6 text-lg font-medium text-white">Usługodawca</h2>
      <p className="mb-4">
        Łukasz Białobrzewski, ul. Kozłowskiego „Lasa” 1/13, 07-410 Ostrołęka,
        e-mail:{" "}
        <a
          href="mailto:lifedots.app@gmail.com"
          className="underline text-white"
        >
          lifedots.app@gmail.com
        </a>
        .
      </p>
      <h2 className="mb-2 mt-6 text-lg font-medium text-white">Najważniejsze punkty</h2>
      <ul className="ml-5 list-disc space-y-2">
        <li>Usługa dostępna dla osób, które ukończyły 18 lat.</li>
        <li>
          LifeDots <strong>nie jest</strong> aplikacją medyczną i nie zastępuje
          porady lekarskiej/psychologicznej.
        </li>
        <li>Podstawowa siatka życia jest darmowa; funkcje Pro opisane są w specyfikacji produktu.</li>
        <li>Możesz usunąć konto w każdej chwili — trwale i nieodwracalnie.</li>
      </ul>
    </main>
  );
}
