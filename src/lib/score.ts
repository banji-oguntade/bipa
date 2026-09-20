export type ScoreTone = "warning" | "primary" | "success";

export type ScoreLabelText = "Needs work" | "On track" | "Strong";

export type ScoreStatus = {
  tone: ScoreTone;
  label: ScoreLabelText;
};

export function clampScore(score: number) {
  if (Number.isNaN(score)) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(score)));
}

export function getScoreStatus(score: number): ScoreStatus {
  const value = clampScore(score);

  if (value < 50) {
    return {
      tone: "warning",
      label: "Needs work",
    };
  }

  if (value < 75) {
    return {
      tone: "primary",
      label: "On track",
    };
  }

  return {
    tone: "success",
    label: "Strong",
  };
}
