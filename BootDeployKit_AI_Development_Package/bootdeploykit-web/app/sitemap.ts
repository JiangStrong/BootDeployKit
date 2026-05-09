import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/zh",
    "/ja",
    "/ko",
    "/tools/spring-boot-docker-generator",
    "/tools/docker-compose-spring-boot-mysql-redis",
    "/tools/spring-boot-nginx-generator",
    "/tools/spring-cloud-nacos-generator",
    "/blog/spring-boot-docker-deployment",
    "/privacy",
    "/terms",
    "/contact"
  ];

  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
    priority: path === "" ? 1 : 0.8
  }));
}
