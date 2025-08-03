"use client";
import RollingGallery from '@/components/ui/RollingGallery';
import { getPhotoFolders, getPhotosByFolder } from '@/lib/photos';
import { useEffect, useState } from 'react';

export default function MemoryArcadePage() {
  const [folders, setFolders] = useState<string[]>([]);
  const [photosByFolder, setPhotosByFolder] = useState<Record<string, { src: string; alt: string }[]>>({});

  useEffect(() => {
    async function fetchData() {
      const folderNames = await getPhotoFolders();
      const filteredFolders = folderNames.filter(folder => folder !== 'you');
      setFolders(filteredFolders);

      const photosData: Record<string, { src: string; alt: string }[]> = {};
      for (const folder of filteredFolders) {
        const photos = await getPhotosByFolder(folder);
        photosData[folder] = photos;
      }
      setPhotosByFolder(photosData);
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
