import { ObjectId } from "mongodb";
import { IoHeartOutline } from "react-icons/io5";

export async function WishButton({ productId }: { productId: string }) {
  const wishAdder = async () => {
    "use server";
    console.log("productId", productId);
  };
  return (
    <form action={wishAdder} className="relative z-20">
      <button type="submit">
        <IoHeartOutline className="text-2xl" />
      </button>
    </form>
  );
}
