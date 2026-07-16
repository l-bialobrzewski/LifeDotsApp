/**
 * Konfiguracja kampanii wiralowej (Tydzień 0+).
 * Patrz docs/marketing/social-virality-campaign.md i docs/marketing/week-0-setup.md
 */

export type LandingMode = "waitlist" | "signup";

/** Domyślnie waitlist — beta-launch-plan sekcja 2 nie spełniona. */
export function getLandingMode(): LandingMode {
  const mode = process.env.NEXT_PUBLIC_LANDING_MODE;
  return mode === "signup" ? "signup" : "waitlist";
}

export function isWaitlistMode(): boolean {
  return getLandingMode() === "waitlist";
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://lifedots.app";

/** Opcjonalny zewnętrzny formularz (Tally) — gdy Supabase waitlist jeszcze niedostępny. */
export const EXTERNAL_WAITLIST_URL =
  process.env.NEXT_PUBLIC_EXTERNAL_WAITLIST_URL ?? "";

/** Anonimowa ankieta WTP (Tally / Google Forms) — link po zapisie na waitlistę. */
export const WTP_SURVEY_URL = process.env.NEXT_PUBLIC_WTP_SURVEY_URL ?? "";

/** Pixel Meta/TikTok — wyłączony dopóki brak CMP cookie consent (RODO). */
export const TRACKING_PIXELS_ENABLED = false;

/** Instagram — limit 150 znaków. */
export const BIO_COPY = `LifeDots — zobacz swoje życie jako doty.
Każdy tydzień = 1 kropka. Świadomie. Prywatnie.
👇 Zbuduj swoją siatkę — bezpłatnie`;

/** TikTok — limit 80 znaków (pełne bio nie zmieści się). */
export const BIO_COPY_TIKTOK = `LifeDots
1 tydzień = 1 kropka. Świadomie.
👇 Zbuduj siatkę za darmo`;
