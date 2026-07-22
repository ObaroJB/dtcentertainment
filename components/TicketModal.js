"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TicketModal({ event, onClose }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    tier: event.tiers[0].name,
    quantity: 1,
    promoCode: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const tierPrice = event.tiers.find((t) => t.name === form.tier)?.price ?? 0;
  const total = tierPrice * Number(form.quantity || 0);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!/^[0-9+()\-\s]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number.";
    if (!form.quantity || form.quantity < 1) e.quantity = "Pick at least 1 ticket.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;

    setLoading(true);
    try {
      // 1. Create a pending order on the backend
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          ticketType: form.tier,
          quantity: Number(form.quantity),
          promoCode: form.promoCode || null,
          unitPrice: tierPrice,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      // 2. Redirect to Paystack's hosted checkout
      window.location.href = data.authorizationUrl;
    } catch (err) {
      setServerError("Network error — please check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Buy tickets"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(10,10,10,0.7)",
          backdropFilter: "blur(4px)",
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "var(--white)",
            borderRadius: "24px",
            width: "100%",
            maxWidth: "480px",
            maxHeight: "90vh",
            overflowY: "auto",
            padding: "36px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span className="eyebrow">Checkout</span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "32px",
                  marginTop: "4px",
                }}
              >
                Secure Your Spot
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{ fontSize: "24px", lineHeight: 1, color: "var(--black)" }}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ marginTop: "24px", display: "grid", gap: "16px" }}>
            <Field label="Full name" error={errors.fullName}>
              <input
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="Name"
                style={inputStyle}
              />
            </Field>

            <Field label="Email address" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="example@gmail.com"
                style={inputStyle}
              />
            </Field>

            <Field label="Phone number" error={errors.phone}>
              <input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="080 000 0000"
                style={inputStyle}
              />
            </Field>

            <Field label="Ticket type">
              <select
                value={form.tier}
                onChange={(e) => update("tier", e.target.value)}
                style={inputStyle}
              >
                {event.tiers.map((t) => (
                  <option key={t.name} value={t.name}>
                    {t.name} — ₦{t.price.toLocaleString()}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Quantity" error={errors.quantity}>
              <input
                type="number"
                min="1"
                max="10"
                value={form.quantity}
                onChange={(e) => update("quantity", e.target.value)}
                style={inputStyle}
              />
            </Field>

            <Field label="Promo code (optional)">
              <input
                value={form.promoCode}
                onChange={(e) => update("promoCode", e.target.value)}
                placeholder="DTCVIP"
                style={inputStyle}
              />
            </Field>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "var(--font-display)",
                fontSize: "22px",
                borderTop: "2px solid var(--black)",
                paddingTop: "16px",
                marginTop: "4px",
              }}
            >
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>

            {serverError && (
              <p style={{ color: "var(--red)", fontSize: "13px" }}>{serverError}</p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              style={{
                background: "var(--red)",
                color: "var(--white)",
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                letterSpacing: "0.06em",
                padding: "16px 0",
                borderRadius: "999px",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Redirecting to payment…" : "PAY & GET TICKET"}
            </motion.button>

            <p style={{ fontSize: "12px", color: "var(--gray-600)", textAlign: "center" }}>
              Payments are processed securely by Paystack. Your ticket
              is emailed automatically the moment payment is confirmed.
            </p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Field({ label, error, children }) {
  return (
    <label style={{ display: "grid", gap: "6px" }}>
      <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em" }}>
        {label}
      </span>
      {children}
      {error && <span style={{ fontSize: "12px", color: "var(--red)" }}>{error}</span>}
    </label>
  );
}

const inputStyle = {
  border: "1.5px solid var(--gray-300)",
  borderRadius: "12px",
  padding: "12px 14px",
  fontSize: "15px",
  fontFamily: "var(--font-body)",
  outline: "none",
  width: "100%",
};
