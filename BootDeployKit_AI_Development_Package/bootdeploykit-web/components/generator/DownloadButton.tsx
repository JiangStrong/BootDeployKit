"use client";

import { useI18n } from "@/components/i18n/LanguageProvider";
import { downloadDeployment } from "@/lib/api";
import type { GenerateRequest } from "@/types/generator";
import { Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function DownloadButton({ request, onError }: { request: GenerateRequest; onError?: (message: string) => void }) {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const blob = await downloadDeployment(request);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${request.project.projectName}-deploy-package.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (ex) {
      onError?.(ex instanceof Error ? ex.message : "Download failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleDownload} disabled={loading}>
      <Download size={16} />
      {loading ? t("preparingZip") : t("downloadZip")}
    </Button>
  );
}
