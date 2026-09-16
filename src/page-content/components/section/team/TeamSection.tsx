"use client";

import { Box } from "@mui/material";
import Carousel from "@/components/carousel/Carousel";
import { getTeamItems, getTeamSection, useLanguage } from "@/core/runtime";
import { getTeamTranslation } from "@/core/translations";
import CenteredIntro from "../common/CenteredIntro";
import TeamCard from "./TeamCard";

/*
 * The team section from the Lumiera frames: the centred intro, then the members —
 *   desktop  up to four cards 282 wide and 24 apart in a row, centred when there are fewer,
 *            wrapping onto a new row when there are more;
 *   tablet   a carousel two cards wide;
 *   phone    a carousel one card wide.
 * The row and the carousel are switched in CSS, so the static page carries no layout jump.
 */
export default function TeamSection() {
  const { lang } = useLanguage();
  const teamTranslation = getTeamTranslation(lang);
  const teamSection = getTeamSection(lang);

  if (!teamSection) {
    return null;
  }

  const teamItems = getTeamItems(lang);
  const columns = Math.min(Math.max(teamItems.length, 1), 4);

  const cards = teamItems.map((member, index) => (
    <TeamCard
      key={index}
      name={member.name}
      text={member.text}
      image={member.image}
      contact={member.contact}
    />
  ));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "44px", md: "64px" },
      }}
    >
      <CenteredIntro
        title={teamTranslation.title}
        description={teamSection.text}
      />

      {cards.length > 0 && (
        <>
          <Box
            sx={{
              display: { xs: "none", md: "grid" },
              gridTemplateColumns: `repeat(${columns}, minmax(0, 282px))`,
              justifyContent: "center",
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
              ariaLabel={teamTranslation.title}
              /* A face and a line about the person — it carries a tap, not a read. */
              autoPlayMs={6000}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
