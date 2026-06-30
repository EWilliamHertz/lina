import FadeIn from "@/components/FadeIn";
import PastPrintingsGallery from "@/components/PastPrintingsGallery";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  // Fetch ONLY items that are NOT in the shop
  const prints = await prisma.print.findMany({
    where: { isForSale: false },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-16 py-10">
      <FadeIn>
        <header className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
            Archive & Gallery
          </h1>
          <p className="text-gray-500 text-sm tracking-wide uppercase">
            A curated selection of past printings
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={0.2}>
        {prints.length > 0 ? (
          <PastPrintingsGallery prints={prints} />
        ) : (
          <div className="text-center py-32 text-gray-400">
            <p>No gallery images found. Use the Staff panel to upload some!</p>
          </div>
        )}
      </FadeIn>
    </div>
  );
}