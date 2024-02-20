import { useEffect, useState } from "react";
import { render, screen } from "@testing-library/react";

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

describe("Products Component", () => {
    it("should display loading before data is fetched", () => {
        render(<Products />);
        const loadingElement = screen.getByText(/loading/i);
        expect(loadingElement).toBeInTheDocument();
    });

    it("should display product data after fetch", async () => {
        render(<Products />);
        // Wait for the product data to be displayed
        // const productTitle = await waitFor(() => screen.getByText(/Fjallraven/g), { timeout: 5000 });
        // const productDescription = await waitFor(() => screen.getByText(/Your perfect pack/g), { timeout: 5000 });

        const productTitle = await screen.findByText(/Fjallraven/g);
        const productDescription = await screen.findByText(/Your perfect pack/g);

        // Assertions
        expect(productTitle).toBeInTheDocument();
        expect(productDescription).toBeInTheDocument();
    });
});
