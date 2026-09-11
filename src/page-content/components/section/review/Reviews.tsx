"use client";

import { Box } from "@mui/material";
import Carousel from "@/components/carousel/Carousel";
import { getReviewItems, useLanguage } from "@/core/runtime";
import { getReviewTranslation } from "@/core/translations";
import ReviewCard from "./ReviewCard";

/*
 * The review cards from the Lumiera frames: three abreast on desktop, 24 apart, each only
 * as tall as its own review; a carousel two cards wide on tablet and one on a phone, where
 * the cards in view share a height. The section sits on the mint wash, so the carousel's
 * back arrow is white rather than cream.
 */
export default function Reviews() {
  const { lang } = useLanguage();
  const reviewTranslation = getReviewTranslation(lang);
  const reviewItems = getReviewItems(lang);

  if (reviewItems.length === 0) return null;

  const cards = reviewItems.map((item, index) => (
    <ReviewCard
      key={`${item.title}-${index}`}
      review={{ text: item.text, author: item.title, url: item.url, image: item.image }}
    />
  ));

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "grid" },
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {cards}
      </Box>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Carousel
          items={cards}
          slideWidth={{ xs: "100%", sm: "calc(50% - 12px)" }}
          gap={24}
          controlsGap={{ xs: 24 }}
          controlsPrevTone="white"
          ariaLabel={reviewTranslation.title}
        />
      </Box>
    </>
  );
}
