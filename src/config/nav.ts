/**
 * Primary navigation. `key` maps to a label in the `Nav` message namespace;
 * `href` is a locale-agnostic pathname (the locale prefix is added by the
 * next-intl <Link> component).
 */
export interface NavItem {
  key: string;
  href: string;
}

export const navItems: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "buyerGuide", href: "/buyer-guide" },
  { key: "sellerGuide", href: "/seller-guide" },
  { key: "developments", href: "/new-developments" },
  { key: "resale", href: "/resale-properties" },
  { key: "news", href: "/news" },
  { key: "contact", href: "/contact" },
];
