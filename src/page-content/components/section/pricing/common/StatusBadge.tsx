"use client";

import Tag from "@/components/common/Tag";
import { PricingItemStatus } from "@/core/types";
import { useLanguage } from "@/core/runtime";
import { getPriceTranslation } from "@/core/translations";

type StatusBadgeProps = {
  status?: PricingItemStatus;
};

/*
 * Only the states with something to say carry a badge, in the colours the frames give them:
 * "coming soon" on the rose wash, "unavailable" on the cream one.
 *
 * AVAILABLE is the ordinary case — and the core package ships no string for it — so it is
 * left unmarked; DISABLED items never reach a list at all, as the spec drops them.
 */
export default function StatusBadge({ status }: StatusBadgeProps) {
  const { lang } = useLanguage();
  const priceTranslation = getPriceTranslation(lang);

  if (status === "COMING_SOON") {
    return <Tag label={priceTranslation.comingSoon} tone="rose" />;
  }

  if (status === "UNAVAILABLE") {
    return <Tag label={priceTranslation.unavailable} tone="soft" />;
  }

  return null;
}
