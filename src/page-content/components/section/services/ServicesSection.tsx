"use client";

import { Box } from "@mui/material";
import { getServicesSection, useLanguage } from "@/core/runtime";
import CenteredIntro from "../common/CenteredIntro";
import Services from "./Services";

/*
 * The services page: the same cards as the home-page preview, every item rather than the
 * first six, and without the open buttons or the call to action — this is the page they
 * lead to. Lumiera has one services treatment, so ui-001's alternating rows stay gone.
 */
export default function ServicesSection() {
  const { lang } = useLanguage();
  const servicesSection = getServicesSection(lang);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "44px", md: "64px" },
      }}
    >
      <CenteredIntro align="left" description={servicesSection?.text} />
      <Services />
    </Box>
  );
}
