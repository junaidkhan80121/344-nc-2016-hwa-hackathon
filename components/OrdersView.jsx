"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, PackageOpen, Search, Truck } from "lucide-react";
import { useAuth } from "./AuthProvider";
import ProductArt from "./ProductArt";
import { PRODUCT_ID_MAP, formatPrice, statusLabel } from "@/lib/products";
import { getLocalOrders } from "@/lib/clientStore";

const statusFilters = [
  { id: "all", label: "All trails" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "On the trail" },
  { id: "delivered", label: "Delivered" },
];

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function OrdersView() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [serverOrders, setServerOrders] = useState([]);
  const [localOrders, setLocalOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [lookup, setLookup] = useState("");
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setLocalOrders(getLocalOrders());
  }, []);

  useEffect(() => {
    if (!user) {
      setServerOrders([]);
      return;
    }
    let cancelled = false;
    setFetching(true);
    fetch("/api/orders", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (!cancelled) setServerOrders(Array.isArray(data.orders) ? data.orders : []);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setFetching(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const orders = useMemo(() => {
    const map = new Map();
    [...localOrders, ...serverOrders].forEach((order) => {
      if (order?.id && !map.has(order.id)) map.set(order.id, order);
    });
    let list = [...map.values()].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (filter !== "all") {
      list = list.filter((order) => order.status === filter || (filter === "shipped" && order.status === "confirmed"));
    }
    const search = query.trim().toLowerCase();
    if (search) {
      list = list.filter((order) =>
        [order.id, order.items?.[0]?.name, order.email, order.status]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(search)
      );
    }
    return list;
  }, [localOrders, serverOrders, filter, query]);

  function handleLookup(event) {
    event.preventDefault();
    const id = lookup.trim();
    if (id) router.push(`/orders/${encodeURIComponent(id)}`);
  }

  return (
    <section className="orders-page container">
      <div className="orders-head">
        <div>
          <span className="eyebrow">Order history</span>
          <h1>Every trail you have taken.</h1>
          <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 8 }}>
            {user ? `Signed in as ${user.email}.` : "Guest orders on this device appear here. Sign in to sync your account orders."}
          </p>
        </div>
        {!user ? (
          <Link href="/login?next=/orders" className="btn btn-primary">
            Sign in to sync <ArrowRight size={15} />
          </Link>
        ) : (
          <Link href="/shop" className="btn btn-outline">
            Shop again <ArrowRight size={15} />
          </Link>
        )}
      </div>

      <div className="orders-toolbar">
        <div className="chip-row" role="group" aria-label="Filter orders by status">
          {statusFilters.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={`filter-chip ${filter === entry.id ? "is-active" : ""}`}
              onClick={() => setFilter(entry.id)}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <span className="toolbar-spacer" />
        <label className="search-field">
          <Search size={15} />
          <span className="sr-only">Search orders</span>
          <input
            type="search"
            placeholder="Search order number or object"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      {orders.length === 0 ? (
        <div style={{ display: "grid", gap: 18 }}>
          <div className="empty-state">
            <PackageOpen size={32} style={{ color: "var(--olive)" }} />
            <h3>{loading || fetching ? "Finding your orders…" : "No orders here yet."}</h3>
            <p>
              {user ? "When you place an order it will appear here with tracking and a trail timeline." : "Place an order, or look one up with the order number from your receipt."}
            </p>
            {!user ? (
              <Link href="/shop" className="btn btn-primary">
                Start a trail <ArrowRight size={15} />
              </Link>
            ) : null}
          </div>

          <div className="lookup-box">
            <span className="eyebrow">Order lookup</span>
            <h2 style={{ marginTop: 8 }}>Have an order number?</h2>
            <p>Enter it exactly as it appears on your receipt, for example ST-2411-A7K2.</p>
            <form className="lookup-form" onSubmit={handleLookup}>
              <input
                className="input"
                value={lookup}
                onChange={(event) => setLookup(event.target.value)}
                placeholder="ST-..."
                aria-label="Order number"
              />
              <button type="submit" className="btn btn-primary">
                Find order
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const first = order.items?.[0];
            const product = first ? PRODUCT_ID_MAP[first.productId] : null;
            const itemCount = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
            return (
              <div className="order-card" key={order.id}>
                <div className="order-card-art">
                  {product ? <ProductArt product={product} color={first.color} /> : null}
                </div>
                <div className="order-card-body">
                  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                    <h3>{order.id}</h3>
                    <span className={`status-pill status-${order.status}`}>{statusLabel(order.status)}</span>
                  </div>
                  <p>
                    {itemCount} {itemCount === 1 ? "item" : "items"} · {first?.name}
                    {order.items?.length > 1 ? ` + ${order.items.length - 1} more` : ""}
                  </p>
                </div>
                <div className="order-card-meta">
                  <div>
                    <span>Placed</span>
                    <strong>{formatDate(order.createdAt)}</strong>
                  </div>
                  <div>
                    <span>Total</span>
                    <strong>{formatPrice(order.total)}</strong>
                  </div>
                  <div>
                    <span>Status</span>
                    <strong>{order.status === "shipped" ? "In transit" : statusLabel(order.status)}</strong>
                  </div>
                </div>
                <Link href={`/orders/${order.id}`} className="btn btn-outline btn-sm">
                  View <Truck size={13} />
                </Link>
              </div>
            );
          })}

          <div className="lookup-box" style={{ margin: "26px 0 0" }}>
            <span className="eyebrow">Order lookup</span>
            <h2 style={{ marginTop: 8 }}>Looking for another trail?</h2>
            <p>Enter an order number to find its details and timeline.</p>
            <form className="lookup-form" onSubmit={handleLookup}>
              <input
                className="input"
                value={lookup}
                onChange={(event) => setLookup(event.target.value)}
                placeholder="ST-..."
                aria-label="Order number"
              />
              <button type="submit" className="btn btn-primary">
                Find order
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
