import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { describe, expect, it } from "vitest";
import PracticePage from "./page";

describe("PracticePage", () => {
    it("renders all 30 questions with competency tags and practice links", () => {
        const markup = renderToStaticMarkup(<PracticePage />);

        expect(markup.match(/<li\b/g)).toHaveLength(30);
        expect(markup).toContain("Leadership");
        expect(markup).toContain("Teamwork &amp; Collaboration");
        expect(markup.match(/href="\/practice\/bq-\d{2}"/g)).toHaveLength(30);
        expect(markup).not.toContain("score");
        expect(markup).not.toContain("complete");
    });
});
