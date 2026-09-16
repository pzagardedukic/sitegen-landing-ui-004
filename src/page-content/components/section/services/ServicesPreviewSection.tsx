"use client";

import { Box } from "@mui/material";
import ArrowButton from "@/components/button/ArrowButton";
import { getServicesSection, useLanguage } from "@/core/runtime";
import { getServicesTranslation } from "@/core/translations";
import { getPageSlugByKeyWithBasePath } from "@/core/static";
import CenteredIntro from "../common/CenteredIntro";
import Services from "./Services";

/*
 * The services preview on the home page: the centred intro, up to six cards whose open
 * buttons lead to the services page, and the call to action centred under them — full width
 * on a phone. 64 / 44 between the blocks.
 */
export default function ServicesPreviewSection() {
  const { lang } = useLanguage();
  const servicesTranslation = getServicesTranslation(lang);
  const servicesSection = getServicesSection(lang);

  if (!servicesSection) {
    return null;
  }

  const servicesHref = getPageSlugByKeyWithBasePath("services");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: "44px", md: "64px" },
      }}
    >
      <CenteredIntro
        title={servicesTranslation.title}
        description={servicesSection.text}
      />

      <Box sx={{ width: "100%" }}>
        <Services maxCnt={6} href={servicesHref} />
      </Box>

      <ArrowButton
        component="a"
        href={servicesHref}
        sx={{ width: { xs: "100%", sm: "auto" } }}
      >
        {servicesTranslation.callToAction}
      </ArrowButton>
    </Box>
  );
}
