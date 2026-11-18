import type { ImageMetadata } from 'astro';
import manifest from './photography.json';

const images = import.meta.glob<{ default: ImageMetadata }>('../assets/photography/*.jpg', { eager: true });

/** Each key owns a distinct photo; a missing mapping is a build error. */
export function getPhoto(key: string) {
  const normalized = key.replace(/\/$/, '') || '/';
  const entry = manifest[normalized as keyof typeof manifest];
  if (!entry) throw new Error(`Missing photography assignment: ${normalized}`);
  const image = images[`../assets/photography/${entry.id}.jpg`]?.default;
  if (!image) throw new Error(`Missing photo asset: ${entry.id}`);
  return { ...entry, image };
}
