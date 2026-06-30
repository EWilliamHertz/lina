// src/components/CheckoutButton.tsx
"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface CheckoutButtonProps {
  title: string;
  price: number;
  imageUrl: string;
}

export default function CheckoutButton({ title, price, imageUrl }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, price, imageUrl }),
      });
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url; // Redirects the user to the Stripe Checkout page
      }
    } catch (error) {
      console.error("Checkout failed", error);
      alert("Checkout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout}
      disabled={isLoading}
      className="w-full bg-black text-white py-3 mt-4 text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors flex items-center justify-center disabled:bg-gray-400"
    >
      {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Purchase"}
    </button>
  );
}