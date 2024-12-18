import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "BliBli Clone - Login/Register",
  description: "Blibli by fauzhan wahyudi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
