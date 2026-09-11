"use client";

import { Box } from "@mui/material";
import { getPortfolioSection, useLanguage } from "@/core/runtime";
import { getPortfolioTranslation } from "@/core/translations";
import CenteredIntro from "../common/CenteredIntro";
import Portfolio from "./Portfolio";

/*
 * The /projekti page: the same list as the home-page preview, with the section's intro,
 * every project six to a page, and no call to action — this is the page it leads to.
 */
export default function PortfolioSection() {
  const { lang } = useLanguage();
  const portfolioTranslation = getPortfolioTranslation(lang);
  const portfolioSection = getPortfolioSection(lang);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "36px", md: "44px" } }}>
      {portfolioSection && (
        <CenteredIntro
          align="left"
          title={portfolioSection.name || portfolioTranslation.title}
          description={portfolioSection.text}
        />
      )}

      <Portfolio />
    </Box>
  );
}
