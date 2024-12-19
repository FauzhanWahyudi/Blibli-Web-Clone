import errorHandler, { HttpError } from "@/helpers/error";
import WishList from "@/models/wishlist";
import { ObjectId } from "mongodb";

import { NextRequest, NextResponse } from "next/server";
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const userId = request.headers.get("x-user-id") as string;
  const { id } = params;
  try {
    console.log("id", id);
    if (!ObjectId.isValid(id)) {
      throw new HttpError("Wish Id is required", 400);
    }
    const wish = await WishList.findWishById(id);
    if (wish?.userId.toString() === userId) {
      throw new HttpError("You are not authorized", 403);
    }
    await WishList.remove(id);
    return NextResponse.json(
      { message: "Success delete wish" },
      { status: 200 },
    );
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return errorHandler(error);
  }
}
