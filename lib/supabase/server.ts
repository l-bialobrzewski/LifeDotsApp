import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Klient Supabase do uzytku w Server Components / Route Handlers.
 * Respektuje sesje uzytkownika (cookies) — WSZYSTKIE zapytania wciaz
 * przechodza przez RLS, wiec nie omija izolacji danych miedzy uzytkownikami.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Wywolywane z Server Component - middleware odswieza sesje.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch {
            // Jak wyzej.
          }
        },
      },
    }
  );
}

/**
 * Klient administracyjny (service role) — WYLACZNIE do zadan serwerowych,
 * ktore musza obejsc RLS (np. trwale usuniecie konta na zadanie art. 17).
 * NIGDY nie importowac w kodzie klienckim.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
