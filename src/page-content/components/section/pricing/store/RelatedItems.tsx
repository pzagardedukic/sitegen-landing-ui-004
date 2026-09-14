"use client";

import { Box, Typography } from "@mui/material";
import Carousel from "@/components/carousel/Carousel";
import { getPricingItems, useLanguage } from "@/core/runtime";
import { getPageSlugByKey, getPricingSlugById, withBasePath } from "@/core/static";
import { getPricingTranslation_priceListWithImages } from "@/core/translations";

type PricingItem = ReturnType<typeof getPricingItems>[number];

type RelatedItemsProps = {
  items: PricingItem[];
};

/*
 * The row that closes a price item's page: its heading, then up to five compact cards —
 * five abreast on desktop and a carousel two cards wide below that, exactly as the related
 * projects close a project. Each card keeps its name: a picture with no name is not a link
 * a reader can decide to follow.
 */
export default function RelatedItems({ items }: RelatedItemsProps) {
  const { lang } = useLanguage();
  const pricingTranslation = getPricingTranslation_priceListWithImages(lang);

  if (items.length === 0) return null;

  const cards = items.slice(0, 5).map((item) => (
    <Box
      key={item.id}
      component="a"
      href={withBasePath(`/${getPageSlugByKey("pricing")}/${getPricingSlugById(item.id)}`)}
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        minWidth: 0,
        textDecoration: "none",
        color: "inherit",
        "&:hover .related-image, &:focus-visible .related-image": {
          transform: "scale(1.04)",
        },
        "&:hover .related-title, &:focus-visible .related-title": {
          color: theme.palette.primary.main,
        },
      })}
    >
      <Box
        sx={(theme) => ({
          position: "relative",
          height: { xs: 160, md: 180 },
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: theme.palette.surfaces.placeholder,
        })}
      >
        {item.images[0] && (
          <Box
            component="img"
            className="related-image"
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
      </Box>

      <Typography variant="h6" component="h3" className="related-title">
        {item.title}
      </Typography>
    </Box>
  ));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Typography variant="h4" component="h2">
        {pricingTranslation.relatedItemsTitle}
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
          ariaLabel={pricingTranslation.relatedItemsTitle}
        />
      </Box>
    </Box>
  );
}
