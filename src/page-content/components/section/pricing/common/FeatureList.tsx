import { Box, Typography } from "@mui/material";

type Feature = {
  label: string;
  value: string;
};

type FeatureListProps = {
  features: Feature[];
  /** The package card's dot: rose filled with a gold ring, 8 across, against the plain 6. */
  ring?: boolean;
};

/*
 * The feature pairs of a price item, as the frames draw them: a small gold dot, the label,
 * and its value in the muted colour at the end of the row. A description list, because that
 * is what a label and its value are.
 */
export default function FeatureList({ features, ring = false }: FeatureListProps) {
  if (features.length === 0) return null;

  return (
    <Box
      component="dl"
      sx={{ m: 0, display: "flex", flexDirection: "column", gap: { xs: "8px", md: "10px" } }}
    >
      {features.map((feature, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Box
            aria-hidden
            sx={(theme) => ({
              flexShrink: 0,
              width: ring ? 8 : 6,
              height: ring ? 8 : 6,
              borderRadius: "50%",
              backgroundColor: ring
                ? theme.palette.surfaces.rose
                : theme.palette.primary.main,
              boxShadow: ring ? `inset 0 0 0 1px ${theme.palette.primary.main}` : "none",
            })}
          />

          <Typography component="dt" variant="body1" sx={{ flex: 1, minWidth: 0 }}>
            {feature.label}
          </Typography>

          <Typography
            component="dd"
            variant="body1"
            sx={{ m: 0, color: "text.secondary", textAlign: "right" }}
          >
            {feature.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
