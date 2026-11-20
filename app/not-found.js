import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container" style={{ padding: "70px 0 90px" }}>
      <div className="bento">
        <div className="bento-card span-12" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 420, textAlign: "center" }}>
          <Compass size={36} style={{ color: "var(--olive)" }} />
          <span className="eyebrow" style={{ marginTop: 16 }}>Off the trail</span>
          <h1 style={{ fontSize: "clamp(42px, 6vw, 76px)", marginTop: 10 }}>This path has grown over.</h1>
          <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 12, maxWidth: 420 }}>
            The page you were looking for is not here. The collection, the workshop and your orders are still where
            you left them.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 24 }}>
            <Link href="/shop" className="btn btn-primary">
              Shop the trails <ArrowRight size={16} />
            </Link>
            <Link href="/" className="btn btn-outline">
              Back home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
