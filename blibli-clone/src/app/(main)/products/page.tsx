"use client";
import ProductCard from "@/components/daisy/productCard";
import { IProduct } from "@/interfaces/product";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const searchParams = useSearchParams();
  const search = searchParams.get("search") as string;

  const fetchProducts = async (search: string, pageNum: number) => {
    search = search ? encodeURIComponent(search) : "";
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?search=${search}&page=${pageNum}&limit=10`,
      {
        method: "GET",
      },
    );
    const { products } = (await response.json()) as { products: IProduct[] };
    // console.log(products);
    if (products.length === 1) {
      setHasMore(false);
    }
    setProducts(products);
    setIsSearching(false);
  };

  useEffect(() => {
    setIsSearching(true);
    fetchProducts("", 1);
  }, []);

  useEffect(() => {
    //add delay so that fetch will only be done
    //when user don't add any input in 1 second
    const delayDebounce = setTimeout(() => {
      setPage(1);
      setHasMore(true);
      setIsSearching(true);
      fetchProducts(search, 1);
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [search]);
  return (
    <div className="my-16 flex flex-wrap items-center justify-evenly gap-x-3 gap-y-8 sm:items-start">
      {isSearching && (
        <div className="flex w-full flex-col items-center">
          <p className="loading loading-dots loading-lg"></p>
          <h1 className="text-center text-lg">...Searching</h1>
        </div>
      )}
      {!isSearching &&
        products.length > 0 &&
        products.map((product) => {
          return <ProductCard product={product} key={String(product._id)} />;
        })}
    </div>
  );
}
