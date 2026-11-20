import { NextResponse } from "next/server";
import { readDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const { id } = await params;
  const db = await readDb();
  const order = db.orders.find((entry) => entry.id.toLowerCase() === String(id).toLowerCase());
  if (!order) {
    return NextResponse.json({ error: "Order not found. Check the order number and try again." }, { status: 404 });
  }
  return NextResponse.json({ order });
}
