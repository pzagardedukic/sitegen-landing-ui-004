"use client";

import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import BackButton from "@/components/button/BackButton";
import { getBlogItems, useLanguage } from "@/core/runtime";
import { getBlogTranslation } from "@/core/translations";
import { getPageSlugByKey } from "@/core/static";
import { formatEventDate } from "@/core/utils";
import RichText from "../common/RichText";
import ShareActions from "../common/ShareActions";
import LatestPosts from "./LatestPosts";

/*
 * Post detail from the Lumiera frames:
 *   - the back pill;
 *   - the article — date and author in the muted caption face, the title (h2 size; the h1
 *     is the page's title band), the picture rounded 12 (440 / 380 / 240), the text — beside
 *     the latest posts in their cream panel (360), 80 apart on desktop; stacked below it,
 *     the panel 48 under the article;
 *   - the share row across the full width, on a hairline.
 */
export default function BlogPostSection({ id }: { id: number }) {
  const router = useRouter();
  const { lang } = useLanguage();
  const blogTranslations = getBlogTranslation(lang);

  const blog = getBlogItems(lang).find((item) => item.id === id);

  if (!blog) {
    return null;
  }

  const meta = [blog.date ? formatEventDate(blog.date, lang) : "", blog.author]
    .filter(Boolean)
    .join(" · ");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <BackButton
        label={blogTranslations.posts.backToBlogs}
        onClick={() => router.push(`/${getPageSlugByKey("blog")}`)}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          gap: { xs: "48px", md: "80px" },
        }}
      >
        <Box
          component="article"
          sx={{
            flex: 1,
            minWidth: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {meta && (
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {meta}
            </Typography>
          )}

          <Typography variant="h2" component="h2">
            {blog.title}
          </Typography>

          <Box
            sx={(theme) => ({
              height: { xs: 240, sm: 380, md: 440 },
              borderRadius: "12px",
              overflow: "hidden",
              backgroundColor: theme.palette.surfaces.placeholder,
            })}
          >
            <Box
              component="img"
              src={blog.image}
              alt=""
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>

          {blog.description && (
            <Typography component="div" variant="body1">
              <RichText
                text={blog.description}
                allowStyling={{
                  newLine: true,
                  bold: true,
                  italic: true,
                  underline: true,
                }}
              />
            </Typography>
          )}
        </Box>

        <Box sx={{ width: { xs: "100%", md: 360 }, flexShrink: 0 }}>
          <LatestPosts excludeId={id} count={5} />
        </Box>
      </Box>

      <Box
        sx={(theme) => ({
          pt: "24px",
          borderTop: `1px solid ${theme.palette.surfaces.border}`,
        })}
      >
        <ShareActions title={blog.title} />
      </Box>
    </Box>
  );
}
