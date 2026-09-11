"use client";

import { Box, Typography } from "@mui/material";
import RichText from "./RichText";

type CenteredIntroProps = {
  title: string;
  description?: string | null;
};

/*
 * The centred section opening Lumiera uses for experience, team and the sections that
 * follow them: the title in the h2 size and, under it, the description in the text colour,
 * capped at 640 on desktop so it never runs the full width. 20 / 24 apart.
 */
export default function CenteredIntro({ title, description }: CenteredIntroProps) {
  return (
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
        {title}
      </Typography>

      {description && (
        <Typography component="div" variant="body1" sx={{ maxWidth: { md: 640 } }}>
          <RichText
            text={description}
            allowStyling={{ newLine: true, bold: true, italic: true, underline: true }}
          />
        </Typography>
      )}
    </Box>
  );
}
