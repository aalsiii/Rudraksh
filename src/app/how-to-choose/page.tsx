import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HowToChooseHero from "@/components/how-to-choose/HowToChooseHero";
import { buildPageMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";

const HowToChooseAuthenticityTransparency = dynamic(() => import("@/components/how-to-choose/HowToChooseAuthenticityTransparency"));
const HowToChooseConfusion = dynamic(() => import("@/components/how-to-choose/HowToChooseConfusion"));
const HowToChooseExploreByPurpose = dynamic(() => import("@/components/how-to-choose/HowToChooseExploreByPurpose"));
const HowToChooseGuidanceBanner = dynamic(() => import("@/components/how-to-choose/HowToChooseGuidanceBanner"));
const HowToChooseIsThisRight = dynamic(() => import("@/components/how-to-choose/HowToChooseIsThisRight"));
const HowToChoosePhilosophy = dynamic(() => import("@/components/how-to-choose/HowToChoosePhilosophy"));
const HowToChooseSteps = dynamic(() => import("@/components/how-to-choose/HowToChooseSteps"));
const HowToChooseStillUnsure = dynamic(() => import("@/components/how-to-choose/HowToChooseStillUnsure"));
const HowToChooseWhenNotToBuy = dynamic(() => import("@/components/how-to-choose/HowToChooseWhenNotToBuy"));

export const metadata: Metadata = buildPageMetadata({
  title: "How to Choose the Right Rudraksha | By Birth Chart, Rashi & Intention",
  description:
    "Comprehensive guide on selecting the ideal Rudraksha mukhi and combination. Learn how to choose based on Vedic astrology, date of birth, chakra alignment, and personal goals.",
  path: "/how-to-choose",
  keywords: [
    "how to choose rudraksha",
    "which rudraksha to wear",
    "rudraksha according to rashi",
    "rudraksha by date of birth",
    "rudraksha mukhi selection guide",
    "rudraksha chakra alignment",
  ],
});

const HOW_TO_CHOOSE_FAQS = [
  {
    question: "Can I wear multiple Mukhi Rudrakshas together?",
    answer:
      "Yes. According to Vedic scriptures, different Mukhis complement each other and form synergistic combinations. Combinations like the Siddha Mala (1 to 14 Mukhi) or purpose-built Kavach sets are specifically assembled to harmonize all nine planetary influences and seven chakras.",
  },
  {
    question: "Should I select Rudraksha based on Rashi or personal intention?",
    answer:
      "Both approaches are valid. Rashi-based selection balances ruling planetary afflictions (Graha Dosha), while intention-based selection (such as focus, health, or spiritual growth) leverages the specific deity resonance of the mukhi.",
  },
  {
    question: "Can children and students wear Rudraksha?",
    answer:
      "Yes. 4 Mukhi (governed by Lord Brahma) and 6 Mukhi (governed by Lord Kartikeya) are traditionally recommended for students to enhance memory retention, vocal articulation, and intellectual focus.",
  },
];

export default function HowToChoosePage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "How to Choose Your Rudraksha", path: "/how-to-choose" },
  ]);
  const faqSchema = getFAQSchema(HOW_TO_CHOOSE_FAQS);

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
      <HowToChooseHero />
      <HowToChooseConfusion />
      <HowToChooseIsThisRight />
      <HowToChooseWhenNotToBuy />
      <HowToChoosePhilosophy />
      <HowToChooseStillUnsure />
      <HowToChooseSteps />
      <HowToChooseExploreByPurpose />
      <HowToChooseGuidanceBanner />
      <HowToChooseAuthenticityTransparency />
    </div>
  );
}
