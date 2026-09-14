"use client";

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import BackButton from "@/components/button/BackButton";
import { getCareersItems, useLanguage } from "@/core/runtime";
import { getPageSlugByKey } from "@/core/static";
import { getCareersTranslation } from "@/core/translations";
import RichText from "../common/RichText";
import ShareActions from "../common/ShareActions";
import ApplyButton from "./ApplyButton";
import RequirementList from "./RequirementList";

/*
 * A vacancy's page from the Lumiera frames: one column 880 wide, 28 between its parts —
 * the back pill, the role, the text, the requirements, the note, the gold apply button,
 * and the share buttons under a hairline.
 *
 * The column is not centred: the frames keep it at the left margin, where the reader's eye
 * already is after the back button.
 */
export default function CareerItemSection({ id }: { id: number }) {
  const router = useRouter();
  const { lang } = useLanguage();
  const careersTranslation = getCareersTranslation(lang);

  const career = getCareersItems(lang).find((item) => item.id === id);

  if (!career) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 880,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: { xs: "24px", md: "28px" },
      }}
    >
      <BackButton
        label={careersTranslation.backToCareers}
        onClick={() => router.push(`/${getPageSlugByKey("careers")}`)}
      />

      <Typography variant="h2" component="h2">
        {career.title}
      </Typography>

      {career.text && (
        <Typography component="div" variant="body1">
          <RichText
            text={career.text}
            allowStyling={{ newLine: true, bold: true, italic: true, underline: true }}
          />
        </Typography>
      )}

      <RequirementList
        requirements={career.requirements}
        label={careersTranslation.requirementsTitle}
      />

      {career.note && (
        <Typography variant="caption" component="p" sx={{ color: "text.secondary" }}>
          {career.note}
        </Typography>
      )}

      <ApplyButton
        title={career.title}
        tone="primary"
        sx={{ alignSelf: { xs: "stretch", sm: "flex-start" } }}
      />

      <Box
        sx={(theme) => ({
          width: "100%",
          pt: "24px",
          borderTop: `1px solid ${theme.palette.surfaces.border}`,
        })}
      >
        <ShareActions title={career.title} />
      </Box>
    </Box>
  );
}
