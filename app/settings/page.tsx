import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import ConsentSettings from "@/components/ConsentSettings";
import DangerZone from "@/components/DangerZone";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/login");

  const { data: consent } = await supabase
    .from("consents")
    .select("granted_at, withdrawn_at, policy_version")
    .eq("user_id", userData.user.id)
    .eq("consent_type", "health_mood_data")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <Navbar />

      <h1 className="mb-6 mt-8 text-2xl font-semibold">Ustawienia i dane</h1>

      <section className="mb-8 rounded-lg border border-white/10 p-5">
        <h2 className="mb-2 text-lg font-medium">Konto</h2>
        <p className="text-sm text-white/70">{userData.user.email}</p>
      </section>

      <ConsentSettings consent={consent ?? null} />

      <section className="mb-8 rounded-lg border border-white/10 p-5">
        <h2 className="mb-2 text-lg font-medium">Twoje dane</h2>
        <p className="mb-3 text-sm text-white/70">
          Zgodnie z RODO masz prawo do wglądu w swoje dane i ich przeniesienia
          (art. 15, 20). Pobierz kompletny eksport (profil, wpisy, zgody) w
          formacie JSON.
        </p>
        <a
          href="/api/export"
          className="inline-block rounded-md border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
        >
          Eksportuj moje dane (JSON)
        </a>
      </section>

      <DangerZone />
    </main>
  );
}
