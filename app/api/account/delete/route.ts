import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

/**
 * Trwale usuniecie konta i wszystkich danych (art. 17 RODO — prawo do usuniecia).
 * Kaskadowe usuniecie profilu/wpisow/zgod jest wymuszone przez ON DELETE CASCADE
 * w schemacie (patrz supabase/migrations/0001_init_schema.sql). Usuniecie wiersza
 * auth.users wymaga uprawnien administracyjnych (service role), dlatego uzywamy
 * createAdminClient WYLACZNIE tutaj, po stronie serwera.
 */
export async function POST() {
  const supabase = await createClient();
  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData.user) {
    return NextResponse.json({ error: "Nie jesteś zalogowany." }, { status: 401 });
  }

  const userId = userData.user.id;

  await supabase.from("data_requests").insert({
    user_id: userId,
    request_type: "delete",
    status: "pending",
  });

  const admin = createAdminClient();
  const { error: deleteError } = await admin.auth.admin.deleteUser(userId);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  await supabase.auth.signOut();

  return NextResponse.json({ status: "deleted" });
}
