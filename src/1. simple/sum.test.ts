function sum(x: number, y: number) {
    return x + y;
}

/*
--------------------------------------------------------------------------
|                               test file                                |
--------------------------------------------------------------------------
 */

describe("purchasing flow", () => {
    it("sums positive numbers", () => {
        expect(sum(1, 4)).toEqual(5);
    });

    it("sums negative numbers", () => {
        expect(sum(-2, -3)).toEqual(-5);
    });

    it("sums 0 ", () => {
        expect(sum(0, 0)).toEqual(0);
    });
});
