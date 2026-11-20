import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ product });
}
