"use client";

import { useMemo, useState } from "react";
import { Box } from "@mui/material";
import Carousel from "@/components/carousel/Carousel";
import FilterChips from "@/components/common/FilterChips";
import { getPricingSection, useLanguage } from "@/core/runtime";
import {
  getButtonTranslation,
  getPricingTranslation_packagesNoImages,
} from "@/core/translations";
import SubscriptionCard from "./SubscriptionCard";
import { useVisiblePricingItems } from "../common/useVisiblePricingItems";

/*
 * Packages as the Lumiera frames lay them out: the category pills, then the cards three
 * abreast on desktop and two on tablet, 24 apart. On a phone the frames draw a carousel —
 * a column of tall cards would otherwise be a page of scrolling before the first price.
 */
export default function SubscriptionSection() {
  const { lang } = useLanguage();
  const pricingSection = getPricingSection(lang);
  const pricingItems = useVisiblePricingItems();
  const packagesTranslation = getPricingTranslation_packagesNoImages(lang);
  const allLabel = getButtonTranslation(lang).all;

  const categories = pricingSection?.categoryOptions ?? [];
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const items = useMemo(
    () =>
      selectedCategoryId
        ? pricingItems.filter((item) => item.categoryId === selectedCategoryId)
        : pricingItems,
    [pricingItems, selectedCategoryId],
  );

  const cards = items.map((item) => (
    <SubscriptionCard key={item.id} item={item} />
  ));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "28px", md: "32px" },
      }}
    >
      {categories.length > 0 && (
        <FilterChips
          ariaLabel={allLabel}
          options={[
            { value: "", label: allLabel },
            ...categories.map((category) => ({
              value: category.id,
              label: category.name,
            })),
          ]}
          value={selectedCategoryId}
          onChange={setSelectedCategoryId}
        />
      )}

      <Box
        sx={{
          display: { xs: "none", sm: "grid" },
          gridTemplateColumns: {
            sm: "repeat(2, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
          },
          gap: "24px",
          alignItems: "stretch",
        }}
      >
        {cards}
      </Box>

      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <Carousel
          items={cards}
          slideWidth={{ xs: "100%" }}
          gap={20}
          controlsGap={{ xs: 24 }}
          ariaLabel={packagesTranslation.title}
        />
      </Box>
    </Box>
  );
}
