"use client";

import { useLocale } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { Flag, type FlagCode } from "@/components/flags";

const LOCALE_META: Record<Locale, { code: FlagCode; label: string }> = {
  en: { code: "GB", label: "English" },
  pl: { code: "PL", label: "Polski" },
  ro: { code: "RO", label: "Română" },
  fr: { code: "FR", label: "Français" },
  nl: { code: "NL", label: "Nederlands" },
  "nl-be": { code: "BE", label: "Belgian" },
  hu: { code: "HU", label: "Magyar" },
};

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LOCALE_META[locale];

  useEffect(() => {
    if (!open) return;
    function onClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function select(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      // `pathname` is already locale-stripped with real segment values,
      // so we only need to swap the locale prefix.
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.code}`}
        title={current.code}
        className="flex items-center gap-1 rounded-sm border border-ink/15 bg-white px-1.5 py-1 text-ink/70 transition-colors hover:border-ink/30 disabled:opacity-60"
      >
        <Flag code={current.code} className="h-3.5 w-5" />
        <ChevronDown size={13} className="text-ink/50" />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-1 w-44 overflow-hidden rounded-sm border border-ink/10 bg-white py-1 shadow-lg"
        >
          {locales.map((l) => {
            const meta = LOCALE_META[l];
            const active = l === locale;
            return (
              <li key={l}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => select(l)}
                  title={meta.code}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors hover:bg-ink/5 ${
                    active ? "text-ink" : "text-ink/70"
                  }`}
                >
                  <Flag code={meta.code} className="h-3.5 w-5 shrink-0" />
                  <span className="flex-1">{meta.label}</span>
                  <span className="text-xs text-ink/40">{meta.code}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
