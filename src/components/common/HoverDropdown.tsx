import React, { useRef, useState } from "react";
import {
  Box,
  Grow,
  List,
  ListItemButton,
  Paper,
  Popper,
  type PopperPlacementType,
} from "@mui/material";
import { alpha, type Theme } from "@mui/material/styles";

export type DropdownItem = (
  | { label: string; href: string }
  | { label: string; onClick: () => void }
) & { active?: boolean };

type HoverDropdownProps = {
  trigger: React.ReactElement;
  items: DropdownItem[];
  onItemClick?: (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void;
  placement?: PopperPlacementType;
};

/*
 * The dropdown behind "Več" and the language pill. It is a white card on the Lumiera
 * hairline whatever the header behind it looks like: over the banner the header is glass,
 * and a glass menu laid over a photograph cannot be read.
 */
export default function HoverDropdown({
  trigger,
  items,
  onItemClick,
  placement = "bottom-start",
}: HoverDropdownProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = (el: HTMLElement) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAnchorEl(el);
  };

  const closeMenuDelayed = () => {
    timeoutRef.current = setTimeout(() => setAnchorEl(null), 150);
  };

  const cancelClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const closeMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAnchorEl(null);
  };

  const opensUp = placement.startsWith("top");
  const origin = `${opensUp ? "bottom" : "top"} ${placement.endsWith("end") ? "right" : "left"}`;

  const itemSx = (active?: boolean) => (theme: Theme) => ({
    ...theme.typography.body1,
    px: 2.5,
    py: 1,
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.surfaces.bgAlt,
    },
  });

  return (
    <Box
      onMouseEnter={(e) => openMenu(e.currentTarget)}
      onMouseLeave={closeMenuDelayed}
      onClick={(e) => openMenu(e.currentTarget)}
      /* The wrapper opens the menu too, so its edges must not feel different from the trigger. */
      sx={{ display: "inline-block", cursor: "pointer" }}
    >
      {trigger}

      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement={placement}
        transition
        disablePortal
        style={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: origin }}>
            <Paper
              onMouseEnter={cancelClose}
              onMouseLeave={closeMenuDelayed}
              sx={(theme) => ({
                ...(opensUp ? { mb: 1.5 } : { mt: 1.5 }),
                minWidth: 200,
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.surfaces.border}`,
                borderRadius: "16px",
                boxShadow: `0 16px 40px ${alpha(theme.palette.text.primary, 0.08)}`,
                overflow: "hidden",
              })}
            >
              <List sx={{ py: 1 }}>
                {items.map((item, index) =>
                  "href" in item ? (
                    <ListItemButton
                      key={index}
                      component="a"
                      href={item.href}
                      aria-current={item.active ? "page" : undefined}
                      onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                        event.stopPropagation();
                        onItemClick?.(event, item.href);
                        closeMenu();
                      }}
                      sx={itemSx(item.active)}
                    >
                      {item.label}
                    </ListItemButton>
                  ) : (
                    <ListItemButton
                      key={index}
                      onClick={(event) => {
                        event.stopPropagation();
                        item.onClick();
                        closeMenu();
                      }}
                      sx={itemSx(item.active)}
                    >
                      {item.label}
                    </ListItemButton>
                  ),
                )}
              </List>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
