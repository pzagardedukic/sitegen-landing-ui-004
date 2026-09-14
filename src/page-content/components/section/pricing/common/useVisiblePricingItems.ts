"use client";

import { getPricingItems, useLanguage } from "@/core/runtime";

/*
 * The items a visitor may see. A DISABLED item is one the business has taken off the offer,
 * so the spec removes it from every list rather than showing it as unavailable.
 */
export function useVisiblePricingItems() {
  const { lang } = useLanguage();

  return getPricingItems(lang).filter((item) => item.status !== "DISABLED");
}
