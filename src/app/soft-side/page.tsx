import Masonry, { MasonryItem } from "@/components/ui/masonry";
import { getYouPhotosManifest } from "@/lib/photos";

export default async function SoftSidePage() {
  const manifest = getYouPhotosManifest();

  const approxHeights = [420, 520, 600, 480, 560, 640, 500, 580, 460];

  const items: MasonryItem[] = manifest.map((p, idx) => ({
    id: p.id,
    img: p.src,
    url: p.src,
    alt: p.alt,
    height: approxHeights[idx % approxHeights.length],
  }));

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
