import { defineRouting } from "next-intl/routing";

/**
 * Locale-prefixed routing for The Shore Estates.
 *
 * English (`en`) is the source language and the only fully-translated locale.
 * The remaining locales resolve to empty message bundles for now and fall
 * back to English until their translations are filled in (brief §7, Phase 3).
 *
 * `nl-be` (Dutch — Belgium) launches as a duplicate of `nl` and can diverge
 * later (contact details, currency/number formatting, tone).
 */
export const locales = ["en", "pl", "ro", "fr", "nl", "nl-be", "hu"] as const;

export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  // Always show the locale prefix, incl. /en/, so URLs are unambiguous.
  localePrefix: "always",
});
