/**
 * Costa del Sol destinations shown in the area explorer and footer.
 *
 * `slug` is used for the (Phase 2) per-area SEO pages. The `name` is a proper
 * noun kept language-independent; the short `blurb` is editorial copy that can
 * be moved into the message bundles when area pages are built out.
 */
export interface Area {
  slug: string;
  name: string;
  blurb: string;
  image: string;
}

export const areas: Area[] = [
  { slug: "marbella", name: "Marbella", blurb: "The heart of coastal glamour.", image: "https://picsum.photos/seed/area-marbella/800/640" },
  { slug: "benahavis", name: "Benahavís", blurb: "Gastronomy and green hills.", image: "https://picsum.photos/seed/area-benahavis/800/640" },
  { slug: "puerto-banus", name: "Puerto Banús", blurb: "Boutiques, marinas, yachts.", image: "https://picsum.photos/seed/area-banus/800/640" },
  { slug: "estepona", name: "Estepona", blurb: "Gardens and a modern old town.", image: "https://picsum.photos/seed/area-estepona/800/640" },
  { slug: "nueva-andalucia", name: "Nueva Andalucía", blurb: "Golf valley, wide open views.", image: "https://picsum.photos/seed/area-andalucia/800/640" },
  { slug: "sotogrande", name: "Sotogrande", blurb: "Privacy and world-class polo.", image: "https://picsum.photos/seed/area-soto/800/640" },
  { slug: "fuengirola", name: "Fuengirola", blurb: "Easy beaches, lively streets.", image: "https://picsum.photos/seed/area-fuen/800/640" },
  { slug: "mijas", name: "Mijas", blurb: "Whitewashed lanes, mountain air.", image: "https://picsum.photos/seed/area-mijas/800/640" },
];
