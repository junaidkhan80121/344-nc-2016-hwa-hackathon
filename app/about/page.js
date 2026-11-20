import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Leaf,
  Mail,
  MapPin,
  Package,
  Recycle,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { FAQS } from "@/lib/products";

export const metadata = {
  title: "Our story",
  description:
    "ScentTrail Pods is a small Portland workshop making analog diffusers and compostable scent pods. Read the story, values and FAQ.",
};

const values = [
  {
    title: "Analog by choice",
    copy: "No apps, no accounts required to use your diffuser, no firmware updates. A dial and a button are enough.",
    icon: <Sparkles size={18} />,
  },
  {
    title: "Refill, do not replace",
    copy: "The body is built to last years. The part that runs out is compostable, and the packaging is paper.",
    icon: <Recycle size={18} />,
  },
  {
    title: "Small-batch, close to home",
    copy: "Blended and packed in Portland with a short supply chain. We know the people who make every component.",
    icon: <MapPin size={18} />,
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="about-hero container">
        <span className="eyebrow">Our story · Portland, Oregon</span>
        <h1>
          A small object for a <em>slower</em> room.
        </h1>
        <p>
          ScentTrail began in a one-bedroom apartment in 2016, with a question: what if home fragrance felt less like
          an appliance and more like a piece of furniture? Ten years later, we are still making the same quiet
          object — only better.
        </p>
      </section>

      <section className="container">
        <div className="bento">
          <div className="bento-card about-image span-7">
            <Image src="/with.png" alt="ScentTrail diffusers and refill packaging in the Portland studio" fill sizes="(max-width: 960px) 100vw, 58vw" priority />
            <span className="about-image-caption">The studio · 18 Alder Lane</span>
          </div>
          <div className="bento-card about-quote span-5">
            <blockquote>
              “We wanted a diffuser you could understand with your hands, and a refill you could put in the compost
              without a second thought.”
            </blockquote>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <span>Nora & Eli · founders</span>
              <span className="pill" style={{ borderColor: "rgba(248,242,231,.25)", color: "#e9e2d2", background: "transparent" }}>
                Since 2016
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <span className="eyebrow">What we believe</span>
            <h2>Fewer things. Better rooms.</h2>
          </div>
          <p>We make one diffuser, four core scents and the refills that go in them. That is the whole catalogue, on purpose.</p>
        </div>
        <div className="about-values">
          {values.map((value, index) => (
            <div className="value-card" key={value.title}>
              <div style={{ color: "var(--olive)" }}>{value.icon}</div>
              <span className="feature-num" style={{ display: "block", marginTop: 14 }}>0{index + 1}</span>
              <h3>{value.title}</h3>
              <p>{value.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container" id="faq">
        <div className="faq-section">
          <div>
            <span className="eyebrow">Questions, answered</span>
            <h2 style={{ marginTop: 12 }}>The things people ask most.</h2>
            <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 14, maxWidth: 320 }}>
              Still wondering something? The contact form below reaches a real person in the workshop.
            </p>
          </div>
          <div className="faq-list">
            {FAQS.map((entry) => (
              <details className="accordion" key={entry.q}>
                <summary>{entry.q}</summary>
                <div className="accordion-content">{entry.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight container" id="contact">
        <div className="contact-grid">
          <div className="contact-copy">
            <span className="eyebrow">Contact</span>
            <h2 style={{ marginTop: 10 }}>Write to the workshop.</h2>
            <p>
              Questions about a scent, an order or a refill return? We answer every message ourselves, usually within
              one business day.
            </p>
            <div className="contact-details">
              <a href="mailto:hello@scenttrail.example"><Mail size={15} /> hello@scenttrail.example</a>
              <span><MapPin size={15} /> 18 Alder Lane, Portland, OR 97205</span>
              <span><Clock3 size={15} /> Thursday–Sunday, 10am–4pm</span>
              <span><Package size={15} /> Refill returns welcome at the door</span>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="section container" id="shipping">
        <div className="bento">
          <div className="bento-card span-4">
            <span className="eyebrow"><Truck size={12} /> Shipping</span>
            <h3 style={{ fontSize: 23, marginTop: 10 }}>Packed in paper, sent carbon-neutral.</h3>
            <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 8, lineHeight: 1.7 }}>
              Orders leave Portland in 1–2 business days. US shipping is free over $75, otherwise $6. Delivery takes
              3–5 business days. We offset every shipment through a regional forestry partner.
            </p>
          </div>
          <div className="bento-card span-4">
            <span className="eyebrow"><ShieldCheck size={12} /> Returns</span>
            <h3 style={{ fontSize: 23, marginTop: 10 }}>Live with it for 30 days.</h3>
            <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 8, lineHeight: 1.7 }}>
              If the trail is not right, send the order back — even opened — within 30 days for a full refund. Spent
              pods can be returned in any refill mailer for composting.
            </p>
          </div>
          <div className="bento-card span-4" id="privacy">
            <span className="eyebrow"><Leaf size={12} /> Privacy</span>
            <h3 style={{ fontSize: 23, marginTop: 10 }}>Only what we need.</h3>
            <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 8, lineHeight: 1.7 }}>
              We store your name, email, hashed password, addresses and orders. We do not sell data or run third-party
              ad trackers. Ask us to delete your account at any time. This demo store takes no real payments.
            </p>
          </div>
          <div className="bento-card span-12" id="terms" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, background: "var(--sage-soft)" }}>
            <div>
              <span className="eyebrow">Demo store note</span>
              <h3 style={{ fontSize: 24, marginTop: 8 }}>This is a full-stack demonstration of ScentTrail Pods.</h3>
              <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 6, maxWidth: 660 }}>
                Accounts, orders, newsletter signups and contact messages are stored in a private Vercel Blob store.
                Checkout uses test payment details only; no money is taken.
              </p>
            </div>
            <Link href="/shop" className="btn btn-primary">
              Shop the trails <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
