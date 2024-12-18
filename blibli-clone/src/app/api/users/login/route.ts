import errorHandler from "@/helpers/error";
import User from "@/models/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { access_token } = await User.login(body);
    console.log(access_token);
    //set cookie
    cookies().set("Authorization", `Bearer ${access_token}`, {
      sameSite: "strict",
    });

    return NextResponse.json({ access_token });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return errorHandler(error);
  }
}
