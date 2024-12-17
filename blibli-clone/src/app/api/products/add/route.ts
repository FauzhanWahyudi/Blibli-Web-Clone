// path: /api/users/:id
//location: /src/app/api/users/[id]/route.ts

import errorHandler, { HttpError } from "@/helpers/error";
import generateSlug from "@/helpers/slug";
import { IProduct } from "@/interfaces/product";
import Product from "@/models/product";
import { NextResponse } from "next/server";
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body: IProduct = await request.json();

    //Validation input with zod
    ProductSchema.parse(body);
    if (!body.slug) body.slug = generateSlug(body.name);

    const product = await Product.findBySlug(body.slug);
    if (product) throw new HttpError("Name not available", 422);
    console.log(product);
    const newProduct = await Product.create(body);
    return NextResponse.json(
      { message: "Success create Product", product: newProduct },
      { status: 201 },
    );
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return errorHandler(error);
  }
}
