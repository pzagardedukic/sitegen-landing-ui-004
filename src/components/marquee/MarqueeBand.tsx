"use client";

import { Box, Typography } from "@mui/material";
import Marquee from "react-fast-marquee";

type MarqueeBandProps = {
  items: string[];
  speed?: number;
  /**
   * `plain` is white between hairlines, `cream` sits on the bg-alt wash — the two strips
   * under the about section. `brand` and `quiet` are the ui-002 names for the same pair.
   */
  tone?: "plain" | "cream" | "brand" | "quiet";
};

/*
 * Lumiera's sliding strip: 72 tall, full-bleed, a hairline top and bottom, the items in the
 * h5 face (Fraunces 22 on desktop) with a 7px primary dot between them, 28 apart.
 *
 * It has to reach both frame edges, so the width is driven by the viewport rather than by
 * the content container. Two strips stacked share one hairline: each draws its bottom
 * edge, and the top edge only when it is the first.
 */
export default function MarqueeBand({
  items,
  speed = 40,
  tone = "plain",
}: MarqueeBandProps) {
  if (items.length === 0) return null;

  const cream = tone === "cream" || tone === "quiet";

  return (
    <Box
      sx={(theme) => ({
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        height: { xs: 56, sm: 64, md: 72 },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        borderBottom: `1px solid ${theme.palette.surfaces.border}`,
        "&:not(.marquee-band + .marquee-band)": {
          borderTop: `1px solid ${theme.palette.surfaces.border}`,
        },
        backgroundColor: cream ? theme.palette.surfaces.bgAlt : theme.palette.background.default,
        color: theme.palette.text.primary,
      })}
      className="marquee-band"
    >
      <Marquee speed={speed} gradient={false} autoFill>
        {items.map((item, index) => (
          <Box
            key={`${item}-${index}`}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: "22px", md: "28px" },
              pr: { xs: "22px", md: "28px" },
              /* autoFill counts copies from the measured group width; a group that can
               * shrink asks for ever more copies. Same trap as ClientLogoSlider. */
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            <Box
              aria-hidden
              sx={(theme) => ({
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: theme.palette.primary.main,
              })}
            />

            <Typography variant="h5" component="span">
              {item}
            </Typography>
          </Box>
        ))}
      </Marquee>
    </Box>
  );
}
