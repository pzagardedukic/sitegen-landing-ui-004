"use client";

import { Box, Typography } from "@mui/material";
import { getPricingSection, useLanguage } from "@/core/runtime";
import CustomStore from "./store/CustomStore";
import PriceList from "./price-list/PriceList";
import SubscriptionSection from "./subscription/SubscriptionSection";

/*
 * The pricing page as the Lumiera frames draw it: the title on the left half of the grid,
 * the description and the note on the right, 80 apart, and the layout the site's pricing
 * type asks for underneath.
 *
 * The frames keep the note beside the description rather than under the items, where the
 * terms it carries — what a price includes, how long a voucher lasts — are read before the
 * prices instead of after them.
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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "560fr 80fr 560fr" },
          alignItems: "start",
          gap: { xs: "16px", md: 0 },
        }}
      >
        {pricingSection.sectionName && (
          <Typography variant="h2" component="h2" sx={{ gridColumn: { md: "1" } }}>
            {pricingSection.sectionName}
          </Typography>
        )}

        <Box
          sx={{
            gridColumn: { md: "3" },
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
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
      </Box>

      {renderContent()}
    </Box>
  );
}
