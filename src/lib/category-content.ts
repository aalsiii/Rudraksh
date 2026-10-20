import type { CategoryPageContent } from "@/lib/product-utils";

// The editable subset of pageContent exposed in the admin category form.
// The four copy fields are optional — when the admin leaves them blank we
// generate readable defaults from the category name (see defaultCopy).
export type CategoryContentInput = {
  name: string;
  image: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroBanner?: string;
  introHeading?: string;
  introDescription?: string;
};

const DEFAULT_CHECKLIST_IMAGES: [string, string] = [
  "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790884867/rudraksh/verification/rudraksha-branch-authenticity.webp",
  "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790884868/rudraksh/verification/rudraksha-palm-authenticity.webp",
];

// Category-specific rich SEO copy mapping to ensure high topical search rankings.
const CATEGORY_SEO_COPY: Record<
  string,
  { heroTitle: string; heroSubtitle: string; introHeading: string; introDescription: string }
> = {
  rudraksha: {
    heroTitle: "100% Original Nepali Rudraksha Beads (1 to 21 Mukhi)",
    heroSubtitle:
      "Authentic Nepali and Java Rudraksha beads, individually examined and verified through non-destructive X-ray radiography. Consecrated with sacred Prana Pratishtha rituals in Rishikesh.",
    introHeading: "Original Nepali & Indonesian Rudraksha",
    introDescription:
      "Explore rare 1 to 21 Mukhi Rudraksha, Gauri Shankar, and Trijuti beads. Each specimen is certified for botanical purity, natural seed compartments, and electromagnetic resonance to support your spiritual growth.",
  },
  "siddha-mala": {
    heroTitle: "Authentic Vedic Siddha Mala (1 to 14 Mukhi)",
    heroSubtitle:
      "The supreme spiritual garland combining 1 to 14 Mukhi Rudraksha beads with Gauri Shankar and Ganesh beads. Strung with sacred intention and consecrated for complete chakra and planetary harmony.",
    introHeading: "Vedic Siddha Mala & Indramala Collection",
    introDescription:
      "A Siddha Mala is the most powerful combination in Vedic sacred literature. Carefully balanced to awaken all seven primary chakras and pacify Navagraha planetary influences.",
  },
  "japa-mala": {
    heroTitle: "Sacred 108 Japa Malas for Meditation & Mantra Chanting",
    heroSubtitle:
      "Hand-knotted 108+1 bead malas crafted in original Nepali Rudraksha, sacred Vrindavan Tulsi, white sandalwood, pure crystal quartz (Sphatik), and kamal gatta lotus seeds.",
    introHeading: "Authentic 108-Bead Japa & Meditation Malas",
    introDescription:
      "Knotted with traditional Sumeru guru beads for smooth fingering and durability. Perfect for daily mantra repetition (Japa), mindfulness, and spiritual devotion.",
  },
  bracelets: {
    heroTitle: "Consecrated Rudraksha & Natural Gemstone Bracelets",
    heroSubtitle:
      "Handcrafted single-mukhi, multi-mukhi, and seven chakra gemstone wrist malas. Cleansed and energized with Vedic mantras for continuous energetic protection and balance.",
    introHeading: "Spiritual Wrist Malas & Chakra Healing Bracelets",
    introDescription:
      "Keep sacred Himalayan frequencies close throughout your day. Choose from authentic Nepali Rudraksha beads paired with natural healing crystals, lava stone, and silver accents.",
  },
  gemstones: {
    heroTitle: "100% Natural Astrological Gemstones (Navaratna)",
    heroSubtitle:
      "Unheated, untreated natural gemstones selected for Vedic astrological efficacy. Certified by premier gemological laboratories for Jyotish planetary remedy.",
    introHeading: "Certified Untreated Astrological Gemstones",
    introDescription:
      "Explore natural Yellow Sapphire (Pukhraj), Blue Sapphire (Neelam), Ruby (Manik), Emerald (Panna), and Hessonite (Gomed). Mined with integrity and energized for planetary alignment.",
  },
  "rudraksha-kavach": {
    heroTitle: "Vedic Rudraksha Kavach for Protection, Wealth & Health",
    heroSubtitle:
      "Custom combinations designed around specific life intentions—combining synergistic Mukhis to activate prosperity, shield against negativity, and foster vitality.",
    introHeading: "Purpose-Built Rudraksha Kavach Combinations",
    introDescription:
      "Formulated according to ancient texts to direct focused electromagnetic energy toward health, career success, spiritual awakening, and personal protection.",
  },
  "antique-collection": {
    heroTitle: "Handcrafted Spiritual Antiques & Sacred Artifacts",
    heroSubtitle:
      "Artisan-carved stone deities, bronze and brass murtis, and collector-grade crystal artifacts handcrafted by traditional Indian master sculptors.",
    introHeading: "Sacred Antiques & Vedic Collectibles",
    introDescription:
      "Bring timeless Himalayan devotion into your puja altar and home sanctuary with one-of-a-kind heritage pieces finished with spiritual reverence.",
  },
  "sphatik-collection": {
    heroTitle: "Pure Sphatik (Natural Crystal Quartz) Malas & Shivlings",
    heroSubtitle:
      "Flawless natural Himalayan quartz malas, shivlings, and shree yantras—revered for their soothing cooling energy, high clarity, and aura purification.",
    introHeading: "Original Sphatik (Quartz Crystal) Collection",
    introDescription:
      "Experience the clarity and serenity of natural rock crystal quartz. 100% natural, unheated, and tested for optical purity and high vibrational resonance.",
  },
  "shree-yantra-shivling": {
    heroTitle: "Consecrated Shree Yantra & Narmada Stone Shivlings",
    heroSubtitle:
      "Mathematically precise Meru Shree Yantras and sacred self-manifested Narmadeshwar Shivlings for daily home worship, abundance, and divine presence.",
    introHeading: "Sacred Yantras & Sanctified Shivlings",
    introDescription:
      "The Shree Yantra is celebrated in the Tantras as the pinnacle of geometric abundance, while the holy Shivling anchors peace and spiritual devotion.",
  },
  "shankh-collection": {
    heroTitle: "Sacred Puja Shankhs (Dakshinavarti & Vamavarti Conches)",
    heroSubtitle:
      "Natural sea-harvested conch shells including rare Dakshinavarti (right-handed) and Lakshmi shankhs for sacred bathing rituals, sound sanctification, and altar placement.",
    introHeading: "Authentic Vedic Shankh (Conch Shell) Collection",
    introDescription:
      "Every conch shell is verified for natural spiral geometry, resonant blowing acoustics, and immaculate shell surface integrity.",
  },
};

