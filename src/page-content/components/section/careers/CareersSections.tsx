"use client";

import { Box, Typography } from "@mui/material";
import { getCareersItems, getCareersSection, useLanguage } from "@/core/runtime";
import { getCareersTranslation } from "@/core/translations";
import CareersList from "./CareersList";

/*
 * The vacancies page from the Lumiera frames: the title on the left (600 of the 1200 grid)
 * with the section's text beside it (520, 80 apart), then the vacancies as rows 48 below.
 * Under desktop the two halves of the intro stack 18 apart.
 */
export default function CareersSection() {
  const { lang } = useLanguage();
  const careersTranslation = getCareersTranslation(lang);
  const careersSection = getCareersSection(lang);

  if (!careersSection) {
    return null;
  }

  const careersItems = getCareersItems(lang);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "36px", md: "48px" } }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "600fr 80fr 520fr" },
          alignItems: "start",
          gap: { xs: "18px", md: 0 },
        }}
      >
        <Typography variant="h2" component="h2" sx={{ gridColumn: { md: "1" } }}>
          {careersTranslation.title}
        </Typography>

        {careersSection.text && (
          <Typography variant="body1" sx={{ gridColumn: { md: "3" } }}>
            {careersSection.text}
          </Typography>
        )}
      </Box>

      <CareersList careers={careersItems} />
    </Box>
  );
}
