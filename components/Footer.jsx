"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Instagram, Mail, MapPin } from "lucide-react";
import { useToast } from "./ToastProvider";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not join the list.");
      setEmail("");
      toast(data.message || "You're on the trail list.");
    } catch (error) {
      toast(error.message, "error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-bento bento">
          <div className="footer-card footer-news span-7">
            <span className="eyebrow">The trail list</span>
            <h2>Better rooms, one note at a time.</h2>
            <p>New scent trails, slow-living notes and first access to limited refills. Twice a month, never noisy.</p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="you@somewhere.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <button type="submit" className="btn btn-light" disabled={busy}>
                {busy ? "Joining..." : "Join"} <ArrowRight size={16} />
              </button>
            </form>
            <span className="fineprint">By joining you agree to our privacy note. Unsubscribe whenever.</span>
          </div>

          <div className="footer-card span-5 footer-visit">
            <span className="eyebrow">Visit the workshop</span>
            <h3>18 Alder Lane<br />Portland, Oregon</h3>
            <p>Open Thursday to Sunday, 10am–4pm. Refill returns welcome.</p>
            <div className="footer-contact">
              <span><MapPin size={15} /> Portland, OR</span>
              <a href="mailto:hello@scenttrail.example"><Mail size={15} /> hello@scenttrail.example</a>
            </div>
          </div>

          <div className="footer-card span-3">
            <h4>Shop</h4>
            <Link href="/shop">Everything</Link>
            <Link href="/shop?category=diffusers">Diffusers</Link>
            <Link href="/shop?category=refills">Refills</Link>
            <Link href="/shop?category=bundles">Bundles</Link>
          </div>

          <div className="footer-card span-3">
            <h4>Account</h4>
            <Link href="/account">My account</Link>
            <Link href="/orders">My orders</Link>
            <Link href="/login">Sign in</Link>
            <Link href="/signup">Create account</Link>
          </div>

          <div className="footer-card span-3">
            <h4>Help</h4>
            <Link href="/about#faq">FAQ</Link>
            <Link href="/about#contact">Contact</Link>
            <Link href="/about#shipping">Shipping & returns</Link>
            <Link href="/about">Our story</Link>
          </div>

          <div className="footer-card span-3 footer-social">
            <h4>Follow the trail</h4>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram size={16} /> Instagram
            </a>
            <a href="mailto:hello@scenttrail.example">
              <Mail size={16} /> Email us
            </a>
            <div className="footer-stamp">
              <span>EST.</span>
              <strong>2016</strong>
              <span>PDX</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ScentTrail Pods. Made slowly in Portland.</p>
          <div>
            <Link href="/about#shipping">Shipping</Link>
            <Link href="/about#privacy">Privacy</Link>
            <Link href="/about#terms">Terms</Link>
          </div>
          <span className="footer-note">Designed for analog rooms.</span>
        </div>
      </div>
    </footer>
  );
}
