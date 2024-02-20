const initialState: { count?: number; users?: any[]; error?: string } = {
    count: 0,
    users: [],
    error: undefined,
};

export function reducer_v1(state = initialState, action: { type: "INCREMENT" } | { type: "FETCH_USERS" }) {
    switch (action.type) {
        case "INCREMENT":
            // @ts-ignore
            const increment = window.globalIncrementValue || 1;
            return { ...state, count: state.count + increment };
        case "FETCH_USERS":
            // Producing side effects by fetching data within the reducer
            fetch("https://api.example.com/users")
                .then((response) => response.json())
                .then((users) => ({ ...state, users }))
                .catch((error) => ({ ...state, error }));
            return state; // Returning state immediately, not waiting for fetch
        default:
            return state;
    }
}

function reducer_v2(
    state = initialState,
    action:
        | { type: "INCREMENT"; payload: { increment: number; count?: number } }
        | { type: "SET_USERS"; payload: { users: any[] } }
        | { type: "SET_ERROR"; payload: { error: string } },
) {
    switch (action.type) {
        case "INCREMENT":
            // Use action payload instead of global state
            const increment = action.payload.increment || 1;
            const prev = state.count || 0;
            return { ...state, count: prev + increment };
        case "SET_USERS":
            // Handle setting users through an action, not side effects in the reducer
            return { ...state, users: action.payload.users };
        case "SET_ERROR":
            // Handle errors through an action
            return { ...state, error: action.payload.error };
        default:
            return state;
    }
}

/*
--------------------------------------------------------------------------
|                               test file                                |
--------------------------------------------------------------------------
 */

describe("goodReducer", () => {
    it("handles INCREMENT action", () => {
        const initialState = { count: 0 };
        const newState = reducer_v2(initialState, { type: "INCREMENT", payload: { increment: 1 } });
        expect(newState.count).toBe(1);
    });

    it("handles SET_USERS action", () => {
        const initialState = { users: [] };
        const newState = reducer_v2(initialState, { type: "SET_USERS", payload: { users: ["Alice", "Bob"] } });
        expect(newState.users).toEqual(["Alice", "Bob"]);
    });

    it("handles SET_ERROR action", () => {
        const initialState = { error: undefined };
        const newState = reducer_v2(initialState, { type: "SET_ERROR", payload: { error: "Error occurred" } });
        expect(newState.error).toBe("Error occurred");
    });
});
