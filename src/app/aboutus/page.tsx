import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose your focus",
    description:
      "Pick the role, industry, or behavioral theme that matches the opportunity you are pursuing.",
  },
  {
    number: "02",
    title: "Practice in context",
    description:
      "Answer prompts in a low-pressure space and refine your delivery with realistic interview scenarios.",
  },
  {
    number: "03",
    title: "Act on feedback",
    description:
      "Use targeted suggestions to improve structure, clarity, and impact before your next conversation.",
  },
] as const;

export default function AboutUsPage() {
  return (
    <main className="mx-auto max-w-[1080px] px-4 py-8 sm:px-8">
      <section className="rounded-lg border border-border bg-surface px-6 py-10 shadow-sm sm:px-10 sm:py-12">
        <p className="mb-4 font-mono text-xs font-medium tracking-[0.25em] text-ink-faint uppercase">
          About Us
        </p>
        <h1 className="max-w-[560px] font-display text-[34px] leading-[1.08] font-bold tracking-tight sm:text-[42px]">
          We help people turn interview stress into confident communication.
        </h1>
        <p className="mt-6 max-w-[650px] text-base leading-8 text-ink-soft">
          PrepAI was built to make interview preparation feel structured,
          encouraging, and practical. We give candidates the tools to prepare
          with clarity, practice with confidence, and present their experience
          in a way that lands.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/practice"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Start practicing
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-surface px-5 text-sm font-semibold transition-colors hover:bg-surface-sunken focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Explore dashboard
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <p className="mb-3 font-mono text-xs font-medium tracking-[0.25em] text-ink-faint uppercase">
          How It Works
        </p>
        <h2 className="font-display text-[28px] leading-tight font-bold tracking-tight sm:text-[32px]">
          A simple path to better interview prep
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="min-h-[190px] rounded-lg border border-border bg-surface p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-sm font-semibold text-primary">
                  {step.number}
                </span>
                <CheckCircle2
                  size={18}
                  className="text-success"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-ink-soft">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-lg border border-primary/20 bg-primary-wash px-6 py-8 sm:px-8">
        <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-4 font-mono text-xs font-medium tracking-[0.25em] text-primary-ink uppercase">
              Ready To Begin?
            </p>
            <h2 className="max-w-[680px] font-display text-[28px] leading-tight font-bold tracking-tight sm:text-[32px]">
              Turn your next interview into your strongest one yet.
            </h2>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3 sm:w-[170px] sm:flex-col">
            <Link
              href="/practice"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Practice now
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-primary/20 bg-surface px-5 text-sm font-semibold text-primary transition-colors hover:bg-surface-sunken focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              View dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
