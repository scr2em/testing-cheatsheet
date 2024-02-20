function logger() {
    console.log("hi there");
}

/*
--------------------------------------------------------------------------
|                               test file                                |
--------------------------------------------------------------------------
 */

describe("logger", () => {
    it("should call console.log", () => {
        const spy = vi.spyOn(console, "log");

        logger();

        expect(spy).toHaveBeenCalledWith("hi there");

        spy.mockRestore();
    });
});
