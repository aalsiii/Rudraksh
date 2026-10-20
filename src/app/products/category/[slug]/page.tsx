import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import CategoryDisabledView from "@/components/products/CategoryDisabledView";
import { getCategoryWithSubcategories, getPageContent, getCategories, getCategoryBySlug } from "@/lib/products";
import ProductsHero from "@/components/products/ProductsHero";
import CategoryIntro from "@/components/products/CategoryIntro";
import SubcategoryGrid from "@/components/products/SubcategoryGrid";
import SubcategoryProductListing from "@/components/products/SubcategoryProductListing";
import { computeFacets, filterProducts, parseFilters, getPriceBounds } from "@/lib/product-utils";
import { buildPageMetadata, getBreadcrumbSchema, getFAQSchema, cleanText } from "@/lib/seo";

const VerificationChecklist = dynamic(() => import("@/components/products/VerificationChecklist"));
const CategoryFitCheck = dynamic(() => import("@/components/products/CategoryFitCheck"));
const JourneyHighlights = dynamic(() => import("@/components/products/JourneyHighlights"));
const GetMoreInsights = dynamic(() => import("@/components/products/GetMoreInsights"));
const ProductsFAQ = dynamic(() => import("@/components/products/ProductsFAQ"));
const BlogStillUnsure = dynamic(() => import("@/components/blog/BlogStillUnsure"));

const CATEGORY_FAQS = [
  {
    question: "Are all items in this collection lab-certified and natural?",
    answer:
      "Yes. Every single item listed in this collection is 100% natural, physically verified, and backed by independent gemological certification confirming authenticity, material purity, and origin.",
  },
  {
    question: "Can I get my order consecrated with Vedic Prana Pratishtha?",
    answer:
      "Yes. All items can be consecrated in our Rishikesh ashram by experienced Vedic pandits with traditional Gangajal abhishek, Vedic mantras, and personalized intention sanctification before dispatch.",
  },
  {
    question: "How do I choose the most suitable piece for my intention?",
    answer:
      "Review our detailed Category Fit-Check and subcategory breakdown below. For customized Vedic astrological guidance based on your birth date and planetary alignment, you can also consult our resident experts.",
  },
  {
    question: "What is your return and dispatch policy?",
    answer:
      "Orders are dispatched within 24-48 business hours via insured express courier. We provide a 30-day return policy on non-customized, un-energized items with complete authenticity cards.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug).replace(/\s+/g, "-");
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  const pageContent = getPageContent(category);
  const title = pageContent?.heroTitle
    ? `${pageContent.heroTitle} | Buy Online`
    : `Authentic ${category.name} | Lab Certified & Energized`;

  const description = cleanText(
    pageContent?.heroSubtitle ||
      pageContent?.introDescription ||
      `Explore our certified ${category.name} collection at Rudraksha Antiquei. Sourced with Himalayan integrity, tested for genuineness, and consecrated in Rishikesh.`
  );

  return buildPageMetadata({
    title,
    description,
    path: `/products/category/${category.slug}`,
    keywords: [
      category.name.toLowerCase(),
      `buy ${category.name.toLowerCase()} online`,
      `original ${category.name.toLowerCase()}`,
      `certified ${category.name.toLowerCase()}`,
      `${category.name.toLowerCase()} rishikesh`,
      `${category.name.toLowerCase()} benefits`,
    ],
    image: category.bannerImage || category.image,
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug: rawSlug } = await params;
  const sp = await searchParams;
  const slug = decodeURIComponent(rawSlug).replace(/\s+/g, "-");
  const category = await getCategoryWithSubcategories(slug);

  if (!category) {
    notFound();
  }

  if (category.isActive === false) {
    const allCategories = await getCategories();
    const activeAlternatives = allCategories.filter(
      (c) => c.slug !== category.slug && (c.isActive ?? true)
    );
    return (
      <CategoryDisabledView
        categoryName={category.name}
        categoryImage={category.image}
        otherCategories={activeAlternatives}
      />
    );
  }

  const pageContent = getPageContent(category);
  const isDirectListing =
    category.displayType === "PRODUCT_LISTING" ||
    (category.subcategories && category.subcategories.length === 0);

  const allProducts = isDirectListing
    ? await import("@/lib/products").then((m) =>
        m.getProductsByCategory(category.slug)
      )
    : [];

  const filters = parseFilters(sp);
  const facets = computeFacets(allProducts);
  const filtered = filterProducts(allProducts, filters);
  const priceBounds = getPriceBounds(allProducts);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: category.name, path: `/products/category/${category.slug}` },
  ];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: pageContent?.heroSubtitle || pageContent?.introDescription,
    url: `/products/category/${category.slug}`,
    image: category.bannerImage || category.image,
  };

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const faqSchema = getFAQSchema(CATEGORY_FAQS);

  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ProductsHero pageContent={pageContent} bannerImage={category.bannerImage} />
      <CategoryIntro pageContent={pageContent} fallbackImage={category.image} />
      {isDirectListing ? (
        <SubcategoryProductListing
          products={filtered}
          facets={facets}
          priceBounds={priceBounds}
        />
      ) : (
        <SubcategoryGrid
          categorySlug={category.slug}
          categoryName={category.name}
          subcategories={category.subcategories}
        />
      )}
      <VerificationChecklist pageContent={pageContent} />
      <CategoryFitCheck pageContent={pageContent} />
      <JourneyHighlights />
      <GetMoreInsights categoryId={category.id} />
      <ProductsFAQ />
      <BlogStillUnsure />
    </div>
  );
}
