import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect } from "vitest";

function App() {
    const [showHiddenComponent, setShowHiddenComponent] = useState(false);

    return (
        <div>
            Hi there
            <button data-testid="show" onClick={() => setShowHiddenComponent((prev) => !prev)}>
                Increase
            </button>
            {showHiddenComponent && <Surprise />}
        </div>
    );
}

function Surprise() {
    return <span data-testid="surprise">tda</span>;
}

/*
--------------------------------------------------------------------------
|                               test file                                |
--------------------------------------------------------------------------
 */

describe("App Component", () => {
    it("should show the Surprise component when the Increase button is clicked", () => {
        render(<App />);

        // TODO: explain debug
        // screen.debug();

        const button = screen.getByTestId("show");
        fireEvent.click(button);

        const surpriseElement = screen.getByTestId("surprise");
        expect(surpriseElement).toBeInTheDocument();
    });

    it("should toggle the Surprise component visibility on button click", () => {
        // Render the App component
        render(<App />);

        let surpriseElement = screen.queryByTestId("surprise");
        expect(surpriseElement).not.toBeInTheDocument();

        const button = screen.getByTestId("show");
        fireEvent.click(button);

        surpriseElement = screen.getByTestId("surprise");
        expect(surpriseElement).toBeInTheDocument();

        fireEvent.click(button);

        surpriseElement = screen.queryByTestId("surprise");
        expect(surpriseElement).not.toBeInTheDocument();
    });
});
