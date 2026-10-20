import type { Metadata } from "next";
import dynamic from "next/dynamic";
import EnergisationHero from "@/components/energisation/EnergisationHero";
import { buildPageMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";

const WhatWeMeanByEnergisation = dynamic(() => import("@/components/energisation/WhatWeMeanByEnergisation"));
const WhyEnergisationExists    = dynamic(() => import("@/components/energisation/WhyEnergisationExists"));
const WhenEnergisationIsRecommended = dynamic(() => import("@/components/energisation/WhenEnergisationIsRecommended"));
const OurEnergisationProcess   = dynamic(() => import("@/components/energisation/OurEnergisationProcess"));
const RudrakshaBirthForm       = dynamic(() => import("@/components/RudrakshaBirthForm"));
const WhatEnergisationDoesNot  = dynamic(() => import("@/components/energisation/WhatEnergisationDoesNot"));
const StillUnsure              = dynamic(() => import("@/components/energisation/StillUnsure"));
const ExperiencesSharedByCustomers = dynamic(() => import("@/components/energisation/ExperiencesSharedByCustomers"));
const ContinueWithClarity      = dynamic(() => import("@/components/energisation/ContinueWithClarity"));

export const metadata: Metadata = buildPageMetadata({
  title: "Vedic Rudraksha Energisation & Prana Pratishtha Ritual in Rishikesh",
  description:
    "Explore our authentic Vedic energisation process on the banks of Maa Ganga in Rishikesh. Discover how Prana Pratishtha, Panchamrit snan, and Beej Mantras awaken your Rudraksha.",
  path: "/energisation-process",
  keywords: [
    "rudraksha energisation process",
    "pran pratishtha rudraksha",
    "vedic consecration rishikesh",
    "how to energise rudraksha at home",
    "rudraksha beej mantra",
    "gangajal rudraksha cleansing",
  ],
});

const ENERGISATION_FAQS = [
  {
    question: "What is the Prana Pratishtha ritual for Rudraksha?",
    answer:
      "Prana Pratishtha is the ancient Vedic rite of infusing life-force energy into sacred articles. In our Rishikesh sanctum, Vedic pandits chant authentic Beej Mantras, perform Panchamrit snan, offer sacred bilva leaves and dhoop, and invoke the presiding devata.",
  },
  {
    question: "Do I have to re-energise my Rudraksha periodically?",
    answer:
      "While the initial consecration permanently establishes the bead's spiritual alignment, periodic cleansing on auspicious tithis (such as Maha Shivratri, Shravan Mondays, or Pradosh) with clean water and pure sandalwood oil rejuvenates its bio-magnetic vitality.",
  },
  {
    question: "Can I wear my Rudraksha immediately upon delivery?",
    answer:
      "Yes. Every piece requested with consecration arrives fully energized, cleansed, and sealed, ready to be worn immediately on an auspicious morning (preferably Monday or Thursday).",
  },
];

export default function EnergisationProcessPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Vedic Energisation Process", path: "/energisation-process" },
  ]);
  const faqSchema = getFAQSchema(ENERGISATION_FAQS);

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
      <EnergisationHero />
      <WhatWeMeanByEnergisation />
      <WhyEnergisationExists />
      <WhenEnergisationIsRecommended />
      <OurEnergisationProcess />
      <RudrakshaBirthForm />
      <WhatEnergisationDoesNot />
      <StillUnsure />
      <ExperiencesSharedByCustomers />
      <ContinueWithClarity />
    </div>
  );
}
