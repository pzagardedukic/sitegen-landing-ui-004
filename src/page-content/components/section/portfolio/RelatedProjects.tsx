"use client";

import { Box, Typography } from "@mui/material";
import Carousel from "@/components/carousel/Carousel";
import { getPortfolioItems, useLanguage } from "@/core/runtime";
import { getPortfolioTranslation } from "@/core/translations";
import {
  getPageSlugByKey,
  getPortfolioSlugById,
  withBasePath,
} from "@/core/static";
import PortfolioPreviewCard from "./PortfolioPreviewCard";

type PortfolioItem = ReturnType<typeof getPortfolioItems>[number];

type RelatedProjectsProps = {
  items: PortfolioItem[];
};

/*
 * The row that closes a project page: its heading (h4), then up to five compact cards —
 * five abreast on desktop, 20 apart, and a carousel two cards wide below that, as the
 * Lumiera frames draw it on tablet and phone alike.
 */
export default function RelatedProjects({ items }: RelatedProjectsProps) {
  const { lang } = useLanguage();
  const projectTranslations = getPortfolioTranslation(lang).project;

  if (items.length === 0) return null;

  const cards = items
    .slice(0, 5)
    .map((item) => (
      <PortfolioPreviewCard
        key={item.id}
        variant="compact"
        title={item.title}
        image={item.images[0]}
        href={withBasePath(
          `/${getPageSlugByKey("portfolio")}/${getPortfolioSlugById(item.id)}`,
        )}
      />
    ));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Typography variant="h4" component="h2">
        {projectTranslations.relatedProjects}
      </Typography>

      <Box
        sx={{
          display: { xs: "none", md: "grid" },
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: "20px",
          alignItems: "start",
        }}
      >
        {cards}
      </Box>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Carousel
          items={cards}
          slideWidth={{ xs: "calc(50% - 10px)" }}
          gap={20}
          controlsGap={{ xs: 24 }}
          ariaLabel={projectTranslations.relatedProjects}
        />
      </Box>
    </Box>
  );
}
