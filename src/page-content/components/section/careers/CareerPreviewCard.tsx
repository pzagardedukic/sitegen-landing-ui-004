"use client";

import { Box, Typography } from "@mui/material";
import { stripRichText, truncateWordSafe } from "@/core/utils";
import ApplyButton from "./ApplyButton";
import RequirementList from "./RequirementList";

type CareerPreviewCardProps = {
  href: string;
  title: string;
  text: string;
  note: string;
  requirements: string[];
  requirementsLabel: string;
};

/*
 * A vacancy row from the Lumiera frames (1200 × 268, rounded 16 on the hairline, padded
 * 32/40): the role with its line of text and its note on the left, the first three
 * requirements and the apply button on the right at 440, 64 apart.
 *
 * Below desktop the two halves stack, 24 apart — held side by side at 768 the requirement
 * lines broke over three rows each. Both optional parts simply drop out where the data has
 * none, which is the frame drawn as "seznam brez opcijskih".
 *
 * The role's name carries the link and stretches over the whole card, so the text and the
 * requirements lead to the advert too; the apply button sits above that overlay, because a
 * link inside a link is not a thing a browser can express. The card reacted to hover from
 * the start, which made a card that only its title could open — the reader aimed at the
 * card and nothing happened. The price is that the body text can no longer be selected with
 * a drag, the same trade the event card already makes.
 */
export default function CareerPreviewCard({
  href,
  title,
  text,
  note,
  requirements,
  requirementsLabel,
}: CareerPreviewCardProps) {
  const truncatedText = stripRichText(truncateWordSafe(text, 180));

  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "flex-start",
        gap: { xs: "24px", md: "64px" },
        p: { xs: "32px 24px", md: "32px 40px" },
        borderRadius: "16px",
        border: `1px solid ${theme.palette.surfaces.border}`,
        transition: theme.transitions.create(["border-color"], {
          duration: theme.transitions.duration.short,
        }),
        "&:hover": { borderColor: theme.palette.text.primary },
        "&:hover .career-title": { color: theme.palette.primary.main },
      })}
    >
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Typography
          component="a"
          href={href}
          variant="h4"
          className="career-title"
          sx={(theme) => ({
            textDecoration: "none",
            color: "inherit",
            transition: theme.transitions.create(["color"], {
              duration: theme.transitions.duration.short,
            }),
            /* Kept alongside the parent's hover rule: the keyboard never hovers the card. */
            "&:hover, &:focus-visible": { color: theme.palette.primary.main },
            /* The whole card follows the name's link. */
            "&::after": { content: '""', position: "absolute", inset: 0 },
          })}
        >
          {title}
        </Typography>

        {truncatedText && (
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {truncatedText}
          </Typography>
        )}

        {note && (
          <Typography variant="caption" component="p" sx={{ color: "text.secondary" }}>
            {note}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: 440 },
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <RequirementList
          requirements={requirements.slice(0, 3)}
          label={requirementsLabel}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <ApplyButton title={title} tone="outline" fullWidth />
        </Box>
      </Box>
    </Box>
  );
}
