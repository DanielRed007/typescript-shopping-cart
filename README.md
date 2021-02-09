# Basic Shopping Cart

## **NodeJS - Typescript - Express - MongoDB**

A basic shopping cart, with a list of products ready to add or remove,
Selects Items to the Cart and get results of the order amount
It has end points to Add, Remove and update the cart, when it's done,
you can create an order.

It's intended to be an application only to test in the backend,
so a tool like Postman or Swagger are required to check the end points.
When every endpoint is triggered, the request.session header is updated.

## Endpoints:

#### POST: Add new Items to Cart

localhost:7000/api/shopping-cart/add-product

#### DELETE: Remove items from Cart

localhost:7000/api/shopping-cart/remove-product/:product_id

#### POST: Update existing items in Cart

localhost:7000/api/shopping-cart/update-quantities

#### DELETE: Empty Cart

localhost:7000/api/shopping-cart/empty-cart
