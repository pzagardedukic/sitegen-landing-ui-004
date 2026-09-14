"use client";

import { Box, Typography } from "@mui/material";
import Tag from "@/components/common/Tag";
import { getPricingItems, useLanguage } from "@/core/runtime";
import { getPricingTranslation_packagesNoImages } from "@/core/translations";
import { stripRichText } from "@/core/utils";
import DiscountBadge from "../common/DiscountBadge";
import FeatureList from "../common/FeatureList";
import PriceValue from "../common/PriceValue";
import PricingCtaButton from "../common/PricingCtaButton";
import StatusBadge from "../common/StatusBadge";

type PricingItem = ReturnType<typeof getPricingItems>[number];

/*
 * A package card from the Lumiera frames (384 wide, rounded 12, padded 36/32): the badges,
 * the name with its line of text and its category, then the price, the button, and the
 * features under a hairline.
 *
 * The features sit after the button because the frames put them there: the price and the
 * way to buy are what a reader compares between cards, and the detail follows once they
 * have stopped on one. The recommended package is marked by a heavier dark edge rather
 * than by a shadow — nothing in the theme is raised.
 */
export default function SubscriptionCard({ item }: { item: PricingItem }) {
  const { lang } = useLanguage();
  const packagesTranslation = getPricingTranslation_packagesNoImages(lang);

  const highlighted = item.recommended;
  const hasBadges =
    highlighted ||
    item.status === "COMING_SOON" ||
    item.status === "UNAVAILABLE" ||
    Boolean(item.price.discountedValue);

  return (
    <Box
      sx={(theme) => ({
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "22px",
        p: { xs: "28px 24px", md: "36px 32px" },
        borderRadius: "12px",
        backgroundColor: theme.palette.background.default,
        borderStyle: "solid",
        borderColor: highlighted ? theme.palette.text.primary : theme.palette.surfaces.border,
        borderWidth: highlighted ? "1.5px" : "1px",
      })}
    >
      {hasBadges && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {highlighted && <Tag label={packagesTranslation.items.recommended} tone="brand" />}
          <StatusBadge status={item.status} />
          <DiscountBadge
            price={item.price.value}
            discountedValue={item.price.discountedValue}
          />
        </Box>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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

      {/*
       * The price follows the text rather than being pushed to the foot of the card: held
       * down, a package with two lines of text opened a hole in the middle of the card.
       */}
      <Box>
        <PriceValue
          value={item.price.value}
          currency={item.price.currency}
          unit={item.price.unit}
          onAgreement={item.price.onAgreement}
          discountedValue={item.price.discountedValue}
        />
      </Box>

      <PricingCtaButton
        title={item.title}
        tone={highlighted ? "dark" : "outline"}
        fullWidth
      />

      {item.features.length > 0 && (
        <Box
          sx={(theme) => ({
            pt: "20px",
            borderTop: `1px solid ${theme.palette.surfaces.border}`,
          })}
        >
          <FeatureList features={item.features} ring />
        </Box>
      )}
    </Box>
  );
}
