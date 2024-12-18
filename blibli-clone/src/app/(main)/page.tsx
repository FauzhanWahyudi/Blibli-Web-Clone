import ProductCard from "@/components/daisy/productCard";
import Product from "@/models/product";
import Carousel from "@/components/daisy/carousel";
import FeaturedProduct from "@/components/daisy/featured";

export default async function HomePage() {
  const products = await Product.findAll();
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Carousel />
      </div>
      <div>
        <FeaturedProduct />
      </div>

      <div className="my-16 flex flex-wrap items-center justify-between gap-x-3 gap-y-8 sm:items-start">
        {products.length &&
          products.length > 0 &&
          products.map((product, index) => {
            return <ProductCard product={product} key={index} />;
          })}
      </div>
    </div>
  );
}
