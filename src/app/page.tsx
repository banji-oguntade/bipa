import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-[1080px] items-center px-8 py-3.5">
          <div className="flex items-center gap-2 font-display text-base font-bold">
            <span
              className="flex size-[22px] items-center justify-center rounded-md bg-primary"
              aria-hidden
            />
            PrepAI · Behavioral
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[720px] px-8 py-7">
        <p className="mb-2 font-mono text-xs font-medium tracking-wide text-ink-faint uppercase">
          BIPA-S01
        </p>
        <h1 className="font-display text-[26px] font-bold tracking-tight">
          PrepAI · Behavioral
        </h1>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">
          This is the scaffold — Next.js 15, TypeScript, Tailwind, and
          design tokens. Question bank, microphone, scoring, and dashboard come
          in later stories.
        </p>

        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="font-display font-bold">
              Ready to learn in slices
            </CardTitle>
            <CardDescription>
              A typed practice loop will land before voice or GPT. This page
              exists so you can run the app locally and see the visual language.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled>Start practicing — later story</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
