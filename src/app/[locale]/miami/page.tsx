import { getTranslations, setRequestLocale } from "next-intl/server";
import { MarketHub } from "@/components/market-hub";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MarketHub" });
  const tr = await getTranslations({ locale, namespace: "Regions" });
  return { title: tr("miami"), description: t("miamiIntro") };
}

export default async function MiamiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("MarketHub");
  const tr = await getTranslations("Regions");

  return (
    <MarketHub
      name={tr("miami")}
      image="/images/placeholder-watermarked/miami-1.jpg"
      intro={t("miamiIntro")}
    />
  );
}
