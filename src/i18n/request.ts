import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Every locale ships a JSON bundle. Non-English bundles are currently empty
  // ({}), so next-intl falls back to the English source strings at render time.
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const fallback = (await import(`../../messages/en.json`)).default;

  return {
    locale,
    // Merge English underneath so untranslated keys resolve to source copy
    // instead of throwing / rendering the raw key.
    messages: { ...fallback, ...messages },
  };
});
