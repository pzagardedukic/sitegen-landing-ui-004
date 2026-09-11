"use client";

import { Box } from "@mui/material";
import Carousel from "@/components/carousel/Carousel";
import { getServiceItems, useLanguage } from "@/core/runtime";
import ServiceCard from "./ServiceCard";

type ServicesProps = {
  maxCnt?: number;
  /** Where each card's open button leads (the services page, from the preview). */
  href?: string;
};

/*
 * The service cards: three abreast on desktop, 24 apart, wrapping onto further rows; a
 * carousel two cards wide on tablet and one wide on a phone. Row and carousel are switched
 * in CSS, so the static page carries no layout jump.
 */
export default function Services({ maxCnt, href }: ServicesProps) {
  const { lang } = useLanguage();
  const serviceItems = getServiceItems(lang).slice(0, maxCnt || undefined);

  if (serviceItems.length === 0) return null;

  const cards = serviceItems.map((service, index) => (
    <ServiceCard key={index} index={index} href={href} {...service} />
  ));

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "grid" },
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }}
      >
        {cards}
      </Box>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Carousel
          items={cards}
          slideWidth={{ xs: "100%", sm: "calc(50% - 12px)" }}
          gap={24}
          controlsGap={{ xs: 24 }}
        />
      </Box>
    </>
  );
}
