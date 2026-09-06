import { describe, expect, it } from "vitest";
import { tokens } from "./tokens";

describe("design tokens", () => {
  it("exports spec §3.2 hex values", () => {
    expect(tokens.bg).toBe("#F6F7FA");
    expect(tokens.surface).toBe("#FFFFFF");
    expect(tokens.surfaceSunken).toBe("#F0F1F5");
    expect(tokens.ink).toBe("#14171F");
    expect(tokens.inkSoft).toBe("#5B6272");
    expect(tokens.inkFaint).toBe("#9AA0AE");
    expect(tokens.border).toBe("#E3E5EC");
    expect(tokens.primary).toBe("#2F5DE3");
    expect(tokens.primaryInk).toBe("#16308A");
    expect(tokens.primaryWash).toBe("#EAEFFD");
    expect(tokens.success).toBe("#1F9D6B");
    expect(tokens.successWash).toBe("#E7F6EF");
    expect(tokens.warning).toBe("#C98A1E");
    expect(tokens.warningWash).toBe("#FBF1DE");
    expect(tokens.danger).toBe("#D3453C");
    expect(tokens.dangerWash).toBe("#FCEAE9");
  });
});
