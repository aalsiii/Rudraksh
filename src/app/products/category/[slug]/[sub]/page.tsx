import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryDisabledView from "@/components/products/CategoryDisabledView";
import { getSubcategoryBySlug, getProductsBySubcategory, getCategories } from "@/lib/products";
import { computeFacets, filterProducts, parseFilters, getPriceBounds } from "@/lib/product-utils";
import SubcategoryProductListing from "@/components/products/SubcategoryProductListing";
import { buildPageMetadata, getBreadcrumbSchema } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}): Promise<Metadata> {
  const { slug, sub } = await params;
  const subcategory = await getSubcategoryBySlug(slug, sub);

  if (!subcategory) {
    return { title: "Subcategory Not Found" };
  }

  const categoryName = subcategory.category.name;
  const subName = subcategory.name;

  return buildPageMetadata({
    title: `${subName} | Buy Original ${categoryName} Online`,
    description: `Buy 100% original, certified ${subName} (${categoryName}) at Rudraksha Antiquei. Scientifically verified, natural purity, and consecrated in Rishikesh with Vedic rituals.`,
    path: `/products/category/${slug}/${sub}`,
    keywords: [
      subName.toLowerCase(),
      `original ${subName.toLowerCase()}`,
      `buy ${subName.toLowerCase()} online`,
      `certified ${subName.toLowerCase()}`,
      `${subName.toLowerCase()} price`,
      `${subName.toLowerCase()} benefits`,
      categoryName.toLowerCase(),
    ],
    image: subcategory.image,
  });
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; sub: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug, sub } = await params;
  const sp = await searchParams;

  const subcategory = await getSubcategoryBySlug(slug, sub);
  if (!subcategory) {
    notFound();
  }

  if (subcategory.category.isActive === false) {
    const allCategories = await getCategories();
    const activeAlternatives = allCategories.filter(
      (c) => c.slug !== slug && (c.isActive ?? true)
    );
    return (
      <CategoryDisabledView
        categoryName={subcategory.category.name}
        categoryImage={subcategory.category.image}
        otherCategories={activeAlternatives}
      />
    );
  }

  const allProducts = await getProductsBySubcategory(slug, sub);
  const filters = parseFilters(sp);
  const facets = computeFacets(allProducts);
  const filtered = filterProducts(allProducts, filters);
  const priceBounds = getPriceBounds(allProducts);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: subcategory.category.name, path: `/products/category/${slug}` },
    { name: subcategory.name, path: `/products/category/${slug}/${sub}` },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${subcategory.name} - ${subcategory.category.name}`,
    description: `Discover verified, original ${subcategory.name} selections at Rudraksha Antiquei.`,
    url: `/products/category/${slug}/${sub}`,
    image: subcategory.image,
  };

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

      {/* Breadcrumb + hero */}
      <div className="mx-auto w-full max-w-[1280px] px-3 pt-8 sm:px-6">
        <nav className="font-lato text-xs text-gray-text">
          <Link href="/" className="hover:text-dark">Home</Link>
          {" › "}
          <Link href={`/products/category/${slug}`} className="hover:text-dark">
            {subcategory.category.name}
          </Link>
          {" › "}
          <span className="text-dark">{subcategory.name}</span>
        </nav>
        <h1 className="mt-4 font-prata text-[30px] leading-tight text-dark">{subcategory.name}</h1>
        {subcategory.group && (
          <p className="mt-1 font-lato text-sm text-gray-text">{subcategory.group}</p>
        )}
      </div>

      <SubcategoryProductListing products={filtered} facets={facets} priceBounds={priceBounds} />
    </div>
  );
}
