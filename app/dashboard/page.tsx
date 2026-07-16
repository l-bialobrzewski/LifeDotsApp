import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { decryptNote } from "@/lib/encryption";
import type { DecryptedDotEntry, DotEntry } from "@/lib/types";
import OnboardingForm from "@/components/OnboardingForm";
import LifeGrid from "@/components/LifeGrid";
import JournalView from "@/components/JournalView";
import ConsentGate from "@/components/ConsentGate";
import Navbar from "@/components/Navbar";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/login");

  const [{ data: profile }, { data: rawEntries }, { data: consent }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("*")
        .eq("id", userData.user.id)
        .single(),
      supabase
        .from("dot_entries")
        .select("*")
        .eq("user_id", userData.user.id),
      supabase
        .from("consents")
        .select("granted_at, withdrawn_at")
        .eq("user_id", userData.user.id)
        .eq("consent_type", "health_mood_data")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

  if (!profile) redirect("/login");

  if (!profile.birth_date) {
    return (
      <main className="mx-auto max-w-md px-6 py-16">
        <Navbar />
        <h1 className="mb-2 mt-8 text-2xl font-semibold">
          Zbudujmy Twoją siatkę życia
        </h1>
        <p className="mb-6 text-white/70">
          Podaj datę urodzenia i oczekiwaną długość życia — na tej podstawie
          wygenerujemy Twoją siatkę tygodni.
        </p>
        <OnboardingForm />
      </main>
    );
  }

  const hasActiveConsent = Boolean(consent?.granted_at && !consent?.withdrawn_at);

  const entries: DecryptedDotEntry[] = ((rawEntries as DotEntry[]) ?? []).map(
    (entry) => {
      let note: string | null = null;
      if (entry.note_encrypted) {
        try {
          note = decryptNote(entry.note_encrypted);
        } catch {
          note = null; // notatka uszkodzona/nie do odszyfrowania — nie blokujemy widoku
        }
      }
      const { note_encrypted: _note, ...rest } = entry;
      void _note;
      return { ...rest, note };
    }
  );

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Navbar />
      {!hasActiveConsent && <ConsentGate />}
      <div className="mt-8">
        <LifeGrid
          birthDate={profile.birth_date}
          lifeExpectancyYears={profile.life_expectancy_years}
          entries={entries}
          consentActive={hasActiveConsent}
        />
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">Dziennik</h2>
        <JournalView entries={entries} />
      </section>
    </main>
  );
}
