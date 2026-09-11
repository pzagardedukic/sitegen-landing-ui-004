"use client";

import { Box } from "@mui/material";
import { getReviewSection, useLanguage } from "@/core/runtime";
import { getReviewTranslation } from "@/core/translations";
import CenteredIntro from "../common/CenteredIntro";
import Reviews from "./Reviews";

/*
 * The reviews section: the centred intro, its description allowed the Figma's 860, then the
 * cards 48 below. The mint ground is the section's own — see the reviews entry on the home
 * page, which hands Section its colour.
 */
export default function ReviewSection() {
  const { lang } = useLanguage();
  const reviewTranslation = getReviewTranslation(lang);
  const reviewSection = getReviewSection(lang);

  if (!reviewSection) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      <CenteredIntro
        title={reviewTranslation.title}
        description={reviewSection.text}
        descriptionMaxWidth={860}
      />
      <Reviews />
    </Box>
  );
}
