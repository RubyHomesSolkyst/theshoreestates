"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";

/**
 * Jumps between the markets The Shore Estates covers. Kept next to the language
 * switcher so the primary nav bar stays short — Miami/Dubai are hub pages, not
 * extra top-level links.
 */
const REGIONS = [
  { key: "costaDelSol", href: "/" },
  { key: "miami", href: "/miami" },
  { key: "dubai", href: "/dubai" },
] as const;

function activeKey(pathname: string) {
  if (pathname === "/miami" || pathname.startsWith("/miami/")) return "miami";
  if (pathname === "/dubai" || pathname.startsWith("/dubai/")) return "dubai";
  return "costaDelSol";
}

export function RegionSwitcher() {
  const t = useTranslations("Regions");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = activeKey(pathname);

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

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("label")}
        className="flex items-center gap-1.5 whitespace-nowrap rounded-sm border border-ink/15 bg-white px-2 py-1 text-sm text-ink/75 transition-colors hover:border-ink/30"
      >
        <MapPin size={14} className="text-terracotta" />
        {t(current)}
        <ChevronDown size={13} className="text-ink/50" />
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute right-0 z-50 mt-1 w-44 overflow-hidden rounded-sm border border-ink/10 bg-white py-1 shadow-lg"
        >
          {REGIONS.map((r) => {
            const active = r.key === current;
            return (
              <li key={r.key} role="none">
                <Link
                  href={r.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-ink/5 ${
                    active ? "text-ink" : "text-ink/70"
                  }`}
                >
                  <MapPin
                    size={13}
                    className={active ? "text-terracotta" : "text-ink/30"}
                  />
                  {t(r.key)}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
