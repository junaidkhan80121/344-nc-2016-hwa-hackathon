"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import ProductArt from "./ProductArt";
import Stars from "./Stars";
import { formatPrice } from "@/lib/products";
import { useCart } from "./CartProvider";
import { useToast } from "./ToastProvider";

export default function ProductCard({ product, span = 4, compact = false, tall = false }) {
  const { addProduct } = useCart();
  const { toast } = useToast();

  function handleAdd() {
    addProduct(product, { quantity: 1 });
    toast(`${product.shortName || product.name} added to your cart.`);
  }

  return (
    <article className={`product-card bento-card span-${span} ${compact ? "compact" : ""} ${tall ? "tall" : ""}`}>
      <Link href={`/products/${product.slug}`} className="product-art-link" aria-label={product.name}>
        {product.badge ? <span className="card-badge">{product.badge}</span> : null}
        <ProductArt product={product} />
      </Link>
      <div className="product-card-body">
        <div className="product-card-top">
          <div>
            <h3>
              <Link href={`/products/${product.slug}`}>{product.shortName || product.name}</Link>
            </h3>
            <p className="card-tag">{product.tagline}</p>
          </div>
          <div className="card-price">
            <span>{formatPrice(product.price)}</span>
            {product.compareAt ? <s>{formatPrice(product.compareAt)}</s> : null}
          </div>
        </div>
        <div className="product-card-bottom">
          <div className="card-meta">
            <Stars rating={product.rating} size={10} />
            <span>
              {product.rating} · {product.reviewCount}
            </span>
          </div>
          <button type="button" className="quick-add" onClick={handleAdd}>
            <Plus size={13} /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
