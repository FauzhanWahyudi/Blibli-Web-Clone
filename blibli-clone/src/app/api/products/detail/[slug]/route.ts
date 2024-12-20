// path: /api/users/:id
//location: /src/app/api/users/[id]/route.ts
export const dynamic = "force-dynamic";

import errorHandler, { HttpError } from "@/helpers/error";
import Product from "@/models/product";
import { NextResponse } from "next/server";
interface GetProductParams {
  params: {
    slug: string;
  };
}
export async function GET(request: Request, { params }: GetProductParams) {
  try {
    const slug = params.slug;
    const product = await Product.findBySlug(slug);
    if (!product) throw new HttpError("Product not found", 404);
    // console.log("test");
    console.log("🚀 ~ GET ~ product:", product);
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return errorHandler(error);
  }
}
