"use client";

import Image from "next/image";
import { CldImage } from "next-cloudinary";

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

function isCloudinaryUrl(url: string): boolean {
  return !!CLOUD && url.includes(`res.cloudinary.com/${CLOUD}/`);
}

function isValidSrc(url: string): boolean {
  return url.startsWith("/") || url.startsWith("http://") || url.startsWith("https://");
}

// Extract Cloudinary public ID from a full secure_url
// Handles both plain URLs and URLs with transformation params (e.g. /upload/f_auto,q_auto,w_1600,c_limit/v123/Rudraksh/abc.jpg)
function toPublicId(url: string): string {
  if (!url || typeof url !== "string") return "";
  if (!url.includes("/upload/")) return url;

  const afterUpload = url.split("/upload/")[1];
  if (!afterUpload) return url;

  const segments = afterUpload.split("/");
  let i = 0;
  while (i < segments.length) {
    const seg = segments[i];
    // Check if segment is version (e.g. v1791625210 or v1)
    if (/^v\d+$/.test(seg)) {
      i++;
      break;
    }
    // Check if segment is transformation parameters (e.g. f_auto,q_auto,w_1600,c_limit)
    if (seg.includes(",") || /^[a-z]{1,3}_/.test(seg)) {
      i++;
      continue;
    }
    break;
  }

  const remaining = segments.slice(i).join("/");
  return remaining.replace(/\.[a-zA-Z0-9]+$/, "");
}

interface SmartImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export default function SmartImage({ src, alt, fill, width, height, sizes, className, priority }: SmartImageProps) {
  if (!isValidSrc(src)) return null;

  if (isCloudinaryUrl(src)) {
    return (
      <CldImage
        src={toPublicId(src)}
        alt={alt}
        fill={fill}
        width={!fill ? (width ?? 800) : undefined}
        height={!fill ? (height ?? 800) : undefined}
        sizes={sizes}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
}
