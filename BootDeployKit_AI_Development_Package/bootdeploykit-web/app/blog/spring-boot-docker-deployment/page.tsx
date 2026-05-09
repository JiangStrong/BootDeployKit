import { RelatedTools } from "@/components/seo/RelatedTools";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "How to Deploy a Spring Boot Application with Docker",
  "A practical Spring Boot Docker deployment guide covering Dockerfile, Compose, logs, environment variables and common mistakes.",
  "/blog/spring-boot-docker-deployment"
);

export default function BlogPage() {
  return (
    <article className="mx-auto grid max-w-4xl gap-7 px-4 py-8">
      <h1 className="text-4xl font-bold tracking-normal">How to Deploy a Spring Boot Application with Docker</h1>
      <p className="text-lg leading-8 text-slate-700">
        A reliable Spring Boot Docker deployment usually needs more than a Dockerfile. You also need environment variables, log volume mapping, restart policy, service dependencies and a repeatable startup script.
      </p>
      <section className="grid gap-3">
        <h2 className="text-2xl font-semibold">Minimal Dockerfile</h2>
        <pre className="rounded-md bg-[#111827] p-4 text-sm text-slate-100"><code>{`FROM eclipse-temurin:17-jre
WORKDIR /app
COPY demo-api.jar app.jar
ENV SPRING_PROFILES_ACTIVE=prod
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`}</code></pre>
      </section>
      <section className="grid gap-3">
        <h2 className="text-2xl font-semibold">Docker Compose Checklist</h2>
        <ul className="list-disc space-y-2 pl-5 leading-7 text-slate-700">
          <li>Use an explicit container name and restart policy.</li>
          <li>Map host log directories into `/app/logs`.</li>
          <li>Keep secrets in `.env`, not in committed Compose files.</li>
          <li>Use service names such as `mysql` and `redis` inside Docker networks.</li>
        </ul>
      </section>
      <section className="grid gap-3">
        <h2 className="text-2xl font-semibold">Common Mistakes</h2>
        <p className="leading-7 text-slate-700">
          The most frequent issues are wrong JAR names, missing production profiles, exposing database ports publicly, and using `localhost` from inside containers when the app should connect to another Compose service.
        </p>
      </section>
      <RelatedTools />
    </article>
  );
}
