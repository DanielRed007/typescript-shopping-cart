import { Document, ObjectId } from "mongoose";
import { Response, Request, Express } from "express";

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

export interface IRequestSession {
  cookie: any;
  cart: ICartData;
}

export interface IResponse extends Response {
  session: Express;
}

export interface IRequest extends Request {
  session: any;
}
