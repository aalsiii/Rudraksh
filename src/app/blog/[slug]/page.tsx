import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getBlogBySlug, getPopularBlogs, getRelatedBlogs } from "@/lib/blogs";
import { getRelatedProducts } from "@/lib/products";
import BlogArticle from "@/components/blog/BlogArticle";
import BlogSidebar from "@/components/blog/BlogSidebar";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { buildPageMetadata, getBreadcrumbSchema, cleanText, SITE_URL, SITE_NAME } from "@/lib/seo";

const BlogStillUnsure = dynamic(() => import("@/components/blog/BlogStillUnsure"));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: "Article Not Found" };

  const title = blog.metaTitle?.trim() || blog.title;
  const description = cleanText(blog.metaDescription?.trim() || blog.excerpt, 155);

  return buildPageMetadata({
    title,
    description,
    path: `/blog/${blog.slug}`,
    keywords: blog.tags.length > 0 ? blog.tags : ["rudraksha guide", "vedic astrology"],
    image: blog.coverImage || "/assets/images/og-default.webp",
    type: "article",
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const [relatedProducts, popularPosts, relatedPosts] = await Promise.all([
    getRelatedProducts(blog.categoryId, 3),
    getPopularBlogs(blog.id, 4),
    getRelatedBlogs(blog.id, blog.categoryId, 3),
  ]);

  const authorName = blog.authorUser?.name ?? blog.author ?? "Rudraksha Antiquei Acharyas";

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: blog.title, path: `/blog/${blog.slug}` },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: cleanText(blog.excerpt, 200),
    image: blog.coverImage ? [blog.coverImage] : [`${SITE_URL}/assets/images/og-default.webp`],
    datePublished: blog.publishedAt?.toISOString(),
    dateModified: blog.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/images/common/logo-25e94a.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${blog.slug}`,
    },
  };

  return (
    <div style={{ background: "#FEF9F2" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="h-px-section py-10 lg:py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-10 lg:gap-14 items-start">
          <BlogArticle
            title={blog.title}
            excerpt={blog.excerpt}
            coverImage={blog.coverImage}
            coverImageAlt={blog.coverImageAlt}
            author={authorName}
            publishedAt={blog.publishedAt}
            readTimeMinutes={blog.readTimeMinutes}
            body={blog.body}
            category={blog.category}
          />
          <BlogSidebar relatedProducts={relatedProducts} popularPosts={popularPosts} />
        </div>
      </div>

      <RelatedArticles posts={relatedPosts} />
      <BlogStillUnsure />
    </div>
  );
}
