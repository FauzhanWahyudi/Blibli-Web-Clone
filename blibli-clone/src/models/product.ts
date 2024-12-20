import { db } from "@/db";
import generateExcerpt from "@/helpers/excerpt";
import { IProduct } from "@/interfaces/product";
import { ObjectId } from "mongodb";
import data from "../../../db.json";

export default class Product {
  static collection = db.collection<IProduct>("products");

  static async dummyFindAll() {
    const products = data.products;
    return products;
  }

  static async findAll(search?: string, page?: number, limit?: number) {
    try {
      search = search ? search : "";
      limit = limit ? limit : 10;
      page = page ? page - 1 : 0;
      console.log(page, limit);
      const offset = limit * page;
      const products = await Product.collection
        .aggregate([
          {
            $match: {
              $or: [
                {
                  name: {
                    $regex: search,
                  },
                },
                {
                  description: {
                    $regex: search,
                  },
                },
              ],
            },
          },
          {
            $skip: offset,
          },
          {
            $limit: limit,
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
        ])
        .toArray();
      // .find({
      //   $or: [
      //     { name: { $regex: search } },
      //     { description: { $regex: search } },
      //   ],
      // })
      // .limit(limit || 5)
      // .skip(offset)
      // .sort({ createdAt: -1 })
      return { products, limit, page };
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
      console.log("🚀 ~ Product ~ findBySlug ~ slug:", slug);
      const product = await Product.collection
        .aggregate([
          { $match: { slug } },
          {
            $lookup: {
              from: "wishlist",
              localField: "_id",
              foreignField: "productId",
              as: "wishlist",
            },
          },
        ])
        .toArray();
      console.log("🚀 ~ Product ~ findBySlug ~ product:", product[0].wishlist);
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
