"use client";

import { useI18n } from "@/components/i18n/LanguageProvider";
import type { GenerateRequest } from "@/types/generator";

interface Props {
  request: GenerateRequest;
  onChange: (request: GenerateRequest) => void;
}

export function NginxForm({ request, onChange }: Props) {
  const { t } = useI18n();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="flex items-center gap-3 rounded-md border border-line bg-white p-3 text-sm font-medium">
        <input
          type="checkbox"
          checked={request.nginx.enabled}
          onChange={(event) => onChange({ ...request, nginx: { ...request.nginx, enabled: event.target.checked } })}
        />
        {t("includeNginx")}
      </label>
      {request.nginx.enabled && (
        <label className="grid gap-1 text-sm font-medium">
          {t("domain")}
          <input
            className="h-10 rounded-md border border-line bg-white px-3"
            value={request.nginx.domain}
            onChange={(event) => onChange({ ...request, nginx: { ...request.nginx, domain: event.target.value } })}
          />
        </label>
      )}
    </div>
  );
}
