import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** Bezpieczna diagnostyka kształtu URL — bez pełnych sekretów. */
function urlShape(url: string) {
  return {
    length: url.length,
    startsWithHttps: url.startsWith("https://"),
    startsWithHttp: url.startsWith("http://"),
    includesSupabaseCo: url.includes("supabase.co"),
    hasQuotes: /["']/.test(url),
    hasWhitespace: /\s/.test(url),
    /** Pierwsze / ostatnie znaki — project ref i tak jest publiczny. */
    prefix: url.slice(0, 20),
    suffix: url.slice(-20),
  };
}

function envPresence() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const serviceRole =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE?.trim() ||
    "";

  return {
    hasUrl: Boolean(url),
    urlLooksValid: /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(url),
    urlShape: url ? urlShape(url) : null,
    hasAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()),
    hasServiceRole: Boolean(serviceRole),
    /** Jeśli ktoś dodał zmienną pod złą nazwą — widać tu. */
    serviceRoleVarNames: {
      SUPABASE_SERVICE_ROLE_KEY: Boolean(
        process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
      ),
      SUPABASE_SERVICE_ROLE: Boolean(process.env.SUPABASE_SERVICE_ROLE?.trim()),
    },
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

  if (!env.urlLooksValid) {
    return NextResponse.json(
      {
        status: "error",
        message:
          "NEXT_PUBLIC_SUPABASE_URL must be exactly https://YOUR-REF.supabase.co",
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

    return NextResponse.json({
      status: "ok",
      db: "reachable",
      env: {
        hasUrl: env.hasUrl,
        urlLooksValid: env.urlLooksValid,
        hasAnonKey: env.hasAnonKey,
        hasServiceRole: env.hasServiceRole,
      },
    });
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
