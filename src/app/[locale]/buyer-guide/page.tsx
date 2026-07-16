import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageIntro } from "@/components/page-intro";
import { HorizonDivider } from "@/components/horizon-rule";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BuyerGuide" });
  return { title: t("title"), description: t("intro") };
}

export default async function BuyerGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("BuyerGuide");

  const steps = ["s1", "s2", "s3", "s4", "s5"] as const;

  return (
    <>
      <PageIntro eyebrow={t("eyebrow")} title={t("title")} subtitle={t("intro")} />
      <HorizonDivider position={0.2} />
      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8">
        <ol className="flex flex-col gap-8">
          {steps.map((s) => (
            <li key={s}>
              <h2 className="font-display text-xl text-ink">
                {t(`steps.${s}Title`)}
              </h2>
              <p className="mt-2 leading-relaxed text-ink/70">
                {t(`steps.${s}Body`)}
              </p>
            </li>
          ))}
        </ol>
        <Link
          href="/contact"
          className="mt-10 inline-block rounded-sm bg-ink px-6 py-2.5 text-sm text-white transition-colors hover:bg-ink-deep"
        >
          {t("cta")}
        </Link>
      </section>
    </>
  );
}
