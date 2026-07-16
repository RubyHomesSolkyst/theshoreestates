"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Star, Menu, X, ChevronDown } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems, isNavGroup, type NavGroup } from "@/config/nav";
import { useFavorites } from "@/components/favorites-context";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { Logo } from "@/components/logo";

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const { favorites } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkBase = "whitespace-nowrap transition-colors";

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-foam/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/" aria-label="The Shore Estates — home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-5 text-sm lg:flex xl:gap-7">
          {navItems.map((item) => {
            if (isNavGroup(item)) {
              return <NavDropdown key={item.key} group={item} />;
            }
            const active = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`${linkBase} ${active ? "text-ink" : "text-ink/75 hover:text-ink"}`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
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
            className="whitespace-nowrap rounded-sm bg-ink px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-ink-deep"
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
          {navItems.map((item) => {
            if (isNavGroup(item)) {
              return (
                <div key={item.key} className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-wide text-ink/50">
                    {t(item.key)}
                  </span>
                  {item.children.map((child) => (
                    <Link
                      key={child.key}
                      href={child.href}
                      className="pl-3 text-sm text-ink/80"
                      onClick={() => setMenuOpen(false)}
                    >
                      {t(child.key)}
                    </Link>
                  ))}
                </div>
              );
            }
            return (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm text-ink/80"
                onClick={() => setMenuOpen(false)}
              >
                {t(item.key)}
              </Link>
            );
          })}
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

function NavDropdown({ group }: { group: NavGroup }) {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const active = group.children.some((c) => c.href === pathname);

  return (
    <div className="group relative">
      <button
        type="button"
        aria-haspopup="true"
        className={`inline-flex items-center gap-1 whitespace-nowrap transition-colors ${
          active ? "text-ink" : "text-ink/75 group-hover:text-ink"
        }`}
      >
        {t(group.key)}
        <ChevronDown
          size={14}
          className="transition-transform group-hover:rotate-180"
        />
      </button>
      <ul className="invisible absolute left-0 top-full z-50 w-56 rounded-sm border border-ink/10 bg-white py-1 opacity-0 shadow-lg transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        {group.children.map((child) => {
          const childActive = child.href === pathname;
          return (
            <li key={child.key}>
              <Link
                href={child.href}
                className={`block px-4 py-2 text-sm transition-colors hover:bg-ink/5 ${
                  childActive ? "text-ink" : "text-ink/75"
                }`}
              >
                {t(child.key)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
