"use client";

import type { SxProps, Theme } from "@mui/material/styles";
import ArrowButton from "./ArrowButton";
import { ChevronLeftIcon } from "../icons/icons";

type BackButtonProps = {
  label: string;
  onClick: () => void;
  sx?: SxProps<Theme>;
};

/*
 * The button that returns from a detail page to its list — project, post, price item, job,
 * event. It lives here once so the five detail pages cannot drift apart: the Lumiera Border
 * button with its chevron turned round and put before the label.
 */
export default function BackButton({ label, onClick, sx }: BackButtonProps) {
  return (
    <ArrowButton
      tone="border"
      arrow={false}
      startIcon={<ChevronLeftIcon />}
      onClick={onClick}
      sx={[{ alignSelf: "flex-start" }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {label}
    </ArrowButton>
  );
}
