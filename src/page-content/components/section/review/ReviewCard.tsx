"use client";

import { Avatar, Box, Typography } from "@mui/material";
import { ArrowOutwardIcon } from "@/components/icons/icons";

type Review = {
  text: string;
  author: string;
  image?: string;
  url?: string;
};

type Props = {
  review: Review;
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
 * A review card from the Lumiera frames: white, rounded 12, 28 / 30 padding, 18 between
 * its parts —
 *   - an opening quotation mark in the heading face, 56, in primary;
 *   - the review in the text colour;
 *   - the source link, when there is one, as the muted underlined host with a small arrow;
 *   - the author under a hairline: the round avatar (50) and the name (h6).
 * With a link the whole card opens it, as the spec asks; without one it is not clickable.
 */
export default function ReviewCard({ review }: Props) {
  const { text, author, image, url } = review;
  const isLink = Boolean(url);

  return (
    <Box
      {...(isLink
        ? {
            component: "a",
            href: url,
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
      sx={(theme) => ({
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        px: "30px",
        py: "28px",
        borderRadius: "12px",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        textDecoration: "none",
        ...(isLink && {
          "&:hover .review-link, &:focus-visible .review-link": {
            color: theme.palette.primary.main,
          },
        }),
      })}
    >
      <Typography
        aria-hidden
        component="span"
        sx={(theme) => ({
          fontFamily: theme.typography.h1.fontFamily,
          fontSize: "56px",
          lineHeight: "36px",
          height: 36,
          color: theme.palette.primary.main,
        })}
      >
        “
      </Typography>

      <Typography variant="body1" sx={{ flex: 1 }}>
        {text}
      </Typography>

      {isLink && (
        <Box
          component="span"
          className="review-link"
          sx={(theme) => ({
            ...theme.typography.caption,
            alignSelf: "flex-start",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: theme.palette.text.secondary,
            textDecoration: "underline",
            textUnderlineOffset: "3px",
            transition: theme.transitions.create(["color"], {
              duration: theme.transitions.duration.short,
            }),
          })}
        >
          {linkLabel(url!)}
          <ArrowOutwardIcon size={7} />
        </Box>
      )}

      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          gap: "14px",
          pt: "18px",
          borderTop: `1px solid ${theme.palette.surfaces.border}`,
        })}
      >
        <Avatar src={image} alt="" sx={{ width: 50, height: 50 }} />
        <Typography variant="h6" component="p">
          {author}
        </Typography>
      </Box>
    </Box>
  );
}
