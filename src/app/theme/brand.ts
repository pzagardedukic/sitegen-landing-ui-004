import { alpha, lighten } from "@mui/material/styles";

/*
 * Everything in this file is derived from the three colors a customer can actually
 * choose — primary, secondary and text — or is a fixed Lumiera token.
 *
 * It exists because createPreviewTheme() has an early `if (!hasOverrides) return baseTheme`,
 * which means the theme is built along two different paths. Anything computed from the
 * brand colors has to be computed identically on both, or the site freezes on the
 * defaults while still looking correct locally. Both paths call the functions below,
 * so there is only one definition to keep right.
 *
 * The lighten amounts are fitted so the defaults land on the Figma tokens of the
 * `sitegen / barve` collection: primary #b48e5a gives bg-alt #f7f3ef, surface #faf7f6 and
 * placeholder #e9e1d8 to within a step; secondary #d9a7a0 gives the rose wash.
 */

export type BrandColors = {
  primary: string;
  secondary: string;
  text: string;
};

/*
 * Fixed Lumiera tokens. They are part of the theme rather than of the customer's brand:
 * mint is the wash under team and review cards, the hairline is the one neutral border the
 * whole design uses, overlay is the colour laid over photographs, and the slate is the
 * footer ground. A customer's colours do not reach them, on purpose — they are what keeps
 * any brand colour looking like this theme.
 */
const LUMIERA = {
  mint: "#ECF5F4",
  border: "#E7E9EB",
  overlay: "#1A1A1A",
  slate: "#4C5C68",
  white: "#FFFFFF",
} as const;

/*
 * Lumiera draws no gradients. The palette keeps its `brandGradient` key only because the
 * sections still to be rebuilt read it; until each one is redone it gets a flat fill of
 * primary, which is what a Lumiera button is.
 */
export function brandFill(primary: string): string {
  return `linear-gradient(${primary}, ${primary})`;
}

/*
 * The header pill. Over the banner photograph it is frosted glass — white at 6 % on a
 * white hairline, with white type. Once the page moves it is solid white on the Lumiera
 * hairline, with the customer's text colour.
 */
export function headerPalette({ text }: BrandColors) {
  return {
    glass: alpha(LUMIERA.white, 0.06),
    glassBorder: LUMIERA.white,
    onImage: LUMIERA.white,
    surface: LUMIERA.white,
    border: LUMIERA.border,
    text,
  };
}

/* The footer from the approved Figma frame: slate ground, white type, a faint white rule. */
export function footerPalette() {
  return {
    background: LUMIERA.slate,
    text: {
      primary: LUMIERA.white,
      secondary: alpha(LUMIERA.white, 0.85),
    },
    divider: alpha(LUMIERA.white, 0.18),
    buttonBorder: alpha(LUMIERA.white, 0.5),
  };
}

/* Section washes, card grounds, hairlines and image treatments. */
export function brandSurfaces({ primary, secondary }: BrandColors) {
  const bgAlt = lighten(primary, 0.895);

  return {
    /** Cream section wash (bg-alt). */
    bgAlt,
    /** Lighter cream, for cards laid on white (surface). */
    surface: lighten(primary, 0.93),
    /** Fixed mint wash (accent-soft). */
    mint: LUMIERA.mint,
    /** Rose wash from the secondary colour. */
    rose: lighten(secondary, 0.8),
    border: LUMIERA.border,
    /** Stand-in shown where a photograph is missing. */
    placeholder: lighten(primary, 0.73),
    /** Laid over photographs that carry white copy — 35 %, as the photo variant of the hero. */
    scrim: alpha(LUMIERA.overlay, 0.35),
    /*
     * Ground of the glass caption card, under a 12px blur. The Figma frames record this fill
     * as solid overlay, but the card carries a background blur, which only reads on a
     * translucent fill: the opacity was lost when the paint was bound to its variable.
     */
    glass: alpha(LUMIERA.overlay, 0.45),
    onImage: LUMIERA.white,
    /** Hover and selection wash; kept under its old name for the sections not yet rebuilt. */
    tint: bgAlt,
  };
}
