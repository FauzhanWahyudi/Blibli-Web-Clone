import { rupiah } from "@/helpers/rupiah";
import { IProduct } from "@/interfaces/product";
import Image from "next/image";

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <div className="card h-80 w-60 bg-base-100 shadow-xl">
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
    </div>
  );
}
