"use client";

import { getAboutItems, getAboutSection, useLanguage } from "@/core/runtime";
import { getAboutTranslation, getButtonTranslation } from "@/core/translations";
import { getPageSlugByKeyWithBasePath } from "@/core/static";
import EstablishedAndClients from "../common/EstablishedAndClients";
import AboutBlock from "./AboutBlock";

/* The about preview on the home page: the section name, and a button on to /o-nas. */
export default function AboutPreviewSection() {
  const { lang } = useLanguage();
  const aboutTranslation = getAboutTranslation(lang);
  const buttonTranslation = getButtonTranslation(lang);
  const aboutSection = getAboutSection(lang);
  const aboutItems = getAboutItems(lang);

  return (
    <>
      <AboutBlock
        title={aboutSection.sectionName || aboutTranslation.title}
        description={aboutSection.text}
        items={aboutItems}
        callToAction={{
          label: buttonTranslation.learnMore,
          href: getPageSlugByKeyWithBasePath("about"),
        }}
      />

      <EstablishedAndClients />
    </>
  );
}
