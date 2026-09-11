"use client";

import { getAboutItems, getAboutSection, useLanguage } from "@/core/runtime";
import { getAboutTranslation } from "@/core/translations";
import EstablishedAndClients from "../common/EstablishedAndClients";
import AboutBlock from "./AboutBlock";

/*
 * The full about section on /o-nas. The page's title band already carries the section
 * name, so this block takes the fixed subtitle, and it has no call to action — it is the
 * page the preview's button leads to.
 */
export default function AboutSection() {
  const { lang } = useLanguage();
  const aboutTranslation = getAboutTranslation(lang);
  const aboutSection = getAboutSection(lang);
  const aboutItems = getAboutItems(lang);

  return (
    <>
      <AboutBlock
        title={aboutTranslation.subtitle}
        description={aboutSection.text}
        items={aboutItems}
      />

      <EstablishedAndClients />
    </>
  );
}
