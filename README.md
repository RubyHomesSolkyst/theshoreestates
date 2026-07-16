# The Shore Estates

English-first, multilingual real-estate website for Costa del Sol property sales
and rentals. Built with **Next.js (App Router)**, **next-intl** for
locale-prefixed i18n routing, and **Tailwind CSS v4**.

## Status

Phase 1–2 scaffold (see `theshoreestates-brief.docx` §7):

- ✅ Next.js App Router project with the full site map
- ✅ Design system from the prototype (palette, Fraunces + Work Sans, the
  "horizon rule" motif)
- ✅ next-intl locale-prefixed routing for all seven locales
- ✅ **English (`en`) is the only fully-translated locale**; the other six ship
  as **empty message files** and fall back to the English source at render time
- ⬜ Translation (Phase 3), live MLS feed (Phase 4), SEO/area pages (Phase 5)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000 → redirects to /en
npm run build    # production build (prerenders every locale)
npm start        # serve the production build
```

## Locales

| Locale  | URL prefix | Language            | State                         |
| ------- | ---------- | ------------------- | ----------------------------- |
| `en`    | `/en`      | English (source)    | ✅ Complete                   |
| `pl`    | `/pl`      | Polish              | Empty — falls back to English |
| `ro`    | `/ro`      | Romanian            | Empty — falls back to English |
| `fr`    | `/fr`      | French              | Empty — falls back to English |
| `nl`    | `/nl`      | Dutch (Netherlands) | Empty — falls back to English |
| `nl-be` | `/nl-be`   | Dutch (Belgium)     | Empty — launch as copy of `nl`|
| `hu`    | `/hu`      | Hungarian           | Empty — falls back to English |

Default locale is `en`; the prefix is always shown (`localePrefix: "always"`).

## Project structure

```
messages/
  en.json            UI copy — the source of truth (only complete bundle)
  pl.json … hu.json  empty {} bundles, filled during Phase 3
src/
  i18n/
    routing.ts       locales + defaultLocale
    navigation.ts    locale-aware <Link>, useRouter, usePathname
    request.ts       per-request messages (merges en underneath as fallback)
  proxy.ts           next-intl middleware (Next 16 "proxy" convention)
  config/nav.ts      primary navigation (label key + href)
  data/
    properties.ts    language-independent listings (Resales Online feed shape)
    areas.ts         Costa del Sol destinations
  components/        Header, Footer, PropertyCard, SearchPanel, HorizonRule,
                     LocaleSwitcher, EnquiryForm, NewsletterButton, …
  app/[locale]/
    layout.tsx       fonts, <NextIntlClientProvider>, Header/Footer chrome
    page.tsx         Home
    resale-properties/ new-developments/ property/[ref]/
    buyer-guide/ seller-guide/ about/ news/ contact/
```

## Content model (brief §5)

Two concerns are kept strictly separate so translation work never touches
property data and feed updates never touch UI copy:

- **UI copy & editorial content** → `messages/<locale>.json`, translated per
  locale.
- **Property listings** → `src/data/properties.ts`, language-independent. The
  shape matches a typical Resales Online MLS record; `descriptionEn` is the one
  language-dependent field (English-only until the feed's language support is
  confirmed — brief §5B / §8).

## Adding a translation (Phase 3)

Fill the corresponding `messages/<locale>.json` with the same key structure as
`messages/en.json`. Any key you omit falls back to the English source string, so
you can translate incrementally. `nl-be` can start as a copy of `nl.json`.

## Design system (brief §6)

Defined as Tailwind theme tokens in `src/app/globals.css`:

- **Ink Navy** `#12313F` (`ink`), deepened `#0d232e` (`ink-deep`)
- **Foam White** `#F1F4F3` (`foam`)
- **Burnt Terracotta** `#A85C3F` (`terracotta`)
- **Ochre Gold** `#C9A227` (`ochre`)
- **Deep teal** `#1D5C63` (`teal`)
- Type: **Fraunces** (`font-display`) + **Work Sans** (`font-sans`)
- The **horizon rule** — a gradient divider with a glowing marker whose position
  and hue shift between sections (`src/components/horizon-rule.tsx`).

## Open questions before further work (brief §8)

- Domain / hosting target (Netlify is available)
- Resales Online contract / API access status
- Real contact details (phone, office address) — currently placeholders in the
  footer and contact page
- Whether `nl-be` gets a dedicated translation pass or stays a copy of `nl`
