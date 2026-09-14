"use client";

import { Box, Typography } from "@mui/material";
import ArrowButton from "@/components/button/ArrowButton";
import { useBannerImage } from "@/app/theme/utils/UseBannerImage";
import { useLanguage } from "@/core/runtime";
import { getCallToActionTranslation } from "@/core/translations";

type CallToActionProps = {
  href: string;
};

/*
 * The call-to-action band from the Lumiera frames: the banner photograph edge to edge — no
 * inset card and no rounding — 560 / 420 / 420 tall, with the overlay colour over it. The
 * headline (h1 size) and the white button are centred in a column 860 / 696 / 318 wide, 40 /
 * 32 / 28 apart; on a phone the button runs the full width.
 */
export default function CallToAction({ href }: CallToActionProps) {
  const { lang } = useLanguage();
  const callToActionTranslation = getCallToActionTranslation(lang);
  const bannerImage = useBannerImage();

  return (
    <Box
      component="section"
      sx={(theme) => ({
        position: "relative",
        height: { xs: 420, md: 560 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: theme.palette.surfaces.placeholder,
        backgroundImage: `url("${bannerImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: theme.palette.surfaces.onImage,
      })}
    >
      <Box
        aria-hidden
        sx={(theme) => ({
          position: "absolute",
          inset: 0,
          backgroundColor: theme.palette.surfaces.scrim,
        })}
      />

      <Box
        sx={{
          position: "relative",
          width: "100%",
          /*
           * The caps count the page margin in, so the column itself is Figma's 318 / 696 /
           * 860. Capping at the content width and then adding the margin left the phone
           * button 246 wide instead of running the full column.
           */
          maxWidth: { xs: "100%", sm: 768, md: 860 },
          px: { xs: "36px", sm: "36px", md: 0 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: { xs: "28px", sm: "32px", md: "40px" },
        }}
      >
        <Typography variant="h1" component="p" sx={{ color: "inherit" }}>
          {callToActionTranslation.title}
        </Typography>

        <ArrowButton
          tone="white"
          component="a"
          href={href}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          {callToActionTranslation.contactButton}
        </ArrowButton>
      </Box>
    </Box>
  );
}
