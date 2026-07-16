"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { areas } from "@/data/areas";

/**
 * The floating hero search panel. For now it navigates to the resale listing
 * page; wiring real query params is a follow-up once the MLS feed lands.
 */
export function SearchPanel() {
  const t = useTranslations("Home.search");
  const router = useRouter();
  const [minPrice, setMinPrice] = useState("Any");
  const [propType, setPropType] = useState("Any");
  const [beds, setBeds] = useState("Any");
  const [location, setLocation] = useState("all");

  function onSearch() {
    router.push("/resale-properties");
  }

  const fieldClass =
    "mt-1 w-full rounded-sm border border-ink/15 bg-white px-2 py-2 text-sm";
  const labelClass = "text-xs uppercase tracking-wide text-ink/60";

  return (
    <div className="grid grid-cols-2 items-end gap-4 rounded-sm bg-white p-5 shadow-xl md:grid-cols-5 md:p-6">
      <div className="col-span-2 md:col-span-1">
        <label className={labelClass}>{t("minPrice")}</label>
        <select
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className={fieldClass}
        >
          <option value="Any">{t("any")}</option>
          <option value="100000">€100,000</option>
          <option value="300000">€300,000</option>
          <option value="500000">€500,000</option>
          <option value="1000000">€1,000,000</option>
        </select>
      </div>

      <div className="col-span-2 md:col-span-1">
        <label className={labelClass}>{t("propertyType")}</label>
        <select
          value={propType}
          onChange={(e) => setPropType(e.target.value)}
          className={fieldClass}
        >
          <option value="Any">{t("any")}</option>
          <option value="apartment">{t("types.apartment")}</option>
          <option value="villa">{t("types.villa")}</option>
          <option value="penthouse">{t("types.penthouse")}</option>
          <option value="townhouse">{t("types.townhouse")}</option>
          <option value="plot">{t("types.plot")}</option>
        </select>
      </div>

      <div className="col-span-2 md:col-span-1">
        <label className={labelClass}>{t("bedrooms")}</label>
        <select
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
          className={fieldClass}
        >
          <option value="Any">{t("any")}</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>

      <div className="col-span-2 md:col-span-1">
        <label className={labelClass}>{t("location")}</label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={fieldClass}
        >
          <option value="all">{t("allAreas")}</option>
          {areas.map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={onSearch}
        className="col-span-2 flex items-center justify-center gap-2 rounded-sm bg-terracotta py-2.5 text-sm text-white transition-colors hover:bg-terracotta-dark md:col-span-1"
      >
        <Search size={16} /> {t("search")}
      </button>
    </div>
  );
}
