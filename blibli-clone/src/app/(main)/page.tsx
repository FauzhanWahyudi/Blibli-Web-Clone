import Image from "next/image";
import ProductCard from "@/components/daisy/productCard";
import Product from "@/models/product";
import bliLogo from "@/assets/logo-blibli-blue.0f340eba.svg";
import Carousel from "@/components/daisy/carousel";

export default async function Home() {
  const products = await Product.findAll();
  return (
    <div className="flex-1">
      <Carousel />
      <main className="my-16 flex flex-wrap items-center gap-7 sm:items-start">
        {products.length &&
          products.length > 0 &&
          products.map((product, index) => {
            return <ProductCard product={product} key={index} />;
          })}
      </main>
      <footer className="footer p-10 text-base-content">
        <aside>
          <Image src={bliLogo} alt="bli-bli logo" />
          <p>Toko online dengan sensasi belanja ala mall.</p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link-hover link">
            Telepon <br />
            <span className="text-lg font-bold">0804-1-871-871</span>
          </a>
          <a className="link-hover link">
            Email <br />
            <span className="text-lg font-bold">customer.care@blibli.com</span>
          </a>
          <a className="link-hover link">
            Halaman Bantuan <br />
            <span className="text-lg font-bold text-blue-400">BlibliCarem</span>
          </a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link-hover link">About us</a>
          <a className="link-hover link">Blog Blibli Friends</a>
          <a className="link-hover link">News</a>
          <a className="link-hover link">Jobs</a>
        </nav>
        <nav>
          <h6 className="footer-title">Partnership</h6>
          <a className="link-hover link"> Affiliate Program</a>
          <a className="link-hover link">Sell at Blibli</a>
          <a className="link-hover link">B2B Program</a>
        </nav>
      </footer>
    </div>
  );
}
