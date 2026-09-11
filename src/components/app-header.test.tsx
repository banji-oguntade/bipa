import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { describe, expect, it } from "vitest";
import { AppHeader } from "./app-header";

describe("AppHeader", () => {
  it("shows Practice and keeps History disabled", () => {
    const markup = renderToStaticMarkup(
      <AppHeader pathname="/practice" />,
    );

    expect(markup).toContain('href="/practice"');
    expect(markup).toContain(">Practice</a>");
    expect(markup).toMatch(/<button[^>]*disabled=""[^>]*>[\s\S]*History<\/button>/);
  });

  it("marks the current route as active", () => {
    const markup = renderToStaticMarkup(
      <AppHeader pathname="/dashboard" />,
    );

    expect(markup).toMatch(
      /<a(?=[^>]*href="\/dashboard")(?=[^>]*aria-current="page")[^>]*>/,
    );
    expect(markup).not.toMatch(
      /<a(?=[^>]*href="\/practice")(?=[^>]*aria-current="page")[^>]*>/,
    );
  });
});
