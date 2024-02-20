import { createContext, ReactNode, useContext, useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";

const ThemeContext = createContext<any>(null);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

const useTheme = () => useContext(ThemeContext);

const ThemedButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button style={{ background: theme === "dark" ? "#333" : "#FFF" }} onClick={toggleTheme}>
            Switch Theme
        </button>
    );
};

describe("ThemedButton", () => {
    it("toggles the theme from light to dark", async () => {
        render(
            <ThemeProvider>
                <ThemedButton />
            </ThemeProvider>,
        );

        const button = screen.getByRole("button", { name: /switch theme/i });
        expect(button).toHaveStyle("background: #FFF");

        fireEvent.click(button);
        expect(button).toHaveStyle("background: #333");
    });
});
