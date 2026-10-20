import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.rudrakshaantiquei.com");

export const SITE_NAME = "Rudraksha Antiquei";
export const STORE_LEGAL_NAME = "Rudraksha Antiquei Spiritual Arts & Gemology";
export const STORE_DESCRIPTION =
  "India's premier destination for 100% original, lab-certified Nepali Rudraksha beads, Vedic energized Siddha Malas, natural untreated astrological gemstones, and handcrafted sacred artifacts. Consecrated with authentic Prana Pratishtha rituals on the holy banks of Ganga in Rishikesh.";

export const STORE_CONTACT = {
  phone: "+91 95573 66978",
  altPhone: "+91 93894 03190",
  email: "support@rudrakshaantiquie.com",
  streetAddress: "Near Lakshman Jhula, Tapovan",
  addressLocality: "Rishikesh",
  addressRegion: "Uttarakhand",
  postalCode: "249192",
  addressCountry: "IN",
  latitude: 30.0869,
  longitude: 78.2611,
  openingHours: "Mo-Sa 10:00-18:00",
};

export const SOCIAL_PROFILES = [
  "https://www.instagram.com/rudrakshaantiquei",
  "https://www.facebook.com/share/1Ec8zZJbo8/",
  "https://youtube.com/@_lifechangingbeads",
];

export const PRIMARY_KEYWORDS = [
  "original nepali rudraksha",
  "certified rudraksha beads",
  "buy rudraksha online",
  "1 to 21 mukhi rudraksha",
  "siddha mala original",
  "gauri shankar rudraksha",
  "japa mala 108 beads",
  "vedic astrological gemstones",
  "lab certified gemstones",
  "rudraksha rishikesh",
  "authentic sphatik mala",
  "pran pratishtha energized rudraksha",
  "trijuti rudraksha price",
  "rudraksha kavach",
  "shree yantra original",
];

/**
 * Strips HTML tags and normalizes whitespace for meta descriptions.
 */
export function cleanText(input?: string | null, maxLength = 160): string {
  if (!input) return "";
  const plain = input
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= maxLength) return plain;
  return plain.substring(0, maxLength).trimEnd() + "...";
}

/**
 * Builds standard, clean OpenGraph & Twitter meta tags with canonical URL.
 */
export function buildPageMetadata({
  title,
  description,
  path = "",
  keywords = [],
  image = "/assets/images/og-default.webp",
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const absoluteImage = image.startsWith("http") ? image : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const cleanedDesc = cleanText(description, 160);
  const combinedKeywords = Array.from(new Set([...keywords, ...PRIMARY_KEYWORDS])).slice(0, 20);

  return {
    title: fullTitle,
    description: cleanedDesc,
    keywords: combinedKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: cleanedDesc,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: cleanedDesc,
      images: [absoluteImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Organization + LocalBusiness Schema (Rishikesh Store)
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: STORE_LEGAL_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/images/common/logo-25e94a.png`,
    image: `${SITE_URL}/assets/images/og-default.webp`,
    description: STORE_DESCRIPTION,
    telephone: STORE_CONTACT.phone,
    email: STORE_CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: STORE_CONTACT.streetAddress,
      addressLocality: STORE_CONTACT.addressLocality,
      addressRegion: STORE_CONTACT.addressRegion,
      postalCode: STORE_CONTACT.postalCode,
      addressCountry: STORE_CONTACT.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: STORE_CONTACT.latitude,
      longitude: STORE_CONTACT.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "18:00",
      },
    ],
    priceRange: "₹₹₹",
    currenciesAccepted: "INR, USD, EUR, GBP",
    paymentAccepted: "Credit Card, Debit Card, UPI, Net Banking, Razorpay",
    sameAs: SOCIAL_PROFILES,
  };
}

/**
 * WebSite schema with Sitelinks SearchBox
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: STORE_DESCRIPTION,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export const HOMEPAGE_FAQS = [
  {
    question: "How can I verify if a Rudraksha bead is 100% original and natural?",
    answer:
      "Authentic Rudraksha beads are evaluated through rigorous scientific and gemological tests rather than folklore tests like floating or water sinking. At Rudraksha Antiquei, every bead undergoes non-destructive X-ray examination (radiography) to verify internal seed chambers and natural compartment anatomy. We provide independent laboratory certificates with every bead detailing origin, mukhi count, dimensions, and natural line structure.",
  },
  {
    question: "What is the difference between Nepali and Indonesian (Java) Rudraksha?",
    answer:
      "Nepali Rudraksha beads are noticeably larger (typically 18mm to 30mm+), possess deeply grooved, well-defined mukhi lines (clefts), and feature robust internal compartments with higher biomagnetic potency. Indonesian (Java) beads are smaller (typically 4mm to 12mm), have smoother surfaces, and are ideal for lightweight malas and daily wrist bracelets. While both are spiritually potent, Nepali beads are traditionally favored for primary individual mukhis and Siddha Malas.",
  },
  {
    question: "What is Vedic Energisation (Prana Pratishtha) and why is it essential?",
    answer:
      "A raw Rudraksha is a seed of nature; Prana Pratishtha is the sacred Vedic consecration ritual that aligns its bio-electric resonance with the wearer. In our Rishikesh ashram on the banks of Ganga, revered Vedic pandits cleanse each bead with Panchamrit and Gangajal, recite seed Beej Mantras, perform directional Nyasa, and invoke the presiding deity. This ensures your Rudraksha is spiritually awake and attuned before you wear it.",
  },
  {
    question: "Which Rudraksha mukhi should I wear, and can anyone wear it without restrictions?",
    answer:
      "According to ancient scriptures including the Shiva Purana and Padma Purana, anyone regardless of gender, age, caste, or religious background can wear Rudraksha. For general well-being and daily protection, 5 Mukhi is universally beneficial. For specific aspirations—such as leadership (1 & 12 Mukhi), career focus (4, 6 & 10 Mukhi), wealth (7 & 8 Mukhi), or marital harmony (Gauri Shankar)—our Vedic astrologers provide free birth-chart consultations to match your Janma Rashi and planetary periods.",
  },
  {
    question: "Are your gemstones natural, untreated, and suitable for Vedic astrology?",
    answer:
      "Yes. Vedic astrology strictly requires unheated, untreated (non-diffused, non-glass filled) natural gemstones to transmit planetary rays effectively. Every gemstone at Rudraksha Antiquei is 100% natural, ethically mined, and accompanied by a recognized gemological laboratory testing certificate confirming its physical origin, refractive index, specific gravity, and lack of thermal treatment.",
  },
  {
    question: "How should I care for, cleanse, and maintain my Rudraksha over time?",
    answer:
      "Rudraksha beads are organic seeds that thrive on regular nourishment. Wash your beads periodically in clean water, gently clean the grooves with a soft-bristled brush, allow them to air dry, and lightly condition them with natural pure sandalwood, olive, or almond oil. Avoid exposing beads to chemical soaps, shampoos, or chlorine pools, as harsh surfactants dry out natural seed fibers.",
  },
];

/**
 * BreadcrumbList Schema Generator
 */
export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}

/**
 * FAQPage Schema Generator
 */
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  if (!Array.isArray(faqs) || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
