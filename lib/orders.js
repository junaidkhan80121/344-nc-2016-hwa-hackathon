import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_RATE,
  TAX_RATE,
  getProductById,
  getProduct,
  linePrice,
} from "./products";
import { orderCode } from "./crypto";

export class OrderError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

function cleanText(value, fallback = "", max = 160) {
  if (value === undefined || value === null) return fallback;
  return String(value).trim().slice(0, max);
}

function resolveProduct(raw) {
  if (!raw) return null;
  return (
    getProductById(cleanText(raw.productId || raw.id, "", 80)) ||
    getProduct(cleanText(raw.slug, "", 120))
  );
}

export function normalizeOrderItems(rawItems) {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw new OrderError("Add at least one item to your order.");
  }
  if (rawItems.length > 40) {
    throw new OrderError("That is more items than one trail can carry.");
  }

  return rawItems.map((raw) => {
    const product = resolveProduct(raw);
    if (!product) {
      throw new OrderError(`We could not find the product "${raw?.productId || raw?.slug || "unknown"}".`);
    }
    const quantity = Math.min(20, Math.max(1, Number.parseInt(raw.quantity, 10) || 1));
    const plan = raw.plan === "subscribe" && product.category === "refills" ? "subscribe" : "once";
    const color =
      product.colors?.length > 0
        ? product.colors.some((c) => c.name === raw.color)
          ? raw.color
          : product.colors[0].name
        : null;
    return {
      productId: product.id,
      name: product.name,
      slug: product.slug,
      color,
      plan,
      quantity,
      unitPrice: linePrice(product, plan),
    };
  });
}

export function calculateTotals(items) {
  const subtotal = Math.round(items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) * 100) / 100;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_RATE;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const discount = 0;
  const total = Math.round((subtotal + shipping + tax - discount) * 100) / 100;
  return { subtotal, shipping, tax, discount, total };
}

export function buildOrder(payload, user) {
  const items = normalizeOrderItems(payload?.items);
  const totals = calculateTotals(items);
  const now = new Date().toISOString();

  const givenCustomer = payload?.customer || {};
  const givenAddress = payload?.shippingAddress || payload?.shipping || {};
  const email = cleanText(
    givenCustomer.email || user?.email || payload?.email,
    "guest@scenttrail.com",
    200
  ).toLowerCase();
  const name = cleanText(givenCustomer.name || user?.name, "ScentTrail Guest", 120);
  const phone = cleanText(givenCustomer.phone || payload?.phone, "", 40);

  const address = {
    line1: cleanText(givenAddress.line1 || givenAddress.address, "", 160),
    line2: cleanText(givenAddress.line2, "", 120),
    city: cleanText(givenAddress.city, "", 100),
    state: cleanText(givenAddress.state, "", 100),
    postalCode: cleanText(givenAddress.postalCode || givenAddress.zip, "", 30),
    country: cleanText(givenAddress.country, "United States", 100),
  };

  const last4Raw = String(payload?.paymentLast4 || payload?.payment?.last4 || "").replace(/\D/g, "");
  const paymentLast4 = last4Raw.slice(-4).padStart(4, "0").slice(-4);

  return {
    id: orderCode(),
    userId: user?.id || null,
    email,
    status: "processing",
    createdAt: now,
    updatedAt: now,
    items,
    ...totals,
    customer: { name, email, phone },
    shippingAddress: address,
    paymentLast4,
    notes: cleanText(payload?.notes, "", 500),
    timeline: [
      { label: "Order placed", at: now, done: true },
      { label: "Packed with care", at: null, done: false },
      { label: "On the trail", at: null, done: false },
      { label: "Delivered", at: null, done: false },
    ],
  };
}

export function statusLabel(status) {
  const map = {
    processing: "Processing",
    confirmed: "Confirmed",
    shipped: "On the trail",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return map[status] || "Processing";
}
