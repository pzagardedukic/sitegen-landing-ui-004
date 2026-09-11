"use client";

import { Box, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

type GlassCaptionProps = {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

/*
 * The frosted card Lumiera lays over a photograph to carry its text: rounded 12, 18 / 22
 * padding, a 12px background blur over the overlay colour, white type in the h6 face
 * (Fraunces 18). Its words stay legible on any photograph without darkening the whole
 * image.
 */
export default function GlassCaption({ children, sx }: GlassCaptionProps) {
  return (
    <Box
      sx={[
        (theme) => ({
          px: "22px",
          py: "18px",
          borderRadius: "12px",
          backgroundColor: theme.palette.surfaces.glass,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          color: theme.palette.surfaces.onImage,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography variant="h6" component="p" sx={{ color: "inherit" }}>
        {children}
      </Typography>
    </Box>
  );
}
