// src/app/about/page.tsx
import FadeIn from "@/components/FadeIn";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Portrait */}
        <FadeIn>
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 rounded-xl">
            {/* Make sure profile.jpg is inside your /public folder */}
            <Image 
              src="/profile.jpg" 
              alt="Lina Leyonmarck Portrait" 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </FadeIn>

        {/* Right Side: Biography */}
        <FadeIn delay={0.2}>
          <div className="flex flex-col justify-center space-y-8">
            <header>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-4">
                About
              </h1>
              <div className="w-12 h-[1px] bg-black"></div>
            </header>

            <div className="space-y-6 text-gray-600 font-light leading-relaxed">
              <p>
                I am so incredibly glad you found your way here. My name is Lina Leyonmarck and I live just outside Gothenburg (dreaming of a small house in the woods—one beautiful day it will come true!). When I am not working, I love spending time in the forest with my beloved dog Bond, cooking at home, hanging out with friends, or simply continuing to paint.
              </p>
              <p>
                I create art and illustrations focusing on nature, animals, and fantasy of all kinds. From me, you can order everything from playful illustrations for children's books to timeless artworks to decorate your home. I studied Illustration at Berghs School of Communication in Stockholm, but beyond that, I am entirely self-taught.
              </p>
              <p>
                Painting and creating have always been a natural part of me, and watercolor holds a particularly special place in my heart. It easily becomes uneven, playful, quirky, and unique with every brushstroke—exactly how I prefer it in both books and art!
              </p>
              <p>
                Whether you are here as a customer, a colleague, or just a curious soul, I am incredibly happy that you stopped by.
              </p>
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}