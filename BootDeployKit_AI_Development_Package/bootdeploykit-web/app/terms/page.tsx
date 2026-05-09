import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Terms of Use", "BootDeployKit terms of use for generated Spring Boot deployment files.", "/terms");

export default function TermsPage() {
  return (
    <div className="mx-auto grid max-w-3xl gap-4 px-4 py-8">
      <h1 className="text-4xl font-bold tracking-normal">Terms of Use</h1>
      <p className="leading-7 text-slate-700">Generated files are provided as starting points. Review Docker, Nginx, database, firewall and TLS settings before production use.</p>
      <p className="leading-7 text-slate-700">You are responsible for validating the generated configuration against your application and infrastructure requirements.</p>
    </div>
  );
}
