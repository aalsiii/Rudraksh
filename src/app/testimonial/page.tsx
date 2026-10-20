import type { Metadata } from "next";
import dynamic from "next/dynamic";
import TestimonialHero from "@/components/testimonial/TestimonialHero";
import { buildPageMetadata, getBreadcrumbSchema, SITE_URL, SITE_NAME } from "@/lib/seo";

const TestimonialStatsAndCards = dynamic(() => import("@/components/testimonial/TestimonialStatsAndCards"));
const TestimonialProductFeedback = dynamic(() => import("@/components/testimonial/TestimonialProductFeedback"));
const TestimonialPlatformReviews = dynamic(() => import("@/components/testimonial/TestimonialPlatformReviews"));
// const TestimonialVideoGrid = dynamic(() => import("@/components/testimonial/TestimonialVideoGrid"));
const TestimonialClarityBanner = dynamic(() => import("@/components/testimonial/TestimonialClarityBanner"));
const TestimonialTrustBanner = dynamic(() => import("@/components/testimonial/TestimonialTrustBanner"));

export const metadata: Metadata = buildPageMetadata({
  title: "Client Testimonials & Genuine Reviews | Rudraksha Antiquei Experiences",
  description:
    "Read verified reviews and experiences from spiritual practitioners, collectors, and seekers who received genuine Nepali Rudraksha beads and gemstones from Rudraksha Antiquei.",
  path: "/testimonial",
  keywords: [
    "rudraksha antiquei reviews",
    "genuine rudraksha testimonials",
    "rudraksha antiquei customer experiences",
    "authentic rudraksha feedback",
  ],
});

export default function TestimonialPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Customer Testimonials", path: "/testimonial" },
  ]);

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Rudraksha Antiquei Certified Spiritual Collection",
    image: `${SITE_URL}/assets/images/og-default.webp`,
    description: "Authentic, certified Nepali Rudraksha beads and Vedic gemstones.",
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "340",
      reviewCount: "285",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <TestimonialHero />
      <TestimonialStatsAndCards />
      <TestimonialTrustBanner />
      {/* <TestimonialVideoGrid /> */}
      <TestimonialProductFeedback />
      <TestimonialPlatformReviews />
      <TestimonialClarityBanner />
    </div>
  );
}
