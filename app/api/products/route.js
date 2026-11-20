import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/products";

export const runtime = "nodejs";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const family = searchParams.get("family");
  const search = (searchParams.get("search") || "").toLowerCase();
  const sort = searchParams.get("sort") || "featured";

  let products = [...PRODUCTS];

  if (category && category !== "all") {
    products = products.filter((product) => product.category === category);
  }
  if (family && family !== "all") {
    products = products.filter((product) => product.family === family);
  }
  if (search) {
    products = products.filter((product) =>
      [product.name, product.tagline, product.description, ...(product.notes || [])]
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  }

  if (sort === "price-asc") products.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") products.sort((a, b) => b.price - a.price);
  if (sort === "rating") products.sort((a, b) => b.rating - a.rating);

  return NextResponse.json({
    count: products.length,
    products: products.map((product) => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      tagline: product.tagline,
      price: product.price,
      compareAt: product.compareAt,
      category: product.category,
      family: product.family,
      badge: product.badge,
      rating: product.rating,
      reviewCount: product.reviewCount,
      notes: product.notes,
    })),
  });
}
