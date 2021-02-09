// Shopping Cart
import { ShoppingCart } from "../../ShoppingCart/ShoppingCart";

// Models
import Product from "../../models/Product";

const shoppingCart = new ShoppingCart();

export class ShoppingCartController {
  constructor() {}

  public async addToCart(request: any, response: any) {
    let quantity = parseInt(request.body.quantity, 10);
    let product = parseInt(request.body.product_id, 10);
    // ToDo: Implement JSON web token

    if (quantity > 0) {
      Product.findOne({ product_id: product })
        .then((item) => {
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

  public async removeFromCart(request: any, response: any) {
    let product = parseInt(request.params.product_id, 10);

    Product.findOne({ product_id: product })
      .then((item: any) => {
        shoppingCart.removeFromCart(item.product_id);
        shoppingCart.calculateTotals();
        response.json(shoppingCart.data);
      })
      .catch((err) => {});
  }

  public async updateProductQuantity(request: any, response: any) {
    let products = request.body.product_ids;
    let quantities = request.body.quantyties;

    shoppingCart.updateCart(products, quantities);
    response.json(shoppingCart.data);
    request.session.cart = shoppingCart.data;
  }

  public async emptyCart(request, response) {
    shoppingCart.emptyCart(request);
    response.json(shoppingCart.data);
  }
}
