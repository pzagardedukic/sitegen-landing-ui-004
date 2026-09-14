"use client";

import { Box, Typography } from "@mui/material";
import { getFaqSection, useLanguage } from "@/core/runtime";
import { getFaqTranslation } from "@/core/translations";
import FaqItem from "./FaqItem";

/*
 * The questions page from the Lumiera frames: the title on the left half of the grid with
 * the section's text beside it (80 apart), then the questions as rows on hairlines, 48
 * below. The first answer is open, as the spec asks — a page of closed rows tells a reader
 * nothing about what the answers look like.
 */
export default function FaqSection() {
  const { lang } = useLanguage();
  const faqTranslation = getFaqTranslation(lang);
  const faqSection = getFaqSection(lang);

  if (!faqSection || faqSection.items.length === 0) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "36px", md: "48px" } }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "560fr 80fr 560fr" },
          alignItems: "start",
          gap: { xs: "18px", md: 0 },
        }}
      >
        <Typography variant="h2" component="h2" sx={{ gridColumn: { md: "1" } }}>
          {faqTranslation.title}
        </Typography>

        {faqSection.text && (
          <Typography variant="body1" sx={{ gridColumn: { md: "3" } }}>
            {faqSection.text}
          </Typography>
        )}
      </Box>

      {/* The closing hairline belongs to the list, so the last row is not left open-ended. */}
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          borderBottom: `1px solid ${theme.palette.surfaces.border}`,
        })}
      >
        {faqSection.items.map((item, index) => (
          <FaqItem
            key={index}
            question={item.question}
            answer={item.answer}
            defaultOpen={index === 0}
          />
        ))}
      </Box>
    </Box>
  );
}
