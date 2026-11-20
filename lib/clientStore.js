const ORDERS_KEY = "scenttrail:orders";
const RECENT_KEY = "scenttrail:recent";

function safeParse(value, fallback) {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return parsed === null || parsed === undefined ? fallback : parsed;
  } catch {
    return fallback;
  }
}

export function saveLocalOrder(order) {
  if (typeof window === "undefined" || !order?.id) return;
  const existing = getLocalOrders();
  const next = [order, ...existing.filter((entry) => entry.id !== order.id)].slice(0, 30);
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
}

export function getLocalOrders() {
  if (typeof window === "undefined") return [];
  const value = safeParse(window.localStorage.getItem(ORDERS_KEY), []);
  return Array.isArray(value) ? value : [];
}

export function getLocalOrder(id) {
  if (!id) return null;
  return getLocalOrders().find((order) => String(order.id).toLowerCase() === String(id).toLowerCase()) || null;
}

export function saveRecentProduct(slug) {
  if (typeof window === "undefined" || !slug) return;
  const value = safeParse(window.localStorage.getItem(RECENT_KEY), []);
  const existing = Array.isArray(value) ? value : [];
  const next = [slug, ...existing.filter((entry) => entry !== slug)].slice(0, 6);
  window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

export function getRecentProducts() {
  if (typeof window === "undefined") return [];
  const value = safeParse(window.localStorage.getItem(RECENT_KEY), []);
  return Array.isArray(value) ? value : [];
}
