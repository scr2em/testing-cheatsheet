import { describe, it, expect } from "vitest";
import { Counter } from "./example";
import TestUtils from "react-dom/test-utils";

import { createRoot } from "react-dom/client";
describe("Counter component", () => {
  it("increments count on button click", () => {
    // Set up our document body
    document.body.innerHTML = '<div id="root"></div>';
    const root = document.getElementById("root");

    // Render the Counter component into the div with id 'root'
    createRoot(root!).render(<Counter />);
    // Find the button and span elements
    const button = document.querySelector("button");
    const countSpan = document.querySelector('[data-testid="count"]');

    // Initial count should be 0
    expect(countSpan.textContent).toBe("0");

    // Simulate a click event on the button
    TestUtils.Simulate.click(button);

    // After clicking, the count should be incremented to 1
    expect(countSpan.textContent).toBe("1");
  });
});
