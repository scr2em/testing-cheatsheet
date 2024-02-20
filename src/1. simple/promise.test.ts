function buyApples() {
    // return fetch('/buy/apples').then(r => r.json())
    return Promise.resolve({ id: 1 });
}

test("buyApples returns new stock id", async () => {
    // toEqual returns a promise now, so you HAVE to await it
    await expect(buyApples()).resolves.toEqual({ id: 1 }); // jest API
});
