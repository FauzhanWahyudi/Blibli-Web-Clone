import Protected from "./protected";
import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "WishList",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Protected>{children}</Protected>;
}
