"use client";

import { Box } from "@mui/material";
import ArrowButton from "@/components/button/ArrowButton";
import { getBlogItems, getBlogSection, useLanguage } from "@/core/runtime";
import { getBlogTranslation } from "@/core/translations";
import { getPageSlugByKeyWithBasePath } from "@/core/static";
import CenteredIntro from "../common/CenteredIntro";
import BlogGrid from "./BlogGrid";

/*
 * The blog preview on the home page (shown only when the reviews are off): the title and
 * description on the left with the outlined call to action level with their foot on the
 * right — stacked under them below desktop, full width on a phone — then the three latest
 * posts, 48 below.
 */
export default function BlogPreviewSection() {
  const { lang } = useLanguage();
  const blogTranslation = getBlogTranslation(lang);
  const blogSection = getBlogSection(lang);

  if (!blogSection) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "flex-end" },
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        <CenteredIntro
          align="left"
          title={blogTranslation.title}
          description={blogSection.text}
        />

        <ArrowButton
          tone="outline"
          component="a"
          href={getPageSlugByKeyWithBasePath("blog")}
          sx={{ flexShrink: 0, width: { xs: "100%", sm: "auto" } }}
        >
          {blogTranslation.callToAction}
        </ArrowButton>
      </Box>

      <BlogGrid items={getBlogItems(lang).slice(0, 3)} />
    </Box>
  );
}
