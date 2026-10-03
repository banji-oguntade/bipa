import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getQuestions } from "@/lib/questions";

const competencyLabels: Record<string, string> = {
  leadership: "Leadership",
  "teamwork-collaboration": "Teamwork & Collaboration",
  "conflict-resolution": "Conflict Resolution",
  "failure-growth": "Failure & Growth",
  "ownership-initiative": "Ownership & Initiative",
  "adaptability-ambiguity": "Adaptability & Ambiguity",
  communication: "Communication",
  "time-management-prioritization": "Time Management & Prioritization",
};

export default function PracticePage() {
  const questions = getQuestions();

  return (
    <main className="mx-auto max-w-[1080px] px-4 py-8 sm:px-8">
      <p className="mb-2 font-mono text-xs font-medium tracking-wide text-ink-faint uppercase">
        Behavioral Practice
      </p>
      <h1 className="font-display text-[26px] font-bold tracking-tight">Question bank</h1>

      <ul className="mt-6 max-w-2xl overflow-hidden rounded-xl bg-white ring-1 ring-foreground/10">
        {questions.map((question) => (
          <li key={question.id} className="border-b border-border last:border-b-0">
            <Link
              href={`/practice/${question.id}`}
              className="group flex min-h-[64px] items-center justify-between gap-4 px-5 py-3 transition-colors hover:bg-surface-sunken focus-visible:bg-surface-sunken focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
            >
              <span className="min-w-0">
                <span className="block text-sm font-medium leading-5 text-ink">
                  {question.text}
                </span>
                <span className="mt-1 flex flex-wrap gap-1.5">
                  {question.competencyIds.map((competencyId) => (
                    <span
                      key={competencyId}
                      className="rounded-full bg-primary-wash px-2 py-0.5 text-[11px] font-medium leading-4 text-primary-ink"
                    >
                      {competencyLabels[competencyId] ?? competencyId}
                    </span>
                  ))}
                </span>
              </span>
              <ChevronRight
                aria-hidden="true"
                className="size-4 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
