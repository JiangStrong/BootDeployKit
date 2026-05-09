import Link from "next/link";

const links = [
  ["/tools/spring-boot-docker-generator", "Spring Boot Dockerfile Generator"],
  ["/tools/docker-compose-spring-boot-mysql-redis", "Docker Compose Spring Boot MySQL Redis"],
  ["/tools/spring-boot-nginx-generator", "Spring Boot Nginx Reverse Proxy Generator"],
  ["/tools/spring-cloud-nacos-generator", "Spring Cloud Nacos Generator"]
];

export function RelatedTools() {
  return (
    <section className="grid gap-3">
      <h2 className="text-2xl font-semibold">Related Tools</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {links.map(([href, label]) => (
          <Link key={href} className="rounded-md border border-line bg-white p-4 font-semibold shadow-panel hover:border-accent" href={href}>
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}
