"use client";

import { DownloadButton } from "@/components/generator/DownloadButton";
import { FilePreview } from "@/components/generator/FilePreview";
import { NacosForm } from "@/components/generator/NacosForm";
import { NginxForm } from "@/components/generator/NginxForm";
import { ProjectForm } from "@/components/generator/ProjectForm";
import { DependencySelector } from "@/components/generator/DependencySelector";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { previewDeployment } from "@/lib/api";
import { defaultRequest, templates } from "@/lib/constants";
import { templateCopy } from "@/lib/i18n";
import type { GenerateRequest, GeneratedFile, TemplateType } from "@/types/generator";
import { Eye, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";

export function DeploymentWizard({ initialTemplate = "SPRING_BOOT_MYSQL_REDIS" }: { initialTemplate?: TemplateType }) {
  const { locale, t } = useI18n();
  const [request, setRequest] = useState<GenerateRequest>(() => ({
    ...defaultRequest,
    templateType: initialTemplate,
    database: { ...defaultRequest.database, enabled: initialTemplate === "SPRING_BOOT_MYSQL_REDIS" },
    redis: { ...defaultRequest.redis, enabled: initialTemplate === "SPRING_BOOT_MYSQL_REDIS" },
    nginx: { ...defaultRequest.nginx, enabled: initialTemplate === "SPRING_BOOT_NGINX" },
    nacos: { ...defaultRequest.nacos, enabled: initialTemplate === "SPRING_CLOUD_NACOS" }
  }));
  const [files, setFiles] = useState<GeneratedFile[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedTemplate = useMemo(() => templateCopy[locale][request.templateType], [locale, request.templateType]);

  function changeTemplate(templateType: TemplateType) {
    setRequest({
      ...request,
      templateType,
      database: { ...request.database, enabled: templateType === "SPRING_BOOT_MYSQL_REDIS" },
      redis: { ...request.redis, enabled: templateType === "SPRING_BOOT_MYSQL_REDIS" },
      nginx: { ...request.nginx, enabled: templateType === "SPRING_BOOT_NGINX" },
      nacos: { ...request.nacos, enabled: templateType === "SPRING_CLOUD_NACOS" }
    });
  }

  async function preview() {
    setLoading(true);
    setError("");
    try {
      const response = await previewDeployment(request);
      setFiles(response.files);
    } catch (ex) {
      setError(ex instanceof Error ? ex.message : t("previewFailed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)]">
      <div className="rounded-md border border-line bg-white p-5 shadow-panel">
        <div className="mb-5">
          <h2 className="text-xl font-semibold">{t("generatorTitle")}</h2>
          <p className="mt-1 text-sm text-slate-600">{selectedTemplate?.description}</p>
        </div>

        <div className="grid gap-5">
          <label className="grid gap-1 text-sm font-medium">
            {t("template")}
            <select
              className="h-10 rounded-md border border-line bg-white px-3"
              value={request.templateType}
              onChange={(event) => changeTemplate(event.target.value as TemplateType)}
            >
              {templates.map((item) => (
                <option key={item.code} value={item.code}>
                  {templateCopy[locale][item.code].name}
                </option>
              ))}
            </select>
          </label>

          <ProjectForm request={request} onChange={setRequest} />
          <DependencySelector request={request} onChange={setRequest} />
          <NginxForm request={request} onChange={setRequest} />
          <NacosForm request={request} onChange={setRequest} />

          {error && <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

          <div className="flex flex-wrap gap-3">
            <Button onClick={preview} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" size={16} /> : <Eye size={16} />}
              {loading ? t("previewing") : t("previewFiles")}
            </Button>
            <DownloadButton request={request} onError={setError} />
          </div>
        </div>
      </div>

      <FilePreview files={files} />
    </section>
  );
}
