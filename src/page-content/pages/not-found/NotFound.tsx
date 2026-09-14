"use client";

import PageLayout from "@/components/layout/PageLayout";
import Section from "@/components/section/Section";
import Footer from "@/page-content/components/footer/Footer";
import Header from "@/page-content/components/header/Header";
import NotFoundSection from "@/page-content/components/section/not-found/NotFoundSection";

/*
 * The 404 page carries no title band: the frames set the whole message in the middle of a
 * cream screen, under the floating header. The section's own heading is the page's h1.
 */
export default function NotFoundPage() {
  return (
    <PageLayout header={<Header />} footer={<Footer />} solidHeader>
      <Section id="404" color="surfaces.surface" paddingY={{ xs: "96px", md: "120px" }}>
        <NotFoundSection />
      </Section>
    </PageLayout>
  );
}
