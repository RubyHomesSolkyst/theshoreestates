import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

type Messages = Record<string, unknown>;

/**
 * Recursively merge `override` on top of `base`. Used to lay English under each
 * locale so partial translations work: a locale file can translate just a few
 * keys (even nested ones, e.g. only `Home.hero`) and everything else resolves
 * to the English source instead of the raw key. A shallow merge would replace
 * whole namespaces, dropping their untranslated siblings.
 */
function deepMerge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const baseVal = out[key];
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      baseVal &&
      typeof baseVal === "object" &&
      !Array.isArray(baseVal)
    ) {
      out[key] = deepMerge(baseVal as Messages, value as Messages);
    } else {
      out[key] = value;
    }
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Every locale ships a JSON bundle. Untranslated (or empty) bundles fall back
  // to the English source, key by key, via the deep merge below.
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const fallback = (await import(`../../messages/en.json`)).default;

  return {
    locale,
    messages: deepMerge(fallback as Messages, messages as Messages),
  };
});
