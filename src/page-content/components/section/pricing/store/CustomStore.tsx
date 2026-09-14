"use client";

import { Box, Typography } from "@mui/material";
import { Suspense, useMemo } from "react";
import FilterChips from "@/components/common/FilterChips";
import PaginationControls from "@/components/button/PaginationControls";
import { ChevronDownIcon, SearchIcon } from "@/components/icons/icons";
import { getPricingSection } from "@/core/runtime";
import { getPageSlugByKey, getPricingSlugById, withBasePath } from "@/core/static";
import { useListFilters } from "@/core/react";
import { useLanguage } from "@/core/runtime";
import {
  getButtonTranslation,
  getPriceTranslation,
  getPricingStoreTranslation,
  getPricingTranslation_packagesNoImages,
} from "@/core/translations";
import { normalizeSearchValue, paginate, stripRichText } from "@/core/utils";
import StoreItemCard from "./StoreItemCard";
import { useVisiblePricingItems } from "../common/useVisiblePricingItems";

type StorePrice = {
  value: string;
  discountedValue: string;
  onAgreement: boolean;
};

const PER_PAGE = 9;

const parsePriceValue = (value: string): number | null => {
  let normalizedValue = value.trim().replace(/\s+/g, "");

  if (!normalizedValue) {
    return null;
  }

  normalizedValue = normalizedValue.replace(/[^\d,.-]/g, "");

  const lastCommaIndex = normalizedValue.lastIndexOf(",");
  const lastDotIndex = normalizedValue.lastIndexOf(".");

  if (lastCommaIndex >= 0 && lastDotIndex >= 0) {
    normalizedValue =
      lastCommaIndex > lastDotIndex
        ? normalizedValue.replace(/\./g, "").replace(",", ".")
        : normalizedValue.replace(/,/g, "");
  } else if (lastCommaIndex >= 0) {
    const decimalPlaces = normalizedValue.length - lastCommaIndex - 1;

    normalizedValue =
      decimalPlaces > 0 && decimalPlaces <= 2
        ? normalizedValue.replace(",", ".")
        : normalizedValue.replace(/,/g, "");
  } else if (lastDotIndex >= 0) {
    const dotCount = (normalizedValue.match(/\./g) ?? []).length;
    const decimalPlaces = normalizedValue.length - lastDotIndex - 1;

    if (dotCount > 1 || decimalPlaces === 3) {
      normalizedValue = normalizedValue.replace(/\./g, "");
    }
  }

  const parsedValue = Number(normalizedValue);
  return Number.isFinite(parsedValue) ? parsedValue : null;
};

const getComparablePrice = (price: StorePrice): number | null => {
  if (price.onAgreement) {
    return null;
  }

  return parsePriceValue(price.discountedValue) ?? parsePriceValue(price.value);
};

/*
 * The store from the Lumiera frames: the search field and the sort control on one pill row,
 * the category pills under them, the items three abreast, nine to a page, and the numbered
 * pagination at the foot.
 *
 * Both controls are the theme's own pill rather than a filled MUI field — the frames draw
 * one shape for everything a reader can act on, 56 tall and rounded full.
 */
