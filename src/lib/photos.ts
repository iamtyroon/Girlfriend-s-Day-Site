import fs from "node:fs";
import path from "node:path";

/**
 * Server-only utility to discover images under public/assets/photos/you.
 * Returns public URLs (starting with /assets/...) and a basic alt text.
 */

export type PhotoEntry = {
  id: string;
  src: string; // public URL path, e.g. /assets/photos/you/...
  alt: string;
  date?: string; // The parent directory name, assumed to be the date
};

const PUBLIC_DIR = path.join(process.cwd(), "public");
const ROOT_PHOTOS_DIR = path.join(PUBLIC_DIR, "assets", "photos", "you");

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

/**
 * Discover all images under /public/assets/photos/you and return sorted by URL.
 * This should be called only on the server (e.g., in a Server Component).
 */
export function getYouPhotosManifest(): PhotoEntry[] {
  const files = walkDir(ROOT_PHOTOS_DIR);
  const entries: PhotoEntry[] = files.map((abs) => {
    const relFromPublic = path.relative(PUBLIC_DIR, abs).split(path.sep).join("/");
    const url = `/${relFromPublic}`;
    const alt = humanizeFilename(abs);
    const date = path.basename(path.dirname(abs));
    
    // Check if the parent directory is the root 'you' directory
    const isRootPhoto = path.dirname(abs) === ROOT_PHOTOS_DIR;

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
