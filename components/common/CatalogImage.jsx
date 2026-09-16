import Image from 'next/image';
import { imageSize } from '@/lib/image-assets.js';

/**
 * next/image wrapper for catalogue artwork.
 *
 * Catalogue entries only store a path, so the intrinsic width/height come from
 * the generated asset manifest. Existing CSS keeps controlling the rendered
 * size (object-fit, fixed heights, aspect ratios), exactly as before.
 */
export default function CatalogImage({ src, alt = '', className, sizes = '100vw', priority = false, loading }) {
  const { width, height } = imageSize(src);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
      loading={loading}
    />
  );
}
