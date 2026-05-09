"use client";

import { useI18n } from "@/components/i18n/LanguageProvider";
import { locales } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
      <span className="sr-only">{t("language")}</span>
      <select
        className="h-9 rounded-md border border-line bg-white px-2"
        value={locale}
        onChange={(event) => setLocale(event.target.value as typeof locale)}
        title={t("language")}
      >
        {locales.map((item) => (
          <option key={item.code} value={item.code}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
