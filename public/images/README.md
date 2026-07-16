# Images

The site currently renders **free placeholder imagery** from
[picsum.photos](https://picsum.photos) (see `remotePatterns` in
`next.config.ts`). These are stand-ins that match the general mood of the
moodboard references (couple at a property viewing, coastal cliffs, golf, a
beach cocktail, an architect meeting) but are **not** the final art.

## Adding real, licensed photography

Drop licensed images (Costa del Sol, Dubai, Miami, etc.) into this folder and
reference them with a root-relative path, e.g.:

```tsx
<img src="/images/hero-costa-del-sol.jpg" alt="…" />
```

or, preferably, via `next/image` for optimization:

```tsx
import Image from "next/image";
<Image src="/images/hero-costa-del-sol.jpg" alt="…" width={1600} height={900} />
```

## ⚠️ Licensing

- **Do not** commit the watermarked Shutterstock comps — they are unlicensed
  and must not ship.
- Only add imagery we hold a valid licence for. Keep the licence/source noted
  (e.g. in a `CREDITS.md`) so usage rights are auditable.
