export function HowToSection() {
  const steps = [
    "Choose a Spring Boot deployment template.",
    "Enter your project name, JAR name, ports and service credentials.",
    "Preview Dockerfile, docker-compose.yml, Nginx and Spring configuration files.",
    "Download the ZIP package and deploy it on your Docker server."
  ];

  return (
    <section className="grid gap-3">
      <h2 className="text-2xl font-semibold">How It Works</h2>
      <ol className="grid gap-3 md:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step} className="rounded-md border border-line bg-white p-4 shadow-panel">
            <span className="text-sm font-semibold text-accent">Step {index + 1}</span>
            <p className="mt-2 text-sm leading-6 text-slate-600">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
