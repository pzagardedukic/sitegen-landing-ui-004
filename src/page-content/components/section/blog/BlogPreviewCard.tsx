"use client";

import { Box, Typography } from "@mui/material";
import { useLanguage } from "@/core/runtime";
import { formatEventDate, stripRichText, truncateWordSafe } from "@/core/utils";

type BlogPreviewCardProps = {
  href: string;
  image: string;
  title: string;
  text: string;
  author: string;
  date: string;
};

/*
 * A post as the Lumiera frames draw it — no card around it: the picture rounded 12 (260 /
 * 220 / 210 tall), then 20 below it the date and author in the muted caption face, the
 * title (h5) and the excerpt, cut to 150 characters, in the muted text colour. The whole
 * post is the link; the picture eases in and the title takes primary on hover.
 */
export default function BlogPreviewCard({
  href,
  image,
  title,
  text,
  author,
  date,
}: BlogPreviewCardProps) {
  const { lang } = useLanguage();
  const excerpt = stripRichText(truncateWordSafe(text, 150));
  const meta = [date ? formatEventDate(date, lang) : "", author].filter(Boolean).join(" · ");

  return (
    <Box
      component="a"
      href={href}
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        color: "inherit",
        textDecoration: "none",
        "&:hover .blog-img, &:focus-visible .blog-img": { transform: "scale(1.04)" },
        "&:hover .blog-title, &:focus-visible .blog-title": { color: theme.palette.primary.main },
      })}
    >
      <Box
        sx={(theme) => ({
          height: { xs: 210, sm: 220, md: 260 },
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: theme.palette.surfaces.placeholder,
        })}
      >
        <Box
          component="img"
          src={image}
          alt=""
          loading="lazy"
          className="blog-img"
          sx={(theme) => ({
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: theme.transitions.create(["transform"]),
          })}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {meta && (
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {meta}
          </Typography>
        )}

        <Typography
          className="blog-title"
          variant="h5"
          component="h3"
          sx={(theme) => ({
            transition: theme.transitions.create(["color"], {
              duration: theme.transitions.duration.short,
            }),
          })}
        >
          {title}
        </Typography>

        {excerpt && (
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {excerpt}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
