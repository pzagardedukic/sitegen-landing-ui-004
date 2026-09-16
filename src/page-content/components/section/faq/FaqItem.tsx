"use client";

import { useId, useState } from "react";
import { Box, Collapse, Typography } from "@mui/material";
import { MinusIcon, PlusIcon } from "@/components/icons/icons";

type FaqItemProps = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

/*
 * One question from the Lumiera frames: a row on a hairline, padded 24 above and below,
 * with the question in the heading face and a small plus at the end of the row. Open, the
 * plus becomes a minus, the rule above the row darkens to the text colour, and the answer
 * sits 16 under the question in the muted colour.
 *
 * No card, no fill: ui-002 drew each question as a rounded box, which turned a list of
 * seven questions into seven competing panels.
 */
export default function FaqItem({
  question,
  answer,
  defaultOpen = false,
}: FaqItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const answerId = useId();

  return (
    <Box
      sx={(theme) => ({
        borderTop: `1px solid ${
          open ? theme.palette.text.primary : theme.palette.surfaces.border
        }`,
        transition: theme.transitions.create(["border-color"], {
          duration: theme.transitions.duration.short,
        }),
      })}
    >
      <Box
        component="button"
        type="button"
        aria-expanded={open}
        aria-controls={answerId}
        onClick={() => setOpen(!open)}
        sx={(theme) => ({
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          px: 0,
          py: "24px",
          border: 0,
          background: "none",
          cursor: "pointer",
          textAlign: "left",
          color: theme.palette.text.primary,
          transition: theme.transitions.create(["color"], {
            duration: theme.transitions.duration.short,
          }),
          "&:hover, &:focus-visible": { color: theme.palette.primary.main },
        })}
      >
        <Typography variant="h5" component="h3" sx={{ color: "inherit" }}>
          {question}
        </Typography>

        <Box
          aria-hidden
          sx={{
            flexShrink: 0,
            width: 20,
            height: 20,
            display: "grid",
            placeItems: "center",
          }}
        >
          {open ? <MinusIcon /> : <PlusIcon />}
        </Box>
      </Box>

      <Collapse in={open}>
        <Typography
          id={answerId}
          variant="body1"
          sx={{ color: "text.secondary", pb: "24px", mt: "-8px" }}
        >
          {answer}
        </Typography>
      </Collapse>
    </Box>
  );
}
