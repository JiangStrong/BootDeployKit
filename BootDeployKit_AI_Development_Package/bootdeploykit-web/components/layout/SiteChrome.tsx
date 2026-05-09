"use client";

import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useI18n } from "@/components/i18n/LanguageProvider";
import Link from "next/link";
import type { ReactNode } from "react";

export function SiteChrome({ children }: { children: ReactNode }) {
  const { t } = useI18n();

  return (
    <>
      <header className="border-b border-line bg-white">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <Link href="/" className="text-lg font-bold tracking-normal">
            BootDeployKit
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-700">
            <Link href="/tools/spring-boot-docker-generator">{t("navDockerfile")}</Link>
            <Link href="/tools/docker-compose-spring-boot-mysql-redis">{t("navCompose")}</Link>
            <Link href="/tools/spring-boot-nginx-generator">{t("navNginx")}</Link>
            <Link href="/tools/spring-cloud-nacos-generator">{t("navNacos")}</Link>
            <Link href="/blog/spring-boot-docker-deployment">{t("navGuide")}</Link>
            <LanguageSwitcher />
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="border-t border-line bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-4 py-6 text-sm text-slate-600">
          <span>BootDeployKit - {t("footer")}</span>
          <div className="flex gap-4">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
