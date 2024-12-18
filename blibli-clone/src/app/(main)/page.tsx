import Carousel from "@/components/daisy/carousel";
import FeaturedProduct from "@/components/daisy/featured";

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Carousel />
      </div>
      <div>
        <FeaturedProduct />
      </div>
    </div>
  );
}
