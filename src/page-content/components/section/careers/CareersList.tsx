"use client";

import { Box } from "@mui/material";
import type { Career } from "@/core/runtime";
import { useLanguage } from "@/core/runtime";
import {
  getCareerSlugById,
  getPageSlugByKey,
  withBasePath,
} from "@/core/static";
import { getCareersTranslation } from "@/core/translations";
import CareerPreviewCard from "./CareerPreviewCard";

type CareersListProps = {
  careers: Career[];
};

/* The vacancies as full-width rows, 20 apart — the frames draw no grid here. */
export default function CareersList({ careers }: CareersListProps) {
  const { lang } = useLanguage();
  const careersTranslation = getCareersTranslation(lang);
  const careersPageSlug = getPageSlugByKey("careers");

  if (careers.length === 0) return null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {careers.map((career) => (
        <CareerPreviewCard
          key={career.id}
          href={withBasePath(
            `/${careersPageSlug}/${getCareerSlugById(career.id)}`,
          )}
          title={career.title}
          text={career.text}
          note={career.note}
          requirements={career.requirements}
          requirementsLabel={careersTranslation.requirementsTitle}
        />
      ))}
    </Box>
  );
}
