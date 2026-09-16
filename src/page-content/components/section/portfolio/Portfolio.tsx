"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import ArrowButton from "@/components/button/ArrowButton";
import PaginationControls from "@/components/button/PaginationControls";
import Carousel from "@/components/carousel/Carousel";
import {
  getPortfolioItems,
  getPortfolioSection,
  useLanguage,
} from "@/core/runtime";
import { usePagination } from "@/core/react";
import { getButtonTranslation } from "@/core/translations";
import {
  getPageSlugByKey,
  getPortfolioSlugById,
  withBasePath,
} from "@/core/static";
import CategorySelector from "../common/CategorySelector";
import PortfolioPreviewCard from "./PortfolioPreviewCard";

type PortfolioProps = {
  /** Show at most this many, without pagination — the home-page preview. */
  maxCnt?: number;
  callToAction?: {
    label: string;
    href: string;
  };
};

/*
 * The project list from the Lumiera frames:
 *   - the category pills (left out when there are no categories);
 *   - the cards three abreast on desktop, 24 apart, each only as tall as its own content;
 *     a carousel two cards wide on tablet and one wide on a phone;
 *   - the closing row: the call to action on the left and the pagination on the right on
 *     desktop, stacked with the pagination first below it — the button full width on a
 *     phone.
 * Six to a page on /projekti; the carousel starts over whenever the filter or the page
 * changes.
 */
export default function Portfolio({ maxCnt, callToAction }: PortfolioProps) {
  const { lang } = useLanguage();
  const buttonTranslation = getButtonTranslation(lang);

  const portfolioSection = getPortfolioSection(lang);
  const portfolioItems = getPortfolioItems(lang);
  const categories = portfolioSection?.categories ?? [];

  // Selected category index, 0 = "All".
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectedCategory =
    selectedIndex === 0 ? undefined : categories[selectedIndex - 1];
  const filteredItems = selectedCategory
    ? portfolioItems.filter((item) => item.category.includes(selectedCategory))
    : portfolioItems;

  const { page, setPage, pageCount, paginatedItems, resetPage } = usePagination(
    filteredItems,
    6,
  );
  const displayedItems = maxCnt
    ? filteredItems.slice(0, maxCnt)
    : paginatedItems;
  const showPagination = !maxCnt && pageCount > 1;

  const cards = displayedItems.map((item) => (
    <PortfolioPreviewCard
      key={item.id}
      title={item.title}
      text={item.text}
      image={item.images[0]}
      category={item.category}
      openLabel={buttonTranslation.learnMore}
      href={withBasePath(
        `/${getPageSlugByKey("portfolio")}/${getPortfolioSlugById(item.id)}`,
      )}
    />
  ));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "36px", md: "44px" },
      }}
    >
      {categories.length > 0 && (
        <CategorySelector
          categories={categories}
          selectedIndex={selectedIndex}
          onSelectIndex={(index) => {
            setSelectedIndex(index);
            resetPage();
          }}
        />
      )}

      <Box
        sx={{
          display: { xs: "none", md: "grid" },
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {cards}
      </Box>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Carousel
          key={`${selectedIndex}-${page}`}
          items={cards}
          slideWidth={{ xs: "100%", sm: "calc(50% - 12px)" }}
          gap={24}
          controlsGap={{ xs: 24 }}
        />
      </Box>

      {(callToAction || showPagination) && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            alignItems: { xs: "stretch", sm: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: { xs: "24px", md: "32px" },
          }}
        >
          {callToAction ? (
            <ArrowButton
              component="a"
              href={callToAction.href}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              {callToAction.label}
            </ArrowButton>
          ) : (
            <Box />
          )}

          {showPagination && (
            <PaginationControls
              page={page}
              pageCount={pageCount}
              onChange={setPage}
            />
          )}
        </Box>
      )}
    </Box>
  );
}
