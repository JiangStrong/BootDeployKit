import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Privacy Policy", "BootDeployKit privacy policy for generated deployment configuration.", "/privacy");

export default function PrivacyPage() {
  return (
    <div className="mx-auto grid max-w-3xl gap-4 px-4 py-8">
      <h1 className="text-4xl font-bold tracking-normal">Privacy Policy</h1>
      <p className="leading-7 text-slate-700">BootDeployKit uses submitted configuration only to generate preview files or ZIP downloads. The MVP does not store generated passwords, uploaded files or project history.</p>
      <p className="leading-7 text-slate-700">Do not submit production secrets unless you are running a trusted self-hosted instance.</p>
    </div>
  );
}
