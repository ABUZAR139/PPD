"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  fallback?: ReactNode;
  sizes?: string;
  fill?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
};

export function SmartImage({
  src,
  alt,
  className = "",
  fallbackClassName = "",
  fallback,
  sizes = "100vw",
  fill = false,
  priority = false,
  width,
  height,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={`${fill ? "absolute inset-0" : ""} ${className} ${fallbackClassName}`}
      >
        {fallback}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
