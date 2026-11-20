"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Eye, EyeOff, Leaf, ShieldCheck } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { useToast } from "./ToastProvider";

export default function SignupForm({ next = "/account" }) {
  const router = useRouter();
  const { user, loading, signup } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [newsletter, setNewsletter] = useState(true);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace(next || "/account");
  }, [loading, user, router, next]);

  const strength = Math.min(4, [form.password.length >= 8, /[A-Z]/.test(form.password), /\d/.test(form.password), /[^A-Za-z0-9]/.test(form.password)].filter(Boolean).length);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (form.name.trim().length < 2) {
      setError("Please tell us your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (form.password.length < 8) {
      setError("Use at least 8 characters for your password.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Those passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      await signup({
        name: form.name,
        email: form.email,
        password: form.password,
        newsletter,
      });
      toast("Your account is ready. Welcome to the trail.");
      router.push(next || "/account");
      router.refresh();
    } catch (caught) {
      setError(caught.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-form">
      <span className="pill">
        <Leaf size={13} /> Join the trail
      </span>
      <h1>Make room for quiet.</h1>
      <p>Create an account for faster checkout, saved addresses and a home for your refills.</p>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="signup-name">Full name</label>
          <input
            id="signup-name"
            required
            autoComplete="name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="signup-password">Password</label>
          <div className="password-wrap">
            <input
              id="signup-password"
              type={show ? "text" : "password"}
              required
              autoComplete="new-password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
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
          <div style={{ display: "flex", gap: 4, marginTop: 3 }}>
            {[1, 2, 3, 4].map((value) => (
              <span
                key={value}
                style={{
                  height: 3,
                  flex: 1,
                  borderRadius: 99,
                  background: value <= strength ? "var(--olive)" : "var(--surface-3)",
                  transition: "background .2s ease",
                }}
              />
            ))}
          </div>
        </div>
        <div className="field">
          <label htmlFor="signup-confirm">Confirm password</label>
          <input
            id="signup-confirm"
            type="password"
            required
            autoComplete="new-password"
            value={form.confirm}
            onChange={(event) => setForm({ ...form, confirm: event.target.value })}
          />
        </div>

        <label className="checkbox-row" style={{ marginBottom: 16 }}>
          <input type="checkbox" checked={newsletter} onChange={(event) => setNewsletter(event.target.checked)} />
          Send me the trail list: new scents and slow-living notes, twice a month.
        </label>

        {error ? <p className="form-error" style={{ marginBottom: 14 }}>{error}</p> : null}

        <button type="submit" className="btn btn-primary btn-block auth-submit" disabled={busy}>
          {busy ? "Creating account…" : "Create account"} {!busy ? <ArrowRight size={16} /> : null}
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link href="/login">Sign in</Link>
      </p>

      <p className="fineprint" style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 6 }}>
        <ShieldCheck size={12} /> Salted, hashed passwords. No payment details stored.
      </p>
    </div>
  );
}
