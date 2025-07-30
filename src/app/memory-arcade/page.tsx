"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function MemoryArcadePage() {
  const [arcadeContent, setArcadeContent] = useState('');

  const arcadeCartridges = [
    { title: 'Our First Late Night Chat', content: 'Our first late night chat...' },
    { title: 'What We Binge', content: 'Bones, Love, Death & Robots, Bojack, Your Name, Love & Other Drugs' },
    { title: 'Canon Events', content: 'Vivy, JoJo’s, Red String Theory, Killing Eve' },
  ];

  return (
    <section id="memory-arcade" className="py-16 px-4 text-center">
      <h2 className="text-3xl font-bold text-accent mb-8">Interactive Memory Arcade</h2>
      <div className="flex justify-center gap-5 mb-5 flex-wrap">
        {arcadeCartridges.map((cart) => (
          <Button
            key={cart.title}
            onClick={() => setArcadeContent(cart.content)}
            className="bg-secondary border-2 border-primary p-5 h-auto hover:bg-accent"
          >
            {cart.title}
          </Button>
        ))}
      </div>
      <Card className="bg-card border-primary p-5 min-h-[100px] w-full max-w-2xl mx-auto">
        {arcadeContent}
      </Card>
    </section>
  );
}
