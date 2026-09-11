"use client";

import { Box } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import HoverDropdown, { DropdownItem } from "../common/HoverDropdown";
import { ChevronDownIcon } from "../icons/icons";
import { isCurrentPath, isNavActive } from "@/core/static";

type NavItem = {
  label: string;
  href?: string;
  subItems?: {
    label: string;
    href: string;
  }[];
};

type DesktopNavigationProps = {
  items: NavItem[];
};

const linkSx = (theme: Theme) => ({
  ...theme.typography.navLink,
  position: "relative" as const,
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  py: 1,
  p: 0,
  border: 0,
  background: "none",
  cursor: "pointer",
  color: "inherit",
  transition: theme.transitions.create(["opacity"], {
    duration: theme.transitions.duration.shortest,
  }),
  "&:hover": { opacity: 0.7 },
});

/* A hairline in the link's own colour, so the marker reads on the glass and on white alike. */
const activeSx = {
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -6,
    height: "1px",
    backgroundColor: "currentColor",
  },
};

/*
 * Lumiera's header navigation: Figtree medium 15 (the `navLink` variant), 30 apart, in the
 * colour the header gives it — white on the glass over the photograph, the text colour once
 * the header is solid.
 */
export default function DesktopNavigation({ items }: DesktopNavigationProps) {
  const pathname = usePathname();

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (isCurrentPath(pathname, href)) {
      event.preventDefault();
    }
  };

  return (
    <Box component="nav" sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
      {items.map((item) => {
        if (item.subItems?.length) {
          const dropdownItems: DropdownItem[] = item.subItems.map((sub) => ({
            label: sub.label,
            href: sub.href,
            active: isNavActive(pathname, sub.href),
          }));
          const active = dropdownItems.some((sub) => sub.active);

          return (
            <HoverDropdown
              key={item.label}
              trigger={
                <Box
                  component="button"
                  type="button"
                  aria-haspopup="true"
                  sx={[linkSx, active && activeSx]}
                >
                  {item.label}
                  <ChevronDownIcon />
                </Box>
              }
              items={dropdownItems}
              onItemClick={handleLinkClick}
            />
          );
        }

        const active = isNavActive(pathname, item.href);

        return (
          <Box
            key={item.label}
            component="a"
            href={item.href || "#"}
            aria-current={active ? "page" : undefined}
            onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
              if (item.href) {
                handleLinkClick(event, item.href);
              }
            }}
            sx={[linkSx, active && activeSx]}
          >
            {item.label}
          </Box>
        );
      })}
    </Box>
  );
}
