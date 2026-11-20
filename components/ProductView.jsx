"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Leaf,
  Package,
  Plus,
  Recycle,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import ProductArt from "./ProductArt";
import QuantityStepper from "./QuantityStepper";
import Stars from "./Stars";
import { useCart } from "./CartProvider";
import { useToast } from "./ToastProvider";
import { formatPrice, linePrice, FREE_SHIPPING_THRESHOLD } from "@/lib/products";
import { saveRecentProduct } from "@/lib/clientStore";

const extraReviews = [
  {
    name: "Elena M.",
    detail: "Verified buyer · 3 weeks in",
    rating: 5,
    text: "The dial has a lovely weight to it. It feels like a small piece of furniture, not an appliance. The scent is present without ever shouting.",
  },
  {
    name: "Theo B.",
    detail: "Verified buyer · 2 months in",
    rating: 5,
    text: "I have tried every plug-in on the market. This is the first one that made my apartment feel considered. The refill system is genuinely easy.",
  },
  {
    name: "Nora L.",
    detail: "Verified buyer · 6 weeks in",
    rating: 4,
    text: "Beautiful object and a subtle trail. I wish the strongest setting were a touch stronger, but the low setting is perfect for our bedroom.",
  },
];

export default function ProductView({ product }) {
  const router = useRouter();
  const { addProduct, setOpen } = useCart();
  const { toast } = useToast();
  const [color, setColor] = useState(product.colors?.[0]?.name || null);
  const [plan, setPlan] = useState("once");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    saveRecentProduct(product.slug);
  }, [product.slug]);

  const unitPrice = useMemo(() => linePrice(product, plan), [product, plan]);
  const isRefill = product.category === "refills";

  function addToCart() {
    addProduct(product, { quantity, color, plan });
    toast(`${product.shortName || product.name} added to your cart.`);
  }

  function buyNow() {
    addProduct(product, { quantity, color, plan });
    setOpen(false);
    router.push("/checkout");
  }

  return (
    <>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop">Shop</Link>
          <ChevronRight size={12} />
          <span>{product.shortName || product.name}</span>
        </nav>

        <div className="product-layout">
          <div className="product-gallery">
            <div className="product-gallery-art">
              <ProductArt product={product} color={color} />
            </div>
            <div className="gallery-thumbs">
              {product.colors?.length > 0 ? (
                product.colors.map((entry, index) => (
                  <button
                    key={entry.name}
                    type="button"
                    className={`gallery-thumb ${index === activeImage ? "is-active" : ""}`}
                    onClick={() => {
                      setColor(entry.name);
                      setActiveImage(index);
                    }}
                    aria-label={`View ${entry.name}`}
                  >
                    <ProductArt product={product} color={entry.name} />
                  </button>
                ))
              ) : (
                <>
                  <span className="gallery-thumb is-active" aria-hidden="true">
                    <ProductArt product={product} />
                  </span>
                  <span className="gallery-thumb" aria-hidden="true">
                    <div style={{ height: "100%", position: "relative" }}>
                      <Image src="/with.png" alt="" fill sizes="68px" style={{ objectFit: "cover" }} />
                    </div>
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="product-info">
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
              {product.badge ? <span className="pill pill-solid">{product.badge}</span> : null}
              <span className="pill">{product.category === "diffusers" ? "The diffuser" : product.category === "refills" ? "Compostable refill" : product.category === "bundles" ? "Bundle" : "Starter kit"}</span>
            </div>

            <h1>{product.name}</h1>
            <p className="product-tagline">{product.tagline}</p>

            <div className="rating-row">
              <Stars rating={product.rating} size={12} />
              <span>
                {product.rating} · {product.reviewCount} reviews
              </span>
              <span style={{ color: "var(--olive)", marginLeft: 4, display: "inline-flex", alignItems: "center", gap: 4 }}>
                <Check size={12} /> In stock
              </span>
            </div>

            <div className="price-row">
              <strong>{formatPrice(unitPrice)}</strong>
              {plan === "subscribe" ? <s>{formatPrice(product.price)}</s> : null}
              {product.compareAt && plan === "once" ? <s>{formatPrice(product.compareAt)}</s> : null}
              {plan === "subscribe" ? <span className="save-pill">Save 15%</span> : null}
              {plan !== "subscribe" && product.compareAt ? (
                <span className="save-pill">Save {formatPrice(product.compareAt - product.price)}</span>
              ) : null}
            </div>

            {product.colors?.length > 0 ? (
              <div className="option-block">
                <div className="option-label">
                  Colorway <span>{color}</span>
                </div>
                <div className="swatches">
                  {product.colors.map((entry) => (
                    <button
                      key={entry.name}
                      type="button"
                      className={`swatch ${color === entry.name ? "is-active" : ""}`}
                      onClick={() => setColor(entry.name)}
                    >
                      <i style={{ background: entry.hex }} />
                      {entry.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {isRefill ? (
              <div className="option-block">
                <div className="option-label">Purchase type</div>
                <div className="plan-options">
                  <button type="button" className={`plan-option ${plan === "once" ? "is-active" : ""}`} onClick={() => setPlan("once")}>
                    <strong>One-time</strong>
                    <span>{formatPrice(product.price)} · ship once</span>
                  </button>
                  <button type="button" className={`plan-option ${plan === "subscribe" ? "is-active" : ""}`} onClick={() => setPlan("subscribe")}>
                    <span className="plan-save">Save 15%</span>
                    <strong>Refill Club</strong>
                    <span>{formatPrice(product.price * 0.85)} · every 60 days</span>
                  </button>
                </div>
              </div>
            ) : null}

            <div className="option-block">
              <div className="option-label">Quantity</div>
              <QuantityStepper value={quantity} onChange={setQuantity} />
            </div>

            <div className="add-row">
              <button type="button" className="btn btn-primary btn-lg" onClick={addToCart}>
                <Plus size={17} /> Add to cart — {formatPrice(unitPrice * quantity)}
              </button>
            </div>
            <div className="buy-now-row">
              <button type="button" className="btn btn-outline btn-block" onClick={buyNow}>
                Buy it now <ArrowRight size={16} />
              </button>
            </div>

            <div className="notes-row">
              {product.notes.map((note) => (
                <span className="note-chip" key={note}>
                  {note}
                </span>
              ))}
            </div>

            <div className="product-promises">
              <span className="promise">
                <Truck size={15} /> Free over {formatPrice(FREE_SHIPPING_THRESHOLD)}
              </span>
              <span className="promise">
                <ShieldCheck size={15} /> 30-day guarantee
              </span>
              <span className="promise">
                <Leaf size={15} /> Compostable pods
              </span>
            </div>

            <div className="product-accordions">
              <details className="accordion" open>
                <summary>What's in the box</summary>
                <div className="accordion-content">
                  <ul>
                    {product.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </details>
              <details className="accordion">
                <summary>Details & materials</summary>
                <div className="accordion-content">
                  <dl className="spec-table">
                    {product.specs.map(([label, value]) => (
                      <div key={label} style={{ display: "contents" }}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </details>
              <details className="accordion">
                <summary>How the diffuser works</summary>
                <div className="accordion-content">
                  <p>
                    The ScentTrail diffuser uses a low-speed fan and a natural carrier wax — no heat, water or
                    propellant. Turn the top dial to set the release, press the center button once for a 45-minute
                    session, or twice to run continuously. Recharge over USB-C.
                  </p>
                </div>
              </details>
              <details className="accordion">
                <summary>Shipping & returns</summary>
                <div className="accordion-content">
                  <p>
                    Orders leave our Portland workshop in 1–2 business days. US orders over $75 ship free; otherwise
                    shipping is $6. Live with your trail for 30 days — if it is not right, send it back, even opened,
                    for a full refund.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>

        <section className="product-story">
          <div className="bento">
            <div className="bento-card span-8">
              <span className="eyebrow">The story</span>
              <h2 style={{ fontSize: "clamp(30px, 3.6vw, 46px)", marginTop: 10 }}>A slower kind of fragrance.</h2>
              <p style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 14, maxWidth: 660 }}>
                {product.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 22 }}>
                <span className="pill"><Recycle size={13} /> Refillable system</span>
                <span className="pill"><Sparkles size={13} /> Phthalate-free</span>
                <span className="pill"><Package size={13} /> Plastic-free packaging</span>
              </div>
            </div>
            <div className="bento-card span-4" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", background: "var(--sage-soft)" }}>
              <span className="eyebrow">The trail card</span>
              <blockquote style={{ fontFamily: "var(--font-display)", fontSize: 22, lineHeight: 1.24, margin: "18px 0" }}>
                “A good scent does not announce itself. It changes the room and then lets you forget it.”
              </blockquote>
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
                ScentTrail field notes, No. 04
              </span>
            </div>
          </div>
        </section>

        <section className="section-tight">
          <div className="section-head">
            <div>
              <span className="eyebrow">Reviews</span>
              <h2>Lived with, then written down.</h2>
            </div>
            <div className="review-summary">
              <strong>{product.rating}</strong>
              <div>
                <Stars rating={5} size={13} />
                <div style={{ fontSize: 10.5, color: "var(--muted)" }}>{product.reviewCount} verified reviews</div>
              </div>
            </div>
          </div>
          <div className="product-review-grid">
            {extraReviews.map((review) => (
              <div className="checkout-card" key={review.name} style={{ boxShadow: "none" }}>
                <Stars rating={review.rating} size={11} />
                <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 12, lineHeight: 1.65 }}>“{review.text}”</p>
                <div className="review-author" style={{ marginTop: 16 }}>
                  <span className="review-avatar">{review.name.charAt(0)}</span>
                  <div>
                    <strong>{review.name}</strong>
                    <span>{review.detail}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
