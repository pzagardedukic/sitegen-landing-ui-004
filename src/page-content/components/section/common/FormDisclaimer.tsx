"use client";

import { useLanguage } from "@/core/runtime";
import { getFormTranslation } from "@/core/translations";
import { Typography, Link } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { getPageSlugByKeyWithBasePath } from "@/core/static";

type FormDisclaimerProps = {
  /** Set where the line sits over a photograph, as it does under the newsletter form. */
  isHighContrast?: boolean;
};

/*
 * The consent line under a form.
 *
 * Over a photograph it is drawn in the theme's on-image colour, not in
 * `secondary.contrastText`: that one is the colour for text *on* the secondary colour, and
 * MUI resolves it against the customer's own palette — with Mirna's rose (#D9A7A0) it comes
 * out black, which on the newsletter photograph was all but unreadable. The fault also came
 * and went with the customer's colours, so a secondary dark enough to flip it to white hid
 * the bug entirely.
 */
export default function FormDisclaimer({
  isHighContrast = false,
}: FormDisclaimerProps) {
  const { lang } = useLanguage();
  const formTranslations = getFormTranslation(lang);
  const legalPageHref = getPageSlugByKeyWithBasePath("legal");

  return (
    <Typography
      color={isHighContrast ? "surfaces.onImage" : "text.primary"}
      variant="body2"
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        lineHeight: 1.3,
      }}
    >
      <InfoOutlinedIcon sx={{ fontSize: 20, mr: 0.6 }} />
      {formTranslations.disclaimerPrefix}&nbsp;
      <Link
        href={legalPageHref}
        color={isHighContrast ? "surfaces.onImage" : "text.primary"}
        underline="always"
        sx={{ fontWeight: 600 }}
      >
        {formTranslations.termsAndConditions}
      </Link>
      &nbsp;{formTranslations.disclaimerJoiner}&nbsp;
      <Link
        href={legalPageHref}
        color={isHighContrast ? "surfaces.onImage" : "text.primary"}
        underline="always"
        sx={{ fontWeight: 600 }}
      >
        {formTranslations.privacyPolicy}
      </Link>
      .
    </Typography>
  );
}
