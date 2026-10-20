import type { Metadata } from "next";
import dynamic from "next/dynamic";
import BlogHero from "@/components/blog/BlogHero";
import { getBlogsPaginated, getBlogCategories } from "@/lib/blogs";
import { buildPageMetadata, getBreadcrumbSchema, SITE_URL } from "@/lib/seo";

const BlogListing = dynamic(() => import("@/components/blog/BlogListing"));
const BlogStillUnsure = dynamic(() => import("@/components/blog/BlogStillUnsure"));

export const metadata: Metadata = buildPageMetadata({
  title: "Vedic Wisdom Blog & Rudraksha Knowledge Base | Rudraksha Antiquei",
  description:
    "Explore authoritative articles on Rudraksha identification, Vedic astrological benefits of mukhis, gemstone wearing rules, and sacred Himalayan rituals.",
  path: "/blog",
  keywords: [
    "rudraksha blog",
    "vedic astrology articles",
    "rudraksha mukhi benefits guide",
    "how to wear rudraksha rules",
    "gemstone astrological guidance",
  ],
});

export default async function BlogPage() {
  const [{ posts, total }, categories] = await Promise.all([
    getBlogsPaginated({ skip: 0, take: 10 }),
    getBlogCategories(),
  ]);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Vedic Knowledge Base", path: "/blog" },
  ]);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Rudraksha Antiquei Vedic Wisdom & Knowledge Base",
    url: `${SITE_URL}/blog`,
    description:
      "Articles, identification guides, and scriptural insights on authentic Rudraksha beads, Vedic gemstones, and sacred spiritual practices.",
  };

  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogHero />
      <BlogListing initialPosts={posts} initialTotal={total} categories={categories} />
      <BlogStillUnsure />
    </div>
  );
}
