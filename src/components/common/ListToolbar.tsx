"use client";

import { Box } from "@mui/material";
import { ChevronDownIcon, SearchIcon } from "@/components/icons/icons";

type SortOption = {
  value: string;
  label: string;
};

type ListToolbarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchLabel: string;
  sortValue: string;
  onSortChange: (value: string) => void;
  sortLabel: string;
  sortOptions: SortOption[];
  /** Width of the sort pill on tablet and above — the frames draw 180 in the store, 257 on events. */
  sortWidth?: number;
};

/*
 * The row that opens a filtered list: the search field and the sort control, both drawn as
 * the theme's pill — 56 tall, rounded full, on a hairline that darkens when the control has
 * focus. Below tablet they stack.
 *
 * Shared by the store and the events list, which the frames draw identically apart from the
 * width of the sort pill. Native <input> and <select> rather than MUI fields: the filled
 * field with its floating label belongs to a different design system than this one.
 */
export default function ListToolbar({
  searchValue,
  onSearchChange,
  searchLabel,
  sortValue,
  onSortChange,
  sortLabel,
  sortOptions,
  sortWidth = 220,
}: ListToolbarProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "stretch",
        gap: "12px",
      }}
    >
      <Box
        sx={(theme) => ({
          flex: 1,
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          height: 56,
          px: "22px",
          borderRadius: "999px",
          color: theme.palette.text.secondary,
          boxShadow: `inset 0 0 0 1px ${theme.palette.surfaces.border}`,
          transition: theme.transitions.create(["box-shadow"], {
            duration: theme.transitions.duration.short,
          }),
          "&:focus-within": {
            boxShadow: `inset 0 0 0 1px ${theme.palette.text.primary}`,
          },
        })}
      >
        <SearchIcon />

        <Box
          component="input"
          type="search"
          value={searchValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onSearchChange(event.target.value)
          }
          placeholder={searchLabel}
          aria-label={searchLabel}
          sx={(theme) => ({
            ...theme.typography.body1,
            flex: 1,
            minWidth: 0,
            border: 0,
            outline: "none",
            background: "none",
            color: theme.palette.text.primary,
            "&::placeholder": { color: theme.palette.text.secondary, opacity: 1 },
            "&::-webkit-search-cancel-button": { cursor: "pointer" },
          })}
        />
      </Box>

      <Box sx={{ position: "relative", flexShrink: 0, width: { xs: "100%", sm: sortWidth } }}>
        <Box
          component="select"
          value={sortValue}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            onSortChange(event.target.value)
          }
          aria-label={sortLabel}
          sx={(theme) => ({
            ...theme.typography.subtitle1,
            appearance: "none",
            width: "100%",
            height: 56,
            pl: "22px",
            pr: "46px",
            cursor: "pointer",
            border: 0,
            borderRadius: "999px",
            background: "none",
            color: theme.palette.text.primary,
            boxShadow: `inset 0 0 0 1px ${theme.palette.surfaces.border}`,
            transition: theme.transitions.create(["box-shadow"], {
              duration: theme.transitions.duration.short,
            }),
            "&:hover, &:focus-visible": {
              boxShadow: `inset 0 0 0 1px ${theme.palette.text.primary}`,
            },
          })}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Box>

        <Box
          aria-hidden
          sx={{
            position: "absolute",
            top: "50%",
            right: 22,
            transform: "translateY(-50%)",
            display: "flex",
            pointerEvents: "none",
          }}
        >
          <ChevronDownIcon />
        </Box>
      </Box>
    </Box>
  );
}
