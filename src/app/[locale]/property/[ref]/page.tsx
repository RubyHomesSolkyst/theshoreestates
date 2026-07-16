import { getTranslations, setRequestLocale } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { Bed, Bath, Ruler, MapPin, ChevronLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { EnquiryForm } from "@/components/enquiry-form";
import {
  getProperty,
  properties,
  formatPrice,
} from "@/data/properties";

export function generateStaticParams() {
  return properties.map((p) => ({ ref: p.ref }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; ref: string }>;
}) {
  const { ref } = await params;
  const property = getProperty(ref);
  if (!property) return {};
  return {
    title: `${property.location} ${property.subtype}`,
    description: property.descriptionEn,
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; ref: string }>;
}) {
  const { locale, ref } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("PropertyDetail");
  const property = getProperty(ref);

  if (!property) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-24 text-center md:px-8">
        <h1 className="font-display text-3xl text-ink">
          {t("notFoundTitle")}
        </h1>
        <p className="mt-3 text-ink/60">{t("notFoundBody")}</p>
        <Link
          href="/resale-properties"
          className="mt-6 inline-block rounded-sm bg-ink px-6 py-2.5 text-sm text-white"
        >
          {t("backToList")}
        </Link>
      </section>
    );
  }

  const currentLocale = await getLocale();

  const specs: [string, string][] = [
    [t("spec.type"), property.subtype],
    [t("spec.location"), property.location],
    [t("spec.beds"), String(property.beds)],
    [t("spec.baths"), String(property.baths)],
    [t("spec.built"), `${property.builtM2} m²`],
    [t("spec.terrace"), `${property.terraceM2} m²`],
    ...(property.plotM2
      ? ([[t("spec.plot"), `${property.plotM2} m²`]] as [string, string][])
      : []),
    [t("spec.reference"), property.ref],
  ];

  return (
    <article className="mx-auto max-w-5xl px-5 py-12 md:px-8">
      <Link
        href="/resale-properties"
        className="inline-flex items-center gap-1 text-sm text-ink/70 hover:text-ink"
      >
        <ChevronLeft size={15} /> {t("backToList")}
      </Link>

      <div className="mt-4 overflow-hidden rounded-sm">
        <img
          src={property.images[0]}
          alt={`${property.subtype} in ${property.location}`}
          className="h-[420px] w-full object-cover"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1 text-sm text-ink/60">
            <MapPin size={14} /> {property.location}
          </div>
          <h1 className="mt-1 font-display text-3xl text-ink">
            {property.location} {property.subtype}
          </h1>
          <div className="mt-3 flex items-center gap-5 text-sm text-ink/70">
            <span className="flex items-center gap-1">
              <Bed size={15} /> {property.beds}
            </span>
            <span className="flex items-center gap-1">
              <Bath size={15} /> {property.baths}
            </span>
            <span className="flex items-center gap-1">
              <Ruler size={15} /> {property.builtM2} m²
            </span>
          </div>
        </div>
        <div className="font-display text-3xl text-ink">
          {formatPrice(property.price, property.currency, currentLocale)}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="font-display text-2xl text-ink">{t("overview")}</h2>
          <p className="mt-3 leading-relaxed text-ink/70">
            {property.descriptionEn}
          </p>

          <h2 className="mt-8 font-display text-2xl text-ink">
            {t("features")}
          </h2>
          <dl className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {specs.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between border-b border-ink/10 py-2"
              >
                <dt className="text-ink/60">{label}</dt>
                <dd className="font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="rounded-sm border border-ink/10 bg-white p-5">
          <h2 className="font-display text-xl text-ink">{t("enquire")}</h2>
          <p className="mt-2 text-sm text-ink/60">
            {t("enquiryIntro", { ref: property.ref })}
          </p>
          <EnquiryForm />
        </aside>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-2xl text-ink">{t("location")}</h2>
        <div className="mt-3 flex h-64 items-center justify-center rounded-sm border border-ink/10 bg-ink/5 text-sm text-ink/40">
          <MapPin size={18} className="mr-2" /> {property.location}, Costa del Sol
        </div>
      </div>
    </article>
  );
}
