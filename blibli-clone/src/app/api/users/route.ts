// path: /api/users
//location: /src/app/api/users/route.ts
export const dynamic = "force-dynamic";

import errorHandler from "@/helpers/error";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await User.findAll();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return errorHandler(error);
  }
}
