import { useEffect, useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { expect } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

function Products() {
    const [product, setProduct] = useState<{ title: string; description: string } | null>(null);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/1")
            .then((res) => res.json())
            .then((json) => setProduct(json))
            .catch((error) => console.error("Error fetching product:", error));
    }, []);

    if (!product) return <div>Loading...</div>;

    return (
        <div data-testid="product">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
        </div>
    );
}

/*
--------------------------------------------------------------------------
|                               test file                                |
--------------------------------------------------------------------------
 */

const fakeProduct = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
        rate: 3.9,
        count: 120,
    },
};

describe("Products Component", () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("should display product data after fetch", async () => {
        vi.stubGlobal("fetch", () =>
            Promise.resolve({
                json: () => Promise.resolve(fakeProduct),
            }),
        );

        render(<Products />);

        const productTitle = await screen.findByText(/Fjallraven/g);
        const productDescription = await screen.findByText(/Your perfect pack/g);

        // Assertions
        expect(productTitle).toBeInTheDocument();
        expect(productDescription).toBeInTheDocument();
    });
});

const server = setupServer(
    http.get("*/products/1", () => {
        return HttpResponse.json(fakeProduct);
    }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Products Component", () => {
    it("should display product data after fetch", async () => {
        render(<Products />);
        // Wait for the product data to be displayed
        const productTitle = await waitFor(() => screen.getByText(fakeProduct.title));
        const productDescription = await waitFor(() => screen.getByText(fakeProduct.description));

        // Assertions
        expect(productTitle).toBeInTheDocument();
        expect(productDescription).toBeInTheDocument();
    });
});
