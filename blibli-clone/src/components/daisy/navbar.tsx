import Image from "next/image";
import bliLogo from "@/assets/logo-blibli-blue.0f340eba.svg";
import { FaCartShopping } from "react-icons/fa6";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import SearchBar from "./search";
export default function Navbar(request: NextRequest) {
  const authCookies = cookies().get("Authorization");
  // console.log("🚀 ~ Navbar ~ authCookies:", authCookies);

  return (
    <div className="navbar gap-5 bg-base-100">
      <div className="flex-shrink">
        <Link href={"/"} tabIndex={0} className="h-full">
          <Image src={bliLogo} alt="bli-bli logo" />
        </Link>
      </div>
      <div className="flex-grow">
        <SearchBar />
      </div>
      <div className="flex flex-shrink">
        <Link href={"/wishlist"} className="btn btn-circle btn-ghost">
          <FaCartShopping />
        </Link>
        <div className="divider divider-horizontal"></div>
        {!authCookies && (
          <>
            <Link
              href="/login"
              className="btn btn-outline btn-primary mr-2 h-8 min-h-0 w-20 rounded-full p-0 uppercase"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="btn btn-primary h-8 min-h-0 w-20 rounded-full p-0 uppercase text-white"
            >
              Sing Up
            </Link>
          </>
        )}
        {authCookies && (
          <form
            action={async () => {
              "use server";
              cookies().delete("Authorization");
              redirect("/");
            }}
          >
            <button
              type="submit"
              className="btn btn-error h-8 min-h-0 w-20 rounded-full p-0 uppercase text-white"
            >
              logout
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
