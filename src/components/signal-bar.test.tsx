import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SignalBar } from "./signal-bar";
import { ScoreLabel } from "./score-label";

describe("SignalBar", () => {
  it("clamps scores to 0-100 and renders configurable segments", () => {
    const lowMarkup = renderToStaticMarkup(
      <SignalBar score={-4} segments={10} segmentWidth={7} segmentHeight={12} />,
    );
    const highMarkup = renderToStaticMarkup(
      <SignalBar score={124} segments={10} />,
    );

    expect(lowMarkup).toContain('aria-valuenow="0"');
    expect(lowMarkup.match(/data-active="false"/g)).toHaveLength(10);
    expect(lowMarkup).toContain("width:7px");
    expect(lowMarkup).toContain("height:12px");
    expect(highMarkup).toContain('aria-valuenow="100"');
    expect(highMarkup.match(/data-active="true"/g)).toHaveLength(10);
  });

  it("uses warning, primary, and success threshold tokens", () => {
    expect(renderToStaticMarkup(<SignalBar score={49} />)).toContain(
      "bg-warning",
    );
    expect(renderToStaticMarkup(<SignalBar score={50} />)).toContain(
      "bg-primary",
    );
    expect(renderToStaticMarkup(<SignalBar score={74} />)).toContain(
      "bg-primary",
    );
    expect(renderToStaticMarkup(<SignalBar score={75} />)).toContain(
      "bg-success",
    );
  });
});

describe("ScoreLabel", () => {
  it("uses matching labels and threshold tokens", () => {
    expect(renderToStaticMarkup(<ScoreLabel score={49} />)).toContain(
      "Needs work",
    );
    expect(renderToStaticMarkup(<ScoreLabel score={49} />)).toContain(
      "text-warning",
    );
    expect(renderToStaticMarkup(<ScoreLabel score={50} />)).toContain(
      "On track",
    );
    expect(renderToStaticMarkup(<ScoreLabel score={74} />)).toContain(
      "text-primary",
    );
    expect(renderToStaticMarkup(<ScoreLabel score={75} />)).toContain(
      "Strong",
    );
    expect(renderToStaticMarkup(<ScoreLabel score={75} />)).toContain(
      "text-success",
    );
  });
});
