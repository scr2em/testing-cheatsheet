import { faker } from "@faker-js/faker";
import _times from "lodash/times";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const productFactory = function () {
    return {
        id: faker.number.int(),
        title: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        description: faker.lorem.sentence(),
        category: faker.commerce.department(),
        image: faker.image.url(),
        rating: {
            rate: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
            count: faker.number.int(),
        },
    };
};

const sharedProducts = _times(100, productFactory);

const server = setupServer(
    http.get("*/products", () => {
        return HttpResponse.json(sharedProducts);
    }),
    http.patch("*/product/:id", (info) => {
        const productId = +info.params.id as number;

        const product = sharedProducts.find((p) => p.id === productId);
        // mutate
        // ...

        return HttpResponse.json(sharedProducts);
    }),
);
