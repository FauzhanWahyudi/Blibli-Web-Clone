// path: /api/users/:id
//location: /src/app/api/users/[id]/route.ts

import errorHandler, { HttpError } from "@/helpers/error";
import { IUser } from "@/interfaces/user";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: IUser = await request.json();

    //validation done in form by hook form

    const { username, email } = body;

    let user = await User.findByUsername(username);
    if (user) throw new HttpError("Username must be unique", 422);

    user = await User.findByEmail(email);
    if (user) throw new HttpError("Email must be unique", 422);

    const newUser = await User.register(body);
    return NextResponse.json(
      { message: "Success create User", user: newUser },
      { status: 201 },
    );
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return errorHandler(error);
  }
}
