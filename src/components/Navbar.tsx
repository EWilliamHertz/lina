"use client";

import Link from "next/link";
import { ShoppingBag, Image as ImageIcon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-light tracking-widest text-gray-900 uppercase">
          Lina Leyonmarck
        </Link>
        
        <div className="flex items-center gap-8">
          <Link href="/gallery" className="text-sm font-medium text-gray-600 hover:text-black transition-colors flex items-center gap-2">
            <ImageIcon size={16} />
            Gallery
          </Link>
          <Link href="/shop" className="text-sm font-medium text-gray-600 hover:text-black transition-colors flex items-center gap-2">
            <ShoppingBag size={16} />
            Shop
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-black transition-colors flex items-center gap-2">
            <ImageIcon size={16} />
            About Me
          </Link>
        </div>
      </div>
    </nav>
  );
}