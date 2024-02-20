import { useRef } from "react";
import { render, screen } from "@testing-library/react";

const NumberDisplay = ({ number }: { number: number }) => {
    const id = useRef(1);

    return (
        <div>
            <span data-testid="number-display">{number}</span>
            <span data-testid="instance-id">{id.current}</span>
        </div>
    );
};

test("calling render with the same component on the same container does not remount", () => {
    const { rerender } = render(<NumberDisplay number={1} />);
    expect(screen.getByTestId("number-display")).toHaveTextContent("1");

    // re-render the same component with different props
    rerender(<NumberDisplay number={2} />);
    expect(screen.getByTestId("number-display")).toHaveTextContent("2");

    expect(screen.getByTestId("instance-id")).toHaveTextContent("1");
});
