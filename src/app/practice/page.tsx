import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PracticePage() {
  return (
    <main className="mx-auto max-w-[1080px] px-4 py-8 sm:px-8">
      <p className="mb-2 font-mono text-xs font-medium tracking-wide text-ink-faint uppercase">
        Practice
      </p>
      <h1 className="font-display text-[26px] font-bold tracking-tight">
        Practice behavioral questions
      </h1>
      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-soft">
        The question bank and typed practice loop arrive in later stories.
      </p>

      <Card className="mt-6 max-w-2xl">
        <CardHeader>
          <CardTitle className="font-display font-bold">
            Practice route ready
          </CardTitle>
          <CardDescription>
            This placeholder confirms that Practice has its own working route.
          </CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
}
