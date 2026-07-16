"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Star, Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "@/config/nav";
import { useFavorites } from "@/components/favorites-context";
import { LocaleSwitcher } from "@/components/locale-switcher";

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const { favorites } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-foam/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-ink"
        >
          The Shore Estates
        </Link>

        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={
                  active
                    ? "text-ink"
                    : "text-ink/75 transition-colors hover:text-ink"
                }
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher />
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm text-ink/75"
            aria-label={t("favorites")}
          >
            <Star size={16} /> {favorites.length}
          </button>
          <Link
            href="/contact"
            className="rounded-sm bg-ink px-4 py-2 text-sm text-white transition-colors hover:bg-ink-deep"
          >
            {t("bookCall")}
          </Link>
        </div>

        <button
          type="button"
          className="text-ink lg:hidden"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-3 border-t border-ink/10 bg-foam px-5 py-4 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm text-ink/80"
              onClick={() => setMenuOpen(false)}
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="pt-1">
            <LocaleSwitcher />
          </div>
          <Link
            href="/contact"
            className="mt-1 rounded-sm bg-ink px-4 py-2 text-center text-sm text-white"
            onClick={() => setMenuOpen(false)}
          >
            {t("bookCall")}
          </Link>
        </div>
      )}
    </header>
  );
}
