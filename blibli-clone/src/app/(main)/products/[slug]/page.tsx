import { WishButton } from "@/components/daisy/wishButton";
import { rupiah } from "@/helpers/rupiah";
import { IProduct } from "@/interfaces/product";
import Image from "next/image";
import Link from "next/link";

interface ProductDetailSlug {
  params: { slug: string };
}

export default async function ProductDetailPage({ params }: ProductDetailSlug) {
  // console.log(params);
  const { slug } = params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/detail/${slug}`,
    {
      method: "GET",
    },
  );
  const product = (await response.json()) as IProduct;
  console.log(product);
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
      <main className="flex w-full justify-between">
        <div className="w-3/6">
          <Image
            src={product.thumbnail}
            alt="thumbnail"
            width={500}
            height={500}
          />
        </div>
        <div className="w-3/6 text-wrap">
          <h1>{rupiah(product.price)}</h1>
          <br />
          <p>{product.name}</p>
          <br />
          <p>{product.description}</p>
          <br />
          <p>{product.tags}</p>
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
              <WishButton productId={String(product._id)} />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
