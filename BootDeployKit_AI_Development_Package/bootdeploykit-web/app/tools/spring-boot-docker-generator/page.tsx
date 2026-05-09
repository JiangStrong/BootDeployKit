import { DeploymentWizard } from "@/components/generator/DeploymentWizard";
import { FAQSection } from "@/components/seo/FAQSection";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Spring Boot Dockerfile Generator",
  "Generate a production-ready Dockerfile, docker-compose.yml and application-prod.yml for a Spring Boot application.",
  "/tools/spring-boot-docker-generator"
);

export default function Page() {
  return <ToolPage title="Spring Boot Dockerfile Generator" description="Create a clean Docker deployment package for a single Spring Boot application." template="SPRING_BOOT_BASIC" />;
}

function ToolPage({ title, description, template }: { title: string; description: string; template: "SPRING_BOOT_BASIC" }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8">
      <section className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-normal">{title}</h1>
        <p className="mt-3 text-lg leading-8 text-slate-700">{description}</p>
      </section>
      <DeploymentWizard initialTemplate={template} />
      <FAQSection />
      <RelatedTools />
    </div>
  );
}
