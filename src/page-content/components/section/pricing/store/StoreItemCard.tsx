"use client";

import { Box, Typography } from "@mui/material";
import Tag from "@/components/common/Tag";
import { getPricingItems } from "@/core/runtime";
import { stripRichText, truncateWordSafe } from "@/core/utils";
import DiscountBadge from "../common/DiscountBadge";
import PriceValue from "../common/PriceValue";
import StatusBadge from "../common/StatusBadge";

type PricingItem = ReturnType<typeof getPricingItems>[number];

type StoreItemCardProps = {
  item: PricingItem;
  href: string;
  recommendedLabel: string;
};

/*
 * A store card from the Lumiera frames: the picture 280 tall with the badges over it, then
 * the category, the name, a hundred characters of the text, the features in one muted line
 * and the price at the foot — all on the cream card, rounded 12.
 *
 * The whole card is the link, so the picture, the name and the price all lead to the item
 * rather than only the title doing so.
 */
export default function StoreItemCard({ item, href, recommendedLabel }: StoreItemCardProps) {
  const featureSummary = item.features
    .slice(0, 2)
    .map((feature) => `${feature.label}: ${feature.value}`)
    .join(" · ");

  const hasBadges =
    item.recommended ||
    item.status === "COMING_SOON" ||
    item.status === "UNAVAILABLE" ||
    Boolean(item.price.discountedValue);

  return (
    <Box
      component="a"
      href={href}
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        backgroundColor: theme.palette.surfaces.surface,
        "&:hover .store-image, &:focus-visible .store-image": { transform: "scale(1.04)" },
        "&:hover .store-title, &:focus-visible .store-title": {
          color: theme.palette.primary.main,
        },
      })}
    >
      <Box
        sx={(theme) => ({
          position: "relative",
          height: { xs: 260, md: 280 },
          overflow: "hidden",
          backgroundColor: theme.palette.surfaces.placeholder,
        })}
      >
        {item.images[0] && (
          <Box
            component="img"
            className="store-image"
            src={item.images[0]}
            alt=""
            loading="lazy"
            sx={(theme) => ({
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: theme.transitions.create("transform"),
            })}
          />
        )}

        {hasBadges && (
          <Box
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              right: 16,
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
            }}
          >
            {item.recommended && <Tag label={recommendedLabel} tone="brand" />}
            <StatusBadge status={item.status} />
            <DiscountBadge
              price={item.price.value}
              discountedValue={item.price.discountedValue}
            />
          </Box>
        )}
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          p: "18px 20px 22px",
        }}
      >
        {item.category && (
          <Typography variant="caption" component="p" sx={{ color: "text.secondary" }}>
            {item.category}
          </Typography>
        )}

        <Typography variant="h5" component="h3" className="store-title">
          {item.title}
        </Typography>

        {item.text && (
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {stripRichText(truncateWordSafe(item.text, 100))}
          </Typography>
        )}

        {featureSummary && (
          <Typography variant="caption" component="p" sx={{ color: "text.secondary" }}>
            {featureSummary}
          </Typography>
        )}

        <Box sx={{ mt: "auto", pt: "6px" }}>
          <PriceValue
            size="small"
            value={item.price.value}
            currency={item.price.currency}
            unit={item.price.unit}
            onAgreement={item.price.onAgreement}
            discountedValue={item.price.discountedValue}
          />
        </Box>
      </Box>
    </Box>
  );
}
