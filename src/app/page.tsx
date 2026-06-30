import FadeIn from "@/components/FadeIn";
import PastPrintingsGallery from "@/components/PastPrintingsGallery";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";




// Create a connection pool using the pg driver
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);




// Initialize Prisma Client with the new v7 adapter requirement
const prisma = new PrismaClient({ adapter });




// This forces Next.js to dynamically fetch the database on every page load
export const dynamic = "force-dynamic"; 

export default async function Home() {
  // Fetch prints from Neon, ordering by the newest first
  const prints = await prisma.print.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-24 py-10">
      <FadeIn>
        <header className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
            Selected Works
          </h1>
          <p className="text-gray-500 text-sm tracking-wide uppercase">
            An archive of past printings & exhibitions
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={0.2}>
        {prints.length > 0 ? (
          <PastPrintingsGallery prints={prints} />
        ) : (
          <div className="text-center py-32 text-gray-400">
            <p>No printings found in the database yet.</p>
          </div>
        )}
      </FadeIn>
    </div>
  );
}