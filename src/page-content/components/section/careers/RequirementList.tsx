import { Box, Typography } from "@mui/material";

type RequirementListProps = {
  requirements: string[];
  label: string;
};

/*
 * The requirements of a vacancy, as the Lumiera frames draw them: the muted label, then one
 * line per requirement with a rose dot in a gold ring. A list, because that is what it is —
 * ui-001 set them as plain paragraphs and a screen reader announced no count.
 */
export default function RequirementList({
  requirements,
  label,
}: RequirementListProps) {
  if (requirements.length === 0) return null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Typography
        variant="caption"
        component="p"
        sx={{ color: "text.secondary" }}
      >
        {label}
      </Typography>

      <Box
        component="ul"
        sx={{
          listStyle: "none",
          m: 0,
          p: 0,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {requirements.map((requirement, index) => (
          <Box
            key={index}
            component="li"
            sx={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
          >
            <Box
              aria-hidden
              sx={(theme) => ({
                mt: "9px",
                flexShrink: 0,
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: theme.palette.surfaces.rose,
                boxShadow: `inset 0 0 0 1px ${theme.palette.primary.main}`,
              })}
            />

            <Typography variant="body1">{requirement}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
