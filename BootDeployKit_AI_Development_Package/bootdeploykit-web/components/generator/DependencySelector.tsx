"use client";

import { useI18n } from "@/components/i18n/LanguageProvider";
import type { GenerateRequest } from "@/types/generator";

interface Props {
  request: GenerateRequest;
  onChange: (request: GenerateRequest) => void;
}

export function DependencySelector({ request, onChange }: Props) {
  const { t } = useI18n();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="flex items-center gap-3 rounded-md border border-line bg-white p-3 text-sm font-medium">
        <input
          type="checkbox"
          checked={request.database.enabled}
          onChange={(event) => onChange({ ...request, database: { ...request.database, enabled: event.target.checked } })}
        />
        {t("mysql")}
      </label>
      <label className="flex items-center gap-3 rounded-md border border-line bg-white p-3 text-sm font-medium">
        <input
          type="checkbox"
          checked={request.redis.enabled}
          onChange={(event) => onChange({ ...request, redis: { ...request.redis, enabled: event.target.checked } })}
        />
        {t("redis")}
      </label>
      {request.database.enabled && (
        <>
          <Field label={t("databaseName")} value={request.database.databaseName} onChange={(value) => onChange({ ...request, database: { ...request.database, databaseName: value } })} />
          <Field label={t("dbUser")} value={request.database.username} onChange={(value) => onChange({ ...request, database: { ...request.database, username: value } })} />
          <Field label={t("dbPassword")} value={request.database.password} onChange={(value) => onChange({ ...request, database: { ...request.database, password: value } })} />
          <Field label={t("rootPassword")} value={request.database.rootPassword} onChange={(value) => onChange({ ...request, database: { ...request.database, rootPassword: value } })} />
          <Field label={t("mysqlPort")} type="number" value={request.database.port} onChange={(value) => onChange({ ...request, database: { ...request.database, port: Number(value) } })} />
        </>
      )}
      {request.redis.enabled && (
        <>
          <Field label={t("redisPort")} type="number" value={request.redis.port} onChange={(value) => onChange({ ...request, redis: { ...request.redis, port: Number(value) } })} />
          <Field label={t("redisPassword")} value={request.redis.password} onChange={(value) => onChange({ ...request, redis: { ...request.redis, password: value } })} />
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
