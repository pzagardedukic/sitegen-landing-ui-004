"use client";

import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Carousel from "@/components/carousel/Carousel";
import GlassCaption from "@/components/media/GlassCaption";

export type ImageCarouselItem = {
  image: string;
  text: string;
};

/*
 * One about photograph as Lumiera draws it: cover-cropped, rounded 20 on phones and 24
 * above, with the item's text in the glass card inset 16 / 16 / 24 from the bottom edge.
 * The size comes from the caller — a carousel slide or the single photograph.
 */
export function AboutPhoto({
  item,
  sx,
}: {
  item: ImageCarouselItem;
  sx?: SxProps<Theme>;
}) {
  return (
    <Box
      sx={[
        (theme) => ({
          position: "relative",
          overflow: "hidden",
          width: "100%",
          borderRadius: { xs: "20px", sm: "24px" },
          backgroundColor: theme.palette.surfaces.placeholder,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        component="img"
        src={item.image}
        alt=""
        loading="lazy"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {item.text && (
        <GlassCaption
          sx={{
            position: "absolute",
            left: { xs: 16, md: 24 },
            right: { xs: 16, md: 24 },
            bottom: { xs: 16, md: 24 },
          }}
        >
          {item.text}
        </GlassCaption>
      )}
    </Box>
  );
}

type ImageCarouselProps = {
  items: ImageCarouselItem[];
};

/*
 * The about carousel from the Lumiera frames: square-ish slides of a fixed width — 560 on
 * desktop, 520 × 440 on tablet, one full-width square on a phone — 24 / 20 / 16 apart, with
 * the controls under the first slide and no wider than it. On tablet and desktop the track
 * runs past the page margin to the screen edge (see AboutBlock), so the next photograph
 * shows as a peek.
 */
export default function ImageCarousel({ items }: ImageCarouselProps) {
  if (items.length === 0) return null;

  const slides = items.map((item, index) => (
    <AboutPhoto
      key={`${item.image}-${index}`}
      item={item}
      sx={{
        height: { sm: 440, md: 560 },
        aspectRatio: { xs: "1 / 1", sm: "auto" },
      }}
    />
  ));

  return (
    <Carousel
      items={slides}
      slideWidth={{ xs: "100%", sm: 520, md: 560 }}
      gap={{ xs: 16, sm: 20, md: 24 }}
      controlsGap={{ xs: 24, sm: 28, md: 32 }}
      controlsSx={{ maxWidth: { sm: 520, md: 560 } }}
      ariaLabel="Galerija o nas"
      /* Photographs with a caption, nothing to read and compare: they may move on their own. */
      autoPlayMs={6000}
    />
  );
}
