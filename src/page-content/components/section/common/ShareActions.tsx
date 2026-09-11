"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import LinkIcon from "@mui/icons-material/Link";
import { CheckIcon } from "@/components/icons/icons";
import { useLanguage } from "@/core/runtime";
import { getButtonTranslation } from "@/core/translations";

type ShareActionsProps = {
  url?: string;
  title?: string;
};

/* Lumiera's small round buttons: 32 across on the hairline, the icon in the text colour. */
const circleSx = (theme: Theme) => ({
  width: 32,
  height: 32,
  flexShrink: 0,
  display: "grid",
  placeItems: "center",
  p: 0,
  border: 0,
  borderRadius: "50%",
  cursor: "pointer",
  background: "none",
  color: theme.palette.text.primary,
  boxShadow: `inset 0 0 0 1px ${theme.palette.surfaces.border}`,
  "& .MuiSvgIcon-root": { fontSize: 15 },
  transition: theme.transitions.create(["background-color", "color", "box-shadow"], {
    duration: theme.transitions.duration.short,
  }),
  "&:hover, &:focus-visible": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: "none",
  },
});

/*
 * The share row on detail pages: the label in the muted caption face, then Facebook,
 * LinkedIn and X — the order Lumiera draws them — and copy link, which shows a tick for two
 * seconds once the address is on the clipboard.
 */
export default function ShareActions({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = "",
}: ShareActionsProps) {
  const { lang } = useLanguage();
  const buttonTranslations = getButtonTranslation(lang);
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be refused (insecure origin, permissions); nothing to show then.
    }
  };

  const links = [
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, icon: <FacebookIcon /> },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, icon: <LinkedInIcon /> },
    { name: "X", href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, icon: <XIcon /> },
  ];

  return (
    <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
      <Typography variant="caption" sx={{ color: "text.secondary", mr: "4px" }}>
        {buttonTranslations.shareOn}
      </Typography>

      {links.map((link) => (
        <Box
          key={link.name}
          component="a"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${buttonTranslations.shareOn} ${link.name}`}
          sx={circleSx}
        >
          {link.icon}
        </Box>
      ))}

      <Box
        component="button"
        type="button"
        onClick={handleCopy}
        aria-label={buttonTranslations.copyLink ?? "Copy link"}
        sx={circleSx}
      >
        {copied ? <CheckIcon size={11} /> : <LinkIcon />}
      </Box>
    </Box>
  );
}
