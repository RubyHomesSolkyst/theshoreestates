import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageIntro } from "@/components/page-intro";
import { PropertyCard } from "@/components/property-card";
import { properties } from "@/data/properties";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DevelopmentsPage" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function NewDevelopmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("DevelopmentsPage");

  const listings = properties.filter((p) => p.status === "new-development");

  return (
    <>
      <PageIntro
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <p className="mb-6 text-sm text-ink/60">
          {t("resultsCount", { count: listings.length })}
        </p>
        {listings.length === 0 ? (
          <p className="text-ink/60">{t("noResults")}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
