import { rupiah } from "@/helpers/rupiah";
import { IProduct } from "@/interfaces/product";
import Image from "next/image";
import Link from "next/link";
import { IoHeartOutline } from "react-icons/io5";
import { WishButton } from "./wishButton";

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <div className="card h-[30rem] w-64 justify-between bg-base-100 shadow-xl">
      <Link href={"/products/" + product._id} className="">
        <figure>
          <Image
            src={product.thumbnail}
            width={300}
            height={300}
            alt="Shoes"
            className="w-full"
          />
        </figure>
        <div className="card-body text-center">
          <h2 className="card-title line-clamp-2 h-8">{product.name}</h2>
          <h3>{rupiah(product.price)}</h3>
          <div className="line-clamp-2 text-left">
            <p>{product.excerpt}</p>
          </div>
        </div>
      </Link>
      <div className="flex items-end justify-end pb-2 pr-4">
        <WishButton productId={String(product._id)} />
      </div>
    </div>
  );
}
