import { mockAiProvider } from "./mock";
import type { AiProvider } from "./provider";

export const aiProvider: AiProvider = mockAiProvider;
export * from "./schema";
export * from "./provider";
