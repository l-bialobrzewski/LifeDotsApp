import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { EXTERNAL_WAITLIST_URL } from "@/lib/marketing/config";

interface WaitlistBody {
  email?: string;
  consent?: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
}

export async function POST(request: Request) {
  let body: WaitlistBody;
  try {
    body = (await request.json()) as WaitlistBody;
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Podaj prawidłowy adres e-mail." }, { status: 400 });
  }

  if (!body.consent) {
    return NextResponse.json(
      { error: "Wymagana zgoda na powiadomienie e-mail." },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const serviceRole =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE?.trim() ||
    "";
  if (!supabaseUrl || !serviceRole) {
    if (EXTERNAL_WAITLIST_URL) {
      return NextResponse.json(
        {
          error:
            "Waitlist w aplikacji niedostępna — użyj formularza zewnętrznego (Tally).",
          redirect: EXTERNAL_WAITLIST_URL,
        },
        { status: 503 }
      );
    }
    return NextResponse.json(
      {
        error: "Waitlist tymczasowo niedostępna. Spróbuj później.",
        missing: {
          NEXT_PUBLIC_SUPABASE_URL: !supabaseUrl,
          SUPABASE_SERVICE_ROLE_KEY: !serviceRole,
        },
      },
      { status: 503 }
    );
  }

  const admin = createAdminClient();
  const { error } = await admin.from("waitlist_signups").insert({
    email,
    consent_marketing: true,
    utm_source: body.utm_source ?? null,
    utm_medium: body.utm_medium ?? null,
    utm_campaign: body.utm_campaign ?? null,
    utm_content: body.utm_content ?? null,
  });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Ten adres e-mail jest już na liście." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Nie udało się zapisać. Spróbuj ponownie." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
