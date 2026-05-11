# BootDeployKit

BootDeployKit is a Spring Boot Docker Deployment Generator. It includes:

- `bootdeploykit-web`: Next.js App Router + TypeScript + Tailwind generator site. The generator runs in the browser and can be deployed directly to Vercel.
- `bootdeploykit-api`: legacy Spring Boot 3 + Java 17 + FreeMarker generator API, kept for reference/self-hosting.

## Run Web

```bash
cd bootdeploykit-web
npm install
npm run dev
```

Open `http://localhost:3000`.

No backend API URL is required for the default web app.

## Deploy Web To Vercel

Use these project settings:

- Root Directory: `bootdeploykit-web`
- Framework Preset: `Next.js`
- Build Command: `npm run build`
- Install Command: `npm install`

No `NEXT_PUBLIC_API_BASE_URL` environment variable is needed.

## Run Legacy API

```bash
cd bootdeploykit-api
mvn spring-boot:run
```

API endpoints:

- `GET /health`
- `GET /api/v1/templates`
- `POST /api/v1/generate/preview`
- `POST /api/v1/generate/download`
