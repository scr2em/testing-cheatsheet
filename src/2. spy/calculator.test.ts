const calculator = {
    multiply(a: number, b: number): number {
        return a * b;
    },
};
/*
--------------------------------------------------------------------------
|                               test file                                |
--------------------------------------------------------------------------
 */

describe("calculator multiply method", () => {
    it("should call multiply method with correct arguments", () => {
        const spy = vi.spyOn(calculator, "multiply");

        calculator.multiply(2, 3);

        expect(spy).toHaveBeenCalledWith(2, 3);

        spy.mockRestore();
    });
});
