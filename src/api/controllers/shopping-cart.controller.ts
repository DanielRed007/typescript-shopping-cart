import { Response, Request, response, request } from "express";
import { IRequest, IResponse } from "../../interfaces/interfaces";
// Shopping Cart
import { ShoppingCart } from "../../ShoppingCart/ShoppingCart";

// Models
import Product from "../../models/Product";
import { IProduct } from "../../interfaces/interfaces";

const shoppingCart = new ShoppingCart();

export class ShoppingCartController {
  constructor() {}

  public async addToCart(request: IRequest, response: IResponse) {
    let quantity = parseInt(request.body.quantity, 10);
    let product = parseInt(request.body.product_id, 10);
    // ToDo: Implement JSON web token

    if (quantity > 0) {
      Product.findOne({ product_id: product })
        .then((item: IProduct) => {
          shoppingCart.addToCart(item, quantity);
          shoppingCart.saveCart(request);
          response.json(shoppingCart.data);
        })
        .catch((err) => {
          response.redirect("/");
        });
    } else {
      response.redirect("/");
    }
  }

  public async removeFromCart(request: IRequest, response: IResponse) {
    let product = parseInt(request.params.product_id, 10);

    Product.findOne({ product_id: product })
      .then((item: IProduct) => {
        shoppingCart.removeFromCart(item.product_id);
        shoppingCart.calculateTotals();
        response.json(shoppingCart.data);
      })
      .catch((err) => {});
  }

  public async updateProductQuantity(request: IRequest, response: IResponse) {
    let products = request.body.product_ids;
    let quantities = request.body.quantyties;

    shoppingCart.updateCart(products, quantities);
    response.json(shoppingCart.data);
    if (request.session.hasOwnProperty("cart")) {
      request.session.cart = shoppingCart.data;
    }
  }

  public async emptyCart(request: IRequest, response: IResponse) {
    if (request.session.cart) {
      shoppingCart.emptyCart(request);
      response.json(shoppingCart.data);
    } else {
      response.status(400).json({ msg: "Cart is already empty" });
    }
  }

  public async getFinalOrder(request: IRequest, response: IResponse) {
    if (request.session.cart.items.length > 0) {
      response.json(request.session.cart);
    } else {
      response.json({ msg: "Cart is Empty!!" });
    }
  }
}
