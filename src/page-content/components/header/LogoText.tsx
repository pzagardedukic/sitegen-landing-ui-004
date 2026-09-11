"use client";

import { withBasePath } from "@/core/static";
import { Box, Typography } from "@mui/material";
import { memo } from "react";

interface LogoTextProps {
  name: string;
}

/*
 * On a phone the name gets ~200px of the pill. Figma's 24px suits a short mark ("LOGO",
 * "MIRNA"), but a full salon name such as "Mirna Spa & Beauty" runs to ~215px at that size
 * and was cut to "Mirna Spa …". Longer names step down so they are read, not clipped; the
 * ellipsis stays only as the last resort for a name that would not fit at any size.
 */
function phoneSize(name: string): string | undefined {
  if (name.length > 16) return "18px";
  if (name.length > 10) return "20px";
  return undefined;
}

/*
 * For a customer who uploaded no logo: the site name set in the logo face (Fraunces 30 / 28
 * / 24). It takes the header's own colour, so it is white on the glass over the photograph
 * and the text colour once the pill is solid.
 */
function LogoText({ name }: LogoTextProps) {
  const size = phoneSize(name);

  return (
    <Box
      component="a"
      href={withBasePath("/")}
      sx={{
        display: "flex",
        alignItems: "center",
        color: "inherit",
        minWidth: 0,
        maxWidth: "100%",
      }}
    >
      <Typography
        variant="logo"
        component="span"
        noWrap
        sx={(theme) => ({
          display: "block",
          maxWidth: { xs: "100%", sm: 260, md: 360 },
          ...(size && { [theme.breakpoints.down("sm")]: { fontSize: size } }),
          transition: theme.transitions.create(["opacity"], {
            duration: theme.transitions.duration.short,
          }),
          "&:hover": { opacity: 0.8 },
        })}
      >
        {name}
      </Typography>
    </Box>
  );
}

export default memo(LogoText);
