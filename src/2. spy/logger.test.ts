function logger() {
    console.log("hi there");
}

describe("logger", () => {
    it("should call console.log", () => {
        const spy = vi.spyOn(console, "log");

        logger();

        expect(spy).toHaveBeenCalledWith("hi there");

        // Restore the original method to remove the spy
        spy.mockRestore();
    });
});
