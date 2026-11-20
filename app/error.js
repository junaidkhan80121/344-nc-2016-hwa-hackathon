"use client";

import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";

export default function GlobalError({ error, reset }) {
  return (
    <section className="container" style={{ padding: "70px 0 90px" }}>
      <div className="bento">
        <div className="bento-card span-12" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 420, textAlign: "center" }}>
          <span className="eyebrow">A small detour</span>
          <h1 style={{ fontSize: "clamp(38px, 5vw, 64px)", marginTop: 10 }}>The trail went quiet.</h1>
          <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 12, maxWidth: 440 }}>
            Something interrupted the page. Try again, or head back to the collection.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 24 }}>
            <button type="button" className="btn btn-primary" onClick={reset}>
              <RotateCcw size={15} /> Try again
            </button>
            <Link href="/" className="btn btn-outline">
              Back home <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
