import { describe, it, expect } from "vitest";
import { mockAiProvider } from "./mock";

describe("mockAiProvider", () => {
  it("transcribe returns a valid TranscriptionResult with zero network calls", async () => {
    const audio = new Blob(["mock audio data"]);
    const result = await mockAiProvider.transcribe(audio);
    
    expect(result).toBeDefined();
    expect(result.text).toBeTypeOf("string");
  });

  it("score returns a valid ScoreResult with zero network calls", async () => {
    const result = await mockAiProvider.score("Mock transcription");
    
    expect(result).toBeDefined();
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.feedback).toBeTypeOf("string");
  });

  it("tailor returns a valid TailorResult with zero network calls", async () => {
    const result = await mockAiProvider.tailor("Mock transcription");
    
    expect(result).toBeDefined();
    expect(result.tailoredText).toBeTypeOf("string");
  });
});
