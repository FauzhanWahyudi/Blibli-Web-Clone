"use client";
import { useRouter } from "next/navigation";
import { IoHeartOutline } from "react-icons/io5";

export function WishButton({ productId }: { productId: string }) {
  const router = useRouter();
  const wishAdder = async () => {
    console.log("productId", productId);
    router.push("/wishlist");
  };
  return (
    <button onClick={wishAdder}>
      <IoHeartOutline className="text-3xl" />
    </button>
  );
}
