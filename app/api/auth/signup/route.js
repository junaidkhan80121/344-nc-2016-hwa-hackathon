import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
import { hashPassword, publicUser, randomId } from "@/lib/crypto";
import { findUserByEmail, updateDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send a JSON body with name, email and password." }, { status: 400 });
  }

  const name = String(body.name || "").trim().slice(0, 120);
  const email = String(body.email || "").trim().toLowerCase().slice(0, 200);
  const password = String(body.password || "");

  if (name.length < 2) {
    return NextResponse.json({ error: "Please tell us your name." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Use at least 8 characters for your password." }, { status: 400 });
  }

  try {
    const result = await updateDb((db) => {
      if (findUserByEmail(db, email)) {
        const error = new Error("An account with that email already exists. Try signing in.");
        error.status = 409;
        throw error;
      }
      const { salt, hash } = hashPassword(password);
      const user = {
        id: randomId("usr"),
        name,
        email,
        salt,
        passwordHash: hash,
        createdAt: new Date().toISOString(),
        memberSince: new Date().toLocaleString("en-US", { month: "long", year: "numeric" }),
        defaultAddress: null,
      };
      db.users.push(user);
      if (body.newsletter && !db.newsletter.some((entry) => entry.email === email)) {
        db.newsletter.push({ email, source: "signup", createdAt: new Date().toISOString() });
      }
      return { user, secret: db.secret };
    });

    await createSession(result.user.id, result.secret);
    return NextResponse.json({ user: publicUser(result.user) }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Could not create your account." },
      { status: error.status || 500 }
    );
  }
}
