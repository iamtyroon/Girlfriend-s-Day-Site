"use client";

import { Card } from '@/components/ui/card';
import Image from 'next/image';

export default function GalleryWallPage() {
  return (
    <section id="gallery-wall" className="py-16 px-4">
      <h2 className="text-3xl font-bold text-accent mb-8 text-center">
        The Faces of My Favourite Villanelle
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {[
          { caption: 'Possessed? Nah. Just enchanting.', image: '/assets/images/pot.jpeg' },
          { caption: 'Golden Retriever approved ✔', image: '/assets/images/pot.jpeg' },
          { caption: 'This AI is in love.', image: '/assets/images/pot.jpeg' },
        ].map((photo, index) => (
          <Card key={index} className="relative border-4 border-primary overflow-hidden">
            <Image
              src={photo.image}
              alt={`Praise ${index + 1}`}
              width={300}
              height={400}
              className="pixelated w-full h-full object-cover"
              data-ai-hint="woman portrait"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm">
              <p>{photo.caption}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
