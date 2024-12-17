import Image from "next/image";
import bliLogo from "@/assets/logo-blibli-blue.0f340eba.svg";
import { FaCartShopping } from "react-icons/fa6";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="navbar bg-base-100 gap-5">
      <div className="flex-shrink">
        <div tabIndex={0} className="h-full">
          <Image src={bliLogo} alt="bli-bli logo" />
        </div>
      </div>
      <div className="flex-grow">
        <div className="w-full">
          <form action="/" method="get">
            <div className="input input-bordered flex w-full flex-row justify-between p-0">
              <input
                type="text"
                name="search"
                placeholder="Search"
                className="ml-4 w-full md:w-auto"
              />
              <button className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-shrink">
        <button className="btn btn-ghost btn-circle">
          <FaCartShopping />
        </button>
        <div className="divider divider-horizontal"></div>
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
      </div>
    </div>
  );
}
