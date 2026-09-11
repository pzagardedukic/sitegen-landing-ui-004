"use client";

import Marquee from "react-fast-marquee";
import { Box, Typography } from "@mui/material";

export type ClientLogo = {
  src: string;
  href: string;
};

type ClientLogoSliderProps = {
  clients: ClientLogo[];
  speed?: number;
};

/* The link as a reader would name it: the host, without the scheme or "www.". */
function linkLabel(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

/*
 * The client strip from the Lumiera frames: logos in their own colours in 216 × 110 boxes
 * rounded 12, 24 apart, running edge to edge and scrolling past; under each logo its link,
 * 14 below, as muted underlined text. The logo opens the same link, but only the text is
 * in the tab order, so a keyboard user meets each client once.
 *
 * Every entry keeps the link line's height even without a link, so a row that mixes the two
 * does not jump.
 */
export default function ClientLogoSlider({
  clients,
  speed = 30,
}: ClientLogoSliderProps) {
  if (clients.length === 0) return null;

  return (
    <Marquee speed={speed} gradient={false} autoFill pauseOnHover>
      {clients.map((client, index) => (
        <Box
          key={`${client.src}-${index}`}
          sx={{
            width: 216,
            /*
             * Without this the entry shrinks to fit the flex row Marquee builds. autoFill
             * sizes the copies from the measured width of one group, so a shrinking group
             * asks for more copies, which shrink further: the strip grew past 32000 <img>
             * elements at 1440 and froze the page.
             */
            flexShrink: 0,
            mr: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <Box
            {...(client.href
              ? {
                  component: "a",
                  href: client.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  tabIndex: -1,
                  "aria-hidden": true,
                }
              : {})}
            sx={{
              width: "100%",
              height: 110,
              borderRadius: "12px",
              display: "grid",
              placeItems: "center",
              px: "16px",
              py: "20px",
            }}
          >
            <Box
              component="img"
              src={client.src}
              alt=""
              loading="lazy"
              sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
          </Box>

          <Box sx={{ minHeight: 24 }}>
            {client.href && (
              <Typography
                component="a"
                href={client.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="caption"
                sx={(theme) => ({
                  color: theme.palette.text.secondary,
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  transition: theme.transitions.create(["color"], {
                    duration: theme.transitions.duration.short,
                  }),
                  "&:hover": { color: theme.palette.primary.main },
                })}
              >
                {linkLabel(client.href)}
              </Typography>
            )}
          </Box>
        </Box>
      ))}
    </Marquee>
  );
}
