// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lina Leyonmarck | Art & Printings",
  description: "Gallery and webshop for Lina Leyonmarck.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* min-h-screen and flex-col ensure the footer is always pushed to the 
        bottom of the screen, even if the page has very little content. 
      */}
      <body className={`${inter.className} antialiased bg-surface text-surfaceDark min-h-screen flex flex-col pt-20`}>
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-12 flex-grow w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}