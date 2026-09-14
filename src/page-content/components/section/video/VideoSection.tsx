"use client";

import { Box, Typography } from "@mui/material";
import Carousel from "@/components/carousel/Carousel";
import { getVideoSection, useLanguage } from "@/core/runtime";
import { getVideosTranslation } from "@/core/translations";
import VideoThumbnail from "./VideoThumbnail";

/*
 * The videos page from the Lumiera frames: the title, then the tiles two abreast on desktop
 * 32 apart, and a carousel below that — two tiles wide on tablet, one on a phone. The
 * section is left out when there are no videos.
 */
export default function VideoSection() {
  const { lang } = useLanguage();
  const videosTranslation = getVideosTranslation(lang);
  const videoSection = getVideoSection();

  if (!videoSection || videoSection.items.length === 0) return null;

  const tiles = videoSection.items.map((url: string, index: number) => (
    <VideoThumbnail key={index} videoUrl={url} />
  ));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <Box
        sx={{
          display: { xs: "none", md: "grid" },
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "32px",
        }}
      >
        {tiles}
      </Box>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Carousel
          items={tiles}
          slideWidth={{ xs: "100%", sm: "calc(50% - 10px)" }}
          gap={20}
          controlsGap={{ xs: 24 }}
          ariaLabel={videosTranslation.title}
        />
      </Box>
    </Box>
  );
}
