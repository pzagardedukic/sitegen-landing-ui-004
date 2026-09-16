"use client";

import { Box } from "@mui/material";
import CircleButton from "./CircleButton";
import { LongArrowIcon } from "../icons/icons";

interface PaginationControlsProps {
  /** One-based. */
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}

/*
 * Page numbers to show. Up to seven pages are all listed; beyond that the first, the last
 * and the neighbours of the current page, with a gap marker where pages are skipped, so a
 * long gallery never grows a row wider than a phone.
 */
function pageList(page: number, count: number): (number | "gap")[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);

  const shown = [1, count, page - 1, page, page + 1]
    .filter((n) => n >= 1 && n <= count)
    .sort((a, b) => a - b)
    .filter((n, i, all) => all.indexOf(n) === i);

  return shown.flatMap((n, i) =>
    i > 0 && n - shown[i - 1] > 1 ? ["gap" as const, n] : [n],
  );
}

/* Buttons are 36 across on a phone and 40 above, as the Lumiera frames draw them. */
const BUTTON = { xs: 36, sm: 40 };

/*
 * Numbered pagination as Lumiera draws it: round buttons 40 across, 8 apart — the arrows on
 * the hairline, the current page on the mint wash, the others bare.
 */
export default function PaginationControls({
  page,
  pageCount,
  onChange,
}: PaginationControlsProps) {
  if (pageCount <= 1) return null;

  return (
    <Box
      component="nav"
      aria-label="Paginacija"
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      <CircleButton
        size={40}
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Prejšnja stran"
        sx={{ width: BUTTON, height: BUTTON }}
      >
        <LongArrowIcon direction="left" />
      </CircleButton>

      {pageList(page, pageCount).map((entry, index) =>
        entry === "gap" ? (
          <Box
            key={`gap-${index}`}
            component="span"
            aria-hidden
            sx={(theme) => ({
              ...theme.typography.subtitle1,
              width: BUTTON,
              textAlign: "center",
            })}
          >
            …
          </Box>
        ) : (
          <Box
            key={entry}
            component="button"
            type="button"
            aria-label={`Stran ${entry}`}
            aria-current={entry === page ? "page" : undefined}
            onClick={() => onChange(entry)}
            sx={(theme) => ({
              ...theme.typography.subtitle1,
              lineHeight: 1,
              width: BUTTON,
              height: BUTTON,
              borderRadius: "50%",
              border: 0,
              cursor: "pointer",
              color: theme.palette.text.primary,
              backgroundColor:
                entry === page ? theme.palette.surfaces.mint : "transparent",
              transition: theme.transitions.create(["background-color"], {
                duration: theme.transitions.duration.short,
              }),
              "&:hover": {
                backgroundColor:
                  entry === page
                    ? theme.palette.surfaces.mint
                    : theme.palette.surfaces.bgAlt,
              },
            })}
          >
            {entry}
          </Box>
        ),
      )}

      <CircleButton
        size={40}
        onClick={() => onChange(page + 1)}
        disabled={page >= pageCount}
        aria-label="Naslednja stran"
        sx={{ width: BUTTON, height: BUTTON }}
      >
        <LongArrowIcon />
      </CircleButton>
    </Box>
  );
}
