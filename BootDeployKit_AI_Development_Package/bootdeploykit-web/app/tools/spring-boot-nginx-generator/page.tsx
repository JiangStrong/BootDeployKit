import { DeploymentWizard } from "@/components/generator/DeploymentWizard";
import { FAQSection } from "@/components/seo/FAQSection";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Spring Boot Nginx Reverse Proxy Generator",
  "Generate Nginx reverse proxy config and Docker Compose files for a Spring Boot application.",
  "/tools/spring-boot-nginx-generator"
);

export default function Page() {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8">
      <section className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-normal">Spring Boot Nginx Reverse Proxy Generator</h1>
        <p className="mt-3 text-lg leading-8 text-slate-700">Create Nginx default.conf, Compose service wiring and production Spring Boot headers configuration.</p>
      </section>
      <DeploymentWizard initialTemplate="SPRING_BOOT_NGINX" />
      <FAQSection />
      <RelatedTools />
    </div>
  );
}
