"use client";

import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { LongArrowIcon } from "../icons/icons";

type BackButtonProps = {
  label: string;
  onClick: () => void;
  sx?: SxProps<Theme>;
};

/*
 * The button that returns from a detail page to its list — project, post, price item, job,
 * event. Lumiera draws it as a quiet pill on the hairline: the long arrow, then the label in
 * the nav face, 12 / 22 padding (11 / 20 below desktop). The hairline darkens on hover. It
 * lives here once so the five detail pages cannot drift apart.
 */
export default function BackButton({ label, onClick, sx }: BackButtonProps) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={[
        (theme) => ({
          ...theme.typography.navLink,
          alignSelf: "flex-start",
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          px: { xs: "20px", md: "22px" },
          py: { xs: "11px", md: "12px" },
          border: 0,
          borderRadius: "999px",
          background: "none",
          cursor: "pointer",
          color: theme.palette.text.primary,
          boxShadow: `inset 0 0 0 1px ${theme.palette.surfaces.border}`,
          transition: theme.transitions.create(["box-shadow"], {
            duration: theme.transitions.duration.short,
          }),
          "&:hover": {
            boxShadow: `inset 0 0 0 1px ${theme.palette.text.primary}`,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <LongArrowIcon direction="left" />
      {label}
    </Box>
  );
}
