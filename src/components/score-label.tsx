import React from "react";
import { getScoreStatus } from "../lib/score";
import { cn } from "../lib/utils";

type ScoreLabelProps = {
  score: number;
  className?: string;
};

const toneClasses = {
  warning: "bg-warning-wash text-warning",
  primary: "bg-primary-wash text-primary",
  success: "bg-success-wash text-success",
} as const;

export function ScoreLabel({ score, className }: ScoreLabelProps) {
  const status = getScoreStatus(score);

  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full px-3 font-mono text-sm font-semibold",
        toneClasses[status.tone],
        className,
      )}
    >
      {status.label}
    </span>
  );
}
