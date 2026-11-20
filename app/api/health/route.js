import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    store: "ScentTrail Pods",
    products: PRODUCTS.length,
    endpoints: {
      products: "/api/products",
      order: "/api/orders",
      auth: "/api/auth/me",
    },
    time: new Date().toISOString(),
  });
}
