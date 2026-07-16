import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageIntro } from "@/components/page-intro";
import { HorizonDivider } from "@/components/horizon-rule";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return { title: t("title"), description: t("body") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const th = await getTranslations("Home.trustBar");

  const stats: [string, string][] = [
    ["€500M+", th("salesVolume")],
    [th("localExpertiseValue"), th("localExpertise")],
    ["100%", th("englishSupport")],
  ];

  return (
    <>
      <PageIntro eyebrow={t("eyebrow")} title={t("title")} />
      <section className="mx-auto max-w-3xl px-5 pb-6 md:px-8">
        <p className="text-lg leading-relaxed text-ink/70">{t("body")}</p>
      </section>
      <HorizonDivider position={0.4} />
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <h2 className="mb-8 font-display text-2xl text-ink">
          {t("statsTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          {stats.map(([value, label]) => (
            <div key={label}>
              <div className="font-display text-3xl text-ink">{value}</div>
              <div className="mt-1 text-sm text-ink/60">{label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
