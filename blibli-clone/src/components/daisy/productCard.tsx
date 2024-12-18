import { IProduct } from "@/interfaces/product";
import Image from "next/image";

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <Image
          src={product.thumbnail}
          width={300}
          height={300}
          alt="Shoes"
          className="w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <div className="line-clamp-2 h-12">
          <p>{product.excerpt}</p>
        </div>
      </div>
    </div>
  );
}
