"use client";

import { Box, Typography } from "@mui/material";
import { PriceUnitType } from "@/core/types";
import { useLanguage } from "@/core/runtime";
import {
  getPriceTranslation,
  getPricingUnitTranslation,
} from "@/core/translations";

type PriceValueProps = {
  value: string;
  currency: string;
  unit?: PriceUnitType;
  onAgreement: boolean;
  discountedValue: string;
  /** Large is the block on a row, a package and the detail; small sits on a store card. */
  size?: "large" | "small";
};

/*
 * The price as Lumiera sets it: the amount in the heading face — 42 on desktop, 28 on a
 * phone and on a store card — the currency in the button face beside it and the unit in the
 * muted caption after it.
 *
 * A discounted item shows the amount that is actually charged in the big face and the
 * original struck through behind it, so the two can never be read the wrong way round.
 */
export default function PriceValue({
  value,
  currency,
  unit,
  onAgreement,
  discountedValue,
  size = "large",
}: PriceValueProps) {
  const { lang } = useLanguage();
  const priceTranslation = getPriceTranslation(lang);
  const unitLabel = getPricingUnitTranslation(unit, lang);
  const chargedValue = discountedValue || value;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "baseline",
        flexWrap: "wrap",
        columnGap: "6px",
        rowGap: "2px",
      }}
    >
      {onAgreement ? (
        <Typography
          component="span"
          sx={(theme) => ({
            fontFamily: theme.typography.h2.fontFamily,
            fontSize: size === "large" ? { xs: 22, md: 26 } : 20,
            lineHeight: 1.25,
          })}
        >
          {priceTranslation.onAgreement}
        </Typography>
      ) : (
        <>
          <Typography
            component="span"
            sx={(theme) => ({
              fontFamily: theme.typography.h2.fontFamily,
              fontSize: size === "large" ? { xs: 28, md: 42 } : 28,
              lineHeight: 1.15,
            })}
          >
            {chargedValue}
          </Typography>

          <Typography component="span" variant="subtitle1">
            {currency}
          </Typography>

          {unitLabel && (
            <Typography
              component="span"
              variant="caption"
              sx={{ color: "text.secondary" }}
            >
              / {unitLabel}
            </Typography>
          )}

          {discountedValue && (
            <Typography
              component="span"
              variant="caption"
              sx={{ color: "text.secondary", textDecoration: "line-through" }}
            >
              {value} {currency}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}
