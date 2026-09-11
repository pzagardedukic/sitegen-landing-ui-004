"use client";

import { Box, Typography } from "@mui/material";
import { useBannerImage } from "@/app/theme/utils/UseBannerImage";
import { getHome, useLanguage } from "@/core/runtime";
import { getButtonTranslation } from "@/core/translations";
import { getPageSlugByKey } from "@/core/static";
import ArrowButton from "@/components/button/ArrowButton";
import { ChevronDownIcon } from "@/components/icons/icons";

/*
 * Hero, option A from the Lumiera Figma frames (1440×900, 768×848, 390×844):
 *   - the banner photograph runs edge to edge under the floating header, with the overlay
 *     colour laid over it;
 *   - the site name (h1), the slogan and the white Lumiera button are centred, 30 / 28 / 24
 *     apart, in a column 900 / 600 / 318 wide;
 *   - the scroll cue — its label over a round hairline button with a chevron — is centred
 *     near the bottom.
 *
 * Both links go to the about section, which is where the spec sends the call to action.
 */
export default function HomeSection() {
  const bannerImage = useBannerImage();
  const { lang } = useLanguage();
  const buttonTranslation = getButtonTranslation(lang);
  const home = getHome(lang);
  const aboutAnchor = `#${getPageSlugByKey("about")}`;

  return (
    <Box
      id="home"
      component="section"
      sx={(theme) => ({
        position: "relative",
        height: "100dvh",
        minHeight: { xs: 640, sm: 720, md: 760 },
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          maxWidth: { md: 1020 },
          px: { xs: "36px", sm: "84px", md: "60px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: { xs: "24px", sm: "28px", md: "30px" },
        }}
      >
        <Typography variant="h1" component="h1" sx={{ color: "inherit" }}>
          {home.name}
        </Typography>

        {home.slogan && (
          <Typography
            variant="slogan"
            component="p"
            sx={{ color: "inherit", maxWidth: { sm: 520, md: 620 } }}
          >
            {home.slogan}
          </Typography>
        )}

        <ArrowButton tone="white" component="a" href={aboutAnchor}>
          {buttonTranslation.discoverNow}
        </ArrowButton>
      </Box>

      <Box
        component="a"
        href={aboutAnchor}
        sx={(theme) => ({
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: { xs: "36px", sm: "48px", md: "44px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: "12px", md: "14px" },
          color: "inherit",
          "&:hover .scroll-cue": {
            backgroundColor: theme.palette.surfaces.onImage,
            color: theme.palette.text.primary,
          },
        })}
      >
        <Typography
          variant="caption"
          component="span"
          sx={{ color: "inherit", opacity: 0.85, whiteSpace: "nowrap" }}
        >
          {buttonTranslation.scrollDown}
        </Typography>

        <Box
          component="span"
          className="scroll-cue"
          sx={(theme) => ({
            width: { xs: 44, md: 48 },
            height: { xs: 44, md: 48 },
            borderRadius: "50%",
            border: `1px solid ${theme.palette.surfaces.onImage}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: theme.transitions.create(["background-color", "color"], {
              duration: theme.transitions.duration.short,
            }),
          })}
        >
          <ChevronDownIcon size={12} />
        </Box>
      </Box>
    </Box>
  );
}
