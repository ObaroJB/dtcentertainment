"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// This MVP takes the scanned QR value via a text input so it works with any
// external scanner app or camera that outputs text. For an in-browser camera
// scanner, add the `html5-qrcode` package and feed its decoded text into
// handleScan() below instead of the input's onSubmit.

export default function ScanPage() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleScan(e) {
    e.preventDefault();
    if (!token.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qrToken: token.trim() }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ valid: false, reason: "Network error." });
    } finally {
      setLoading(false);
      setToken("");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--black)",
        color: "var(--white)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <span className="eyebrow">DTC Entertainment</span>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", marginTop: "8px" }}>
        Door Scanner
      </h1>

      <form onSubmit={handleScan} style={{ marginTop: "24px", display: "flex", gap: "10px", width: "100%", maxWidth: "420px" }}>
        <input
          autoFocus
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Scan or paste QR value"
          style={{ flex: 1, padding: "14px", borderRadius: "10px", border: "none", fontSize: "15px" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ background: "var(--red)", padding: "0 24px", borderRadius: "10px", fontFamily: "var(--font-display)", fontSize: "18px" }}
        >
          Check
        </button>
      </form>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={JSON.stringify(result)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              marginTop: "28px",
              padding: "24px 32px",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "420px",
              textAlign: "center",
              background: result.valid ? "#0f5c1a" : "var(--red-dim)",
            }}
          >
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px" }}>
              {result.valid ? "ENTRY GRANTED" : "ENTRY DENIED"}
            </h2>
            {result.valid ? (
              <p style={{ marginTop: "6px" }}>
                {result.fullName} — {result.ticketType} ({result.ticketId})
              </p>
            ) : (
              <p style={{ marginTop: "6px" }}>{result.reason}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
