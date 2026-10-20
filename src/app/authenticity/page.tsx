import type { Metadata } from "next";
import dynamic from "next/dynamic";
import AuthenticityHero from "@/components/authenticity/AuthenticityHero";
import { buildPageMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";

const WhatAuthenticityMeans    = dynamic(() => import("@/components/authenticity/WhatAuthenticityMeans"));
const VerificationProcess      = dynamic(() => import("@/components/authenticity/VerificationProcess"));
const CertificationAssurance   = dynamic(() => import("@/components/authenticity/CertificationAssurance"));
const CertificationScope       = dynamic(() => import("@/components/authenticity/CertificationScope"));
const IdentifyCertification    = dynamic(() => import("@/components/authenticity/IdentifyCertification"));
const SourcingAndResponsibility = dynamic(() => import("@/components/authenticity/SourcingAndResponsibility"));
const StillHaveQuestions       = dynamic(() => import("@/components/authenticity/StillHaveQuestions"));
const FAQ                      = dynamic(() => import("@/components/authenticity/FAQ"));
const BlogPosts                = dynamic(() => import("@/components/BlogPosts"));

export const metadata: Metadata = buildPageMetadata({
  title: "Authenticity & Lab Certification Guarantee | Real vs Fake Rudraksha Testing",
  description:
    "Learn how Rudraksha Antiquei scientifically verifies every Rudraksha bead and gemstone through X-ray radiography, botanical assessment, and accredited gemological testing.",
  path: "/authenticity",
  keywords: [
    "how to test original rudraksha",
    "rudraksha x-ray certificate",
    "real vs fake rudraksha",
    "lab certified rudraksha",
    "gemstone authenticity certificate",
    "rudraksha verification process",
  ],
});

const AUTHENTICITY_FAQS = [
  {
    question: "How does Rudraksha Antiquei verify bead authenticity?",
    answer:
      "We rely on non-destructive X-ray radiography to inspect internal seed chambers and natural compartment count, combined with microscopic line analysis and specific gravity tests. We never rely on debunked folklore tests like floating or needle tests.",
  },
  {
    question: "Do all products come with physical lab certification?",
    answer:
      "Yes. Every premium bead, Siddha Mala, and Vedic gemstone includes an official certificate of authenticity documenting its physical measurements, origin, mukhi count, and test results.",
  },
  {
    question: "What is the truth about fake Rudrakshas made from wood or resin?",
    answer:
      "Counterfeits made of carved wood, plastic, or glued segments are common in unregulated markets. Scientific X-ray imaging immediately exposes artificial glue lines, missing seed cavities, or foreign material fills.",
  },
  {
    question: "Can I inspect the certification before making a purchase?",
    answer:
      "Yes. If you would like to inspect the lab certificate or X-ray photograph of any specific collector bead prior to ordering, our team will gladly provide digital scans via WhatsApp or email.",
  },
];

export default function AuthenticityPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Authenticity & Certification", path: "/authenticity" },
  ]);
  const faqSchema = getFAQSchema(AUTHENTICITY_FAQS);

  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AuthenticityHero />
      <WhatAuthenticityMeans />
      <VerificationProcess />
      <CertificationAssurance />
      <CertificationScope />
      <IdentifyCertification />
      <SourcingAndResponsibility />
      <StillHaveQuestions />
      <FAQ />
      <BlogPosts />
    </div>
  );
}
