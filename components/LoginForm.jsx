"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Sparkles } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { useToast } from "./ToastProvider";

export default function LoginForm({ next = "/account" }) {
  const router = useRouter();
  const { user, loading, login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace(next || "/account");
  }, [loading, user, router, next]);

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(email, password);
      toast("Welcome back to the trail.");
      router.push(next || "/account");
      router.refresh();
    } catch (caught) {
      setError(caught.message);
    } finally {
      setBusy(false);
    }
  }

  function fillDemo() {
    setEmail("demo@scenttrail.com");
    setPassword("Demo1234!");
    setError("");
  }

  return (
    <div className="auth-form">
      <span className="pill">
        <Sparkles size={13} /> Good to see you
      </span>
      <h1>Pick up where you left off.</h1>
      <p>Sign in to see your orders, saved address and the trails you have collected.</p>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@somewhere.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="login-password">Password</label>
          <div className="password-wrap">
            <input
              id="login-password"
              type={show ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="Your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShow((current) => !current)}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        {error ? <p className="form-error" style={{ marginBottom: 14 }}>{error}</p> : null}

        <button type="submit" className="btn btn-primary btn-block auth-submit" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"} {!busy ? <ArrowRight size={16} /> : null}
        </button>
      </form>

      <p className="auth-switch">
        New to ScentTrail? <Link href="/signup">Create an account</Link>
      </p>

      <div className="demo-box">
        <strong>Demo account</strong> — demo@scenttrail.com · Demo1234!
        <br />
        <button type="button" onClick={fillDemo}>
          Fill demo credentials →
        </button>
      </div>

      <p className="fineprint" style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 6 }}>
        <LockKeyhole size={12} /> Your password is salted and hashed. We never store it in plain text.
      </p>
    </div>
  );
}
