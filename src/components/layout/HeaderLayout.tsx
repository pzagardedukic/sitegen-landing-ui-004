import { AppBar, Box } from "@mui/material";
import { HEADER_BAR, HEADER_SIDE, HEADER_TOP } from "@/app/theme/headerMetrics";

type HeaderLayoutProps = {
  children: React.ReactNode;
  scrolled: boolean;
};

const px = (steps: Record<"xs" | "sm" | "md", number>) => ({
  xs: `${steps.xs}px`,
  sm: `${steps.sm}px`,
  md: `${steps.md}px`,
});

/*
 * Lumiera's floating header: a pill inset from the top and both sides, laid out as three
 * columns — navigation on the left, logo in the centre, language on the right. The outer
 * columns are equal (`1fr auto 1fr`), so the logo sits on the true centre of the page
 * whatever width the navigation and the language pill happen to have.
 *
 * Two states, both drawn in Figma:
 *   - over the banner photograph (every page opens on one): frosted glass — white at 6 %,
 *     a white hairline, a 16px background blur — with white type;
 *   - once the page moves: solid, on the Lumiera hairline, with the text colour. This is
 *     the "brez banner slike" frame, which is also what the pill must look like over white
 *     sections, where white type would vanish.
 *
 * The children read the state through inherited `color` and two custom properties rather
 * than a prop: `--logo-filter` turns a customer's logo artwork white over the photograph,
 * `--pill-border` gives the language pill its hairline once the bar is solid.
 *
 * The AppBar itself is transparent to the pointer; only the pill takes clicks, so the page
 * in the gap above and beside it stays usable.
 */
export default function HeaderLayout({
  children,
  scrolled,
}: HeaderLayoutProps) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="transparent"
      sx={{
        backgroundColor: "transparent",
        backgroundImage: "none",
        boxShadow: "none",
        pointerEvents: "none",
        pt: px(HEADER_TOP),
        px: px(HEADER_SIDE),
      }}
    >
      <Box
        sx={(theme) => ({
          pointerEvents: "auto",
          height: px(HEADER_BAR),
          borderRadius: "999px",
          /*
           * The same padding on both sides. Figma draws the pill lopsided — a wide inset for
           * the bare menu glyph, a narrow one for the language pill, which carries its own
           * white background and so needs less air. On the phone that put the menu 23 from
           * the border and the language pill 9, and the language pill read as though it were
           * falling off the right edge. Equal wins over optically-adjusted here.
           */
          px: { xs: "16px", sm: "18px", md: "20px" },
          display: "grid",
          /*
           * On a phone the equal outer columns cost the logo too much: the language pill is
           * twice the menu button's width, and matching it on the left left ~150px for the
           * site name. There the outer columns hug their content and the name gets the rest
           * (~200px at 390). It sits a few pixels right of true centre, as Figma draws it.
           */
          gridTemplateColumns: { xs: "auto minmax(0, 1fr) auto", sm: "1fr auto 1fr" },
          alignItems: "center",
          columnGap: 2,
          border: "1px solid",
          borderColor: scrolled
            ? theme.palette.header.border
            : theme.palette.header.glassBorder,
          backgroundColor: scrolled
            ? theme.palette.header.surface
            : theme.palette.header.glass,
          backdropFilter: scrolled ? "none" : "blur(16px)",
          WebkitBackdropFilter: scrolled ? "none" : "blur(16px)",
          color: scrolled ? theme.palette.header.text : theme.palette.header.onImage,
          "--logo-filter": scrolled ? "none" : "brightness(0) invert(1)",
          "--pill-border": scrolled ? theme.palette.header.border : "transparent",
          transition: theme.transitions.create(
            ["background-color", "border-color", "color"],
            { duration: theme.transitions.duration.short },
          ),
        })}
      >
        {children}
      </Box>
    </AppBar>
  );
}
