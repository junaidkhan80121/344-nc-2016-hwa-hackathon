import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
import { publicUser, verifyPassword } from "@/lib/crypto";
import { findUserByEmail, updateDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send a JSON body with email and password." }, { status: 400 });
  }

  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  try {
    const result = await updateDb((db) => {
      const user = findUserByEmail(db, email);
      if (!user || !verifyPassword(password, user.salt, user.passwordHash)) {
        const error = new Error("That email and password do not match. Try again.");
        error.status = 401;
        throw error;
      }
      user.lastLoginAt = new Date().toISOString();
      return { user, secret: db.secret };
    });

    await createSession(result.user.id, result.secret);
    return NextResponse.json({ user: publicUser(result.user) });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Could not sign you in." },
      { status: error.status || 500 }
    );
  }
}
