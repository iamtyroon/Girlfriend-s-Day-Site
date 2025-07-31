"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Play, Pause } from 'lucide-react';

export default function StageOfUsPage() {
  const [showSoundtrack, setShowSoundtrack] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const carouselItems = [
    { title: 'My Shot - Hamilton', quote: `"I am not throwing away my shot!"`, audio: '/assets/audio/hamilton-my-shot-lyrics-128-ytshorts.savetube.me.mp3' },
    { title: 'Freefall - Rainbow Kitten Surprise', quote: `"You're the only one I see"`, audio: '/assets/audio/rainbow-kitten-surprise-it-s-called-freefall-official-video-128-ytshorts.savetube.me.mp3' },
    { title: 'Love Like You - Steven Universe', quote: `"If I could begin to be, half of what you think of me..."`, audio: '/assets/audio/love-like-you-rebecca-sugar-lyrics-128-ytshorts.savetube.me.mp3' },
  ];

  useEffect(() => {
    // Create a single audio element
    audioRef.current = new Audio();

    // Set up event listener to update UI when audio ends
    const audio = audioRef.current;
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentlyPlaying(null);
    };
    audio.addEventListener('ended', onEnded);

    // Cleanup on unmount
    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.pause();
    };
  }, []);

  const togglePlay = (audioSrc: string) => {
    if (!audioRef.current) return;

    if (currentlyPlaying === audioSrc) {
      // It's the same song, toggle play/pause
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      // It's a new song
      audioRef.current.pause();
      audioRef.current.src = audioSrc;
      audioRef.current.play();
      setCurrentlyPlaying(audioSrc);
      setIsPlaying(true);
    }
  };

  return (
    <section id="stage-of-us" className="py-16 px-4 text-center">
      <h2 className="text-3xl font-bold text-accent mb-8">The Stage of Us</h2>
      <Image
        src="/assets/images/hamilton.png"
        alt="Hamilton Sprite"
        width={338}
        height={338}
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
                  <Button
                    onClick={() => togglePlay(item.audio)}
                    variant="ghost"
                    size="icon"
                    className="mt-4 rounded-full"
                  >
                    {currentlyPlaying === item.audio && isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6" />
                    )}
                  </Button>
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
