"use client";

import type { SxProps, Theme } from "@mui/material/styles";
import ArrowButton, {
  type ArrowButtonTone,
} from "@/components/button/ArrowButton";
import { getPageSlugByKey, withBasePath } from "@/core/static";

type ContactCtaButtonProps = {
  /** Prefilled subject of the contact form, e.g. "Prijava na dogodek: Večer aromaterapije". */
  subject: string;
  label: string;
  tone?: ArrowButtonTone;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
};

/*
 * The button that sends a reader to the contact page with the subject already filled in.
 * Packages, vacancies and events all offer the same thing, so they share one button rather
 * than three copies of the same link.
 *
 * A link, not a router push: it can be opened in a new tab like any other link.
 */
export default function ContactCtaButton({
  subject,
  label,
  tone = "outline",
  fullWidth = false,
  sx,
}: ContactCtaButtonProps) {
  const href = `${withBasePath(`/${getPageSlugByKey("contact")}/`)}?subject=${encodeURIComponent(subject)}`;

  return (
    <ArrowButton
      component="a"
      href={href}
      tone={tone}
      fullWidth={fullWidth}
      sx={sx}
    >
      {label}
    </ArrowButton>
  );
}
