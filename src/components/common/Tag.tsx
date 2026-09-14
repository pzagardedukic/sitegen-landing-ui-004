"use client";

import { Box, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

/*
 * Lumiera's badges, as drawn on price items and events:
 *   brand    primary fill — "recommended"
 *   mint     mint wash — availability status, "today"
 *   rose     rose wash — "tomorrow"
 *   dark     text-colour fill — "cancelled"
 *   soft     cream wash — "unavailable"
 *   outline  hairline only
 * `neutral` is the ui-002 name for the quiet badge and resolves to mint.
 */
type TagTone = "brand" | "mint" | "rose" | "dark" | "soft" | "outline" | "neutral";

type TagProps = {
  label: string;
  tone?: TagTone;
  sx?: SxProps<Theme>;
};

function toneSx(tone: TagTone, theme: Theme) {
  const { palette } = theme;

  switch (tone) {
    case "brand":
      return { backgroundColor: palette.primary.main, color: palette.primary.contrastText };
    case "rose":
      return { backgroundColor: palette.surfaces.rose, color: palette.text.primary };
    case "dark":
      return { backgroundColor: palette.text.primary, color: palette.background.default };
    case "soft":
      return { backgroundColor: palette.surfaces.bgAlt, color: palette.text.secondary };
    case "outline":
      return {
        boxShadow: `inset 0 0 0 1px ${palette.surfaces.border}`,
        color: palette.text.secondary,
      };
    default:
      return { backgroundColor: palette.surfaces.mint, color: palette.text.primary };
  }
}

/* Pills rounded full, 4 / 10 padding, Figtree 14/24. Every tone resolves through the palette. */
export default function Tag({ label, tone = "mint", sx }: TagProps) {
  return (
    <Box
      sx={[
        (theme) => ({
          display: "inline-flex",
          alignItems: "center",
          borderRadius: "999px",
          px: "10px",
          py: "4px",
          ...toneSx(tone, theme),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography variant="caption" component="span" sx={{ color: "inherit" }}>
        {label}
      </Typography>
    </Box>
  );
}
