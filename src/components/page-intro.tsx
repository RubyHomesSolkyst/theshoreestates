export function PageIntro({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-4 pt-14 md:px-8">
      {eyebrow && (
        <p className="text-xs uppercase tracking-wide text-terracotta">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-1 font-display text-4xl text-ink">{title}</h1>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-ink/60">{subtitle}</p>
      )}
    </div>
  );
}
