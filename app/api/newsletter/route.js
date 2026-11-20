import { NextResponse } from "next/server";
import { updateDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send a JSON body with an email address." }, { status: 400 });
  }
  const email = String(body.email || "").trim().toLowerCase().slice(0, 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    await updateDb((db) => {
      db.newsletter ||= [];
      if (!db.newsletter.some((entry) => entry.email === email)) {
        db.newsletter.push({ email, source: body.source || "footer", createdAt: new Date().toISOString() });
      }
      return true;
    });
    return NextResponse.json({ ok: true, message: "You're on the trail list. Watch your inbox." });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Could not join the list." }, { status: 500 });
  }
}
