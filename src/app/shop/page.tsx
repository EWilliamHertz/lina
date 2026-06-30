// src/app/shop/page.tsx
import FadeIn from "@/components/FadeIn";
import CheckoutButton from "@/components/CheckoutButton";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const shopItems = await prisma.print.findMany({
    where: { isForSale: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-16 py-10">
      <FadeIn>
        <header className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto mb-8">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
            Webshop
          </h1>
          <p className="text-gray-500 text-sm tracking-wide uppercase">
            Original Artworks & Limited Prints
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={0.2}>
        {shopItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {shopItems.map((item) => (
              <div key={item.id} className="group flex flex-col">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 rounded-lg mb-4">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
                
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide pr-4">
                      {item.title}
                    </h3>
                    {item.price && (
                      <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                        {item.price / 100} SEK
                      </span>
                    )}
                  </div>
                  
                  {item.description && (
                    <p className="text-xs text-gray-500 line-clamp-3 mb-4">
                      {item.description}
                    </p>
                  )}
                  
                  <div className="mt-auto">
                    {item.price && (
                      <CheckoutButton 
                        title={item.title} 
                        price={item.price} 
                        imageUrl={item.imageUrl} 
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 text-gray-400">
            <p>No items currently listed for sale.</p>
          </div>
        )}
      </FadeIn>
    </div>
  );
}