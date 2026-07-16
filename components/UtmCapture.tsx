"use client";

import { useEffect } from "react";
import { UTM_STORAGE_KEY, parseUtmFromSearchParams } from "@/lib/marketing/utm";

/**
 * Zapisuje parametry UTM z URL do sessionStorage (bez cookies).
 * Używane przy zapisie na waitlistę — pomiar UTM-only, bez pixela.
 */
export default function UtmCapture() {
  useEffect(() => {
    const params = parseUtmFromSearchParams(
      new URLSearchParams(window.location.search)
    );
    if (Object.keys(params).length > 0) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));
    }
  }, []);

  return null;
}

export function readStoredUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}
