"use client";

import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { ClockIcon, LocationIcon, MailIcon, PhoneIcon } from "@/components/icons/icons";
import { getCompany, getContacts, getMap, getWorkingHours, useLanguage } from "@/core/runtime";
import { getContactTranslation } from "@/core/translations";
import ContactInfoCard from "./ContactInfoCard";
import WorkingHours from "./WorkingHours";

/*
 * The contact details from the Lumiera frames: two columns 32 apart with 36 between the
 * rows — location and phone first, then e-mail and the opening hours — and one column on a
 * phone. Each detail carries its mark in a rose circle (see ContactInfoCard).
 */
export default function ContactInfo() {
  const { lang } = useLanguage();
  const contactTranslation = getContactTranslation(lang);

  const company = getCompany();
  const map = getMap();
  const contacts = getContacts();
  const workingHours = getWorkingHours();

  const email = contacts.find((c) => c.type === "EMAIL")?.value || "";
  const phone = contacts.find((c) => c.type === "PHONE")?.value || "";

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
        columnGap: "32px",
        rowGap: "36px",
        alignItems: "start",
      }}
    >
      <ContactInfoCard
        label={contactTranslation.contactInfo.address.title}
        icon={<LocationIcon />}
      >
        <Typography variant="body1">{company.address}</Typography>
        <Typography variant="body1">
          {company.postalCode} {company.postalOffice}
        </Typography>

        {map.url && (
          <Link
            href={map.url}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            variant="body1"
            sx={{ color: "primary.main", mt: "4px" }}
          >
            {contactTranslation.contactInfo.address.callToAction}
          </Link>
        )}
      </ContactInfoCard>

      {phone && (
        <ContactInfoCard label={contactTranslation.contactInfo.phone.title} icon={<PhoneIcon />}>
          <Typography
            component={Link}
            href={`tel:${phone.replace(/\s+/g, "")}`}
            underline="hover"
            variant="body1"
            color="inherit"
          >
            {phone}
          </Typography>
        </ContactInfoCard>
      )}

      {email && (
        <ContactInfoCard label={contactTranslation.contactInfo.email.title} icon={<MailIcon />}>
          <Typography
            component={Link}
            href={`mailto:${email}`}
            underline="hover"
            variant="body1"
            color="inherit"
            sx={{ wordBreak: "break-word" }}
          >
            {email}
          </Typography>
        </ContactInfoCard>
      )}

      {workingHours.enabled && (
        <ContactInfoCard label={contactTranslation.workingHours.title} icon={<ClockIcon />}>
          <WorkingHours />
        </ContactInfoCard>
      )}
    </Box>
  );
}
