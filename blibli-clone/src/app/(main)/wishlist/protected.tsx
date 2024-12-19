import User from "@/models/user";
import { headers } from "next/headers";
import Link from "next/link";
import { ReactNode } from "react";

export default async function Protected({ children }: { children: ReactNode }) {
  "use server";
  let isUserValid: boolean = true;
  const userId = headers().get("x-user-id") as string;
  console.log("🚀 ~ Protected ~ userId:", userId);
  const user = await User.findById(userId);
  if (!user) {
    // throw new HttpError("Invalid Token", 401);
    isUserValid = false;
  }
  return (
    <>
      {isUserValid ? (
        children
      ) : (
        <div className="grid h-screen place-content-center bg-white px-4">
          <div className="text-center">
            <h1 className="text-9xl font-black text-red-200">401</h1>

            <p className="text-2xl font-extrabold tracking-tight text-red-600 sm:text-4xl">
              Unauthenticated!
            </p>

            <p className="mt-4 text-gray-500">
              please login to your account first
            </p>

            <Link href="/login" className="btn btn-outline btn-primary mt-6">
              Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
