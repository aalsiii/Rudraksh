"use client";
import Image from "next/image";
import { useState } from "react";

const reviews = [
  {
    category: "5 MUKHI RUDRAKSHA",
    quote:
      "The Nepali 5 Mukhi bead has deeply defined natural grooves and reassuring physical weight. Wearing it has remarkably improved my focus during daily work and evening meditation.",
    name: "Rohan Verma",
    location: "Mumbai",
    rating: 5,
  },
  {
    category: "7 MUKHI RUDRAKSHA BRACELET",
    quote:
      "Crafted with durable elastic and pure silver caps. It feels sturdy, elegant, and spiritually uplifting. Knowing it was energized on the banks of Ganga gives me immense peace of mind.",
    name: "Priya Sundaram",
    location: "Chennai",
    rating: 5,
  },
  {
    category: "GEMSTONES",
    quote:
      "The unheated Yellow Sapphire (Pukhraj) arrived with an accredited gemological certificate. The natural color saturation and optical clarity are outstanding for authentic astrological wear.",
    name: "Arun Mathur",
    location: "Jaipur",
    rating: 5,
  },
  {
    category: "INDRAKSHI MALA",
    quote:
      "An extraordinary spiritual investment. Each bead from 1 to 14 Mukhi is meticulously arranged and consecrated. The serene aura in our meditation space is truly tangible.",
    name: "Meera Nambiar",
    location: "Delhi",
    rating: 5,
  },
  {
    category: "9 MUKHI RUDRAKSHA",
    quote:
      "Associated with Navdurga, this 9 Mukhi Nepali bead helped me navigate career transitions with newfound courage and grounded determination. The verification card gave complete confidence.",
    name: "James Holloway",
    location: "London",
    rating: 5,
  },
  {
    category: "PANCHMUKHI MALA",
    quote:
      "Traditional 108-bead japa mala with a strong Sumeru bead. Smooth between fingers, comfortable for daily mantra practice, and completely free of artificial chemical polishes.",
    name: "Ananya Krishnan",
    location: "Bangalore",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1.33L9.79 5.73L14.67 6.11L11.05 9.27L12.18 14.04L8 11.47L3.82 14.04L4.95 9.27L1.33 6.11L6.21 5.73L8 1.33Z"
            fill={i < count ? "#BB5A28" : "#E7E5E4"}
            stroke={i < count ? "#BB5A28" : "#E7E5E4"}
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ category, quote, name, location, rating }: typeof reviews[0]) {
  return (
    <div className="tpf-card">
      {/* Avatar */}
      <div style={{
        width: "60px", height: "60px", borderRadius: "50%",
        overflow: "hidden", position: "relative", flexShrink: 0,
      }}>
        <Image
          src="/assets/images/testimonial/client-avatar.png"
          alt={name}
          fill
          sizes="60px"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Category badge */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: "#BB5A28", flexShrink: 0,
        }} />
        <span className="font-lato" style={{
          fontSize: "12px", lineHeight: "140%",
          letterSpacing: "0.08em", color: "#BB5A28",
          textTransform: "uppercase" as const,
        }}>
          {category}
        </span>
      </div>

      {/* Quote */}
      <p className="font-lato tpf-quote">{quote}</p>

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "1px solid #E7E5E4", margin: 0 }} />

      {/* Name + Stars + Location */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="font-prata" style={{ fontSize: "18px", lineHeight: "130%", color: "#0B0404" }}>
            {name}
          </span>
          <Stars count={rating} />
        </div>
        <span className="font-lato" style={{ fontSize: "13px", lineHeight: "140%", color: "#BB5A28" }}>
          {location}
        </span>
      </div>
    </div>
  );
}

export default function TestimonialProductFeedback() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;
  const canPrev = startIndex > 0;
  const canNext = startIndex + visibleCount < reviews.length;

  const visible = reviews.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="tpf-section">
      {/* Header row: title left, arrows right */}
      <div className="tpf-header">
        <h2 className="font-prata tpf-title">Feedback on Specific Rudraksha &amp; Gemstones</h2>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexShrink: 0 }}>
          <button
            onClick={() => canPrev && setStartIndex(startIndex - 1)}
            aria-label="Previous"
            style={{
              width: "40px", height: "40px", borderRadius: "50%",
              border: "1px solid rgba(204,178,106,0.4)",
              background: "transparent", cursor: canPrev ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: canPrev ? 1 : 0.35, transition: "opacity 0.2s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M16.667 10H3.333M8.333 5l-5 5 5 5" stroke="#0B0404" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => canNext && setStartIndex(startIndex + 1)}
            aria-label="Next"
            style={{
              width: "40px", height: "40px", borderRadius: "50%",
              border: "none", background: "#552912",
              cursor: canNext ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: canNext ? 1 : 0.4, transition: "opacity 0.2s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M3.333 10h13.334M11.667 5l5 5-5 5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Cards row */}
      <div className="tpf-cards-row">
        {visible.map((r, i) => (
          <ReviewCard key={startIndex + i} {...r} />
        ))}
      </div>
    </section>
  );
}
