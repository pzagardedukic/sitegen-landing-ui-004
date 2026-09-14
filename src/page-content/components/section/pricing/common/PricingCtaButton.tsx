"use client";

import type { SxProps, Theme } from "@mui/material/styles";
import type { ArrowButtonTone } from "@/components/button/ArrowButton";
import { useLanguage } from "@/core/runtime";
import { getPricingTranslation_packagesNoImages } from "@/core/translations";
import ContactCtaButton from "../../common/ContactCtaButton";

type PricingCtaButtonProps = {
  title: string;
  tone?: ArrowButtonTone;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
};

/* The call to action on a price item: the contact page with the item already in the subject. */
export default function PricingCtaButton({
  title,
  tone = "outline",
  fullWidth = false,
  sx,
}: PricingCtaButtonProps) {
  const { lang } = useLanguage();
  const packagesTranslation = getPricingTranslation_packagesNoImages(lang);

  return (
    <ContactCtaButton
      subject={`${packagesTranslation.acquirementSubject}: ${title}`}
      label={packagesTranslation.items.callToAction}
      tone={tone}
      fullWidth={fullWidth}
      sx={sx}
    />
  );
}
