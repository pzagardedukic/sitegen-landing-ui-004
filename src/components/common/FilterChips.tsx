"use client";

import { Box } from "@mui/material";

type FilterOption = {
  value: string;
  label: string;
};

type FilterChipsProps = {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
};

/*
 * Category filters as Lumiera draws them: pills 46 tall, 10 apart, Figtree medium 15 — the
 * selected one filled in the text colour, the rest on the hairline.
 *
 * The row wraps rather than scrolling out of view: a row that runs past the edge reads as
 * a cut-off bug rather than as something scrollable.
 */
export default function FilterChips({
  options,
  value,
  onChange,
  ariaLabel,
}: FilterChipsProps) {
  if (options.length === 0) return null;

  return (
    <Box
      role="group"
      aria-label={ariaLabel}
      sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
    >
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <Box
            key={option.value}
            component="button"
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            sx={(theme) => ({
              ...theme.typography.subtitle1,
              cursor: "pointer",
              border: 0,
              borderRadius: "999px",
              px: "20px",
              py: "10px",
              whiteSpace: "nowrap",
              transition: theme.transitions.create(
                ["background-color", "box-shadow", "color"],
                { duration: theme.transitions.duration.short },
              ),
              ...(selected
                ? {
                    backgroundColor: theme.palette.text.primary,
                    color: theme.palette.background.default,
                  }
                : {
                    backgroundColor: "transparent",
                    color: theme.palette.text.primary,
                    boxShadow: `inset 0 0 0 1px ${theme.palette.surfaces.border}`,
                    "&:hover": {
                      boxShadow: `inset 0 0 0 1px ${theme.palette.text.primary}`,
                    },
                  }),
            })}
          >
            {option.label}
          </Box>
        );
      })}
    </Box>
  );
}
