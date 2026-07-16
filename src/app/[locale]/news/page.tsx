import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "News" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("News");
  const ta = await getTranslations("News.articles");

  const articles = [
    { tag: ta("a1Tag"), title: ta("a1Title"), excerpt: ta("a1Excerpt"), seed: "news-developments" },
    { tag: ta("a2Tag"), title: ta("a2Title"), excerpt: ta("a2Excerpt"), seed: "news-nie" },
    { tag: ta("a3Tag"), title: ta("a3Title"), excerpt: ta("a3Excerpt"), seed: "news-estepona" },
  ];

  return (
    <>
      <PageIntro eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {articles.map((a) => (
            <article key={a.title} className="group flex flex-col">
              <div className="mb-4 h-48 overflow-hidden rounded-sm">
                <img
                  src={`https://picsum.photos/seed/${a.seed}/1000/600`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt=""
                />
              </div>
              <p className="text-xs uppercase tracking-wide text-terracotta">
                {a.tag}
              </p>
              <h2 className="mt-1 font-display text-xl leading-snug text-ink">
                {a.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">
                {a.excerpt}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-terracotta">
                {t("readMore")} <ChevronRight size={15} />
              </span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
