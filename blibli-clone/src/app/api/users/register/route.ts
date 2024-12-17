// path: /api/users/:id
//location: /src/app/api/users/[id]/route.ts

import User from "@/models/user";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await User.addUser(body);
    return NextResponse.json(
      { message: "Success create User" },
      { status: 200 },
    );
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return NextResponse.json(error);
  }
}
