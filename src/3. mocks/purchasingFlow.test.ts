const businessHours = [9, 17];

function purchase() {
    const currentHour = new Date().getHours();
    const [open, close] = businessHours;

    if (currentHour > open && currentHour < close) {
        return { message: "Success" };
    }

    return { message: "Error" };
}

/*
--------------------------------------------------------------------------
|                               test file                                |
--------------------------------------------------------------------------
 */

describe("purchasing flow", () => {
    it("allows purchases within business hours", () => {
        const date = new Date(2000, 1, 1, 13);
        vi.setSystemTime(date);

        expect(purchase()).toEqual({ message: "Success" });
    });

    it("disallows purchases outside of business hours", () => {
        const date = new Date(2000, 1, 1, 19);
        vi.setSystemTime(date);

        expect(purchase()).toEqual({ message: "Error" });
    });
});
