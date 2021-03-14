import * as mongoose from "mongoose";

import Product from "../models/Product";
import { ShoppingCartController } from "../api/controllers/shopping-cart.controller";
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
    const id = 29;

    const product = await Product.findOne({ product_id: id });
    shoppingCart.addToCart(product, quantity);

    const cart = shoppingCart.data;

    expect(cart.items.length).toBeGreaterThan(0);
    const total = cart.formattedTotals;
    expect(total).toBe("$489.93");
  });

  test("Update item from shopping cart", async () => {});

  test("Remove item from shopping cart", async () => {
    const id = 29;

    const product = await Product.findOne({ product_id: id });
    expect(product._id).toBe("5795e57b7078f66363833442");

    shoppingCart.removeFromCart(product.product_id);
    shoppingCart.calculateTotals();

    expect(shoppingCart.data.length).toBeUndefined();
    expect(shoppingCart.data.formattedTotals).toBe("$0.00");
  });

  test("Empty shopping cart", () => {});

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
