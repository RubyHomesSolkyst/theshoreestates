"use client";

import { useLocale, useTranslations } from "next-intl";
import { Star, Bed, Bath, Ruler, MapPin, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useFavorites } from "@/components/favorites-context";
import { formatPrice, type Property } from "@/data/properties";

export function PropertyCard({ property }: { property: Property }) {
  const t = useTranslations("Property");
  const locale = useLocale();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(property.id);

  return (
    <div className="group flex flex-col overflow-hidden rounded-sm border border-ink/10 bg-white transition-colors hover:border-ink/25">
      <div className="relative overflow-hidden">
        <img
          src={property.images[0]}
          alt={`${property.subtype} in ${property.location}`}
          className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={() => toggleFavorite(property.id)}
          aria-label={favorite ? t("removeFavorite") : t("addFavorite")}
          aria-pressed={favorite}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/40 backdrop-blur-sm transition-colors hover:bg-ink/60"
        >
          <Star
            size={16}
            className={favorite ? "fill-ochre text-ochre" : "text-white"}
          />
        </button>
        {property.tag && (
          <span className="absolute left-3 top-3 rounded-sm bg-terracotta px-2.5 py-1 text-[11px] uppercase tracking-wide text-white">
            {t(`tags.${property.tag}`)}
          </span>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-sm bg-ink/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
          <MapPin size={12} />
          {property.location}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg leading-snug text-ink">
          {property.location} {property.subtype}
        </h3>

        <div className="mt-2 flex items-center gap-4 text-sm text-ink/70">
          <span className="flex items-center gap-1">
            <Bed size={14} /> {property.beds}
          </span>
          <span className="flex items-center gap-1">
            <Bath size={14} /> {property.baths}
          </span>
          <span className="flex items-center gap-1">
            <Ruler size={14} /> {property.builtM2} m²
          </span>
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
          {property.descriptionEn}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
          <span className="font-display text-xl text-ink">
            {formatPrice(property.price, property.currency, locale)}
          </span>
          <Link
            href={`/property/${property.ref}`}
            className="flex items-center gap-1 text-sm font-medium text-terracotta transition-all hover:gap-2"
          >
            {t("viewDetails")} <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
