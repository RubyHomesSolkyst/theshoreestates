import { getTranslations, setRequestLocale } from "next-intl/server";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HorizonDivider } from "@/components/horizon-rule";
import { SearchPanel } from "@/components/search-panel";
import { PropertyCard } from "@/components/property-card";
import { MarketImage } from "@/components/market-image";
import { properties } from "@/data/properties";
import { areas } from "@/data/areas";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  const featured = properties.slice(0, 6);

  // Markets we operate in. Costa del Sol uses a licensed local image; Miami and
  // Dubai use free placeholders until their images are purchased (see
  // IMAGES_TODO.md). MarketImage falls back to `fallback` if `src` 404s.
  const markets = [
    {
      key: "costa",
      name: t("markets.costaName"),
      blurb: t("markets.costaBlurb"),
      cta: t("markets.costaCta"),
      href: "/resale-properties",
      src: "/images/final/sykkel-i-palmealle.jpg",
      fallback: "https://picsum.photos/seed/costa-del-sol/1200/900",
    },
    {
      key: "miami",
      name: t("markets.miamiName"),
      blurb: t("markets.miamiBlurb"),
      cta: t("markets.miamiCta"),
      href: "/contact",
      src: "/images/placeholder-watermarked/miami-1.jpg",
      fallback: "https://picsum.photos/seed/miami-skyline/1200/900",
    },
    {
      key: "dubai",
      name: t("markets.dubaiName"),
      blurb: t("markets.dubaiBlurb"),
      cta: t("markets.dubaiCta"),
      href: "/contact",
      src: "/images/placeholder-watermarked/dubai-1.jpg",
      fallback: "https://picsum.photos/seed/dubai-coastline/1200/900",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section id="home" className="relative overflow-hidden bg-ink">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgba(201,162,39,0.35), transparent 45%), linear-gradient(180deg, #0d232e 0%, #12313F 60%, #1D5C63 100%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 pb-32 pt-20 md:px-8 md:pb-40 md:pt-28">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-ochre">
            {t("hero.eyebrow")}
          </p>
          <h1 className="max-w-3xl font-display text-4xl leading-[1.1] text-white md:text-6xl">
            {t("hero.titleLead")}{" "}
            <span className="italic text-ochre">{t("hero.titleAccent")}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/70 md:text-lg">
            {t("hero.subtitle")}
          </p>
        </div>

        {/* Floating search panel */}
        <div className="relative mx-auto -mt-20 max-w-6xl px-5 pb-16 md:-mt-24 md:px-8">
          <SearchPanel />
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-10 text-center md:grid-cols-3 md:px-8">
        {[
          ["€500M+", t("trustBar.salesVolume")],
          [t("trustBar.localExpertiseValue"), t("trustBar.localExpertise")],
          ["100%", t("trustBar.englishSupport")],
        ].map(([stat, label]) => (
          <div key={label}>
            <div className="font-display text-3xl text-ink">{stat}</div>
            <div className="mt-1 text-sm text-ink/60">{label}</div>
          </div>
        ))}
      </section>

      <HorizonDivider position={0.15} />

      {/* MARKETS — one card per region we cover */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <p className="text-xs uppercase tracking-wide text-terracotta">
          {t("markets.eyebrow")}
        </p>
        <h2 className="mb-8 mt-1 font-display text-3xl text-ink">
          {t("markets.title")}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {markets.map((m) => (
            <Link
              key={m.key}
              href={m.href}
              className="group relative block h-80 overflow-hidden rounded-sm"
            >
              <MarketImage
                src={m.src}
                fallback={m.fallback}
                alt={m.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 text-white">
                <h3 className="font-display text-2xl">{m.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  {m.blurb}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm underline underline-offset-4">
                  {m.cta} <ChevronRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* LIFESTYLE BLOCKS */}
      <section
        id="about"
        className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 py-16 md:grid-cols-2 md:px-8"
      >
        <div className="group relative h-80 overflow-hidden rounded-sm">
          <img
            src="https://picsum.photos/seed/resale-lifestyle/1400/1000"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-xs uppercase tracking-wide text-ochre">
              {t("lifestyle.resaleEyebrow")}
            </p>
            <h3 className="mt-1 font-display text-2xl">
              {t("lifestyle.resaleTitle")}
            </h3>
            <Link
              href="/resale-properties"
              className="mt-2 inline-block text-sm underline underline-offset-4"
            >
              {t("lifestyle.resaleCta")}
            </Link>
          </div>
        </div>
        <div className="group relative h-80 overflow-hidden rounded-sm">
          <img
            src="https://picsum.photos/seed/newbuild-lifestyle/1400/1000"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-xs uppercase tracking-wide text-ochre">
              {t("lifestyle.newBuildEyebrow")}
            </p>
            <h3 className="mt-1 font-display text-2xl">
              {t("lifestyle.newBuildTitle")}
            </h3>
            <Link
              href="/new-developments"
              className="mt-2 inline-block text-sm underline underline-offset-4"
            >
              {t("lifestyle.newBuildCta")}
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section
        id="properties"
        className="mx-auto max-w-7xl px-5 py-16 md:px-8"
      >
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wide text-terracotta">
            {t("featured.eyebrow")}
          </p>
          <h2 className="mt-1 font-display text-3xl text-ink">
            {t("featured.title")}
          </h2>
          <p className="mt-2 text-sm text-ink/60">{t("featured.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/resale-properties"
            className="inline-block rounded-sm border border-ink/25 px-6 py-2.5 text-sm text-ink transition-colors hover:bg-ink hover:text-white"
          >
            {t("featured.viewAll")}
          </Link>
        </div>
      </section>

      <HorizonDivider position={0.5} />

      {/* EXPLORE AREAS */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <p className="text-xs uppercase tracking-wide text-terracotta">
          {t("areas.eyebrow")}
        </p>
        <h2 className="mb-8 mt-1 font-display text-3xl text-ink">
          {t("areas.title")}
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href="/resale-properties"
              className="group relative block h-40 overflow-hidden rounded-sm"
            >
              <img
                src={area.image}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={area.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <div className="font-display text-base">{area.name}</div>
                <div className="text-[11px] text-white/70">{area.blurb}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SELLING CTA */}
      <section id="seller" className="bg-ink text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8">
          <div>
            <p className="text-xs uppercase tracking-wide text-ochre">
              {t("seller.eyebrow")}
            </p>
            <h2 className="mt-2 font-display text-3xl">{t("seller.title")}</h2>
            <p className="mt-4 leading-relaxed text-white/70">
              {t("seller.body")}
            </p>
            <Link
              href="/seller-guide"
              className="mt-6 inline-block rounded-sm bg-ochre px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ochre-dark"
            >
              {t("seller.cta")}
            </Link>
          </div>
          <img
            src="https://picsum.photos/seed/selling-cta/1400/1000"
            className="h-72 w-full rounded-sm object-cover"
            alt=""
          />
        </div>
      </section>

      {/* BUYER GUIDE */}
      <section
        id="buyer"
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8"
      >
        <img
          src="https://picsum.photos/seed/buyer-guide/1400/1000"
          className="order-2 h-72 w-full rounded-sm object-cover md:order-1"
          alt=""
        />
        <div className="order-1 md:order-2">
          <p className="text-xs uppercase tracking-wide text-terracotta">
            {t("buyer.eyebrow")}
          </p>
          <h2 className="mt-2 font-display text-3xl text-ink">
            {t("buyer.title")}
          </h2>
          <p className="mt-4 leading-relaxed text-ink/70">{t("buyer.body")}</p>
          <Link
            href="/buyer-guide"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-terracotta"
          >
            {t("buyer.cta")} <ChevronRight size={15} />
          </Link>
        </div>
      </section>

      <HorizonDivider position={0.85} />

      {/* NEWS TEASER */}
      <section
        id="developments"
        className="mx-auto max-w-7xl px-5 py-16 md:px-8"
      >
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-terracotta">
              {t("news.eyebrow")}
            </p>
            <h2 className="mt-1 font-display text-3xl text-ink">
              {t("news.title")}
            </h2>
          </div>
          <Link
            href="/news"
            className="hidden text-sm text-ink/70 md:block"
          >
            {t("news.all")}
          </Link>
        </div>
        <NewsTeaser />
      </section>
    </>
  );
}

async function NewsTeaser() {
  const t = await getTranslations("News.articles");
  const articles = [
    { tag: t("a1Tag"), title: t("a1Title"), seed: "news-developments" },
    { tag: t("a2Tag"), title: t("a2Title"), seed: "news-nie" },
    { tag: t("a3Tag"), title: t("a3Title"), seed: "news-estepona" },
  ];
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {articles.map((a) => (
        <Link key={a.title} href="/news" className="group block">
          <div className="mb-3 h-40 overflow-hidden rounded-sm">
            <img
              src={`https://picsum.photos/seed/${a.seed}/1000/600`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt=""
            />
          </div>
          <p className="text-xs uppercase tracking-wide text-terracotta">
            {a.tag}
          </p>
          <h3 className="mt-1 font-display text-lg leading-snug text-ink">
            {a.title}
          </h3>
        </Link>
      ))}
    </div>
  );
}
