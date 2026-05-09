import type { Metadata } from "next";

export function pageMetadata(title: string, description: string, path = ""): Metadata {
  const url = `https://bootdeploykit.com${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "BootDeployKit",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}
