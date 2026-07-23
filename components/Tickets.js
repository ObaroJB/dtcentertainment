"use client";

import { useState } from "react";
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

      {/* Ticket-stub styled card */}
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
        {/* Flyer */}
        <div style={{ flex: "1 1 340px", minHeight: "340px", position: "relative" }}>
          <img
            src={EVENT.flyer}
            alt={`${EVENT.name} flyer`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Perforated divider (desktop only) */}
        <div
          style={{
            width: "0",
            borderLeft: "2px dashed rgba(255,255,255,0.25)",
            margin: "24px 0",
          }}
        />

        {/* Details */}
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
            onClick={() => setOpen(true)}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 0 3px var(--red), 0 18px 40px -14px rgba(226,0,26,0.6)",
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              marginTop: "32px",
              background: "var(--red)",
              color: "var(--white)",
              fontFamily: "var(--font-display)",
              fontSize: "20px",
              letterSpacing: "0.06em",
              padding: "16px 0",
              borderRadius: "999px",
              width: "100%",
            }}
          >
            GET TICKETS
          </motion.button>
        </div>
      </motion.div>

      {open && <TicketModal event={EVENT} onClose={() => setOpen(false)} />}
    </section>
  );
}
