"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

type Print = {
  id: string;
  title: string;
  imageUrl: string;
  description?: string | null;
};

interface LightboxProps {
  prints: Print[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ prints, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Lock the background scrolling when the lightbox is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === prints.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? prints.length - 1 : prev - 1));
  };

  const currentPrint = prints[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-xl"
      >
        {/* Top Controls */}
        <div className="flex justify-end p-6">
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X size={32} strokeWidth={1.5} />
          </button>
        </div>

        {/* Enhanced Image Area */}
        <div className="flex-1 flex items-center justify-center relative px-12">
          <button onClick={handlePrev} className="absolute left-6 text-white/50 hover:text-white transition-colors">
            <ChevronLeft size={48} strokeWidth={1} />
          </button>
          
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-4xl aspect-[4/3] max-h-[65vh]"
          >
            <img 
              src={currentPrint.imageUrl} 
              alt={currentPrint.title}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </motion.div>

          <button onClick={handleNext} className="absolute right-6 text-white/50 hover:text-white transition-colors">
            <ChevronRight size={48} strokeWidth={1} />
          </button>
        </div>

        {/* Bottom Carousel Navigation */}
        <div className="h-32 bg-black/50 border-t border-white/10 p-4 flex items-center justify-center gap-4 overflow-x-auto">
          {prints.map((print, idx) => (
            <button 
              key={print.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-20 w-20 shrink-0 rounded-md overflow-hidden transition-all duration-300 ${
                idx === currentIndex ? "ring-2 ring-white opacity-100 scale-105" : "opacity-40 hover:opacity-100"
              }`}
            >
              <img src={print.imageUrl} alt={print.title} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}