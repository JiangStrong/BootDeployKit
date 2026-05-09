import type { GenerateRequest, PreviewResponse } from "@/types/generator";

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://192.168.1.50:8081").replace(/\/$/, "");

export async function previewDeployment(request: GenerateRequest): Promise<PreviewResponse> {
  const response = await requestApi(`${apiBaseUrl}/api/v1/generate/preview`, request);

  if (!response.ok) {
    throw new Error(await readError(response));
  }
  return response.json();
}

export async function downloadDeployment(request: GenerateRequest): Promise<Blob> {
  const response = await requestApi(`${apiBaseUrl}/api/v1/generate/download`, request);

  if (!response.ok) {
    throw new Error(await readError(response));
  }
  return response.blob();
}

async function requestApi(url: string, request: GenerateRequest) {
  try {
    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request)
    });
  } catch {
    throw new Error(`Cannot connect to BootDeployKit API at ${apiBaseUrl}. Start the backend or update NEXT_PUBLIC_API_BASE_URL.`);
  }
}

async function readError(response: Response) {
  try {
    const body = await response.json();
    return body.message ?? "Request failed";
  } catch {
    return "Request failed";
  }
}
