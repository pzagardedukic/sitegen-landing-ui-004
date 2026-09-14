"use client";

import type { SxProps, Theme } from "@mui/material/styles";
import ArrowButton, { type ArrowButtonTone } from "@/components/button/ArrowButton";
import { useLanguage } from "@/core/runtime";
import { getPageSlugByKey, withBasePath } from "@/core/static";
import { getPricingTranslation_packagesNoImages } from "@/core/translations";

type PricingCtaButtonProps = {
  title: string;
  tone?: ArrowButtonTone;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
};

/*
 * The call to action on a price item: the contact page with the item's name already in the
 * subject, so a reader who has picked a package does not have to describe it again.
 */
export default function PricingCtaButton({
  title,
  tone = "outline",
  fullWidth = false,
  sx,
}: PricingCtaButtonProps) {
  const { lang } = useLanguage();
  const packagesTranslation = getPricingTranslation_packagesNoImages(lang);

  const subject = `${packagesTranslation.acquirementSubject}: ${title}`;
  const href = `${withBasePath(`/${getPageSlugByKey("contact")}/`)}?subject=${encodeURIComponent(subject)}`;

  return (
    <ArrowButton component="a" href={href} tone={tone} fullWidth={fullWidth} sx={sx}>
      {packagesTranslation.items.callToAction}
    </ArrowButton>
  );
}
