import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageIntro } from "@/components/page-intro";
import { EnquiryForm } from "@/components/enquiry-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SellerGuide" });
  return { title: t("title"), description: t("intro") };
}

export default async function SellerGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SellerGuide");

  const points = ["p1", "p2", "p3"] as const;

  return (
    <>
      <PageIntro eyebrow={t("eyebrow")} title={t("title")} subtitle={t("intro")} />
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-14 md:grid-cols-2 md:px-8">
        <div className="flex flex-col gap-8">
          {points.map((p) => (
            <div key={p}>
              <h2 className="font-display text-xl text-ink">
                {t(`points.${p}Title`)}
              </h2>
              <p className="mt-2 leading-relaxed text-ink/70">
                {t(`points.${p}Body`)}
              </p>
            </div>
          ))}
        </div>
        <div className="rounded-sm border border-ink/10 bg-white p-6">
          <h2 className="font-display text-2xl text-ink">{t("formTitle")}</h2>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
