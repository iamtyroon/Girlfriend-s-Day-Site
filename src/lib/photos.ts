import fs from "node:fs";
import path from "node:path";

/**
 * Server-only utility to discover images under public/assets/photos.
 * Returns public URLs (starting with /assets/...) and a basic alt text.
 */

export type PhotoEntry = {
  id: string;
  src: string; // public URL path, e.g. /assets/photos/you/...
  alt: string;
  date?: string; // The parent directory name, assumed to be the date
};

const PUBLIC_DIR = path.join(process.cwd(), "public");
const ROOT_PHOTOS_DIR = path.join(PUBLIC_DIR, "assets", "photos");

const IMAGE_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".avif",
  ".JPG",
  ".JPEG",
  ".PNG",
]);

function humanizeFilename(filePath: string): string {
  const base = path.basename(filePath, path.extname(filePath));
  return base
    .replace(/[_()-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function walkDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkDir(full));
    } else {
      const ext = path.extname(entry.name);
      if (IMAGE_EXT.has(ext)) out.push(full);
    }
  }
  return out;
}

export async function getPhotoFolders(): Promise<string[]> {
  const entries = await fs.promises.readdir(ROOT_PHOTOS_DIR, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
}

export async function getPhotosByFolder(folder: string): Promise<{ src: string; alt: string }[]> {
  const folderPath = path.join(ROOT_PHOTOS_DIR, folder);
  const files = await fs.promises.readdir(folderPath);
  return files
    .filter(file => IMAGE_EXT.has(path.extname(file)))
    .map(file => ({
      src: `/assets/photos/${folder}/${file}`,
      alt: humanizeFilename(file),
    }));
}
/**
 * Discover all images under /public/assets/photos/you and return sorted by URL.
 * This should be called only on the server (e.g., in a Server Component).
 */
export function getYouPhotosManifest(): PhotoEntry[] {
  const youPhotosDir = path.join(ROOT_PHOTOS_DIR, "you");
  const files = walkDir(youPhotosDir);
  const entries: PhotoEntry[] = files.map((abs) => {
    const relFromPublic = path.relative(PUBLIC_DIR, abs).split(path.sep).join("/");
    const url = `/${relFromPublic}`;
    const alt = humanizeFilename(abs);
    const date = path.basename(path.dirname(abs));
    
    // Check if the parent directory is the root 'you' directory
    const isRootPhoto = path.dirname(abs) === youPhotosDir;

    return {
      id: relFromPublic, // stable key
      src: url,
      alt,
      date: isRootPhoto ? undefined : date,
    };
  });
  entries.sort((a, b) => a.src.localeCompare(b.src));
  return entries;
}
