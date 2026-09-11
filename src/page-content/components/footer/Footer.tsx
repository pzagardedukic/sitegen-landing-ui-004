"use client";

import FooterSocials from "@/components/button/FooterSocials";
import { ArrowUpIcon } from "@/components/icons/icons";
import { BUILD_YEAR, useLanguage } from "@/core/runtime";
import {
  getButtonTranslation,
  getFooterTranslation,
} from "@/core/translations";
import { Box, Link, Typography } from "@mui/material";

function BackToTop({ label }: { label: string }) {
  return (
    <Box
      component="a"
      href="#main"
      onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
        // Scrolled by hand so the address bar does not keep a #main after the jump.
        event.preventDefault();
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      }}
      sx={(theme) => ({
        ...theme.typography.button,
        flexShrink: 0,
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        px: "22px",
        py: "13px",
        borderRadius: "999px",
        border: `1px solid ${theme.palette.footer.buttonBorder}`,
        color: "inherit",
        transition: theme.transitions.create(["background-color", "color", "border-color"], {
          duration: theme.transitions.duration.short,
        }),
        "&:hover": {
          backgroundColor: theme.palette.footer.text.primary,
          borderColor: theme.palette.footer.text.primary,
          color: theme.palette.footer.background,
        },
      })}
    >
      {label}
      <ArrowUpIcon />
    </Box>
  );
}

/*
 * The footer as approved in Figma: exactly the four elements of the footer spec, set in the
 * Lumiera FOOTER-1 manner.
 *
 *   desktop / tablet   slogan ............... back to top
 *                      ─────────────────────────────────
 *                      © production year ....... socials
 *
 *   mobile             everything centred and stacked, the socials above the copyright.
 *
 * The socials are optional and FooterSocials renders nothing when the site has none, which
 * leaves the copyright alone on its row.
 */
export default function Footer() {
  const { lang } = useLanguage();
  const footerTranslation = getFooterTranslation(lang);
  const buttonTranslation = getButtonTranslation(lang);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "32px", sm: "36px", md: "44px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Typography
          variant="h4"
          component="p"
          sx={{ flex: { sm: 1 }, maxWidth: { md: 760 } }}
        >
          {footerTranslation.slogan}
        </Typography>

        <BackToTop label={buttonTranslation.backToTop} />
      </Box>

      <Box
        aria-hidden
        sx={(theme) => ({ height: "1px", backgroundColor: theme.palette.footer.divider })}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: "18px", sm: 3 },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Typography
          component={Link}
          href="https://onas.si"
          target="_blank"
          rel="noopener noreferrer"
          variant="caption"
          underline="hover"
          sx={(theme) => ({ color: theme.palette.footer.text.secondary })}
        >
          &copy; {footerTranslation.production} {BUILD_YEAR}.
        </Typography>

        <FooterSocials />
      </Box>
    </Box>
  );
}
