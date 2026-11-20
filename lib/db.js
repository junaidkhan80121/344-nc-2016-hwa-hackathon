import { get, put } from "@vercel/blob";
import crypto from "crypto";
import { hashPassword, randomId } from "./crypto";

const DB_PATH = "scenttrail/database.json";

const state = (globalThis.__scenttrailState ||= {
  memory: null,
  queue: Promise.resolve(),
});

function hasBlobStore() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || (process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN));
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function demoOrders(userId) {
  const first = {
    id: "ST-2411-A7K2",
    userId,
    email: "demo@scenttrail.com",
    status: "delivered",
    createdAt: "2026-11-09T16:24:00.000Z",
    updatedAt: "2026-11-13T11:02:00.000Z",
    items: [
      {
        productId: "p_ultimate_bundle",
        name: "Ultimate Trail Bundle",
        slug: "ultimate-trail-bundle",
        color: "Sage",
        plan: "once",
        quantity: 1,
        unitPrice: 149,
      },
    ],
    subtotal: 149,
    shipping: 0,
    tax: 11.92,
    discount: 0,
    total: 160.92,
    customer: { name: "Demo Wanderer", email: "demo@scenttrail.com", phone: "(555) 014-8221" },
    shippingAddress: {
      line1: "18 Alder Lane",
      line2: "Apt 3",
      city: "Portland",
      state: "OR",
      postalCode: "97205",
      country: "United States",
    },
    paymentLast4: "4242",
    timeline: [
      { label: "Order placed", at: "2026-11-09T16:24:00.000Z", done: true },
      { label: "Packed with care", at: "2026-11-10T09:10:00.000Z", done: true },
      { label: "On the trail", at: "2026-11-11T14:30:00.000Z", done: true },
      { label: "Delivered", at: "2026-11-13T11:02:00.000Z", done: true },
    ],
  };

  const second = {
    id: "ST-2410-K9M4",
    userId,
    email: "demo@scenttrail.com",
    status: "shipped",
    createdAt: "2026-11-18T08:05:00.000Z",
    updatedAt: "2026-11-20T08:12:00.000Z",
    items: [
      {
        productId: "p_wild_forest",
        name: "Wild Forest Refill Pack",
        slug: "wild-forest-refill-pack",
        color: null,
        plan: "subscribe",
        quantity: 2,
        unitPrice: 20.4,
      },
      {
        productId: "p_golden_hour",
        name: "Golden Hour Refill Pack",
        slug: "golden-hour-refill-pack",
        color: null,
        plan: "once",
        quantity: 1,
        unitPrice: 24,
      },
    ],
    subtotal: 64.8,
    shipping: 6,
    tax: 5.18,
    discount: 0,
    total: 75.98,
    customer: { name: "Demo Wanderer", email: "demo@scenttrail.com", phone: "(555) 014-8221" },
    shippingAddress: {
      line1: "18 Alder Lane",
      line2: "Apt 3",
      city: "Portland",
      state: "OR",
      postalCode: "97205",
      country: "United States",
    },
    paymentLast4: "4242",
    timeline: [
      { label: "Order placed", at: "2026-11-18T08:05:00.000Z", done: true },
      { label: "Packed with care", at: "2026-11-18T17:40:00.000Z", done: true },
      { label: "On the trail", at: "2026-11-20T08:12:00.000Z", done: true },
      { label: "Delivered", at: null, done: false },
    ],
  };

  return [second, first];
}

function seedDb() {
  const demoId = "usr_demo_trail";
  const { salt, hash } = hashPassword("Demo1234!");
  return {
    version: 1,
    secret: crypto.randomBytes(32).toString("hex"),
    users: [
      {
        id: demoId,
        name: "Demo Wanderer",
        email: "demo@scenttrail.com",
        salt,
        passwordHash: hash,
        createdAt: "2026-10-02T12:00:00.000Z",
        memberSince: "October 2026",
        defaultAddress: {
          line1: "18 Alder Lane",
          line2: "Apt 3",
          city: "Portland",
          state: "OR",
          postalCode: "97205",
          country: "United States",
        },
      },
    ],
    orders: demoOrders(demoId),
    newsletter: [],
    messages: [],
    createdAt: new Date().toISOString(),
  };
}

async function loadBlobDb() {
  const result = await get(DB_PATH, { access: "private", useCache: false });
  if (!result || result.statusCode === 304 || !result.stream) return null;
  const text = await new Response(result.stream).text();
  if (!text) return null;
  return JSON.parse(text);
}

async function saveBlobDb(db) {
  await put(DB_PATH, JSON.stringify(db), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
}

export async function readDb() {
  if (hasBlobStore()) {
    try {
      const existing = await loadBlobDb();
      if (existing?.secret) return existing;
      const fresh = seedDb();
      await saveBlobDb(fresh);
      return fresh;
    } catch (error) {
      console.error("[scenttrail] blob store unavailable, using in-memory data", error);
    }
  }

  if (!state.memory) state.memory = seedDb();
  return clone(state.memory);
}

export async function writeDb(db) {
  if (hasBlobStore()) {
    try {
      await saveBlobDb(db);
      return db;
    } catch (error) {
      console.error("[scenttrail] failed to write blob store, keeping memory copy", error);
    }
  }
  state.memory = clone(db);
  return db;
}

export function updateDb(mutator) {
  const run = async () => {
    const db = await readDb();
    const result = await mutator(db);
    await writeDb(db);
    return result;
  };
  const next = state.queue.then(run, run);
  state.queue = next.catch(() => {});
  return next;
}

export function findUserByEmail(db, email) {
  const normalized = String(email || "").trim().toLowerCase();
  return db.users.find((user) => user.email === normalized) || null;
}

export function findUserById(db, id) {
  return db.users.find((user) => user.id === id) || null;
}

export function newUserId() {
  return randomId("usr");
}
