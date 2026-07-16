/**
 * Property listings — language-independent data (brief §5B).
 *
 * This is placeholder content shaped to match a typical Resales Online (or
 * similar Costa del Sol MLS) feed record. When wiring up the real feed
 * (Phase 4), map each listing to this same `Property` shape so the UI
 * components need no changes.
 *
 * Note: `descriptionEn` is the one language-dependent field. It stays English
 * until we confirm whether the feed exports per-locale descriptions.
 */
export type PropertyStatus = "resale" | "new-development";

export type PropertyTag = "new" | "reduced" | "opportunity" | null;

export interface Property {
  id: number;
  ref: string;
  location: string;
  subtype: string;
  price: number;
  currency: string;
  beds: number;
  baths: number;
  builtM2: number;
  terraceM2: number;
  plotM2: number | null;
  images: string[];
  tag: PropertyTag;
  status: PropertyStatus;
  descriptionEn: string;
}

export const properties: Property[] = [
  {
    id: 1,
    ref: "SE5179231",
    location: "Fuengirola",
    subtype: "Duplex",
    price: 399000,
    currency: "EUR",
    beds: 2,
    baths: 2,
    builtM2: 86,
    terraceM2: 43,
    plotM2: null,
    images: ["https://picsum.photos/seed/shore1/1200/800"],
    tag: null,
    status: "resale",
    descriptionEn:
      "A modern duplex with panoramic sea views in Monte Paraiso, a well-kept residential complex finished in 2019, just a short walk from the beach.",
  },
  {
    id: 2,
    ref: "SE5194255",
    location: "Fuengirola",
    subtype: "Top-Floor Apartment",
    price: 469000,
    currency: "EUR",
    beds: 3,
    baths: 2,
    builtM2: 105,
    terraceM2: 6,
    plotM2: null,
    images: ["https://picsum.photos/seed/shore2/1200/800"],
    tag: "new",
    status: "resale",
    descriptionEn:
      "Fully renovated three-bedroom apartment 500m from the seafront, finished with warm, contemporary interiors throughout.",
  },
  {
    id: 3,
    ref: "SE5106403",
    location: "Fuengirola",
    subtype: "Top-Floor Apartment",
    price: 749000,
    currency: "EUR",
    beds: 2,
    baths: 2,
    builtM2: 90,
    terraceM2: 40,
    plotM2: null,
    images: ["https://picsum.photos/seed/shore3/1200/800"],
    tag: null,
    status: "resale",
    descriptionEn:
      "Beachside top-floor apartment close to shops and the promenade, with a generous wraparound terrace built for outdoor living.",
  },
  {
    id: 4,
    ref: "SE4897981",
    location: "Estepona",
    subtype: "Corner Penthouse",
    price: 1090000,
    currency: "EUR",
    beds: 4,
    baths: 3,
    builtM2: 136,
    terraceM2: 120,
    plotM2: null,
    images: ["https://picsum.photos/seed/shore4/1200/800"],
    tag: "reduced",
    status: "resale",
    descriptionEn:
      "An exclusive top-floor corner apartment with panoramic sea views in Las Mesas — recently reduced from €1,250,000 for a fast sale.",
  },
  {
    id: 5,
    ref: "SE5431069",
    location: "Calypso",
    subtype: "Mid-Floor Apartment",
    price: 250000,
    currency: "EUR",
    beds: 1,
    baths: 1,
    builtM2: 46,
    terraceM2: 13,
    plotM2: null,
    images: ["https://picsum.photos/seed/shore5/1200/800"],
    tag: "opportunity",
    status: "resale",
    descriptionEn:
      "A one-bedroom apartment with sea views, moments from Calahonda Beach — a bright renovation opportunity in a well-connected pocket of the coast.",
  },
  {
    id: 6,
    ref: "SE5425204",
    location: "Estepona",
    subtype: "Penthouse",
    price: 250000,
    currency: "EUR",
    beds: 1,
    baths: 1,
    builtM2: 67,
    terraceM2: 20,
    plotM2: null,
    images: ["https://picsum.photos/seed/shore6/1200/800"],
    tag: null,
    status: "resale",
    descriptionEn:
      "A charming top-floor penthouse with a large terrace overlooking Estepona's historic old town, in the vibrant centre of the city.",
  },
  {
    id: 7,
    ref: "SE5500017",
    location: "Estepona",
    subtype: "New-Build Apartment",
    price: 545000,
    currency: "EUR",
    beds: 3,
    baths: 2,
    builtM2: 112,
    terraceM2: 35,
    plotM2: null,
    images: ["https://picsum.photos/seed/shore7/1200/800"],
    tag: "new",
    status: "new-development",
    descriptionEn:
      "Off-plan three-bedroom apartment in a gated development with communal pool, gym and landscaped gardens, completing next year.",
  },
  {
    id: 8,
    ref: "SE5500042",
    location: "Mijas",
    subtype: "New-Build Villa",
    price: 1250000,
    currency: "EUR",
    beds: 4,
    baths: 4,
    builtM2: 240,
    terraceM2: 90,
    plotM2: 650,
    images: ["https://picsum.photos/seed/shore8/1200/800"],
    tag: null,
    status: "new-development",
    descriptionEn:
      "Contemporary detached villa with private pool and open mountain-to-sea views, part of a boutique new-build enclave in Mijas.",
  },
];

export function getProperty(ref: string): Property | undefined {
  return properties.find((p) => p.ref === ref);
}

export function formatPrice(amount: number, currency = "EUR", locale = "en") {
  return new Intl.NumberFormat(locale === "en" ? "en-GB" : locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
