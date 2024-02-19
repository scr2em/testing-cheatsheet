const calculator = {
    multiply(a: number, b: number): number {
        return a * b;
    },
};

describe("calculator multiply method", () => {
    it("should call multiply method with correct arguments", () => {
        const spy = vi.spyOn(calculator, "multiply");

        // Call the method (this would usually be done within the function/component you are testing)
        calculator.multiply(2, 3);

        // Assert that the spy was called with the correct arguments
        expect(spy).toHaveBeenCalledWith(2, 3);

        // Restore the original method to remove the spy
        spy.mockRestore();
    });
});
