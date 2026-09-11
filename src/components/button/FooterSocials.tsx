import * as React from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import { getContacts } from "@/core/runtime";

function TikTokIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M21 8.5a6.5 6.5 0 0 1-4-1.36v6.12a6.26 6.26 0 1 1-6.26-6.26c.3 0 .6.03.89.08v3.18a3.11 3.11 0 1 0 2.22 2.98V2h3.19a6.47 6.47 0 0 0 4.96 4.93V8.5z" />
    </SvgIcon>
  );
}

export interface FooterSocialsProps {
  /** Icon size in pixels */
  size?: number;

  /** Link target behavior */
  target?: "_blank" | "_self" | "_parent" | "_top";
}

/*
 * The social row from the footer spec: FACEBOOK, INSTAGRAM, TWITTER (drawn as X, as Lumiera
 * does), LINKEDIN, TIKTOK and WEBSITE from `contactInfo.contact[]`, in the order Figma draws
 * them. Renders nothing when the site has none of them.
 *
 * The icons are 16 across and 20 apart as drawn; each sits in a 28px hit area, so the
 * visible gap is made up of the buttons' own padding plus 8.
 */
export default function FooterSocials({
  size = 16,
  target = "_blank",
}: FooterSocialsProps) {
  const contacts = getContacts();

  const icons = [
    { name: "Facebook", type: "FACEBOOK", icon: <FacebookIcon /> },
    { name: "Instagram", type: "INSTAGRAM", icon: <InstagramIcon /> },
    { name: "X", type: "TWITTER", icon: <XIcon /> },
    { name: "LinkedIn", type: "LINKEDIN", icon: <LinkedInIcon /> },
    { name: "TikTok", type: "TIKTOK", icon: <TikTokIcon /> },
    { name: "Website", type: "WEBSITE", icon: <LanguageIcon /> },
  ]
    .map((item) => ({
      ...item,
      url: contacts.find((contact) => contact.type === item.type)?.value,
    }))
    .filter((item) => !!item.url);

  if (icons.length === 0) return null;

  return (
    <Stack
      direction="row"
      sx={{
        gap: "8px",
        mx: "-6px",
        color: "inherit",
        "& .MuiIconButton-root": { color: "currentColor", p: "6px" },
        "& .MuiSvgIcon-root": { fontSize: size },
        "& .MuiIconButton-root:hover": { opacity: 0.7, backgroundColor: "transparent" },
      }}
    >
      {icons.map(({ name, url, icon }) => (
        <IconButton
          key={name}
          component="a"
          href={url}
          target={target}
          rel="noopener noreferrer"
          aria-label={name}
        >
          {icon}
        </IconButton>
      ))}
    </Stack>
  );
}
