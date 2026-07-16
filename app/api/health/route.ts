import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** Endpoint uptime-monitoringu — patrz docs/devops/environments.md sekcja 3. */
export async function GET() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("profiles").select("id").limit(1);

    if (error) {
      return NextResponse.json({ status: "degraded", db: error.message }, { status: 503 });
    }

    return NextResponse.json({ status: "ok", db: "reachable" });
  } catch (e) {
    return NextResponse.json(
      { status: "error", message: e instanceof Error ? e.message : "unknown" },
      { status: 503 }
    );
  }
}
