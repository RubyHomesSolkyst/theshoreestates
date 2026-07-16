/**
 * Primary navigation. `key` maps to a label in the `Nav` message namespace;
 * `href` is a locale-agnostic pathname (the locale prefix is added by the
 * next-intl <Link> component).
 *
 * An entry with `children` renders as a dropdown group (e.g. "Guides" bundles
 * the buyer's and seller's guides so the top-level bar stays short).
 */
export interface NavLink {
  key: string;
  href: string;
}

export interface NavGroup {
  key: string;
  children: NavLink[];
}

export type NavEntry = NavLink | NavGroup;

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return "children" in entry;
}

export const navItems: NavEntry[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  {
    key: "guides",
    children: [
      { key: "buyerGuide", href: "/buyer-guide" },
      { key: "sellerGuide", href: "/seller-guide" },
    ],
  },
  { key: "developments", href: "/new-developments" },
  { key: "resale", href: "/resale-properties" },
  { key: "news", href: "/news" },
  { key: "contact", href: "/contact" },
];

/** Flat list of every navigable link (groups expanded) — used by the footer. */
export const navLinks: NavLink[] = navItems.flatMap((entry) =>
  isNavGroup(entry) ? entry.children : [entry]
);
