"use client";

import { Box, Typography } from "@mui/material";
import { getBlogItems, useLanguage } from "@/core/runtime";
import { getBlogTranslation } from "@/core/translations";
import { getBlogSlugById, getPageSlugByKeyWithBasePath } from "@/core/static";

type LatestPostsProps = {
  excludeId?: number;
  count?: number;
};

/*
 * "Latest posts" beside an article, as the Lumiera frames draw it: a cream panel rounded 16,
 * 28 / 24 in, its heading in the h5 face, then the posts 18 apart — an 80 × 64 thumbnail
 * rounded 8 and the title in medium 15 beside it, 14 apart. Each post is a plain link; the
 * title takes primary on hover. The panel is left out when there is no other post.
 */
export default function LatestPosts({ excludeId, count = 5 }: LatestPostsProps) {
  const { lang } = useLanguage();
  const blogTranslations = getBlogTranslation(lang);

  const posts = getBlogItems(lang)
    .filter((post) => post.id !== excludeId)
    .slice(0, count);

  if (posts.length === 0) return null;

  return (
    <Box
      component="aside"
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        px: "24px",
        py: "28px",
        borderRadius: "16px",
        backgroundColor: theme.palette.surfaces.bgAlt,
      })}
    >
      <Typography variant="h5" component="h2">
        {blogTranslations.posts.latestPosts}
      </Typography>

      {posts.map((post) => (
        <Box
          key={post.id}
          component="a"
          href={`${getPageSlugByKeyWithBasePath("blog")}/${getBlogSlugById(post.id)}`}
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            gap: "14px",
            color: "inherit",
            textDecoration: "none",
            "&:hover .latest-title, &:focus-visible .latest-title": {
              color: theme.palette.primary.main,
            },
          })}
        >
          <Box
            sx={(theme) => ({
              flexShrink: 0,
              width: 80,
              height: 64,
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: theme.palette.surfaces.placeholder,
            })}
          >
            <Box
              component="img"
              src={post.image}
              alt=""
              loading="lazy"
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>

          <Typography
            className="latest-title"
            variant="subtitle1"
            sx={(theme) => ({
              transition: theme.transitions.create(["color"], {
                duration: theme.transitions.duration.short,
              }),
            })}
          >
            {post.title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
