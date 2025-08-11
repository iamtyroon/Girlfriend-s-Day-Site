"use client";
import RollingGallery from '@/components/ui/RollingGallery';
import { useEffect, useState } from 'react';

export default function MemoryArcadePage() {
  const [folders, setFolders] = useState<string[]>([]);
  const [photosByFolder, setPhotosByFolder] = useState<Record<string, { src: string; alt: string }[]>>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/photos');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const folderNames = await res.json();
        setFolders(folderNames);

        const photosData: Record<string, { src: string; alt: string }[]> = {};
        for (const folder of folderNames) {
          const photoRes = await fetch(`/api/photos?folder=${folder}`);
          if (!photoRes.ok) {
            throw new Error(`HTTP error! status: ${photoRes.status}`);
          }
          const photos = await photoRes.json();
          photosData[folder] = photos;
        }
        setPhotosByFolder(photosData);
      } catch (error) {
        console.error("Failed to fetch photos:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <section id="memory-arcade" className="py-16 px-4">
      <h2 className="text-3xl font-bold text-accent mb-8 text-center">Memory Arcade</h2>
      <div className="space-y-12">
        {folders.map((folder) => (
          <div key={folder}>
            <h3 className="text-2xl font-semibold text-primary mb-4 capitalize text-center">{folder.replace(/ /g, ' ')}</h3>
            <RollingGallery
              images={photosByFolder[folder]?.map(p => p.src) || []}
              autoplay={true}
              pauseOnHover={true}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
