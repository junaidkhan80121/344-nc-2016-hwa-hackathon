import { NextResponse } from "next/server";
import { updateDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send a JSON body." }, { status: 400 });
  }

  const name = String(body.name || "").trim().slice(0, 120);
  const email = String(body.email || "").trim().toLowerCase().slice(0, 200);
  const message = String(body.message || "").trim().slice(0, 2000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 4) {
    return NextResponse.json({ error: "Add your name, a valid email and a message." }, { status: 400 });
  }

  try {
    await updateDb((db) => {
      db.messages ||= [];
      db.messages.push({ name, email, message, createdAt: new Date().toISOString() });
      return true;
    });
    return NextResponse.json({ ok: true, message: "Message received. We usually reply within a day." });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Could not send your message." }, { status: 500 });
  }
}
