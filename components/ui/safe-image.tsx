"use client"

import Image, { ImageProps } from "next/image"
import React from "react"
import { cn } from "@/lib/utils"

// A drop-in replacement for next/image that avoids crashes on unconfigured remote hosts.
// - For local paths (starting with "/"), it uses next/image for optimization.
// - For absolute URLs (http/https), it renders a plain <img> and mimics `fill` layout.
// This prevents runtime errors when a new external host hasn't been whitelisted yet.

type SafeImageProps = Omit<ImageProps, "src"> & {
  src: string
}

export function SafeImage({ src, alt, className, style, fill, width, height, sizes, priority, ...rest }: SafeImageProps) {
  // Treat root-relative paths as local assets -> safe to use next/image
  const isLocal = typeof src === "string" && src.startsWith("/")

  if (isLocal) {
    return (
      <Image
        src={src}
        alt={alt}
        className={className}
        style={style}
        fill={fill}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        {...rest}
      />
    )
  }

  // Remote URL: render native <img> to avoid next/image host errors
  // When `fill` is requested, emulate it with absolute positioning and 100% sizing
  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn("absolute inset-0 w-full h-full object-cover", className)}
        style={style as React.CSSProperties}
        // sizes is irrelevant for native img when we force full size; keep for completeness
        {...(sizes ? { sizes } : {})}
        // width/height not needed in fill mode
      />
    )
  }

  // Non-fill mode: honor provided width/height if any
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style as React.CSSProperties}
      {...(width ? { width } : {})}
      {...(height ? { height } : {})}
    />
  )
}
