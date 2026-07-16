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
  return { title: tr("dubai"), description: t("dubaiIntro") };
}

export default async function DubaiPage({
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
      name={tr("dubai")}
      image="/images/placeholder-watermarked/dubai-1.jpg"
      intro={t("dubaiIntro")}
    />
  );
}
