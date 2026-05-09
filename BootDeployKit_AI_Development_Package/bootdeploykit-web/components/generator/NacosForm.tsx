"use client";

import { useI18n } from "@/components/i18n/LanguageProvider";
import type { GenerateRequest } from "@/types/generator";

interface Props {
  request: GenerateRequest;
  onChange: (request: GenerateRequest) => void;
}

export function NacosForm({ request, onChange }: Props) {
  const { t } = useI18n();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="flex items-center gap-3 rounded-md border border-line bg-white p-3 text-sm font-medium">
        <input
          type="checkbox"
          checked={request.nacos.enabled}
          onChange={(event) => onChange({ ...request, nacos: { ...request.nacos, enabled: event.target.checked } })}
        />
        {t("includeNacos")}
      </label>
      {request.nacos.enabled && (
        <>
          <Field label={t("nacosPort")} type="number" value={request.nacos.port} onChange={(value) => onChange({ ...request, nacos: { ...request.nacos, port: Number(value) } })} />
          <Field label={t("nacosUsername")} value={request.nacos.username} onChange={(value) => onChange({ ...request, nacos: { ...request.nacos, username: value } })} />
          <Field label={t("nacosPassword")} value={request.nacos.password} onChange={(value) => onChange({ ...request, nacos: { ...request.nacos, password: value } })} />
        </>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text"
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="grid gap-1 text-sm font-medium">
      {label}
      <input className="h-10 rounded-md border border-line bg-white px-3" type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
