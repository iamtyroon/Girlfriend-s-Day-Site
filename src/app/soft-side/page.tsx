"use client";

import Image from 'next/image';

export default function SoftSidePage() {
  return (
    <section id="soft-side" className="py-16 px-4">
      <h2 className="text-3xl font-bold text-accent mb-8 text-center">The Soft Side of You</h2>
      <div className="flex justify-around items-center flex-wrap">
        {[
          { quote: 'She said 3 biscuits, not 2, Tes!' },
          { quote: 'This AI would totally recommend Smocha naps.' },
          { quote: "Villanelle's got nothing on you, Agent Praise." },
        ].map((item, index) => (
          <div key={index} className="relative m-4 group animate-float">
            <Image
              src="/assets/icons/teddy-bear.png"
              alt={`Teddy Bear ${index + 1}`}
              width={150}
              height={150}
              data-ai-hint="teddy bear"
            />
            <div className="absolute bottom-[160px] left-1/2 -translate-x-1/2 bg-white text-black p-2 rounded-lg text-xs w-40 opacity-0 group-hover:opacity-100 transition-opacity">
              {item.quote}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
