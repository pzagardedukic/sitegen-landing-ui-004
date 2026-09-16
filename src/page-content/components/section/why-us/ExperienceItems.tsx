"use client";

import { Box } from "@mui/material";
import Carousel from "@/components/carousel/Carousel";
import { ArrowOutwardIcon } from "@/components/icons/icons";
import { getExperienceItems } from "@/core/runtime";

type CertificateItem = ReturnType<typeof getExperienceItems>[number];

/*
 * One certificate: the awarding body's mark contained on a white tile rounded 16, 200 /
 * 180 / 200 tall. Where the item carries a link, the whole tile opens it and a mint badge
 * with an arrow sits 12 in from the top-right corner.
 */
function CertificateTile({ item }: { item: CertificateItem }) {
  const isLink = Boolean(item.url);

  return (
    <Box
      {...(isLink
        ? {
            component: "a",
            href: item.url,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": item.url,
          }
        : {})}
      sx={(theme) => ({
        position: "relative",
        display: "grid",
        placeItems: "center",
        height: { xs: 200, sm: 180, md: 200 },
        px: "20px",
        borderRadius: "16px",
        backgroundColor: theme.palette.background.paper,
        ...(isLink && {
          "&:hover .certificate-link": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
        }),
      })}
    >
      <Box
        component="img"
        src={item.image}
        alt=""
        loading="lazy"
        sx={{ maxWidth: "75%", maxHeight: "60%", objectFit: "contain" }}
      />

      {isLink && (
        <Box
          className="certificate-link"
          sx={(theme) => ({
            position: "absolute",
            top: 12,
            right: 12,
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            backgroundColor: theme.palette.surfaces.mint,
            color: theme.palette.text.primary,
            transition: theme.transitions.create(
              ["background-color", "color"],
              {
                duration: theme.transitions.duration.short,
              },
            ),
          })}
        >
          <ArrowOutwardIcon />
        </Box>
      )}
    </Box>
  );
}

/*
 * The certificates in a cream panel rounded 32 / 28 / 24: four tiles abreast on desktop
 * (more wrap to a new row), two by two on tablet, and on a phone one tile at a time with
 * the slider controls inside the panel — the back arrow white there, because it sits on
 * cream. The panel is left out when there are no certificates.
 */
export default function ExperienceItems() {
  const items = getExperienceItems();

  if (items.length === 0) return null;

  const tiles = items.map((item, index) => (
    <CertificateTile key={index} item={item} />
  ));

  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        backgroundColor: theme.palette.surfaces.bgAlt,
        borderRadius: { xs: "24px", sm: "28px", md: "32px" },
        px: { xs: "16px", sm: "28px", md: "40px" },
        pt: { xs: "16px", sm: "28px", md: "40px" },
        pb: { xs: "20px", sm: "28px", md: "40px" },
      })}
    >
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <Carousel
          items={tiles}
          slideWidth={{ xs: "100%" }}
          gap={16}
          controlsGap={{ xs: 20 }}
          controlsPrevTone="white"
          ariaLabel="Certifikati"
        />
      </Box>

      {/*
        Columns follow the count, up to Figma's four: three certificates share the panel
        three ways instead of leaving a hole where the fourth would be. On tablet an odd
        last tile spans both columns rather than hanging alone at the left.
      */}
      <Box
        sx={(theme) => ({
          display: { xs: "none", sm: "grid" },
          gridTemplateColumns: {
            sm: `repeat(${Math.min(items.length, 2)}, 1fr)`,
            md: `repeat(${Math.min(items.length, 4)}, 1fr)`,
          },
          gap: { sm: "20px", md: "24px" },
          [theme.breakpoints.only("sm")]: {
            "& > :last-child:nth-of-type(odd)": { gridColumn: "1 / -1" },
          },
        })}
      >
        {tiles}
      </Box>
    </Box>
  );
}
