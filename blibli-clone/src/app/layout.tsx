import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
