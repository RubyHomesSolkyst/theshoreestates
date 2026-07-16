# Images — TODO

Tracks every image that is still a **free placeholder** (picsum.photos) or is
**waiting on a purchased/licensed file**. The site currently renders all imagery
from picsum; swap each entry for a licensed file in `public/images/final/` and
update the `src` in the referenced component.

Licensing rule: only ship images we hold a valid licence for. **Do not** use the
watermarked Shutterstock comps.

## ⛔ Placeholder images — replace before launch

Clean, generated **placeholder images** (no watermark baked in) in
`public/images/placeholder-watermarked/`. They are stylised stand-ins (sunset +
skyline/palm illustrations), **not licensed photography**, and must be replaced
with purchased photos before launch. The Miami/Dubai market cards show a small
corner badge "Placeholder — replace before launch" (rendered in the UI, not on
the image itself).

| File        | Subject placeholder    | Used in                                                      |
| ----------- | ---------------------- | ------------------------------------------------------------ |
| `miami-1.jpg` | Miami skyline        | **Miami** market card + `/miami` hub hero (badged)           |
| `dubai-1.jpg` | Dubai skyline        | **Dubai** market card + `/dubai` hub hero (badged)           |
| `miami-2.jpg` | Miami skyline + palm | ⏳ Also the Costa card fallback; reserve for a future Miami section |
| `dubai-2.jpg` | Dubai skyline        | ⏳ Unused — reserve for a future Dubai landing section / About / News |

## ⚠️ Costa del Sol — generated stand-in, replace with the licensed photo

| Where                         | File                                           | State                                        |
| ----------------------------- | ---------------------------------------------- | -------------------------------------------- |
| **Costa del Sol** market card | `public/images/final/sykkel-i-palmealle.jpg`   | ⚠️ Currently a **generated stylised stand-in** (palm sunset), **not** the licensed photo. The real `sykkel-i-palmealle.jpg` was never in the repo — overwrite this file with the licensed image and the card updates automatically (no code change, no badge). |

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
