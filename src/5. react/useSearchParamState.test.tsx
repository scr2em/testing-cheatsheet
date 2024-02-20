import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

import { act, renderHook } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

export function useSearchParamsState<T extends string | number | boolean>(props: {
    searchParamName: string;
    defaultValue: T;
    validator?: (coercedSearchParam: T) => boolean;
}): readonly [coercedSearchParam: T, setSearchParamsState: (newState: T) => void] {
    const { searchParamName, defaultValue, validator } = props;

    const [searchParams, setSearchParams] = useSearchParams();

    const acquiredSearchParam = searchParams.get(searchParamName) || "";

    const coercedSearchParam = tryCoercingToTypeOf(acquiredSearchParam, defaultValue);

    const finalValue = (
        typeof coercedSearchParam === typeof defaultValue && (validator ? validator(coercedSearchParam as T) : true)
            ? coercedSearchParam
            : defaultValue
    ) as T;

    const setSearchParamsState = (newState: T) => {
        if (validator && !validator(newState)) {
            throw "the new value doesn't match the custom validator you provided";
        }

        setSearchParams({
            ...Array.from(searchParams.entries()).reduce((o, [key, value]) => ({ ...o, [key]: value }), {}),
            [searchParamName]: newState,
        });
    };

    /*
    if the url doesn't have the parameter or has an invalid value for that parameter
    set it to the default value
   */
    useEffect(() => {
        if (finalValue !== coercedSearchParam) {
            setSearchParamsState(defaultValue);
        }
    }, []);

    return [finalValue, setSearchParamsState];
}

function isNumeric(x: unknown): boolean {
    return (typeof x === "number" || typeof x === "string") && !isNaN(Number(x)) && x !== "";
}

function tryCoercingToTypeOf(acquiredSearchParam: string, value: number | boolean | string): string | number | boolean {
    if (typeof value === "number" && isNumeric(acquiredSearchParam)) {
        return parseFloat(acquiredSearchParam);
    }

    if (typeof value === "boolean" && (acquiredSearchParam === "true" || acquiredSearchParam === "false")) {
        return acquiredSearchParam === "true";
    }

    return acquiredSearchParam;
}

/*
--------------------------------------------------------------------------
|                               test file                                |
--------------------------------------------------------------------------
 */

function updateUrlSearchParams(searchParams: string) {
    const url = new URL(window.location.href);
    url.search = searchParams;
    window.history.pushState({}, "", url);
}

beforeEach(() => {
    updateUrlSearchParams("");
});

describe("useSearchParamsState", () => {
    it("should set the default value (string) if the search param is missing", async () => {
        expect(global.location.search).toBe("");

        const { result } = renderHook(
            () =>
                useSearchParamsState<string>({
                    searchParamName: "testParam",
                    defaultValue: "defaultValue",
                    validator: (value) => typeof value === "string" && value !== "",
                }),
            { wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter> },
        );

        expect(global.location.search).toBe("?testParam=defaultValue");
        expect(result.current[0]).toBe("defaultValue");
    });

    it("should set the default value (number) if the search param is missing", async () => {
        expect(global.location.search).toBe("");
        const { result } = renderHook(
            () =>
                useSearchParamsState<number>({
                    searchParamName: "testParam",
                    defaultValue: 1,
                }),
            { wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter> },
        );
        expect(global.location.search).toBe("?testParam=1");
        expect(result.current[0]).toBe(1);
    });

    it("should set the default value (boolean) if the search param is missing", async () => {
        expect(global.location.search).toBe("");
        const { result } = renderHook(
            () =>
                useSearchParamsState<boolean>({
                    searchParamName: "testParam",
                    defaultValue: true,
                }),
            { wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter> },
        );
        expect(global.location.search).toBe("?testParam=true");
        expect(result.current[0]).toBe(true);
    });

    it("should change the param correctly", async () => {
        expect(global.location.search).toBe("");
        const { result } = renderHook(
            () =>
                useSearchParamsState<boolean>({
                    searchParamName: "testParam",
                    defaultValue: true,
                }),
            { wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter> },
        );
        expect(global.location.search).toBe("?testParam=true");
        expect(result.current[0]).toBe(true);
        await act(async () => {
            result.current[1](false);
        });

        expect(global.location.search).toBe("?testParam=false");
        expect(result.current[0]).toBe(false);
    });
    it("should fallback to the default value if the param doesn't match", async () => {
        updateUrlSearchParams("testParam=1234");
        expect(global.location.search).toBe("?testParam=1234");
        const { result } = renderHook(
            () =>
                useSearchParamsState<boolean>({
                    searchParamName: "testParam",
                    defaultValue: true,
                }),
            { wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter> },
        );
        expect(global.location.search).toBe("?testParam=true");
        expect(result.current[0]).toBe(true);
    });
    it("should use custom validators", async () => {
        updateUrlSearchParams("testParam=1234");
        expect(global.location.search).toBe("?testParam=1234");

        const { result } = renderHook(
            () =>
                useSearchParamsState<string>({
                    searchParamName: "testParam",
                    defaultValue: "good",
                    validator: (x) => x === "good" || x === "bad",
                }),
            { wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter> },
        );
        expect(global.location.search).toBe("?testParam=good");
        expect(result.current[0]).toBe("good");

        await act(async () => {
            expect(() => result.current[1]("abc")).toThrow();
        });
        expect(global.location.search).toBe("?testParam=good");
        expect(result.current[0]).toBe("good");
    });
});
