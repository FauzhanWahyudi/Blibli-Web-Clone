import { ObjectId } from "mongodb";

export interface IWishList {
  _id?: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
