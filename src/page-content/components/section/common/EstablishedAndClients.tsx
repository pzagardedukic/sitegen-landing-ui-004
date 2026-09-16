"use client";

import { Box } from "@mui/material";
import MarqueeBand from "@/components/marquee/MarqueeBand";
import { getAboutSection, useLanguage } from "@/core/runtime";
import { getAboutTranslation } from "@/core/translations";

/*
 * The two sliding strips that close the about section: "established in" on white between
 * hairlines (only when the year is set), then "100 % satisfied clients" on the cream wash.
 * They sit 44 / 56 / 100 under the content and touch each other, sharing one hairline, as
 * the Lumiera frames draw them. Full-bleed by construction — see MarqueeBand.
 */
export default function EstablishedAndClients() {
  const { lang } = useLanguage();
  const aboutTranslation = getAboutTranslation(lang);
  const aboutSection = getAboutSection(lang);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: { xs: "44px", sm: "56px", md: "100px" },
      }}
    >
      {aboutSection.establishedYear && (
        <MarqueeBand
          items={[
            `${aboutTranslation.establishedIn} ${aboutSection.establishedYear}`,
          ]}
          speed={45}
          tone="plain"
        />
      )}

      <MarqueeBand
        items={[`100 % ${aboutTranslation.satisfiedClients}`]}
        speed={60}
        tone="cream"
      />
    </Box>
  );
}
