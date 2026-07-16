# Images — TODO

Tracks every image that is still a **free placeholder** (picsum.photos) or is
**waiting on a purchased/licensed file**. The site currently renders all imagery
from picsum; swap each entry for a licensed file in `public/images/final/` and
update the `src` in the referenced component.

Licensing rule: only ship images we hold a valid licence for. **Do not** use the
watermarked Shutterstock comps.

## ⛔ Watermarked placeholders — replace before launch

Temporary **watermarked placeholder** files in
`public/images/placeholder-watermarked/`. These are generated stand-ins (not
licensed photography) and **must be replaced with purchased images before
launch**.

| File        | Subject                                     | Used in                                              |
| ----------- | ------------------------------------------- | ---------------------------------------------------- |
| `dubai-1.jpg` | Dubai Marina — skyline & canal            | **Dubai** market card, home page (`page.tsx` markets) |
| `dubai-2.jpg` | Palm Jumeirah — aerial view of villas     | ⏳ Unused — reserve for a future Dubai landing section / About / News |
| `miami-1.jpg` | Miami Beach — beach & skyline, aerial     | **Miami** market card, home page (`page.tsx` markets) |
| `miami-2.jpg` | Miami high-rise — tower & palm, low angle  | ⏳ Unused — reserve for a future Miami landing section / About / News |

> Each is marked **"watermarked placeholder — replace before launch."** The
> market cards use `MarketImage`, which falls back to a picsum placeholder if the
> file is ever missing.

## ⚠️ Licensed file expected but missing from repo

| Where                         | Expected file                                  | State                                        |
| ----------------------------- | ---------------------------------------------- | -------------------------------------------- |
| **Costa del Sol** market card | `public/images/final/sykkel-i-palmealle.jpg`   | ⚠️ Referenced in code but **file is not in the project** — drop it in and the card will use it automatically (falls back to a placeholder until then) |

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
and automatically falls back to a placeholder if the file 404s. So the Costa del
Sol card will render the licensed photo the moment
`public/images/final/sykkel-i-palmealle.jpg` exists — no code change needed.

## Notes on local vs. remote images

- **Local** files in `public/` (e.g. `/images/final/foo.jpg`) need **no**
  `next.config` change — they are served directly.
- **Remote** URLs only need `images.remotePatterns` in `next.config.ts` when
  used via `next/image`. picsum is already allow-listed there; the prototype
  currently uses plain `<img>`, which needs no allow-list at all.
