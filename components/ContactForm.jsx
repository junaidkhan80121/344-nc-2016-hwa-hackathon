"use client";

import { useState } from "react";
import { ArrowRight, Send } from "lucide-react";
import { useToast } from "./ToastProvider";

export default function ContactForm() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not send your message.");
      setForm({ name: "", email: "", message: "" });
      toast(data.message || "Message received.");
    } catch (caught) {
      setError(caught.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        </div>
        <div className="field full">
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" required value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Tell us what you are wondering about." />
        </div>
      </div>
      {error ? <p className="form-error" style={{ marginBottom: 12 }}>{error}</p> : null}
      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy ? "Sending…" : "Send message"} {!busy ? <Send size={15} /> : <ArrowRight size={15} />}
      </button>
    </form>
  );
}
