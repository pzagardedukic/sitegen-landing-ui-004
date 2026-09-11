"use client";

import type { ButtonProps } from "@mui/material";
import type { ElementType } from "react";
import ArrowButton from "./ArrowButton";

/*
 * The primary Lumiera button under its ui-002 name, so the sections not yet rebuilt keep
 * working. Lumiera draws no gradients; each section moves to ArrowButton, with the variant
 * Figma draws for it, as it is redone.
 */
export default function GradientButton<C extends ElementType = "button">(
  props: ButtonProps<C, { component?: C }>,
) {
  return <ArrowButton<C> tone="primary" {...props} />;
}
