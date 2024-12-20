export const dynamic = "force-dynamic";
import { WishButton } from "@/components/daisy/wishButton";
import { rupiah } from "@/helpers/rupiah";
import { IProduct } from "@/interfaces/product";
import timeSince from "@/helpers/timeSince";
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa6";
import { Metadata } from "next";

interface ProductDetailSlug {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: ProductDetailSlug): Promise<Metadata> {
  // read route params
  const { slug } = params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/detail/${slug}`,
    {
      method: "GET",
    },
  );
  const product = (await response.json()) as IProduct;
  return {
    title: "BliBli Clone - " + product.name,
    description: product.description,
    openGraph: {
      images: [product.thumbnail],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailSlug) {
  // console.log(params);
  const { slug } = params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/detail/${slug}`,
    {
      method: "GET",
      // next: {
      //   tags: ["product-" + slug],
      // },
    },
  );
  const product = (await response.json()) as IProduct;
  console.log("🚀 ~ ProductDetailPage ~ product:", product.wishlist);
  return (
    <div>
      <div className="breadcrumbs w-full text-sm">
        <ul>
          <li>
            <Link href={"/products"}>Products</Link>
          </li>
          <li>
            <Link href={"#"}>{slug}</Link>
          </li>
        </ul>
      </div>
      <main className="flex w-full justify-between px-4">
        <div className="w-3/6 flex-col items-center">
          <div className="carousel">
            <div
              id="item1"
              className="carousel-item flex w-full justify-center"
            >
              <Image
                src={product.thumbnail}
                alt="thumbnail"
                width={500}
                height={500}
                className="mask mask-squircle"
              />
            </div>
            {product.images.map((image, index) => (
              <div
                key={index}
                className="carousel-item flex w-full justify-center"
                id={`item${index + 1}`}
              >
                <Image
                  src={image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="mask mask-squircle"
                />
              </div>
            ))}
          </div>
          <div className="m-auto mt-3 flex w-5/6 flex-wrap justify-center gap-4">
            <Link
              href="#item1"
              className="object-cover hover:scale-110 hover:rounded-3xl hover:ring-4 focus:rounded-3xl focus:ring-4"
            >
              <Image
                src={product.thumbnail}
                alt="thumbnail"
                width={60}
                height={60}
                className="mask mask-squircle"
              />
            </Link>
            {product.images.map((image, index) => (
              <Link
                key={index}
                href={"#item" + String(Number(index + 1))}
                className="object-cover hover:scale-110 hover:rounded-3xl hover:ring-4 focus:rounded-3xl focus:ring-4"
                id={"item" + Number(index + 1).toString()}
              >
                <Image
                  src={image}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="mask mask-squircle"
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="w-3/6">
          <p className="text-4xl font-bold text-gray-800">
            {rupiah(product.price)}
          </p>
          <p className="text-3xl font-bold text-gray-900">{product.name}</p>
          <p className="mt-4 text-lg text-gray-500">{product.excerpt}</p>

          <div className="mt-8">
            <p className="text-2xl font-semibold text-gray-700">Description</p>
            <p className="mt-2 text-base text-gray-600">
              {product.description}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="text-base font-bold text-blue-500">
              {timeSince(product.createdAt?.toString() as string)}
            </p>
            <div className="flex gap-2">
              {product?.tags.map((tag, index) => (
                <div className="badge badge-outline text-base" key={index}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <aside className="relative bottom-0 mt-4 w-full">
        <div className="card w-full bg-slate-200 shadow-2xl">
          <div className="flex items-center justify-between gap-8 px-5 py-2">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="mask mask-squircle w-12">
                  <Image
                    src={product.thumbnail}
                    alt="thumbnail"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
              <p>{product.name}</p>
            </div>
            <div>
              <div>
                <p>Total Harga:</p>
                <p className="font-bold">{rupiah(product.price)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-outline btn-primary rounded-full">
                Buy Now
              </button>
              <button className="btn btn-primary rounded-full">
                Add to Cart
              </button>
              {product.wishlist && product.wishlist.length > 0 ? (
                <Link href={"/wishlist"}>
                  <FaHeart className="text-3xl text-red-700" />
                </Link>
              ) : (
                <WishButton
                  type="add"
                  slug={product.slug}
                  productId={String(product._id)}
                />
              )}
              {/* <WishButton productId={String(product._id)} /> */}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
