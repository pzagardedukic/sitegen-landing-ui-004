"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { useCallback, useEffect, useRef, useState } from "react";
import CarouselControls from "./CarouselControls";

type Responsive<T> = { xs: T; sm?: T; md?: T };

type CarouselProps = {
  items: React.ReactNode[];
  /** Slides visible at once when `slideWidth` is not given. */
  perView?: { mobile: number; desktop: number };
  /** Gap between slides in pixels, per breakpoint or one value for all. */
  gap?: number | Responsive<number>;
  ariaLabel?: string;
  /**
   * Relative widths of the visible slides, cycled across the track. Leaving this out gives
   * equal columns. Only used at the desktop count, and only without `slideWidth`.
   */
  weights?: number[];
  /**
   * Fixed slide width per breakpoint, in pixels or "100%". The track then runs as wide as
   * its container — which may bleed past the page margin — and pages one slide at a time.
   */
  slideWidth?: Responsive<number | "100%">;
  /** Space above the controls, in pixels per breakpoint. */
  controlsGap?: Responsive<number>;
  /** Extra styles for the controls row, e.g. a width matching one slide. */
  controlsSx?: SxProps<Theme>;
};

const px = <T extends number | string>(value: T) =>
  typeof value === "number" ? `${value}px` : value;

const toResponsive = <T extends number | string>(value: T | Responsive<T>) =>
  typeof value === "object"
    ? Object.fromEntries(Object.entries(value).map(([k, v]) => [k, px(v as T)]))
    : px(value);

/*
 * Scroll-snap based rather than JS-animated: touch dragging, momentum and keyboard
 * scrolling then come from the browser, and there is no state to fall out of sync when
 * the slide count changes with the data.
 *
 * Two ways to size slides:
 *   - `perView`: a whole page of equal (or weighted) slides fills the track, and the
 *     controls page by the track's width;
 *   - `slideWidth`: slides keep a fixed width, as Lumiera's about carousel draws them, and
 *     the controls step one slide at a time. The number of steps is how many slides can
 *     still scroll into first place, so the last one lands fully in view.
 */
export default function Carousel({
  items,
  perView = { mobile: 1, desktop: 2 },
  gap = 24,
  ariaLabel,
  weights,
  slideWidth,
  controlsGap = { xs: 24, sm: 28, md: 32 },
  controlsSx,
}: CarouselProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const visible = isDesktop ? perView.desktop : perView.mobile;
  const fixedSlides = Boolean(slideWidth);

  const gapCss = toResponsive(gap);

  const usableWeights =
    !fixedSlides && isDesktop && weights && weights.length === visible ? weights : null;

  /*
   * In perView mode grid-auto-columns takes a list and cycles it, which is what makes an
   * unequal pair possible without tracking slide indices: each cycle still adds up to one
   * page width, so paging by clientWidth keeps working. The gap is read back from the
   * track at runtime, so the calc uses the CSS variable the track sets.
   */
  const track = `calc(100% - (${visible} - 1) * var(--carousel-gap))`;
  const autoColumns = fixedSlides
    ? toResponsive(slideWidth!)
    : usableWeights
      ? usableWeights.map((w) => `calc(${track} * ${w})`).join(" ")
      : `calc(${track} / ${visible})`;

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(
    fixedSlides ? items.length : Math.max(1, Math.ceil(items.length / visible)),
  );

  /* Distance between two snap positions: one slide plus a gap, or one whole track. */
  const stepOf = useCallback(
    (node: HTMLDivElement) => {
      if (!fixedSlides) return node.clientWidth || 1;
      const first = node.firstElementChild as HTMLElement | null;
      const columnGap = parseFloat(getComputedStyle(node).columnGap) || 0;
      return (first?.offsetWidth || node.clientWidth || 1) + columnGap;
    },
    [fixedSlides],
  );

  const sync = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;

    const step = stepOf(node);
    const count = fixedSlides
      ? Math.max(1, items.length - Math.max(1, Math.floor((node.clientWidth + 1) / step)) + 1)
      : Math.max(1, Math.ceil(items.length / visible));
    const maxScroll = node.scrollWidth - node.clientWidth;
    const atEnd = node.scrollLeft >= maxScroll - 2;

    setPageCount(count);
    setPage(atEnd ? count - 1 : Math.min(count - 1, Math.round(node.scrollLeft / step)));
  }, [fixedSlides, items.length, stepOf, visible]);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    node.addEventListener("scroll", sync, { passive: true });
    const observer = new ResizeObserver(sync);
    observer.observe(node);
    sync();

    return () => {
      node.removeEventListener("scroll", sync);
      observer.disconnect();
    };
  }, [sync]);

  const goTo = (target: number) => {
    const node = trackRef.current;
    if (!node) return;

    const clamped = Math.min(Math.max(target, 0), pageCount - 1);

    node.scrollTo({ left: clamped * stepOf(node), behavior: "smooth" });
  };

  if (items.length === 0) return null;

  const showControls = pageCount > 1;

  return (
    <Box aria-roledescription="carousel" aria-label={ariaLabel}>
      <Box
        ref={trackRef}
        sx={{
          "--carousel-gap": gapCss,
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: autoColumns,
          gap: "var(--carousel-gap)",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {items.map((item, index) => (
          <Box key={index} sx={{ scrollSnapAlign: "start", minWidth: 0 }}>
            {item}
          </Box>
        ))}
      </Box>

      {showControls && (
        <Box
          sx={[
            { mt: toResponsive(controlsGap) },
            ...(Array.isArray(controlsSx) ? controlsSx : [controlsSx]),
          ]}
        >
          <CarouselControls
            page={page}
            pageCount={pageCount}
            onPrev={() => goTo(page - 1)}
            onNext={() => goTo(page + 1)}
          />
        </Box>
      )}
    </Box>
  );
}
