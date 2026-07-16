# Images — TODO

Tracks every image that is still a **free placeholder** (picsum.photos) or is
**waiting on a purchased/licensed file**. The site currently renders all imagery
from picsum; swap each entry for a licensed file in `public/images/final/` and
update the `src` in the referenced component.

Licensing rule: only ship images we hold a valid licence for. **Do not** use the
watermarked Shutterstock comps.

## ⛔ Watermarked placeholder images — replace before launch

**Watermarked Shutterstock comps** in `public/images/placeholder-watermarked/`,
used as temporary placeholders. They carry visible "shutterstock" watermarks and
are **not licensed** — replace with purchased photography before launch. Card
usages also show a "Placeholder — replace before launch" badge in the UI.

| File          | Subject                              | Used in                                                    |
| ------------- | ------------------------------------ | ---------------------------------------------------------- |
| `Miami-1.jpg` | Miami beach & skyline (aerial)       | **Miami** market card + `/miami` hub hero (badged)         |
| `Dubai-1.jpg` | Dubai Marina                         | **Dubai** market card + `/dubai` hub hero (badged)         |
| `Miami-2.jpg` | Skyscrapers & palm (upward angle)    | **Home hero background** (no UI badge) + Costa card fallback |
| `Dubai-2.jpg` | Dubai skyline                        | ⏳ Unused — reserve for a future Dubai section              |

> Also present but **unreferenced**: 14 `stock-photo-*.jpg` Shutterstock comps.
> Not used by any code; recommend deleting so they don't ship.

## Costa del Sol — home-market photo

| Where                         | File                                           | State                                        |
| ----------------------------- | ---------------------------------------------- | -------------------------------------------- |
| **Costa del Sol** market card | `public/images/final/sykkel-i-palmealle.jpg`   | Clean photo (cyclist on a palm-lined promenade), no visible watermark. Confirm licensing before launch. |

## Other placeholders (lower priority — general prototype imagery)

All still using `picsum.photos`:

- Home hero lifestyle blocks — `page.tsx` (`resale-lifestyle`, `newbuild-lifestyle`)
- Home "Thinking of Selling?" CTA — `page.tsx` (`selling-cta`)
- Home buyer's-guide block — `page.tsx` (`buyer-guide`)
- Home + News article thumbnails — `page.tsx`, `news/page.tsx`
- Area explorer tiles (8) — `src/data/areas.ts`
- Property listing/detail photos (8) — `src/data/properties.ts`

## How the fallback works

Market cards use `src/components/market-image.tsx`, which loads the given `src`
and automatically falls back to `fallback` if the file 404s. So the Costa del
Sol card will render the licensed photo the moment
`public/images/final/sykkel-i-palmealle.jpg` is overwritten — no code change
needed.

## Notes on local vs. remote images

- **Local** files in `public/` (e.g. `/images/final/foo.jpg`) need **no**
  `next.config` change — they are served directly.
- **Remote** URLs only need `images.remotePatterns` in `next.config.ts` when
  used via `next/image`. picsum is already allow-listed there; the prototype
  currently uses plain `<img>`, which needs no allow-list at all.
