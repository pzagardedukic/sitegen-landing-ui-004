"use client";

import { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import { getExperienceSection, useLanguage } from "@/core/runtime";
import { getWhyUsTranslation } from "@/core/translations";
import RichText from "../common/RichText";
import StatBox from "./StatBox";
import ExperienceItems from "./ExperienceItems";

/* Numbers are grouped the way the page's language writes them; anything else stays as given. */
function formatStat(value: unknown, locale: string): string {
  const number = Number(value);
  return Number.isFinite(number) ? new Intl.NumberFormat(locale).format(number) : String(value);
}

/*
 * The experience section from the Lumiera frames, everything centred on one axis:
 *   - the title, and the description under it capped at 640;
 *   - the two figures abreast (420 / 300 wide) with a hairline between them — stacked on a
 *     phone, with a short horizontal rule instead; a single figure stands alone;
 *   - the certificates in their cream panel (see ExperienceItems).
 * Figures and certificates are optional and each block is left out when it has nothing.
 */
export default function WhyUsSection() {
  const { lang } = useLanguage();
  const whyUsTranslation = getWhyUsTranslation(lang);
  const experience = getExperienceSection(lang);
  const locale = lang === "SL" ? "sl-SI" : "en-GB";

  const stats: { value: string; label: string }[] = [];
  if (experience?.clientCount) {
    stats.push({ value: formatStat(experience.clientCount, locale), label: whyUsTranslation.clientCount });
  }
  if (experience?.projectCount) {
    stats.push({ value: formatStat(experience.projectCount, locale), label: whyUsTranslation.projectCount });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: "44px", sm: "56px", md: "72px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: { xs: "20px", md: "24px" },
        }}
      >
        <Typography variant="h2" component="h2">
          {whyUsTranslation.title}
        </Typography>

        {experience?.text && (
          <Typography component="div" variant="body1" sx={{ maxWidth: { md: 640 } }}>
            <RichText
              text={experience.text}
              allowStyling={{ newLine: true, bold: true, italic: true, underline: true }}
            />
          </Typography>
        )}
      </Box>

      {stats.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: { xs: "28px", sm: 0 },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {stats.map((stat, index) => (
            <Fragment key={stat.label}>
              {index > 0 && (
                <Box
                  aria-hidden
                  sx={(theme) => ({
                    flexShrink: 0,
                    backgroundColor: theme.palette.surfaces.border,
                    width: { xs: 120, sm: "1px" },
                    height: { xs: "1px", sm: 100, md: 110 },
                  })}
                />
              )}
              <Box sx={{ width: { xs: "100%", sm: 300, md: 420 } }}>
                <StatBox value={stat.value} label={stat.label} />
              </Box>
            </Fragment>
          ))}
        </Box>
      )}

      <ExperienceItems />
    </Box>
  );
}
