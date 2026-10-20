import Image from "next/image";

type Card = {
  title: string;
  subtitle: string;
  titleColor: "brown" | "dark";
  bg: "white" | "cream";
  image: string;
};

const column1: Card[] = [
  {
    title: "Benefits",
    subtitle: "Cultivates inner balance, mental clarity, and shields against daily bio-energetic stress.",
    titleColor: "brown",
    bg: "white",
    image: "/assets/images/home/beads.png",
  },
  {
    title: "X-ray",
    subtitle: "Verified through non-destructive radiography to confirm internal seed chambers and natural lines.",
    titleColor: "dark",
    bg: "cream",
    image: "/assets/images/about/about-founding-2.png",
  },
];

const column2: Card[] = [
  {
    title: "Quality & Size",
    subtitle: "Precision-measured for millimeter diameter, natural density, and high-altitude Himalayan maturity.",
    titleColor: "dark",
    bg: "cream",
    image: "/assets/images/about/about-founding-1.png",
  },
  {
    title: "Who Should Wear",
    subtitle: "Open to all seekers regardless of age, gender, or background—aligned with personal intention.",
    titleColor: "brown",
    bg: "white",
    image: "/assets/images/home/rudraksh.png",
  },
];

const column3: Card[] = [
  {
    title: "Certification",
    subtitle: "Documented gemological verification card detailing botanical authenticity, mukhis, and origin.",
    titleColor: "brown",
    bg: "white",
    image: "/assets/images/products/category-bracelets.png",
  },
  {
    title: "Beej Mantra",
    subtitle: "Sanctified with traditional Vedic Beej Mantras and Gangajal abhishek before dispatch from Rishikesh.",
    titleColor: "dark",
    bg: "cream",
    image: "/assets/images/products/category-necklace.png",
  },
];

function JourneyCard({ title, subtitle, titleColor, bg, image }: Card) {
  return (
    <div
      className={`border border-[#E8C9A8] px-6 py-10 lg:py-12 flex flex-col items-center text-center gap-5 ${
        bg === "white" ? "bg-white" : "bg-[#FBEEDD]"
      }`}
    >
      <h3 className={`font-prata text-xl font-normal m-0 ${titleColor === "brown" ? "text-brown" : "text-dark"}`}>
        {title}
      </h3>
      <div className="relative w-[110px] h-[110px] rounded-full overflow-hidden shrink-0">
        <Image src={image} alt={title} fill sizes="110px" className="object-cover" />
      </div>
      <p className="font-lato text-sm text-gray-text m-0 leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}

export default function JourneyHighlights() {
  return (
    <section className="h-px-section py-14 lg:py-20" style={{ background: "#FEF9F2" }}>
      <h2 className="font-prata text-3xl lg:text-[36px] font-normal text-dark text-center m-0 mb-16 lg:mb-24">
        Begin Your Journey with Our Reliable Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start max-w-[820px] mx-auto">
        <div className="flex flex-col gap-6 lg:gap-8">
          {column1.map((c) => (
            <JourneyCard key={c.title} {...c} />
          ))}
        </div>

        <div className="flex flex-col gap-6 lg:gap-8 md:-mt-16">
          {column2.map((c) => (
            <JourneyCard key={c.title} {...c} />
          ))}
        </div>

        <div className="flex flex-col gap-6 lg:gap-8">
          {column3.map((c) => (
            <JourneyCard key={c.title} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
