'use client';

import type { PdfImage } from '@/lib/pdf/ChatDocument';

const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;
const MAX_SIDE = 1200;

function mimeOf(name: string): string {
  if (/\.png$/i.test(name)) return 'image/png';
  if (/\.webp$/i.test(name)) return 'image/webp';
  return 'image/jpeg';
}

/**
 * Downscales the photos of the export to JPEGs small enough for a light PDF.
 * Only the photos that are actually referenced by messages are processed.
 */
export async function preparePhotos(
  media: Record<string, Uint8Array>,
  wanted: string[],
  onProgress?: (done: number, total: number) => void
): Promise<Record<string, PdfImage>> {
  const names = Array.from(new Set(wanted.filter((n) => IMAGE_EXT.test(n) && media[n])));
  const out: Record<string, PdfImage> = {};
  let done = 0;
  for (const name of names) {
    try {
      const blob = new Blob([media[name] as BlobPart], { type: mimeOf(name) });
      const bitmap = await createImageBitmap(blob);
      const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
      const width = Math.max(1, Math.round(bitmap.width * scale));
      const height = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(bitmap, 0, 0, width, height);
      bitmap.close();
      out[name] = { src: canvas.toDataURL('image/jpeg', 0.8), width, height };
    } catch {
      // Unreadable image: the PDF shows the file name instead.
    }
    onProgress?.(++done, names.length);
  }
  return out;
}

export function countPhotos(media: Record<string, Uint8Array>, attachments: string[]): number {
  return attachments.filter((a) => IMAGE_EXT.test(a) && media[a]).length;
}
