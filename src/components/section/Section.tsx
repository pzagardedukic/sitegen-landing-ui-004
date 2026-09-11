"use client";

import { Box, Container } from "@mui/material";
import { useBannerImage } from "@/app/theme/utils/UseBannerImage";
import { ANCHOR_OFFSET } from "@/app/theme/headerMetrics";

type SectionProps = {
  id?: string;
  className?: string;
  color?: string;
  headerColor?: string;
  useHeaderImage?: boolean;
  headerHeight?: number | string;
  /** Vertical padding per breakpoint, for the few sections Figma draws off the usual rhythm. */
  paddingY?: { xs: string; sm?: string; md?: string };
  children: React.ReactNode;
};

export default function Section({
  id,
  className,
  color,
  headerColor,
  useHeaderImage = false,
  headerHeight = "100%",
  paddingY,
  children,
}: SectionProps) {
  /*
   * Called unconditionally. ui-001 had `useHeaderImage ? useBannerImage() : undefined`,
   * which breaks the rules of hooks the moment the flag differs between renders of the
   * same Section — in editor mode this is a real hook with state and an effect. See ui-001#1.
   */
  const bannerImage = useBannerImage();
  const resolvedHeaderImage = useHeaderImage ? bannerImage : undefined;

  const shouldRenderHeaderBackground =
    (headerColor || resolvedHeaderImage) && headerHeight;

  return (
    <Box
      id={id}
      component="section"
      className={className}
      sx={(theme) => ({
        // The bar is fixed and taller than it looks; a smaller margin hides the section top.
        scrollMarginTop: {
          xs: ANCHOR_OFFSET.xs,
          sm: ANCHOR_OFFSET.sm,
          md: ANCHOR_OFFSET.md,
        },
        // Lumiera's section rhythm: 72 / 96 / 120 above and below.
        py: paddingY ?? { xs: "72px", sm: "96px", md: "120px" },
        backgroundColor: resolvedHeaderImage
          ? "transparent"
          : (color ?? "transparent"),
        position: "relative",
        color: shouldRenderHeaderBackground
          ? theme.palette.common.white
          : undefined,
      })}
    >
      {shouldRenderHeaderBackground && (
        <Box
          aria-hidden
          sx={(theme) => ({
            position: "absolute",
            inset: 0,
            height: headerHeight ?? 0,
            overflow: "hidden",
            zIndex: -1,
            backgroundColor: resolvedHeaderImage ? undefined : headerColor,

            ...(resolvedHeaderImage && {
              backgroundImage: `url('${resolvedHeaderImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",

              // Design system: photographs sit under a flat black scrim at 60 %,
              // with white copy over them. No gradient, no filters.
              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                backgroundColor: theme.palette.surfaces.scrim,
              },
            }),
          })}
        />
      )}

      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
}
