import { isProduction } from "../utils";

function someExtensiveMath() {
    return isProduction() ? 9999999 : 5;
}

describe("module mocking", () => {
    beforeEach(() => {
        vi.mock("../utils", () => {
            return {
                isProduction: () => false,
            };
        });
    });
    afterAll(() => {
        vi.clearAllMocks();
    });

    it("should do some extensive math in production", () => {
        expect(someExtensiveMath()).toBe(5);
    });
});
