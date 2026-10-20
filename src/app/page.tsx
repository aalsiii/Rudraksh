import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import ShopByCategory from "@/components/ShopByCategory";
import { getBestsellerProducts } from "@/lib/products";
import { buildPageMetadata, getFAQSchema, HOMEPAGE_FAQS } from "@/lib/seo";

const WhoWeAre            = dynamic(() => import("@/components/WhoWeAre"));
const ShopByPurpose       = dynamic(() => import("@/components/ShopByPurpose"));
const RudrakshaBirthForm  = dynamic(() => import("@/components/RudrakshaBirthForm"));
const ProductZoomShowcase = dynamic(() => import("@/components/ProductZoomShowcase"));
const BestsellerProducts  = dynamic(() => import("@/components/BestsellerProducts"));
const FestivalBanner      = dynamic(() => import("@/components/FestivalBanner"));
const AuthenticityBanner  = dynamic(() => import("@/components/AuthenticityBanner"));
const EnergisationProcess = dynamic(() => import("@/components/EnergisationProcess"));
const IndramalaBanner     = dynamic(() => import("@/components/IndramalaBanner"));
const WhyChooseUs         = dynamic(() => import("@/components/WhyChooseUs"));
const GetInspired         = dynamic(() => import("@/components/GetInspired"));
const GuidanceBanner      = dynamic(() => import("@/components/GuidanceBanner"));
const BlogPosts           = dynamic(() => import("@/components/BlogPosts"));

export const metadata: Metadata = buildPageMetadata({
  title: "Rudraksha Antiquei | 100% Original Nepali Rudraksha & Certified Vedic Gemstones",
  description:
    "Buy 100% original, lab-certified Nepali Rudraksha beads (1-21 Mukhi), Vedic energized Siddha Malas, 108 Japa Malas & untreated gemstones. Consecrated with Prana Pratishtha rituals in Rishikesh.",
  path: "/",
  keywords: [
    "original nepali rudraksha",
    "certified rudraksha online",
    "buy rudraksha rishikesh",
    "siddha mala original price",
    "1 mukhi rudraksha original",
    "gauri shankar rudraksha",
    "untreated astrological gemstones",
    "108 japa mala",
  ],
});

export default async function Home() {
  const bestsellers = await getBestsellerProducts(8);
  const faqSchema = getFAQSchema(HOMEPAGE_FAQS);

  return (
    <div className="min-h-screen bg-cream">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <main>
        <HeroSection />
        <ShopByCategory />
        <WhoWeAre />
        <ShopByPurpose />
        <RudrakshaBirthForm />
        <ProductZoomShowcase />
        <BestsellerProducts products={bestsellers} />
        <FestivalBanner />
        <AuthenticityBanner />
        <EnergisationProcess />
        <IndramalaBanner />
        <WhyChooseUs />
        <GetInspired />
        <GuidanceBanner />
        <BlogPosts />
      </main>
    </div>
  );
}
