import { NextResponse } from 'next/server';
import { getPhotoFolders, getPhotosByFolder } from '@/lib/photos';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder');

  try {
    if (folder) {
      const photos = await getPhotosByFolder(folder);
      return NextResponse.json(photos);
    } else {
      const folderNames = await getPhotoFolders();
      const filteredFolders = folderNames.filter(folder => folder !== 'you');
      return NextResponse.json(filteredFolders);
    }
  } catch (error) {
    console.error('API Error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
