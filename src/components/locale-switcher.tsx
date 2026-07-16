"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  pl: "Polski",
  ro: "Română",
  fr: "Français",
  nl: "Nederlands",
  "nl-be": "Nederlands (BE)",
  hu: "Magyar",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      // `pathname` is already locale-stripped with real segment values,
      // so we only need to swap the locale prefix.
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <label className="relative inline-flex items-center">
      <Globe
        size={15}
        className="pointer-events-none absolute left-2 text-ink/60"
      />
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={onChange}
        disabled={isPending}
        className="appearance-none rounded-sm border border-ink/15 bg-white py-1.5 pl-7 pr-3 text-sm text-ink/80 disabled:opacity-60"
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {LOCALE_LABELS[l]}
          </option>
        ))}
      </select>
    </label>
  );
}
