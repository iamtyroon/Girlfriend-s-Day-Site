"use client";

import Masonry from "@/components/ui/masonry";

export default function SoftSidePage() {
  const photoFilenames = [
    'IMG_0134.jpg',
    'IMG_0135.jpg',
    'IMG_0136.jpg',
    'IMG_0138.jpg',
    'IMG_0140.jpg',
    'IMG_0142.jpg',
    'IMG_0143.jpg',
    'IMG_0144.jpg',
    'IMG_0145.jpg',
  ];

  const heights = [400, 550, 600, 450, 500, 700, 420, 580, 480];

  const items = photoFilenames.map((filename, index) => {
    const imgPath = `/assets/photos/you being you/${filename}`;
    return {
      id: filename,
      img: imgPath,
      url: imgPath,
      height: heights[index % heights.length], 
    };
  });
  
  return (
    <section id="soft-side" className="py-16 px-4">
      <h2 className="text-3xl font-bold text-accent mb-8 text-center">The Soft Side of You</h2>
      <div className="h-[200vh]">
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={1.05}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      </div>
    </section>
  );
}
