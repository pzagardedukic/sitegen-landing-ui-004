"use client";

import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/style.css";
import HoverZoomImage from "@/components/image/HoverZoomImage";

type CustomGalleryProps = {
  items: string[];
  currentPageItems?: string[];
  /**
   * "mosaic" is the section layout from the Figma frames. "strip" is the plain row of equal
   * thumbnails used on item detail pages, where the pictures all belong to one project or
   * product and the mosaic rhythm would fight the page around it.
   */
  variant?: "mosaic" | "strip";
  thumbSize?: number;
};

type ImgSize = { w: number; h: number };

/*
 * The gallery mosaic from the Lumiera frames. Each column splits its height differently,
 * which is what gives the block its rhythm — a grid of equal tiles reads as a contact sheet:
 *
 *   desktop  three columns 24 apart   380/260 · 260/380 · 320/320
 *   tablet   two columns 20 apart     300/200/240 · 200/300/240
 *   phone    two columns 14 apart     210/140/170 · 140/210/170
 *
 * Tiles are rounded 12. Items are dealt across the columns in reading order and each column
 * repeats its own pattern, so the shape holds whatever the item count. Every tile opens the
 * lightbox.
 */
const LAYOUTS = {
  phone: {
    columns: 2,
    gap: 14,
    heights: [
      [210, 140, 170],
      [140, 210, 170],
    ],
  },
  tablet: {
    columns: 2,
    gap: 20,
    heights: [
      [300, 200, 240],
      [200, 300, 240],
    ],
  },
  desktop: {
    columns: 3,
    gap: 24,
    heights: [
      [380, 260],
      [260, 380],
      [320, 320],
    ],
  },
} as const;

export const CustomGallery = ({
  items,
  currentPageItems,
  variant = "mosaic",
  thumbSize = 160,
}: CustomGalleryProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isTablet = useMediaQuery(theme.breakpoints.up("sm"));
  const layout = isDesktop
    ? LAYOUTS.desktop
    : isTablet
      ? LAYOUTS.tablet
      : LAYOUTS.phone;

  const [sizes, setSizes] = React.useState<Record<string, ImgSize>>({});

  // PhotoSwipe needs each picture's proportions, so tiles are laid out once their file loads.
  React.useEffect(() => {
    let cancelled = false;

    const missing = items.filter((src) => !sizes[src]);
    if (!missing.length) return;

    missing.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;

        setSizes((prev) => ({
          ...prev,
          [src]: {
            w: img.naturalWidth,
            h: img.naturalHeight,
          },
        }));
      };
      img.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, [items, sizes]);

  const visibleSet = new Set(currentPageItems ?? items);

  // Only laid-out items count towards the column pattern, so a paginated page keeps
  // the same shape as a full one.
  const laidOut = items.filter((src) => visibleSet.has(src) && sizes[src]);

  const columns: string[][] = Array.from({ length: layout.columns }, () => []);
  laidOut.forEach((src, index) => {
    columns[index % layout.columns].push(src);
  });

  const heightFor = (column: number, position: number) => {
    const pattern = layout.heights[column % layout.heights.length];
    return pattern[position % pattern.length];
  };

  if (variant === "strip") {
    return (
      <Gallery options={{ loop: true, wheelToZoom: true }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {laidOut.map((src, position) => {
            const size = sizes[src];

            return (
              <Item
                key={`${src}-${position}`}
                original={src}
                thumbnail={src}
                width={size.w}
                height={size.h}
              >
                {({ ref, open }) => (
                  <HoverZoomImage
                    ref={ref}
                    src={src}
                    alt={`Gallery Image ${position + 1}`}
                    onClick={open}
                    width={thumbSize}
                    sx={{
                      height: thumbSize,
                      borderRadius: "12px",
                      display: "block",
                    }}
                  />
                )}
              </Item>
            );
          })}
        </Box>
      </Gallery>
    );
  }

  return (
    <Gallery options={{ loop: true, wheelToZoom: true }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout.columns}, minmax(0, 1fr))`,
          gap: `${layout.gap}px`,
          alignItems: "start",
        }}
      >
        {columns.map((column, columnIndex) => (
          <Box
            key={columnIndex}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: `${layout.gap}px`,
            }}
          >
            {column.map((src, position) => {
              const size = sizes[src];
              const index = items.indexOf(src);

              return (
                <Item
                  key={`${src}-${position}`}
                  original={src}
                  thumbnail={src}
                  width={size.w}
                  height={size.h}
                >
                  {({ ref, open }) => (
                    <HoverZoomImage
                      ref={ref}
                      src={src}
                      alt={`Gallery Image ${index + 1}`}
                      onClick={open}
                      width="100%"
                      sx={{
                        height: heightFor(columnIndex, position),
                        borderRadius: "12px",
                        display: "block",
                      }}
                    />
                  )}
                </Item>
              );
            })}
          </Box>
        ))}
      </Box>
    </Gallery>
  );
};
