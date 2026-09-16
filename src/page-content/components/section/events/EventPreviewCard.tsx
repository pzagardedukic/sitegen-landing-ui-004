"use client";

import { Box, Typography } from "@mui/material";
import Tag from "@/components/common/Tag";
import { getEventItems, useLanguage } from "@/core/runtime";
import {
  getButtonTranslation,
  getEventsTranslation,
} from "@/core/translations";
import {
  formatEventDate,
  getRelativeEventDay,
  stripRichText,
  truncateWordSafe,
} from "@/core/utils";
import ContactCtaButton from "../common/ContactCtaButton";

type EventItem = ReturnType<typeof getEventItems>[number];

type EventPreviewCardProps = {
  item: EventItem;
  href: string;
  showApplyButton: boolean;
};

/*
 * An event card from the Lumiera frames: the picture 240 tall with the badges over it, then
 * the date and place on one muted line, the name, a hundred and fifty characters of the
 * text, the category, and — where the customer turned it on — the apply button.
 *
 * The name carries the link and stretches over the whole card, so the picture and the text
 * lead to the event too; the apply button sits above that overlay, because a button inside
 * a link is not a thing a browser can express.
 */
export default function EventPreviewCard({
  item,
  href,
  showApplyButton,
}: EventPreviewCardProps) {
  const { lang } = useLanguage();
  const eventsTranslation = getEventsTranslation(lang);
  const buttonTranslation = getButtonTranslation(lang);

  const truncatedText = stripRichText(truncateWordSafe(item.text, 150));
  const formattedDate = formatEventDate(item.date, lang);
  const relativeDay = getRelativeEventDay(item.date);
  const relativeDayLabel =
    relativeDay === "today"
      ? eventsTranslation.today
      : relativeDay === "tomorrow"
        ? eventsTranslation.tomorrow
        : "";

  const dateLine = [formattedDate, item.location].filter(Boolean).join(" · ");
  const hasBadges = item.isCancelled || Boolean(relativeDayLabel);

  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: theme.palette.surfaces.surface,
        opacity: item.isCancelled ? 0.86 : 1,
        "&:hover .event-image": { transform: "scale(1.04)" },
        "&:hover .event-title": { color: theme.palette.primary.main },
      })}
    >
      <Box
        sx={(theme) => ({
          position: "relative",
          height: { xs: 220, md: 240 },
          overflow: "hidden",
          backgroundColor: theme.palette.surfaces.placeholder,
        })}
      >
        {item.image && (
          <Box
            component="img"
            className="event-image"
            src={item.image}
            alt=""
            loading="lazy"
            sx={(theme) => ({
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: theme.transitions.create("transform"),
            })}
          />
        )}

        {hasBadges && (
          <Box
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              right: 16,
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
            }}
          >
            {item.isCancelled && (
              <Tag label={eventsTranslation.cancelled} tone="dark" />
            )}

            {relativeDayLabel && (
              <Tag
                label={relativeDayLabel}
                tone={relativeDay === "today" ? "mint" : "rose"}
              />
            )}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          p: "18px 20px 22px",
        }}
      >
        {dateLine && (
          <Typography
            variant="caption"
            component="p"
            sx={{ color: "text.secondary" }}
          >
            {dateLine}
          </Typography>
        )}

        <Typography
          component="a"
          href={href}
          variant="h5"
          className="event-title"
          sx={(theme) => ({
            textDecoration: "none",
            color: "inherit",
            transition: theme.transitions.create(["color"], {
              duration: theme.transitions.duration.short,
            }),
            /* The whole card follows the name's link. */
            "&::after": { content: '""', position: "absolute", inset: 0 },
          })}
        >
          {item.title}
        </Typography>

        {truncatedText && (
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {truncatedText}
          </Typography>
        )}

        {item.category && (
          <Typography
            variant="caption"
            component="p"
            sx={{ color: "text.secondary" }}
          >
            {item.category}
          </Typography>
        )}

        {showApplyButton && !item.isCancelled && (
          <Box sx={{ position: "relative", zIndex: 1, mt: "auto", pt: "8px" }}>
            <ContactCtaButton
              subject={`${eventsTranslation.applicationSubject}: ${item.title}`}
              label={buttonTranslation.applyNow}
              tone="outline"
              fullWidth
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
