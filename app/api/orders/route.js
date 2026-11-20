import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { OrderError, buildOrder } from "@/lib/orders";
import { updateDb, readDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: cors });
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Send a JSON body with an items array." },
      { status: 400, headers: cors }
    );
  }

  try {
    const user = await getSessionUser();
    const order = buildOrder(payload, user);
    await updateDb((db) => {
      db.orders.unshift(order);
      if (order.email && order.email !== "guest@scenttrail.com") {
        const existing = db.users.find((u) => u.email === order.email);
        if (existing && !order.userId) order.userId = existing.id;
      }
      return order;
    });
    return NextResponse.json({ success: true, order }, { status: 201, headers: cors });
  } catch (error) {
    const status = error instanceof OrderError ? error.status : 500;
    return NextResponse.json(
      { error: error.message || "Could not place your order." },
      { status, headers: cors }
    );
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = (searchParams.get("email") || "").trim().toLowerCase();
  const user = await getSessionUser();

  if (!user && !email) {
    return NextResponse.json(
      { count: 0, orders: [], hint: "Sign in or pass ?email= to list orders." },
      { headers: cors }
    );
  }

  const db = await readDb();
  const orders = db.orders
    .filter((order) => (user ? order.userId === user.id || order.email === user.email : order.email === email))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return NextResponse.json({ count: orders.length, orders }, { headers: cors });
}
