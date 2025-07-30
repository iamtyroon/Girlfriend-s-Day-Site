"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function StageOfUsPage() {
  const [showSoundtrack, setShowSoundtrack] = useState(false);
  const carouselItems = [
    { title: 'My Shot - Hamilton', quote: `"I am not throwing away my shot!"`, audio: '/assets/audio/hamilton-my-shot-lyrics-128-ytshorts.savetube.me.mp3' },
    { title: 'Freefall - Rainbow Kitten Surprise', quote: `"You're the only one I see"`, audio: '/assets/audio/rainbow-kitten-surprise-it-s-called-freefall-official-video-128-ytshorts.savetube.me.mp3' },
    { title: 'Love Like You - Steven Universe', quote: `"If I could begin to be, half of what you think of me..."`, audio: '/assets/audio/love-like-you-rebecca-sugar-lyrics-128-ytshorts.savetube.me.mp3' },
  ];

  return (
    <section id="stage-of-us" className="py-16 px-4 text-center">
      <h2 className="text-3xl font-bold text-accent mb-8">The Stage of Us</h2>
      <Image
        src="/assets/images/hamilton.png"
        alt="Hamilton Sprite"
        width={150}
        height={150}
        className="mx-auto mb-6"
        data-ai-hint="pixel art"
      />
      <Carousel id="stage-of-us-carousel" className="w-full max-w-lg mx-auto">
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <Card className="bg-card border-primary text-foreground">
                <CardContent className="flex flex-col items-center justify-center p-6 aspect-square">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm">{item.quote}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="prev-button" />
        <CarouselNext className="next-button" />
      </Carousel>
      <Button
        id="soundtrack-button"
        onClick={() => setShowSoundtrack(!showSoundtrack)}
        className="bg-accent text-accent-foreground mt-6"
      >
        Our Soundtrack
      </Button>
      {showSoundtrack && (
        <Card className="mt-4 p-4 bg-card rounded-lg max-w-md mx-auto">
          <ul>
            {carouselItems.map((item) => (
              <li key={item.title}>
                <a
                  href={item.audio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </section>
  );
}
