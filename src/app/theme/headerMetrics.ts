/*
 * The header's geometry, in one place because more than one file needs to agree on it.
 *
 * Lumiera's header is a floating pill, not a bar across the top: it sits HEADER_TOP below
 * the top of the viewport, HEADER_SIDE in from each edge, and is HEADER_BAR tall. Figma
 * draws it at 16 / 24 / 24 from the top, 16 / 24 / 40 from the sides and 60 / 64 / 72
 * tall at 390 / 768 / 1440.
 *
 * HEADER_HEIGHT is the room it takes from the top of the viewport. `Section` needs it: a
 * section jumped to by its anchor has to clear the pill, and a smaller scroll margin leaves
 * the top of the section behind it.
 */
export const HEADER_TOP = { xs: 16, sm: 24, md: 24 } as const;

export const HEADER_SIDE = { xs: 16, sm: 24, md: 40 } as const;

export const HEADER_BAR = { xs: 60, sm: 64, md: 72 } as const;

export const HEADER_HEIGHT = {
  xs: HEADER_TOP.xs + HEADER_BAR.xs,
  sm: HEADER_TOP.sm + HEADER_BAR.sm,
  md: HEADER_TOP.md + HEADER_BAR.md,
} as const;

/** Pill plus a little air, so an anchored section does not start flush against it. */
export const ANCHOR_OFFSET = {
  xs: HEADER_HEIGHT.xs + 16,
  sm: HEADER_HEIGHT.sm + 16,
  md: HEADER_HEIGHT.md + 16,
} as const;
