import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuestions } from "@/lib/questions";

type PracticeQuestionPageProps = {
    params: Promise<{ questionId: string }>;
};

export default async function PracticeQuestionPage({
    params,
}: PracticeQuestionPageProps) {
    const { questionId } = await params;
    const question = getQuestions().find((item) => item.id === questionId);

    if (!question) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-[1080px] px-4 py-8 sm:px-8">
            <Link
                href="/practice"
                className="text-sm font-medium text-primary-ink underline-offset-4 hover:underline"
            >
                Back to question bank
            </Link>
            <p className="mb-2 mt-8 font-mono text-xs font-medium tracking-wide text-ink-faint uppercase">
                Behavioral Practice
            </p>
            <h1 className="max-w-2xl font-display text-[26px] font-bold leading-tight">
                {question.text}
            </h1>
        </main>
    );
}
