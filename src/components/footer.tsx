import { getTranslations } from "next-intl/server";
import { Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/config/nav";
import { areas } from "@/data/areas";
import { NewsletterButton } from "@/components/newsletter-button";

export async function Footer() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const tContact = await getTranslations("Contact");

  // Static year — replace with a real value when contact details are confirmed
  // (brief §8 open question). Kept constant to preserve static rendering.
  const year = 2026;

  return (
    <footer id="contact" className="bg-ink-deep text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <div className="font-display text-xl">The Shore Estates</div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            {t("tagline")}
          </p>
          <NewsletterButton />
        </div>

        <div>
          <div className="mb-3 text-xs uppercase tracking-wide text-white/50">
            {t("navigate")}
          </div>
          <div className="flex flex-col gap-2 text-sm text-white/70">
            {navItems.map((item) => (
              <Link key={item.key} href={item.href} className="hover:text-white">
                {tNav(item.key)}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 text-xs uppercase tracking-wide text-white/50">
            {t("popularAreas")}
          </div>
          <div className="flex flex-col gap-2 text-sm text-white/70">
            {areas.slice(0, 6).map((area) => (
              <Link
                key={area.slug}
                href="/resale-properties"
                className="hover:text-white"
              >
                {area.name}
              </Link>
            ))}
          </div>
          <div className="mb-2 mt-6 text-xs uppercase tracking-wide text-white/50">
            {t("contact")}
          </div>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Phone size={14} /> {tContact("phoneLabel")}: +34 000 000 000
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        {t("rights", { year })} · {t("privacy")} · {t("terms")}
      </div>
    </footer>
  );
}
