import type { Metadata } from "next";
import { getHomeMeta } from "@/core/static";
import { SITE_URL } from "@/core/seo";

const RootLayout =
  process.env.NEXT_PUBLIC_THEME_EDITOR_ENABLED === "true"
    ? require("./layout.editor").default
    : require("./layout.default").default;

const homeMeta = getHomeMeta();

/*
 * `metadataBase` belongs here — it is what turns the image paths below into absolute URLs.
 *
 * The canonical link and `og:url` do not. Set on the root layout they are inherited by every
 * page that does not state its own, and the detail pages are the only ones that do: with
 * `canonical: "/"` here, sixteen of the forty-six exported pages claimed to be copies of the
 * home page. A canonical pointing at another page is worse than none at all, since it invites
 * a search engine to drop the page. They come back per page once the SEO snapshots own the
 * metadata; until then a missing canonical says nothing, which is the honest state.
 */
export const metadata: Metadata = {
  ...(SITE_URL ? { metadataBase: new URL(SITE_URL) } : {}),
  title: {
    default: homeMeta.name,
    template: `%s | ${homeMeta.name}`,
  },
  description: homeMeta.slogan || undefined,
  openGraph: {
    title: homeMeta.name,
    description: homeMeta.slogan || undefined,
    siteName: homeMeta.name,
    type: "website",
  },
};

export default RootLayout;
