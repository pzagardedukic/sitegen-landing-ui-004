import { footerPalette, headerPalette, type BrandColors } from "./brand";

/*
 * Defaults only — the site's theme settings override primary, secondary and text.
 * Everything else on the palette is derived from those three in ./brand.ts, so a
 * customer's colors reach the whole page and not just the buttons.
 *
 * The three defaults are the Lumiera Figma tokens: primary #b48e5a (gold), secondary
 * #d9a7a0 (rose) and text #1a1a1a.
 */
export const brandDefaults: BrandColors = {
  primary: "#B48E5A",
  secondary: "#D9A7A0",
  text: "#1A1A1A",
};

export const colorConfig = {
  primary: {
    main: brandDefaults.primary,
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: brandDefaults.secondary,
    contrastText: brandDefaults.text,
  },
  background: {
    default: "#FFFFFF",
    paper: "#FFFFFF",
  },
  text: {
    primary: brandDefaults.text,
    // Figma `text-muted`.
    secondary: "#4C5C68",
  },
  header: headerPalette(brandDefaults),
  footer: footerPalette(),
};
