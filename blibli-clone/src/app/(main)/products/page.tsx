"use client";
import ProductCard from "@/components/daisy/productCard";
import { IProduct } from "@/interfaces/product";
import { useEffect, useState } from "react";
export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
        {
          method: "GET",
        },
      );
      const { products } = (await response.json()) as { products: IProduct[] };
      console.log(products);
      setProducts(products);
    })();
  }, []);
  return (
    <div className="my-16 flex flex-wrap items-center justify-between gap-x-3 gap-y-8 sm:items-start">
      {products.length &&
        products.length > 0 &&
        products.map((product) => {
          return <ProductCard product={product} key={String(product._id)} />;
        })}
    </div>
  );
}
