"use client";

import { Box } from "@mui/material";
import PaginationControls from "@/components/button/PaginationControls";
import { getBlogItems, getBlogSection, useLanguage } from "@/core/runtime";
import { usePagination } from "@/core/react";
import { getBlogTranslation } from "@/core/translations";
import CenteredIntro from "../common/CenteredIntro";
import BlogGrid from "./BlogGrid";

/*
 * The /blog page: the section's intro, every post six to a page in the same grid as the
 * preview, and the page numbers centred under them. No call to action — this is the page it
 * leads to.
 */
export default function BlogSection() {
  const { lang } = useLanguage();
  const blogTranslation = getBlogTranslation(lang);
  const blogSection = getBlogSection(lang);
  const { page, setPage, pageCount, paginatedItems } = usePagination(getBlogItems(lang), 6);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      {blogSection && (
        <CenteredIntro align="left" title={blogTranslation.title} description={blogSection.text} />
      )}

      <BlogGrid items={paginatedItems} />

      {pageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <PaginationControls page={page} pageCount={pageCount} onChange={setPage} />
        </Box>
      )}
    </Box>
  );
}
