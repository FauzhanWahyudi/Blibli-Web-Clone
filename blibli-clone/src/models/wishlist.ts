import { db } from "@/db";
import { IWishList } from "@/interfaces/wishlist";
import { ObjectId } from "mongodb";

export default class WishList {
  static collection = db.collection("wishlist");

  static async addWishList(body: IWishList) {
    const newWishList = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    try {
      await WishList.collection.insertOne(newWishList);
      return newWishList;
    } catch (error) {
      console.log("🚀 ~ WishList ~ addWishList ~ error:", error);
      throw error;
    }
  }

  static async getWishList(userId: ObjectId) {
    return await WishList.collection
      .aggregate([
        { $match: { userId } },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: {
            path: "$product",
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ])
      .toArray();
  }
}
