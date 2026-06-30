"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";
import { motion } from "framer-motion";

type Print = {
  id: string;
  title: string;
  imageUrl: string;
  description?: string | null;
};

export default function PastPrintingsGallery({ prints }: { prints: Print[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {prints.map((print, index) => (
          <motion.div
            key={print.id}
            whileHover={{ y: -5 }}
            className="group cursor-pointer flex flex-col gap-3"
            onClick={() => setLightboxIndex(index)}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 rounded-lg">
              <img
                src={print.imageUrl}
                alt={print.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
            {/* Only render the text block if the title doesn't contain our "Untitled" fallback */}
            {!print.title.toLowerCase().includes("untitled") && (
              <div className="flex flex-col mt-3">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">{print.title}</h3>
                {print.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{print.description}</p>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox 
          prints={prints} 
          initialIndex={lightboxIndex} 
          onClose={() => setLightboxIndex(null)} 
        />
      )}
    </>
  );
}