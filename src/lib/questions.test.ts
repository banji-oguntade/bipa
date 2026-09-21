import { describe, it, expect } from "vitest";
import { getQuestions } from "./questions";

describe("getQuestions", () => {
  it("returns exactly 30 questions", () => {
    const questions = getQuestions();
    expect(questions).toHaveLength(30);
  });

  it("has unique IDs for all questions", () => {
    const questions = getQuestions();
    const ids = questions.map((q) => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(30);
  });

  it("has the correct exact source text for bq-01", () => {
    const questions = getQuestions();
    const q1 = questions.find((q) => q.id === "bq-01");
    expect(q1).toBeDefined();
    expect(q1?.text).toBe("Tell me about a time you led a team through a difficult project.");
  });
});
