import { createBrowserClient } from "@supabase/ssr";

/**
 * Klient Supabase do uzytku w komponentach klienckich ("use client").
 * Uzywa publicznego anon key — bezpieczenstwo danych zapewnia RLS
 * (patrz supabase/migrations/0002_row_level_security.sql), nie ten klucz.
 *
 * Nie wywolywac w ciele renderu stron prerenderowanych — tylko w handlerach
 * (submit / klik). W przeciwnym razie `next build` pada gdy brak env.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // #region agent log
  fetch("http://127.0.0.1:7564/ingest/49210152-1b7f-468e-8ddd-e77a52c26829", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "0cb82c",
    },
    body: JSON.stringify({
      sessionId: "0cb82c",
      runId: "pre-fix",
      hypothesisId: "H2",
      location: "lib/supabase/client.ts:createClient",
      message: "createClient invoked",
      data: {
        hasUrl: Boolean(url),
        hasKey: Boolean(key),
        urlHost: url ? (() => { try { return new URL(url).host; } catch { return "invalid-url"; } })() : null,
        phase: typeof window === "undefined" ? "server" : "browser",
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  return createBrowserClient(url!, key!);
}
