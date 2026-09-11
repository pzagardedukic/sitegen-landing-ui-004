"use client";

import { Box } from "@mui/material";
import PaginationControls from "@/components/button/PaginationControls";
import { getGalleryItems } from "@/core/runtime";
import { usePagination } from "@/core/react";
import { CustomGallery } from "../common/CustomGallery";

/*
 * The /galerija page: every picture in the mosaic, six to a page, and the page numbers
 * under it — on the right on desktop, centred below. The page's title band already carries
 * the gallery title, so the mosaic opens the section directly.
 */
export default function GallerySection() {
  const galleryItems = getGalleryItems();
  const { page, setPage, pageCount, paginatedItems } = usePagination(galleryItems, 6);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "40px", md: "56px" } }}>
      <CustomGallery items={galleryItems} currentPageItems={paginatedItems} />

      {pageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}>
          <PaginationControls page={page} pageCount={pageCount} onChange={setPage} />
        </Box>
      )}
    </Box>
  );
}
