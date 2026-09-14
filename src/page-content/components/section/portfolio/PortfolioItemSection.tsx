"use client";

import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import BackButton from "@/components/button/BackButton";
import { getPortfolioItems, useLanguage } from "@/core/runtime";
import { getPortfolioTranslation } from "@/core/translations";
import { getPageSlugByKey } from "@/core/static";
import { formatEventDate } from "@/core/utils";
import MediaGallery from "../common/MediaGallery";
import RichText from "../common/RichText";
import ShareActions from "../common/ShareActions";
import RelatedProjects from "./RelatedProjects";

/*
 * Project detail from the Lumiera frames:
 *   - the back pill;
 *   - on desktop the gallery (55 % — 660 of 1200) beside the project's column (476): the
 *     title, the text, the details as a hairline table — label left, value right in the
 *     muted colour — and the share buttons; stacked below desktop;
 *   - the related projects, same category, up to five.
 *
 * The gallery itself is the shared one, which the price item's page draws the same way.
 */
export default function PortfolioItemSection({ id }: { id: number }) {
  const router = useRouter();
  const { lang } = useLanguage();
  const projectTranslations = getPortfolioTranslation(lang).project;

  const allItems = getPortfolioItems(lang);
  const portfolioItem = allItems.find((item) => item.id === id);

  if (!portfolioItem) {
    return null;
  }

  const images = portfolioItem.images ?? [];

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
          <Box sx={{ width: "100%", flex: { md: "0 0 55%" } }}>
            <MediaGallery images={images} title={portfolioItem.title} />
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
