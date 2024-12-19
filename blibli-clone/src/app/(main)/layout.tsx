import Footer from "@/components/daisy/footer";
import MiniNavbar from "@/components/daisy/miniNavbar";
import Navbar from "@/components/daisy/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BliBli Clone",
  description: "Blibli by fauzhan wahyudi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full justify-center">
      <div className="w-4/6">
        <header className="sticky top-0 z-50 bg-white">
          <MiniNavbar />
          <Navbar />
        </header>
        {children}
        <Footer />
      </div>
    </div>
  );
}
