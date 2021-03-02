import * as express from "express";

import { ShoppingCartController } from "../controllers/shopping-cart.controller";

const router = express.Router();
const shoppingCartController = new ShoppingCartController();

router.post("/add-product", shoppingCartController.addToCart);
router.delete(
  "/remove-product/:product_id",
  shoppingCartController.removeFromCart
);
router.post("/update-quantities", shoppingCartController.updateProductQuantity);
router.delete("/empty-cart", shoppingCartController.emptyCart);
router.get("/order", shoppingCartController.getFinalOrder);

export default router;
