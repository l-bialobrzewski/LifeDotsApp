import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isWaitlistMode } from "@/lib/marketing/config";

/** Endpoint uptime-monitoringu — patrz docs/devops/environments.md sekcja 3. */
export async function GET() {
  try {
    const supabase = await createClient();

    // W trybie waitlist jedyna tabelą jest waitlist_signups; w trybie beta
    // sprawdzamy profiles. Health nie powinien fałszywie alarmować, gdy
    // waitlista działa, ale profiles jeszcze nie istnieje.
    const table = isWaitlistMode() ? "waitlist_signups" : "profiles";
    const { error } = await supabase.from(table).select("id").limit(1);

    if (error) {
      return NextResponse.json(
        { status: "degraded", db: error.message },
        { status: 503 }
      );
    }

    return NextResponse.json({ status: "ok", db: "reachable" });
  } catch (e) {
    return NextResponse.json(
      { status: "error", message: e instanceof Error ? e.message : "unknown" },
      { status: 503 }
    );
  }
}
