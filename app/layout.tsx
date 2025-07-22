import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./providers/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StyleMart - Nigeria's Premier Multi-Vendor Marketplace",
  description: "Discover amazing products from verified vendors across Nigeria. Shop fashion, electronics, beauty products and more with secure payments.",
  keywords: "marketplace, Nigeria, ecommerce, multi-vendor, fashion, electronics, shopping",
  authors: [{ name: "StyleMart Team" }],
  openGraph: {
    title: "StyleMart - Nigeria's Premier Multi-Vendor Marketplace",
    description: "Discover amazing products from verified vendors across Nigeria",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
