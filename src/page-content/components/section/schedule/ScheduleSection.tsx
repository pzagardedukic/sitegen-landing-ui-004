"use client";

import { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import FilterChips from "@/components/common/FilterChips";
import { getScheduleSection, getScheduleTables, useLanguage } from "@/core/runtime";
import { getButtonTranslation } from "@/core/translations";
import ScheduleTableView from "./ScheduleTableView";

/*
 * The timetable page from the Lumiera frames: the title on the left half of the grid with
 * the section's text beside it, the category pills under them, and the tables 44 below,
 * 56 apart. The pills are hidden where a customer has no categories.
 */
export default function ScheduleSection() {
  const { lang } = useLanguage();
  const scheduleSection = getScheduleSection(lang);
  const scheduleTables = getScheduleTables(lang);
  const allLabel = getButtonTranslation(lang).all;

  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const categories = scheduleSection?.categories ?? [];

  const tables = useMemo(
    () =>
      selectedCategoryId
        ? scheduleTables.filter((table) => table.categoryId === selectedCategoryId)
        : scheduleTables,
    [scheduleTables, selectedCategoryId],
  );

  if (!scheduleSection) {
    return null;
  }

  /* The table carries only the category's id; its name lives on the section. */
  const categoryNameById = (categoryId: string | null) =>
    categories.find((category) => category.id === categoryId)?.name ?? "";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "36px", md: "44px" } }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "600fr 80fr 520fr" },
          alignItems: "start",
          gap: { xs: "18px", md: 0 },
        }}
      >
        <Typography variant="h2" component="h2" sx={{ gridColumn: { md: "1" } }}>
          {scheduleSection.title}
        </Typography>

        {scheduleSection.text && (
          <Typography variant="body1" sx={{ gridColumn: { md: "3" } }}>
            {scheduleSection.text}
          </Typography>
        )}
      </Box>

      {categories.length > 0 && (
        <FilterChips
          ariaLabel={allLabel}
          options={[
            { value: "", label: allLabel },
            ...categories.map((category) => ({
              value: category.id,
              label: category.name,
            })),
          ]}
          value={selectedCategoryId}
          onChange={setSelectedCategoryId}
        />
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "40px", md: "56px" } }}>
        {tables.map((table) => (
          <ScheduleTableView
            key={table.id}
            title={table.title}
            text={table.text}
            categoryLabel={categoryNameById(table.categoryId)}
            rows={table.rows}
          />
        ))}
      </Box>
    </Box>
  );
}
