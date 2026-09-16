"use client";

import { Button, type ButtonProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import type { ElementType } from "react";
import { ChevronRightIcon } from "../icons/icons";

export type ArrowButtonTone =
  "primary" | "dark" | "border" | "outline" | "soft" | "white" | "text";

type ArrowButtonOwnProps = {
  /** Which Lumiera Buttons-Arrow variant. */
  tone?: ArrowButtonTone;
  /** The chevron after the label; `false` is the no-arrow variant. */
  arrow?: boolean;
};

/*
 * Every variant reads the palette, so a customer's primary reaches the buttons and a dark
 * variant later needs no change here. "Dark" is the text colour, not a hardcoded black.
 * Figma draws no hover state; the variants swap to the other of primary and dark on hover,
 * as the Lumiera template does.
 */
function toneSx(tone: ArrowButtonTone, theme: Theme) {
  const { palette } = theme;
  const toPrimary = {
    backgroundColor: palette.primary.main,
    color: palette.primary.contrastText,
  };

  switch (tone) {
    case "dark":
      return {
        base: {
          backgroundColor: palette.text.primary,
          color: palette.background.default,
        },
        hover: toPrimary,
      };
    case "border":
      return {
        base: {
          backgroundColor: "transparent",
          color: palette.primary.main,
          boxShadow: `inset 0 0 0 1px ${palette.primary.main}`,
        },
        hover: toPrimary,
      };
    // The Border variant drawn in the text colour instead of primary, as the blog opening uses it.
    case "outline":
      return {
        base: {
          backgroundColor: "transparent",
          color: palette.text.primary,
          boxShadow: `inset 0 0 0 1px ${palette.text.primary}`,
        },
        hover: {
          backgroundColor: palette.text.primary,
          color: palette.background.default,
        },
      };
    case "soft":
      return {
        base: {
          backgroundColor: palette.surfaces.bgAlt,
          color: palette.text.primary,
        },
        hover: toPrimary,
      };
    case "white":
      return {
        base: {
          backgroundColor: palette.surfaces.onImage,
          color: palette.text.primary,
        },
        hover: toPrimary,
      };
    case "text":
      return {
        base: {
          backgroundColor: "transparent",
          color: palette.text.primary,
          minHeight: 0,
          px: 0,
          py: "7px",
          borderRadius: 0,
          boxShadow: `inset 0 -1px 0 ${palette.text.primary}`,
        },
        hover: {
          backgroundColor: "transparent",
          color: palette.primary.main,
          boxShadow: `inset 0 -1px 0 ${palette.primary.main}`,
        },
      };
    default:
      return {
        base: toPrimary,
        hover: {
          backgroundColor: palette.text.primary,
          color: palette.background.default,
        },
      };
  }
}

/*
 * Lumiera's Buttons-Arrow component: 52 tall, 30 in from each side, rounded 8, Figtree
 * medium 15, with the filled chevron 7 after the label. Sections pick the variant Figma
 * draws for them — Primary for most calls to action, Dark and Border on cards, white over
 * a photograph.
 *
 * Typed through on `component`, so a download or an external link can be this button:
 * `component="a"` then accepts href and target.
 */
export default function ArrowButton<C extends ElementType = "button">({
  tone = "primary",
  arrow = true,
  endIcon,
  sx,
  ...props
}: ButtonProps<C, { component?: C }> & ArrowButtonOwnProps) {
  return (
    <Button
      disableElevation
      disableRipple
      endIcon={endIcon ?? (arrow ? <ChevronRightIcon /> : undefined)}
      {...props}
      sx={[
        (theme) => {
          const { base, hover } = toneSx(tone, theme);

          return {
            ...theme.typography.button,
            minHeight: 52,
            px: "30px",
            py: "10px",
            gap: "7px",
            borderRadius: `${theme.shape.borderRadius}px`,
            transition: theme.transitions.create(
              ["background-color", "color", "box-shadow"],
              { duration: theme.transitions.duration.short },
            ),
            "& .MuiButton-startIcon, & .MuiButton-endIcon": { m: 0 },
            "& .MuiButton-endIcon > .MuiSvgIcon-root, & .MuiButton-startIcon > .MuiSvgIcon-root":
              {
                fontSize: 18,
              },
            ...base,
            "&:hover": hover,
            "&.Mui-disabled": {
              ...base,
              opacity: 0.5,
            },
          };
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
