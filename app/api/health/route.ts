import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function envPresence() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  return {
    hasUrl: Boolean(url),
    urlLooksValid: /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(url),
    hasAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()),
    hasServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()),
  };
}

/** Endpoint uptime-monitoringu — patrz docs/devops/environments.md sekcja 3. */
export async function GET() {
  const env = envPresence();

  if (!env.hasUrl || !env.hasAnonKey) {
    return NextResponse.json(
      {
        status: "error",
        message: "Missing Supabase public env on this deployment",
        env,
      },
      { status: 503 }
    );
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("profiles").select("id").limit(1);

    if (error) {
      return NextResponse.json(
        { status: "degraded", db: error.message, env },
        { status: 503 }
      );
    }

    return NextResponse.json({ status: "ok", db: "reachable", env });
  } catch (e) {
    return NextResponse.json(
      {
        status: "error",
        message: e instanceof Error ? e.message : "unknown",
        env,
      },
      { status: 503 }
    );
  }
}
