import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("Nav");
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-5 py-32 text-center md:px-8">
      <p className="font-display text-6xl text-ink">404</p>
      <p className="mt-4 text-ink/60">
        The page you are looking for could not be found.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-sm bg-ink px-6 py-2.5 text-sm text-white transition-colors hover:bg-ink-deep"
      >
        {t("home")}
      </Link>
    </section>
  );
}
