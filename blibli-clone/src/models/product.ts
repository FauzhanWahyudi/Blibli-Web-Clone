import { db } from "@/db";
import generateExcerpt from "@/helpers/excerpt";
import { IProduct } from "@/interfaces/product";
import { ObjectId } from "mongodb";

export default class Product {
  static collection = db.collection("products");

  static async findAll() {
    try {
      return Product.collection.find().sort({ createdAt: -1 }).toArray();
    } catch (error) {
      console.log("🚀 ~ Product ~ findById ~ error:", error);
      throw error;
    }
  }

  static async findById(_id: ObjectId) {
    try {
      const product = await Product.collection
        .aggregate([
          { $match: { _id } },
          {
            $lookup: {
              from: "wishlist",
              localField: "_id",
              foreignField: "productId",
              as: "wishlist",
            },
          },
          {
            $unwind: { path: "$wishlist" },
          },
        ])
        .toArray();
      return product[0];
    } catch (error) {
      console.log("🚀 ~ Product ~ findById ~ error:", error);
      throw error;
    }
  }

  static async findBySlug(slug: string) {
    try {
      const product = await Product.collection
        .aggregate([
          { $match: { slug } },
          //   {
          //     $lookup: {
          //       from: "wishlist",
          //       localField: "_id",
          //       foreignField: "productId",
          //       as: "wishlist",
          //     },
          //   },
          //   {
          //     $unwind: { path: "$wishlist" },
          //   },
        ])
        .toArray();
      return product[0];
    } catch (error) {
      console.log("🚀 ~ Product ~ findById ~ error:", error);
      throw error;
    }
  }

  static async create(body: IProduct) {
    try {
      const newProduct = {
        ...body,
        excerpt: generateExcerpt(body.description, 0, 10, "..."),
        price: body.price || 0,
        tags: body.tags || [],
        thumbnail: body.thumbnail || "",
        images: body.images || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await Product.collection.insertOne(newProduct);
      return newProduct;
    } catch (error) {
      console.log("🚀 ~ Product ~ findById ~ error:", error);
      throw error;
    }
  }
}
