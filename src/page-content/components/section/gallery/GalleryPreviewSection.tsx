"use client";

import { Box, Typography } from "@mui/material";
import ArrowButton from "@/components/button/ArrowButton";
import { getGalleryItems, useLanguage } from "@/core/runtime";
import { getGalleryTranslation } from "@/core/translations";
import { getPageSlugByKeyWithBasePath } from "@/core/static";
import { CustomGallery } from "../common/CustomGallery";

/*
 * The gallery preview on the home page, from the Lumiera frames: the title centred, six
 * pictures in the mosaic — on a phone too, which draws two columns — and the call to action
 * under them: at the left on desktop, centred on tablet, full width on a phone.
 */
export default function GalleryPreviewSection() {
  const { lang } = useLanguage();
  const galleryTranslation = getGalleryTranslation(lang);
  const galleryItems = getGalleryItems().slice(0, 6);

  if (galleryItems.length === 0) return null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "40px", md: "56px" } }}>
      <Typography variant="h2" component="h2" sx={{ textAlign: "center" }}>
        {galleryTranslation.title}
      </Typography>

      <CustomGallery items={galleryItems} />

      <Box sx={{ display: "flex", justifyContent: { xs: "stretch", sm: "center", md: "flex-start" } }}>
        <ArrowButton
          component="a"
          href={getPageSlugByKeyWithBasePath("gallery")}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          {galleryTranslation.callToAction}
        </ArrowButton>
      </Box>
    </Box>
  );
}
