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
      <div className="w-3/6">
        <header>
          <MiniNavbar />
          <Navbar />
        </header>
        {children}
      </div>
    </div>
  );
}
