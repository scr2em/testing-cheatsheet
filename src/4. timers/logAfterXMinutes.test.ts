function logAfterXMinutes(statement: string, minutes: number) {
    setTimeout(
        () => {
            console.log(statement);
        },
        minutes * 60 * 1000,
    );
}

/*
--------------------------------------------------------------------------
|                               test file                                |
--------------------------------------------------------------------------
 */

describe("logging in console", () => {
    it('should log "hi" after 10 minutes', () => {
        vi.useFakeTimers();
        const consoleSpy = vi.spyOn(console, "log");

        logAfterXMinutes("hi", 10);

        vi.runAllTimers();

        expect(consoleSpy).toHaveBeenCalledWith("hi");

        vi.useRealTimers();
        consoleSpy.mockRestore();
    });
});
