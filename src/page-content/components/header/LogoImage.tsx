"use client";

import { withBasePath } from "@/core/static";
import { Box } from "@mui/material";
import { memo } from "react";

interface LogoImageProps {
  imageSrc: string;
  name: string;
}

/*
 * The customer's logo artwork in the centre of the header pill.
 *
 * Sized in pixels with both dimensions capped: a logo is customer-supplied artwork of
 * unknown proportions, and it has to fit the pill (60 / 64 / 72 tall) whatever it is.
 *
 * `--logo-filter` comes from the pill. Over the banner photograph it flattens the artwork to
 * white — a customer's logo is usually dark or coloured and would sink into the photograph,
 * and `brightness(0) invert(1)` keeps the shape without knowing the colours. On the solid
 * pill the artwork shows as supplied.
 */
function LogoImage({ imageSrc, name }: LogoImageProps) {
  return (
    <Box
      component="a"
      href={withBasePath("/")}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Box
        component="img"
        src={imageSrc}
        alt={`${name} Logo`}
        sx={(theme) => ({
          height: { xs: 28, sm: 32, md: 40 },
          maxWidth: { xs: 140, sm: 180, md: 220 },
          width: "auto",
          objectFit: "contain",
          filter: "var(--logo-filter, none)",
          transition: theme.transitions.create(["opacity", "filter"], {
            duration: theme.transitions.duration.short,
          }),
          "&:hover": { opacity: 0.8 },
        })}
      />
    </Box>
  );
}

export default memo(LogoImage);
