import type { SVGProps } from "react";

/*
 * Icons drawn the way Lumiera draws them, in currentColor so each one takes the colour of
 * the text it sits beside — white on the glass header, the text colour on white, the footer
 * colour in the footer. Sized in pixels at the Figma size.
 */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

export function ChevronDownIcon({ size = 10, ...props }: IconProps) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 10 6" fill="none" aria-hidden {...props}>
      <path
        d="M1 1l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* The glyph inside Lumiera's Buttons-Arrow component (`fi_9622855`): a filled chevron, 5 × 10. */
export function ChevronRightIcon({ size = 10, style, ...props }: IconProps & { flip?: boolean }) {
  const { flip, ...rest } = props;

  return (
    <svg
      width={size * (5.16 / 9.73)}
      height={size}
      viewBox="0 0 5.16 9.73"
      fill="currentColor"
      aria-hidden
      style={{ ...(flip && { transform: "scaleX(-1)" }), ...style }}
      {...rest}
    >
      <path d="M0.151 0.158C0.352 -0.053 0.679 -0.053 0.88 0.158L5.005 4.48C5.207 4.691 5.207 5.033 5.005 5.244L0.88 9.565C0.679 9.776 0.352 9.776 0.151 9.565C-0.05 9.354 -0.05 9.012 0.151 8.801L3.911 4.862L0.151 0.922C-0.05 0.711 -0.05 0.369 0.151 0.158Z" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return <ChevronRightIcon {...props} flip />;
}

/* The 14 × 10 arrow in the carousel and pagination buttons. */
export function LongArrowIcon({
  size = 14,
  direction = "right",
  ...props
}: IconProps & { direction?: "left" | "right" }) {
  return (
    <svg width={size} height={size * (10 / 14)} viewBox="0 0 14 10" fill="none" aria-hidden {...props}>
      <path
        d={direction === "right" ? "M1 5h12M9 1l4 4-4 4" : "M13 5H1M5 1L1 5l4 4"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* The play triangle in the white button over a video still (16 × 20 in the frames). */
export function PlayIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size * (16 / 20)} height={size} viewBox="0 0 16 20" fill="currentColor" aria-hidden {...props}>
      <path d="M1.4.6a1 1 0 0 0-1.4.9v17a1 1 0 0 0 1.5.9l14.1-8.5a1 1 0 0 0 0-1.7L1.4.6Z" />
    </svg>
  );
}

/* The document mark in the rose circle on a catalogue row (12 × 17 in the frames). */
export function DocumentIcon({ size = 17, ...props }: IconProps) {
  return (
    <svg width={size * (12 / 17)} height={size} viewBox="0 0 12 17" fill="none" aria-hidden {...props}>
      <path
        d="M7 .8H2.4A1.6 1.6 0 0 0 .8 2.4v12.2a1.6 1.6 0 0 0 1.6 1.6h7.2a1.6 1.6 0 0 0 1.6-1.6V4.8L7 .8Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M7 .8v4h4.2" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

/* The download arrow on the file pill (10 × 12). */
export function DownloadIcon({ size = 12, ...props }: IconProps) {
  return (
    <svg width={size * (10 / 12)} height={size} viewBox="0 0 10 12" fill="none" aria-hidden {...props}>
      <path
        d="M5 .8v7.4M1.6 5.4 5 8.8l3.4-3.4M.8 11.2h8.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* The four contact marks, drawn in a 20 box to sit in Lumiera's rose circle. */
export function LocationIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path
        d="M10 17.5s5.5-4.9 5.5-9a5.5 5.5 0 1 0-11 0c0 4.1 5.5 9 5.5 9Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="8.3" r="2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function PhoneIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path
        d="M6.6 3.5 8.2 6.4 6.7 8c.8 1.7 2 2.9 3.7 3.7l1.6-1.5 2.9 1.6v2.8c0 .6-.5 1.1-1.1 1C7.7 15 4.9 12.2 4.4 4.6c0-.6.4-1.1 1-1.1h1.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="m3.8 6.4 6.2 4.3 6.2-4.3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function ClockIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 6.2V10l2.6 1.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* The tick in front of a feature in a list. */
export function CheckIcon({ size = 10, ...props }: IconProps) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 10 8" fill="none" aria-hidden {...props}>
      <path
        d="M1 4.2l2.8 2.8L9 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* The 9 × 9 arrow in the link badge on certificate tiles. */
export function ArrowOutwardIcon({ size = 9, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 9 9" fill="none" aria-hidden {...props}>
      <path
        d="M1 8L8 1M3 1h5v5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUpIcon({ size = 14, ...props }: IconProps) {
  return (
    <svg width={size * (10 / 14)} height={size} viewBox="0 0 10 14" fill="none" aria-hidden {...props}>
      <path
        d="M5 13V1M1 5l4-4 4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon({ size = 14, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden {...props}>
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* Two lines, not three: the Lumiera menu button. */
export function MenuIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size / 2} viewBox="0 0 18 9" fill="none" aria-hidden {...props}>
      <path d="M0 0.75h18M0 8.25h18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
