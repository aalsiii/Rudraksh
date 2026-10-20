import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // Fetch all active products
  const products = await prisma.product.findMany({
    select: { slug: true, updatedAt: true },
  });

  // Fetch all published blog posts
  const posts = await prisma.blog.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true },
  });

  // Define static core routes
  const routes = [
    "",
    "/about",
    "/products",
    "/blog",
    "/consultation",
    "/contact",
    "/energisation-process",
    "/how-to-choose",
    "/authenticity",
    "/testimonial",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Fetch all active categories & subcategories
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    select: {
      slug: true,
      subcategories: {
        select: { slug: true },
      },
    },
  });

  // Map category routes
  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/products/category/${cat.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Map subcategory routes
  const subcategoryRoutes = categories.flatMap((cat) =>
    cat.subcategories.map((sub) => ({
      url: `${baseUrl}/products/category/${cat.slug}/${sub.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }))
  );

  // Map product routes
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt.toISOString(),
    changeFrequency: "daily" as const,
    priority: 0.95,
  }));

  // Map blog routes
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt.toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...routes, ...categoryRoutes, ...subcategoryRoutes, ...productRoutes, ...blogRoutes];
}
