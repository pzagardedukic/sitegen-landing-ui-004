"use client";

import { Box, Typography } from "@mui/material";
import { ArrowOutwardIcon, DocumentIcon } from "@/components/icons/icons";
import { getLegalSection, useLanguage } from "@/core/runtime";
import { getLegalTranslation } from "@/core/translations";

type LegalDocument = {
  key: "termsOfService" | "privacyPolicy";
  title: string;
  file: string;
};

/*
 * The legal page from the Lumiera frames: the title, then one cream card per document,
 * side by side on desktop and stacked below it — the document mark in a rose circle, the
 * document's name in the heading face, and "open document" with the outward arrow.
 *
 * Each card is the link, and each document is drawn only where the customer supplied one:
 * the file is per language, so a site may well have terms in one language and not another.
 */
export default function LegalSection() {
  const { lang } = useLanguage();
  const legalSection = getLegalSection(lang);
  const legalTranslation = getLegalTranslation(lang);

  const documents: LegalDocument[] = [];

  if (legalSection?.termsOfService) {
    documents.push({
      key: "termsOfService",
      title: legalTranslation.termsOfService,
      file: legalSection.termsOfService,
    });
  }

  if (legalSection?.privacyPolicy) {
    documents.push({
      key: "privacyPolicy",
      title: legalTranslation.privacyPolicy,
      file: legalSection.privacyPolicy,
    });
  }

  if (documents.length === 0) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "32px", md: "48px" } }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          gap: { xs: "20px", md: "24px" },
          alignItems: "stretch",
        }}
      >
        {documents.map((legalDocument) => (
          <Box
            key={legalDocument.key}
            component="a"
            href={legalDocument.file}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${legalDocument.title}: ${legalTranslation.openDocument}`}
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              gap: { xs: "16px", md: "18px" },
              p: { xs: "24px", md: "32px" },
              borderRadius: "16px",
              textDecoration: "none",
              color: "inherit",
              backgroundColor: theme.palette.surfaces.surface,
              boxShadow: "inset 0 0 0 1px transparent",
              transition: theme.transitions.create(["box-shadow"], {
                duration: theme.transitions.duration.short,
              }),
              "&:hover, &:focus-visible": {
                boxShadow: `inset 0 0 0 1px ${theme.palette.text.primary}`,
              },
              "&:hover .legal-open, &:focus-visible .legal-open": {
                color: theme.palette.primary.main,
              },
            })}
          >
            <Box
              aria-hidden
              sx={(theme) => ({
                width: { xs: 44, md: 48 },
                height: { xs: 44, md: 48 },
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                backgroundColor: theme.palette.surfaces.rose,
                color: theme.palette.text.primary,
              })}
            >
              <DocumentIcon />
            </Box>

            <Typography variant="h5" component="h3">
              {legalDocument.title}
            </Typography>

            <Box
              className="legal-open"
              sx={(theme) => ({
                ...theme.typography.subtitle1,
                mt: "auto",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: theme.palette.text.primary,
                transition: theme.transitions.create(["color"], {
                  duration: theme.transitions.duration.short,
                }),
              })}
            >
              {legalTranslation.openDocument}
              <ArrowOutwardIcon />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
