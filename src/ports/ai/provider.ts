import { TranscriptionResult, ScoreResult, TailorResult } from "./schema";

export interface AiProvider {
  transcribe(audio: Blob | Buffer): Promise<TranscriptionResult>;
  score(transcription: string): Promise<ScoreResult>;
  tailor(transcription: string): Promise<TailorResult>;
}
