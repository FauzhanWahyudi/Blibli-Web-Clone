"use client";
export const dynamic = "force-dynamic";

import ProductCard from "@/components/daisy/productCard";
import InfiniteScroll from "react-infinite-scroll-component";
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?search=${search}&page=${pageNum}&limit=5`,
      {
        method: "GET",
      },
    );
    const { products } = (await response.json()) as { products: IProduct[] };
    // console.log(products);
    if (products.length === 1) {
      setHasMore(false);
    }
    if (products.length === 0) {
      // console.log(page);
      // no data fetched
      setHasMore(false);
    } else {
      // concat new with previous data
      setProducts((prevProducts) =>
        pageNum === 1 ? products : [...prevProducts, ...products],
      );
      setPage((prevPage) => prevPage + 1);
    }
    setIsSearching(false);
    // return products;
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
    <>
      {isSearching ? (
        <div className="flex h-screen w-full flex-col items-center justify-start">
          <p className="loading loading-dots loading-lg"></p>
          <h1 className="text-center text-lg">...Searching</h1>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={products.length} //This is important field to render the next data
          next={() => fetchProducts(search, page)}
          hasMore={hasMore}
          loader={
            <h4 className="my-8 text-center text-lg">
              <span className="loading loading-dots loading-lg"></span>
              <br />
              Loading...
            </h4>
          }
          endMessage={
            <p className="my-8 text-center">
              <b>No more data to load</b>
            </p>
          }
        >
          <div className="flex flex-wrap items-center justify-evenly gap-x-3 gap-y-8 py-14 sm:items-start">
            {products.map((product) => {
              return (
                <ProductCard product={product} key={String(product._id)} />
              );
            })}
          </div>
        </InfiniteScroll>
      )}
    </>
  );
}
