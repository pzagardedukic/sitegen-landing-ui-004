"use client";

import { Box, Typography } from "@mui/material";
import { Suspense, useMemo } from "react";
import Carousel from "@/components/carousel/Carousel";
import FilterChips from "@/components/common/FilterChips";
import ListToolbar from "@/components/common/ListToolbar";
import PaginationControls from "@/components/button/PaginationControls";
import { getEventItems, getEventsSection, useLanguage } from "@/core/runtime";
import { useListFilters } from "@/core/react";
import { getEventSlugById, getPageSlugByKey, withBasePath } from "@/core/static";
import { getButtonTranslation, getEventsTranslation } from "@/core/translations";
import {
  formatEventDate,
  getEventDateTimestamp,
  normalizeSearchValue,
  paginate,
  stripRichText,
} from "@/core/utils";
import EventPreviewCard from "./EventPreviewCard";

const PER_PAGE = 6;

/*
 * The events page from the Lumiera frames: the intro, the search and sort pills, the
 * category chips, then the events three abreast on desktop and as a carousel below that —
 * two cards wide on tablet, one on a phone — with the page numbers underneath.
 */
function EventsSectionInner() {
  const { lang } = useLanguage();

  const eventsSection = getEventsSection(lang);
  const eventItems = getEventItems(lang);
  const eventsTranslation = getEventsTranslation(lang);
  const buttonTranslation = getButtonTranslation(lang);

  const {
    searchInput,
    setSearchInput,
    searchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    sortOrder,
    setSortOrder,
    page,
    setPage,
  } = useListFilters();

  const filteredAndSortedEvents = useMemo(() => {
    const normalizedSearchQuery = normalizeSearchValue(searchQuery);

    return eventItems
      .filter((event) => {
        if (selectedCategoryId && event.categoryId !== selectedCategoryId) {
          return false;
        }

        if (!normalizedSearchQuery) {
          return true;
        }

        const searchableValue = normalizeSearchValue(
          [
            event.title,
            stripRichText(event.text),
            event.location,
            event.category,
            event.date,
            formatEventDate(event.date, lang),
          ].join(" "),
        );

        return searchableValue.includes(normalizedSearchQuery);
      })
      .sort((firstEvent, secondEvent) => {
        const firstTimestamp = getEventDateTimestamp(firstEvent.date);
        const secondTimestamp = getEventDateTimestamp(secondEvent.date);

        if (firstTimestamp === null && secondTimestamp === null) {
          return firstEvent.id - secondEvent.id;
        }

        if (firstTimestamp === null) {
          return 1;
        }

        if (secondTimestamp === null) {
          return -1;
        }

        const dateDifference = firstTimestamp - secondTimestamp;

        if (dateDifference === 0) {
          return firstEvent.id - secondEvent.id;
        }

        return sortOrder === "ascending" ? dateDifference : -dateDifference;
      });
  }, [eventItems, searchQuery, selectedCategoryId, sortOrder, lang]);

  const { pageCount, currentPage, pageItems } = paginate(
    filteredAndSortedEvents,
    page,
    PER_PAGE,
  );

  if (!eventsSection) {
    return null;
  }

  const categories = eventsSection.categories;
  const showApplyButton = Boolean(eventsSection.showApplyButton);

  const cards = pageItems.map((event) => (
    <EventPreviewCard
      key={event.id}
      item={event}
      showApplyButton={showApplyButton}
      href={withBasePath(`/${getPageSlugByKey("events")}/${getEventSlugById(event.id)}`)}
    />
  ));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "32px", md: "40px" } }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "600fr 80fr 520fr" },
          alignItems: "start",
          gap: { xs: "18px", md: 0 },
        }}
      >
        <Typography variant="h2" component="h2" sx={{ gridColumn: { md: "1" } }}>
          {eventsTranslation.title}
        </Typography>

        {eventsSection.text && (
          <Typography variant="body1" sx={{ gridColumn: { md: "3" } }}>
            {eventsSection.text}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <ListToolbar
          searchValue={searchInput}
          onSearchChange={setSearchInput}
          searchLabel={eventsTranslation.search}
          sortValue={sortOrder}
          onSortChange={(value) =>
            setSortOrder(value as "ascending" | "descending")
          }
          sortLabel={eventsTranslation.sortByDate}
          sortOptions={[
            { value: "ascending", label: eventsTranslation.dateAscending },
            { value: "descending", label: eventsTranslation.dateDescending },
          ]}
          sortWidth={257}
        />

        {categories.length > 0 && (
          <FilterChips
            ariaLabel={eventsTranslation.category}
            options={[
              { value: "", label: buttonTranslation.all },
              ...categories.map((category) => ({
                value: category.id,
                label: category.name,
              })),
            ]}
            value={selectedCategoryId}
            onChange={setSelectedCategoryId}
          />
        )}
      </Box>

      {cards.length > 0 ? (
        <>
          <Box
            sx={{
              display: { xs: "none", md: "grid" },
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "24px",
              alignItems: "stretch",
            }}
          >
            {cards}
          </Box>

          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <Carousel
              items={cards}
              slideWidth={{ xs: "100%", sm: "calc(50% - 10px)" }}
              gap={20}
              controlsGap={{ xs: 24 }}
              ariaLabel={eventsTranslation.title}
            />
          </Box>
        </>
      ) : (
        <Typography variant="body1" sx={{ color: "text.secondary", py: "32px" }}>
          {eventsTranslation.noResults}
        </Typography>
      )}

      {pageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
          <PaginationControls
            page={currentPage}
            pageCount={pageCount}
            onChange={setPage}
          />
        </Box>
      )}
    </Box>
  );
}

export default function EventsSection() {
  return (
    <Suspense fallback={null}>
      <EventsSectionInner />
    </Suspense>
  );
}
