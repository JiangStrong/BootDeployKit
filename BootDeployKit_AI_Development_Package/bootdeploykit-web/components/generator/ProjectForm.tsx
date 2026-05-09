"use client";

import { useI18n } from "@/components/i18n/LanguageProvider";
import { javaVersions } from "@/lib/constants";
import type { GenerateRequest } from "@/types/generator";

interface ProjectFormProps {
  request: GenerateRequest;
  onChange: (request: GenerateRequest) => void;
}

export function ProjectForm({ request, onChange }: ProjectFormProps) {
  const { t } = useI18n();
  const project = request.project;

  function update(key: keyof typeof project, value: string | number) {
    onChange({ ...request, project: { ...project, [key]: value } });
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label={t("projectName")} value={project.projectName} onChange={(value) => update("projectName", value)} />
      <Field label={t("jarFileName")} value={project.jarFileName} onChange={(value) => update("jarFileName", value)} />
      <label className="grid gap-1 text-sm font-medium">
        {t("javaVersion")}
        <select
          className="h-10 rounded-md border border-line bg-white px-3"
          value={project.javaVersion}
          onChange={(event) => update("javaVersion", event.target.value)}
        >
          {javaVersions.map((version) => (
            <option key={version} value={version}>
              {version}
            </option>
          ))}
        </select>
      </label>
      <Field label={t("serverPort")} type="number" value={project.serverPort} onChange={(value) => update("serverPort", Number(value))} />
      <Field label={t("springProfile")} value={project.springProfile} onChange={(value) => update("springProfile", value)} />
      <Field label={t("logPath")} value={project.logPath} onChange={(value) => update("logPath", value)} />
      <Field label={t("dockerNetwork")} value={project.dockerNetwork} onChange={(value) => update("dockerNetwork", value)} />
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
      <input
        className="h-10 rounded-md border border-line bg-white px-3"
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
