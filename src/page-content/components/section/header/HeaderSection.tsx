"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useBannerImage } from "@/app/theme/utils/UseBannerImage";
import { HEADER_HEIGHT } from "@/app/theme/headerMetrics";

export type HeaderSectionProps = {
  title: string;
  /*
   * Anchor for the band. The pages that had an anchor of their own in ui-001 pass it
   * through so their fragment links keep working; the outer element keeps
   * `section-header`, which every subpage renders.
   */
  id?: string;
};

const LIP = { xs: 24, sm: 32, md: 40 } as const;

/*
 * The title band that opens every subpage, from the Lumiera Figma frames (1440×440,
 * 768×300, 390×300):
 *   - the banner photograph runs edge to edge under the floating header, with the overlay
 *     colour laid over it;
 *   - the page title, in the h2 size, is centred in the space between the header and the
 *     band's lower edge;
 *   - a white lip rounded 40 / 32 / 24 closes the band, so the section below seems to curve
 *     up over the photograph instead of meeting it in a straight seam.
 */
export default function HeaderSection({ title, id }: HeaderSectionProps) {
  const bannerImage = useBannerImage();

  return (
    <Box
      component="section"
      id="section-header"
      sx={(theme) => ({
        position: "relative",
        overflow: "hidden",
        height: { xs: 300, md: 440 },
        pt: {
          xs: `${HEADER_HEIGHT.xs}px`,
          sm: `${HEADER_HEIGHT.sm}px`,
          md: `${HEADER_HEIGHT.md}px`,
        },
        pb: { xs: `${LIP.xs}px`, sm: `${LIP.sm}px`, md: `${LIP.md}px` },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.surfaces.placeholder,
        backgroundImage: `url("${bannerImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: theme.palette.surfaces.onImage,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: theme.palette.surfaces.scrim,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: { xs: LIP.xs, sm: LIP.sm, md: LIP.md },
          backgroundColor: theme.palette.background.default,
          borderTopLeftRadius: {
            xs: `${LIP.xs}px`,
            sm: `${LIP.sm}px`,
            md: `${LIP.md}px`,
          },
          borderTopRightRadius: {
            xs: `${LIP.xs}px`,
            sm: `${LIP.sm}px`,
            md: `${LIP.md}px`,
          },
        },
      })}
    >
      <Box
        id={id}
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: { md: 1128 },
          mx: "auto",
          px: { xs: "36px", sm: "64px" },
          textAlign: "center",
        }}
      >
        <Typography variant="h2" component="h1" sx={{ color: "inherit" }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
}
