"use client";

import { Box, Typography } from "@mui/material";
import { getPricingSection, useLanguage } from "@/core/runtime";
import CustomStore from "./store/CustomStore";
import PriceList from "./price-list/PriceList";
import SubscriptionSection from "./subscription/SubscriptionSection";

/*
 * The pricing page: the description and the note at the left margin, capped at 640, then
 * the layout the site's pricing type asks for.
 *
 * No heading here — the title band above the section already carries the same words, and
 * printing them twice on one screen made the page read as if it had started over.
 */
export default function PricingSection() {
  const { lang } = useLanguage();
  const pricingSection = getPricingSection(lang);

  if (!pricingSection) {
    return null;
  }

  const renderContent = () => {
    switch (pricingSection.type) {
      case "PRICING_STORE":
        return <CustomStore />;
      case "PRICING_LIST":
        return <PriceList />;
      case "PRICING_PACKAGES":
        return <SubscriptionSection />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "36px", md: "40px" } }}>
      {(pricingSection.text || pricingSection.note) && (
        <Box
          sx={{ maxWidth: 640, display: "flex", flexDirection: "column", gap: "14px" }}
        >
          {pricingSection.text && (
            <Typography variant="body1">{pricingSection.text}</Typography>
          )}

          {pricingSection.note && (
            <Typography variant="caption" component="p" sx={{ color: "text.secondary" }}>
              {pricingSection.note}
            </Typography>
          )}
        </Box>
      )}

      {renderContent()}
    </Box>
  );
}
