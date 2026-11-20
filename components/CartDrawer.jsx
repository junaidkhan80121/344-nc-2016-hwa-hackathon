"use client";

import Link from "next/link";
import { ArrowRight, Minus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { PRODUCT_ID_MAP, formatPrice, FREE_SHIPPING_THRESHOLD } from "@/lib/products";
import ProductArt from "./ProductArt";
import QuantityStepper from "./QuantityStepper";

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, setQuantity, subtotal, count } = useCart();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className={`drawer-root ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button type="button" className="drawer-overlay" onClick={() => setOpen(false)} aria-label="Close cart" tabIndex={open ? 0 : -1} />
      <aside className="cart-drawer" aria-label="Shopping cart" role="dialog" aria-modal="true">
        <div className="drawer-head">
          <div>
            <span className="eyebrow">Your trail</span>
            <h2>
              Cart <span>{count}</span>
            </h2>
          </div>
          <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <ShoppingBag size={30} />
            </div>
            <h3>Nothing on the trail yet.</h3>
            <p>Start with the diffuser or a three-pod set. Your room will thank you.</p>
            <Link href="/shop" className="btn btn-primary" onClick={() => setOpen(false)}>
              Browse the collection <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            <div className="shipping-meter">
              <div className="shipping-meter-copy">
                <span>{remaining > 0 ? `${formatPrice(remaining)} from free shipping` : "Free shipping unlocked"}</span>
                <span>{progress}%</span>
              </div>
              <div className="shipping-meter-track">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="cart-items">
              {items.map((item) => {
                const product = PRODUCT_ID_MAP[item.productId];
                return (
                  <div className="cart-item" key={item.key}>
                    <Link href={`/products/${item.slug}`} onClick={() => setOpen(false)} className="cart-item-art">
                      <ProductArt product={product} color={item.color} />
                    </Link>
                    <div className="cart-item-body">
                      <div className="cart-item-top">
                        <div>
                          <Link href={`/products/${item.slug}`} onClick={() => setOpen(false)}>
                            <h3>{item.name}</h3>
                          </Link>
                          <p>
                            {item.color ? `${item.color} · ` : ""}
                            {item.plan === "subscribe" ? "Refill Club · save 15%" : "One-time"}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => removeItem(item.key)}
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <div className="cart-item-bottom">
                        <QuantityStepper value={item.quantity} onChange={(next) => setQuantity(item.key, next)} />
                        <strong>{formatPrice(item.price * item.quantity)}</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="drawer-foot">
              <div className="drawer-total">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p className="fineprint">Taxes and shipping calculated at checkout. Compostable packaging always.</p>
              <Link href="/checkout" className="btn btn-primary btn-block" onClick={() => setOpen(false)}>
                Checkout <ArrowRight size={17} />
              </Link>
              <button type="button" className="link-btn" onClick={() => setOpen(false)}>
                <Minus size={13} /> Keep wandering
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
