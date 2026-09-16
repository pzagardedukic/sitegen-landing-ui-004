import { createSeoRuntime } from "@ptlabTadej/sitegen-landing-core/seo";
import fullWebsiteJson from "../../website.json" with { type: "json" };
import { imgWithBasePath, primaryLanguage } from "./static";

/*
 * Nothing in the pages reads this any more: the SEO snapshots own page metadata, and the
 * seed in `snapshot-model` builds its own absolute URLs. Kept as it is — and as ui-001 keeps
 * it — so the themes stay comparable, but treat it as unused rather than as a second source
 * of truth for titles, descriptions or images.
 */
const seoRuntime = createSeoRuntime({
  website: fullWebsiteJson,
  primaryLanguage,
  imgWithBasePath,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
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
