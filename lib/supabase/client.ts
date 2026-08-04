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
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
