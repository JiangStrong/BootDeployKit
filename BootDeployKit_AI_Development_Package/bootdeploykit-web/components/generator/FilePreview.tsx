"use client";

import { useI18n } from "@/components/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n";
import type { GeneratedFile } from "@/types/generator";
import { Check, Clipboard, FileCode, Files } from "lucide-react";
import { useState } from "react";

const copyLabels = {
  en: {
    copyFile: "Copy file",
    copyAll: "Copy all",
    copied: "Copied"
  },
  zh: {
    copyFile: "复制文件",
    copyAll: "复制全部",
    copied: "已复制"
  },
  ja: {
    copyFile: "ファイルをコピー",
    copyAll: "すべてコピー",
    copied: "コピー済み"
  },
  ko: {
    copyFile: "파일 복사",
    copyAll: "전체 복사",
    copied: "복사됨"
  }
} satisfies Record<Locale, Record<string, string>>;

export function FilePreview({ files }: { files: GeneratedFile[] }) {
  const { locale, t } = useI18n();
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState<"file" | "all" | null>(null);
  const file = files[active];
  const labels = copyLabels[locale];

  async function copyText(value: string, target: "file" | "all") {
    await navigator.clipboard.writeText(value);
    setCopied(target);
    window.setTimeout(() => setCopied(null), 1600);
  }

  const allFiles = files
    .map((item) => `# ${item.path}\n\n${item.content}`)
    .join("\n\n---\n\n");

  if (!file) {
    return (
      <div className="rounded-md border border-dashed border-line bg-white p-6 text-sm text-slate-600">
        {t("emptyPreview")}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-line bg-white shadow-panel">
      <div className="flex min-h-12 flex-wrap items-center justify-between gap-2 border-b border-line p-2">
        <div className="flex flex-wrap items-center gap-2">
          {files.map((item, index) => (
            <button
              key={item.path}
              className={`inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm ${active === index ? "bg-ink text-white" : "bg-paper text-ink hover:bg-slate-100"}`}
              onClick={() => setActive(index)}
              title={item.path}
            >
              <FileCode size={16} />
              {item.path}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="h-9 px-3"
            onClick={() => copyText(file.content, "file")}
            type="button"
            variant="secondary"
          >
            {copied === "file" ? <Check size={16} /> : <Clipboard size={16} />}
            {copied === "file" ? labels.copied : labels.copyFile}
          </Button>
          <Button
            className="h-9 px-3"
            onClick={() => copyText(allFiles, "all")}
            type="button"
            variant="secondary"
          >
            {copied === "all" ? <Check size={16} /> : <Files size={16} />}
            {copied === "all" ? labels.copied : labels.copyAll}
          </Button>
        </div>
      </div>
      <pre className="max-h-[560px] overflow-auto bg-[#111827] p-4 text-sm leading-6 text-slate-100">
        <code>{file.content}</code>
      </pre>
    </div>
  );
}
