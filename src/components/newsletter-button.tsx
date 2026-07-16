"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, X } from "lucide-react";

export function NewsletterButton() {
  const t = useTranslations("Newsletter");
  const tf = useTranslations("Footer");
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 inline-flex items-center gap-2 rounded-sm border border-white/25 px-4 py-2 text-sm transition-colors hover:bg-white/10"
      >
        <Mail size={15} /> {tf("subscribe")}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-5 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-sm bg-white p-8 text-center">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-ink/50 hover:text-ink"
              aria-label={t("close")}
            >
              <X size={18} />
            </button>
            <div className="font-display text-xl text-ink">{t("brand")}</div>
            <h3 className="mt-4 font-display text-2xl text-ink">{t("title")}</h3>
            <p className="mt-2 text-sm text-ink/60">{t("body")}</p>
            <form
              className="mt-5 flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
            >
              <input
                type="email"
                required
                placeholder={t("placeholder")}
                className="rounded-sm border border-ink/20 px-3 py-2 text-sm"
              />
              <button
                type="submit"
                className="rounded-sm bg-terracotta py-2 text-sm text-white transition-colors hover:bg-terracotta-dark"
              >
                {t("subscribe")}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
