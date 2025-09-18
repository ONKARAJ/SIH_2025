export default function customImageLoader({ src, width, quality }) {
  // For external URLs, return them as-is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  
  // For internal images, use the default behavior
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
}