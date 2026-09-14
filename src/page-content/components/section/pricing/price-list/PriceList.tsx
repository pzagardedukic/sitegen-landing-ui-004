"use client";

import { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import FilterChips from "@/components/common/FilterChips";
import Tag from "@/components/common/Tag";
import { getPricingSection, useLanguage } from "@/core/runtime";
import {
  getButtonTranslation,
  getPricingTranslation_packagesNoImages,
} from "@/core/translations";
import { stripRichText } from "@/core/utils";
import DiscountBadge from "../common/DiscountBadge";
import FeatureList from "../common/FeatureList";
import PriceValue from "../common/PriceValue";
import PricingCtaButton from "../common/PricingCtaButton";
import StatusBadge from "../common/StatusBadge";
import { useVisiblePricingItems } from "../common/useVisiblePricingItems";

/*
 * The price list from the Lumiera frames: one wide row per item — the picture on a pill,
 * the name with its badges, the feature pairs in the middle, and the price with its button
 * at the end. The recommended item is lifted onto the cream card with a gold edge; the rest
 * are divided by hairlines. Below desktop every row becomes a card of its own, because the
 * three columns have nowhere to go on a phone.
 *
 * The frames filter by category with the same pills as every other list page in the theme
 * rather than heading a group per category, so the list follows them. The picture is drawn
 * only where the item has one — this variant is the one a customer fills without images.
 */
export default function PriceList() {
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "28px", md: "32px" } }}>
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

      <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "20px", md: 0 } }}>
        {items.map((item, index) => {
          const highlighted = item.recommended;
          /* Two borders would meet where a plain row follows the recommended card. */
          const afterHighlight = index > 0 && items[index - 1].recommended;
          const hasBadges =
            highlighted ||
            item.status === "COMING_SOON" ||
            item.status === "UNAVAILABLE" ||
            Boolean(item.price.discountedValue);

          return (
            <Box
              key={item.id}
              sx={(theme) => ({
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "stretch", md: "center" },
                gap: { xs: "14px", md: "32px" },
                px: { xs: "20px", md: highlighted ? "28px" : 0 },
                py: { xs: "22px", md: "28px" },
                borderRadius: { xs: "16px", md: highlighted ? "16px" : 0 },
                borderStyle: "solid",
                borderColor: highlighted
                  ? theme.palette.primary.main
                  : theme.palette.surfaces.border,
                borderWidth: highlighted
                  ? "1px"
                  : { xs: "1px", md: index === 0 || afterHighlight ? 0 : "1px 0 0" },
                backgroundColor: highlighted
                  ? theme.palette.surfaces.surface
                  : "transparent",
              })}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "flex-start", md: "center" },
                  gap: { xs: "14px", md: "24px" },
                  width: { md: 520 },
                  flexShrink: 0,
                }}
              >
                {item.images[0] && (
                  <Box
                    component="img"
                    src={item.images[0]}
                    alt=""
                    loading="lazy"
                    sx={(theme) => ({
                      flexShrink: 0,
                      width: { xs: 140, md: 170 },
                      height: { xs: 84, md: 100 },
                      objectFit: "cover",
                      borderRadius: "999px",
                      backgroundColor: theme.palette.surfaces.placeholder,
                      boxShadow: `0 0 0 4px ${theme.palette.surfaces.onImage}`,
                    })}
                  />
                )}

                <Box sx={{ minWidth: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {hasBadges && (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {highlighted && (
                        <Tag label={packagesTranslation.items.recommended} tone="brand" />
                      )}
                      <StatusBadge status={item.status} />
                      <DiscountBadge
                        price={item.price.value}
                        discountedValue={item.price.discountedValue}
                      />
                    </Box>
                  )}

                  <Typography variant="h5" component="h3">
                    {item.title}
                  </Typography>

                  {item.text && (
                    <Typography variant="body1" sx={{ color: "text.secondary" }}>
                      {stripRichText(item.text)}
                    </Typography>
                  )}

                  {item.category && (
                    <Typography variant="caption" component="p" sx={{ color: "text.secondary" }}>
                      {item.category}
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <FeatureList features={item.features} />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "flex-start", md: "flex-end" },
                  gap: "14px",
                  width: { md: 240 },
                  flexShrink: 0,
                }}
              >
                <PriceValue
                  value={item.price.value}
                  currency={item.price.currency}
                  unit={item.price.unit}
                  onAgreement={item.price.onAgreement}
                  discountedValue={item.price.discountedValue}
                />

                <PricingCtaButton
                  title={item.title}
                  tone={highlighted ? "dark" : "outline"}
                  sx={{ width: { xs: "100%", md: "auto" } }}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
