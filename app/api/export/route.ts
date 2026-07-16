import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { decryptNote } from "@/lib/encryption";
import type { DotEntry } from "@/lib/types";

/**
 * Samoobslugowy eksport danych uzytkownika (art. 15 / art. 20 RODO — dostep i
 * przenoszenie danych). Zwraca kompletny zrzut danych powiazanych z kontem.
 */
export async function GET() {
  const supabase = await createClient();
  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData.user) {
    return NextResponse.json({ error: "Nie jesteś zalogowany." }, { status: 401 });
  }

  const userId = userData.user.id;

  const [{ data: profile }, { data: entries }, { data: consents }] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).single(),
      supabase.from("dot_entries").select("*").eq("user_id", userId),
      supabase.from("consents").select("*").eq("user_id", userId),
    ]);

  const decryptedEntries = ((entries as DotEntry[]) ?? []).map((entry) => {
    let note: string | null = null;
    if (entry.note_encrypted) {
      try {
        note = decryptNote(entry.note_encrypted);
      } catch {
        note = null;
      }
    }
    const { note_encrypted: _note, ...rest } = entry;
    void _note;
    return { ...rest, note };
  });

  await supabase.from("data_requests").insert({
    user_id: userId,
    request_type: "export",
    status: "completed",
    completed_at: new Date().toISOString(),
  });

  const exportPayload = {
    exported_at: new Date().toISOString(),
    account: { id: userId, email: userData.user.email },
    profile,
    dot_entries: decryptedEntries,
    consents,
  };

  return new NextResponse(JSON.stringify(exportPayload, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="lifedots-export-${userId}.json"`,
    },
  });
}
