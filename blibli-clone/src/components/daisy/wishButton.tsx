"use client";
import { swalWithDaisyButtons } from "@/app/(main)/wishlist/page";
import { useRouter } from "next/navigation";
import { IoHeartOutline } from "react-icons/io5";

export function WishButton({ productId }: { productId: string }) {
  const router = useRouter();
  const wishAdder = async () => {
    console.log("productId", productId);
    await fetch("/api/wishlist", {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        swalWithDaisyButtons.fire({
          title: "Success!",
          text: "Your wish added.",
          icon: "success",
        });
        router.push("/wishlist");
      })
      .catch(console.log);
  };
  return (
    <button onClick={wishAdder}>
      <IoHeartOutline className="text-3xl" />
    </button>
  );
}
