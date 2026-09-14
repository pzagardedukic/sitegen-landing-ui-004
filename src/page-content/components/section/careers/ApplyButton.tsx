"use client";

import type { SxProps, Theme } from "@mui/material/styles";
import ArrowButton, { type ArrowButtonTone } from "@/components/button/ArrowButton";
import { useLanguage } from "@/core/runtime";
import { getPageSlugByKey, withBasePath } from "@/core/static";
import { getButtonTranslation, getCareersTranslation } from "@/core/translations";

type ApplyButtonProps = {
  title: string;
  tone?: ArrowButtonTone;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
};

/*
 * "Apply" on a vacancy: the contact page with the role already in the subject. A link
 * rather than a router push, so the reader can open it in a new tab like any other link.
 */
export default function ApplyButton({
  title,
  tone = "outline",
  fullWidth = false,
  sx,
}: ApplyButtonProps) {
  const { lang } = useLanguage();
  const careersTranslation = getCareersTranslation(lang);
  const buttonTranslation = getButtonTranslation(lang);

  const subject = `${careersTranslation.applicationSubject}: ${title}`;
  const href = `${withBasePath(`/${getPageSlugByKey("contact")}/`)}?subject=${encodeURIComponent(subject)}`;

  return (
    <ArrowButton component="a" href={href} tone={tone} fullWidth={fullWidth} sx={sx}>
      {buttonTranslation.applyNow}
    </ArrowButton>
  );
}
