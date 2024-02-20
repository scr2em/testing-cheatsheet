import { useState, useEffect } from "react";
import { renderHook } from "@testing-library/react";

const useCustomHook = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount((c) => c + 1);
    }, []);

    return { count, setCount };
};

/*
--------------------------------------------------------------------------
|                               test file                                |
--------------------------------------------------------------------------
 */

describe.todo("useCustomHook", () => {
    it("should increment count", async () => {
        const { result, rerender, unmount } = renderHook(() => useCustomHook());

        expect(result.current.count).toBe(1);
        // bug!
        result.current.setCount((c) => c + 5);

        expect(result.current.count).toBe(6);
    });
});

/*
1. act makes sure all updates related to these “units” have been processed and applied to the DOM before you make any assertions

2. render and fireEvent are already wrapped in act
 */