function CustomStoreInner() {
  const { lang } = useLanguage();

  const pricingSection = getPricingSection(lang);
  const pricingItems = useVisiblePricingItems();
  const categories = pricingSection?.categoryOptions ?? [];
  const pricingStoreTranslation = getPricingStoreTranslation(lang);
  const packagesTranslation = getPricingTranslation_packagesNoImages(lang);
  const buttonTranslation = getButtonTranslation(lang);
  const priceTranslation = getPriceTranslation(lang);

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

  const filteredAndSortedItems = useMemo(() => {
    const normalizedSearchQuery = normalizeSearchValue(searchQuery);

    return pricingItems
      .filter((item) => {
        if (selectedCategoryId && item.categoryId !== selectedCategoryId) {
          return false;
        }

        if (!normalizedSearchQuery) {
          return true;
        }

        const searchableValue = normalizeSearchValue(
          [
            item.title,
            stripRichText(item.text),
            item.category,
            item.price.value,
            item.price.discountedValue,
            item.price.currency,
            item.price.onAgreement ? priceTranslation.onAgreement : "",
            ...item.features.flatMap((feature) => [feature.label, feature.value]),
          ].join(" "),
        );

        return searchableValue.includes(normalizedSearchQuery);
      })
      .sort((firstItem, secondItem) => {
        const firstPrice = getComparablePrice(firstItem.price);
        const secondPrice = getComparablePrice(secondItem.price);

        if (firstPrice === null && secondPrice === null) {
          return firstItem.id - secondItem.id;
        }

        if (firstPrice === null) {
          return 1;
        }

        if (secondPrice === null) {
          return -1;
        }

        const priceDifference = firstPrice - secondPrice;

        if (priceDifference === 0) {
          return firstItem.id - secondItem.id;
        }

        return sortOrder === "ascending" ? priceDifference : -priceDifference;
      });
  }, [pricingItems, searchQuery, selectedCategoryId, sortOrder, priceTranslation]);

  const { pageCount, currentPage, pageItems } = paginate(
    filteredAndSortedItems,
    page,
    PER_PAGE,
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "28px", md: "32px" } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "stretch",
          gap: "12px",
        }}
      >
        <Box
          sx={(theme) => ({
            flex: 1,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            height: 56,
            px: "22px",
            borderRadius: "999px",
            color: theme.palette.text.secondary,
            boxShadow: `inset 0 0 0 1px ${theme.palette.surfaces.border}`,
            transition: theme.transitions.create(["box-shadow"], {
              duration: theme.transitions.duration.short,
            }),
            "&:focus-within": {
              boxShadow: `inset 0 0 0 1px ${theme.palette.text.primary}`,
            },
          })}
        >
          <SearchIcon />

          <Box
            component="input"
            type="search"
            value={searchInput}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchInput(event.target.value)
            }
            placeholder={pricingStoreTranslation.search}
            aria-label={pricingStoreTranslation.search}
            sx={(theme) => ({
              ...theme.typography.body1,
              flex: 1,
              minWidth: 0,
              border: 0,
              outline: "none",
              background: "none",
              color: theme.palette.text.primary,
              "&::placeholder": { color: theme.palette.text.secondary, opacity: 1 },
              "&::-webkit-search-cancel-button": { cursor: "pointer" },
            })}
          />
        </Box>

        <Box sx={{ position: "relative", flexShrink: 0, width: { xs: "100%", sm: 220 } }}>
          <Box
            component="select"
            value={sortOrder}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setSortOrder(event.target.value as "ascending" | "descending")
            }
            aria-label={pricingStoreTranslation.sortByPrice}
            sx={(theme) => ({
              ...theme.typography.subtitle1,
              appearance: "none",
              width: "100%",
              height: 56,
              pl: "22px",
              pr: "46px",
              cursor: "pointer",
              border: 0,
              borderRadius: "999px",
              background: "none",
              color: theme.palette.text.primary,
              boxShadow: `inset 0 0 0 1px ${theme.palette.surfaces.border}`,
              transition: theme.transitions.create(["box-shadow"], {
                duration: theme.transitions.duration.short,
              }),
              "&:hover, &:focus-visible": {
                boxShadow: `inset 0 0 0 1px ${theme.palette.text.primary}`,
              },
            })}
          >
            <option value="ascending">{pricingStoreTranslation.priceAscending}</option>
            <option value="descending">{pricingStoreTranslation.priceDescending}</option>
          </Box>

          <Box
            aria-hidden
            sx={{
              position: "absolute",
              top: "50%",
              right: 22,
              transform: "translateY(-50%)",
              display: "flex",
              pointerEvents: "none",
            }}
          >
            <ChevronDownIcon />
          </Box>
        </Box>
      </Box>

      {categories.length > 0 && (
        <FilterChips
          ariaLabel={pricingStoreTranslation.category}
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

      {pageItems.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gap: "24px",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
            },
            alignItems: "stretch",
          }}
        >
          {pageItems.map((item) => (
            <StoreItemCard
              key={item.id}
              item={item}
              recommendedLabel={packagesTranslation.items.recommended}
              href={withBasePath(
                `/${getPageSlugByKey("pricing")}/${getPricingSlugById(item.id)}`,
              )}
            />
          ))}
        </Box>
      ) : (
        <Typography variant="body1" sx={{ color: "text.secondary", py: "32px" }}>
          {pricingStoreTranslation.noResults}
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

export default function CustomStore() {
  return (
    <Suspense fallback={null}>
      <CustomStoreInner />
    </Suspense>
  );
}
