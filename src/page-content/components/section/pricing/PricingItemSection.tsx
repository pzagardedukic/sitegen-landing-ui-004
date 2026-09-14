"use client";

import { Box, Typography } from "@mui/material";
import BackButton from "@/components/button/BackButton";
import Tag from "@/components/common/Tag";
import { getPricingItems, getPricingSection, useLanguage } from "@/core/runtime";
import { useBackToList } from "@/core/react";
import { getPageSlugByKey } from "@/core/static";
import {
  getPricingTranslation_packagesNoImages,
  getPricingTranslation_priceListWithImages,
} from "@/core/translations";
import MediaGallery from "../common/MediaGallery";
import RichText from "../common/RichText";
import ShareActions from "../common/ShareActions";
import DiscountBadge from "./common/DiscountBadge";
import FeatureList from "./common/FeatureList";
import PriceValue from "./common/PriceValue";
import PricingCtaButton from "./common/PricingCtaButton";
import StatusBadge from "./common/StatusBadge";
import RelatedItems from "./store/RelatedItems";

/*
 * A price item's page, drawn the way a project's page is: the back pill, the pictures on
 * the left at 55 % with their thumbnail strip and lightbox, and the item's column on the
 * right — badges, name, text, the feature pairs, then the price on its own rule with the
 * way to buy under it. The items of the same category close the page.
 *
 * Only the store has item pages, which is what the spec gives a detail route for.
 */
export default function PricingItemSection({ id }: { id: number }) {
  const { lang } = useLanguage();

  /*
   * Ahead of the guards below: a hook that runs only on some renders is the rules-of-hooks
   * break reported as ui-001#1.
   */
  const handleBackToPricing = useBackToList(`/${getPageSlugByKey("pricing")}`);

  const pricingSection = getPricingSection(lang);

  if (!pricingSection || pricingSection.type !== "PRICING_STORE") {
    return null;
  }

  const pricingItems = getPricingItems(lang);
  const pricingItem = pricingItems.find((item) => item.id === id);

  if (!pricingItem || pricingItem.status === "DISABLED") {
    return null;
  }

  const itemTranslation = getPricingTranslation_priceListWithImages(lang).items;
  const packagesTranslation = getPricingTranslation_packagesNoImages(lang);

  const relatedItems = pricingItem.categoryId
    ? pricingItems.filter(
        (item) =>
          item.id !== pricingItem.id &&
          item.status !== "DISABLED" &&
          item.categoryId === pricingItem.categoryId,
      )
    : [];

  const hasBadges =
    pricingItem.recommended ||
    pricingItem.status === "COMING_SOON" ||
    pricingItem.status === "UNAVAILABLE" ||
    Boolean(pricingItem.price.discountedValue);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "36px", md: "56px" } }}>
      <BackButton label={itemTranslation.goBackButton} onClick={handleBackToPricing} />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          gap: { xs: "36px", md: "64px" },
        }}
      >
        {pricingItem.images.length > 0 && (
          <Box sx={{ width: "100%", flex: { md: "0 0 55%" } }}>
            <MediaGallery images={pricingItem.images} title={pricingItem.title} />
          </Box>
        )}

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: { xs: "24px", md: "28px" },
          }}
        >
          {hasBadges && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {pricingItem.recommended && (
                <Tag label={packagesTranslation.items.recommended} tone="brand" />
              )}
              <StatusBadge status={pricingItem.status} />
              <DiscountBadge
                price={pricingItem.price.value}
                discountedValue={pricingItem.price.discountedValue}
              />
            </Box>
          )}

          <Typography variant="h2" component="h2">
            {pricingItem.title}
          </Typography>

          {pricingItem.text && (
            <Typography component="div" variant="body1">
              <RichText
                text={pricingItem.text}
                allowStyling={{ newLine: true, bold: true, italic: true, underline: true }}
              />
            </Typography>
          )}

          <FeatureList features={pricingItem.features} />

          <Box
            sx={(theme) => ({
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "baseline" },
              justifyContent: "space-between",
              gap: { xs: "8px", sm: "24px" },
              py: { xs: "16px", md: "20px" },
              borderTop: `1px solid ${theme.palette.surfaces.border}`,
              borderBottom: `1px solid ${theme.palette.surfaces.border}`,
            })}
          >
            <Typography variant="subtitle1">{itemTranslation.price}</Typography>

            <PriceValue
              value={pricingItem.price.value}
              currency={pricingItem.price.currency}
              unit={pricingItem.price.unit}
              onAgreement={pricingItem.price.onAgreement}
              discountedValue={pricingItem.price.discountedValue}
            />
          </Box>

          <PricingCtaButton
            title={pricingItem.title}
            tone="dark"
            sx={{ alignSelf: { xs: "stretch", sm: "flex-start" } }}
          />

          <ShareActions title={pricingItem.title} />
        </Box>
      </Box>

      {relatedItems.length > 0 && <RelatedItems items={relatedItems} />}
    </Box>
  );
}
