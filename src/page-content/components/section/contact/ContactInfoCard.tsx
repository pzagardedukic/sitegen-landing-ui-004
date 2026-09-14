import { Box, Typography } from "@mui/material";

type ContactInfoCardProps = {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

/*
 * One contact detail as the Lumiera frames draw it: the mark in a rose circle 40 across,
 * then the label in the h6 face and the value or values under it in the muted text colour,
 * 12 apart.
 */
export default function ContactInfoCard({ label, icon, children }: ContactInfoCardProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Box
        aria-hidden
        sx={(theme) => ({
          width: 40,
          height: 40,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          backgroundColor: theme.palette.surfaces.rose,
          color: theme.palette.text.primary,
        })}
      >
        {icon}
      </Box>

      <Typography variant="h6" component="h3">
        {label}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          color: "text.secondary",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
