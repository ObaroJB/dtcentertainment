"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TicketModal from "./TicketModal";

const EVENT = {
  name: "DTC Presents: CAPITAL CLASH",
  date: "August 8 , 2026",
  time: "N/A",
  venue: "Undisclosed",
  flyer: "/images/flyer1.jpeg",
  tiers: [
    { name: "Early Bird", price: 3500 },
  ],
};

export default function Tickets() {
  const [open, setOpen] = useState(false);
  const [availability, setAvailability] = useState(null);

  useEffect(() => {
    fetch("/api/availability")
      .then((res) => res.json())
      .then((data) => setAvailability(data.tiers || {}))
      .catch(() => setAvailability({}));
  }, []);

  // Figures out remaining count for the first (currently only) tier.
  const tierName = EVENT.tiers[0].name;
  const tierInfo = availability ? availability[tierName] : null;
  const remaining = tierInfo ? tierInfo.capacity - tierInfo.sold : null;
  const soldOut = remaining !== null && remaining <= 0;

  return (
    <section id="tickets" className="section" style={{ background: "var(--white)" }}>
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="eyebrow"
      >
        The Event
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(36px, 5vw, 64px)",
          margin: "10px 0 48px",
          letterSpacing: "0.01em",
        }}
      >
        Get Your Ticket
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6, boxShadow: "0 30px 60px -20px rgba(0,0,0,0.35)" }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          background: "var(--black)",
          borderRadius: "24px",
          overflow: "hidden",
          maxWidth: "980px",
          margin: "0 auto",
          boxShadow: "0 20px 50px -25px rgba(0,0,0,0.4)",
        }}
      >
        {/* Flyer with the live count badge sitting on top of it */}
        <div style={{ flex: "1 1 340px", minHeight: "340px", position: "relative" }}>
          <img
            src={EVENT.flyer}
            alt={`${EVENT.name} flyer`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          {availability && remaining !== null && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                position: "absolute",
                top: "16px",
                left: "16px",
                background: soldOut ? "var(--gray-600)" : "var(--red)",
                color: "var(--white)",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.04em",
                padding: "8px 16px",
                borderRadius: "999px",
                boxShadow: "0 8px 20px -6px rgba(0,0,0,0.5)",
              }}
            >
              {soldOut ? "SOLD OUT" : `${remaining} TICKETS LEFT`}
            </motion.div>
          )}
        </div>

        <div
          style={{
            width: "0",
            borderLeft: "2px dashed rgba(255,255,255,0.25)",
            margin: "24px 0",
          }}
        />

        <div
          style={{
            flex: "1 1 360px",
            padding: "40px",
            color: "var(--white)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px, 3vw, 34px)",
              letterSpacing: "0.01em",
            }}
          >
            {EVENT.name}
          </h3>

          <dl style={{ marginTop: "22px", display: "grid", gap: "10px" }}>
            {[
              ["Date", EVENT.date],
              ["Time", EVENT.time],
              ["Venue", EVENT.venue],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", gap: "10px", fontSize: "14px" }}>
                <dt style={{ color: "var(--red)", width: "56px", fontWeight: 600 }}>
                  {label}
                </dt>
                <dd style={{ color: "var(--gray-300)" }}>{value}</dd>
              </div>
            ))}
          </dl>

          <div style={{ marginTop: "24px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {EVENT.tiers.map((t) => (
              <span
                key={t.name}
                style={{
                  fontSize: "12px",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "var(--white)",
                }}
              >
                {t.name} — ₦{t.price.toLocaleString()}
              </span>
            ))}
          </div>

          <motion.button
            onClick={() => !soldOut && setOpen(true)}
            disabled={soldOut}
            whileHover={
              soldOut
                ? {}
                : {
                    scale: 1.03,
                    boxShadow: "0 0 0 3px var(--red), 0 18px 40px -14px rgba(226,0,26,0.6)",
                  }
            }
            whileTap={soldOut ? {} : { scale: 0.97 }}
            style={{
              marginTop: "32px",
              background: soldOut ? "var(--gray-600)" : "var(--red)",
              color: "var(--white)",
              fontFamily: "var(--font-display)",
              fontSize: "20px",
              letterSpacing: "0.06em",
              padding: "16px 0",
              borderRadius: "999px",
              width: "100%",
              opacity: soldOut ? 0.6 : 1,
              cursor: soldOut ? "not-allowed" : "pointer",
            }}
          >
            {soldOut ? "SOLD OUT" : "GET TICKETS"}
          </motion.button>
        </div>
      </motion.div>

      {open && !soldOut && <TicketModal event={EVENT} onClose={() => setOpen(false)} />}
    </section>
  );
}