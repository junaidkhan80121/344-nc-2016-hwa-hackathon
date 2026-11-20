"use client";

import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import { PRODUCT_MAP, TRAIL_MOODS, formatPrice } from "@/lib/products";
import ProductArt from "./ProductArt";
import { useCart } from "./CartProvider";
import { useToast } from "./ToastProvider";

export default function ScentFinder() {
  const [moodId, setMoodId] = useState("forest");
  const { addProduct } = useCart();
  const { toast } = useToast();
  const mood = TRAIL_MOODS.find((entry) => entry.id === moodId) || TRAIL_MOODS[0];
  const product = PRODUCT_MAP[mood.productSlug];

  function addRecommendation() {
    addProduct(product, { quantity: 1 });
    toast(`${product.shortName} added — good trail ahead.`);
  }

  return (
    <div className="finder-wrap">
      <div className="finder-copy">
        <div>
          <span className="eyebrow">The scent finder</span>
          <h2>
            Where are you <em>right now?</em>
          </h2>
          <p>
            Choose the room you want to walk into. We will point you toward the refill that fits the feeling — no
            quiz, no email gate.
          </p>
        </div>
        <span className="finder-number" aria-hidden="true">
          01
        </span>
      </div>

      <div className="finder-panel">
        <div>
          <p className="finder-question">Pick a mood. We will pick the trail.</p>
          <div className="finder-moods" role="group" aria-label="Choose a mood">
            {TRAIL_MOODS.map((entry) => (
              <button
                key={entry.id}
                type="button"
                className={`mood-btn ${entry.id === moodId ? "is-active" : ""}`}
                onClick={() => setMoodId(entry.id)}
              >
                <span className="mood-dot" style={{ background: entry.color }} aria-hidden="true" />
                <span>
                  <strong>{entry.label}</strong>
                  <span>{entry.description}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="finder-result">
          <div className="finder-result-art">
            <ProductArt product={product} />
          </div>
          <div style={{ flex: 1 }}>
            <span className="eyebrow" style={{ fontSize: 9 }}>
              Your trail
            </span>
            <h3>{product.shortName}</h3>
            <p>
              {product.tagline} · {formatPrice(product.price)}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <Link href={`/products/${product.slug}`} className="text-link">
                See the refill <ArrowUpRight size={13} />
              </Link>
              <button type="button" className="quick-add" onClick={addRecommendation}>
                <Plus size={13} /> Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
