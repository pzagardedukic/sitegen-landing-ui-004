"use client";

import { Box } from "@mui/material";
import { getPortfolioSection, useLanguage } from "@/core/runtime";
import { getPortfolioTranslation } from "@/core/translations";
import { getPageSlugByKeyWithBasePath } from "@/core/static";
import CenteredIntro from "../common/CenteredIntro";
import Portfolio from "./Portfolio";

/* The projects preview on the home page: the left-hand intro, six cards and the call to action. */
export default function PortfolioPreviewSection() {
  const { lang } = useLanguage();
  const portfolioTranslation = getPortfolioTranslation(lang);
  const portfolioSection = getPortfolioSection(lang);

  if (!portfolioSection) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "36px", md: "44px" },
      }}
    >
      <CenteredIntro
        align="left"
        title={portfolioSection.name || portfolioTranslation.title}
        description={portfolioSection.text}
      />

      <Portfolio
        maxCnt={6}
        callToAction={{
          label: portfolioTranslation.callToAction,
          href: getPageSlugByKeyWithBasePath("portfolio"),
        }}
      />
    </Box>
  );
}
