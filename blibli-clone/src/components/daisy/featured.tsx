import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Product from "@/models/product";
import ProductCard from "./productCard";
import Link from "next/link";

export default async function FeaturedProduct() {
  const products = (await Product.dummyFindAll()).slice(0, 10);
  return (
    <div className="flex flex-col justify-between pb-0 pt-5">
      <div className="flex w-full justify-between px-3">
        <p className="text-2xl font-bold">Featured Products</p>
        <Link href={"/products"} className="link link-primary mx-4">
          See all
        </Link>
      </div>
      <ScrollArea className="w-full whitespace-nowrap bg-transparent">
        <div className="flex w-max space-x-4 pb-2">
          {products.map((product, index) => (
            <div key={index} className="p-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
