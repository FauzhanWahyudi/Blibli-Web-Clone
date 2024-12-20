"use client";
import { WishButton } from "@/components/daisy/wishButton";
import { rupiah } from "@/helpers/rupiah";
import { IWishList } from "@/interfaces/wishlist";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const swalWithDaisyButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "ml-4 btn btn-error",
  },
  buttonsStyling: false,
});

export default function WishList() {
  const [wishlist, setWishList] = useState<IWishList[]>([]);
  const fetchWishList = async () => {
    const response = await fetch("/api/wishlist", {
      method: "GET",
    });
    const data = await response.json();
    console.log("🚀 ~ fetchWishList ~ data:", data);
    setWishList(data.wishlist);
  };
  useEffect(() => {
    fetchWishList();
  }, []);

  return (
    <div className="min-h-screen flex-1">
      <div className="overflow-x-auto">
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
                        slug={wish.product?.slug}
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
      </div>
    </div>
  );
}
