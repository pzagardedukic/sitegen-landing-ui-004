"use client";

import { Box, Typography } from "@mui/material";
import ArrowButton from "@/components/button/ArrowButton";
import { MagnifierIcon } from "@/components/icons/icons";
import { useLanguage } from "@/core/runtime";
import { withBasePath } from "@/core/static";
import { getNotFoundTranslation } from "@/core/translations";

/*
 * The 404 page from the Lumiera frames: everything centred in the middle of the screen —
 * the magnifier in a rose circle 104 across, the headline in the largest heading size, one
 * line of explanation, and the button home.
 *
 * This is the one page the frames draw without the title band: a reader who landed here by
 * mistake is served by one clear way out, not by a photograph of a page that does not exist.
 */
export default function NotFoundSection() {
  const { lang } = useLanguage();
  const translation = getNotFoundTranslation(lang);

  return (
    <Box
      sx={{
        minHeight: { xs: 460, sm: 520, md: 620 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: { xs: "20px", md: "28px" },
      }}
    >
      <Box
        aria-hidden
        sx={(theme) => ({
          width: { xs: 88, md: 104 },
          height: { xs: 88, md: 104 },
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          backgroundColor: theme.palette.surfaces.rose,
          color: theme.palette.text.primary,
        })}
      >
        <MagnifierIcon size={38} />
      </Box>

      <Typography variant="h1" component="h1" sx={{ maxWidth: 760 }}>
        {translation.title}
      </Typography>

      <Typography
        variant="body1"
        sx={{ maxWidth: 520, color: "text.secondary" }}
      >
        {translation.text}
      </Typography>

      <ArrowButton component="a" href={withBasePath("/")} tone="primary">
        {translation.backToHome}
      </ArrowButton>
    </Box>
  );
}
