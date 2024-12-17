import errorHandler from "@/helpers/error";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await Product.findAll();
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return errorHandler(error);
  }
}
