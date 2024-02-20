import { createRoot } from "react-dom/client";
import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <span data-testid="count">{count}</span>
            <button id="increase" onClick={() => setCount((prev) => prev + 1)}>
                Increase
            </button>
            <button id="decrease" onClick={() => setCount((prev) => prev - 1)}>
                Decrease
            </button>
        </div>
    );
}

/*
--------------------------------------------------------------------------
|                               test file                                |
--------------------------------------------------------------------------
 */

describe.todo("Counter component", () => {
    it("increments count on button click", () => {
        const app = document.createElement("div");
        const root = createRoot(app);
        root.render(<Counter />);

        // code here
    });
});

/*

describe("Counter component", () => {
    it("increments count on button click", () => {
        // Set up our document body
        const app = document.createElement("div");
        const root = createRoot(app);
        root.render(<Counter />);

        setTimeout(() => {
            const countSpan = app.querySelector('[data-testid="count"]');

            expect(countSpan?.textContent).toBe("0");
            const increase = app.querySelector("#increase") as HTMLButtonElement;
            increase?.click();

            setTimeout(() => {
                // Delay assertion to ensure React has updated the DOM
                expect(countSpan?.textContent).toBe("1");
            }, 0);
        }, 0);
    });
});

 */
describe("Counter component", () => {
    it("increments count on button click", async () => {
        // ARRANGE
        const { container } = render(<Counter />);

        // ACT
        fireEvent.click(container.querySelector("#increase")!);

        // ASSERT
        expect(screen.getByTestId("count").textContent).toBe("1");
    });
});
