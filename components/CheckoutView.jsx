"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Check,
  CreditCard,
  Leaf,
  Lock,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import ProductArt from "./ProductArt";
import { useAuth } from "./AuthProvider";
import { useCart } from "./CartProvider";
import { useToast } from "./ToastProvider";
import {
  FREE_SHIPPING_THRESHOLD,
  PRODUCT_ID_MAP,
  SHIPPING_RATE,
  TAX_RATE,
  formatPrice,
} from "@/lib/products";
import { saveLocalOrder } from "@/lib/clientStore";

const steps = [
  { id: 1, label: "Contact & shipping" },
  { id: 2, label: "Delivery" },
  { id: 3, label: "Payment" },
];

function formatCard(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function CheckoutView() {
  const router = useRouter();
  const { items, subtotal, clearCart, hydrated } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [prefilled, setPrefilled] = useState(false);

  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
  });
  const [delivery, setDelivery] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvc: "" });
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (prefilled || !user) return;
    setCustomer((current) => ({
      name: current.name || user.name || "",
      email: current.email || user.email || "",
      phone: current.phone || "",
    }));
    if (user.defaultAddress) {
      setAddress((current) => ({
        ...current,
        line1: current.line1 || user.defaultAddress.line1 || "",
        line2: current.line2 || user.defaultAddress.line2 || "",
        city: current.city || user.defaultAddress.city || "",
        state: current.state || user.defaultAddress.state || "",
        postalCode: current.postalCode || user.defaultAddress.postalCode || "",
      }));
    }
    setPrefilled(true);
  }, [user, prefilled]);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_RATE;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const addressSummary = useMemo(() => {
    return [address.line1, address.line2, `${address.city}, ${address.state} ${address.postalCode}`, address.country]
      .filter(Boolean)
      .join(" · ");
  }, [address]);

  function updateCustomer(key, value) {
    setCustomer((current) => ({ ...current, [key]: value }));
  }

  function updateAddress(key, value) {
    setAddress((current) => ({ ...current, [key]: value }));
  }

  function validateStep(current) {
    setError("");
    if (current === 1) {
      if (customer.name.trim().length < 2) return "Please enter your full name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) return "Enter a valid email for your receipt.";
      if (address.line1.trim().length < 3) return "Enter your street address.";
      if (!address.city.trim()) return "Enter your city.";
      if (!address.state.trim()) return "Enter your state or region.";
      if (address.postalCode.trim().length < 3) return "Enter a valid postal code.";
    }
    if (current === 3 && paymentMethod === "card") {
      if (card.name.trim().length < 2) return "Enter the name on your card.";
      if (card.number.replace(/\s/g, "").length < 15) return "Enter a valid card number.";
      if (!/^\d{2}\/\d{2}$/.test(card.expiry)) return "Use MM/YY for the expiry date.";
      if (card.cvc.length < 3) return "Enter the 3 or 4 digit security code.";
    }
    return null;
  }

  function nextStep() {
    const problem = validateStep(step);
    if (problem) {
      setError(problem);
      return;
    }
    setStep((current) => Math.min(3, current + 1));
  }

  async function placeOrder() {
    const problem = validateStep(3);
    if (problem) {
      setError(problem);
      return;
    }
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            color: item.color,
            plan: item.plan,
          })),
          customer,
          shippingAddress: address,
          paymentLast4: paymentMethod === "card" ? card.number.replace(/\s/g, "").slice(-4) : "0000",
          paymentMethod,
          notes: `${delivery === "pickup" ? "Local pickup requested. " : ""}${notes}`.trim(),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not place your order.");
      saveLocalOrder(data.order);
      clearCart();
      toast("Order placed. Your trail is on its way.");
      router.push(`/orders/${data.order.id}?new=1`);
    } catch (caught) {
      setError(caught.message);
      setBusy(false);
    }
  }

  if (!hydrated) {
    return (
      <div className="loading-screen">
        <div>
          <div className="spinner" />
          Loading your trail…
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <section className="checkout-page container">
        <div className="empty-state" style={{ marginTop: 30 }}>
          <PackageCheck size={32} style={{ color: "var(--olive)" }} />
          <h3>Your cart is empty.</h3>
          <p>Add a diffuser or a refill pack, then come back to finish the trail.</p>
          <Link href="/shop" className="btn btn-primary">
            Browse the collection <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page container">
      <div className="checkout-head">
        <div>
          <span className="eyebrow">Secure checkout</span>
          <h1>
            Finish the <em style={{ color: "var(--olive)" }}>trail.</em>
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 12.5, marginTop: 8 }}>
            {itemCount} {itemCount === 1 ? "item" : "items"} · no real payment is taken in this demo store.
          </p>
        </div>
        {!user ? (
          <div className="pill">
            <Link href="/login?next=/checkout" style={{ fontWeight: 800 }}>
              Sign in for saved details
            </Link>
          </div>
        ) : (
          <div className="pill">
            <Check size={13} /> Signed in as {user.email}
          </div>
        )}
      </div>

      <div className="checkout-grid">
        <div className="checkout-main">
          <div className="checkout-steps" aria-label="Checkout progress">
            {steps.map((entry, index) => (
              <div key={entry.id} style={{ display: "contents" }}>
                <div className={`checkout-step ${step === entry.id ? "is-active" : ""} ${step > entry.id ? "is-done" : ""}`}>
                  <span className="step-num">{step > entry.id ? <Check size={11} /> : entry.id}</span>
                  {entry.label}
                </div>
                {index < steps.length - 1 ? <span className="step-line" aria-hidden="true" /> : null}
              </div>
            ))}
          </div>

          {step === 1 ? (
            <div className="checkout-card">
              <h2>Where should it land?</h2>
              <p>We send a receipt and a trail card with every order.</p>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="checkout-name">Full name</label>
                  <input id="checkout-name" value={customer.name} onChange={(event) => updateCustomer("name", event.target.value)} autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="checkout-email">Email</label>
                  <input id="checkout-email" type="email" value={customer.email} onChange={(event) => updateCustomer("email", event.target.value)} autoComplete="email" />
                </div>
                <div className="field full">
                  <label htmlFor="checkout-phone">Phone (optional)</label>
                  <input id="checkout-phone" value={customer.phone} onChange={(event) => updateCustomer("phone", event.target.value)} autoComplete="tel" />
                </div>
                <div className="field full">
                  <label htmlFor="checkout-line1">Street address</label>
                  <input id="checkout-line1" value={address.line1} onChange={(event) => updateAddress("line1", event.target.value)} autoComplete="address-line1" />
                </div>
                <div className="field full">
                  <label htmlFor="checkout-line2">Apartment, suite, etc. (optional)</label>
                  <input id="checkout-line2" value={address.line2} onChange={(event) => updateAddress("line2", event.target.value)} autoComplete="address-line2" />
                </div>
                <div className="field">
                  <label htmlFor="checkout-city">City</label>
                  <input id="checkout-city" value={address.city} onChange={(event) => updateAddress("city", event.target.value)} autoComplete="address-level2" />
                </div>
                <div className="field">
                  <label htmlFor="checkout-state">State / region</label>
                  <input id="checkout-state" value={address.state} onChange={(event) => updateAddress("state", event.target.value)} autoComplete="address-level1" />
                </div>
                <div className="field">
                  <label htmlFor="checkout-zip">Postal code</label>
                  <input id="checkout-zip" value={address.postalCode} onChange={(event) => updateAddress("postalCode", event.target.value)} autoComplete="postal-code" />
                </div>
                <div className="field">
                  <label htmlFor="checkout-country">Country</label>
                  <select id="checkout-country" value={address.country} onChange={(event) => updateAddress("country", event.target.value)} autoComplete="country-name">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>
              {error ? <p className="form-error" style={{ marginTop: 14 }}>{error}</p> : null}
              <div className="checkout-nav">
                <Link href="/shop" className="btn btn-outline">
                  <ArrowLeft size={15} /> Keep shopping
                </Link>
                <button type="button" className="btn btn-primary" onClick={nextStep}>
                  Continue to delivery <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="checkout-card">
              <h2>How should it travel?</h2>
              <p>Carbon-neutral delivery in recycled, plastic-free packaging.</p>
              <div style={{ display: "grid", gap: 9 }}>
                <button
                  type="button"
                  className={`payment-method ${delivery === "standard" ? "is-active" : ""}`}
                  onClick={() => setDelivery("standard")}
                  style={{ alignItems: "flex-start", padding: 16 }}
                >
                  <Truck size={18} />
                  <span style={{ flex: 1 }}>
                    <strong style={{ display: "block", fontSize: 13 }}>Standard trail</strong>
                    <span style={{ display: "block", fontSize: 10.5, color: "var(--muted)", marginTop: 3 }}>
                      3–5 business days · free over $75, otherwise $6
                    </span>
                  </span>
                  <strong style={{ fontSize: 12 }}>{shipping === 0 ? "Free" : formatPrice(shipping)}</strong>
                </button>
                <button
                  type="button"
                  className={`payment-method ${delivery === "pickup" ? "is-active" : ""}`}
                  onClick={() => setDelivery("pickup")}
                  style={{ alignItems: "flex-start", padding: 16 }}
                >
                  <PackageCheck size={18} />
                  <span style={{ flex: 1 }}>
                    <strong style={{ display: "block", fontSize: 13 }}>Portland workshop pickup</strong>
                    <span style={{ display: "block", fontSize: 10.5, color: "var(--muted)", marginTop: 3 }}>
                      Ready in 1 business day · 18 Alder Lane · Thu–Sun
                    </span>
                  </span>
                  <strong style={{ fontSize: 12 }}>{shipping === 0 ? "Free" : formatPrice(shipping)}</strong>
                </button>
              </div>
              <div className="field" style={{ marginTop: 18 }}>
                <label htmlFor="checkout-notes">Gate code or a note for the courier (optional)</label>
                <textarea id="checkout-notes" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Leave with the neighbor, use the side door, etc." style={{ minHeight: 86 }} />
              </div>
              {error ? <p className="form-error" style={{ marginTop: 14 }}>{error}</p> : null}
              <div className="checkout-nav">
                <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>
                  <ArrowLeft size={15} /> Back
                </button>
                <button type="button" className="btn btn-primary" onClick={nextStep}>
                  Continue to payment <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="checkout-card">
              <h2>Payment & review</h2>
              <p>This is a demo store. Use any test card details; nothing is charged.</p>

              <div className="payment-methods">
                <button type="button" className={`payment-method ${paymentMethod === "card" ? "is-active" : ""}`} onClick={() => setPaymentMethod("card")}>
                  <CreditCard size={16} /> Card (test)
                </button>
                <button type="button" className={`payment-method ${paymentMethod === "cod" ? "is-active" : ""}`} onClick={() => setPaymentMethod("cod")}>
                  <Banknote size={16} /> Pay on delivery
                </button>
              </div>

              {paymentMethod === "card" ? (
                <div className="form-grid">
                  <div className="field full">
                    <label htmlFor="card-name">Name on card</label>
                    <input id="card-name" value={card.name} onChange={(event) => setCard({ ...card, name: event.target.value })} autoComplete="cc-name" />
                  </div>
                  <div className="field full">
                    <label htmlFor="card-number">Card number</label>
                    <input
                      id="card-number"
                      inputMode="numeric"
                      placeholder="4242 4242 4242 4242"
                      value={card.number}
                      onChange={(event) => setCard({ ...card, number: formatCard(event.target.value) })}
                      autoComplete="cc-number"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="card-expiry">Expiry</label>
                    <input
                      id="card-expiry"
                      inputMode="numeric"
                      placeholder="MM/YY"
                      value={card.expiry}
                      onChange={(event) => setCard({ ...card, expiry: formatExpiry(event.target.value) })}
                      autoComplete="cc-exp"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="card-cvc">Security code</label>
                    <input
                      id="card-cvc"
                      inputMode="numeric"
                      placeholder="123"
                      maxLength={4}
                      value={card.cvc}
                      onChange={(event) => setCard({ ...card, cvc: event.target.value.replace(/\D/g, "").slice(0, 4) })}
                      autoComplete="cc-csc"
                    />
                  </div>
                </div>
              ) : (
                <div className="review-block">
                  <p>Pay the courier when your trail arrives. We will still send a receipt to {customer.email}.</p>
                </div>
              )}

              <div className="review-order" style={{ marginTop: 20 }}>
                <div className="review-block">
                  <header>
                    <span>Ship to</span>
                    <button type="button" onClick={() => setStep(1)}>Edit</button>
                  </header>
                  <p>
                    <strong>{customer.name}</strong>
                    <br />
                    {addressSummary}
                  </p>
                </div>
                <div className="review-block">
                  <header>
                    <span>Delivery</span>
                    <button type="button" onClick={() => setStep(2)}>Edit</button>
                  </header>
                  <p>{delivery === "pickup" ? "Portland workshop pickup · ready in 1 business day" : "Standard trail · 3–5 business days"}</p>
                </div>
              </div>

              {error ? <p className="form-error" style={{ marginTop: 14 }}>{error}</p> : null}

              <div className="checkout-nav">
                <button type="button" className="btn btn-outline" onClick={() => setStep(2)} disabled={busy}>
                  <ArrowLeft size={15} /> Back
                </button>
                <button type="button" className="btn btn-primary" onClick={placeOrder} disabled={busy}>
                  {busy ? "Placing order…" : `Place order — ${formatPrice(total)}`}
                  {!busy ? <Lock size={14} /> : null}
                </button>
              </div>
            </div>
          ) : null}

          <div className="secure-row">
            <ShieldCheck size={14} /> Encrypted checkout · 30-day trail guarantee · <Leaf size={13} /> plastic-free shipping
          </div>
        </div>

        <aside className="summary-card">
          <h2>Your trail</h2>
          <div className="summary-items">
            {items.map((item) => {
              const product = PRODUCT_ID_MAP[item.productId];
              return (
                <div className="summary-item" key={item.key}>
                  <div className="summary-item-art">
                    <ProductArt product={product} color={item.color} />
                  </div>
                  <div className="summary-item-body">
                    <strong>{item.name}</strong>
                    <span>
                      {item.color ? `${item.color} · ` : ""}Qty {item.quantity}
                      {item.plan === "subscribe" ? " · Refill Club" : ""}
                    </span>
                  </div>
                  <b>{formatPrice(item.price * item.quantity)}</b>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
            <div className="summary-line">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="summary-line">
              <span>Estimated tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="summary-line total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
          </div>

          <div className="summary-note">
            <Leaf size={14} /> Every order ships in recycled paper with a trail card.
          </div>
        </aside>
      </div>
    </section>
  );
}
