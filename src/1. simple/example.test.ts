import { describe, expect, it } from "vitest";
import { sum } from "./example";

describe("purchasing flow", () => {
  it("sums positive numbers", () => {
    // access Date.now() will result in the date set above
    expect(sum(1, 4)).toEqual(5);
  });

  it("sums negative numbers", () => {
    // access Date.now() will result in the date set above
    expect(sum(-2, -3)).toEqual(-5);
  });

  it("sums 0 ", () => {
    // access Date.now() will result in the date set above
    expect(sum(0, 0)).toEqual(0);
  });
});
