import { describe, expect, it, vi } from "vitest";
import { logAfterXMinutes } from "./example";

describe("logging in console", () => {
  it('should log "hi" after 10 minutes', () => {
    // Use fake timers
    vi.useFakeTimers();
    // Spy on console.log to check if it's called correctly
    const consoleSpy = vi.spyOn(console, "log");

    logAfterXMinutes("hi", 10);
    // time travelling
    vi.runAllTimers();

    // Check if console.log was called with 'hi'
    expect(consoleSpy).toHaveBeenCalledWith("hi");
    // Restore the original timers and console.log
    vi.useRealTimers();
    consoleSpy.mockRestore();
  });
});
