"use client";

import Image from 'next/image';

export default function WhereYouBloomPage() {
  return (
    <section id="where-you-bloom" className="py-16 px-4">
      <h2 className="text-3xl font-bold text-accent mb-8 text-center">Where You Bloom</h2>
      <div className="flex justify-around flex-wrap">
        {[
          'Your bravery in sharing your stories is one of the most beautiful things about you.',
          "You have the best taste in shows. 'Bones', 'Love, Death & Robots', 'BoJack'... all amazing.",
          "Your quirks are my favorite things. The 'AI from the future' and 'golden retriever energy'... never change.",
        ].map((tip, index) => (
          <div key={index} className="relative m-4 group">
            <Image
              src="/assets/icons/flower.png"
              alt={`Flower ${index + 1}`}
              width={225}
              height={225}
              className="animate-bloom-flower"
              data-ai-hint="flower"
            />
            <div
              className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[50px] h-[50px] bg-no-repeat bg-cover transition-transform group-hover:scale-125 group-hover:rotate-12 cursor-pointer"
              style={{ backgroundImage: "url('/assets/icons/butterfly.png')" }}
              data-ai-hint="butterfly"
            ></div>
            <div className="absolute bottom-[160px] left-1/2 -translate-x-1/2 bg-white text-black p-2 rounded-lg text-xs w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              {tip}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
