/**
 * PrepAI design tokens from the product spec (§3.2).
 * Keep hex values in sync with CSS variables in `src/app/globals.css`.
 */
export const tokens = {
  bg: "#F6F7FA",
  surface: "#FFFFFF",
  surfaceSunken: "#F0F1F5",
  ink: "#14171F",
  inkSoft: "#5B6272",
  inkFaint: "#9AA0AE",
  border: "#E3E5EC",
  primary: "#2F5DE3",
  primaryInk: "#16308A",
  primaryWash: "#EAEFFD",
  success: "#1F9D6B",
  successWash: "#E7F6EF",
  warning: "#C98A1E",
  warningWash: "#FBF1DE",
  danger: "#D3453C",
  dangerWash: "#FCEAE9",
} as const;

export type TokenName = keyof typeof tokens;
