import { rupiah } from "@/helpers/rupiah";
import { IProduct } from "@/interfaces/product";
import Image from "next/image";
import Link from "next/link";
import { WishButton } from "./wishButton";

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <div className="card h-[30rem] w-64 justify-between bg-base-100 shadow-xl">
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
          <h2 className="card-title line-clamp-2 h-6">{product.name}</h2>
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
        <WishButton productId={String(product._id)} />{" "}
      </div>
    </div>
  );
}
