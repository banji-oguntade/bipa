import { z } from "zod";

export const TranscriptionResultSchema = z.object({
  text: z.string(),
});

export const ScoreResultSchema = z.object({
  score: z.number().min(0).max(100),
  feedback: z.string(),
});

export const TailorResultSchema = z.object({
  tailoredText: z.string(),
});

export type TranscriptionResult = z.infer<typeof TranscriptionResultSchema>;
export type ScoreResult = z.infer<typeof ScoreResultSchema>;
export type TailorResult = z.infer<typeof TailorResultSchema>;
