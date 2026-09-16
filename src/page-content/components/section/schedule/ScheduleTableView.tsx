"use client";

import { Box, Typography } from "@mui/material";

type ScheduleTableViewProps = {
  title: string;
  text: string;
  categoryLabel: string;
  rows: string[][];
};

/*
 * A timetable from the Lumiera frames: the table's name and a line about it, then the rows
 * inside a container rounded 12 on a hairline — the first row on the cream wash in the
 * medium face as the header, the rest in the muted colour, divided by hairlines.
 *
 * A real <table>, so a screen reader announces the header a cell belongs to. On a phone it
 * scrolls sideways inside its container rather than squeezing four columns into 318: at that
 * width "Ponedeljek – petek" in a 67 px cell is four lines of one word each.
 */
export default function ScheduleTableView({
  title,
  text,
  categoryLabel,
  rows,
}: ScheduleTableViewProps) {
  const columnCount = rows.reduce(
    (count, row) => Math.max(count, row.length),
    0,
  );

  if (columnCount === 0) return null;

  /* Rows a customer left short would otherwise break the column grid. */
  const padded = rows.map((row) => [
    ...row,
    ...Array<string>(columnCount - row.length).fill(""),
  ]);
  const headerCells = padded[0];
  const bodyRows = padded.slice(1);

  const cellSx = {
    px: { xs: "12px", md: "24px" },
    py: { xs: "12px", md: "16px" },
    textAlign: "left" as const,
    verticalAlign: "top" as const,
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {title && (
        <Typography variant="h5" component="h3">
          {title}
        </Typography>
      )}

      {text && (
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {text}
        </Typography>
      )}

      {categoryLabel && (
        <Typography
          variant="caption"
          component="p"
          sx={{ color: "text.secondary" }}
        >
          {categoryLabel}
        </Typography>
      )}

      <Box
        sx={(theme) => ({
          mt: "6px",
          overflowX: "auto",
          borderRadius: "12px",
          border: `1px solid ${theme.palette.surfaces.border}`,
        })}
      >
        <Box
          component="table"
          sx={{
            width: "100%",
            minWidth: { xs: 560, md: "auto" },
            borderCollapse: "collapse",
          }}
        >
          <Box component="thead">
            <Box component="tr">
              {headerCells.map((cell, index) => (
                <Box
                  key={index}
                  component="th"
                  scope="col"
                  sx={(theme) => ({
                    ...theme.typography.subtitle1,
                    ...cellSx,
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.surfaces.bgAlt,
                    borderBottom: `1px solid ${theme.palette.surfaces.border}`,
                  })}
                >
                  {cell}
                </Box>
              ))}
            </Box>
          </Box>

          <Box component="tbody">
            {bodyRows.map((row, rowIndex) => (
              <Box
                key={rowIndex}
                component="tr"
                sx={(theme) => ({
                  ...(rowIndex < bodyRows.length - 1 && {
                    "& > td": {
                      borderBottom: `1px solid ${theme.palette.surfaces.border}`,
                    },
                  }),
                })}
              >
                {row.map((cell, cellIndex) => (
                  <Box
                    key={cellIndex}
                    component="td"
                    sx={(theme) => ({
                      ...theme.typography.body1,
                      ...cellSx,
                      color: theme.palette.text.secondary,
                    })}
                  >
                    {cell}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
