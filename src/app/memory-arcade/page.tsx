import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getYouPhotosManifest, type PhotoEntry } from "@/lib/photos";
import Image from "next/image";

export default async function MemoryArcadePage() {
  const manifest = await getYouPhotosManifest();

  // Group photos by date (assuming folder is the date)
  const photosByDate = manifest.reduce((acc, photo) => {
    const date = photo.date || 'Unsorted';
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(photo);
    return acc;
  }, {} as Record<string, PhotoEntry[]>);

  // Sort dates, with 'Unsorted' at the end
  const sortedDates = Object.keys(photosByDate).sort((a, b) => {
    if (a === 'Unsorted') return 1;
    if (b === 'Unsorted') return -1;
    // Assuming YYYY-MM-DD format for sorting
    return b.localeCompare(a);
  });

  return (
    <section id="memory-arcade" className="py-16 px-4">
      <h2 className="text-3xl font-bold text-accent mb-8 text-center">Memory Arcade</h2>
      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {sortedDates.map((date) => (
            <AccordionItem value={date} key={date}>
              <AccordionTrigger className="text-xl hover:no-underline">
                {date}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
                  {photosByDate[date].map((photo) => (
                    <div key={photo.id} className="relative aspect-square rounded-lg overflow-hidden border-2 border-primary shadow-lg">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
