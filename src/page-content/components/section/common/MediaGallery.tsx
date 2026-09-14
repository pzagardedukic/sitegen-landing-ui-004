"use client";

import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import type PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

type ImageSize = { width: number; height: number };

type MediaGalleryProps = {
  images: string[];
  /** Names the pictures for a screen reader — the project's or the item's title. */
  title: string;
};

/* PhotoSwipe needs each picture's own proportions, so they are read once the files load. */
function useImageSizes(sources: string[]) {
  const [sizes, setSizes] = useState<Record<string, ImageSize>>({});

  useEffect(() => {
    let cancelled = false;

    sources.forEach((src) => {
      const image = new Image();
      image.onload = () => {
        if (cancelled) return;
        setSizes((previous) => ({
          ...previous,
          [src]: { width: image.naturalWidth, height: image.naturalHeight },
        }));
      };
      image.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, [sources]);

  return sizes;
}

/*
 * The picture set on a detail page: the main photograph over a row of thumbnails, four to a
 * row, the current one outlined in the text colour. A thumbnail swaps the main photograph;
 * the main photograph opens the whole set in a lightbox, and paging there keeps the main
 * one in step, so closing it leaves the reader on the picture they stopped at.
 *
 * Shared by the project and the price item, which the frames draw the same way.
 */
export default function MediaGallery({ images, title }: MediaGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);
  const sizes = useImageSizes(images);

  useEffect(() => () => lightboxRef.current?.destroy(), []);

  if (images.length === 0) return null;

  const openLightbox = async (index: number) => {
    const { default: Lightbox } = await import("photoswipe/lightbox");

    lightboxRef.current?.destroy();
    const lightbox = new Lightbox({
      dataSource: images.map((src) => ({
        src,
        width: sizes[src]?.width ?? 1600,
        height: sizes[src]?.height ?? 1200,
      })),
      pswpModule: () => import("photoswipe"),
      loop: true,
      wheelToZoom: true,
    });
    lightbox.on("change", () => {
      if (lightbox.pswp) setActiveImage(lightbox.pswp.currIndex);
    });
    lightbox.init();
    lightbox.loadAndOpen(index);
    lightboxRef.current = lightbox;
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: { xs: "10px", md: "12px" },
      }}
    >
      <Box
        component="button"
        type="button"
        onClick={() => openLightbox(activeImage)}
        aria-label={`${title} — ${activeImage + 1} / ${images.length}`}
        sx={(theme) => ({
          display: "block",
          width: "100%",
          height: { xs: 300, sm: 480, md: 600 },
          p: 0,
          border: 0,
          borderRadius: "12px",
          overflow: "hidden",
          cursor: "zoom-in",
          backgroundColor: theme.palette.surfaces.placeholder,
        })}
      >
        <Box
          component="img"
          src={images[activeImage]}
          alt=""
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      {images.length > 1 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: { xs: "10px", md: "12px" },
          }}
        >
          {images.map((image, index) => (
            <Box
              key={`${image}-${index}`}
              component="button"
              type="button"
              aria-label={`${index + 1} / ${images.length}`}
              aria-pressed={index === activeImage}
              onClick={() => setActiveImage(index)}
              sx={(theme) => ({
                position: "relative",
                height: { xs: 70, sm: 110, md: 140 },
                p: 0,
                border: 0,
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                backgroundColor: theme.palette.surfaces.placeholder,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  borderRadius: "12px",
                  boxShadow:
                    index === activeImage
                      ? `inset 0 0 0 2px ${theme.palette.text.primary}`
                      : "none",
                },
              })}
            >
              <Box
                component="img"
                src={image}
                alt=""
                loading="lazy"
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
