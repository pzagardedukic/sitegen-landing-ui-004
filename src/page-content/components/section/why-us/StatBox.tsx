import { Box, Typography } from "@mui/material";

type StatBoxProps = {
  value: string;
  label: string;
};

/*
 * One figure as Lumiera sets it: the number in the heading face, 70 on desktop and 52
 * below, in the text colour with its "+" in primary, and the label under it in the muted
 * text colour. Centred, 14 / 10 apart.
 */
export default function StatBox({ value, label }: StatBoxProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: { xs: "10px", md: "14px" },
      }}
    >
      <Typography
        component="p"
        sx={(theme) => ({
          fontFamily: theme.typography.h1.fontFamily,
          fontWeight: 400,
          fontSize: { xs: "52px", md: "70px" },
          lineHeight: 1.1,
          color: theme.palette.text.primary,
        })}
      >
        {value}
        <Box component="span" sx={{ color: "primary.main" }}>
          +
        </Box>
      </Typography>

      <Typography
        variant="body1"
        sx={{ color: "text.secondary", maxWidth: 340 }}
      >
        {label}
      </Typography>
    </Box>
  );
}
