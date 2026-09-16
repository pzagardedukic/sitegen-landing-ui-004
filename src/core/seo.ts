import { createSeoRuntime } from "@ptlabTadej/sitegen-landing-core/seo";
import fullWebsiteJson from "../../website.json" with { type: "json" };
import { imgWithBasePath, primaryLanguage } from "./static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

/*
 * Social images are handed to Next as a path and resolved against `metadataBase`, which is
 * this same site URL — base path included. `imgWithBasePath` puts the base path on too, so
 * with both in play the export came out with it twice over
 * (…/sitegen-landing-ui-004/sitegen-landing-ui-004/images/…) on every page that carries an
 * image of its own. Where there is a site URL the base is supplied by `metadataBase`, so the
 * path is left bare; where there is none — a customer with no domain yet — nothing resolves
 * it and the path has to carry the base itself.
 *
 * Absolute URLs pass through untouched either way.
 */
const seoImagePath = siteUrl ? (path?: string | null) => path ?? "" : imgWithBasePath;

const seoRuntime = createSeoRuntime({
  website: fullWebsiteJson,
  primaryLanguage,
  imgWithBasePath: seoImagePath,
  siteUrl,
});

export const {
  SITE_URL,
  buildItemMetadata,
  getSeoPricingItem,
  getSeoBlogItem,
  getSeoPortfolioItem,
  getSeoEventItem,
  getSeoCareerItem,
  getSeoOrganization,
} = seoRuntime;
