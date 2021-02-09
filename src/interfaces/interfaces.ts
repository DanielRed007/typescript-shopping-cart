import { Document, ObjectId } from "mongoose";

export interface ICartProduct {
  product_id: number;
  id: string;
  title: string;
  description: string;
  manufacturer: string;
  price: number;
  image: string;
}

export interface IProduct extends Document {
  _id: string;
  product_id: number;
  id: string;
  title: string;
  description: string;
  manufacturer: string;
  price: number;
  image: string;
}

export interface ICartData {
  items: IProduct[];
  totals: number;
  formattedTotals: string;
}
