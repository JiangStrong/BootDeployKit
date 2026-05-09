import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Contact", "Contact BootDeployKit for feedback, template requests and deployment generator improvements.", "/contact");

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-3xl gap-4 px-4 py-8">
      <h1 className="text-4xl font-bold tracking-normal">Contact</h1>
      <p className="leading-7 text-slate-700">For feedback, template requests or commercial customization, contact the BootDeployKit team at hello@bootdeploykit.com.</p>
    </div>
  );
}
