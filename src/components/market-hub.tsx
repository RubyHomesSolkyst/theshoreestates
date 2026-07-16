import { getTranslations } from "next-intl/server";
import { Phone, Mail, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { EnquiryForm } from "@/components/enquiry-form";

/**
 * Simple market "hub" page (no property list yet) for a secondary market such
 * as Miami or Dubai: hero image, placeholder intro, a "listings coming soon"
 * banner, and a contact CTA reusing the shared enquiry form.
 */
export async function MarketHub({
  name,
  image,
  intro,
}: {
  name: string;
  image: string;
  intro: string;
}) {
  const t = await getTranslations("MarketHub");
  const tc = await getTranslations("Contact");

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-ochre">
            {t("eyebrow")}
          </p>
          <h1 className="font-display text-4xl text-white md:text-6xl">{name}</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            {intro}
          </p>
        </div>
      </section>

      {/* COMING SOON */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="flex items-start gap-3 rounded-sm border border-ochre/40 bg-ochre/10 p-5">
          <Clock size={20} className="mt-0.5 shrink-0 text-ochre-dark" />
          <div>
            <h2 className="font-display text-xl text-ink">
              {t("comingSoonTitle", { market: name })}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-ink/70">
              {t("comingSoonBody", { market: name })}
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 pb-20 md:grid-cols-2 md:px-8">
        <div>
          <h2 className="font-display text-3xl text-ink">
            {t("ctaTitle", { market: name })}
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-ink/70">
            {t("ctaBody", { market: name })}
          </p>
          {/* Same contact details as the rest of the site (placeholders — brief §8) */}
          <div className="mt-6 flex flex-col gap-3 text-sm text-ink/75">
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-terracotta" />
              <span>
                <span className="text-ink/50">{tc("phoneLabel")}:</span> +34 000 000 000
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-terracotta" />
              <span>
                <span className="text-ink/50">{tc("emailLabel")}:</span> hello@theshoreestates.com
              </span>
            </div>
          </div>
          <Link
            href="/"
            className="mt-8 inline-block text-sm font-medium text-terracotta hover:underline"
          >
            ← {t("backHome")}
          </Link>
        </div>
        <div className="rounded-sm border border-ink/10 bg-white p-6">
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
