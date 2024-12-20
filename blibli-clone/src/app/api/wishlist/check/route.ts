import errorHandler from "@/helpers/error";
import WishList from "@/models/wishlist";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id") as string;
    // console.log("🚀 ~ POST ~ userId:", userId);
    const { productId } = (await request.json()) as { productId: string };
    console.log("🚀 ~ POST ~ productId:", productId);

    const wish = await WishList.findWish(userId, productId);
    return NextResponse.json({ wish }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return errorHandler(error);
  }
}
