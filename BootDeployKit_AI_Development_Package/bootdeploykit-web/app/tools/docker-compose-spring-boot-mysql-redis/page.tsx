import { DeploymentWizard } from "@/components/generator/DeploymentWizard";
import { FAQSection } from "@/components/seo/FAQSection";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Docker Compose Generator for Spring Boot, MySQL and Redis",
  "Generate docker-compose.yml for Spring Boot with MySQL, Redis, volumes, environment variables and startup scripts.",
  "/tools/docker-compose-spring-boot-mysql-redis"
);

export default function Page() {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8">
      <section className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-normal">Docker Compose Generator for Spring Boot + MySQL + Redis</h1>
        <p className="mt-3 text-lg leading-8 text-slate-700">Generate a Compose stack with a Spring Boot app, MySQL, Redis, health checks and persistent volumes.</p>
      </section>
      <DeploymentWizard initialTemplate="SPRING_BOOT_MYSQL_REDIS" />
      <FAQSection />
      <RelatedTools />
    </div>
  );
}
