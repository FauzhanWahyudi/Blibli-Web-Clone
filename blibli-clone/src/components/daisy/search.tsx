"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/products?search=" + search);
        }}
      >
        <div className="input input-bordered flex w-full flex-row justify-between p-0">
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="ml-4 w-full"
            onChange={(e) => {
              setSearch(e.target.value);
              router.push("/products?search=" + search);
            }}
          />
          <button type="submit" className="btn btn-circle btn-ghost">
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
  );
}
