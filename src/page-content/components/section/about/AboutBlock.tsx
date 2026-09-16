"use client";

import { Box, Typography } from "@mui/material";
import ArrowButton from "@/components/button/ArrowButton";
import RichText from "../common/RichText";
import ImageCarousel, {
  AboutPhoto,
  type ImageCarouselItem,
} from "./ImageCarousel";

type AboutBlockProps = {
  title: string;
  description: string;
  items: ImageCarouselItem[];
  callToAction?: {
    label: string;
    href: string;
  };
};

/*
 * The about section as the Lumiera frames draw it, in the three shapes the data can take:
 *
 *   no photographs   one centred column, 760 wide;
 *   one photograph   the text (520) beside a single square photograph (600) on desktop,
 *                    stacked above a 480-tall one on tablet and a square on a phone;
 *   two or more      the text (440) beside the carousel, whose track runs from the text
 *                    column to the edge of the screen; on tablet the carousel sits under
 *                    the text and still runs to the right edge; on a phone it keeps to the
 *                    page margins, one slide at a time.
 *
 * The text is set in the text colour, not stepped back — Lumiera's descriptions are full
 * strength. On a phone the call to action runs the full column width.
 */
export default function AboutBlock({
  title,
  description,
  items,
  callToAction,
}: AboutBlockProps) {
  const count = items.length;
  const centred = count === 0;

  const text = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: centred ? "center" : "flex-start",
        textAlign: centred ? "center" : "left",
        gap: { xs: "24px", md: "32px" },
        ...(centred && { maxWidth: 760, mx: "auto" }),
      }}
    >
      <Typography variant="h2" component="h2">
        {title}
      </Typography>

      {description && (
        <Typography component="div" variant="body1">
          <RichText
            text={description}
            allowStyling={{
              newLine: true,
              bold: true,
              italic: true,
              underline: true,
            }}
          />
        </Typography>
      )}

      {callToAction && (
        <ArrowButton
          component="a"
          href={callToAction.href}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          {callToAction.label}
        </ArrowButton>
      )}
    </Box>
  );

  if (centred) return text;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "stretch", md: "center" },
        gap: { xs: "44px", sm: "56px", md: "80px" },
      }}
    >
      <Box
        sx={{ flex: { md: `0 0 ${count === 1 ? 520 : 440}px` }, minWidth: 0 }}
      >
        {text}
      </Box>

      {count === 1 ? (
        <Box sx={{ flex: { md: 1 }, minWidth: 0 }}>
          <AboutPhoto
            item={items[0]}
            sx={{
              aspectRatio: { xs: "1 / 1", sm: "auto", md: "1 / 1" },
              height: { sm: 480, md: "auto" },
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            flex: { md: 1 },
            minWidth: 0,
            /*
             * Run the track to the screen edge. The margin is a percentage of the row, which
             * is the page's content width, so this is exactly the distance from the content
             * edge to the screen edge at any width.
             */
            mr: { sm: "calc((100% - 100vw) / 2)" },
          }}
        >
          <ImageCarousel items={items} />
        </Box>
      )}
    </Box>
  );
}
