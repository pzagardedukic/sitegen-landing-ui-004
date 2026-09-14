"use client";

import { Box, Typography } from "@mui/material";
import { getMap, useLanguage } from "@/core/runtime";
import { getContactTranslation } from "@/core/translations";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import CustomMap from "./CustomMap";

/*
 * The contact block on the home page: the same details and cream form panel as the contact
 * page — details (520) beside the form (600), stacked below desktop — with the map
 * full-bleed under them.
 */
export default function ContactPreviewSection() {
  const { lang } = useLanguage();
  const contactTranslation = getContactTranslation(lang);
  const map = getMap();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "72px", sm: "96px", md: "120px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          gap: { xs: "44px", md: "80px" },
        }}
      >
        <Box
          sx={{
            flex: { md: "0 0 520px" },
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          <Typography variant="h2" component="h2">
            {contactTranslation.title}
          </Typography>

          <ContactInfo />
        </Box>

        <Box sx={{ flex: { md: 1 }, width: "100%", minWidth: 0 }}>
          <ContactForm />
        </Box>
      </Box>

      {map.enabled && <CustomMap />}
    </Box>
  );
}
