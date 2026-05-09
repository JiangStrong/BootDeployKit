# BootDeployKit

BootDeployKit is a Spring Boot Docker Deployment Generator. It includes:

- `bootdeploykit-api`: Spring Boot 3 + Java 17 + FreeMarker generator API
- `bootdeploykit-web`: Next.js App Router + TypeScript + Tailwind SEO tool site

## Run API

```bash
cd bootdeploykit-api
mvn spring-boot:run
```

API endpoints:

- `GET /health`
- `GET /api/v1/templates`
- `POST /api/v1/generate/preview`
- `POST /api/v1/generate/download`

## Run Web

```bash
cd bootdeploykit-web
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

If you run the API on a different port, set:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8081
```
