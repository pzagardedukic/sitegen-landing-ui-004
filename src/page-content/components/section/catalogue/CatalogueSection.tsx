"use client";

import { Box, Typography } from "@mui/material";
import { DocumentIcon, DownloadIcon } from "@/components/icons/icons";
import { getCatalogueSection } from "@/core/runtime";

/* The file as it is named on disk — what the frame puts on the pill. */
function fileName(path: string): string {
  return path.split("/").pop() || path;
}

/*
 * Catalogues as the Lumiera frames draw them: the page title, then one row per file on
 * hairlines — the document mark in a rose circle (48 / 44) and the file's display name in
 * the h5 face on the left, the file itself on a pill with the download arrow on the right.
 *
 * On a phone the row stacks and the pill runs the full width. The size in the data is not
 * drawn, as the spec says.
 */
export default function CatalogueSection() {
  const catalogueSection = getCatalogueSection();

  if (!catalogueSection || catalogueSection.items.length === 0) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "32px", md: "40px" } }}>
      <Box
        sx={(theme) => ({
          borderTop: `1px solid ${theme.palette.surfaces.border}`,
        })}
      >
        {catalogueSection.items.map((item, index) => (
          <Box
            key={index}
            sx={(theme) => ({
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: { xs: "14px", sm: "24px" },
              py: { xs: "20px", sm: "22px" },
              borderBottom: `1px solid ${theme.palette.surfaces.border}`,
            })}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                gap: { xs: "14px", sm: "18px" },
                minWidth: 0,
              }}
            >
              <Box
                aria-hidden
                sx={(theme) => ({
                  flexShrink: 0,
                  width: { xs: 44, sm: 48 },
                  height: { xs: 44, sm: 48 },
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
                {item.name}
              </Typography>
            </Box>

            <Box
              component="a"
              href={item.file}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.name} — ${fileName(item.file)}`}
              sx={(theme) => ({
                ...theme.typography.subtitle1,
                flexShrink: 0,
                width: { xs: "100%", sm: "auto" },
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                px: "20px",
                py: "12px",
                borderRadius: "999px",
                color: theme.palette.text.primary,
                textDecoration: "none",
                boxShadow: `inset 0 0 0 1px ${theme.palette.surfaces.border}`,
                transition: theme.transitions.create(["box-shadow", "background-color"], {
                  duration: theme.transitions.duration.short,
                }),
                "&:hover, &:focus-visible": {
                  boxShadow: `inset 0 0 0 1px ${theme.palette.text.primary}`,
                  backgroundColor: theme.palette.surfaces.bgAlt,
                },
              })}
            >
              <Box component="span" sx={{ wordBreak: "break-all" }}>
                {fileName(item.file)}
              </Box>
              <DownloadIcon />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
