import { ObjectId } from "mongodb";

export interface IWishList {
  _id?: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
