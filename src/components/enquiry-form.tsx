"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Placeholder enquiry form. Submits nothing yet — wire up to an email/CRM
 * endpoint once contact details and provider are confirmed (brief §8).
 */
export function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("Contact.form");
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    "w-full rounded-sm border border-ink/20 px-3 py-2 text-sm focus:border-ink/50 focus:outline-none";

  if (submitted) {
    return (
      <p className="mt-4 rounded-sm bg-ink/5 p-4 text-sm text-ink/70">
        {t("submit")} ✓
      </p>
    );
  }

  return (
    <form
      className={compact ? "mt-4 flex flex-col gap-3" : "mt-5 flex flex-col gap-3"}
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <input className={inputClass} placeholder={t("name")} required />
      <input
        type="email"
        className={inputClass}
        placeholder={t("email")}
        required
      />
      <input className={inputClass} placeholder={t("phone")} />
      <textarea
        className={inputClass}
        placeholder={t("message")}
        rows={compact ? 3 : 4}
      />
      <button
        type="submit"
        className="rounded-sm bg-terracotta py-2.5 text-sm text-white transition-colors hover:bg-terracotta-dark"
      >
        {t("submit")}
      </button>
    </form>
  );
}
