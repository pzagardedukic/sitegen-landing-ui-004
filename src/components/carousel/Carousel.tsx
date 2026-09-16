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
  slideWidth?: Responsive<number | string>;
  /** Space above the controls, in pixels per breakpoint. */
  controlsGap?: Responsive<number>;
  /** Extra styles for the controls row, e.g. a width matching one slide. */
  controlsSx?: SxProps<Theme>;
  /** Back arrow ground — `white` when the carousel sits on the cream wash. */
  controlsPrevTone?: "soft" | "white";
  /**
   * Milliseconds between automatic advances. Off by default; opt in per call site, and only
   * where the slides are there to be looked at rather than read and compared. Ignored under
   * reduced motion, while the tab is hidden, and while the track is hovered, focused or
   * being dragged; it stops for good once the reader works the controls or drags the track.
   */
  autoPlayMs?: number;
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
  controlsPrevTone = "soft",
  autoPlayMs,
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
    /*
     * Slides fully in view: n slides take n widths and n − 1 gaps, so the track holds
     * floor((width + gap) / step) of them. Without the gap two half-width slides counted
     * as one and the controls offered a step too many.
     */
    const columnGap = parseFloat(getComputedStyle(node).columnGap) || 0;
    const inView = Math.max(1, Math.floor((node.clientWidth + columnGap + 1) / step));
    const count = fixedSlides
      ? Math.max(1, items.length - inView + 1)
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

  const goTo = useCallback(
    (target: number, behavior: ScrollBehavior = "smooth") => {
      const node = trackRef.current;
      if (!node) return;

      const clamped = Math.min(Math.max(target, 0), pageCount - 1);

      node.scrollTo({ left: clamped * stepOf(node), behavior });
    },
    [pageCount, stepOf],
  );

  /*
   * Two states decide whether autoplay runs. `paused` is temporary — the pointer is over the
   * track, focus is inside it, a finger is down, or the tab is in the background. `stopped`
   * is final: once the reader works the arrows or drags the track, the carousel stays where
   * they left it. That is also how the motion can be stopped at all, since the controls
   * Lumiera draws carry no pause button; a strict reading of WCAG 2.2.2 would want one, and
   * adding it is a design decision rather than an implementation one.
   */
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const dragStartX = useRef<number | null>(null);

  useEffect(() => {
    // Read inside an effect: this is a static export, and `window` is absent as it renders.
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(query.matches);

    apply();
    query.addEventListener("change", apply);

    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setPaused(document.hidden);

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (!autoPlayMs || reduceMotion || paused || stopped || pageCount <= 1) return;

    const timer = window.setInterval(() => {
      const next = page + 1 >= pageCount ? 0 : page + 1;
      /*
       * The way home is taken without animation: gliding back across every slide reads as a
       * rewind rather than as the next step, and on a long track it outlasts the interval.
       */
      goTo(next, next === 0 ? "auto" : "smooth");
    }, autoPlayMs);

    return () => window.clearInterval(timer);
    /*
     * `page` and `pageCount` belong in here: the effect is torn down and rebuilt whenever
     * they change, so the timer can never read a stale index, and the wait starts over after
     * a manual move instead of firing again immediately.
     */
  }, [autoPlayMs, goTo, page, pageCount, paused, reduceMotion, stopped]);

  const takeOver = () => setStopped(true);

  if (items.length === 0) return null;

  const showControls = pageCount > 1;

  return (
    <Box aria-roledescription="carousel" aria-label={ariaLabel}>
      <Box
        ref={trackRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(event: React.FocusEvent<HTMLDivElement>) => {
          // Focus moving between slides is not focus leaving the track.
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setPaused(false);
          }
        }}
        onPointerDown={(event: React.PointerEvent<HTMLDivElement>) => {
          dragStartX.current = event.clientX;
          setPaused(true);
        }}
        onPointerMove={(event: React.PointerEvent<HTMLDivElement>) => {
          // A tap carries a pixel or two of travel; only a real drag counts as taking over.
          if (dragStartX.current !== null && Math.abs(event.clientX - dragStartX.current) > 8) {
            takeOver();
          }
        }}
        onPointerUp={() => {
          dragStartX.current = null;
          setPaused(false);
        }}
        onPointerCancel={() => {
          dragStartX.current = null;
          setPaused(false);
        }}
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
          /*
           * The track is dragged, not clicked, so it says so. A slide that is itself a link
           * still shows the hand, because the child's own cursor wins over the track's.
           */
          cursor: "grab",
          "&:active": { cursor: "grabbing" },
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
            onPrev={() => {
              takeOver();
              goTo(page - 1);
            }}
            onNext={() => {
              takeOver();
              goTo(page + 1);
            }}
            prevTone={controlsPrevTone}
          />
        </Box>
      )}
    </Box>
  );
}
