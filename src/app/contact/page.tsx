import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ContactHero from "@/components/contact/ContactHero";
import { buildPageMetadata, getBreadcrumbSchema, getOrganizationSchema, SITE_URL } from "@/lib/seo";

const GetInTouch           = dynamic(() => import("@/components/contact/GetInTouch"));
const VisitOurStore        = dynamic(() => import("@/components/contact/VisitOurStore"));
const InsideOurSpace       = dynamic(() => import("@/components/contact/InsideOurSpace"));
const FindUsEasily         = dynamic(() => import("@/components/contact/FindUsEasily"));
const PlanYourVisit        = dynamic(() => import("@/components/contact/PlanYourVisit"));
const ProductGuidanceBanner = dynamic(() => import("@/components/contact/ProductGuidanceBanner"));
const BeyondRishikesh      = dynamic(() => import("@/components/contact/BeyondRishikesh"));
const ContinueWithClarity  = dynamic(() => import("@/components/contact/ContinueWithClarity"));

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Rudraksha Antiquei | Visit Our Spiritual Store in Rishikesh",
  description:
    "Visit our flagship sanctum in Tapovan, Rishikesh for in-person Rudraksha selection, gemstone consultation, and verification discussions. Call +91 95573 66978.",
  path: "/contact",
  keywords: [
    "contact rudraksha antiquei",
    "rudraksha store in rishikesh",
    "rishikesh spiritual shop",
    "rudraksha consultation rishikesh",
    "buy rudraksha in rishikesh",
  ],
});

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact & Store Location", path: "/contact" },
  ]);

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Rudraksha Antiquei",
    url: `${SITE_URL}/contact`,
    mainEntity: getOrganizationSchema(),
  };

  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactHero />
      <GetInTouch />
      <VisitOurStore />
      <InsideOurSpace />
      <FindUsEasily />
      <PlanYourVisit />
      <ProductGuidanceBanner />
      <BeyondRishikesh />
      <ContinueWithClarity />
    </div>
  );
}
