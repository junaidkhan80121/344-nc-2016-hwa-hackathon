import Image from "next/image";

export default function AuthShell({ children, variant = "login" }) {
  return (
    <div className="auth-shell">
      <div className="auth-visual">
        <Image src="/with.png" alt="ScentTrail diffusers and refill pods" fill sizes="(max-width: 960px) 100vw, 50vw" priority />
        <div>
          <span className="eyebrow" style={{ color: "#d5d8c6" }}>
            ScentTrail Pods
          </span>
          <h2 style={{ marginTop: 14 }}>
            {variant === "login" ? (
              <>
                A room that <em>remembers</em> you.
              </>
            ) : (
              <>
                Start a <em>quieter</em> habit.
              </>
            )}
          </h2>
          <p>
            Analog scent for the rooms you actually live in. Refillable, compostable, and made to be kept.
          </p>
        </div>
        <div className="auth-quote">
          <blockquote>“The first diffuser I have owned that feels like a object, not an appliance.”</blockquote>
          <span>Maya R. · Portland · Wild Forest</span>
        </div>
      </div>
      <div className="auth-panel">{children}</div>
    </div>
  );
}
