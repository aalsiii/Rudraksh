import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ConsultationHero from "@/components/consultation/ConsultationHero";
import ConsultationForm from "@/components/consultation/ConsultationForm";
import { buildPageMetadata, getBreadcrumbSchema, SITE_URL, SITE_NAME } from "@/lib/seo";

const WhyConsultationMatters = dynamic(() => import("@/components/consultation/WhyConsultationMatters"));
const WhenGuidanceBecomesHelpful = dynamic(() => import("@/components/consultation/WhenGuidanceBecomesHelpful"));
const ExperiencedAndResponsibleGuidance = dynamic(() => import("@/components/consultation/ExperiencedAndResponsibleGuidance"));
const HowConsultationWorks = dynamic(() => import("@/components/consultation/HowConsultationWorks"));
const WhatTheConsultationIncludes = dynamic(() => import("@/components/consultation/WhatTheConsultationIncludes"));
const OurApproachToGuidance = dynamic(() => import("@/components/consultation/OurApproachToGuidance"));
const InPersonGuidanceAvailable = dynamic(() => import("@/components/consultation/InPersonGuidanceAvailable"));
const LookingForMoreGuidance = dynamic(() => import("@/components/consultation/LookingForMoreGuidance"));

export const metadata: Metadata = buildPageMetadata({
  title: "Free Vedic Rudraksha & Gemstone Consultation | Expert Kundali Recommendation",
  description:
    "Request free, personalized Rudraksha and gemstone guidance from experienced Vedic astrologers. Get precise Mukhi and planetary gemstone recommendations tailored to your birth chart.",
  path: "/consultation",
  keywords: [
    "free rudraksha consultation",
    "rudraksha recommendation by astrologer",
    "vedic astrology rudraksha guidance",
    "which mukhi should i wear",
    "gemstone consultation rishikesh",
  ],
});

export default function ConsultationPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Vedic Consultation & Guidance", path: "/consultation" },
  ]);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Vedic Rudraksha & Astrological Gemstone Consultation",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    serviceType: "Astrological and Spiritual Guidance",
    description:
      "Expert personal assessment of your birth chart (Kundali) and spiritual intentions to recommend authentic, aligned Rudraksha beads and Vedic gemstones.",
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      description: "Complimentary initial consultation and Mukhi recommendation",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ConsultationHero />
      <WhyConsultationMatters />
      <ConsultationForm />
      <WhenGuidanceBecomesHelpful />
      <ExperiencedAndResponsibleGuidance />
      <HowConsultationWorks />
      <WhatTheConsultationIncludes />
      <OurApproachToGuidance />
      <InPersonGuidanceAvailable />
      <LookingForMoreGuidance />
    </div>
  );
}
