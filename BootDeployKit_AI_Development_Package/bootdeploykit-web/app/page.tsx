import { DeploymentWizard } from "@/components/generator/DeploymentWizard";
import { FAQSection } from "@/components/seo/FAQSection";
import { HowToSection } from "@/components/seo/HowToSection";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMetadata(
  "Spring Boot Docker Deployment Generator",
  "Generate production-ready Dockerfile, docker-compose.yml, Nginx config, MySQL, Redis, Nacos and Spring Boot application.yml files online."
);

export default function HomePage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-8">
      <section className="grid gap-5 py-4">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-accent">Spring Boot deployment generator</p>
          <h1 className="mt-3 text-4xl font-bold tracking-normal md:text-5xl">Spring Boot Docker Deployment Generator</h1>
          <p className="mt-4 text-lg leading-8 text-slate-700">
            Generate Dockerfile, docker-compose.yml, Nginx config, MySQL, Redis, Nacos and production Spring Boot YAML files without stitching templates by hand.
          </p>
        </div>
        <Link className="inline-flex h-11 w-fit items-center rounded-md bg-accent px-5 text-sm font-semibold text-white hover:bg-teal-800" href="#generator">
          Generate Deployment Files
        </Link>
      </section>

      <section id="generator">
        <DeploymentWizard />
      </section>

      <HowToSection />
      <RelatedTools />
      <FAQSection />
    </div>
  );
}
