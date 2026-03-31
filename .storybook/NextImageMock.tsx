import React from "react";
import type { ImageProps } from "next/image";

const NextImageMock = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      fill,
      style,
      sizes,
      loader,
      quality,
      priority,
      placeholder,
      blurDataURL,
      unoptimized,
      onLoadingComplete,
      ...rest
    },
    ref,
  ) => {
    const resolvedSrc =
      typeof src === "string" ? src : "src" in src ? src.src : "";

    const mergedStyle = fill
      ? {
          position: "absolute" as const,
          inset: 0,
          width: "100%",
          height: "100%",
          ...(style ?? {}),
        }
      : style;

    return (
      <img
        ref={ref}
        src={resolvedSrc}
        alt={alt}
        sizes={sizes}
        style={mergedStyle}
        {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    );
  },
);

NextImageMock.displayName = "NextImageMock";

export default NextImageMock;
