"use client";

import { Box, Typography } from "@mui/material";
import { getCareersItems, getCareersSection, useLanguage } from "@/core/runtime";
import CareersList from "./CareersList";

/*
 * The vacancies page from the Lumiera frames: the title on the left (600 of the 1200 grid)
 * with the section's text beside it (520, 80 apart), then the vacancies as rows 48 below.
 * Under desktop the two halves of the intro stack 18 apart.
 */
export default function CareersSection() {
  const { lang } = useLanguage();
  const careersSection = getCareersSection(lang);

  if (!careersSection) {
    return null;
  }

  const careersItems = getCareersItems(lang);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "36px", md: "48px" } }}>
      {careersSection.text && (
        <Typography variant="body1" sx={{ maxWidth: 640 }}>
          {careersSection.text}
        </Typography>
      )}

      <CareersList careers={careersItems} />
    </Box>
  );
}
