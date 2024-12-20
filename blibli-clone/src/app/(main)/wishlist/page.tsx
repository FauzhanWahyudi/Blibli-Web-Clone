"use client";
export const dynamic = "force-dynamic";
import { WishButton } from "@/components/daisy/wishButton";
import { rupiah } from "@/helpers/rupiah";
import { IWishList } from "@/interfaces/wishlist";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WishList() {
  const [wishlist, setWishList] = useState<IWishList[]>([]);
  const [loading, isLoading] = useState(true);
  const fetchWishList = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`,
      {
        method: "GET",
      },
    );
    const data = await response.json();
    console.log("🚀 ~ fetchWishList ~ data:", data);
    setWishList(data.wishlist);
    isLoading(false);
  };
  useEffect(() => {
    setTimeout(() => {
      isLoading(true);
      fetchWishList();
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen flex-1">
      <div className="overflow-x-auto">
        {loading && (
          <div className="flex h-screen w-full flex-col items-center justify-center">
            <span className="loading loading-bars loading-lg"></span>
            <h1 className="animate-pulse font-bold">Loading...</h1>
          </div>
        )}
        {!loading && (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* looping wishlist */}
              {wishlist.length === 0 && (
                <h1 className="text-center text-5xl font-extrabold uppercase">
                  You have no wish in the list
                </h1>
              )}
              {wishlist.map((wish) => {
                return (
                  <tr key={wish._id?.toString()}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <Image
                              src={wish.product?.thumbnail as string}
                              alt="Avatar Tailwind CSS Component"
                              width={300}
                              height={300}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{wish.product?.name}</div>
                          <div className="text-wrap text-sm opacity-50">
                            {wish.product?.excerpt}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="line-clamp-4 max-w-xl hover:line-clamp-none">
                        {wish.product?.description}
                      </span>
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        tags: {wish.product?.tags.join(", ")}
                      </span>
                    </td>
                    <td>
                      Total <br />{" "}
                      <span className="font-bold">
                        {rupiah(wish.product?.price as number)}
                      </span>
                    </td>
                    <th>
                      <div className="flex gap-4">
                        <Link
                          href={"/products/" + wish.product?.slug}
                          className="btn btn-ghost btn-xs text-lg"
                        >
                          details
                        </Link>
                        <WishButton
                          type="delete"
                          wishId={wish._id?.toString() as string}
                          fetchWishList={fetchWishList}
                        />
                      </div>
                    </th>
                  </tr>
                );
              })}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </div>
  );
}
