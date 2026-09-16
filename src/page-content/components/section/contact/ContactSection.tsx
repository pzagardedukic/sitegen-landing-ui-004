"use client";

import React, { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import { getMap } from "@/core/runtime";
import { ANCHOR_OFFSET } from "@/app/theme/headerMetrics";
import EstablishedAndClients from "../common/EstablishedAndClients";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import CustomMap from "./CustomMap";

/*
 * The contact page from the Lumiera frames: the details (520) beside the cream form panel
 * (600), 80 apart, stacked 44 apart below desktop; the map full-bleed under them, 120 / 96 /
 * 72 below the content; and the two sliding strips closing the page.
 */
export default function ContactSection() {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject") ?? undefined;

  const map = getMap();

  /*
   * Arriving with a subject means arriving from somewhere else — the apply button on a job,
   * which fills the subject in for you. Without this the page opens at the top and the
   * filled-in form is out of sight: on a phone it sits below the address, the phone number,
   * the email and the whole working-hours table, so nothing on the first screen explains
   * why you are here.
   *
   * The scroll waits a frame. The router puts the document back to the top on the way in,
   * and a scroll fired before that is simply undone.
   */
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!subject) return;

    const form = formRef.current;
    if (!form) return;

    const stillness = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const frame = requestAnimationFrame(() => {
      form.scrollIntoView({
        behavior: stillness ? "auto" : "smooth",
        block: "start",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [subject]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "72px", sm: "96px", md: "120px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          gap: { xs: "44px", md: "80px" },
        }}
      >
        <Box
          sx={{
            flex: { md: "0 0 520px" },
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          <ContactInfo />
        </Box>

        <Box
          ref={formRef}
          sx={{
            flex: { md: 1 },
            width: "100%",
            minWidth: 0,
            /*
             * The header is fixed and taller than it looks, so a plain scroll would tuck the
             * top of the form underneath it. Same offset the section anchors use.
             */
            scrollMarginTop: {
              xs: ANCHOR_OFFSET.xs,
              sm: ANCHOR_OFFSET.sm,
              md: ANCHOR_OFFSET.md,
            },
          }}
        >
          <ContactForm subject={subject} />
        </Box>
      </Box>

      {map.enabled && <CustomMap />}

      {/* Year + Happy Clients - full screen width */}
      <EstablishedAndClients />
    </Box>
  );
}
