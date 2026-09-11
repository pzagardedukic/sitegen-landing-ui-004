"use client";

import { Box } from "@mui/material";
import CircleButton from "../button/CircleButton";
import { LongArrowIcon } from "../icons/icons";

type CarouselControlsProps = {
  /** Zero-based. */
  page: number;
  pageCount: number;
  onPrev: () => void;
  onNext: () => void;
};

/*
 * Lumiera's slider controls, as drawn under the about carousel: a 2px progress line on the
 * hairline, whose dark segment shows which page is in view, then the two round arrows 12
 * apart — back on the cream wash, forward in the text colour.
 */
export default function CarouselControls({
  page,
  pageCount,
  onPrev,
  onNext,
}: CarouselControlsProps) {
  const share = 100 / Math.max(1, pageCount);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: "20px", md: "32px" } }}>
      <Box
        aria-hidden
        sx={(theme) => ({
          position: "relative",
          flex: 1,
          height: "2px",
          backgroundColor: theme.palette.surfaces.border,
        })}
      >
        <Box
          sx={(theme) => ({
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${page * share}%`,
            width: `${share}%`,
            backgroundColor: theme.palette.text.primary,
            transition: theme.transitions.create(["left"]),
          })}
        />
      </Box>

      <Box sx={{ display: "flex", gap: "12px" }}>
        <CircleButton tone="soft" onClick={onPrev} disabled={page === 0} aria-label="Prejšnje">
          <LongArrowIcon direction="left" />
        </CircleButton>
        <CircleButton
          tone="dark"
          onClick={onNext}
          disabled={page >= pageCount - 1}
          aria-label="Naslednje"
        >
          <LongArrowIcon />
        </CircleButton>
      </Box>
    </Box>
  );
}
