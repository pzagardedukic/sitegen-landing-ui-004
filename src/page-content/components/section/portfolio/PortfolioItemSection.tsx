"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import type PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import BackButton from "@/components/button/BackButton";
import { getPortfolioItems, useLanguage } from "@/core/runtime";
import { getPortfolioTranslation } from "@/core/translations";
import { getPageSlugByKey } from "@/core/static";
import { formatEventDate } from "@/core/utils";
import RichText from "../common/RichText";
import ShareActions from "../common/ShareActions";
import RelatedProjects from "./RelatedProjects";

type ImageSize = { width: number; height: number };

/* PhotoSwipe needs each picture's own proportions, so they are read once the files load. */
function useImageSizes(sources: string[]) {
  const [sizes, setSizes] = useState<Record<string, ImageSize>>({});

  useEffect(() => {
    let cancelled = false;

    sources.forEach((src) => {
      const image = new Image();
      image.onload = () => {
        if (cancelled) return;
        setSizes((previous) => ({
          ...previous,
          [src]: { width: image.naturalWidth, height: image.naturalHeight },
        }));
      };
      image.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, [sources]);

  return sizes;
}

/*
 * Project detail from the Lumiera frames:
 *   - the back pill;
 *   - on desktop the gallery (55 % — 660 of 1200) beside the project's column (476): the
 *     title, the text, the details as a hairline table — label left, value right in the
 *     muted colour — and the share buttons; stacked below desktop;
 *   - the related projects, same category, up to five.
 *
 * The gallery is the main picture over a row of thumbnails, four to a row, the current one
 * outlined in the text colour. A thumbnail swaps the main picture; the main picture opens
 * the whole set in a lightbox, and paging there keeps the main picture in step, so closing
 * it leaves the reader on the picture they stopped at.
 */
export default function PortfolioItemSection({ id }: { id: number }) {
  const router = useRouter();
  const { lang } = useLanguage();
  const projectTranslations = getPortfolioTranslation(lang).project;
  const [activeImage, setActiveImage] = useState(0);
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);

  const allItems = getPortfolioItems(lang);
  const portfolioItem = allItems.find((item) => item.id === id);
  const images = portfolioItem?.images ?? [];
  const sizes = useImageSizes(images);

  useEffect(() => () => lightboxRef.current?.destroy(), []);

  if (!portfolioItem) {
    return null;
  }

  const openLightbox = async (index: number) => {
    const { default: Lightbox } = await import("photoswipe/lightbox");

    lightboxRef.current?.destroy();
    const lightbox = new Lightbox({
      dataSource: images.map((src) => ({
        src,
        width: sizes[src]?.width ?? 1600,
        height: sizes[src]?.height ?? 1200,
      })),
      pswpModule: () => import("photoswipe"),
      loop: true,
      wheelToZoom: true,
    });
    lightbox.on("change", () => {
      if (lightbox.pswp) setActiveImage(lightbox.pswp.currIndex);
    });
    lightbox.init();
    lightbox.loadAndOpen(index);
    lightboxRef.current = lightbox;
  };

  const related = portfolioItem.category
    ? allItems.filter(
        (item) => item.id !== portfolioItem.id && item.category === portfolioItem.category,
      )
    : [];

  const details = [
    {
      label: projectTranslations.details.date,
      value: portfolioItem.date ? formatEventDate(portfolioItem.date, lang) : "",
    },
    { label: projectTranslations.details.client, value: portfolioItem.client },
    { label: projectTranslations.details.category, value: portfolioItem.category },
  ].filter((detail) => Boolean(detail.value));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "36px", md: "56px" } }}>
      <BackButton
        label={projectTranslations.backToPortfolio}
        onClick={() => router.push(`/${getPageSlugByKey("portfolio")}`)}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          gap: { xs: "36px", md: "64px" },
        }}
      >
        {images.length > 0 && (
          <Box
            sx={{
              width: "100%",
              flex: { md: "0 0 55%" },
              display: "flex",
              flexDirection: "column",
              gap: { xs: "10px", md: "12px" },
            }}
          >
            <Box
              component="button"
              type="button"
              onClick={() => openLightbox(activeImage)}
              aria-label={`${portfolioItem.title} — ${activeImage + 1} / ${images.length}`}
              sx={(theme) => ({
                display: "block",
                width: "100%",
                height: { xs: 300, sm: 480, md: 600 },
                p: 0,
                border: 0,
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "zoom-in",
                backgroundColor: theme.palette.surfaces.placeholder,
              })}
            >
              <Box
                component="img"
                src={images[activeImage]}
                alt=""
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>

            {images.length > 1 && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  gap: { xs: "10px", md: "12px" },
                }}
              >
                {images.map((image, index) => (
                  <Box
                    key={`${image}-${index}`}
                    component="button"
                    type="button"
                    aria-label={`${index + 1} / ${images.length}`}
                    aria-pressed={index === activeImage}
                    onClick={() => setActiveImage(index)}
                    sx={(theme) => ({
                      position: "relative",
                      height: { xs: 70, sm: 110, md: 140 },
                      p: 0,
                      border: 0,
                      borderRadius: "12px",
                      overflow: "hidden",
                      cursor: "pointer",
                      backgroundColor: theme.palette.surfaces.placeholder,
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        borderRadius: "12px",
                        boxShadow:
                          index === activeImage
                            ? `inset 0 0 0 2px ${theme.palette.text.primary}`
                            : "none",
                      },
                    })}
                  >
                    <Box
                      component="img"
                      src={image}
                      alt=""
                      loading="lazy"
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: { xs: "24px", md: "28px" },
          }}
        >
          <Typography variant="h2" component="h2">
            {portfolioItem.title}
          </Typography>

          {portfolioItem.text && (
            <Typography component="div" variant="body1">
              <RichText
                text={portfolioItem.text}
                allowStyling={{ newLine: true, bold: true, italic: true, underline: true }}
              />
            </Typography>
          )}

          {details.length > 0 && (
            <Box
              component="dl"
              aria-label={projectTranslations.details.label}
              sx={(theme) => ({ m: 0, borderTop: `1px solid ${theme.palette.surfaces.border}` })}
            >
              {details.map((detail) => (
                <Box
                  key={detail.label}
                  sx={(theme) => ({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: { xs: "16px", md: "24px" },
                    py: { xs: "14px", md: "16px" },
                    borderBottom: `1px solid ${theme.palette.surfaces.border}`,
                  })}
                >
                  <Typography component="dt" variant="subtitle1">
                    {detail.label}
                  </Typography>
                  <Typography
                    component="dd"
                    variant="body1"
                    sx={{ m: 0, color: "text.secondary", textAlign: "right" }}
                  >
                    {detail.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          <ShareActions title={portfolioItem.title} />
        </Box>
      </Box>

      {related.length > 0 && <RelatedProjects items={related} />}
    </Box>
  );
}
