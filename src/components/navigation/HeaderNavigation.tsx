"use client";

import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { useLanguage } from "@/core/runtime";
import MobileNavDrawer from "./MobileNavDrawer";
import DesktopNavigation from "./DesktopNavigation";
import { MenuIcon } from "../icons/icons";

type NavItem = {
  label: string;
  href?: string;
  subItems?: {
    label: string;
    href: string;
  }[];
};

type HeaderNavigationProps = {
  items: NavItem[];
};

/*
 * Links from md up, the two-line menu button below it — Figma folds the navigation at the
 * tablet width too. Both are rendered and switched in CSS rather than by a media-query hook:
 * the site is a static export, and a hook answers "desktop" on the server, so every phone
 * flashed the full link row before swapping it for the button.
 */
export default function HeaderNavigation({ items }: HeaderNavigationProps) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <DesktopNavigation items={items} />
      </Box>

      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          onClick={() => setOpen(true)}
          aria-label={lang === "SL" ? "Odpri meni" : "Open menu"}
          aria-expanded={open}
          sx={{ color: "inherit", p: "10px", ml: "-10px" }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <MobileNavDrawer open={open} onClose={() => setOpen(false)} items={items} />
    </>
  );
}
