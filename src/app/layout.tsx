import type { Metadata } from "next";
import { Lato, Prata } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import GoogleOneTap from "@/components/auth/GoogleOneTap";
import CurrencyProvider from "@/components/CurrencyProvider";
import CartProvider from "@/components/CartProvider";
import WishlistProvider from "@/components/WishlistProvider";
import WhatsAppButton from "@/components/WhatsAppButton";

const lato = Lato({
  variable: "--lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const prata = Prata({
  variable: "--prata",
  subsets: ["latin"],
  weight: "400",
});



import { getOrganizationSchema, getWebSiteSchema, SITE_URL, PRIMARY_KEYWORDS } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Rudraksha Antiquei",
    default: "Rudraksha Antiquei | 100% Original Nepali Rudraksha & Certified Vedic Gemstones",
  },
  description:
    "Buy 100% original, lab-certified Nepali Rudraksha beads (1-21 Mukhi), Vedic energized Siddha Malas, 108 Japa Malas, and untreated astrological gemstones. Consecrated with authentic Prana Pratishtha rituals in Rishikesh.",
  keywords: PRIMARY_KEYWORDS,
  authors: [{ name: "Rudraksha Antiquei", url: SITE_URL }],
  creator: "Rudraksha Antiquei",
  publisher: "Rudraksha Antiquei",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Rudraksha Antiquei",
    title: "Rudraksha Antiquei | 100% Original Nepali Rudraksha & Certified Vedic Gemstones",
    description:
      "Buy 100% original, lab-certified Nepali Rudraksha beads, Vedic energized Siddha Malas, and untreated gemstones. Consecrated on the banks of Ganga in Rishikesh.",
    images: [
      {
        url: "/assets/images/og-default.webp",
        width: 1200,
        height: 630,
        alt: "Rudraksha Antiquei - Original Nepali Rudraksha & Vedic Gemstones Store in Rishikesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rudraksha Antiquei | 100% Original Nepali Rudraksha & Certified Vedic Gemstones",
    description:
      "Buy 100% original, lab-certified Nepali Rudraksha beads, Vedic energized Siddha Malas, and untreated gemstones. Consecrated in Rishikesh.",
    images: ["/assets/images/og-default.webp"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <html
      lang="en"
      className={`${lato.variable} ${prata.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <SessionProviderWrapper>
          <CurrencyProvider>
            <CartProvider>
              <WishlistProvider>
                <GoogleOneTap />
                <Header />
                <div style={{ paddingTop: "72px" }}>{children}</div>
                <Footer />
                <WhatsAppButton />
              </WishlistProvider>
            </CartProvider>
          </CurrencyProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}

