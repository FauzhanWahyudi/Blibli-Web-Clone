"use client";
import { swalWithDaisyButtons } from "@/app/(main)/wishlist/page";
import { useRouter } from "next/navigation";
import { IoHeartOutline } from "react-icons/io5";

export function WishButton({ productId }: { productId: string }) {
  const router = useRouter();
  const wishAdder = async () => {
    console.log("productId", productId);
    const response = await fetch("/api/wishlist", {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = await response.json();

    // console.log("response", response);
    // console.log("responseJson", responseJson);
    if (!response.ok) {
      return swalWithDaisyButtons.fire({
        title: "Error!",
        text: responseJson.message,
        icon: "error",
      });
    }
    swalWithDaisyButtons.fire({
      title: "Success!",
      text: "Your wish added.",
      icon: "success",
    });
    // console.log(response);
    router.push("/wishlist");
  };
  return (
    <button onClick={wishAdder}>
      <IoHeartOutline className="text-3xl" />
    </button>
  );
}
