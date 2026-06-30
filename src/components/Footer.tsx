// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-10 mt-auto border-t border-gray-100 bg-surface z-40 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Navigation Links */}
        <div className="flex items-center gap-8 text-xs uppercase tracking-widest text-gray-500 font-medium">
          <Link href="/about" className="hover:text-black transition-colors duration-300">
            About
          </Link>
          <a href="mailto:contact@linaleyonmarck.com" className="hover:text-black transition-colors duration-300">
            Contact
          </a>
        </div>

        {/* Copyright & Stealth Admin Link */}
        <div className="flex items-center gap-4 text-[10px] text-gray-400">
          <p className="tracking-wider">© {new Date().getFullYear()} LINA LEYONMARCK</p>
          <span className="text-gray-200">|</span>
          <Link 
            href="/staff" 
            className="text-gray-200 hover:text-gray-600 transition-colors duration-300 tracking-widest uppercase"
          >
            STAFF
          </Link>
        </div>

      </div>
    </footer>
  );
}