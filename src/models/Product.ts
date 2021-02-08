import * as mongoose from "mongoose";

let Schema = mongoose.Schema;

let ProductsSchema = new Schema(
  {
    product_id: Number,
    id: String,
    title: String,
    description: String,
    manufacturer: String,
    price: Number,
    image: String,
  },
  { collection: "products" }
);

export default mongoose.model("Product", ProductsSchema);
