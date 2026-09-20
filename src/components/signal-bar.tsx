import React from "react";
import { clampScore, getScoreStatus } from "../lib/score";
import { cn } from "../lib/utils";

type SignalBarProps = {
  score: number;
  segments?: number;
  segmentWidth?: number;
  segmentHeight?: number;
  gap?: number;
  className?: string;
};

const toneClasses = {
  warning: "bg-warning",
  primary: "bg-primary",
  success: "bg-success",
} as const;

export function SignalBar({
  score,
  segments = 24,
  segmentWidth = 5,
  segmentHeight = 18,
  gap = 4,
  className,
}: SignalBarProps) {
  const normalizedSegments = Math.max(1, Math.round(segments));
  const value = clampScore(score);
  const activeSegments = Math.round((value / 100) * normalizedSegments);
  const status = getScoreStatus(value);

  return (
    <div
      aria-label={`Score ${value} out of 100`}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={value}
      className={cn("flex items-center", className)}
      role="meter"
      style={{ gap }}
    >
      {Array.from({ length: normalizedSegments }, (_, index) => {
        const isActive = index < activeSegments;

        return (
          <span
            aria-hidden="true"
            className={cn(
              "block rounded-full",
              isActive ? toneClasses[status.tone] : "bg-surface-sunken",
            )}
            data-active={isActive}
            key={index}
            style={{
              height: segmentHeight,
              width: segmentWidth,
            }}
          />
        );
      })}
    </div>
  );
}
