import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Leaf,
  PackageCheck,
  Recycle,
  Repeat2,
  ShieldCheck,
  Sparkles,
  Truck,
  Wind,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ScentFinder from "@/components/ScentFinder";
import Stars from "@/components/Stars";
import { PRODUCTS, PRODUCT_MAP, TESTIMONIALS, formatPrice } from "@/lib/products";

export const metadata = {
  title: "ScentTrail Pods — Analog scent for rooms that deserve a ritual",
  description:
    "Compostable scent pods, a dial-operated diffuser and nine slow trails for the rooms you live in. Free shipping over $75.",
};

const featured = [
  "ultimate-trail-bundle",
  "scenttrail-diffuser",
  "wild-forest-refill-pack",
  "savory-broth-refill-pack",
  "golden-hour-refill-pack",
];

export default function HomePage() {
  const bundle = PRODUCT_MAP["ultimate-trail-bundle"];

  return (
    <>
      <section className="hero container">
        <div className="bento">
          <div className="hero-main bento-card reveal">
            <div>
              <span className="eyebrow">Slow scent, made analog</span>
              <h1 className="hero-title">
                Find your <em>quiet.</em>
              </h1>
              <p className="hero-sub">
                A dial-operated diffuser and compostable scent pods for the room you are actually in. No app, no
                cords, no blue light. Just a better atmosphere, on your own rhythm.
              </p>
              <div className="hero-actions">
                <Link href="/shop" className="btn btn-light btn-lg">
                  Shop the trails <ArrowRight size={17} />
                </Link>
                <Link href="#scent-finder" className="btn btn-outline btn-lg">
                  Find your scent
                </Link>
              </div>
            </div>
            <div className="hero-foot">
              <div className="hero-rating">
                <strong>4.9</strong>
                <div>
                  <Stars rating={5} size={11} />
                  <span>from 1,280 slow-living rooms</span>
                </div>
              </div>
              <span className="hero-foot-divider" aria-hidden="true" />
              <div className="hero-avatars" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span style={{ fontSize: 10.5, color: "#c7c6b9" }}>Loved in 42 states</span>
            </div>
          </div>

          <div className="hero-visual bento-card reveal">
            <Image
              src="/with.png"
              alt="ScentTrail diffusers, compostable refill pods and the Ultimate Trail bundle on a warm studio table"
              fill
              priority
              sizes="(max-width: 960px) 100vw, 40vw"
            />
            <Link href={`/products/${bundle.slug}`} className="hero-badge">
              <div>
                <span className="eyebrow">The full trail</span>
                <h3>Ultimate Bundle</h3>
              </div>
              <div className="badge-price">
                <span>Save $40</span>
                <strong>{formatPrice(bundle.price)}</strong>
              </div>
              <span className="icon-btn" aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
            </Link>
          </div>

          <div className="bento-card hero-mini tone-olive span-4">
            <span className="mini-icon">
              <Wind size={18} />
            </span>
            <div>
              <h3>45-day trails</h3>
              <p>One pod, a room, a whole season of quiet.</p>
            </div>
          </div>
          <div className="bento-card hero-mini tone-clay span-4">
            <span className="mini-icon">
              <Recycle size={18} />
            </span>
            <div>
              <h3>Compostable pods</h3>
              <p>Plant-based shells. Return spent pods with any refill.</p>
            </div>
          </div>
          <div className="bento-card hero-mini tone-gold span-4">
            <span className="mini-icon">
              <Truck size={18} />
            </span>
            <div>
              <h3>Free over $75</h3>
              <p>Carbon-neutral US shipping and a 30-day trail guarantee.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <span className="eyebrow">The collection</span>
            <h2>Objects for a slower room.</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
            <p>Start with the diffuser, a refill, or the bundle that gets you all the way there.</p>
            <p className="product-desc" style={{ marginTop: 12, color: "var(--muted)", fontSize: 12.5, maxWidth: 500 }}>
              ScentTrail Pods are compostable scent diffusers that slowly release fragrance into your room. Each pod lasts 45 days and is plant-based, plastic-free, and designed for a slower, more analog lifestyle. Choose from nine slow trails — from forest and broth to golden hour scents.
            </p>
            <Link href="/shop" className="text-link">
              Shop everything <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="bento">
          {featured.map((slug, index) => {
            const product = PRODUCT_MAP[slug];
            const span = index < 2 ? 6 : 4;
            return <ProductCard key={slug} product={product} span={span} tall={index < 2} />;
          })}
        </div>
      </section>

      <section className="section container" id="scent-finder">
        <ScentFinder />
      </section>

      <section className="section container">
        <div className="bento">
          <div className="bento-card bundle-spotlight span-8">
            <Image src="/with.png" alt="The Ultimate Trail Bundle with refill packs and cartridges" fill sizes="(max-width: 960px) 100vw, 66vw" />
            <div className="bundle-overlay">
              <span className="eyebrow">The whole trail, one box</span>
              <h2>Nine pods. Three trails. One ritual.</h2>
              <p>
                The Ultimate Trail Bundle brings the diffuser, two full refill packs and the three-pod starter set.
                Save $40 and skip the “which scent first?” spiral.
              </p>
              <Link href={`/products/${bundle.slug}`} className="btn btn-light">
                Meet the Ultimate Bundle <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="span-4 bento-stack">
            <div className="bento-card stat-card">
              <span className="stat-icon">
                <Leaf size={22} />
              </span>
              <div>
                <strong>100%</strong>
                <p>Compostable pod shells, plant-based and plastic-free.</p>
              </div>
            </div>
            <div className="bento-card stat-card">
              <span className="stat-icon">
                <Repeat2 size={22} />
              </span>
              <div>
                <strong>15%</strong>
                <p>Off every refill when you join the Refill Club.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <span className="eyebrow">How it works</span>
            <h2>Four small moves. No app required.</h2>
          </div>
          <p>Designed to be understood by touch, not by a manual. The whole ritual takes about eight seconds.</p>
        </div>
        <div className="bento">
          {[
            {
              icon: <Sparkles size={19} />,
              title: "Choose a pod",
              copy: "Pick a trail from the library. Each pod arrives sealed and compostable.",
              num: "01",
            },
            {
              icon: <PackageCheck size={19} />,
              title: "Set the pace",
              copy: "Turn the dial from whisper to wander. Every notch changes the release.",
              num: "02",
            },
            {
              icon: <Wind size={19} />,
              title: "Let the room change",
              copy: "No mist, no heat, no blue light. Just a slow, even scent in the air.",
              num: "03",
            },
            {
              icon: <Recycle size={19} />,
              title: "Compost & repeat",
              copy: "When the trail fades, drop the pod in your home compost or return it.",
              num: "04",
            },
          ].map((step) => (
            <div className="bento-card feature-card span-3" key={step.num}>
              <span className="feature-icon">{step.icon}</span>
              <div>
                <span className="feature-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Notes from the trail</span>
            <h2>Rooms, changed quietly.</h2>
          </div>
          <div className="review-summary" style={{ alignItems: "center" }}>
            <Stars rating={5} size={14} />
            <span style={{ fontSize: 12, color: "var(--muted)" }}>4.9 average · 1,280 reviews</span>
          </div>
        </div>
        <div className="bento">
          {TESTIMONIALS.map((review) => (
            <div className="bento-card review-card span-4" key={review.name}>
              <div>
                <Stars rating={review.rating} size={11} />
                <blockquote>“{review.quote}”</blockquote>
              </div>
              <div className="review-author">
                <span className="review-avatar">{review.name.charAt(0)}</span>
                <div>
                  <strong>{review.name}</strong>
                  <span>{review.detail}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="trust-row">
          <span><BadgeCheck size={15} /> 30-day guarantee</span>
          <span><ShieldCheck size={15} /> Secure checkout</span>
          <span><Leaf size={15} /> Plastic-free shipping</span>
          <span><Truck size={15} /> Carbon-neutral delivery</span>
        </div>
      </section>

      <section className="section-tight container">
        <div className="bento">
          <div className="bento-card span-12" style={{ background: "var(--ink)", color: "var(--bg)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24, padding: "clamp(28px, 4vw, 48px)" }}>
            <div>
              <span className="eyebrow" style={{ color: "var(--bg)", opacity: 0.6 }}>Not sure yet?</span>
              <h2 style={{ fontSize: "clamp(30px, 4vw, 46px)", marginTop: 10 }}>Start with three trails for $29.</h2>
              <p style={{ color: "var(--bg)", opacity: 0.72, fontSize: 12.5, marginTop: 8, maxWidth: 460 }}>
                The Starter Cartridge Set gives you a week with Wild Forest, Savory Broth and Golden Hour. Your first
                refill pack comes with a $45 credit.
              </p>
            </div>
            <Link href={`/products/${PRODUCTS.find((p) => p.slug === "starter-cartridge-set").slug}`} className="btn btn-light btn-lg">
              Try the starter set <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
