import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-[1080px] px-4 py-8 sm:px-8">
      <p className="mb-2 font-mono text-xs font-medium tracking-wide text-ink-faint uppercase">
        Dashboard
      </p>
      <h1 className="font-display text-[26px] font-bold tracking-tight">
        Your interview readiness
      </h1>
      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-soft">
        Your practice activity and progress will appear here in a later story.
      </p>

      <Card className="mt-6 max-w-2xl">
        <CardHeader>
          <CardTitle className="font-display font-bold">
            Nothing to report yet
          </CardTitle>
          <CardDescription>
            Complete a practice answer to begin building your dashboard.
          </CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
}
