// src/app/page.tsx
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

export default async function Home() {
  const rawPrints = await prisma.print.findMany();
  
  // Randomize the order on every refresh
  const randomizedPrints = shuffleArray(rawPrints);

  return (
    <div className="flex flex-col gap-24 py-10">
      <FadeIn>
        <header className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
            Selected Works
          </h1>
          <p className="text-gray-500 text-sm tracking-wide uppercase">
            An archive of past paintings & exhibitions
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={0.2}>
        {randomizedPrints.length > 0 ? (
          <PastPrintingsGallery prints={randomizedPrints} />
        ) : (
          <div className="text-center py-32 text-gray-400">
            <p>No paintings found in the database yet.</p>
          </div>
        )}
      </FadeIn>
    </div>
  );
}