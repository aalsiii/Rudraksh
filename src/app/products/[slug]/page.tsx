import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getProductBySlug, getSimilarProducts } from "@/lib/products";
import ProductDetailMain from "@/components/products/detail/ProductDetailMain";

const ProductReviews = dynamic(
  () => import("@/components/products/detail/ProductReviews"),
);
const TraditionalSupport = dynamic(
  () => import("@/components/products/detail/TraditionalSupport"),
);
const IsThisRightForYou = dynamic(
  () => import("@/components/products/detail/IsThisRightForYou"),
);
const AuthenticityCertification = dynamic(
  () => import("@/components/products/detail/AuthenticityCertification"),
);
const ProductVideoSection = dynamic(
  () => import("@/components/products/detail/ProductVideoSection"),
);
const OriginSourcing = dynamic(
  () => import("@/components/products/detail/OriginSourcing"),
);
const HowToWearCare = dynamic(
  () => import("@/components/products/detail/HowToWearCare"),
);
const NeedGuidance = dynamic(
  () => import("@/components/products/detail/NeedGuidance"),
);
const ExpertRecommendedCombinations = dynamic(
  () => import("@/components/products/detail/ExpertRecommendedCombinations"),
);
const ProductFAQ = dynamic(
  () => import("@/components/products/detail/ProductFAQ"),
);
const SimilarProducts = dynamic(
  () => import("@/components/products/detail/SimilarProducts"),
);

import { Metadata } from "next";
import { buildPageMetadata, cleanText, getBreadcrumbSchema, getFAQSchema, SITE_URL, SITE_NAME } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Product Not Found" };

  const imageUrl = product.images[0]?.url || "/assets/images/og-default.webp";
  const categoryName = product.category?.name || "Rudraksha";
  const cleanedDesc = cleanText(product.description, 155);

  const keywords = [
    product.name.toLowerCase(),
    `buy ${product.name.toLowerCase()}`,
    `original ${product.name.toLowerCase()}`,
    `certified ${product.name.toLowerCase()}`,
    categoryName.toLowerCase(),
    "lab certified rudraksha",
    "rishikesh consecrated",
  ];

  return buildPageMetadata({
    title: `${product.name} | Lab Certified & Energized`,
    description: cleanedDesc || `Buy authentic ${product.name} at Rudraksha Antiquei. Lab certified, 100% natural, and consecrated with Vedic Prana Pratishtha in Rishikesh.`,
    path: `/products/${product.slug}`,
    keywords,
    image: imageUrl,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const similarProducts = await getSimilarProducts(
    product.categoryId,
    product.id,
    4,
  );

  const cleanDescription = cleanText(product.description, 500);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) =>
      img.url.startsWith("http") ? img.url : `${SITE_URL}${img.url}`
    ),
    description: cleanDescription,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${product.slug}`,
      priceCurrency: "INR",
      price: product.priceCents / 100,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.stockCount > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
    ...(product.reviews.length > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: (
          product.reviews.reduce((acc, rev) => acc + rev.rating, 0) /
          product.reviews.length
        ).toFixed(1),
        reviewCount: product.reviews.length,
      },
    }),
  };

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: product.category.name, path: `/products/category/${product.category.slug}` },
    { name: product.name, path: `/products/${product.slug}` },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  const productFaqs = [
    {
      question: `Will I receive the exact ${product.name} shown in photos?`,
      answer: "Yes. Every item is individually cataloged and photographed, representing genuine physical specimens.",
    },
    {
      question: "Is independent laboratory certification included with this product?",
      answer: "Yes, this piece includes documented gemological laboratory certification confirming its authenticity, dimensions, and natural origin.",
    },
    {
      question: "Is this item consecrated with Vedic Prana Pratishtha?",
      answer: "Yes, our Vedic pandits in Rishikesh perform traditional consecration and cleansing on the banks of Ganga before dispatch.",
    },
  ];
  const faqSchema = getFAQSchema(productFaqs);

  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ProductDetailMain product={product} />
      <ProductReviews
        reviews={product.reviews}
        productId={product.id}
        slug={product.slug}
      />
      <TraditionalSupport />
      <IsThisRightForYou />
      {product.youtubeUrl ? (
        <ProductVideoSection
          videoUrl={product.youtubeUrl}
          productName={product.name}
        />
      ) : null}
      <AuthenticityCertification />
      <OriginSourcing />
      <HowToWearCare />
      <NeedGuidance />
      <ExpertRecommendedCombinations />
      <ProductFAQ />
      <SimilarProducts
        products={similarProducts}
        categorySlug={product.category.slug}
      />
    </div>
  );
}
