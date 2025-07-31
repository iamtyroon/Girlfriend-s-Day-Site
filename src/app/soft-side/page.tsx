"use client";

import Image from 'next/image';
import { Card } from '@/components/ui/card';

export default function SoftSidePage() {
  // Add the actual filenames of her photos to this array.
  // For example: ['praise1.jpg', 'praise2.png', 'another-photo.jpeg']
  // The paths will be relative to /assets/photos/you being you/
  const photoFilenames = [
    'photo1.jpg', 'photo2.jpg', 'photo3.jpg', 
    'photo4.jpg', 'photo5.jpg', 'photo6.jpg',
    'photo7.jpg', 'photo8.jpg', 'photo9.jpg',
  ];

  return (
    <section id="soft-side" className="py-16 px-4">
      <h2 className="text-3xl font-bold text-accent mb-8 text-center">The Soft Side of You</h2>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 max-w-6xl mx-auto">
        {photoFilenames.map((filename, index) => (
          <div key={index} className="break-inside-avoid">
            <Card className="overflow-hidden border-2 border-primary/50 hover:border-accent transition-all duration-300 shadow-lg hover:shadow-accent/30">
              <Image
                src={`/assets/photos/you being you/${filename}`}
                alt={`A photo of Praise ${index + 1}`}
                width={500}
                height={500}
                className="w-full h-auto object-cover"
                data-ai-hint="woman portrait"
                // In case an image fails to load, this will hide the broken image icon
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
