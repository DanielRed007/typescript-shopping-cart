import * as mongoose from "mongoose";
import { ObjectId } from "mongoose";
import { IProduct } from "../interfaces/interfaces";

let Schema = mongoose.Schema;

let ProductsSchema = new Schema(
  {
    _id: String,
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

export default mongoose.model<IProduct>("Product", ProductsSchema);
