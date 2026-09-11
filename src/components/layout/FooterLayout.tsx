import { Box, Container } from "@mui/material";

type FooterLayoutProps = {
  children: React.ReactNode;
};

/*
 * The footer ground from the approved Figma frame (after Lumiera's FOOTER-1): the slate
 * footer colour with the top corners rounded 32 / 40 / 48, on the page margins. The white
 * page shows in the corners, which is what makes it read as a panel rather than a band.
 */
export default function FooterLayout({ children }: FooterLayoutProps) {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        backgroundColor: theme.palette.footer.background,
        color: theme.palette.footer.text.primary,
        borderTopLeftRadius: { xs: "32px", sm: "40px", md: "48px" },
        borderTopRightRadius: { xs: "32px", sm: "40px", md: "48px" },
        pt: { xs: "56px", sm: "64px", md: "80px" },
        pb: { xs: "32px", sm: "36px", md: "40px" },
        mt: "auto",
      })}
    >
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
}
