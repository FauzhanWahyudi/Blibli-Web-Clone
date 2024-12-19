import errorHandler, { HttpError } from "@/helpers/error";
import WishList from "@/models/wishlist";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("x-user-id") as string;
  console.log("🚀 ~ GET ~ userId:", userId);
  try {
    const wishlist = await WishList.getWishList(userId);
    return NextResponse.json({ wishlist }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return errorHandler(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id") as string;
    if (!userId) {
      throw new HttpError("UserId is required", 400);
    }
    const { productId } = (await request.json()) as { productId: string };
    console.log("productId", productId);
    if (!ObjectId.isValid(productId)) {
      throw new HttpError("ProductId is required", 400);
    }

    const wish = await WishList.findWish(userId, productId);
    if (wish) {
      console.log("🚀 ~ POST ~ wish:", wish);
      throw new HttpError("Wish already registered", 422);
    }

    const wishlist = await WishList.addWishList(userId, productId);
    return NextResponse.json({ wishlist }, { status: 201 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return errorHandler(error);
  }
}


