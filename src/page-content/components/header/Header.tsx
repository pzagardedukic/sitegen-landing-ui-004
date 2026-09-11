"use client";

import { getHome, SupportedLang, useLanguage } from "@/core/runtime";
import LanguageSelector from "@/components/language-selector/LanguageSelector";
import HeaderNavigation from "@/components/navigation/HeaderNavigation";
import { Box } from "@mui/material";
import { getNavigationTranslation } from "@/core/translations";
import {
  getPageSlugByKeyWithBasePath,
  isSectionEnabled,
  withBasePath,
} from "@/core/static";
import LogoImage from "./LogoImage";
import LogoText from "./LogoText";

/*
 * The three columns of the Lumiera header pill (see HeaderLayout): navigation left, logo
 * centre, language right. Each is its own grid item, so this renders a fragment.
 */
export default function Header() {
  const { lang, setLang, languageList } = useLanguage();
  const navTranslation = getNavigationTranslation(lang);
  const home = getHome(lang);

  const navItems = [
    { label: navTranslation.home, href: withBasePath("/") },
    {
      label: navTranslation.about,
      href: getPageSlugByKeyWithBasePath("about"),
    },
    {
      label: navTranslation.more,
      subItems: [
        {
          label: navTranslation.contact,
          href: getPageSlugByKeyWithBasePath("contact"),
        },
        isSectionEnabled("services") && {
          label: navTranslation.services,
          href: getPageSlugByKeyWithBasePath("services"),
        },
        isSectionEnabled("schedule") && {
          label: navTranslation.schedule,
          href: getPageSlugByKeyWithBasePath("schedule"),
        },
        isSectionEnabled("events") && {
          label: navTranslation.events,
          href: getPageSlugByKeyWithBasePath("events"),
        },
        isSectionEnabled("faq") && {
          label: navTranslation.faq,
          href: getPageSlugByKeyWithBasePath("faq"),
        },
        isSectionEnabled("portfolio") && {
          label: navTranslation.portfolio,
          href: getPageSlugByKeyWithBasePath("portfolio"),
        },
        isSectionEnabled("gallery") && {
          label: navTranslation.gallery,
          href: getPageSlugByKeyWithBasePath("gallery"),
        },
        isSectionEnabled("blog") && {
          label: navTranslation.blog,
          href: getPageSlugByKeyWithBasePath("blog"),
        },
        isSectionEnabled("videos") && {
          label: navTranslation.videos,
          href: getPageSlugByKeyWithBasePath("videos"),
        },
        isSectionEnabled("catalogues") && {
          label: navTranslation.catalogues,
          href: getPageSlugByKeyWithBasePath("catalogues"),
        },
        isSectionEnabled("pricing") && {
          label: navTranslation.pricing,
          href: getPageSlugByKeyWithBasePath("pricing"),
        },
        isSectionEnabled("careers") && {
          label: navTranslation.careers,
          href: getPageSlugByKeyWithBasePath("careers"),
        },
      ].filter(Boolean) as { label: string; href: string }[],
    },
  ];

  return (
    <>
      {/* Left: the navigation, folded into the menu button below md */}
      <Box
        sx={{
          justifySelf: "start",
          display: "flex",
          alignItems: "center",
          minWidth: 0,
        }}
      >
        <HeaderNavigation items={navItems} />
      </Box>

      {/* Centre: the logo artwork, or the site name set in the logo face */}
      <Box sx={{ justifySelf: "center", minWidth: 0, maxWidth: "100%" }}>
        {home.logo.image ? (
          <LogoImage imageSrc={home.logo.image} name={home.name} />
        ) : (
          <LogoText name={home.name} />
        )}
      </Box>

      {/* Right: the language pill, only when the site has more than one language */}
      <Box sx={{ justifySelf: "end", display: "flex", alignItems: "center" }}>
        {languageList.length > 1 && (
          <LanguageSelector
            supportedLanguages={languageList}
            defaultLanguage={lang as string}
            onChange={(code) => setLang(code as SupportedLang)}
          />
        )}
      </Box>
    </>
  );
}
