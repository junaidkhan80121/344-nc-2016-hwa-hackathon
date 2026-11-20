import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { publicUser } from "@/lib/crypto";
import { findUserById, updateDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSessionUser();
  return NextResponse.json({ user: user || null });
}

export async function PATCH(request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Please sign in to update your account." }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name || "").trim().slice(0, 120);
  if (name.length < 2) {
    return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
  }

  const address = body.defaultAddress
    ? {
        line1: String(body.defaultAddress.line1 || "").trim().slice(0, 160),
        line2: String(body.defaultAddress.line2 || "").trim().slice(0, 120),
        city: String(body.defaultAddress.city || "").trim().slice(0, 100),
        state: String(body.defaultAddress.state || "").trim().slice(0, 100),
        postalCode: String(body.defaultAddress.postalCode || "").trim().slice(0, 30),
        country: String(body.defaultAddress.country || "United States").trim().slice(0, 100),
      }
    : undefined;

  try {
    const user = await updateDb((db) => {
      const found = findUserById(db, sessionUser.id);
      if (!found) {
        const error = new Error("Account not found.");
        error.status = 404;
        throw error;
      }
      found.name = name;
      if (address !== undefined) found.defaultAddress = address;
      return publicUser(found);
    });
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
}

