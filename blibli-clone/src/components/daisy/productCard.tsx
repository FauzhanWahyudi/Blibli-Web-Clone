"use client";

export const dynamic = "force-dynamic";
import { rupiah } from "@/helpers/rupiah";
import { IProduct } from "@/interfaces/product";
import Image from "next/image";
import Link from "next/link";
import { WishButton } from "./wishButton";
import { FaHeart } from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function ProductCard({ product }: { product: IProduct }) {
  const [isUserWish, setIsUserWish] = useState(false);
  const checkUserWish = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/check/`,
      {
        method: "POST",
        body: JSON.stringify({ productId: product._id }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const { wish } = await response.json();
    if (!response.ok) {
      return false;
    }
    if (wish) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    checkUserWish().then((result) => {
      console.log("🚀 ~ checkUserWish ~ result:", result);
      setIsUserWish(result);
    });
  }, []);
  return (
    <div className="card h-[33rem] w-72 justify-between bg-base-100 shadow-xl">
      <Link href={"/products/" + product.slug}>
        <figure>
          <Image
            src={product.thumbnail}
            width={300}
            height={300}
            alt="Shoes"
            className="w-full rounded-t-2xl"
          />
        </figure>
        <div className="card-body text-center">
          <h2 className="card-title mb-2 line-clamp-2 h-6">{product.name}</h2>
          <h3>{rupiah(product.price)}</h3>
          <div className="line-clamp-2 text-left">
            <p>{product.excerpt}</p>
          </div>
        </div>
      </Link>

      <div className="flex items-end justify-between px-4 pb-2">
        <Link
          href={"/products/" + product.slug}
          className="btn btn-primary h-6 min-h-0 px-2"
        >
          Product Detail
        </Link>
        {isUserWish ? (
          <Link href={"/wishlist"}>
            <FaHeart className="text-3xl text-red-700" />
          </Link>
        ) : (
          <WishButton type="add" productId={String(product._id)} />
        )}
      </div>
    </div>
  );
}
