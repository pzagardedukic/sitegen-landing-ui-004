"use client";

import { ButtonBase, type ButtonBaseProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";

export type CircleButtonTone = "soft" | "dark" | "outline" | "white";

type CircleButtonProps = ButtonBaseProps & {
  tone?: CircleButtonTone;
  /** Diameter in pixels: 52 for carousel arrows, 40 for pagination. */
  size?: number;
};

function toneSx(tone: CircleButtonTone, theme: Theme) {
  const { palette } = theme;
  const toPrimary = { backgroundColor: palette.primary.main, color: palette.primary.contrastText };

  switch (tone) {
    case "soft":
      return {
        base: { backgroundColor: palette.surfaces.bgAlt, color: palette.text.primary },
        hover: toPrimary,
      };
    case "dark":
      return {
        base: { backgroundColor: palette.text.primary, color: palette.background.default },
        hover: toPrimary,
      };
    case "white":
      return {
        base: { backgroundColor: palette.surfaces.onImage, color: palette.text.primary },
        hover: toPrimary,
      };
    default:
      return {
        base: {
          backgroundColor: "transparent",
          color: palette.text.primary,
          boxShadow: `inset 0 0 0 1px ${palette.surfaces.border}`,
        },
        hover: { boxShadow: `inset 0 0 0 1px ${palette.text.primary}` },
      };
  }
}

/*
 * The round buttons Lumiera uses for carousel arrows (52, cream and dark), pagination
 * arrows (40, on the hairline) and the play button over a video (white).
 */
export default function CircleButton({
  tone = "outline",
  size = 52,
  sx,
  children,
  ...props
}: CircleButtonProps) {
  return (
    <ButtonBase
      {...props}
      sx={[
        (theme) => {
          const { base, hover } = toneSx(tone, theme);

          return {
            width: size,
            height: size,
            flexShrink: 0,
            borderRadius: "50%",
            transition: theme.transitions.create(
              ["background-color", "color", "box-shadow", "opacity"],
              { duration: theme.transitions.duration.short },
            ),
            ...base,
            "&:hover": hover,
            "&.Mui-disabled": { opacity: 0.4 },
          };
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </ButtonBase>
  );
}
