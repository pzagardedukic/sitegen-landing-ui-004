"use client";

import { Box, Typography } from "@mui/material";
import RichText from "./RichText";

type CenteredIntroProps = {
  title: string;
  description?: string | null;
  /** `left` is the projects opening: flush with the page margin, the block capped at 760. */
  align?: "center" | "left";
};

/*
 * The section opening Lumiera uses for experience, team and the sections that follow them:
 * the title in the h2 size and, under it, the description in the text colour.
 *   centre  the description capped at 640 on desktop, 20 / 24 apart;
 *   left    the whole block capped at 760, 18 / 20 apart.
 */
export default function CenteredIntro({ title, description, align = "center" }: CenteredIntroProps) {
  const left = align === "left";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: left ? "flex-start" : "center",
        textAlign: left ? "left" : "center",
        gap: left ? { xs: "18px", md: "20px" } : { xs: "20px", md: "24px" },
        ...(left && { maxWidth: 760 }),
      }}
    >
      <Typography variant="h2" component="h2">
        {title}
      </Typography>

      {description && (
        <Typography component="div" variant="body1" sx={{ maxWidth: { md: left ? "none" : 640 } }}>
          <RichText
            text={description}
            allowStyling={{ newLine: true, bold: true, italic: true, underline: true }}
          />
        </Typography>
      )}
    </Box>
  );
}