// Landing-page copy generated from the category name alone with keyword richness.
export function defaultCopy(name: string) {
  const trimmed = name.trim() || "This Collection";
  const slugKey = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  if (CATEGORY_SEO_COPY[slugKey]) {
    return CATEGORY_SEO_COPY[slugKey];
  }

  return {
    heroTitle: `Authentic ${trimmed} | Lab-Certified & Energized in Rishikesh`,
    heroSubtitle: `Every ${trimmed} piece listed here is physically examined, scientifically verified, and consecrated with traditional Vedic rituals on the banks of Ganga.`,
    introHeading: `Certified ${trimmed} Collection`,
    introDescription: `Explore our premium ${trimmed.toLowerCase()} collection, ethically sourced and quality-checked with complete transparency and documented authenticity.`,
  };
}

// Builds a complete CategoryPageContent from the handful of fields the admin
// edits, merging over any existing content so unedited sections (checklist,
// fit-check, explore designs) are preserved on update.
export function buildPageContent(
  input: CategoryContentInput,
  existing?: Partial<CategoryPageContent>
): CategoryPageContent {
  const fallback = defaultCopy(input.name);

  return {
    heroTitle: input.heroTitle ?? existing?.heroTitle ?? fallback.heroTitle,
    heroSubtitle: input.heroSubtitle ?? existing?.heroSubtitle ?? fallback.heroSubtitle,
    heroBanner: input.heroBanner ?? existing?.heroBanner,
    introHeading: input.introHeading ?? existing?.introHeading ?? fallback.introHeading,
    introDescription:
      input.introDescription ?? existing?.introDescription ?? fallback.introDescription,
    introImage: input.image,
    checklistHeading: existing?.checklistHeading ?? `Every ${input.name} Item You See Here Is`,
    checklist:
      existing?.checklist ?? [
        "Physically examined for authenticity and finish",
        "Sourced from trusted, traditional suppliers",
        "Quality-checked before it is listed",
        "Provided with certification where applicable",
        "Final-checked and cleansed before dispatch",
      ],
    checklistImages: existing?.checklistImages ?? DEFAULT_CHECKLIST_IMAGES,
    fitCheckRightLabel: existing?.fitCheckRightLabel ?? `${input.name} May Be Right for You If:`,
    fitCheckRightItems:
      existing?.fitCheckRightItems ?? [
        "You value authenticity over appearance",
        "You're seeking spiritual grounding and traditional guidance",
        "You want honest information, not exaggerated claims",
      ],
    fitCheckWrongLabel: existing?.fitCheckWrongLabel ?? `${input.name} May Not Be Right for You If:`,
    fitCheckWrongItems:
      existing?.fitCheckWrongItems ?? [
        "You're looking for instant or guaranteed outcomes",
        "You prefer purely decorative pieces with no context",
        "You're unsure and don't want any guidance",
      ],
    fitCheckImage: existing?.fitCheckImage ?? input.image,
    exploreDesigns:
      existing?.exploreDesigns ?? {
        heading: "Explore Our Collection",
        description: `Browse the different types of ${input.name.toLowerCase()} available, each verified and cared for the same way.`,
        items: [
          { title: "Traditional", description: "Classic forms for regular spiritual use.", image: input.image },
          { title: "Everyday", description: "Comfortable, ready-to-wear or ready-to-place pieces.", image: input.image },
          { title: "Premium", description: "Higher-grade selections for collectors and gifting.", image: input.image },
          { title: "Energized", description: "Cleansed and energized on request before dispatch.", image: input.image },
        ],
      },
  };
}
