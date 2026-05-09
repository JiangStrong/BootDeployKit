export function FAQSection() {
  const items = [
    {
      question: "Does BootDeployKit upload my JAR file?",
      answer: "No. The generated package expects you to place your own JAR in the deployment directory."
    },
    {
      question: "Are database passwords stored?",
      answer: "No. Requests are used only to render files and return the preview or ZIP response."
    },
    {
      question: "Can I use the generated files in production?",
      answer: "Yes, but review environment variables, passwords, firewall rules and TLS before exposing services."
    }
  ];

  return (
    <section className="grid gap-3">
      <h2 className="text-2xl font-semibold">FAQ</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.question} className="rounded-md border border-line bg-white p-4 shadow-panel">
            <h3 className="font-semibold">{item.question}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
