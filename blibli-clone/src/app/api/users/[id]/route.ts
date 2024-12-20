// path: /api/users/:id
//location: /src/app/api/users/[id]/route.ts
export const dynamic = "force-dynamic";

import User from "@/models/user";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
interface GetUseParams {
  params: {
    id: string;
  };
}
export async function GET(request: Request, { params }: GetUseParams) {
  try {
    const id = params.id;

    if (!ObjectId.isValid(id)) throw new Error("ID is not valid");

    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return NextResponse.json(error);
  }
}
