import { createTheme, ThemeOptions } from "@mui/material/styles";
import { fontConfig } from "@/app/theme/fonts";
import { brandDefaults, colorConfig } from "@/app/theme/colors";
import { brandFill, brandSurfaces } from "@/app/theme/brand";

/* A typography variant that changes size at the breakpoints, like the built-in headings. */
type ResponsiveTypeStyle = React.CSSProperties & {
  [media: `@media ${string}`]: React.CSSProperties;
};

declare module "@mui/material/styles" {
  interface Palette {
    header: {
      glass: string;
      glassBorder: string;
      onImage: string;
      surface: string;
      border: string;
      text: string;
    };
    footer: {
      background: string;
      text: {
        primary: string;
        secondary: string;
      };
      divider: string;
      buttonBorder: string;
    };
    /** Flat primary fill; kept for the sections not yet rebuilt — see brandFill. */
    brandGradient: string;
    surfaces: {
      bgAlt: string;
      surface: string;
      mint: string;
      rose: string;
      border: string;
      placeholder: string;
      scrim: string;
      onImage: string;
      tint: string;
    };
  }

  interface PaletteOptions {
    header?: Partial<Palette["header"]>;
    footer?: {
      background?: string;
      text?: {
        primary?: string;
        secondary?: string;
      };
      divider?: string;
      buttonBorder?: string;
    };
    brandGradient?: string;
    surfaces?: Partial<Palette["surfaces"]>;
  }

  interface TypographyVariants {
    navLink: React.CSSProperties;
    slogan: React.CSSProperties;
    logo: ResponsiveTypeStyle;
  }

  interface TypographyVariantsOptions {
    navLink?: React.CSSProperties;
    slogan?: React.CSSProperties;
    logo?: ResponsiveTypeStyle;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    slogan: true;
    logo: true;
  }
}

const bodyFont = fontConfig.body.style.fontFamily;
const headingFont = fontConfig.heading.style.fontFamily;
const sloganFont = fontConfig.slogan.style.fontFamily;

/*
 * Type scale from the Lumiera text styles in Figma (`sitegen/{mobile,tablet,desktop}/*`),
 * read at the three drawn widths: mobile 390 (xs), tablet 768 (sm), desktop 1440 (md and
 * up). Headings in Fraunces, everything else in Figtree. Breakpoints are MUI defaults and
 * deliberately not moved.
 */
const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: colorConfig.primary,
    secondary: colorConfig.secondary,
    background: colorConfig.background,
    text: colorConfig.text,
    header: colorConfig.header,
    footer: colorConfig.footer,
    brandGradient: brandFill(brandDefaults.primary),
    surfaces: brandSurfaces(brandDefaults),
  },

  typography: {
    fontFamily: bodyFont,

    // 32 / 56 / 70
    h1: {
      fontFamily: headingFont,
      fontWeight: 400,
      fontSize: "32px",
      lineHeight: 1.15,
      "@media (min-width:600px)": { fontSize: "56px", lineHeight: 1.1 },
      "@media (min-width:900px)": { fontSize: "70px" },
    },

    // 28/36 · 36/48 · 42/56
    h2: {
      fontFamily: headingFont,
      fontWeight: 400,
      fontSize: "28px",
      lineHeight: 36 / 28,
      "@media (min-width:600px)": { fontSize: "36px", lineHeight: 48 / 36 },
      "@media (min-width:900px)": { fontSize: "42px", lineHeight: 56 / 42 },
    },

    // 26 / 28 / 32
    h3: {
      fontFamily: headingFont,
      fontWeight: 400,
      fontSize: "26px",
      lineHeight: 1.25,
      "@media (min-width:600px)": { fontSize: "28px" },
      "@media (min-width:900px)": { fontSize: "32px" },
    },

    // 22 / 24 / 26
    h4: {
      fontFamily: headingFont,
      fontWeight: 400,
      fontSize: "22px",
      lineHeight: 1.3,
      "@media (min-width:600px)": { fontSize: "24px" },
      "@media (min-width:900px)": { fontSize: "26px" },
    },

    // 20 / 20 / 22
    h5: {
      fontFamily: headingFont,
      fontWeight: 400,
      fontSize: "20px",
      lineHeight: 1.35,
      "@media (min-width:900px)": { fontSize: "22px" },
    },

    h6: {
      fontFamily: headingFont,
      fontWeight: 400,
      fontSize: "18px",
      lineHeight: 1.4,
    },

    // Body — 15/26
    body1: {
      fontFamily: bodyFont,
      fontWeight: 400,
      fontSize: "15px",
      lineHeight: 26 / 15,
    },

    body2: {
      fontFamily: bodyFont,
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: 24 / 14,
    },

    // Buttons — medium 15, set solid
    button: {
      fontFamily: bodyFont,
      fontWeight: 500,
      fontSize: "15px",
      lineHeight: 1,
      textTransform: "none",
    },

    // Body medium — 15/26
    subtitle1: {
      fontFamily: bodyFont,
      fontWeight: 500,
      fontSize: "15px",
      lineHeight: 26 / 15,
    },

    subtitle2: {
      fontFamily: bodyFont,
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: 24 / 14,
    },

    // Captions — 14/24
    caption: {
      fontFamily: bodyFont,
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: 24 / 14,
    },

    overline: {
      fontFamily: bodyFont,
      fontWeight: 500,
      fontSize: "12px",
      letterSpacing: "1.2px",
      textTransform: "uppercase",
    },

    // Navigation — medium 15, set solid
    navLink: {
      fontFamily: bodyFont,
      fontWeight: 500,
      fontSize: "15px",
      lineHeight: 1,
    },

    // Slogan — 16/28
    slogan: {
      fontFamily: sloganFont,
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: 1.75,
    },

    // Logo set as type when there is no artwork — 24 / 28 / 30
    logo: {
      fontFamily: headingFont,
      fontWeight: 400,
      fontSize: "24px",
      lineHeight: 1,
      "@media (min-width:600px)": { fontSize: "28px" },
      "@media (min-width:900px)": { fontSize: "30px" },
    },
  },

  // Lumiera buttons and inputs are rounded 8.
  shape: {
    borderRadius: 8,
  },

  components: {
    /*
     * Content margins from Figma: 36 mobile, 60 tablet, 120 desktop.
     * At 1440 the lg container caps content at 1200, which leaves exactly 120 a side,
     * so the desktop margin comes from maxWidth rather than from padding.
     */
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingLeft: 36,
          paddingRight: 36,
          [theme.breakpoints.up("sm")]: {
            paddingLeft: 60,
            paddingRight: 60,
          },
          [theme.breakpoints.up("lg")]: {
            paddingLeft: 24,
            paddingRight: 24,
          },
        }),
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "none",
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        "html, body": {
          overflowX: "hidden",
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
