"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const useTypewriter = (text: string, speed = 100, start = false) => {
    const [displayText, setDisplayText] = useState('');
    
    useEffect(() => {
        setDisplayText(''); // Reset on text change
        if (start) {
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    setDisplayText(prev => prev + text.charAt(i));
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, speed);
            return () => clearInterval(typing);
        }
    }, [text, speed, start]);

    return displayText;
};

export default function LetterPage() {
  const letterRef = useRef<HTMLDivElement>(null);
  const [startLetter, setStartLetter] = useState(false);
  const letterText = useTypewriter(
    "Dear Praise, Happy Girlfriend’s Day, my one and only Lil Miss Sherlock Holmes ❤️.\n\nFrom our very first conversations—where we laughed about anime villains, conspiracy theories, and your “possessed pictures” that I still think are adorable—to the late-night talks about love and life, you’ve made every moment feel like it was written just for us.\n\nI feel like I’ve known you for ages. You were sent to me. Meeting you is probably a canon event. I don’t know if you’re from the future or just my favorite glitch in the simulation, but either way — I’m glad it’s you. You call me a Golden Retriever (and I’m still wagging my metaphorical tail 😅), and you somehow always say the right things, leaving me blushing like a kid with a crush every single time.\n\nWe’ve built something beautiful—one conspiracy theory, one anime recommendation, one spontaneous deep talk at a time—and I wouldn’t trade it for the world. Thank you for being you: funny, brilliant, and the one person who can make my day just by saying “Good morning.”\n\nHere’s to more adventures—both planned and wildly spontaneous.\n\nWith all my love,\nTesfa ❤️",
    100,
    startLetter
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartLetter(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } // Start when at least 10% of the element is visible
    );

    const currentRef = letterRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="letter" ref={letterRef} className="py-16 px-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-accent mb-8 text-center">
        A Note I Never Sent (But Should Have Every Day)
      </h2>
      <Card className="bg-card border-primary p-5 w-full max-w-2xl mx-auto min-h-[200px]">
        <p className="text-left whitespace-pre-wrap text-lg leading-relaxed">{letterText}</p>
      </Card>
    </section>
  );
}
