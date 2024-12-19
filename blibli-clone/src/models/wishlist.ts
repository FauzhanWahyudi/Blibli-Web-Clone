import { db } from "@/db";
import { IWishList } from "@/interfaces/wishlist";
import { ObjectId } from "mongodb";

export default class WishList {
  static collection = db.collection<IWishList>("wishlist");

  static async getWishList(userId: string) {
    try {
      return await WishList.collection
        .aggregate([
          { $match: { userId: new ObjectId(userId) } },
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
    } catch (error) {
      console.log("🚀 ~ WishList ~ getWishList ~ error:", error);
      throw error;
    }
  }

  static async findWish(userId: string, productId: string) {
    try {
      return await WishList.collection.findOne({
        $and: [
          { userId: new ObjectId(userId) },
          { productId: new ObjectId(productId) },
        ],
      });
    } catch (error) {
      console.log("🚀 ~ WishList ~ addWishList ~ error:", error);
      throw error;
    }
  }
  static async findWishById(id: string) {
    try {
      return await WishList.collection.findOne({
        id: new ObjectId(id),
      });
    } catch (error) {
      console.log("🚀 ~ WishList ~ findWishById ~ error:", error);
      throw error;
    }
  }

  static async addWishList(userId: string, productId: string) {
    const newWishList = {
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
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

  static async remove(id: string) {
    try {
      return await WishList.collection.deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.log("🚀 ~ WishList ~ remove ~ error:", error);
      throw error;
    }
  }
}
