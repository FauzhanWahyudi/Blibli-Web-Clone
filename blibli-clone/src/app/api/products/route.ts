import errorHandler from "@/helpers/error";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search") as string;
  console.log("🚀 ~ GET ~ search:", search);
  const page = request.nextUrl.searchParams.get("page") as string;
  console.log("🚀 ~ GET ~ page:", page);
  const limit = request.nextUrl.searchParams.get("limit") as string;
  console.log("🚀 ~ GET ~ limit:", limit);
  // console.log("🚀 ~ GET ~ search:", search);
  try {
    const { products } = await Product.findAll(
      search,
      Number(page),
      Number(limit),
    );
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return errorHandler(error);
  }
}
