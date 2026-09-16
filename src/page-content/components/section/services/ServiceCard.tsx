"use client";

import { Box, Typography } from "@mui/material";
import CircleButton from "@/components/button/CircleButton";
import { ArrowOutwardIcon, CheckIcon } from "@/components/icons/icons";

type ServiceCardProps = {
  image?: string | null;
  title: string;
  text: string;
  features?: string[];
  /** Where the round open button leads; left out when there is nowhere further to go. */
  href?: string;
  /** Position in the list — picks the wash of a card without a photograph. */
  index?: number;
};

/*
 * A service as Lumiera draws it: a card rounded 16 on the mint wash, the photograph across
 * its top (280 / 240 tall), then 28 / 24 in from the edges the title (h5), the text in the
 * muted colour and the features, each with a tick in a small white disc.
 *
 * A service without a photograph becomes a coloured card instead — rose and mint by turns —
 * with the open button at its top and air before the title, so a row of them still reads as
 * a row of cards rather than a list.
 *
 * The round open button leads on to the services page from the home-page preview; on the
 * services page itself there is nowhere further to go and it is left out. Cards fill the
 * height of their row, so a row of unequal texts stays even.
 */
export default function ServiceCard({
  image,
  title,
  text,
  features = [],
  href,
  index = 0,
}: ServiceCardProps) {
  const openButton = href ? (
    <CircleButton
      tone="white"
      size={44}
      {...{ component: "a", href }}
      aria-label={title}
    >
      <ArrowOutwardIcon />
    </CircleButton>
  ) : null;

  return (
    <Box
      sx={(theme) => ({
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: image
          ? theme.palette.surfaces.mint
          : index % 2 === 0
            ? theme.palette.surfaces.rose
            : theme.palette.surfaces.mint,
      })}
    >
      {image && (
        <Box
          sx={(theme) => ({
            position: "relative",
            flexShrink: 0,
            height: { xs: 240, md: 280 },
            backgroundColor: theme.palette.surfaces.placeholder,
          })}
        >
          <Box
            component="img"
            src={image}
            alt=""
            loading="lazy"
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {openButton && (
            <Box sx={{ position: "absolute", top: 16, right: 16 }}>
              {openButton}
            </Box>
          )}
        </Box>
      )}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: { xs: "12px", md: "14px" },
          px: { xs: "24px", md: "28px" },
          pt: { xs: "24px", md: "28px" },
          pb: { xs: "28px", md: "32px" },
        }}
      >
        {!image && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              minHeight: 44,
              mb: { xs: "80px", md: "120px" },
            }}
          >
            {openButton}
          </Box>
        )}

        <Typography variant="h5" component="h3">
          {title}
        </Typography>

        {text && (
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {text}
          </Typography>
        )}

        {features.length > 0 && (
          <Box
            component="ul"
            sx={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              mt: "6px",
            }}
          >
            {features.map((feature, featureIndex) => (
              <Box
                key={featureIndex}
                component="li"
                sx={{ display: "flex", gap: "10px", alignItems: "flex-start" }}
              >
                <Box
                  aria-hidden
                  sx={(theme) => ({
                    flexShrink: 0,
                    mt: "3px",
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  })}
                >
                  <CheckIcon size={9} />
                </Box>

                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  {feature}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
