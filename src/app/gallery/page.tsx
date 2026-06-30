// src/app/gallery/page.tsx
import FadeIn from "@/components/FadeIn";
import PastPrintingsGallery from "@/components/PastPrintingsGallery";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const dynamic = "force-dynamic";

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default async function GalleryPage() {
  const rawPrints = await prisma.print.findMany({
    where: { isForSale: false },
  });

  // Randomize the order on every refresh
  const randomizedPrints = shuffleArray(rawPrints);

  return (
    <div className="flex flex-col gap-16 py-10">
      <FadeIn>
        <header className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
            Archive & Gallery
          </h1>
          <p className="text-gray-500 text-sm tracking-wide uppercase">
            A curated selection of past paintings
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={0.2}>
        {randomizedPrints.length > 0 ? (
          <PastPrintingsGallery prints={randomizedPrints} />
        ) : (
          <div className="text-center py-32 text-gray-400">
            <p>No gallery images found. Use the Staff panel to upload some!</p>
          </div>
        )}
      </FadeIn>
    </div>
  );
}