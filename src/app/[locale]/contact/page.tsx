import { getTranslations, setRequestLocale } from "next-intl/server";
import { Phone, Mail, MapPin } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { EnquiryForm } from "@/components/enquiry-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  return (
    <>
      <PageIntro eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-10 pb-20 md:grid-cols-2 md:px-8">
        <div className="flex flex-col gap-6 text-sm text-ink/75">
          {/* Placeholder details — replace once confirmed (brief §8) */}
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-terracotta" />
            <span>
              <span className="text-ink/50">{t("phoneLabel")}:</span> +34 000 000 000
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-terracotta" />
            <span>
              <span className="text-ink/50">{t("emailLabel")}:</span> hello@theshoreestates.com
            </span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-terracotta" />
            <span>
              <span className="text-ink/50">{t("officeLabel")}:</span> {t("office")}
            </span>
          </div>
          <div className="mt-2 flex h-64 items-center justify-center rounded-sm border border-ink/10 bg-ink/5 text-sm text-ink/40">
            <MapPin size={18} className="mr-2" /> {t("office")}
          </div>
        </div>
        <div className="rounded-sm border border-ink/10 bg-white p-6">
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
