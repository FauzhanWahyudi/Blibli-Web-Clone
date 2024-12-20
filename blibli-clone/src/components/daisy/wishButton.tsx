"use client";

export const dynamic = "force-dynamic";
import { useRouter } from "next/navigation";
import { IoHeartOutline } from "react-icons/io5";
import { FaDeleteLeft } from "react-icons/fa6";
import { revalidateByPath } from "@/actions/cache";
import { swalWithDaisyButtons } from "@/helpers/customAlert";
export function WishButton({
  type,
  productId,
  wishId,
  fetchWishList,
}: {
  type: string;
  productId?: string;
  wishId?: string;
  fetchWishList?: () => void;
}) {
  const router = useRouter();

  //adder
  const wishAdder = async () => {
    // console.log("productId", productId);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`,
      {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const responseJson = await response.json();

    if (!response.ok) {
      if (responseJson.message === "Wish already registered") {
        return swalWithDaisyButtons.fire({
          title: "Error!",
          text: responseJson.message,
          icon: "error",
          confirmButtonText: "Oke",
        });
      }
      return swalWithDaisyButtons
        .fire({
          title: "Error!",
          text: responseJson.message,
          icon: "error",
          confirmButtonText: "Login",
        })
        .then((result) => {
          if (result.isConfirmed) router.push("/login");
        });
    }
    swalWithDaisyButtons.fire({
      title: "Success!",
      text: "Your wish added.",
      icon: "success",
    });
    await revalidateByPath("/(main)/products/[slug]", "layout");
    // await revalidateByTag("product-" + slug);
    router.push("/wishlist");
  };

  //delete
  const deleteWish = async (id: string) => {
    swalWithDaisyButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "btn btn-primary",
        cancelButtonColor: "btn btn-warning",
        confirmButtonText: "Yes, delete it!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/` + id, {
            method: "DELETE",
          }).then(() => {
            //success info
            swalWithDaisyButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            //function optional chaining
            fetchWishList?.();
          });
        }
        await revalidateByPath("/(main)/products/[slug]", "layout");
      });
  };
  return (
    <>
      {type === "add" ? (
        <button onClick={wishAdder}>
          <IoHeartOutline className="text-3xl" />
        </button>
      ) : (
        <button
          onClick={() => deleteWish(wishId as string)}
          className="btn btn-ghost btn-xs text-lg hover:text-red-600"
        >
          <FaDeleteLeft />
        </button>
      )}
    </>
  );
}
