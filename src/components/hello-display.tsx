"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";

export default function HelloDisplay() {
  const [text, setText] = useState("Hello World");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4 space-y-12">
      <div className="text-center">
        <h1 key={text} className="text-5xl md:text-7xl font-bold font-headline text-foreground animate-in fade-in duration-700">
          {text}
        </h1>
      </div>
      <div className="w-full max-w-md">
        <Input
          type="text"
          defaultValue={text}
          onChange={(e) => setText(e.target.value || " ")}
          placeholder="Type something..."
          className="w-full p-4 text-center text-xl"
          aria-label="Change display text"
        />
      </div>
    </main>
  );
}
