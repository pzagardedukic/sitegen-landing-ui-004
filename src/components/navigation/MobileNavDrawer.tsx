"use client";

import { useState } from "react";
import { Box, Collapse, Drawer, IconButton, Typography } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import { isCurrentPath, isNavActive, withBasePath } from "@/core/static";
import { getHome, SupportedLang, useLanguage } from "@/core/runtime";
import LanguageSelector from "@/components/language-selector/LanguageSelector";
import { ChevronDownIcon, CloseIcon } from "../icons/icons";

type SubItem = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href?: string;
  subItems?: SubItem[];
};

type MobileNavDrawerProps = {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
};

type LinkClick = (
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
) => void;

/* Figtree medium 20 — the mobile `nav` style in Figma, which is larger than the bar's 15. */
const navSx = (active: boolean) => (theme: Theme) => ({
  ...theme.typography.navLink,
  fontSize: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  p: 0,
  border: 0,
  background: "none",
  cursor: "pointer",
  textAlign: "left" as const,
  color: active ? theme.palette.primary.main : "inherit",
});

function Rule() {
  return (
    <Box
      aria-hidden
      sx={(theme) => ({
        height: "1px",
        flexShrink: 0,
        backgroundColor: theme.palette.surfaces.border,
      })}
    />
  );
}

/*
 * "Več" in the open menu: a row with a chevron, and the sub-pages indented under it on a
 * hairline. Open by default, as Figma draws it — the menu is a full screen with room for it,
 * and a closed group would hide most of the site behind one more tap.
 */
function MobileSubmenu({
  item,
  pathname,
  onLinkClick,
}: {
  item: NavItem & { subItems: SubItem[] };
  pathname: string;
  onLinkClick: LinkClick;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <Box>
      <Box
        component="button"
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
        sx={navSx(false)}
      >
        {item.label}
        <Box
          component="span"
          sx={{
            display: "flex",
            transition: "transform 0.2s ease",
            transform: expanded ? "rotate(180deg)" : "none",
          }}
        >
          <ChevronDownIcon size={12} />
        </Box>
      </Box>

      <Collapse in={expanded}>
        <Box
          sx={(theme) => ({
            mt: "20px",
            pl: "16px",
            borderLeft: `1px solid ${theme.palette.surfaces.border}`,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          })}
        >
          {item.subItems.map((sub) => {
            const active = isNavActive(pathname, sub.href);

            return (
              <Box
                key={sub.href}
                component="a"
                href={sub.href}
                aria-current={active ? "page" : undefined}
                onClick={(event: React.MouseEvent<HTMLAnchorElement>) =>
                  onLinkClick(event, sub.href)
                }
                sx={(theme) => ({
                  ...theme.typography.body1,
                  color: active
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                })}
              >
                {sub.label}
              </Box>
            );
          })}
        </Box>
      </Collapse>
    </Box>
  );
}

/*
 * The open mobile menu from Figma: a full white screen on the page margins (36 / 60) — the
 * logo and a close button on top, a hairline, the navigation in Figtree 20, another
 * hairline, and the language pill at the foot.
 *
 * It comes down from the top rather than in from the side, because the menu button sits in
 * the pill at the top of the screen.
 */
export default function MobileNavDrawer({
  open,
  onClose,
  items,
}: MobileNavDrawerProps) {
  const pathname = usePathname();
  const { lang, setLang, languageList } = useLanguage();
  const home = getHome(lang);

  const handleLinkClick: LinkClick = (event, href) => {
    if (isCurrentPath(pathname, href)) {
      event.preventDefault();
      onClose();
    }
  };

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: (theme) => ({
            // dvh, not vh: on a phone the URL bar is part of vh and the last item ends up
            // under it.
            height: "100dvh",
            backgroundColor: theme.palette.background.default,
            backgroundImage: "none",
            color: theme.palette.text.primary,
            px: { xs: "36px", sm: "60px" },
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }),
        },
      }}
    >
      <Box
        sx={{
          minHeight: 76,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box
          component="a"
          href={withBasePath("/")}
          sx={{
            display: "flex",
            alignItems: "center",
            minWidth: 0,
            color: "inherit",
          }}
        >
          {home.logo.image ? (
            <Box
              component="img"
              src={home.logo.image}
              alt={`${home.name} Logo`}
              sx={{
                height: 32,
                maxWidth: 180,
                width: "auto",
                objectFit: "contain",
              }}
            />
          ) : (
            <Typography variant="logo" component="span" noWrap>
              {home.name}
            </Typography>
          )}
        </Box>

        <IconButton
          onClick={onClose}
          aria-label={lang === "SL" ? "Zapri meni" : "Close menu"}
          sx={{ color: "inherit", p: "10px", mr: "-10px" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Rule />

      <Box
        component="nav"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          py: "30px",
        }}
      >
        {items.map((item) => {
          if (item.subItems?.length) {
            return (
              <MobileSubmenu
                key={item.label}
                item={item as NavItem & { subItems: SubItem[] }}
                pathname={pathname}
                onLinkClick={handleLinkClick}
              />
            );
          }

          if (!item.href) return null;

          const active = isNavActive(pathname, item.href);

          return (
            <Box
              key={item.label}
              component="a"
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={(event: React.MouseEvent<HTMLAnchorElement>) =>
                handleLinkClick(event, item.href!)
              }
              sx={navSx(active)}
            >
              {item.label}
            </Box>
          );
        })}
      </Box>

      {languageList.length > 1 && (
        <>
          <Rule />
          <Box sx={{ pt: "30px", pb: "36px" }}>
            <LanguageSelector
              variant="menu"
              supportedLanguages={languageList}
              defaultLanguage={lang as string}
              onChange={(code) => setLang(code as SupportedLang)}
            />
          </Box>
        </>
      )}
    </Drawer>
  );
}
