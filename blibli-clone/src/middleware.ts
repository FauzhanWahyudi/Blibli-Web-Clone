import { NextRequest, NextResponse } from "next/server";
import errorHandler, { HttpError } from "./helpers/error";
import { joseVerify } from "./helpers/jwt";
import User from "./models/user";
// import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
  try {
    const authCookies = request.cookies.get("Authorization");
    console.log("authCookies", authCookies);
    if (!authCookies) {
      throw new HttpError("Invalid Token", 401);
    }
    const { value } = authCookies;
    console.log("value", value);

    const [type, token] = value.split(" ");
    if (type.toLowerCase() !== "bearer") {
      throw new HttpError("Invalid Token", 401);
    }
    if (!token) {
      throw new HttpError("Invalid Token", 401);
    }
    const payload = (await joseVerify(token)) as { email: string; _id: string };
    if (!payload.email) {
      throw new HttpError("Invalid Token", 401);
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload._id);

    // // You can also set request headers in NextResponse.next
    const response = NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    });
    // console.log(response);
    return response;
  } catch (error) {
    console.log("🚀 ~ middleware ~ error:", error);
    errorHandler(error);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/wishlist/:path"],
};
