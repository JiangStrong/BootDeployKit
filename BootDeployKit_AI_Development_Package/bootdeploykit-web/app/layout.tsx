import "@/app/globals.css";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { SiteChrome } from "@/components/layout/SiteChrome";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://bootdeploykit.com"),
  title: {
    default: "Spring Boot Docker Deployment Generator | BootDeployKit",
    template: "%s | BootDeployKit"
  },
  description: "Generate production-ready Dockerfile, docker-compose.yml, Nginx config, MySQL, Redis, Nacos and Spring Boot application.yml files online."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <LanguageProvider>
          <SiteChrome>{children}</SiteChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
