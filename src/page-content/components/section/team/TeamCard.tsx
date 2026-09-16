"use client";

import { type JSX } from "react";
import { Box, Typography } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LanguageIcon from "@mui/icons-material/Language";
import { TikTokIcon } from "@/components/button/FooterSocials";
import { ContactType } from "@/core/runtime";

export interface ContactItem {
  type: ContactType;
  value: string;
}

export interface TeamCardProps {
  name: string;
  text: string;
  image: string;
  contact?: ContactItem[];
}

const iconMap: Record<ContactType, JSX.Element> = {
  EMAIL: <AlternateEmailIcon />,
  PHONE: <PhoneOutlinedIcon />,
  LINKEDIN: <LinkedInIcon />,
  INSTAGRAM: <InstagramIcon />,
  FACEBOOK: <FacebookIcon />,
  TWITTER: <XIcon />,
  WEBSITE: <LanguageIcon />,
  TIKTOK: <TikTokIcon />,
};

const hrefFor = (item: ContactItem) => {
  if (item.type === "EMAIL") return `mailto:${item.value}`;
  if (item.type === "PHONE") return `tel:${item.value.replace(/\s+/g, "")}`;
  return item.value;
};

/*
 * A team member from the Lumiera frames: the portrait on the mint wash, rounded 12 and
 * 340 / 380 / 400 tall, then the name (h6) and the line about the person in the muted text
 * colour, centred, 18 / 16 under the photograph.
 *
 * The contacts sit on the photograph's bottom-right corner, 12 in, as a white pill of mint
 * icon buttons stacked upwards — always shown, never folded behind a button.
 *
 * They used to open on hover, on a tap of an arrow button, or from the keyboard. On a phone
 * that cost the visitor a tap for nothing: the first tap only stood in for the hover the
 * device cannot do, and it landed on the very spot the contacts were about to occupy, so a
 * tap meant to reach a contact opened the pill instead and appeared to do nothing at all.
 * Every contact is one tap now, and what the card offers is visible without probing it.
 */
export default function TeamCard({
  name,
  text,
  image,
  contact = [],
}: TeamCardProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "16px", md: "18px" },
      }}
    >
      <Box
        sx={(theme) => ({
          position: "relative",
          height: { xs: 400, sm: 380, md: 340 },
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: theme.palette.surfaces.mint,
        })}
      >
        <Box
          component="img"
          src={image}
          alt=""
          loading="lazy"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {contact.length > 0 && (
          <Box
            role="list"
            sx={(theme) => ({
              position: "absolute",
              right: 12,
              bottom: 12,
              display: "flex",
              flexDirection: "column",
              gap: { xs: "6px", md: "8px" },
              p: { xs: "5px", md: "6px" },
              borderRadius: "999px",
              backgroundColor: theme.palette.background.paper,
            })}
          >
            {contact.map((item) => (
              <Box
                key={`${item.type}-${item.value}`}
                role="listitem"
                component="a"
                href={hrefFor(item)}
                target={
                  item.type === "EMAIL" || item.type === "PHONE"
                    ? undefined
                    : "_blank"
                }
                rel="noopener noreferrer"
                aria-label={`${item.type}: ${name}`}
                sx={(theme) => ({
                  width: { xs: 30, md: 32 },
                  height: { xs: 30, md: 32 },
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  backgroundColor: theme.palette.surfaces.mint,
                  color: theme.palette.text.primary,
                  "& .MuiSvgIcon-root": { fontSize: 15 },
                  transition: theme.transitions.create(
                    ["background-color", "color"],
                    {
                      duration: theme.transitions.duration.short,
                    },
                  ),
                  "&:hover, &:focus-visible": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  },
                })}
              >
                {iconMap[item.type]}
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" component="h3">
          {name}
        </Typography>

        {text && (
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {text}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
