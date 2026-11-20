import { cookies } from "next/headers";
import { createSessionToken, publicUser, readSessionToken } from "./crypto";
import { findUserById, readDb } from "./db";

export const SESSION_COOKIE = "scenttrail_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

export async function getSessionUser() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const db = await readDb();
  const session = readSessionToken(token, db.secret);
  if (!session) return null;
  const user = findUserById(db, session.uid);
  return user ? publicUser(user) : null;
}

export async function createSession(userId, secret) {
  const store = await cookies();
  store.set(SESSION_COOKIE, createSessionToken(userId, secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
