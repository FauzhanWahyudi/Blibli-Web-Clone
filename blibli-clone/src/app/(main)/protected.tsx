import errorHandler, { HttpError } from "@/helpers/error";
import User from "@/models/user";
import { headers } from "next/headers";
import Link from "next/link";
import { ReactNode } from "react";

export default async function Protected({ children }: { children: ReactNode }) {
  let isUserValid: boolean = true;
  const userId = headers().get("x-user-id") as string;
  const user = await User.findById(userId);
  if (!user) {
    // throw new HttpError("Invalid Token", 401);
    isUserValid = false;
  }
  console.log("user", user);
  return (
    <>
      {isUserValid ? (
        children
      ) : (
        <div className="grid h-screen place-content-center bg-white px-4">
          <div className="text-center">
            <h1 className="text-9xl font-black text-gray-200">401</h1>

            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Uh-oh!
            </p>

            <p className="mt-4 text-gray-500">Invalid Error</p>

            <Link
              href="/"
              className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
