import { AiProvider } from "./provider";
import {
  TranscriptionResultSchema,
  ScoreResultSchema,
  TailorResultSchema,
} from "./schema";

export const mockAiProvider: AiProvider = {
  async transcribe(_audio) {
    const fixture = { text: "This is a mock transcription of the user's response." };
    return TranscriptionResultSchema.parse(fixture);
  },
  async score(_transcription) {
    const fixture = { score: 85, feedback: "Good effort, but could use more detail." };
    return ScoreResultSchema.parse(fixture);
  },
  async tailor(_transcription) {
    const fixture = { tailoredText: "This is a tailored response to help you improve." };
    return TailorResultSchema.parse(fixture);
  },
};
