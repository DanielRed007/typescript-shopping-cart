import * as mongoose from "mongoose";

import Product from "../models/Product";
import config from "../config/CartConfig";

import { ShoppingCart } from "../ShoppingCart/ShoppingCart";
const shoppingCart = new ShoppingCart();

describe("Shopping Cart", () => {
  beforeAll(async () => {
    const url = `${config.db.url}`;
    await mongoose.connect(url, { useNewUrlParser: true });
  });

  test("Add item to shopping cart", async () => {
    const quantity = 7;
    const id = 49;

    const product = await Product.findOne({ product_id: id });
    shoppingCart.addToCart(product, quantity);

    const cart = shoppingCart.data;

    expect(cart.items.length).toBeGreaterThan(0);
    const total = cart.formattedTotals;
    expect(total).toBe("$349.93");
  });

  test("Update item from shopping cart", async () => {
    const ids = [14, 17];
    const quantities = [3, 3];

    const cartData = {
      items: [
        {
          id: 14,
          title:
            "microsoft sql server standard edition 2005 64 bit cd/dvd 5 client",
          price: 1849,
          quantity: 1,
          image: "9.jpeg",
          formattedPrice: "$1,849.00",
        },
        {
          id: 17,
          title: "omnioutliner professional 3.0",
          price: 69.95,
          quantity: 1,
          image: "6.jpeg",
          formattedPrice: "$69.95",
        },
      ],
      totals: 1918.95,
      formattedTotals: "$1,918.95",
    };

    shoppingCart.data = cartData;

    shoppingCart.updateCart(ids, quantities);

    expect(shoppingCart.data.totals).toBe(5756.85);
  });

  test("Remove item from shopping cart", async () => {
    const id = 29;

    const product = await Product.findOne({ product_id: id });
    expect(product._id).toBe("5795e57b7078f66363833442");
    shoppingCart.removeFromCart(product.product_id);
    shoppingCart.calculateTotals();

    expect(shoppingCart.data.length).toBeUndefined();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
