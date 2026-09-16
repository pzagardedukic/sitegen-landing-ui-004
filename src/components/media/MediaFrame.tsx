"use client";

import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import GlassCaption from "./GlassCaption";

type MediaFrameProps = {
  src?: string | null;
  alt?: string;
  /** Aspect ratio as width / height, e.g. 16 / 9. Ignored when `height` is given. */
  ratio?: number;
  height?: number | string;
  /** Overlay over the whole image. On by default — copy is meant to sit over the image. */
  scrim?: boolean;
  /** Set in the glass card at the bottom of the image, never as grey text underneath it. */
  caption?: string | null;
  /** Lumiera rounds images 12, 16 or 24; 24 is the large photograph. */
  radius?: 12 | 16 | 24;
  /** Content laid over the image, e.g. a title and a button. */
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
};

/*
 * The single image treatment for the whole theme: cover-cropped photograph on a rounded
 * frame, an optional overlay under white copy, and the caption in a glass card inset 24
 * from the bottom edge. Where a photograph is missing, the cream placeholder takes its
 * place rather than a gap.
 */
export default function MediaFrame({
  src,
  alt = "",
  ratio,
  height,
  scrim = true,
  caption,
  radius = 24,
  children,
  sx,
}: MediaFrameProps) {
  return (
    <Box
      sx={[
        (theme) => ({
          position: "relative",
          overflow: "hidden",
          borderRadius: `${radius}px`,
          backgroundColor: theme.palette.surfaces.placeholder,
          ...(height ? { height } : { aspectRatio: String(ratio ?? 4 / 3) }),
          width: "100%",
          isolation: "isolate",
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {src && (
        <Box
          component="img"
          src={src}
          alt={alt}
          loading="lazy"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      {scrim && (
        <Box
          aria-hidden
          sx={(theme) => ({
            position: "absolute",
            inset: 0,
            backgroundColor: theme.palette.surfaces.scrim,
          })}
        />
      )}

      {children && (
        <Box
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            /* One source for "text over a photograph", so a palette change reaches it too. */
            color: "surfaces.onImage",
          }}
        >
          {children}
        </Box>
      )}

      {caption && (
        <GlassCaption
          sx={{
            position: "absolute",
            left: { xs: 16, md: 24 },
            right: { xs: 16, md: 24 },
            bottom: { xs: 16, md: 24 },
          }}
        >
          {caption}
        </GlassCaption>
      )}
    </Box>
  );
}
