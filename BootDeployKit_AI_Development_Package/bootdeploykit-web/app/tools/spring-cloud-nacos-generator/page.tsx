import { DeploymentWizard } from "@/components/generator/DeploymentWizard";
import { FAQSection } from "@/components/seo/FAQSection";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Spring Cloud Nacos Docker Compose Generator",
  "Generate Docker Compose and Spring Cloud configuration for Nacos-backed Spring Boot services.",
  "/tools/spring-cloud-nacos-generator"
);

export default function Page() {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8">
      <section className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-normal">Spring Cloud Nacos Docker Compose Generator</h1>
        <p className="mt-3 text-lg leading-8 text-slate-700">Generate a Spring Cloud Gateway or service deployment package with standalone Nacos.</p>
      </section>
      <DeploymentWizard initialTemplate="SPRING_CLOUD_NACOS" />
      <FAQSection />
      <RelatedTools />
    </div>
  );
}
