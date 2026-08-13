import type { Metadata } from "next";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";

export const metadata: Metadata = {
  title: "Aura Furnitures",
  description: "Premium Furnitures for your Home",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#F9F8F6] flex flex-col">
        <ShopProvider>{children}</ShopProvider>
      </body>
    </html>
  );
}
