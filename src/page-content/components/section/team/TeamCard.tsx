"use client";

import { useRef, useState, type JSX } from "react";
import { Box, Typography } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LanguageIcon from "@mui/icons-material/Language";
import CircleButton from "@/components/button/CircleButton";
import { TikTokIcon } from "@/components/button/FooterSocials";
import { ArrowOutwardIcon } from "@/components/icons/icons";
import { ContactType, useLanguage } from "@/core/runtime";

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
 * The contacts sit on the photograph's bottom-right corner, 12 in. Folded, they are a white
 * 40px button with an arrow; open, a white pill of mint icon buttons stacked upwards. The
 * card opens on hover, on a tap of the button, or from the keyboard — the button moves focus
 * to the first contact — and folds again when the pointer or the focus leaves it.
 */
export default function TeamCard({ name, text, image, contact = [] }: TeamCardProps) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const firstLink = useRef<HTMLAnchorElement | null>(null);
  const hasContact = contact.length > 0;

  const openFromButton = () => {
    setOpen(true);
    requestAnimationFrame(() => firstLink.current?.focus());
  };

  return (
    <Box
      onMouseEnter={() => hasContact && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event: React.FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
      sx={{ display: "flex", flexDirection: "column", gap: { xs: "16px", md: "18px" } }}
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

        {hasContact && (
          <Box sx={{ position: "absolute", right: 12, bottom: 12 }}>
            <CircleButton
              tone="white"
              size={40}
              onClick={openFromButton}
              aria-label={`${lang === "SL" ? "Kontakt" : "Contact"}: ${name}`}
              aria-expanded={open}
              sx={{ display: open ? "none" : "inline-flex" }}
            >
              <ArrowOutwardIcon />
            </CircleButton>

            <Box
              role="list"
              sx={(theme) => ({
                display: open ? "flex" : "none",
                flexDirection: "column",
                gap: { xs: "6px", md: "8px" },
                p: { xs: "5px", md: "6px" },
                borderRadius: "999px",
                backgroundColor: theme.palette.background.paper,
              })}
            >
              {contact.map((item, index) => (
                <Box
                  key={`${item.type}-${item.value}`}
                  role="listitem"
                  component="a"
                  ref={index === 0 ? firstLink : undefined}
                  href={hrefFor(item)}
                  target={item.type === "EMAIL" || item.type === "PHONE" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={item.type}
                  sx={(theme) => ({
                    width: { xs: 30, md: 32 },
                    height: { xs: 30, md: 32 },
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: theme.palette.surfaces.mint,
                    color: theme.palette.text.primary,
                    "& .MuiSvgIcon-root": { fontSize: 15 },
                    transition: theme.transitions.create(["background-color", "color"], {
                      duration: theme.transitions.duration.short,
                    }),
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
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", textAlign: "center" }}>
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
