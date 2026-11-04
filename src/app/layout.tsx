import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LAMBERT — Functional Hardware for Cabinet Makers",
  description:
    "Factory-direct kitchen and wardrobe hardware. 266 SKUs across pull-out baskets, dish drawers, corner systems, trouser racks and shoe carousels. Request a quote.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-paper font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
