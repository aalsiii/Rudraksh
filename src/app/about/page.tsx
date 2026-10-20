import type { Metadata } from "next";
import dynamic from "next/dynamic";
import AboutHero from "@/components/about/AboutHero";
import { buildPageMetadata, getBreadcrumbSchema, SITE_URL } from "@/lib/seo";

const WhenSacred          = dynamic(() => import("@/components/about/WhenSacred"));
const FoundingIntention   = dynamic(() => import("@/components/about/FoundingIntention"));
const DisciplineStandards = dynamic(() => import("@/components/about/DisciplineStandards"));
const Principles          = dynamic(() => import("@/components/about/Principles"));
const WhatHappens         = dynamic(() => import("@/components/about/WhatHappens"));
const WhoWeAreFor         = dynamic(() => import("@/components/about/WhoWeAreFor"));
const LookingForward      = dynamic(() => import("@/components/about/LookingForward"));
const StillHaveQuestions  = dynamic(() => import("@/components/about/StillHaveQuestions"));

export const metadata: Metadata = buildPageMetadata({
  title: "About Rudraksha Antiquei | Himalayan Heritage & Sacred Vedic Craftsmanship",
  description:
    "Discover the founding vision and discipline behind Rudraksha Antiquei in Rishikesh. Bridging timeless Vedic traditions, ethical Himalayan sourcing, and modern scientific testing.",
  path: "/about",
  keywords: [
    "about rudraksha antiquei",
    "rudraksha store rishikesh",
    "himalayan rudraksha sourcing",
    "vedic craftsmanship",
    "spiritual jewelry rishikesh",
  ],
});

export default function AboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
  ]);

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Rudraksha Antiquei",
    url: `${SITE_URL}/about`,
    description:
      "Rudraksha Antiquei is dedicated to preserving the purity and integrity of sacred Himalayan Rudraksha beads, Vedic gemstones, and traditional spiritual artifacts.",
    mainEntity: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutHero />
      <WhenSacred />
      <FoundingIntention />
      <DisciplineStandards />
      <Principles />
      <WhatHappens />
      <WhoWeAreFor />
      <LookingForward />
      <StillHaveQuestions />
    </div>
  );
}
