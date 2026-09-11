import type { SVGProps } from "react";

/*
 * Line icons drawn the way Lumiera draws them: a thin stroke in currentColor, so each one
 * takes the colour of the text it sits beside — white on the glass header, the text colour
 * on white, the footer colour in the footer. Sized in pixels at the Figma size.
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
