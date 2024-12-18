import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Product from "@/models/product";
import ProductCard from "./productCard";
import Link from "next/link";

export default async function FeaturedProduct() {
  const products = (await Product.dummyFindAll()).slice(0, 10);
  return (
    <>
      <div className="flex w-full justify-between">
        <p className="text-2xl font-bold">Popular Product</p>
        <Link href={"/products"} className="link link-primary mx-4">
          See all
        </Link>
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {products.map((product, index) => (
            <div key={index} className="p-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}
