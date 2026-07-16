"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { encryptNote } from "@/lib/encryption";

const HEALTH_CONSENT_TYPE = "health_mood_data";
const CURRENT_POLICY_VERSION =
  process.env.NEXT_PUBLIC_PRIVACY_POLICY_VERSION ?? "1.0.0";

async function requireUserId() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error("Nie jesteś zalogowany.");
  return data.user.id;
}

/** Sprawdza, czy uzytkownik ma aktywna (nie wycofana) zgode na dane o nastroju. */
async function hasActiveHealthConsent(userId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("consents")
    .select("granted_at, withdrawn_at")
    .eq("user_id", userId)
    .eq("consent_type", HEALTH_CONSENT_TYPE)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return Boolean(data?.granted_at && !data?.withdrawn_at);
}

export async function grantHealthConsent() {
  const userId = await requireUserId();
  const supabase = await createClient();

  const { error } = await supabase.from("consents").insert({
    user_id: userId,
    consent_type: HEALTH_CONSENT_TYPE,
    policy_version: CURRENT_POLICY_VERSION,
    granted_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
}

/**
 * Wycofanie zgody = obowiazek usuniecia danych o nastroju (art. 17(1)(b) RODO).
 * Usuwamy note/mood_value ze wszystkich wpisow, zachowujac sam wpis daty jesli
 * to wymagane funkcjonalnie — w MVP usuwamy caly wpis dla prostoty i pewnosci.
 */
export async function withdrawHealthConsent() {
  const userId = await requireUserId();
  const supabase = await createClient();

  const { error: deleteEntriesError } = await supabase
    .from("dot_entries")
    .delete()
    .eq("user_id", userId);
  if (deleteEntriesError) throw new Error(deleteEntriesError.message);

  const { error: consentError } = await supabase
    .from("consents")
    .update({ withdrawn_at: new Date().toISOString() })
    .eq("user_id", userId)
    .eq("consent_type", HEALTH_CONSENT_TYPE)
    .is("withdrawn_at", null);
  if (consentError) throw new Error(consentError.message);

  revalidatePath("/dashboard");
  revalidatePath("/settings");
}

export async function setBirthDate(formData: FormData) {
  const userId = await requireUserId();
  const birthDate = String(formData.get("birth_date") ?? "");
  const lifeExpectancy = Number(formData.get("life_expectancy_years") ?? 90);

  if (!birthDate) throw new Error("Data urodzenia jest wymagana.");

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({
      birth_date: birthDate,
      life_expectancy_years: lifeExpectancy,
    })
    .eq("id", userId);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
}

export async function upsertDotEntry(formData: FormData) {
  const userId = await requireUserId();

  const consentOk = await hasActiveHealthConsent(userId);
  if (!consentOk) {
    throw new Error(
      "Wymagana jest zgoda na przetwarzanie danych o nastroju przed dodaniem wpisu."
    );
  }

  const entryDate = String(formData.get("entry_date") ?? "");
  const moodRaw = formData.get("mood_value");
  const moodValue = moodRaw ? Number(moodRaw) : null;
  const noteRaw = String(formData.get("note") ?? "").slice(0, 500);
  const tagsRaw = String(formData.get("tags") ?? "");
  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 3);

  if (!entryDate) throw new Error("Data wpisu jest wymagana.");
  if (moodValue !== null && (moodValue < 1 || moodValue > 5)) {
    throw new Error("Nastrój musi być w skali 1-5.");
  }

  const noteEncrypted = noteRaw ? encryptNote(noteRaw) : null;

  const supabase = await createClient();
  const { error } = await supabase.from("dot_entries").upsert(
    {
      user_id: userId,
      entry_date: entryDate,
      mood_value: moodValue,
      note_encrypted: noteEncrypted,
      tags,
    },
    { onConflict: "user_id,entry_date" }
  );

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
}

export async function deleteDotEntry(entryId: string) {
  const userId = await requireUserId();
  const supabase = await createClient();

  const { error } = await supabase
    .from("dot_entries")
    .delete()
    .eq("id", entryId)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
}
