export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
] as const;

export const UTM_STORAGE_KEY = "lifedots_utm";

export function parseUtmFromSearchParams(
  searchParams: URLSearchParams
): UtmParams {
  const params: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = searchParams.get(key);
    if (value) params[key] = value;
  }
  return params;
}

export function buildLandingUrl(
  baseUrl: string,
  params: UtmParams
): string {
  const url = new URL(baseUrl);
  for (const key of UTM_KEYS) {
    const value = params[key];
    if (value) url.searchParams.set(key, value);
  }
  return url.toString();
}

/** Gotowe szablony UTM dla bio i kampanii (Tydzień 0–4). */
export const UTM_TEMPLATES = {
  tiktok_organic_w1: {
    utm_source: "tiktok",
    utm_medium: "organic",
    utm_campaign: "virality_w1",
  },
  instagram_organic_w1: {
    utm_source: "instagram",
    utm_medium: "organic",
    utm_campaign: "virality_w1",
  },
  tiktok_organic_w2: {
    utm_source: "tiktok",
    utm_medium: "organic",
    utm_campaign: "virality_w2",
  },
  instagram_organic_w2: {
    utm_source: "instagram",
    utm_medium: "organic",
    utm_campaign: "virality_w2",
  },
  tiktok_paid_w3_boost: {
    utm_source: "tiktok",
    utm_medium: "paid",
    utm_campaign: "virality_w3_boost",
  },
  instagram_paid_w3_boost: {
    utm_source: "instagram",
    utm_medium: "paid",
    utm_campaign: "virality_w3_boost",
  },
} as const satisfies Record<string, UtmParams>;

export function hasUtmParams(params: UtmParams): boolean {
  return UTM_KEYS.some((key) => Boolean(params[key]));
}
