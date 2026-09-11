"use client";

import { Box, Typography } from "@mui/material";
import ArrowButton from "@/components/button/ArrowButton";
import { stripRichText, truncateWordSafe } from "@/core/utils";

type PortfolioPreviewCardProps = {
  image: string;
  title: string;
  text?: string;
  href: string;
  category?: string;
  openLabel?: string;
  /** `compact` is the related-projects card: a smaller photograph and the title only. */
  variant?: "full" | "compact";
};

/*
 * A project card from the Lumiera frames: rounded 12 on the surface wash, the photograph
 * across the top (300 tall) with the category in a dark tag in its corner, then the title
 * (h5) 20 / 24 in.
 *
 * The active card — hovered or focused — also shows the text, cut to 100 characters, under
 * the title, and a dark "open" button over the bottom of the photograph; the card grows to
 * carry them, and the row does not stretch the others to match. On a device that cannot
 * hover there is no way to reach that state, so there every card shows it.
 *
 * The compact variant closes a project page: 200 of photograph and the title (h6) only.
 */
export default function PortfolioPreviewCard({
  image,
  title,
  text = "",
  href,
  category,
  openLabel,
  variant = "full",
}: PortfolioPreviewCardProps) {
  const compact = variant === "compact";
  const truncated = compact ? "" : stripRichText(truncateWordSafe(text, 100));

  return (
    <Box
      component="a"
      href={href}
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        overflow: "hidden",
        textDecoration: "none",
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.surfaces.surface,
        "& .card-img": {
          transition: theme.transitions.create(["transform"], {
            duration: theme.transitions.duration.standard,
          }),
        },
        "&:hover .card-img, &:focus-visible .card-img": { transform: "scale(1.04)" },
        "@media (hover: hover)": {
          "& .card-reveal": { display: "none" },
          "& .card-open": { opacity: 0, transform: "translate(-50%, 8px)" },
          "&:hover .card-reveal, &:focus-visible .card-reveal": { display: "block" },
          "&:hover .card-open, &:focus-visible .card-open": {
            opacity: 1,
            transform: "translate(-50%, 0)",
          },
        },
      })}
    >
      <Box
        sx={(theme) => ({
          position: "relative",
          flexShrink: 0,
          height: compact ? 200 : 300,
          overflow: "hidden",
          backgroundColor: theme.palette.surfaces.placeholder,
        })}
      >
        <Box
          component="img"
          src={image}
          alt=""
          loading="lazy"
          className="card-img"
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />

        {!compact && category && (
          <Box
            sx={(theme) => ({
              ...theme.typography.caption,
              position: "absolute",
              top: 12,
              left: 12,
              px: "10px",
              py: "5px",
              borderRadius: "6px",
              backgroundColor: theme.palette.text.primary,
              color: theme.palette.background.default,
            })}
          >
            {category}
          </Box>
        )}

        {!compact && openLabel && (
          <Box
            className="card-open"
            sx={(theme) => ({
              position: "absolute",
              left: "50%",
              bottom: { xs: 20, md: 24 },
              transform: "translateX(-50%)",
              transition: theme.transitions.create(["opacity", "transform"], {
                duration: theme.transitions.duration.short,
              }),
            })}
          >
            <ArrowButton tone="dark" component="span" tabIndex={-1} sx={{ whiteSpace: "nowrap" }}>
              {openLabel}
            </ArrowButton>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          ...(compact
            ? { px: "16px", pt: "14px", pb: "16px" }
            : {
                px: { xs: "20px", md: "24px" },
                pt: { xs: "18px", md: "20px" },
                pb: { xs: "22px", md: "24px" },
              }),
        }}
      >
        <Typography variant={compact ? "h6" : "h5"} component="h3">
          {title}
        </Typography>

        {truncated && (
          <Typography className="card-reveal" variant="body1" sx={{ color: "text.secondary" }}>
            {truncated}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
