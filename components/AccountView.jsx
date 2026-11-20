"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Leaf,
  LogOut,
  MapPin,
  Package,
  Pencil,
  ShoppingBag,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useAuth } from "./AuthProvider";
import { useToast } from "./ToastProvider";
import ProductArt from "./ProductArt";
import { PRODUCT_ID_MAP, formatPrice, statusLabel } from "@/lib/products";

function firstName(name) {
  return (name || "Wanderer").split(" ")[0];
}

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AccountView() {
  const router = useRouter();
  const { user, loading, logout, updateProfile } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", line1: "", line2: "", city: "", state: "", postalCode: "" });

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    setOrdersLoading(true);
    fetch("/api/orders", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (!cancelled) setOrders(Array.isArray(data.orders) ? data.orders : []);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setOrdersLoading(false);
      });
    setForm({
      name: user.name || "",
      line1: user.defaultAddress?.line1 || "",
      line2: user.defaultAddress?.line2 || "",
      city: user.defaultAddress?.city || "",
      state: user.defaultAddress?.state || "",
      postalCode: user.defaultAddress?.postalCode || "",
    });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const stats = useMemo(() => {
    const total = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const pods = orders.reduce(
      (sum, order) => sum + order.items.reduce((count, item) => count + item.quantity, 0),
      0
    );
    return { total, pods };
  }, [orders]);

  async function handleLogout() {
    await logout();
    toast("Signed out. The trail will keep.", "info");
    router.push("/");
    router.refresh();
  }

  async function saveProfile(event) {
    event.preventDefault();
    setSaving(true);
    try {
      await updateProfile({
        name: form.name,
        defaultAddress: {
          line1: form.line1,
          line2: form.line2,
          city: form.city,
          state: form.state,
          postalCode: form.postalCode,
          country: user.defaultAddress?.country || "United States",
        },
      });
      toast("Profile updated.");
      setEditing(false);
    } catch (error) {
      toast(error.message, "error");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div>
          <div className="spinner" />
          Finding your trail…
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <section className="account-page container">
        <div className="bento">
          <div className="bento-card span-12" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24, minHeight: 280 }}>
            <div style={{ maxWidth: 520 }}>
              <span className="eyebrow">Your account</span>
              <h1 style={{ fontSize: "clamp(38px, 5vw, 62px)", marginTop: 10 }}>Come back to your trail.</h1>
              <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 10 }}>
                Sign in to see your orders, saved address and the refills you have collected. New here? Making an
                account takes about a minute.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
                <Link href="/login?next=/account" className="btn btn-primary">
                  Sign in <ArrowRight size={16} />
                </Link>
                <Link href="/signup?next=/account" className="btn btn-outline">
                  Create an account
                </Link>
              </div>
            </div>
            <div className="pill">
              <Leaf size={13} /> 30-day trail guarantee
            </div>
          </div>
        </div>
      </section>
    );
  }

  const latest = orders[0];
  const latestProduct = latest ? PRODUCT_ID_MAP[latest.items[0]?.productId] : null;

  return (
    <section className="account-page container">
      <div className="account-head">
        <div>
          <span className="eyebrow">My account</span>
          <h1>
            Hello, <em>{firstName(user.name)}.</em>
          </h1>
          <p>Your orders, details and quiet rituals, all in one place.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link href="/shop" className="btn btn-outline">
            Shop trails <ShoppingBag size={15} />
          </Link>
          <button type="button" className="btn btn-ghost" onClick={handleLogout}>
            Sign out <LogOut size={15} />
          </button>
        </div>
      </div>

      <div className="account-grid">
        <div className="account-profile bento-card">
          <div>
            <div className="avatar">{(user.name || "S").charAt(0).toUpperCase()}</div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <div className="profile-meta">
              <span><Sparkles size={13} /> Member since {user.memberSince || formatDate(user.createdAt)}</span>
              <span><Leaf size={13} /> Trail list</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            <button type="button" className="btn btn-light btn-sm" onClick={() => setEditing((current) => !current)}>
              <Pencil size={13} /> Edit details
            </button>
            <Link href="/orders" className="btn btn-outline btn-sm" style={{ color: "#f2ead9", borderColor: "rgba(248,242,231,.3)" }}>
              My orders
            </Link>
          </div>
        </div>

        <div className="bento-card account-stat">
          <span className="stat-icon"><Package size={19} /></span>
          <div>
            <strong>{ordersLoading ? "—" : orders.length}</strong>
            <span>Orders on the trail</span>
          </div>
        </div>
        <div className="bento-card account-stat">
          <span className="stat-icon"><Clock3 size={19} /></span>
          <div>
            <strong>{ordersLoading ? "—" : formatPrice(stats.total)}</strong>
            <span>Lifetime with ScentTrail</span>
          </div>
        </div>
        <div className="bento-card account-stat">
          <span className="stat-icon"><Leaf size={19} /></span>
          <div>
            <strong>{ordersLoading ? "—" : stats.pods}</strong>
            <span>Pods sent your way</span>
          </div>
        </div>

        <div className="account-card account-orders">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
            <div>
              <span className="eyebrow">Recent orders</span>
              <h3 style={{ marginTop: 8 }}>The trails you have taken</h3>
            </div>
            <Link href="/orders" className="text-link">
              View all <ArrowUpRight size={13} />
            </Link>
          </div>

          {ordersLoading ? (
            <div style={{ marginTop: 18 }}>
              <div className="skeleton" style={{ height: 60, marginBottom: 8 }} />
              <div className="skeleton" style={{ height: 60 }} />
            </div>
          ) : orders.length === 0 ? (
            <div style={{ padding: "28px 0", textAlign: "center" }}>
              <p style={{ color: "var(--muted)", fontSize: 12 }}>No orders yet. The first trail is the best one.</p>
              <Link href="/shop" className="btn btn-primary btn-sm" style={{ marginTop: 14 }}>
                Start shopping <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div style={{ marginTop: 12 }}>
              {orders.slice(0, 3).map((order) => {
                const product = PRODUCT_ID_MAP[order.items[0]?.productId];
                return (
                  <Link href={`/orders/${order.id}`} className="mini-order" key={order.id}>
                    <span className="mini-order-art">
                      <ProductArt product={product} color={order.items[0]?.color} />
                    </span>
                    <span className="mini-order-body">
                      <strong>{order.items[0]?.name}</strong>
                      <span>
                        {order.id} · {formatDate(order.createdAt)} · {statusLabel(order.status)}
                      </span>
                    </span>
                    <b>{formatPrice(order.total)}</b>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="account-side">
          <div className="account-card">
            <span className="eyebrow">Saved address</span>
            <h3 style={{ marginTop: 8 }}>Where it lands</h3>
            {user.defaultAddress?.line1 ? (
              <div className="address-block">
                {user.name}
                <br />
                {user.defaultAddress.line1}
                {user.defaultAddress.line2 ? <><br />{user.defaultAddress.line2}</> : null}
                <br />
                {user.defaultAddress.city}, {user.defaultAddress.state} {user.defaultAddress.postalCode}
                <br />
                {user.defaultAddress.country}
              </div>
            ) : (
              <p style={{ marginTop: 8 }}>No saved address yet. Add one to make checkout quicker.</p>
            )}
            <button type="button" className="text-link" style={{ marginTop: 16, background: "none", border: "none", padding: 0 }} onClick={() => setEditing(true)}>
              {user.defaultAddress?.line1 ? "Update address" : "Add address"} <ArrowRight size={13} />
            </button>
          </div>

          <div className="account-card">
            <span className="eyebrow">Quick links</span>
            <div className="account-links">
              <Link href="/orders">Order history <ArrowRight size={13} /></Link>
              <Link href="/products/scenttrail-refill-club">Refill Club <ArrowRight size={13} /></Link>
              <Link href="/about#faq">Help & FAQ <ArrowRight size={13} /></Link>
              <button type="button" onClick={handleLogout}>Sign out <LogOut size={13} /></button>
            </div>
          </div>
        </div>

        {editing ? (
          <div className="account-card span-12">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
              <div>
                <span className="eyebrow">Edit details</span>
                <h3 style={{ marginTop: 6 }}>Keep your trail current</h3>
              </div>
              <button type="button" className="link-btn" onClick={() => setEditing(false)}>Close</button>
            </div>
            <form onSubmit={saveProfile}>
              <div className="form-grid">
                <div className="field full">
                  <label htmlFor="account-name">Full name</label>
                  <input id="account-name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
                </div>
                <div className="field full">
                  <label htmlFor="account-line1">Street address</label>
                  <input id="account-line1" value={form.line1} onChange={(event) => setForm({ ...form, line1: event.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="account-city">City</label>
                  <input id="account-city" value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="account-state">State</label>
                  <input id="account-state" value={form.state} onChange={(event) => setForm({ ...form, state: event.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="account-zip">Postal code</label>
                  <input id="account-zip" value={form.postalCode} onChange={(event) => setForm({ ...form, postalCode: event.target.value })} />
                </div>
              </div>
              <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? "Saving…" : "Save details"} <UserRound size={14} />
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </form>
          </div>
        ) : null}

        {latest ? (
          <div className="account-card span-12" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, background: "var(--sage-soft)" }}>
            <span className="mini-order-art" style={{ width: 64, height: 70 }}>
              {latestProduct ? <ProductArt product={latestProduct} color={latest.items[0]?.color} /> : null}
            </span>
            <div style={{ flex: 1, minWidth: 200 }}>
              <span className="eyebrow">Latest order</span>
              <h3 style={{ fontSize: 20, marginTop: 5 }}>{latest.items[0]?.name}</h3>
              <p style={{ color: "var(--muted)", fontSize: 10.5, marginTop: 2 }}>
                {latest.id} · {formatDate(latest.createdAt)} · {statusLabel(latest.status)}
              </p>
            </div>
            <Link href={`/orders/${latest.id}`} className="btn btn-primary btn-sm">
              Track order <MapPin size={13} />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
