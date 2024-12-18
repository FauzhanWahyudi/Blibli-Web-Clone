import Image from "next/image";
import { Separator } from "../ui/separator";
import bliLogo from "@/assets/logo-blibli-blue.0f340eba.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer p-10 text-base-content">
      <aside>
        <Link href={"/"}>
          <Image src={bliLogo} alt="bli-bli logo" />
        </Link>
        <p>Toko online dengan sensasi belanja ala mall.</p>
        <Separator />
        <div className="w-64">
          <p className="text-wrap">
            Layanan Pengaduan Konsumen Direktorat Jenderal Perlindungan Konsumen
            dan Tertib Niaga Kementerian Perdagangan RI{" "}
          </p>
          <p className="mt-3">
            Whatsapp
            <br />
            <b className="text-base"> 0853-1111-1010</b>
          </p>
        </div>
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
  );
}
