"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Leaf,
  MapPin,
  PackageCheck,
  Printer,
  RotateCcw,
  Truck,
} from "lucide-react";
import ProductArt from "./ProductArt";
import { useCart } from "./CartProvider";
import { useToast } from "./ToastProvider";
import { PRODUCT_ID_MAP, formatPrice, statusLabel } from "@/lib/products";
import { getLocalOrder } from "@/lib/clientStore";

function formatDate(value, withTime = false) {
  if (!value) return "—";
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
  });
}

export default function OrderDetailView({ orderId, isNew }) {
  const { addProduct } = useCart();
  const { toast } = useToast();
  const [order, setOrder] = useState(null);
  const [state, setState] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    setState("loading");
    fetch(`/api/orders/${encodeURIComponent(orderId)}`, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("not found");
        const data = await response.json();
        if (!cancelled) {
          setOrder(data.order);
          setState("ready");
        }
      })
      .catch(() => {
        const local = getLocalOrder(orderId);
        if (cancelled) return;
        if (local) {
          setOrder(local);
          setState("ready");
        } else {
          setState("missing");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  function buyAgain() {
    let added = 0;
    order?.items.forEach((item) => {
      const product = PRODUCT_ID_MAP[item.productId];
      if (product) {
        addProduct(product, { quantity: item.quantity, color: item.color, plan: item.plan });
        added += 1;
      }
    });
    if (added) toast("The trail is back in your cart.");
  }

  if (state === "loading") {
    return (
      <section className="order-detail-page container">
        <div className="loading-screen">
          <div>
            <div className="spinner" />
            Finding your trail…
          </div>
        </div>
      </section>
    );
  }

  if (state === "missing" || !order) {
    return (
      <section className="order-detail-page container">
        <div className="lookup-box">
          <PackageCheck size={30} style={{ color: "var(--olive)", margin: "0 auto 12px" }} />
          <h2>That order is not on this trail.</h2>
          <p>Check the order number or sign in to see orders saved to your account.</p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/orders" className="btn btn-primary">
              All orders <ArrowRight size={15} />
            </Link>
            <Link href="/shop" className="btn btn-outline">
              Keep shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const first = order.items?.[0];
  const firstProduct = first ? PRODUCT_ID_MAP[first.productId] : null;
  const address = order.shippingAddress || {};

  return (
    <section className="order-detail-page container">
      <div className="order-detail-head">
        <div>
          <span className="eyebrow">Order {order.id}</span>
          <h1>
            {order.status === "delivered" ? "Trail complete." : order.status === "shipped" ? "On the trail." : "Your trail is growing."}
          </h1>
          <p>
            Placed {formatDate(order.createdAt, true)} · <span className={`status-pill status-${order.status}`}>{statusLabel(order.status)}</span>
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="button" className="btn btn-outline btn-sm" onClick={() => window.print()}>
            <Printer size={14} /> Print receipt
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={buyAgain}>
            <RotateCcw size={14} /> Buy again
          </button>
        </div>
      </div>

      {isNew ? (
        <div className="bento-card" style={{ display: "flex", alignItems: "center", gap: 14, background: "var(--sage-soft)", marginBottom: 18 }}>
          <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: "50%", background: "var(--success)", color: "#fff", flexShrink: 0 }}>
            <Check size={20} />
          </span>
          <div>
            <strong style={{ fontSize: 13 }}>Order confirmed. Thank you for walking with us.</strong>
            <p style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 2 }}>
              A receipt is on its way to {order.email}. We pack Monday to Friday from Portland.
            </p>
          </div>
        </div>
      ) : null}

      <div className="order-detail-grid">
        <div className="order-main">
          <div className="account-card">
            <span className="eyebrow">Status</span>
            <h3 style={{ marginTop: 8 }}>Where your trail is now</h3>
            <div className="timeline" style={{ marginTop: 18 }}>
              {(order.timeline || []).map((step, index) => (
                <div className={`timeline-step ${step.done ? "is-done" : ""}`} key={`${step.label}-${index}`}>
                  <span className="timeline-dot">{step.done ? <Check size={11} /> : index + 1}</span>
                  <div className="timeline-body">
                    <strong>{step.label}</strong>
                    <span>{step.at ? formatDate(step.at, true) : step.label === "Packed with care" ? "Next: packing at the workshop" : "Waiting for the next step"}</span>
                  </div>
                </div>
              ))}
            </div>
            {order.status === "shipped" ? (
              <div className="order-help" style={{ marginTop: 6 }}>
                <Truck size={15} />
                <span>Your parcel is with our carbon-neutral carrier. Tracking details are sent to {order.email}.</span>
              </div>
            ) : null}
          </div>

          <div className="account-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div>
                <span className="eyebrow">In this order</span>
                <h3 style={{ marginTop: 8 }}>{order.items.length} {order.items.length === 1 ? "object" : "objects"}</h3>
              </div>
              <span className="pill"><Leaf size={12} /> Plastic-free packing</span>
            </div>
            <div style={{ marginTop: 10 }}>
              {order.items.map((item) => {
                const product = PRODUCT_ID_MAP[item.productId];
                return (
                  <div className="order-item" key={`${item.productId}-${item.color}-${item.plan}`}>
                    <div className="order-item-art">
                      {product ? <ProductArt product={product} color={item.color} /> : null}
                    </div>
                    <div className="order-item-body">
                      <strong>{item.name}</strong>
                      <span>
                        {item.color ? `${item.color} · ` : ""}Qty {item.quantity}
                        {item.plan === "subscribe" ? " · Refill Club" : ""}
                      </span>
                    </div>
                    <b>{formatPrice(item.unitPrice * item.quantity)}</b>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
              <div className="summary-line">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
              </div>
              <div className="summary-line">
                <span>Tax</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              {order.discount ? (
                <div className="summary-line">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              ) : null}
              <div className="summary-line total">
                <span>Total</span>
                <strong>{formatPrice(order.total)}</strong>
              </div>
            </div>
          </div>

          <div className="account-card">
            <span className="eyebrow">Need a hand?</span>
            <h3 style={{ marginTop: 8 }}>We are a small workshop.</h3>
            <p style={{ marginTop: 6 }}>Write to hello@scenttrail.example and mention {order.id}. We usually reply within one business day.</p>
            <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
              <Link href="/about#contact" className="btn btn-outline btn-sm">Contact us</Link>
              <Link href="/about#shipping" className="btn btn-ghost btn-sm">Returns & shipping</Link>
            </div>
          </div>
        </div>

        <aside className="order-side">
          <div className="account-card summary-card" style={{ position: "static" }}>
            <h3 style={{ fontSize: 22 }}>Order summary</h3>
            <div className="summary-line" style={{ marginTop: 10 }}>
              <span>Order number</span>
              <span style={{ color: "var(--ink)", fontWeight: 700 }}>{order.id}</span>
            </div>
            <div className="summary-line">
              <span>Placed</span>
              <span>{formatDate(order.createdAt)}</span>
            </div>
            <div className="summary-line">
              <span>Status</span>
              <span>{statusLabel(order.status)}</span>
            </div>
            <div className="summary-line total">
              <span>Total</span>
              <strong>{formatPrice(order.total)}</strong>
            </div>
            {firstProduct ? (
              <Link href={`/products/${firstProduct.slug}`} className="btn btn-outline btn-block btn-sm" style={{ marginTop: 14 }}>
                View product <ArrowRight size={13} />
              </Link>
            ) : null}
          </div>

          <div className="account-card">
            <span className="eyebrow"><MapPin size={11} /> Shipping to</span>
            <div className="address-block" style={{ color: "var(--ink)" }}>
              <strong>{order.customer?.name}</strong>
              <br />
              {address.line1}
              {address.line2 ? <><br />{address.line2}</> : null}
              <br />
              {address.city}, {address.state} {address.postalCode}
              <br />
              {address.country}
            </div>
            <div className="address-block">
              {order.customer?.email}
              {order.customer?.phone ? <><br />{order.customer.phone}</> : null}
            </div>
          </div>

          <div className="account-card">
            <span className="eyebrow"><CreditCard size={11} /> Payment</span>
            <div className="address-block" style={{ color: "var(--ink)" }}>
              Card ending in {order.paymentLast4 || "0000"}
            </div>
            <div className="order-help" style={{ marginTop: 12 }}>
              <Leaf size={14} />
              <span>This is a demo order. No real payment was processed.</span>
            </div>
          </div>

          <Link href="/orders" className="btn btn-ghost btn-block">
            <ArrowLeft size={14} /> Back to all orders
          </Link>
        </aside>
      </div>
    </section>
  );
}
