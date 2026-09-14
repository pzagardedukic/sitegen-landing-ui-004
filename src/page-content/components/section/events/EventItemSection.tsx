"use client";

import { Box, Typography } from "@mui/material";
import BackButton from "@/components/button/BackButton";
import Tag from "@/components/common/Tag";
import { getEventItems, getEventsSection, useLanguage } from "@/core/runtime";
import { useBackToList } from "@/core/react";
import { getPageSlugByKey } from "@/core/static";
import { getButtonTranslation, getEventsTranslation } from "@/core/translations";
import { formatEventDate, getRelativeEventDay } from "@/core/utils";
import ContactCtaButton from "../common/ContactCtaButton";
import RichText from "../common/RichText";
import ShareActions from "../common/ShareActions";

/*
 * An event's page from the Lumiera frames: one column 900 wide — the back pill, the picture
 * rounded 16, the badges, the date and place on one muted line, the name, the text, the
 * category, the apply button and the share buttons under a hairline.
 *
 * The apply button is drawn only where the customer turned it on and the event still
 * stands: offering a place at a cancelled event is worse than offering none.
 */
export default function EventItemSection({ id }: { id: number }) {
  const { lang } = useLanguage();
  const eventsTranslation = getEventsTranslation(lang);
  const buttonTranslation = getButtonTranslation(lang);

  /*
   * Called before the missing-event guard: a hook behind an early return runs on some
   * renders and not others, which is the rules-of-hooks break reported as ui-001#1.
   */
  const handleBackToEvents = useBackToList(`/${getPageSlugByKey("events")}`);

  const event = getEventItems(lang).find((item) => item.id === id);
  const eventsSection = getEventsSection(lang);

  if (!event) {
    return null;
  }

  const formattedDate = formatEventDate(event.date, lang, { includeWeekday: true });
  const relativeDay = getRelativeEventDay(event.date);
  const relativeDayLabel =
    relativeDay === "today"
      ? eventsTranslation.today
      : relativeDay === "tomorrow"
        ? eventsTranslation.tomorrow
        : "";

  const dateLine = [formattedDate, event.location].filter(Boolean).join(" · ");
  const hasBadges = event.isCancelled || Boolean(relativeDayLabel);
  const showApplyButton =
    Boolean(eventsSection?.showApplyButton) && !event.isCancelled;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 900,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "24px",
      }}
    >
      <BackButton label={eventsTranslation.backToEvents} onClick={handleBackToEvents} />

      {event.image && (
        <Box
          component="img"
          src={event.image}
          alt=""
          sx={(theme) => ({
            width: "100%",
            height: { xs: 240, sm: 360, md: 440 },
            objectFit: "cover",
            borderRadius: "16px",
            backgroundColor: theme.palette.surfaces.placeholder,
          })}
        />
      )}

      {hasBadges && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {event.isCancelled && <Tag label={eventsTranslation.cancelled} tone="dark" />}

          {relativeDayLabel && (
            <Tag
              label={relativeDayLabel}
              tone={relativeDay === "today" ? "mint" : "rose"}
            />
          )}
        </Box>
      )}

      {dateLine && (
        <Typography variant="caption" component="p" sx={{ color: "text.secondary" }}>
          {dateLine}
        </Typography>
      )}

      <Typography variant="h2" component="h2">
        {event.title}
      </Typography>

      {event.text && (
        <Typography component="div" variant="body1">
          <RichText
            text={event.text}
            allowStyling={{ newLine: true, bold: true, italic: true, underline: true }}
          />
        </Typography>
      )}

      {event.category && (
        <Typography variant="caption" component="p" sx={{ color: "text.secondary" }}>
          {event.category}
        </Typography>
      )}

      {showApplyButton && (
        <ContactCtaButton
          subject={`${eventsTranslation.applicationSubject}: ${event.title}`}
          label={buttonTranslation.applyNow}
          tone="primary"
          sx={{ alignSelf: { xs: "stretch", sm: "flex-start" } }}
        />
      )}

      <Box
        sx={(theme) => ({
          width: "100%",
          pt: "24px",
          borderTop: `1px solid ${theme.palette.surfaces.border}`,
        })}
      >
        <ShareActions title={event.title} />
      </Box>
    </Box>
  );
}
