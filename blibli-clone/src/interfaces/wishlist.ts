import { ObjectId } from "mongodb";
import { IProduct } from "./product";

export interface IWishList {
  _id?: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  product?: IProduct;
}
