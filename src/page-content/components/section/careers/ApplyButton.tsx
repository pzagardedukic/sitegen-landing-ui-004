"use client";

import type { SxProps, Theme } from "@mui/material/styles";
import type { ArrowButtonTone } from "@/components/button/ArrowButton";
import { useLanguage } from "@/core/runtime";
import {
  getButtonTranslation,
  getCareersTranslation,
} from "@/core/translations";
import ContactCtaButton from "../common/ContactCtaButton";

type ApplyButtonProps = {
  title: string;
  tone?: ArrowButtonTone;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
};

/* "Apply" on a vacancy: the contact page with the role already in the subject. */
export default function ApplyButton({
  title,
  tone = "outline",
  fullWidth = false,
  sx,
}: ApplyButtonProps) {
  const { lang } = useLanguage();
  const careersTranslation = getCareersTranslation(lang);
  const buttonTranslation = getButtonTranslation(lang);

  return (
    <ContactCtaButton
      subject={`${careersTranslation.applicationSubject}: ${title}`}
      label={buttonTranslation.applyNow}
      tone={tone}
      fullWidth={fullWidth}
      sx={sx}
    />
  );
}
